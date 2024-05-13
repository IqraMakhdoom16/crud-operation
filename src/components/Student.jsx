import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Form, Input, Popconfirm, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const columns = (handleDelete, fetchTodos, handleEdit) => [
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
          onConfirm={() => handleDelete(record._id, fetchTodos)}
          onCancel={null}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </>
    ),
  },
];

const EditForm = ({ visible, onCancel, onSubmit, currentTodo }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  console.log("edit for data", currentTodo);

  const handleSubmit = (values) => {
    if (!currentTodo) {
      console.error(
        "Current todo is undefined. Cannot proceed with the update."
      );
      return;
    }
    setLoading(true);
    axios
      .patch(`https://api.freeapi.app/api/v1/todos/${currentTodo._id}`, values)
      .then((response) => {
        console.log("Todo updated successfully:", response.data);
        setLoading(false);
        onCancel();
        onSubmit(values);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        setLoading(false);
      });
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      title="Update Todo"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      {currentTodo && (
        <Form onFinish={handleSubmit} ref={formRef} initialValues={currentTodo}>
          <Form.Item
            label="Student Name"
            value={currentTodo.title}
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Class" name="description">
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

const StudentForm = ({ visible, onCancel, fetchTodos }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post("https://api.freeapi.app/api/v1/todos", values)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setLoading(false);
        onCancel();
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setLoading(false);
      });
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      title="Enter Student Data"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form onFinish={handleSubmit} ref={formRef}>
        <Form.Item
          label="Student Name"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Class" name="description">
          <Select>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const handleDelete = (id, fetchTodos) => {
  console.log("id is", id);
  axios
    .delete(`https://api.freeapi.app/api/v1/todos/${id}`)
    .then((response) => {
      console.log(response, "Todo deleted successfully:", id);
      fetchTodos();
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
};

const showModal = () => {
  setCurrentTodo(null); 
  setVisible(true);
};
export default function Student() {
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const fetchTodos = () => {
    axios
      .get("https://api.freeapi.app/api/v1/todos")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (record) => {
    setCurrentTodo(record);
    setEditVisible(true);
  };

  const handleEditCancel = () => {
    setEditVisible(false);
  };

  const handleEditSubmit = () => {
    fetchTodos();
  };

  return (
    <>
      <div className="bg-[#f8f8f8] py-10 min-h-screen flex px-[5%] justify-center">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold ">Students List</p>
            <Button
              onClick={showModal}
              className="bg-[#FEAF00] uppercase px-5 hover:bg-[#624c1e] "
              type="primary"
            >
              Add Todo
            </Button>
            <StudentForm visible={visible} onCancel={handleCancel} fetchTodos={fetchTodos} />
            <EditForm
              visible={editVisible}
              onCancel={handleEditCancel}
              onSubmit={handleEditSubmit}
              currentTodo={currentTodo}
            />
          </div>
          <hr className="mt-5" />
          <div>
            <Table
              columns={columns(handleDelete, fetchTodos, handleEdit)}
              dataSource={userData}
              rowClassName="mt-5 py-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}
