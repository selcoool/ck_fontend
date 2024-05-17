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
import { LuNetwork } from "react-icons/lu";
import { FaRegCommentAlt } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";





import ManageUser from '../components/ManageUser';
import ManageJob from '../components/ManageJob';
import ModalSignUp from '../components/Modals/ModalUser/ModalSignUp';
import ModalSignIn from '../components/Modals/ModalUser/ModalSignIn';
import ModalSignOut from '../components/Modals/ModalUser/ModalSignOut';
import ModalEditAvatarUser from '../components/Modals/ModalUser/ModalEditAvatarUser';
import ModalEditUserAfterLogin from '../components/Modals/ModalUser/ModalEditUserAfterLogin';


import { useLocation } from 'react-router-dom';
import WorkShop from '../components/WorkShop';
import ManageTypeJob from '../components/ManagetTypeJob';
import ManageComment from '../components/ManageComment';
import ManageRecruitJob from '../components/ManageRecruitJob';
import Footer from '../components/Footer';
import { excerpt } from '../utility';
 



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
    <div className='w-full h-full bg-slate-500 md:min-h-screen'>

  
    <div className='w-screen h-full flex flex-col md:flex-row '>
    

    <div className='w-full md:w-2/6 lg:w-1/6 bg-slate-500 flex flex-col bg-background_01 bg-cover'>
                               <div className='w-full h-12 flex justify-center'><img className='w-full h-12 object-cover ' src="https://logospng.org/wp-content/uploads/tailwind-css.png" alt="" /></div>
                               {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                <div className='flex justify-between items-center px-2 pt-2'>
                               <div className='flex gap-1 cursor-pointer'  onClick={()=>[setOpenMenuAvatar(!openMenuAvatar)]}><FaRegImage className='w-5 h-5  transition-all duration-100 cursor-pointer text-red-500 hover:text-white' /><span className='text-sm'>Ảnh đại diện</span></div>
                               <div className='flex gap-1 cursor-pointer'  onClick={()=>[setOpenMenuSignOut(!openMenuSignOut)]}><FaSignOutAlt className='w-5 h-5  transition-all duration-100 cursor-pointer text-white hover:text-white' /></div>
                               </div>
                                ):''}
                                
                                <div className='flex flex-col justify-center items-center p-2'>
                               
                                <div>

                                {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                    <Avatar  className=' w-28 h-28  ' src={JSON.parse(localStorage.getItem('USER')).user.avatar}  />
                                ):(
                                  <Avatar className=' w-28 h-28  ' src="https://scontent.fkul10-1.fna.fbcdn.net/v/t39.30808-6/257562002_3039447956294453_1832238329207388837_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=juigomsLgMUQ7kNvgE5NMky&_nc_ht=scontent.fkul10-1.fna&oh=00_AYBgziZNl2a59zYMf_Wzl2QSNcrd4Kcb3dZ4fn-eDt-FOQ&oe=664D784A" />
                                )}

                                
                                
                                </div>
                                
                                <div className='flex gap-2 text-[12px] text-zinc-50'>
                                {JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
                                     <div  className='cursor-pointer text-xl pt-2 font-bold flex justify-center items-center gap-1'>{excerpt(JSON.parse(localStorage.getItem('USER'))?.user.name,10)  } <FaPencil onClick={()=>[setModalEditUser(!modalEditUser),setEditUserData(JSON.parse(localStorage.getItem('USER'))?.user)]} color='#6e9eea' size={18}/></div>
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
                                  
                                  {
                                    label:"Loại Công Việc",
                                    key:"/type_job",
                                    icon:<LuNetwork/>
                                    },
                                    {
                                      label:"Thuê Công Việc",
                                      key:"/recruit_job",
                                      icon:<GiArchiveRegister/>
                                      },
                                    {
                                      label:"Bình Luận",
                                      key:"/comments",
                                      icon:<FaRegCommentAlt/>
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
                    {activeTab === '/type_job' && <ManageTypeJob />}
                    {activeTab === '/recruit_job' && <ManageRecruitJob/>}
                    {activeTab === '/comments' && <ManageComment />}
                    
                    
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

