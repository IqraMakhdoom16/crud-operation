import React, { useRef, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const StudentForm = ({ visible, onCancel, fetchTodos }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post("https://api.freeapi.app/api/v1/todos", values)
      .then(() => {
        setLoading(false);
        onCancel();
        fetchTodos();
        formRef.current.resetFields();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setLoading(false);
      });
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
          onClick={() => formRef.current.submit()}
        >
          Submit
        </Button>,
      ]}
    >
      <Form ref={formRef} onFinish={handleSubmit}>
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

export default StudentForm;
