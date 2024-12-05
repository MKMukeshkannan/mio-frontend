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
      <h1 className="cursor-pointer absolute top-10 right-10 font-bold">HOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full max-w-sm space-y-3">
        <h1 className="text-5xl font-bold">LOGIN</h1>
        <p>
          Login as:{" "}
          <span className={`cursor-pointer ${loginType === "institution" && "font-bold"}`} onClick={() => setLoginType("institution")}>
            Institution
          </span>{" | "}
          <span className={`cursor-pointer ${loginType === "staff" && "font-bold"}`} onClick={() => setLoginType("staff")}>
            Staff
          </span>
        </p>
        <input 
          {...register("username")}
          className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full"
          placeholder="username" 
        />
        <input
          {...register("password")}
          className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full"
          placeholder="password"
          type="password" 
        />
        <button disabled={isSubmitting} onSubmit={handleSubmit(onSubmit)} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] p-5 py-2 bg-blue-400 hover:bg-blue-200 rounded-sm relative top-3">
          LOGIN
        </button>
        <p className="relative top-16 text-sm">Need to create new Institution ? <span className="font-bold cursor-pointer">Sign-Up</span></p>
      </form>
    </main>
  );
}
