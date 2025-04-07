import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Firebase config
import LoginFormComponent from "./LoginFormComponent";
import PasswordResetForm from "./PasswordResetForm";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doc, getDoc } from "firebase/firestore";

const LoginForm: React.FC = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to check user role after login
  const checkUserRole = async (userUid: string) => {
    const userRef = doc(db, "users", userUid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userRole = userDoc.data()?.role;
      if (userRole === "admin") {
        // Redirect to admin page
        navigate("/"); // React Router v6 method to navigate
      } else {
        // Redirect to regular user page (if needed)
        navigate("/");
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      try {
        alert("Password reset email sent!");
        setForgotPassword(false);
      } catch (error) {
        alert("Failed to send reset email.");
      }
    } else {
      alert("Please enter your email.");
    }
  };

  // Listen for changes in auth state (sign in)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Check if user is an admin or not
        setLoading(true);
        await checkUserRole(user.uid);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/images/2.png')] bg-cover bg-center pb-100">
      {loading ? (
        <p>Loading...</p> // You can add a loading spinner here
      ) : !forgotPassword ? (
        <LoginFormComponent setForgotPassword={setForgotPassword} />
      ) : (
        <PasswordResetForm
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          onSubmit={handleForgotPassword}
          onBack={() => setForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default LoginForm;
