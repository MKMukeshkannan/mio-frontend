import Link from "next/link"

export const Navbar = () => {
    return(
        <main className="flex items-center justify-between p-4 lg:p-10 fixed top-0 w-full z-[1000]">
            <span className="text-3xl font-bold">Cool Name</span>
            <span className="font-mono"><Link  className="text-[#AC9EFF] hover:underline" href="/login">Login</Link>  <Link className="pl-5 hover:underline" href="/signup">Sign Up</Link></span>
        </main>
    )
}
