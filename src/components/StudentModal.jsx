import React, { useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import StudentForm from "./StudentForm";

const StudentModal = ({ visible, onCancel, fetchTodos, isEdit, currentTodo }) => {
  const initialValues = {
    title: currentTodo?.title || "",
    description: currentTodo?.description || "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const apiCall = isEdit
      ? axios.patch(`https://api.freeapi.app/api/v1/todos/${currentTodo._id}`, values)
      : axios.post(`https://api.freeapi.app/api/v1/todos`, values);

    apiCall
      .then(() => {
        setSubmitting(false);
        onCancel();
        fetchTodos();
        if (!isEdit) {
          resetForm();
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    if (visible && isEdit && currentTodo) {
    }
  }, [visible, isEdit, currentTodo]);

  return (
    <Modal
      title={isEdit ? "Update Student" : "Enter Student Data"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <StudentForm
        initialValues={initialValues}
        isEdit={isEdit}
        handleSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default StudentModal;
