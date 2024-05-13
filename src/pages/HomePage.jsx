import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Image, Menu } from 'antd';
import { FaUserTie } from "react-icons/fa";
import { GiFilmSpool } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { MdOutlineWork } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { SiWorkplace } from "react-icons/si";



import ManageUser from '../components/ManageUser';
import ManageJob from '../components/ManageJob';
import ModalSignUp from '../components/Modals/ModalUser/ModalSignUp';
import ModalSignIn from '../components/Modals/ModalUser/ModalSignIn';
import ModalSignOut from '../components/Modals/ModalUser/ModalSignOut';
import ModalEditAvatarUser from '../components/Modals/ModalUser/ModalEditAvatarUser';
import ModalEditUserAfterLogin from '../components/Modals/ModalUser/ModalEditUserAfterLogin';


import { useLocation } from 'react-router-dom';
import WorkShop from '../components/WorkShop';
 



function HomePage() {

  
  const [openMenuSignUp,setOpenMenuSignUp]=useState(false)
  const [openMenuSignIn,setOpenMenuSignIn]=useState(false)
  const [openMenuAvatar,setOpenMenuAvatar]=useState(false)
  const [openMenuSignOut,setOpenMenuSignOut]=useState(false)

  const [editUserData, setEditUserData] = useState();
 const [modalEditUser, setModalEditUser] = useState(false);

 const location = useLocation();
 const { pathname } = location;

//  console.log('pathname',pathname)

    const nav=useNavigate();
  const [activeTab, setActiveTab] = useState(pathname);

  return (
    <div className='w-full h-full bg-slate-500'>

  
    <div className='w-screen h-full flex flex-col md:flex-row '>
    

    <div className='w-full md:w-2/6 lg:w-1/6 bg-slate-500 flex flex-col'>
                               {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                <div className='flex justify-between items-center px-2 pt-2'>
                               <div className='flex gap-1 cursor-pointer'  onClick={()=>[setOpenMenuAvatar(!openMenuAvatar)]}><FaRegImage className='w-5 h-5  transition-all duration-100 cursor-pointer text-gray-200 hover:text-white' /><span className='text-sm'>Ảnh đại diện</span></div>
                               <div className='flex gap-1 cursor-pointer'  onClick={()=>[setOpenMenuSignOut(!openMenuSignOut)]}><FaSignOutAlt className='w-5 h-5  transition-all duration-100 cursor-pointer text-gray-200 hover:text-white' /></div>
                               </div>
                                ):''}
                                
                                <div className='flex flex-col justify-center items-center p-2'>
                               
                                <div>

                                {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                    <Avatar  className=' w-28 h-28  ' src={JSON.parse(localStorage.getItem('USER')).user.avatar}  />
                                ):(
                                  <Avatar className=' w-28 h-28  ' src="https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/431403523_3657596567812919_1168612133943379337_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGtlG6Em8dLI6_maqBnjvqya0b7bsLAwDtrRvtuwsDAO2sNYGhjh6cxNiD24p--OIbh1clY96Vig_-hNuSdVpKa&_nc_ohc=8W9OZX7kL3IQ7kNvgE0TUGC&_nc_ht=scontent.fkul10-1.fna&oh=00_AYCcJgAWFRj7o6HN5vd-admfYEFN4RK_2XP0RROO8hcPRg&oe=6646EC0C" />
                                )}

                                
                                
                                </div>
                                
                                <div className='flex gap-2 text-[12px] text-zinc-50'>
                                {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                     <div  className='cursor-pointer text-xl pt-2 font-bold flex justify-center items-center gap-1'>{JSON.parse(localStorage.getItem('USER'))?.user.name} <FaPencil onClick={()=>[setModalEditUser(!modalEditUser),setEditUserData(JSON.parse(localStorage.getItem('USER'))?.user)]} color='black' size={18}/></div>
                                ):(
                                   <>
                                    <div  className='cursor-pointer pt-2 font-bold' onClick={()=>[setOpenMenuSignIn(!openMenuSignIn),setOpenMenuSignUp(false)]}>Đăng Nhập</div>
                                <div  className='cursor-pointer pt-2 font-bold' onClick={()=>[setOpenMenuSignUp(!openMenuSignUp),setOpenMenuSignIn(false)]}>Đăng Ký</div>
                                   
                                   </>
                                )}



                                
                               
                                
                          
                                </div>
                            
                                </div>
                                <div >
                                <Menu 
                               
                                onClick={(record)=>{

                                setActiveTab(record.key);
                                nav(`${record.key}`);
                                
                            }}
                                items={[
                                {
                                label:"Thông Tin Tuyển Dụng",
                                key:"/",
                                icon:<SiWorkplace/>
                                },
                                {
                                  label:"Người Dùng",
                                  key:"/users",
                                  icon:<FaUserTie/>
                                  },
                                  {
                                  label:"Công Việc",
                                  key:"/jobs",
                                  icon:<MdOutlineWork/>
                                  },
                               
                            
                                

                                ]}
                            
                                
                                >

                                </Menu>

                             
                                </div>


                               


                               

                            

    </div>
    <div  className='w-full md:w-4/6 lg:w-5/6'>
                    <div className='flex  h-full flex-col bg-slate-300 '>


                    <div className=''>
                    {activeTab === '/' && (<WorkShop/>)}

                   
                    {activeTab === '/users' && <ManageUser />}
                    {activeTab === '/jobs' && <ManageJob />}
                    
                    
                    </div>

                    </div>

    </div>
    </div>

    <ModalSignUp  isOpen={openMenuSignUp} setIsOpen={setOpenMenuSignUp} setOpenMenuSignIn={setOpenMenuSignIn}/>
<ModalSignIn  isOpen={openMenuSignIn} setIsOpen={setOpenMenuSignIn} setOpenMenuSignUp={setOpenMenuSignUp} />
<ModalEditAvatarUser  isOpen={openMenuAvatar} setIsOpen={setOpenMenuAvatar} />
<ModalSignOut  isOpen={openMenuSignOut} setIsOpen={setOpenMenuSignOut} />
<ModalEditUserAfterLogin visible={modalEditUser} data={editUserData}  setVisible={setModalEditUser}/>

  </div>
  )
}

export default HomePage

