import React from "react";
import { withRouter } from "react-router-dom";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Dropdown,
  Avatar,
  message,
  Badge
} from "antd";
import { connect } from "react-redux";
// import logo from "./logo.png";
import { adminRoutes } from "../../routes";
import "./frame.css";
import { clearToken } from "../../utils/auth";
const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route => route.isShow);

function Index(props) {
  console.log(props);
  const popMenu = (
    <Menu
      onClick={p => {
        if (p.key == "logOut") {
          clearToken();
          props.history.push("/login");
        } else {
          // message.info(p.key); // tip
          if ((p.key = "noti")) {
            props.history.push("/admin/notices");
          }
        }
      }}
    >
      <Menu.Item key="noti">Notice</Menu.Item>
      <Menu.Item key="setting">Setting</Menu.Item>
      <Menu.Item key="logOut">Exit</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header
        className="header"
        style={{
          backgroundColor: "#428bca"
        }}
      >
        <div className="logo">
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <Badge dot={!props.isAllRead}>
              <span style={{ color: "#fff" }}>Admin</span>
            </Badge>
            <Icon type="down" />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[props.location.pathname]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map(route => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={p => props.history.push(p.key)}
                >
                  <Icon type={route.icon} />
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            style={{
              background: "#fff",
              margin: 0,
              minHeight: 280
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => state.notice;

export default connect(mapStateToProps)(withRouter(Index));
