import handleAPI from "@/apis/handleAPI";
import SocialLogin from "@/screens/auth/components/SocialLogin";
import { Button, Card, Checkbox, Form, Input, message, Space, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleSignup = async (values: { email: string; password: string }) => {
    console.log(values);
    setIsLoading(true);

    try {
      const res = await handleAPI("/auth/register", values, "post");

      console.log("VVVRESPONSE: ", res);
    } catch (error: any) {
      console.log("VVVERROR: ", error);
      message.error(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <div className="text-center">
          <Title>Create an account</Title>
          <Paragraph type="secondary">Start your 30-day free trial.</Paragraph>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSignup}
          disabled={isLoading}
          size="large"
        >
          <FormItem
            name="name"
            label="Name*"
            rules={[
              {
                required: true,
                message: "Please enter name",
              },
            ]}
          >
            <Input
              allowClear
              maxLength={100}
              type="text"
              placeholder="Enter your name"
            />
          </FormItem>
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
            <Input
              allowClear
              maxLength={100}
              type="email"
              placeholder="Enter your email"
            />
          </FormItem>
          <FormItem
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
              {
                min: 8,
                message: "Must be at least 8 characters.",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            ]}
          >
            <Input
              minLength={8}
              maxLength={100}
              type="password"
              placeholder="••••••••••••••••"
            />
          </FormItem>

          <FormItem
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]} // Ensures that password field is taken into account
            hasFeedback // Shows feedback after confirming
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input
              maxLength={100}
              type="password"
              placeholder="••••••••••••••••"
            />
          </FormItem>
        </Form>

        <div className="mt-5 mb-3">
          <Button
            loading={isLoading}
            type="primary"
            style={{
              width: "100%",
            }}
            size="large"
            onClick={() => form.submit()}
          >
            Sign up
          </Button>
        </div>

        <SocialLogin text="Sign up with Google" />

        <div className="mt-3 text-center">
          <Space>
            <p>Already have an account?</p>
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
