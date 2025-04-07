import React from "react";

interface TextInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-white text-xl sm:text-2xl placeholder-white w-full p-3 rounded-md border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
