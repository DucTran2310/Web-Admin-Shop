import handleAPI from "@/apis/handleAPI"
import { addAuth } from "@/redux/reducers/authReducer"
import SocialLogin from "@/screens/auth/components/SocialLogin"
import { Button, Card, Checkbox, Form, Input, Space, Typography } from "antd"
import FormItem from "antd/es/form/FormItem"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const { Title, Paragraph } = Typography

const Login = () => {

  const dispatch = useDispatch()

  const [form] = Form.useForm()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRemember, setIsRemember] = useState<boolean>(false)

  const handleLogin = async (values: { email: string, password: string }) => {
    try {
      const res = await handleAPI('/auth/login', values, 'post')

      res.data && dispatch(addAuth(res.data))
      toast.success(res.message, {
        position: "top-right"
      })
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right"
      })
    }
  }

  return (
    <div>
      <Card>
        <div className="flex flex-col items-center text-center">
          <img
            className="mb-3"
            src="https://firebasestorage.googleapis.com/v0/b/admin-shop-6e6a7.appspot.com/o/Logo_sm.png?alt=media&token=a27b16b6-a1ee-4beb-9faa-556788856b52"
            alt="logo"
            style={{
              width: 48,
              height: 48,
            }}
          />
          <Title>Log in to your account</Title>
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
              maxLength={100}
              type="password"
              placeholder="••••••••••••••••"
            />
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
            <Link to={"/"}>Forgot password?</Link>
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

        <SocialLogin text="Login with Google" />

        <div className="mt-3 text-center">
          <Space>
            <p>Don't have an account?</p>
            <Link to={"/sign-up"} className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </Space>
        </div>
      </Card>
    </div>
  )
}

export default Login
