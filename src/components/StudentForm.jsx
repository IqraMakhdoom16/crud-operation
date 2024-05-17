import React from "react";
import { Input, Select, Button } from "antd";
import StudentModal from "./StudentModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please enter title"),
  description: Yup.string().required("Please select class"),
});

const StudentForm = ({ initialValues, isEdit, handleSubmit, onCancel }) => {
  return (
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
          <StudentModal
            visible={visible}
            onCancel={handleCancel}
            fetchTodos={fetchTodos}
            isEdit={isEdit}
            currentTodo={currentTodo}
          />
        </Form>
      )}
    </Formik>
  );
};

export default StudentForm;
