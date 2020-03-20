import React from 'react'
import {Card, Table, Button, Popconfirm} from 'antd'

const dataSource = [{
    id:1,
    name:"soap",
    price:5.99
},{
    id:2,
    name:"milk",
    price:3.99
},{
    id:3,
    name:"noodles",
    price:3.60
}]


function List() {
    const columns = [{
        title:'Order',
        key:'id',
        width:80,
        align:'center',
        render:(txt,record,index)=> index+1
    },{
        title:'Name',
        dataIndex:'name'
    },{
        title:'Price',
        dataIndex:'price'
    },{
        title:"Operation",
        render:(txt,record,index)=>{
            return (
                <div>
                    <Button type="primary" size="small">Change</Button>
                    <Popconfirm title="Sure to delete?" onCancel={()=>console.log('cancel')
                    } onConfirm={()=>console.log('deleted')}>
                        <Button style={{margin:'0 1rem'}} type="danger" size="small">Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    }]

    return (
        <Card title="List" extra={
            <Button type="primary" size="small">Add</Button>
        }>
            <Table columns={columns} dataSource={dataSource} bordered/>
        </Card>
    )
}

export default List