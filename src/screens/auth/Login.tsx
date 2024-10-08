import SocialLogin from "@/screens/auth/components/SocialLogin";
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false)

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <div>
      <Card >
        <div className="text-center">
          <Title>Login</Title>
          <Paragraph type="secondary">
            Welcome back! Please enter your details
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form} 
          onFinish={handleLogin}
          disabled={isLoading}
          size="large"
        >
          <FormItem
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
            ]}
          >
            <Input allowClear maxLength={100} type="email" placeholder="Enter your email"/>
          </FormItem>
          <FormItem
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input maxLength={100} type="password" placeholder="••••••••••••••••"/>
          </FormItem>
        </Form>

        <div className="flex items-center justify-between">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(e) => setIsRemember(e.target.checked)}
            >
              Remember for 7 days
            </Checkbox>
          </div>
          <div className="col text-right underline">
            <Link to={'/'}>Forgot password?</Link>
          </div>
        </div>

        <div className="mt-4 mb-3">
          <Button
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
            onClick={() => form.submit()}
          >
            Login
          </Button>
        </div>

        <SocialLogin text="Login with Google"/>

        <div className="mt-3 text-center">
            <Space>
              <p>Don't have an account?</p>
              <Link to={'/sign-up'} className="text-blue-600 hover:underline">Sign up</Link>
            </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;