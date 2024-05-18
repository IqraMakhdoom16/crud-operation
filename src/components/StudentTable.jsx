import React from "react";
import { Table, Button, Popconfirm } from "antd";


const StudentTable = ({ data, handleDelete, handleEdit }) => {
  const columns = () => [
    {
      title: "Student Name",
      dataIndex: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Class",
      dataIndex: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  
  return (
    <Table
      columns={columns()}
      dataSource={data}
      rowKey="_id"
    />
  );
};

export default StudentTable;
