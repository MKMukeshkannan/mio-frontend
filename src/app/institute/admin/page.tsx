'use client'

import useAxiosPrivate from "@/hooks/useAxios";
import { useEffect, useState } from "react";

export default function InstituteAdmin() {
  const [profile, setProfile] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const get_profiles = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/institutions/admin", {
          signal: controller.signal,
        });
        isMounted && response.status !== 204 && setProfile(response.data);
        console.log(response.data)
      } catch (e: any) {
        if (e?.name === "CanceledError") console.log("Request Is Aborted");
        else {
          console.log(e);
          // navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    get_profiles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return <h1>{JSON.stringify(profile)}</h1>
};
