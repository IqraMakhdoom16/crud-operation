import React, { useState, useEffect } from "react";
import {Modal, Button } from "antd";
import axios from "axios";
import StudentTable from "./StudentTable";
import StudentForm from "./StudentForm";

export default function Student() {
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [onCancel, setonCancel] = useState();
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
        const data = response.data.data;
        setUserData(data);
        const counts = { A: 0, B: 0, C: 0, D: 0 };
        data.forEach((student) => {
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

  const handleDelete = (id) => {
    axios
      .delete(`https://api.freeapi.app/api/v1/todos/${id}`)
      .then(() => {
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const showModal = () => {
    setVisible(true);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentTodo(null);
    setonCancel();
  };

  const handleEdit = (record) => {
    setCurrentTodo(record);
    setIsEdit(true);
    setVisible(true);
  };

  const totalTodos = userData.length;
  const classNames = [
    { name: "A", bgColor: "#FEF6FB", textColor: "#EE95C5" },
    { name: "B", bgColor: "#FEFBEC", textColor: "#EECA71" },
    { name: "C", bgColor: "#F0F9FF", textColor: "#40A3FF" },
    { name: "D", bgColor: "#FEF6FB", textColor: "#EE95C5" },
  ];

  return (
    <div className="bg-[#f8f8f8] py-10 min-h-screen flex px-[5%] justify-center">
      <div className="container">
        <div className="flex gap-10 mb-10">
          <div className="w-44 bg-[#F0F9FF] border px-5 py-5 h-35 rounded-lg">
            <div>
              <svg
                width="48"
                height="30"
                viewBox="0 0 48 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45.912 7.42895L26.037 1.06989C24.7013 0.643127 23.2995 0.643127 21.9638 1.06989L2.08875 7.42895C0.8205 7.83492 0 8.94227 0 10.25C0 11.5577 0.8205 12.6651 2.088 13.0711L4.31625 13.7836C4.06875 14.2422 3.88575 14.7358 3.7665 15.2531C2.96475 15.6375 2.4 16.4339 2.4 17.375C2.4 18.3198 2.96775 19.1206 3.77475 19.5029L2.421 27.805C2.30025 28.5464 2.71425 29.25 3.27225 29.25H6.3285C6.88575 29.25 7.3005 28.5464 7.17975 27.805L5.8245 19.5029C6.63225 19.1206 7.2 18.3198 7.2 17.375C7.2 16.4339 6.63525 15.6375 5.8335 15.2531C5.6295 14.3205 5.262 13.4355 4.75425 12.6314L21 17.3438V25.5H18.75C18.1973 25.5 17.75 25.9473 17.75 26.5V27.5C17.75 28.0527 18.1973 28.5 18.75 28.5H29.25C29.8027 28.5 30.25 28.0527 30.25 27.5V26.5C30.25 25.9473 29.8027 25.5 29.25 25.5H27V17.3438L43.2458 12.6314C42.7372 13.4358 42.3696 14.3215 42.1658 15.2531C41.364 15.6375 40.7992 16.4339 40.7992 17.375C40.7992 18.3198 41.367 19.1206 42.174 19.5029L40.8202 27.805C40.6995 28.5464 41.1142 29.25 41.6715 29.25H44.7277C45.285 29.25 45.6997 28.5464 45.5782 27.805L44.2245 19.5029C45.0322 19.1206 45.6 18.3198 45.6 17.375C45.6 16.4339 45.0352 15.6375 44.2335 15.2531C44.1142 14.7358 43.9312 14.2422 43.6837 13.7836L45.912 13.0711C47.1795 12.6651 48 11.5577 48 10.25C48 8.94227 47.1795 7.83492 45.912 7.42895Z"
                  fill="#40A3FF"
                />
              </svg>
              <div className="text-3xl font-semibold text-[#40A3FF]">
                {totalTodos}
              </div>
              <div className="text-lg text-[#8db2bf] py-3">Total Students</div>
            </div>
          </div>
          {classNames.map((classItem) => (
            <div
              key={classItem.name}
              className="px-5 py-5 border rounded-lg h-35 w-44"
              style={{ backgroundColor: classItem.bgColor }}
            >
              <div>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20C23.6762 20 26.6667 17.0095 26.6667 13.3333C26.6667 9.65714 23.6762 6.66667 20 6.66667C16.3238 6.66667 13.3333 9.65714 13.3333 13.3333C13.3333 17.0095 16.3238 20 20 20ZM20 23.3333C16.3724 23.3333 8.33333 25.2152 8.33333 28.8333V31.6667H31.6667V28.8333C31.6667 25.2152 23.6276 23.3333 20 23.3333Z"
                    fill={classItem.textColor}
                  />
                </svg>
                <div
                  className="text-3xl font-semibold"
                  style={{ color: classItem.textColor }}
                >
                  {classCounts[classItem.name]}
                </div>
                <div
                  className="text-lg"
                  style={{ color: `${classItem.textColor}c0` }}
                >
                  Class {classItem.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button type="primary" onClick={showModal} className="absolute">
          Add Student
        </Button>
        <Modal
          title={isEdit ? "Update Student" : "Enter Student Data"}
          visible={visible}
          onCancel={onCancel}
          footer={null}
        >
          <StudentForm
            visible={visible}
          onCancel={handleCancel}
          fetchTodos={fetchTodos}
          isEdit={isEdit}
            currentTodo={currentTodo}
          />
        </Modal>
       
        <StudentTable
          data={userData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}
