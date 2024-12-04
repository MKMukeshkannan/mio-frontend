import Link from "next/link"

export const Navbar = () => {
    return(
        <div className="flex p-4 justify-between text-black text-xl font-bold">
            <span className="text-3xl font-bold">PUB-SUM</span>
            <span><Link href="/login">login</Link> | <Link href="/signup">signup</Link></span>
        </div>
    )
}
