"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import CinemaLuxeBackground from "../components/ComponentesExternos/bg"; 

const faqs = [
  {
    question: "¿Cómo puedo comprar entradas?",
    answer: "Puedes comprar tus entradas directamente en nuestra plataforma o en la taquilla del cine. Aceptamos pagos con tarjeta y PayPal."
  },
  {
    question: "¿Hay descuentos para estudiantes?",
    answer: "Sí, ofrecemos descuentos especiales para estudiantes y grupos. Presenta tu identificación en taquilla o usa tu código de estudiante en la compra online."
  },
  {
    question: "¿Puedo cancelar o cambiar mi entrada?",
    answer: "Las cancelaciones son posibles hasta 24 horas antes del evento. Para cambios de fecha, consulta nuestras políticas de reembolso."
  },
  {
    question: "¿Cómo funciona la membresía CineLuxe?",
    answer: "Nuestra membresía te ofrece beneficios exclusivos como descuentos en entradas, acceso a estrenos y promociones especiales."
  },
  {
    question: "¿Puedo llevar comida de fuera?",
    answer: "No permitimos comida externa en nuestras salas, pero ofrecemos una amplia variedad de opciones en nuestro servicio de cafetería."
  }
]

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <>
    <CinemaLuxeBackground/>
      <Header className="fixed top-0 left-0 w-full z-50" />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
        <div className="absolute top-6 left-0 right-0 mt-40 text-center">
          <Link to="/" className="text-4xl font-bold text-[#CDAA7D] hover:text-[#E6CBA8] transition-colors duration-300">
            CineLuxe
          </Link>
        </div>

        <div className="w-full max-w-2xl mt-40 rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.25)] border border-[#CDAA7D] border-opacity-50">
          <div className="bg-gradient-to-t from-[#0F0F0F] to-[#1E1E1E] p-8 flex flex-col items-center">
            <h2 className="text-3xl font-serif font-bold text-[#E0E0E0] mb-3">
              Preguntas Frecuentes
            </h2>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#CDAA7D] to-transparent mb-6"></div>

            <div className="w-full">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left text-[#CDAA7D] font-semibold bg-[#232323] p-3 rounded-md shadow-md focus:outline-none hover:bg-[#3B3B3B] transition"
                  >
                    {faq.question}
                  </button>
                  {activeIndex === index && (
                    <p className="mt-2 text-[#E0E0E0] bg-[#3B3B3B] p-3 rounded-md shadow-inner">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
