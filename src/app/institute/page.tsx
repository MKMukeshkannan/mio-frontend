'use client'

import axios from '@/utils/axios';
import { backend } from '@/utils/config';
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
		console.log(backend)
        const get_search_data = async () => {
          const response = await axios.get(`/api/v1/institutions/search-institutions?query=${search_params.get("query")}`);
				console.log(response)
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

        <main className='flex flex-col g-4 w-full min-h-screen p-4'>
            <Navbar/>

      <section className="flex flex-col px-10">
            <form onSubmit={handleSubmit(onSubmit)} className='flex w-full'>
              <input {...register("input")}  className="w-1/2 h-12 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl" />
              <button type='submit' disabled={isSubmitting} className="w-20 h-12 rounded border border-[#9888FF] bg-[#AC9EFF] hover:bg-[#9888FF] text-xl ml-5">
            🔍
              </button>
              {errors.input?.message}
            </form>

            <section>
              {data?.map((val, i) => 
                <div key={i} className='border'>
                  <Link href={`institute/${val.ins_id}`}>{val.name}</Link>
                </div>) }
            </section>
</section>
        </main>

    )
}
