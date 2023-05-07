import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <footer className='bg-gray-900 text-zinc-300 block'>
            <div className='grid grid-cols-6 gap-4 py-8'>
                <div className="col-start-2 col-span-2 grid ">
                    <h3 className='font-medium'>Design Lux</h3>
                    <p className='text-sm '>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis impedit dignissimos qui harum aperiam magni amet eveniet corrupti iure vel? Aperiam mollitia quisquam quidem doloribus dolorum! Corporis, natus? Perferendis, odio!
                    </p>
                </div>
                <div className="col-start-5 grid gap-1 text-sm text-center">
                    <h3 className='font-medium text-base mb-4'>Contact</h3>
                    <p> Burnaby, V5C 1D3</p>
                    <p>contact@designlux.com</p>
                    <p>+1 (236)985-1546</p>
                    <div className="grid gap-2 text-center ">
                        <div className='flex items-center gap-2'>
                            <i className={`fas fa-lg fa-envelope`}></i>
                            <p>andresfelipear@gmail.com</p>
                        </div>
                        <div className='flex gap-5 justify-center'>
                            <FontAwesomeIcon size="lg" icon={faFacebook} />
                            <FontAwesomeIcon size="lg" icon={faInstagram} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black text-center py-3 italic text-sm" >
                © Copyright: Andres Arevalo
            </div>
        </footer>

    )
}
