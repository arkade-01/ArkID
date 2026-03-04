import { Outlet } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export const AuthContext = () => {

const { authenticated, ready } = usePrivy();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) {
      navigate("/");
      toast.error("You have not logged in or signed up");
    }
  }, [ready, authenticated]);

  if (!ready) {
    return <p className="text-center mt-10">Loading...</p>; // or loader
  }

  if (!authenticated) {
    return null;
  }

  return (
      <Outlet />
  );
};
