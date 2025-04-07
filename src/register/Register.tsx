import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "./useRegisterForm";
import InputField from "./InputFields"; // Import the reusable input field component

const RegisterForm: React.FC = () => {
  const { formData, errors, loading, handleChange, handleSubmit } =
    useRegisterForm();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/images/2.png')] bg-cover bg-center pb-100">
      <form
        className="inset-0 bg-black opacity-65 p-8 rounded-lg shadow-lg text-center w-220 max-w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-2xl font-bold mb-4">Register</h2>

        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-1/2 p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div
          className="mt-4 text-white text-sm cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
