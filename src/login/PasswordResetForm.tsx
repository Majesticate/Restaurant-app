import React from "react";

interface PasswordResetFormProps {
  resetEmail: string;
  setResetEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  resetEmail,
  setResetEmail,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/images/2.png')] bg-cover bg-center pb-100">
      <form
        className="bg-black opacity-65 p-8 rounded-lg shadow-lg text-center w-full "
        onSubmit={onSubmit}
      >
        <h2 className="text-white text-2xl font-bold mb-4">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="text-white placeholder-white w-full p-3 mb-3 rounded-md border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          type="submit"
          className="w-1/2 p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          Reset Password
        </button>

        <div
          className="mt-4 text-white text-sm cursor-pointer hover:underline"
          onClick={onBack}
        >
          Back to Login
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
