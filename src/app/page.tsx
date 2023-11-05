"use client"
import NavBar from "@/components/navbar"
import { api } from "@/services/api"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface CustomersProps {
  id: string
  name: string
  email: string
  status: boolean
  createAp: string
}

export default function Home() {
  const [customers, setCustomers] = useState<CustomersProps[]>([])

  useEffect(() => {
    loadCustomeres()
  }, [])

  async function loadCustomeres() {
    const response = await api.get("/clientes")
    setCustomers(response.data)
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/cliente", {
        params: {
          id: id,
        },
      })

      const allCustomers = customers.filter((custome) => custome.id !== id)
      setCustomers(allCustomers)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main className="flex flex-col w-screen h-screen bg-neutral-900">
      <NavBar />

      <div
        className="flex flex-col w-full h-full p-4 bg-no-repeat bg-[#fcee0a]"
        style={{
          backgroundImage:
            "url('https://www.cyberpunk.net/build/images/razor-bottom-black-4930e500.svg')",
        }}
      >
        <div className="flex w-[500px] flex-col p-8 mx-auto">
          <h2 className="font-black text-4xl text-neutral-950 tracking-wider uppercase">
            Agentes
          </h2>

          <section className="flex flex-col gap-6 mt-10 w-[500px">
            <table className="w-full">
              <thead className="bg-neutral-950 border-2 border-neutral-950">
                <tr>
                  <th
                    scope="col"
                    className="p-2 text-left  font-black text-[#fcee0a] uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-left  font-black text-[#fcee0a] uppercase tracking-wider"
                  >
                    E-mail
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-center  font-black text-neutral-950 bg-[#fcee0a]  uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="p-2 text-center  font-black text-[#fcee0a] uppercase tracking-wider"
                  >
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {customers
                  .slice()
                  .reverse()
                  .map((custome) => (
                    <tr
                      key={custome.id}
                      className="border-b border-b-neutral-950/10"
                    >
                      <td className="py-4 whitespace-nowrap ">
                        <p className="text-sm text-gray-900">{custome.name}</p>
                      </td>

                      <td className="py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{custome.email}</p>
                      </td>

                      <td className="text-center py-4 whitespace-nowrap">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            custome.status
                              ? "bg-[#4bff20]/25 text-neutral-950"
                              : "bg-red-500/25 text-red-900"
                          }`}
                        >
                          {custome.status ? "Ativo" : "Inativo"}
                        </p>
                      </td>

                      <td className="text-center py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(custome.id)}
                          className="bg-red-500/80 m-auto w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-800 transition-all delay-300 duration-300 ease-in-out px-2 hover:rotate-12"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </main>
  )
}
