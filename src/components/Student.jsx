import React, { useState, useEffect,useRef } from "react";
import { Button, Divider, Radio, Table, Avatar, Modal ,Form, Input,} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";


const columns = [
  {
    title: "Name",
    dataIndex: "firstName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "Roll Number",
    dataIndex: "ein",
  },
  {
    title: "University",
    dataIndex: "university",
  },
];

const StudentForm = ({ visible, onCancel }) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Send POST request with form data
    axios
      .post("https://dummyjson.com/users/add", values)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setLoading(false);
        onCancel(); 
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
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form onFinish={handleSubmit} ref={formRef}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Roll Number"
          name="rollNumber"
          rules={[{ required: true, message: "Please enter roll number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="University"
          name="university"
          rules={[{ required: true, message: "Please enter university" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default function Student() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    // Make Axios GET request
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setUserData(response.data.users); // Set user data to state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log("userdata", userData.users);

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
              Add New Student
            </Button>
            <StudentForm visible={visible} onCancel={handleCancel} />
          </div>
          <hr className="mt-5" />
          <div>
            <Table
              columns={columns}
              dataSource={userData}
              rowClassName="mt-5 py-5"
            />
          </div>
         
        </div>
      </div>
      <Modal
        title="Enter Student Data"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div></div>
      </Modal>
    </>
  );
}