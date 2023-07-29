'use client'

import Link from "next/link";
import { logout, isUserValid, model } from "@/PocketBase/PocketBase";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import {FiLogOut} from 'react-icons/fi'
import {MdOutlineNightlightRound, MdWbSunny} from 'react-icons/md'
import {RxHamburgerMenu} from 'react-icons/rx'
import {FaUserInjured} from 'react-icons/fa'
import {useDarkStore} from '@/states/themeProvider';

export default function NavBar(){

    const router = useRouter();
    const [domLoaded, setDomLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOn, setisMenuOn] = useState(false);
    const {isDark, setIsDark} = useDarkStore();


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1200); // Adjust the breakpoint as needed
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
        <div className={`${isDark ? 'dark' : ''} font-poppins text-zinc-900 `}>
            {isUserValid && domLoaded && 
            <div className={`bg-white dark:bg-gray-800 dark:text-white`}>
                <div className="p-10 flex gap-10 justify-between mx-10 ">
                    <div>
                        <Link href={'/dashboard'}><p className="text-3xl mt-2 font-bold">DocNote</p></Link>
                    </div>
                        {!isMobile ?      
                        <div className="flex gap-8 font-semibold">
                            <Link href={'/pacientes'}
                            className='text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-accent-blue hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'>Pacientes</Link>
                            <Link href={'/medicamentos'}
                            className='text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-accent-blue hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'>Medicamentos</Link>
                            <Link href={'/consultas'}
                            className='text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-accent-blue hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'>Consultas</Link>
                            <Link href={'#'}
                            className='text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-accent-blue hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'>Citas</Link>                    
                        </div>
                        : null}
                        {!isMobile ? 
                        <div className="flex gap-5">
                            <h1 className="mt-3 font-bold">{model?.username}</h1>
                            <button className="bg-white px-5 py-2 text-primary-blue rounded-xl flex gap-2"
                            onClick={handleLogout}>
                                <FiLogOut className="text-xl mt-2"></FiLogOut>
                            </button>
                            {isDark ? <MdWbSunny className="text-3xl text-white mt-2"
                            onClick={() => setIsDark(!isDark)}></MdWbSunny> :
                            <MdOutlineNightlightRound className="text-3xl text-zinc-900 mt-2"
                            onClick={() => setIsDark(!isDark)}></MdOutlineNightlightRound>
                            }
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
                            className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white font-bold
                             transition-all ease-in-out'>Pacientes</Link>
                            <Link href={'/medicamentos'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white font-bold
                             transition-all ease-in-out'>Medicamentos</Link>
                            <Link href={'/consultas'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white font-bold
                             transition-all ease-in-out'>Consultas</Link>
                            <Link href={'#'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                            className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white font-bold
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