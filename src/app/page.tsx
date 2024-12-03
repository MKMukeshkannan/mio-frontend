import { Navbar } from '@components/navbar'
export default function Home (){
    return (
        <div className="flex flex-col g-4 min-w-screen min-h-screen px-4"> 
            <Navbar />

            <div className="flex flex-col justify-center items-start min-w-full h-0 flex-1 px-10">

                <div className="text-black text-8xl font-bold w-full h-full">LOOK FOR INSTITUTIONS</div>

                <div className="flex gap-4 w-full h-full">
                    <input type="text" className="border-2 border-black rounded w-1/3 p-4 shadow-gray-400 shadow-lg" />
                    <button className="bg-black text-white p-4 shadow-gray-400 shadow-lg">Search</button>
                </div>

            </div>
        </div>
    )
}

