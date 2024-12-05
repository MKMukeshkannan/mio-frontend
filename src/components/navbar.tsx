import Link from "next/link"

export const Navbar = () => {
    return(
        <main className="flex p-4 justify-between text-black text-xl font-bold">
            <span className="text-3xl font-bold">Cool Name</span>
            <span className="font-mono"><Link  className="text-[#AC9EFF] hover:underline" href="/login">Login</Link>  <Link className="pl-5 hover:underline" href="/signup">Sign Up</Link></span>
        </main>
    )
}
