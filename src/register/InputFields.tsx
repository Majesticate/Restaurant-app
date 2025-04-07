import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="text-left mb-3">
      <label className="text-white block mb-1">{placeholder}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-white placeholder-white w-full p-3 rounded-md border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
