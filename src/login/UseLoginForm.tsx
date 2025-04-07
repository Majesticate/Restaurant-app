import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Import Firebase auth and db
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions

export const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state to manage the loading screen

  const validate = (): boolean => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check user role in Firestore
  const checkUserRole = async (userUid: string, navigate: any) => {
    const userRef = doc(db, "users", userUid); // Reference to the user document in Firestore
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userRole = userDoc.data()?.role; // Fetch the role from Firestore
      if (userRole === "admin") {
        navigate("/"); // Redirect to admin page
      } else {
        navigate("/"); // Redirect to regular user page
      }
    } else {
      console.error("User not found in Firestore");
      navigate("/"); // Fallback redirect
    }
  };

  const handleSubmit = async (e: React.FormEvent, navigate: any) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true); // Start loading state

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Login successful:", userCredential);
        localStorage.setItem("user", JSON.stringify(userCredential.user));

        setLoginSuccess(true);

        // Check user role after successful login
        const user = userCredential.user;
        if (user) {
          checkUserRole(user.uid, navigate); // Pass the user UID to check the role
        }

        setTimeout(() => {
          setLoginSuccess(false);
          setLoading(false); // Stop loading state
        }, 3000); // Show message for 3 seconds before clearing the success message
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to log in. Please try again.");
        setLoading(false); // Stop loading in case of error
      }
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loginSuccess,
    loading,
    handleChange,
    handleSubmit,
  };
};
