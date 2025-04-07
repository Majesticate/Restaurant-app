import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Add db
import { doc, setDoc } from "firebase/firestore"; // Import Firestore

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!formData.password) tempErrors.password = "Password is required.";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Conditional role assignment (e.g., if email is admin@example.com, make the user an admin)
      const role = "user";

      // Add user to Firestore with the assigned role
      await setDoc(doc(db, "users", user.uid), {
        email: formData.email,
        role: role, // Assign the role (admin or user)
      });

      alert("Registration successful!");
    } catch (error: any) {
      // Handle specific Firebase error codes and show relevant messages
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email is already in use. Please use a different email." });
      } else {
        setErrors({ email: error.message });
      }
    }
    setLoading(false);
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
