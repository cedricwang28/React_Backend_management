import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, Icon } from "antd";

import BraftEditor from "braft-editor";

import "braft-editor/dist/index.css";
import { createApi, getOneById, modifyOne } from "../../../services/products";
import { serverUrl } from "../../../utils/config";

function Edit(props) {
  // console.log(props);


  const { getFieldDecorator } = props.form;
  const [currentData, setCurrentData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState();

  
  useEffect(() => {
    if (props.match.params.id) {
      getOneById(props.match.params.id).then(res => {
        setCurrentData(res);
        setImageUrl(res.coverImg);
        setEditorState(BraftEditor.createEditorState(res.content));
      });
    }
  }, []);

  const uploadButton = (
    <div>
      <Icon type={loading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  // upload img
  const handleChange = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // success
      // Get this url from response in real world.
      setLoading(false);
      // console.log(info);
      setImageUrl(info.file.response.info);
    }
  };

  // rich text editor
  const handleEditorChange = v => {
    setEditorState(v);
  };
  const priceValidate = (rule, value, callback) => {
    if (value * 1 > 100) {
      callback("price no more than 100");
    } else {
      callback();
    }
  };

  const handleSubmit = e => {
    // editorState.toHTML()get content
    // console.log(editorState.toHTML());
    e.preventDefault();

    //  verify
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values);
        // console.log("submit");
        //  invoke api
        if (props.match.params.id) {
          modifyOne(props.match.params.id, {
            ...values,
            coverImg: imageUrl,
            content: editorState.toHTML()
          })
            .then(res => {
              // console.log(res);
              props.history.push("/admin/products");
            })
            .catch(err => {
              // console.log(err);
            });
        } else {
          createApi({
            ...values,
            coverImg: imageUrl,
            content: editorState.toHTML()
          })
            .then(res => {
              // console.log(res);
              props.history.push("/admin/products");
            })
            .catch(err => {
              // console.log(err);
            });
        }
      } else {
        message.error("input correct content");
      }
    });
  };
  return (
    <Card
      title="product edit"
      extra={
        <Button onClick={() => props.history.push("/admin/products")}>
          返回
        </Button>
      }
    >
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Item label="name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "input product name"
              }
            ],
            initialValue: currentData.name
          })(<Input placeholder="input product name" />)}
        </Form.Item>
        <Form.Item label="price">
          {getFieldDecorator("price", {
            rules: [
              {
                required: true,
                message: "input product name"
              },
              {
                validator: priceValidate
              }
            ],
            initialValue: currentData.price
          })(<Input placeholder="input product price" />)}
        </Form.Item>
        <Form.Item label="主图">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={serverUrl + "/api/v1/common/file_upload"}
            onChange={info => handleChange(info)}
          >
            {imageUrl ? (
              <img
                src={serverUrl + imageUrl}
                alt="avatar"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="详情">
          <BraftEditor
            value={editorState}
            onChange={e => handleEditorChange(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Form.create({ name: "productEdit" })(Edit);
