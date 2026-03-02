import { toast } from "sonner";
import apis from "../authAxios";

export const useEditProfile = () => {

    const editProfile = async (data: Record<any, any>) => {
        try {
            const res = await apis.patch('/api/card/update', {data})
            toast.success('profile updated')

            return res.data
        } catch (err : any) {
            console.log(`an error happened: ${err?.message}`);
            toast.error('error occurred')
        }
    }

  return { editProfile }
}
