import { Button, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    // trim() loại bỏ khoảng trống
    Object.keys(values).forEach(
      (k) =>
        (values[k] =
          typeof values[k] == "string" ? values[k].trim() : values[k])
    );

    console.log("Values:", values);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      console.log("🚀 ~ onFinish ~ data:", data);
      if (data.success === false) {
        message.error("Đã xảy ra lỗi");
      }
      navigate("/");
      message.success("Đăng ký thành công");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-700 bg-clip-text text-transparent my-6">
        Đăng ký tài khoản
      </h1>

      <div className="w-full flex justify-center">
        <Form
          name="signup"
          labelCol={{
            span: 5,
          }}
          style={{
            width: "70%",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên người dùng"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui có điền đúng định dạng email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng nhập lại đúng mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp nhau!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div className="flex flex-col gap-3 lg:w-[50%] w-full mx-auto">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Đăng ký"}
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-[0.5px] bg-gray-300 w-full"></div>
                <div className="text-xs text-gray-500">Hoặc</div>
                <div className="h-[0.5px] bg-gray-300 w-full"></div>
              </div>
              <Button size="large" icon={<FcGoogle />} block>
                Đăng ký với Google
              </Button>
              <p>
                Đã có tài khoản?{" "}
                <Link to="/sign-in" className="text-cyan-500">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
