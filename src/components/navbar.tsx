"use client"
import Link from "next/link"
import { ChevronsLeft, ChevronsRight, HandMetal } from "lucide-react"

export default function NavBar() {
  return (
    <>
      <nav className="flex p-4 items-center justify-between w-[500px] m-auto">
        <div className="flex items-center gap-4 cursor-pointer">
          <HandMetal
            className="hover:rotate-90 transition-all duration-300 delay-300 ease-in-out"
            size={32}
          />

          <h1 className="flex justify-center items-center gap-2 text-xl font-black uppercase">
            Cyber{" "}
          </h1>
        </div>
        <Link
          href="/adicionar"
          className="flex justify-center items-center gap-2 rounded-md bg-[#fcee0a] text-neutral-950 font-bold px-4 py-2 hover:bg-[#4bff20] transition-all duration-150 delay-75 skew-x-12 ease-in-out hover:-skew-x-12 uppercase"
        >
          <ChevronsLeft />
          Injetar
          <ChevronsRight />
        </Link>
      </nav>
    </>
  )
}
