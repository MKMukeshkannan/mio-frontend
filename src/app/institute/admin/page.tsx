"use client";

import useAxiosPrivate from "@/hooks/useAxios";
import { useAuthContext } from "@/utils/store";
import { StaffSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function InstituteAdmin() {
  const [profile, setProfile] = useState();
  const [staffs, setStaffs] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuthContext();

  type TStaff = z.infer<typeof StaffSchema>;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TStaff>({
    resolver: zodResolver(StaffSchema)
  });
  const onSubmit = async (data: TStaff) => {
    console.log(data);
    try {
      await axiosPrivate.post("/api/v1/institutions/create-staff", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
    } catch (e) {
      console.log(e);
      setError("root", {
        type: "server",
        message: "Somthing With The Server",
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const get_profiles = async () => {
      try {
        const response_profile = await axiosPrivate.get("/api/v1/institutions/admin", {
          signal: controller.signal,
        });

        const response_staffs = await axiosPrivate.get(`/api/v1/institutions/get-all-staffs/${response_profile.data.data.id}`, {
          signal: controller.signal,
        });

        isMounted && response_staffs.status !== 204 && setStaffs(response_staffs.data);
        isMounted && response_profile.status !== 204 && setProfile(response_profile.data);
      } catch (e: any) {
        if (e?.name === "CanceledError") console.log("Request Is Aborted");
        else console.log(e);
      }
    };


    get_profiles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth]);


  return (
    <main>
      <h1>PROFILE</h1>
      <h1>{JSON.stringify(profile)}</h1>
      <br/>
      <h1>STAFFS</h1>
      <h1>{JSON.stringify(staffs)}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border max-w-sm">
        <h1>STAFF DETAILS</h1>
        <input {...register("name")} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full" 
          placeholder="name" />
        <input {...register("email")} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full" 
          placeholder="email" />
        <input {...register("phone_number")} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full" 
          placeholder="phone number" />
        <input {...register("department")} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full" 
          placeholder="department" />
        <input {...register("password")} type="password" className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full" 
          placeholder="password" />

        <button disabled={isSubmitting} type="submit" className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] p-5 py-2 bg-blue-400 hover:bg-blue-200 rounded-sm relative top-3">
          LOGIN
        </button>
      </form>
    </main>
  );
}
