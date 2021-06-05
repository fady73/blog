import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/authAction";
import { Form, Input, Button } from "antd";
import { emailRule } from "../../components/form/forms";

import { Alert } from "../../components/Alert/Alert";

class SignUp extends Component {
  onSubmit(values) {
    const { register, history } = this.props;

    register(
      values.email,
      values.password,
      { displayName: values.username },
      () => {
        history.goBack();
        Alert("You have register in successfully.", "success");
      },
      (error) => {
        Alert(error);
      }
    );
  }

  render() {
    return (
      <div className="user-form">
        <Form name="register-form" onFinish={(values) => this.onSubmit(values)}>
          <Form.Item
            name="username"
            label={"username"}
            rules={[
              {
                required: true,
                message: <p className="br-error"> this field is required </p>,
              },
            ]}
          >
            <Input autoComplete={"" + Math.random()} />
          </Form.Item>
          <Form.Item
            name="email"
            label={"Email"}
            rules={[
              {
                required: true,
                message: <p className="br-error"> this field is required </p>,
              },
              emailRule("this wrong email "),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: <p className="br-error"> this field is required </p>,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={"confirm password"}
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("password not match");
                },
              }),
            ]}
          >
            <Input.Password className="br-signup__password" />
          </Form.Item>
          <Button
            type="secondary"
            className="createButton full-width"
            htmlType="submit"
          >
            register
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { register })(SignUp);
