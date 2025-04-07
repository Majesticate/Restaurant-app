import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "./UseLoginForm";
import TextInput from "./TextInput";

interface LoginFormComponentProps {
  setForgotPassword: (value: boolean) => void;
}

const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  setForgotPassword,
}) => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    loginSuccess,
    loading,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <>
      {loginSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          Login successful!
        </div>
      )}

      {loading ? (
        <div className="text-white text-xl">Loading...</div>
      ) : (
        <form
          className="inset-0 bg-black opacity-65 p-8 rounded-lg shadow-lg text-center w-220 max-w-full"
          onSubmit={(e) => handleSubmit(e, navigate)} // Pass navigate here
        >
          <h2 className="text-white text-2xl font-bold mb-4">Login</h2>

          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-1/2 p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Login
          </button>

          <div className="mt-4 flex justify-between text-white text-sm">
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:underline"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </span>
            <span
              className="text-xl sm:text-2xl cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </div>
        </form>
      )}
    </>
  );
};

export default LoginFormComponent;
