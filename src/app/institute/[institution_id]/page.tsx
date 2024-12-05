import { Navbar } from '@components/navbar'
import { notFound } from 'next/navigation';
import { backend } from '@/utils/config';

interface TInstitute {
  ins_id: string;
  name: string;
  website: string;
  phone: string;
}


async function get_staffs(id: string) {
  try {
    let res = await fetch(`${backend}/api/v1/institutions/get-all-staffs/${id}`, {
      cache: 'force-cache',
    })

    let data: TInstitute[] = await res.json()
    if (!data) notFound()
    return data 
  } catch (e) {
    notFound();
  }
};

async function get_institute(id: string) {
  try {
    let res = await fetch(`${backend}/api/v1/institutions/get-institute/${id}`, {
      cache: 'force-cache',
    })

    let data: TInstitute[] = await res.json()
    if (!data) notFound()
  return data 
  } catch (e) {
    notFound();
  }
};

export async function generateStaticParams() {
  let institutions = await fetch(`${backend}/api/v1/institutions/get-all`, {
    cache: 'force-cache',
  }).then((res) => res.json())
 
  return institutions.data.map((institute: TInstitute) => ({
    id: institute.ins_id,
  }))
}

export default async function Home ({ params, }: { params: Promise<{ institution_id: string }> }) {
    const { institution_id } = await params;
    const institution = await get_institute(institution_id)
    const staffs = await get_staffs(institution_id)


    const staffNames: string[] = [
      "John Doe",
      "Jane Smith",
      "Samuel Brown",
      "Emily Davis",
      "Michael Johnson",
      "Sarah Wilson",
      "David Lee",
      "Anna Taylor",
      "Robert White",
      "Olivia Harris",
    ];

    return (
        <div className="flex flex-col g-4 min-w-screen min-h-screen px-4"> 

            <Navbar />

            {JSON.stringify(institution)}
            {JSON.stringify(staffs)}

            {/*
            <div className='flex flex-col items-center pt-20'>

                <div className='grid gap-20 grid-cols-3'>

                    <div className="col-span-3 flex flex-col">

                        <div className="text-black text-8xl font-bold w-full h-full">LOOK FOR STAFFS</div>

                        <div className="flex gap-4 w-full h-full">
                            <input type="text" className="border-2 border-black rounded w-1/3 p-4 shadow-gray-400 shadow-lg" />
                            <button className="bg-black text-white p-4 shadow-gray-400 shadow-lg">Search</button>
                        </div>

                    </div>

                    {staffNames.map((name,i:number)=>(
                        <Institute name={name} key={i}/>
                    ))}

                </div>  

            </div>
            */}

        </div>
    )
}
