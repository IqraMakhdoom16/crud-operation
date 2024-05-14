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
      console.error(
        "Current todo is undefined. Cannot proceed with the update."
      );
      return;
    }
    setLoading(true);
    axios
      .patch(`https://api.freeapi.app/api/v1/todos/${currentTodo._id}, values`)
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
        formRef.current.resetFields(); // Reset form fields after successful submission
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
      <Form
        onFinish={handleSubmit}
        ref={formRef}
        initialValues={{ title: "", description: "" }}
      >
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
  const [classCounts, setClassCounts] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  const fetchTodos = () => {
    axios
      .get("https://api.freeapi.app/api/v1/todos")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        response.data.data.forEach((student) => {
          counts[student.description]++;
        });
        setClassCounts(counts);
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

  const totalTodos = userData.length;

  return (
    <>
      <div className="bg-[#f8f8f8] py-10 min-h-screen flex px-[5%] justify-center">
        <div className="container">
          <div className="flex gap-10 mb-10">
            <div className=" w-44 bg-[#F0F9FF] border px-5 py-5 h-32 rounded-lg">
              <div>
                <svg
                  width="48"
                  height="30"
                  viewBox="0 0 48 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.2715 29.25H6.32775C6.885 29.25 7.29975 28.5464 7.17825 27.805L5.82525 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.5883 6.78825 15.9248 6.19275 15.4921C6.3045 15.1462 6.47775 14.8345 6.6855 14.5413L10.6958 15.8246L9.6 24.5C9.6 27.1236 16.047 29.25 24 29.25C31.953 29.25 38.4 27.1236 38.4 24.5L37.3043 15.8246L45.912 13.0703C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895ZM35.961 24.3412C35.154 25.1821 31.053 26.875 24 26.875C16.947 26.875 12.846 25.1821 12.039 24.3412L13.0208 16.5682L21.9638 19.4294C22.1588 19.4917 23.8928 20.1144 26.037 19.4294L34.98 16.5682L35.961 24.3412ZM45.171 10.8126L25.296 17.1716C24.4478 17.4433 23.5523 17.4433 22.704 17.1716L9.52875 12.956L24.2205 10.2292C24.8723 10.109 25.3013 9.48852 25.179 8.84356C25.0575 8.19785 24.417 7.77555 23.7795 7.89578L8.496 10.7309C7.566 10.9031 6.73275 11.2987 6.015 11.8316L2.82825 10.8118C2.2395 10.6226 2.26875 9.86629 2.82825 9.68742L22.7033 3.32836C23.8358 2.96617 24.7913 3.16731 25.2952 3.32836L45.1703 9.68742C45.7245 9.86481 45.7635 10.6226 45.171 10.8126Z"
                    fill="#74C1ED"
                  />
                </svg>
              </div>
              <p className="mt-3 text-xs">Students</p>
              <p className="text-2xl font-bold text-end">{totalTodos}</p>
            </div>

            <div className=" w-44 bg-[#F0F9FF] border px-5 py-5 h-32 rounded-lg">
              <div>
                <svg
                  width="48"
                  height="30"
                  viewBox="0 0 48 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.2715 29.25H6.32775C6.885 29.25 7.29975 28.5464 7.17825 27.805L5.82525 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.5883 6.78825 15.9248 6.19275 15.4921C6.3045 15.1462 6.47775 14.8345 6.6855 14.5413L10.6958 15.8246L9.6 24.5C9.6 27.1236 16.047 29.25 24 29.25C31.953 29.25 38.4 27.1236 38.4 24.5L37.3043 15.8246L45.912 13.0703C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895ZM35.961 24.3412C35.154 25.1821 31.053 26.875 24 26.875C16.947 26.875 12.846 25.1821 12.039 24.3412L13.0208 16.5682L21.9638 19.4294C22.1588 19.4917 23.8928 20.1144 26.037 19.4294L34.98 16.5682L35.961 24.3412ZM45.171 10.8126L25.296 17.1716C24.4478 17.4433 23.5523 17.4433 22.704 17.1716L9.52875 12.956L24.2205 10.2292C24.8723 10.109 25.3013 9.48852 25.179 8.84356C25.0575 8.19785 24.417 7.77555 23.7795 7.89578L8.496 10.7309C7.566 10.9031 6.73275 11.2987 6.015 11.8316L2.82825 10.8118C2.2395 10.6226 2.26875 9.86629 2.82825 9.68742L22.7033 3.32836C23.8358 2.96617 24.7913 3.16731 25.2952 3.32836L45.1703 9.68742C45.7245 9.86481 45.7635 10.6226 45.171 10.8126Z"
                    fill="#74C1ED"
                  />
                </svg>
              </div>
              <p className="mt-3 text-xs">Students in Class A</p>
              <p className="text-2xl font-bold text-end">{classCounts.A}</p>
            </div>
            <div className=" w-44 bg-[#F0F9FF] border px-5 py-5 h-32 rounded-lg">
              <div>
                <svg
                  width="48"
                  height="30"
                  viewBox="0 0 48 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.2715 29.25H6.32775C6.885 29.25 7.29975 28.5464 7.17825 27.805L5.82525 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.5883 6.78825 15.9248 6.19275 15.4921C6.3045 15.1462 6.47775 14.8345 6.6855 14.5413L10.6958 15.8246L9.6 24.5C9.6 27.1236 16.047 29.25 24 29.25C31.953 29.25 38.4 27.1236 38.4 24.5L37.3043 15.8246L45.912 13.0703C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895ZM35.961 24.3412C35.154 25.1821 31.053 26.875 24 26.875C16.947 26.875 12.846 25.1821 12.039 24.3412L13.0208 16.5682L21.9638 19.4294C22.1588 19.4917 23.8928 20.1144 26.037 19.4294L34.98 16.5682L35.961 24.3412ZM45.171 10.8126L25.296 17.1716C24.4478 17.4433 23.5523 17.4433 22.704 17.1716L9.52875 12.956L24.2205 10.2292C24.8723 10.109 25.3013 9.48852 25.179 8.84356C25.0575 8.19785 24.417 7.77555 23.7795 7.89578L8.496 10.7309C7.566 10.9031 6.73275 11.2987 6.015 11.8316L2.82825 10.8118C2.2395 10.6226 2.26875 9.86629 2.82825 9.68742L22.7033 3.32836C23.8358 2.96617 24.7913 3.16731 25.2952 3.32836L45.1703 9.68742C45.7245 9.86481 45.7635 10.6226 45.171 10.8126Z"
                    fill="#74C1ED"
                  />
                </svg>
              </div>
              <p className="mt-3 text-xs">Students in Class B</p>
              <p className="text-2xl font-bold text-end">{classCounts.B}</p>
            </div>
            <div className=" w-44 bg-[#F0F9FF] border px-5 py-5 h-32 rounded-lg">
              <div>
                <svg
                  width="48"
                  height="30"
                  viewBox="0 0 48 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.2715 29.25H6.32775C6.885 29.25 7.29975 28.5464 7.17825 27.805L5.82525 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.5883 6.78825 15.9248 6.19275 15.4921C6.3045 15.1462 6.47775 14.8345 6.6855 14.5413L10.6958 15.8246L9.6 24.5C9.6 27.1236 16.047 29.25 24 29.25C31.953 29.25 38.4 27.1236 38.4 24.5L37.3043 15.8246L45.912 13.0703C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895ZM35.961 24.3412C35.154 25.1821 31.053 26.875 24 26.875C16.947 26.875 12.846 25.1821 12.039 24.3412L13.0208 16.5682L21.9638 19.4294C22.1588 19.4917 23.8928 20.1144 26.037 19.4294L34.98 16.5682L35.961 24.3412ZM45.171 10.8126L25.296 17.1716C24.4478 17.4433 23.5523 17.4433 22.704 17.1716L9.52875 12.956L24.2205 10.2292C24.8723 10.109 25.3013 9.48852 25.179 8.84356C25.0575 8.19785 24.417 7.77555 23.7795 7.89578L8.496 10.7309C7.566 10.9031 6.73275 11.2987 6.015 11.8316L2.82825 10.8118C2.2395 10.6226 2.26875 9.86629 2.82825 9.68742L22.7033 3.32836C23.8358 2.96617 24.7913 3.16731 25.2952 3.32836L45.1703 9.68742C45.7245 9.86481 45.7635 10.6226 45.171 10.8126Z"
                    fill="#74C1ED"
                  />
                </svg>
              </div>
              <p className="mt-3 text-xs">Students in Class C</p>
              <p className="text-2xl font-bold text-end">{classCounts.C}</p>
            </div>
            <div className=" w-44 bg-[#F0F9FF] border px-5 py-5 h-32 rounded-lg">
              <div>
                <svg
                  width="48"
                  height="30"
                  viewBox="0 0 48 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.2715 29.25H6.32775C6.885 29.25 7.29975 28.5464 7.17825 27.805L5.82525 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.5883 6.78825 15.9248 6.19275 15.4921C6.3045 15.1462 6.47775 14.8345 6.6855 14.5413L10.6958 15.8246L9.6 24.5C9.6 27.1236 16.047 29.25 24 29.25C31.953 29.25 38.4 27.1236 38.4 24.5L37.3043 15.8246L45.912 13.0703C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895ZM35.961 24.3412C35.154 25.1821 31.053 26.875 24 26.875C16.947 26.875 12.846 25.1821 12.039 24.3412L13.0208 16.5682L21.9638 19.4294C22.1588 19.4917 23.8928 20.1144 26.037 19.4294L34.98 16.5682L35.961 24.3412ZM45.171 10.8126L25.296 17.1716C24.4478 17.4433 23.5523 17.4433 22.704 17.1716L9.52875 12.956L24.2205 10.2292C24.8723 10.109 25.3013 9.48852 25.179 8.84356C25.0575 8.19785 24.417 7.77555 23.7795 7.89578L8.496 10.7309C7.566 10.9031 6.73275 11.2987 6.015 11.8316L2.82825 10.8118C2.2395 10.6226 2.26875 9.86629 2.82825 9.68742L22.7033 3.32836C23.8358 2.96617 24.7913 3.16731 25.2952 3.32836L45.1703 9.68742C45.7245 9.86481 45.7635 10.6226 45.171 10.8126Z"
                    fill="#74C1ED"
                  />
                </svg>
              </div>
              <p className="mt-3 text-xs">Students in Class D</p>
              <p className="text-2xl font-bold text-end">{classCounts.D}</p>
            </div>
          </div>
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
              fetchTodos={fetchTodos}
            />
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