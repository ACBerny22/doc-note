'use client'

import Link from "next/link";
import { logout, isUserValid, model, getUserImage } from "@/PocketBase/PocketBase";
import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";
import {FiLogOut} from 'react-icons/fi'
import {MdOutlineNightlightRound} from 'react-icons/md'
import {GrClose} from 'react-icons/gr'
import {RxHamburgerMenu} from 'react-icons/rx'
import {FaChild, FaNotesMedical} from 'react-icons/fa'
import {BsBookmarkHeart} from 'react-icons/bs'
import {GiMedicines} from 'react-icons/gi'
import {useDarkStore} from '@/states/themeProvider';
import { useCookies } from "react-cookie";

export default function NavBar(){

    const [domLoaded, setDomLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOn, setisMenuOn] = useState(false);
    const {isDark, setIsDark} = useDarkStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['pb_auth']);


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
        removeCookie("pb_auth", { path: '/' })
        setIsDropdownOpen(false);
        setisMenuOn(false);
        logout(); 

    }

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return(
        <div className={`${isDark ? 'dark' : ''} text-zinc-900`}>
            {isUserValid && domLoaded && 
            <div className={` `}>
                <div className="p-5 flex gap-10 justify-between mx-0 lg:mx-10">
                    <div>
                        <Link href={'/dashboard'}><p className="text-3xl mt-2 font-extrabold"><span className="font-light">Doc</span>Note</p></Link>
                    </div>
                        {!isMobile ?      
                        <div className="flex gap-8 font-medium">
                            <Link href={'/pacientes'}
                            className='flex gap-2 text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-blue-600 hover:text-white
                             transition-all ease-in-out'><FaChild className="text-2xl"></FaChild>Pacientes</Link>
                            <Link href={'/medicamentos'}
                            className='flex gap-2 text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-blue-600 hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'><GiMedicines className="text-2xl"></GiMedicines>Medicamentos</Link>
                            <Link href={'/consultas'}
                            className='flex gap-2 text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-blue-600 hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'><FaNotesMedical className="text-2xl"></FaNotesMedical>Consultas</Link>
                            <Link href={'/citas'}
                            className='flex gap-2 text-lg p-3 rounded-xl dark:hover:bg-white hover:bg-blue-600 hover:text-white dark:hover:text-gray-800
                             transition-all ease-in-out'><BsBookmarkHeart className="text-2xl"></BsBookmarkHeart>Citas</Link>                    
                        </div>
                        : null}
                        {!isMobile ? 
                        <div className="flex gap-3">
                            <div className="flex cursor-pointer relative w-14 h-14 hover:scale-110 transition-all hover:opacity-70">
                                <img onClick={handleDropdownToggle}
                                src={`https://doc-note.pockethost.io/api/files/users/${model?.id}/${model?.avatar}`} alt="Image" 
                                className="w-full h-full object-cover rounded-full"/>
                            </div>
                            <div className="flex flex-col mt-2">
                                <p className=" text-sm font-extrabold">{model?.username}</p>
                                <p className="text-sm">{model?.email}</p>
                            </div>
                            <div className={`absolute top-20 right-10 bg-white p-3 rounded-xl shadow-lg z-50 text-black
                             transition-all font-light flex flex-col gap-2 ${
                                isDropdownOpen
                                  ? 'opacity-100 scale-100'
                                  : 'opacity-0 scale-95 pointer-events-none'
                              } `}>
                                {/* Add your dropdown menu content here */}
                                <h1 className="rounded-lg text-center mb-5 p-2 font-bold" >{model?.username}</h1>
                                <Link href="/user" className="rounded-lg cursor-pointer p-5 hover:bg-blue-600 hover:text-white transition-all" >Perfil</Link>
                                <p className="rounded-lg cursor-pointer p-5 hover:bg-blue-600 hover:text-white transition-all" >Modo Oscuro</p>
                                <div className="rounded-lg flex gap-2 cursor-pointer p-5 bg-red-400/70 hover:bg-red-400 text-white transition-all" 
                                onClick={handleLogout}><FiLogOut className="text-xl "></FiLogOut>Log out</div>
                            </div>
                        </div>
                        : <>
                           {isMenuOn ? 
                            <GrClose onClick={() => {setisMenuOn(!isMenuOn)}} className="cursor-pointer text-2xl text-black mt-2 z-50"></GrClose>
                           : 
                            <RxHamburgerMenu onClick={() => {setisMenuOn(!isMenuOn)}} className="cursor-pointer text-3xl mt-2 z-50"></RxHamburgerMenu>
                           }
                        </>
                        }
                       
                        <div className={`fixed bg-white bottom-0 left-0 w-full h-screen flex justify-center items-center text-black transition-all ${
                            isMobile && isMenuOn
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-95 pointer-events-none'
                          }`}>
                            <div className="flex flex-col gap-20 items-center justify-center text-center">
                                <div className="flex justify-center items-center flex-col gap-3">    
                                    <div className="relative w-24 h-24 hover:scale-110 transition-all hover:opacity-70">
                                        <img onClick={handleDropdownToggle}
                                        src={`https://doc-note.pockethost.io/api/files/users/${model?.id}/${model?.avatar}`} alt="Image" className="w-full h-full object-cover rounded-full"/>
                                    </div>
                                    <h1 className="text-2xl font-light">{model?.username}</h1>
                                </div>
                                <div className="flex flex-col gap-5 font-light">
                                    <Link href={'/pacientes'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                                    className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white
                                    transition-all ease-in-out flex gap-2 justify-center items-center'><FaChild className="text-2xl"></FaChild>Pacientes</Link>
                                    <Link href={'/medicamentos'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                                    className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white
                                    transition-all ease-in-out flex gap-2 justify-center items-center'><GiMedicines className="text-2xl"></GiMedicines>Medicamentos</Link>
                                    <Link href={'/consultas'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                                    className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white
                                    transition-all ease-in-out flex gap-2 justify-center items-center'><FaNotesMedical className="text-2xl"></FaNotesMedical>Consultas</Link>
                                    <Link href={'/citas'} onClick={()=> {setisMenuOn(!isMenuOn)}}
                                    className='text-lg p-3 rounded-xl hover:bg-blue-600 hover:text-white
                                    transition-all ease-in-out flex gap-2 justify-center items-center'><BsBookmarkHeart className="text-2xl"></BsBookmarkHeart>Citas</Link>  
                                </div>
                                <div className="flex gap-20 items-center">
                                    <MdOutlineNightlightRound className="cursor-pointer text-2xl"></MdOutlineNightlightRound>
                                    <FiLogOut onClick={handleLogout} className="cursor-pointer text-2xl "/>
                                </div>
                            </div>
                        </div>
                                 
                </div>
            </div>
            }
         </div>
    )
}