import React from "react";
import { Grid } from "@mui/material";
import ID2B_white from "assets/images/ID2B_white .jpg";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = () => {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <img src={ID2B_white} alt="" />
        </Grid>
        <Grid container xs={6} style={{ justifyContent: "center" }}>
          <div style={{ justifyContent: "center" }}>
            <h1 class="text-5xl  " style={{ color: "#f5bb07" }}>
              Welcome back
            </h1>
            <h3 class="text-2xl  ml-16 mt-2   "> log in to continue </h3>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    color: "red ",
                    backgroundColor: "#f5bb07",
                    border: "2px solid  #f5bb07",
                    borderRadius: "10px",
                    width: "150px",
                    justifyContent: "center",
                  }}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
