import axios from "@/utils/axios";
import { useAuthContext } from "@/utils/store";

export default function useRefresh() {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/api/v1/auth/refresh_token", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    setAuth({
      name: response.data.name,
      email: response.data.email,
      type: response.data.type,
      access_token: response.data.access_token,
    });

    return response.data;
  };

  return refresh;
}
