import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { Alert } from "../../components/Alert/Alert";
import { Form, Input, Button } from "antd";
import { emailRule } from "../../components/form/forms";

class SignUp extends Component {
  onSubmit(values) {
    const { login } = this.props;

    login(
      values.email,
      values.password,
      () => {
        this.props.history.push("/");
        Alert("You have signed in successfully.", "success");
      },
      (error) => {
        Alert(error);
      }
    );
  }

  render() {
    return (
      <div className="user-form">
        <Form
          name="login-form"
          className="login-form"
          onFinish={(values) => this.onSubmit(values)}
        >
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
          <Button
            type="secondary"
            className="createButton full-width"
            htmlType="submit"
            // onClick={() => handleOnClickSignUp()}
          >
            login
          </Button>
        </Form>
        {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
        {/* {renderUserForm("login", that, this.onSubmit, btn)} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { login })(SignUp);
