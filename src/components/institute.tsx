import Image from 'next/image'

export const Institute = ({name,i}:{name: string, i: number},) => {
    return (
        <div key={i} className="flex flex-col w-[500px] items-center border-2 border-black gap-4 rounded">

            <Image src="https://picsum.photos/500/300" width={500} height={300} alt="logo" />

            <div className="p-4 flex flex-col gap-4 items-center ">
                <h1 className="text-2xl font-bold">{name}</h1>

                <div className='text-xl font-bold text-justify'>
                   ipsum primis in faucibus. Sed rhoncus sem turpis, convallis condimentum lacus iaculis non. 
                </div>
            </div>

        </div>
    )
}
