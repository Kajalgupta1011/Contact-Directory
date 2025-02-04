'use client'

import { useState } from 'react'
import CardsPage from './components/CardPage'
import Form from './components/Form'

export default function Home() {
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal((prev)=>!prev)
  }

  return (
    <main className="flex flex-col w-full m-auto max-w-[1280px] items-center justify-between p-24">
      <div className="w-full flex justify-between pb-8">
        <h1 className="text-2xl text-[#202020] font-bold mb-4">Contacts</h1>
        <button className="bg-gray-500 p-3 rounded-md" onClick={toggleModal}>
          Add Contact
        </button>
      </div>
      <CardsPage />
      {modal && <Form handleModal={toggleModal} />}
    </main>
  )
}
