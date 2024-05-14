
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/userReducerSlice';
import Search from 'antd/es/input/Search'
import { Button } from 'antd';
import ModalAddUser from './Modals/ModalUser/ModalAddUser';
import ModalDetailUserUi from './Modals/ModalUser/ModalDetailUserUi';

function ShowUsers() {

 
   const {users} = useSelector((state) => state?.manageUser);
   const [detailUserDataUi, setDetailUserDataUi] = useState();
   const [modalDetailUserUi, setModalDetailUserUi] = useState(false);
   const [modalAddUser, setModalAddUser] = useState(false);
   const [userData, setUserData] = useState([]);
   console.log('userData',userData)

    useEffect(() => {
        setUserData(users);
      }, [users]);
   const dispatch=useDispatch();
    
      useEffect(() => {
  
       dispatch(getAllUsers())
  
       
       
      }, []);


      const onSearchUser = (value) => {
        setUserData(users.filter(user => user.name.trim().toLowerCase().includes(value.trim().toLowerCase())));
    
      };


      // const onSearchUserxx = (value) => {
    
      //   setUserData(
          
          
      //     users.filter(user => user.name.trim().toLowerCase().includes(value.trim().toLowerCase()))
      //   );
       
    
  
  
      // };




  return (
    <div className='bg-orange-400 w-full h-screen '>
    <div className='px-4 bg-orange-100'>


      
<div className='flex justify-center items-start md:justify-start flex-col md:flex-row py-3 gap-1'>

  <div>
    <Search
   placeholder="Nhập thông tin tên tài khoản "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchUser}
 />
 </div>

<div className='flex gap-1 '>

<Button  size="large" className='bg-white' >Số người ({users ?users.length:0})</Button> 
{JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
      <>  

<Button size="large"  onClick={()=>setModalAddUser(!modalAddUser)} className='bg-green-500'>Thêm Người Dùng</Button>
  <ModalAddUser visible={modalAddUser} setVisible={setModalAddUser}/>
  </>
):''}
</div>

</div>

        
    <div className='bg-orange-100  w-full flex flex-col   h-full lg:max-h-[650px] overflow-y-auto no-scrollbar'>
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 '>

    {userData.length > 0 && Array.isArray(userData) ? (
    [...userData]?.reverse().map((user) => (
        <div key={user.id} className='relative overflow-hidden cursor-pointer group'>
            <div className='w-full shadow-lg shadow-slate-400 relative flex justify-center items-center '>
                <img className='w-full h-60 object-cover group-hover:scale-105 duration-300 rounded-full p-2' src={user.avatar !== "" ? user.avatar : "https://tse2.mm.bing.net/th?id=OIP.x7X2oAehk5M9IvGwO_K0PgHaHa&pid=Api&P=0&h=220"} alt={user.avatar} />
                <div onClick={()=>[setModalDetailUserUi(!modalDetailUserUi),setDetailUserDataUi(user) ]} className='absolute  hidden group-hover:block hover:bg-red-300  text-white text-center border-2 border-white p-4 w-fit bg-white/50 '>Xem Chi Tiết CV</div>
            </div>
            <div className='flex  flex-col p-3  transition-all duration-100 '>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{user.name}</h1>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm font-bold'>Kỹ năng:</div>
                    <div className='flex flex-wrap gap-1'>
                        {user?.skill?.length > 0 ? (
                            Array.isArray(user.skill) ? (
                                user.skill.map((sk, index) => (
                                    <div className='bg-orange-300 p-1 text-xs rounded-md'>{sk}</div>
                                ))
                            ) : (
                                <span>Chưa có kỹ năng nào</span>
                            )
                        ) : (
                            <span>Chưa có kỹ năng nào</span>
                        )}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='text-sm font-bold'>Chứng chỉ:</div>
                    <div className='flex flex-wrap gap-1'>
                        {user?.certification?.length > 0 ? (
                            Array.isArray(user.certification) ? (
                                user.certification.map((sk, index) => (
                                    <div className='bg-green-400 p-1 text-xs rounded-md'>{sk}</div>
                                ))
                            ) : (
                                <span>Chưa có kỹ năng nào</span>
                            )
                        ) : (
                            <span>Chưa có kỹ năng nào</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ))
) : (

  <div className='flex justify-center items-start w-full h-screen '>
  
    <div >Không tìm thấy người dùng với tên này</div>
  </div>
  
  )}



 
    </div>






    </div>


    </div>

    <ModalDetailUserUi visible={modalDetailUserUi} data={detailUserDataUi} setVisible={setModalDetailUserUi}/>

  </div>
  )
}

export default ShowUsers
