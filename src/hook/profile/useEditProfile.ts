import { toast } from "sonner";
import apis, { noAuth } from "../authAxios";
import { useNavigate } from "react-router-dom";

export const useEditProfile = () => {
  const navigate = useNavigate();

  const editProfile = async (data: Record<any, any>) => {
    let id: string | number | undefined; //to  manage toast notification state
    try {
      id = toast.loading("Updating your Profile...");
      const res = await apis.patch("/api/card/update", { data });
      toast.success("Profile Updated", { id });

      navigate("/dashboard");
      return res.data;
    } catch (err: any) {
      if (err.response) {
        toast.error(`${err?.response?.data?.message}`, { id }); // server responded with an error
      } else {
        toast.error(`${err?.message}`, { id }); // no response at all
      }
    }
  };

  const getProfile = async () => {
    let id: string | number | undefined; //to  manage toast notification state
    try {
      id = toast.loading("Loading...");
      const res = await apis.get("/api/card/user/cards"); //inital get for the edit page
      toast.success("Profile ready to edit", { id });

      return res.data;
    } catch (err: any) {
      if (err.response) {
        toast.error(`${err?.response?.data?.message}`, { id }); // server responded with an error
      } else {
        toast.error(`${err?.message}`, { id }); // no response at all
      }
    }
  };

  const mainProfile = async (name: string) => {
    let id: string | number | undefined;
    try {
      id = toast.loading("Please wait this profile is loading");
      const res = await noAuth.get(`/api/card/${name}`);
      toast.success("Information ready", { id });

      return res.data;
    } catch (err: any) {
      if (err.response) {
        toast.error(`${err?.response?.data?.message}`, { id }); // server responded with an error
      } else {
        toast.error(`${err?.message}`, { id }); // no response at all
      }
      navigate('/')
    }
  };

  return { editProfile, getProfile, mainProfile };
};
