import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // Import Firebase
import { doc, getDoc } from "firebase/firestore";

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) return <p>Loading...</p>; // Prevents flashing

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
