'use client'

import { Navbar } from '@components/navbar'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Home (){
  const SearchValidator = z.object({input: z.string().min(3)});
  type TSearch = z.infer<typeof SearchValidator>;
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TSearch>({
    resolver: zodResolver(SearchValidator)
  });


  const router = useRouter();

  const onSubmit = async (data: TSearch) => {
    try {
      router.push(`/institute?query=${data.input}`);
    } catch (e) {
      setError("root", {
        type: "server",
        message: "Somthing With The Server",
      });
    }
  };

    return (
        <div className="flex flex-col g-4 min-w-screen min-h-screen px-4"> 
            <Navbar />

            <div className="flex flex-col justify-center items-start min-w-full h-0 flex-1 px-10">
                <div className="text-black text-8xl font-bold w-full h-full">LOOK FOR INSTITUTIONS</div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 w-full h-full">
                    <input {...register("input")} type="text" className={`border-2 border-black rounded w-1/3 p-4 shadow-gray-400 shadow-lg  ${errors.input && "border-red-400"}`} />
                    <button disabled={isSubmitting} className={`bg-black text-white p-4 shadow-gray-400 shadow-lg ${errors.input && "bg-red-500"}`}>Search</button>
                </form>
            </div>
        </div>
    )
}

