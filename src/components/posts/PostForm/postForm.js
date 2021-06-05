import React, { useEffect, useRef } from "react";
import { Form, Input } from "antd";

const PostForm = (props) => {
  const { onSubmit, values } = props;
  const formRef = useRef("");

  useEffect(() => {
    if (values) {
      formRef.current.setFieldsValue({
        title: values.title,
        content: values.content,
      });
    }
  }, [values]);

  return (
    <Form onFinish={onSubmit} ref={formRef}>
      <Form.Item
        name="title"
        label={"post title "}
        rules={[
          {
            required: true,
            message: <p className="br-error"> this field is required </p>,
          },
        ]}
      >
        <Input placeholder="your title " autoComplete={"" + Math.random()} />
      </Form.Item>

      <Form.Item
        name="content"
        label={"post content "}
        rules={[
          {
            required: true,
            message: <p className="br-error"> this field is required </p>,
          },
        ]}
      >
        <Input.TextArea
          placeholder="your description "
          autoComplete={"" + Math.random()}
        />
      </Form.Item>
      <div className="bottom-button">
        <button type="submit" className="btn btn-primary">
          save
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
