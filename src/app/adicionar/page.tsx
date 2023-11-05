"use client"
import Link from "next/link"
import { Check } from "lucide-react"
import { useEffect, useState, useRef, FormEvent } from "react"
import { api } from "@/services/api"

interface CustomersProps {
  id: string
  name: string
  email: string
  status: boolean
  createAp: string
}

export default function AdicionarColaborador() {
  const [customers, setCustomers] = useState<CustomersProps[]>([])

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!nameRef.current?.value || !emailRef.current?.value)
      return alert("PREENCHA TODOS OS CAMPOS")

    const response = await api.post("/cliente", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    })

    setCustomers((allCustomers) => [...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
    return alert("AGENTE REGISTRADO COM SUCESSO")
  }

  return (
    <>
      <main className="flex items-center justify-center w-screen h-screen bg-neutral-900">
        <div className="flex flex-col w-[500] h-4/5 gap-6">
          <h1 className="font-black text-3xl text-[#fcee0a] tracking-wider uppercase">
            Implantar Agentes
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              ref={nameRef}
              name="titulo"
              id="titulo"
              placeholder="Insira a identificação do agente"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 focus:outline-none focus:border-2 focus:border-[#4bff20] px-4 py-2"
            />
            <input
              type="email"
              ref={emailRef}
              name="titulo"
              id="titulo"
              placeholder="Insira o e-mail do agente"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 focus:outline-none focus:border-2 focus:border-[#4bff20] px-4 py-2"
            />
            <div className="flex justify-end items-center gap-6">
              <Link
                href="/"
                className="flex justify-center items-center text-zinc-300 text-sm font-semibold h-full uppercase hover:text-red-500"
              >
                Abortar
              </Link>

              <button className="flex justify-center items-center gap-2 rounded-md bg-[#fcee0a] text-neutral-950 font-black px-4 py-2 hover:bg-[#4bff20] transition-all duration-150 delay-75 -skew-x-12 ease-in-out hover:skew-x-12 uppercase">
                <Check size={16} />
                Injetar
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
