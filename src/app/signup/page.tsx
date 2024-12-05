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
        <form className="flex flex-col items-center space-y-3 w-full" onSubmit={handleSubmit(onSubmit)} >
          <h1 className="text-5xl font-bold">Welcome to Cool Name</h1>
				<p className="text-xl"> Register your Institution to get started</p>
          <input 
            {...register("name")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Institution Name" 
          />
          <input 
            {...register("website")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Official Website" 
          />
          <input 
            {...register("mail")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Instution Email" 
          />
          <input 
            {...register("phone_number")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Contact Number" 
          />
          <input 
            {...register("username")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Username" 
          />
          <input
            {...register("password")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Password"
            type="password" 
          />
          <input
            {...register("confirm_password")}
            className={`${errors.name && "shadow-red-500" } w-1/4 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl`}
            placeholder="Confirm Password"
            type="password" 
          />
          <button disabled={isSubmitting} type="submit" className="w-2/12 p-5 rounded border border-[#9888FF] bg-[#AC9EFF] hover:bg-[#9888FF] text-xl">
            Sign Up
          </button>
          <p className="relative top-5 text-sm"> Already a regestired Institution ? <span className="text-[#AC9EFF] cursor-pointer">Login</span></p>
        </form>
    </main>
  );
}
