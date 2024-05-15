import React, { useRef, useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";

const { Option } = Select;

const EditForm = ({ visible, onCancel, onSubmit, currentTodo }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && currentTodo) {
      formRef.current.setFieldsValue({
        title: currentTodo.title,
        description: currentTodo.description,
      });
    }
  }, [visible, currentTodo]);

  const handleSubmit = (values) => {
    if (!currentTodo) {
      console.error("Current todo is undefined. Cannot proceed with the update.");
      return;
    }
    setLoading(true);
    axios
      .patch(`https://api.freeapi.app/api/v1/todos/${currentTodo._id}`, values)
      .then(() => {
        setLoading(false);
        onCancel();
        onSubmit();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Update Student"
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

export default EditForm;
