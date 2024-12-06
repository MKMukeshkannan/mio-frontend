"use client";

import { useEffect, useState } from "react";
import { useFilter } from "@/utils/store";


interface TStaff {
  name: string;
  department: string | null;
  designation: string | null;
  email: string | null;
  google_scholer_id: string | null;
  h_index: number | null;
  hashed_password: string | null;
  institution: string | null;
  layout: string | null;
  linked_in: string | null;
  phone_number: string | null;
  profile_picture: string | null;
  staff_id: string | null;
  total_citation: string | null;
}

interface Prop {
  staff_prop: TStaff[];
}

export default function StaffList({ staff_prop }: Prop) {
  const [staff, setStaff] = useState<TStaff[]>(staff_prop);

  const { setSearchName, setHIndex ,filter_state: { search_name, range_h_index } } = useFilter(state => state);


  useEffect(() => {
    if (search_name === '') return setStaff(staff_prop);
    const regex = new RegExp(`${search_name}`, "ig");
    let temp = staff_prop.filter(v => (v.name.match(regex)))

    setStaff(temp);
    console.log(range_h_index);

  }, [search_name, range_h_index]);

  return (
    <>
    <h1 className="text-4xl font-bold pt-5 px-24">Staff Information</h1>
    <section className="px-24 space-x-5 flex ">
      <section className="h-[400px] w-full">
      {staff.map((val) => (
        <section
          key={val.staff_id}
          className="border px-5 py-3 flex items-center space-x-2"
        >
          <div className="rounded-full bg-black h-10 w-10" />
          <div className="w-full">
            <a href={`/staff/${val.staff_id}`} className="text-2xl">
              {val.name}
            </a>
            <div className="flex space-x-2">
              <h1 className="text-sm">{val.department}</h1>
              <h1 className="text-sm">{val.phone_number}</h1>
            </div>
          </div>
          <h1 className="">{val.h_index ?? "N/A"}</h1>
          <h1 className="">{val.total_citation ?? "N/A"}</h1>
        </section>
      ))}
      </section>
      <section className="w-full max-w-sm">
        <input 
          className="w-full max-w-xl rounded border border-[#9888FF] focus:outline-none p-5 bg-[#ECECFF] text-xl" 
          placeholder="search staffs"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </section>
    </section>
    </>
  );
}
