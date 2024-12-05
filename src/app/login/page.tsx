"use client";

import axios from "@/utils/axios";
import { useAuthContext } from "@/utils/store";
import { LoginValidator } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TLoginType = "institution" | "staff";

export default function Login() {
  const [loginType, setLoginType] = useState<TLoginType>("institution");
  const router = useRouter()
  const setAuth = useAuthContext(s => s.setAuth);

  type TLogin = z.infer<typeof LoginValidator>;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TLogin>({
    resolver: zodResolver(LoginValidator)
  });
  const onSubmit = async (data: TLogin) => {
    try {
      const response = await axios.post("/api/v1/auth/institute/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      console.log(response.data);
      setAuth({
        id: "",
        name: response.data.name || "",
        email: response.data.email || "",
        type: (loginType === 'staff') ? "STF" : "INS",
      });

      if (response.statusText === "OK") return router.push('institute/admin');

    } catch (e) {
      setError("root", {
        type: "server",
        message: "Somthing With The Server",
      });
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full  space-y-3">
        <h1 className="text-5xl font-bold">Welcome to Cool Name</h1>
        <p className="text-xl">
          Login as:{" "}
          <span className={`cursor-pointer hover:italic ${loginType === "institution" && "underline text-[#AC9EFF]"}`} onClick={() => setLoginType("institution")}>
            Institution
          </span>{" | "}
          <span className={`cursor-pointer hover:italic ${loginType === "staff" && "underline text-[#AC9EFF]"}`} onClick={() => setLoginType("staff")}>
            Staff
          </span>
        </p>
        <input 
          {...register("username")}
          className="w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl"
          placeholder="Mail ID" 
        />
        <input
          {...register("password")}
          className="w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl"
          placeholder="Password"
          type="password" 
        />
        <button disabled={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="w-2/12 p-5 rounded border border-[#9888FF] bg-[#AC9EFF] hover:bg-[#9888FF] text-xl">
          Login
        </button>
        <p className="relative top-5 text-sm">New Institution ? <span className="text-[#AC9EFF] cursor-pointer">Sign-Up</span> with us</p>
      </form>
    </main>
  );
}
