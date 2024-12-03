import { Institute } from '@components/institute'
import { Navbar } from '@components/navbar'



export default function Home (){
    const collegeNames: string[] = [
      "Indian Institute of Technology Madras", "Stanford University",
      "Massachusetts Institute of Technology (MIT)",
      "California Institute of Technology (Caltech)",
      "University of Oxford",
      "Harvard University",
      "University of Cambridge",
      "ETH Zurich - Swiss Federal Institute of Technology",
      "National University of Singapore (NUS)",
      "University of California, Berkeley (UC Berkeley)"
    ];

    return (

        <div className='flex flex-col w-screen h-screen gap-20 px-4'>

            <Navbar/>

            <div className='flex flex-col items-center'>

                <div className='grid gap-20 grid-cols-3'>

                    <div className="flex gap-4 w-full h-full col-span-3">
                        <input type="text" className="border-2 border-black rounded w-2/5 p-4 shadow-gray-400 shadow-lg" />
                        <button className="bg-black text-white p-4 shadow-gray-400 shadow-lg">Search</button>
                    </div>

                    {collegeNames.map((name,i:number)=>(
                        <Institute name={name} key={i}/>
                    ))}

                </div>  

            </div>

        </div>

    )
}
