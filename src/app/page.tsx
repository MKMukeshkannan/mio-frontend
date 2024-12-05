'use client'

import { Navbar } from '@components/navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { z } from 'zod';

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);

  const SearchValidator = z.object({ input: z.string().min(3) });
  type TSearch = z.infer<typeof SearchValidator>;

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<TSearch>({
    resolver: zodResolver(SearchValidator),
  });

  const router = useRouter();

  const onSubmit = async (data: TSearch) => {
    try {
      router.push(`/institute?query=${data.input}`);
    } catch (e) {
      setError("root", {
        type: "server",
        message: "Something went wrong with the server.",
      });
    }
  };

  return (
    <main className="flex flex-col g-4 w-full min-h-screen p-4">
      <Navbar />

      <section className="flex flex-col justify-center items-start min-w-full h-0 flex-1 px-10">
        <AnimatePresence>
          {!isFocused && (
            <motion.div
              key="content"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-black mb-5 text-5xl font-mono w-full h-full">
                Enter Institute Name
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className= "flex w-full"
          initial={isFocused ? { y: 0 } : { scale: 1, x: 0 }}
          animate={isFocused ? { y: -400 } : { scale: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            {...register("input")}
            type="text"
            className={`w-1/2 h-12 rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl ${
              errors.input && "border-red-400"
            }`}
            onFocus={() => setIsFocused(true)}
          />
          <button
            disabled={isSubmitting}
            className={`w-20 h-12 rounded border border-[#9888FF] bg-[#AC9EFF] hover:bg-[#9888FF] text-xl ml-5 ${
              errors.input && "bg-red-500"
            }`}
          >
            🔍
          </button>
        </motion.form>
        <AnimatePresence>
          {!isFocused && (
            <motion.div
              key="content"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl mt-5 w-1/2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                purus eget sapien. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed ut purus eget sapien.{" "}
                <span className="text-[#AC9EFF] cursor-pointer">Learn More ...</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

