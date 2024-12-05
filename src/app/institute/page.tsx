'use client'

import axios from '@/utils/axios';
import { Institute } from '@components/institute'
import { Navbar } from '@components/navbar'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface TData {
  ins_id: string;
  name: string;
};

export default function Home (){
    // const collegeNames: string[] = [
    //   "Indian Institute of Technology Madras", "Stanford University",
    //   "Massachusetts Institute of Technology (MIT)",
    //   "California Institute of Technology (Caltech)",
    //   "University of Oxford",
    //   "Harvard University",
    //   "University of Cambridge",
    //   "ETH Zurich - Swiss Federal Institute of Technology",
    //   "National University of Singapore (NUS)",
    //   "University of California, Berkeley (UC Berkeley)"
    // ];

    const search_params = useSearchParams();
    const query = (search_params.get("query"));
    const [ data, setData ] = useState<TData[]>();

    useEffect(() => {
      try {
        const get_search_data = async () => {
          const response = await axios.get(`/api/v1/institutions/search-institutions?query=${search_params.get("query")}`);
          setData(response.data.result);
        };

        get_search_data();
      } catch (e) {
        console.log(e);
      };
    }, [query])

    const router = useRouter();
    const SearchValidator = z.object({input: z.string().min(3)});
    type TSearch = z.infer<typeof SearchValidator>;
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TSearch>({
      resolver: zodResolver(SearchValidator),
      defaultValues: {input: query || ""}
    });

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

        <div className='flex flex-col w-screen h-screen px-4 bg-sky-50'>
            <Navbar/>

            <form onSubmit={handleSubmit(onSubmit)} className='flex space-x-3'>
              <input {...register("input")}  className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] h-8 text-xl rounded-md border border-[#0a0a0a] focus:outline-none p-5 w-full max-w-sm" />
              <button type='submit' disabled={isSubmitting} className="shadow-[3px_3px_0px_0px_rgba(0,0,0)] bg-blue-400 hover:bg-blue-200 rounded-sm px-5">
                LOGIN
              </button>
              {errors.input?.message}
            </form>

            <section>
              {data?.map((val, i) => 
                <div key={i} className='border'>
                  <Link href={`institute/${val.ins_id}`}>{val.name}</Link>
                </div>) }
            </section>

            {/*
            <div className='flex flex-col items-center'>

                <div className='grid gap-20 grid-cols-3'>

                    <div className="flex gap-4 w-full h-full col-span-3">
                        <input type="text" className="border-2 border-black rounded w-2/5 p-4 shadow-gray-400 shadow-lg" />
                        <button className="bg-black text-white p-4 shadow-gray-400 shadow-lg">Search</button>
                    </div>

                    {collegeNames.map((name,i:number)=>(
                        <Institute i={i} name={name} key={i}/>
                    ))}

                </div>  

            </div>
            */}

        </div>

    )
}
