'use client'

import axios from "@/utils/axios";
import { InstitutionSignUp } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const router = useRouter()

  type TInstitutionSignup = z.infer<typeof InstitutionSignUp>;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TInstitutionSignup>({
    resolver: zodResolver(InstitutionSignUp)
  });
  const onSubmit = async (data: TInstitutionSignup) => {
    try {
      const response = await axios.post("/api/v1/auth/institute/signup", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      if (response.statusText === "OK") return router.push('/login');
    } catch (e) {
      setError("root", {
        type: "server",
        message: "Somthing With The Server",
      });
    }
  };

  return (
    <main className="flex items-center w-full min-h-screen">
      <h1 className="cursor-pointer absolute top-10 right-10 font-bold">HOME</h1>

        <form className="flex flex-col items-center space-y-3 w-full" onSubmit={handleSubmit(onSubmit)} >
          <h1 className="text-5xl font-bold">SIGN UP</h1>
          <input 
            {...register("name")}
            className={`${errors.name && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="name" 
          />
          <input 
            {...register("website")}
            className={`${errors.website && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="website" 
          />
          <input 
            {...register("mail")}
            className={`${errors.mail && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="mail" 
          />
          <input 
            {...register("phone_number")}
            className={`${errors.phone_number && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="phone number" 
          />
          <input 
            {...register("username")}
            className={`${errors.username && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="username" 
          />
          <input
            {...register("password")}
            className={`${errors.password && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="password"
            type="password" 
          />
          <input
            {...register("confirm_password")}
            className={`${errors.confirm_password && "shadow-red-500" } shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm `}
            placeholder="confirm password"
            type="password" 
          />
          <button disabled={isSubmitting} type="submit" className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] p-5 py-2 bg-blue-400 hover:bg-blue-200 rounded-sm relative top-3">
            SIGN UP
          </button>
          <p className="relative top-5 text-sm"> Already have an accout ? <span className="font-bold cursor-pointer">Login</span></p>
        </form>
    </main>
  );
}
