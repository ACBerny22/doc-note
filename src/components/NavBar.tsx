'use client'

import Link from "next/link";
import { logout, isUserValid, model } from "@/PocketBase/PocketBase";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import {FiLogOut} from 'react-icons/fi'
import {RxHamburgerMenu} from 'react-icons/rx'
import {FaUserInjured} from 'react-icons/fa'


export default function NavBar(){

    const router = useRouter();
    const [domLoaded, setDomLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOn, setisMenuOn] = useState(false);


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 900); // Adjust the breakpoint as needed
        };
    

        // Add event listener for resize
        window.addEventListener('resize', handleResize);
    
        // Initial check on component mount
        handleResize();
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        setDomLoaded(true);
      }, []);
    
    async function handleLogout(){
        console.log("logout")
        await logout(); 
    }

    return(
        <div className="font-poppins">
            {isUserValid && domLoaded && 
            <div className="bg-blue-500 text-white">
                <div className="p-5 flex gap-10 justify-between mx-10">
                    <div>
                        <Link href={'/dashboard'}><p className="text-3xl mt-2 font-bold">DocNote</p></Link>
                    </div>
                        {!isMobile ?      
                        <div className="flex gap-8">
                            <Link href={'/pacientes'}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Pacientes</Link>
                            <Link href={'/medicamentos'}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Medicamentos</Link>
                            <Link href={'#'}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Consultas</Link>
                            <Link href={'#'}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Citas</Link>                    
                        </div>
                        : null}
                        {!isMobile ? 
                        <div className="flex gap-5">
                            <h1 className="mt-3 font-bold">{model?.username}</h1>
                            <button className="bg-white px-5 py-2 text-blue-500 rounded-xl flex gap-2"
                            onClick={handleLogout}>
                                <FiLogOut className="text-xl mt-2"></FiLogOut>
                            </button>    
                        </div>
                        : <>
                           {isMenuOn ? 
                            <RxHamburgerMenu onClick={() => {setisMenuOn(!isMenuOn)}} className="text-3xl text-black mt-2 z-50"></RxHamburgerMenu>
                           : 
                            <RxHamburgerMenu onClick={() => {setisMenuOn(!isMenuOn)}} className="text-3xl mt-2 z-50"></RxHamburgerMenu>
                           }
                        </>
                        }
                        {isMobile && isMenuOn && (
                        <div className="fixed bg-white bottom-0 left-0 w-full h-screen flex justify-center items-center text-black">
                            <div className="flex flex-col gap-10 align-middle text-center text-xl">
                            <Link href={'/pacientes'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Pacientes</Link>
                            <Link href={'/medicamentos'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Medicamentos</Link>
                            <Link href={'#'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Consultas</Link>
                            <Link href={'#'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl font-light hover:bg-white hover:text-blue-500
                             transition-all ease-in-out'>Citas</Link>  
                            </div>
                        </div>
                        )}                
                </div>
            </div>
            }
         </div>
    )
}