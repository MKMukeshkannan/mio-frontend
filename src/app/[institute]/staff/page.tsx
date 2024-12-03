import { Navbar } from '@components/navbar'
import { Institute } from '@/components/institute';

export default function Home (){

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

        </div>
    )
}
