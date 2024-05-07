import React, { useState, useEffect, useRef } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
import axios from "axios";

const columns = (handleDelete, fetchTodos) => [
  {
    title: "Title",
    dataIndex: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text, record) => (
      <>
        <Button type="primary" onClick={() => handleEdit(record.id)}>
          Edit
        </Button>
        <Button
          type="danger"
          onClick={() => handleDelete(record._id, fetchTodos)}
        >
          Delete
        </Button>
      </>
    ),
  },
];

const StudentForm = ({ visible, onCancel, setUserData, fetchTodos }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Send POST request with form data
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
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <Form onFinish={handleSubmit} ref={formRef}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter Description" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const handleDelete = (id, fetchTodos) => {
  console.log("id is", id);
  // Send DELETE request to delete todo with specified id
  axios
    .delete(`https://api.freeapi.app/api/v1/todos/${id}`)
    .then((response) => {
      console.log("Todo deleted successfully:", id);
      fetchTodos(); // Fetch todos again to update the list
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
};

export default function Student() {
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false);

  // Function to fetch todos initially
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
    fetchTodos(); // Fetch todos initially
  }, []); // Empty dependency array to fetch todos only once

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (record) => {
    // Implement edit functionality here
    console.log("Editing todo:", record);
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
            <StudentForm
              visible={visible}
              onCancel={handleCancel}
              setUserData={setUserData} // Pass setter function as prop
              fetchTodos={fetchTodos} // Pass fetchTodos function as prop
            />
          </div>
          <hr className="mt-5" />
          <div>
            <Table
              columns={columns(handleDelete, fetchTodos)}
              dataSource={userData}
              rowClassName="mt-5 py-5"
            />
          </div>
        </div>
      </div>
    </>
  );
}