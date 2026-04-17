import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";
import LoadingSpinner from "../element/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  };

  if (loading) return <LoadingSpinner fullscreen />;

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
