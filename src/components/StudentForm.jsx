import React, { useEffect } from "react";
import { Modal, Input, Select, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please select class"),
});

const StudentForm = ({ visible, onCancel, fetchTodos, isEdit, currentTodo }) => {
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} 
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="ant-form-item">
              <label htmlFor="title" className="ant-form-item-label">
                <span>Student Name</span>
              </label>
              <Field name="title">
                {({ field }) => <Input {...field} />}
              </Field>
              <ErrorMessage name="title" component="div" className="ant-form-item-explain-error" />
            </div>
            <div className="ant-form-item">
              <label htmlFor="description" className="ant-form-item-label">
                <span>Class</span>
              </label>
              <Select
                value={values.description}
                onChange={(value) => setFieldValue("description", value)}
                style={{ width: "100%" }}
              >
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
              <ErrorMessage name="description" component="div" className="ant-form-item-explain-error" />
            </div>
            <div className="ant-modal-footer">
              <Button onClick={onCancel}>
                Cancel
              </Button>
              <Button type="primary" loading={isSubmitting} htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StudentForm;
