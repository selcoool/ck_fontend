import {  Button, Modal, Select, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import {deleteAUser } from '../redux/apiUser';

import { getAllUsers,deleteAUser } from '../redux/userReducerSlice';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalDetailUser from './Modals/ModalUser/ModalDetailUser';
import ModalAddUser from './Modals/ModalUser/ModalAddUser';
import ModalEditUser from './Modals/ModalUser/ModalEditUser';

// import ModalEditMovie from './ModalEditMovie';
// import ModalEditUser from './ModalEditUser';

function ManageUser() {

    // const onSearch = (value, _e, info) => console.log(info?.source, value);
    const {users} = useSelector((state) => state?.manageUser);

    // const [group, setGroup] = useState('GP00');
    // const [usersData, setUsersData] = useState(users);
    const [editUserData, setEditUserData] = useState();
    const [detailUserData, setDetailUserData] = useState();
    const [userData, setUserData] = useState([]);


    const [modalAddUser, setModalAddUser] = useState(false);
    const [modalEditUser, setModalEditUser] = useState(false);
    const [modalDetailUser, setModalDetailUser] = useState(false);
  

    // console.log('yyyyyyyyyyyyygroup',group)
    // console.log('yyyyyyyyyyyyyusersData',usersData)
    // console.log('yyyyyyyyyyyyyeditUsersData',editUsersData)
  
    useEffect(() => {
      setUserData(users);
    }, [users]);
    
    const onSearchUser = (value) => {
      setUserData(users.filter(user => user.name.toLowerCase().includes(value.toLowerCase())));

    };
  
   
  
    const dispatch=useDispatch();
  
    useEffect(() => {

     dispatch(getAllUsers())

     
     
    }, []);


    // const handleChangeSelect = (value) => {
    //   // console.log(`selected ${value}`);
    //   setGroup(value)
    // };


    const handleDeleteUser=(value)=>{
      // dispatch(deleteAMovie(value))

      console.log('xxxxxxxxxxxxx',value)

      Modal.confirm({
        title:"Bạn thật sự muốn xóa người dùng này ?",
        okText:"Đồng ý",
        okType:"danger",
        cancelText:"Hủy",
        onOk:()=>{
          dispatch(deleteAUser(value))
        }
      })
    }

   
  return (
    <div className='w-full h-full'>
    <div className='flex flex-col'>

   




<div className='flex justify-center items-center md:justify-start md:w-96 p-3'>
    <Search
   placeholder="Nhập thông tin tên tài khoản "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchUser}
 />

</div>

<div className='flex justify-center items-center pt-3 '>
   <Title className='flex text-center text-sm md:text-2xl'>QUẢN LÝ NGƯỜI DÙNG</Title>

</div>

<div className='px-3 pb-3 flex gap-1 '>

<Button  size="large" className='bg-white' >Số người ({users ?users.length:0})</Button>
{JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
      <> 
 
 <Button size="large"  onClick={()=>setModalAddUser(!modalAddUser)} className='bg-green-500'>Thêm Người Dùng</Button>
  <ModalAddUser visible={modalAddUser} setVisible={setModalAddUser}/>
  </>
):''}
</div>
    

  <div className='px-3 '>
  <Table
  rowKey={'id'}
scroll={{ x: 700, y: 450 }}
dataSource={userData}
columns={[
  {
    title: 'ID',
    dataIndex: 'id',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      if(a > b ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:70,
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      let nameA=a.name.toLowerCase().trim();
      let nameB=b.name.toLowerCase().trim();
      if(nameA > nameB ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:110,
  },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  //   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
  // //   sorter: (a, b) =>{
  // //     let emailA=a.email.toLowerCase().trim();
  // //     let emailB=b.email.toLowerCase().trim();
  // //     if(emailA > emailB ){
  // //       return 1;
  // //     }
  // //     return -1;
  // // },
  //   render: (text, film) => (
  //     <span>{text}</span>
  //   ),
  //   width:180,
  // },

  {
    title: 'Avatar',
    dataIndex: 'avatar',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
  //   sorter: (a, b) =>{
  //     let emailA=a.email.toLowerCase().trim();
  //     let emailB=b.email.toLowerCase().trim();
  //     if(emailA > emailB ){
  //       return 1;
  //     }
  //     return -1;
  // },
    render: (text, avatarData) => (
      <img  className='w-20 h-20 object-cover object-center ' src={avatarData?.avatar} alt={avatarData?.avatar}
      onError={(e)=>{e.target.onError=null;e.target.src='https://tse2.mm.bing.net/th?id=OIP.x7X2oAehk5M9IvGwO_K0PgHaHa&pid=Api&P=0&h=220'}}
     ></img>
    ),
    width:110,
  },
  {
   title: 'SĐT',
   dataIndex: 'phone',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, film) => (
     
     <span>{text}   </span>
     // <img src={film.tenPhim} alt={film.tenPhim} className='w-[50px] h-[50px]' onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}} />
   ),
   width:110,
 },
 {
   title: 'Kỹ Năng',
   dataIndex: 'skill',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, skills) => (
  //  div
    // console.log('ddđxxxxxxxxxxxx',skills)
    // console.log('ddđxxxxxxxxxxxx__text',text)

    skills?.skill?.length > 0 ? (
      
      Array.isArray(skills.skill) ? (
        skills.skill.map((sk, index) => (
          <Tag style={{backgroundColor:'pink'}}>{sk}</Tag>
          // <span key={index} className='text-red-500'>{sk}{index !== skills.skill.length - 1 ? ', ' : ''}</span>
        ))
      ) : (
        <span>Chưa có kỹ năng nào</span>
      )
    ) : (
      <span>Chưa có kỹ năng nào</span>
    )

    //  <span>{text}</span>
     // <img src={film.tenPhim} alt={film.tenPhim} className='w-[50px] h-[50px]' onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}} />
   ),
   width:150,

 },

 {
  title: 'Chứng Chỉ',
  dataIndex: 'certification',
  ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
  render: (text, certifications) => (
    
    certifications?.certification?.length > 0 ? (
      Array.isArray(certifications.certification) ? (
        certifications.certification.map((certificate, index) => (
          <Tag style={{backgroundColor:'lightgreen'}}>{certificate}</Tag>
          // <span key={index} className='text-red-500'>{certificate}{index !== certifications.certification.length - 1 ? ', ' : ''}</span>
        ))
      ) : (
        <span>Chưa có chứng chỉ nào</span>
      )
    ) : (
      <span>Chưa có chứng chỉ nào</span>
    )

    // <span>{text}</span>
    // <img src={film.tenPhim} alt={film.tenPhim} className='w-[50px] h-[50px]' onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}} />
  ),
  width:150,

},
 {
   title: 'Vai Trò',
   dataIndex: 'role',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   render: (text, film) => (

     <span>{text}</span>
     // <img src={film.tenPhim} alt={film.tenPhim} className='w-[50px] h-[50px]' onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}} />
   ),
 
   width:80,
 },

 {
    title: 'Xem Chi Tiết',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    dataIndex: 'taiKhoan',
    render: (text,account) => (
   
        <Button onClick={()=>[setModalDetailUser(!modalDetailUser),setDetailUserData(account) ]} className='bg-blue-400'>Chi tiết</Button>
        
      
    ),
    width:100,
 
  },

 {
   title: 'Điều Chỉnh',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   dataIndex: 'taiKhoan',
   render: (text,account) => (


    JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
  

      JSON.parse(localStorage.getItem('USER'))?.user.id === account?.id   ? (
     <div className='flex gap-2'>
     
       <MdDelete onClick={()=>handleDeleteUser(account)} className='text-2xl text-red-600 cursor-pointer'/>
       <FaEdit onClick={()=>[setModalEditUser(!modalEditUser),setEditUserData(account)]} className='text-2xl text-yellow-500 cursor-pointer'/>
       

       </div>
        ) :JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
          <div className='flex gap-2'>
     
          <MdDelete onClick={()=>handleDeleteUser(account)} className='text-2xl text-red-600 cursor-pointer'/>
          <FaEdit onClick={()=>[setModalEditUser(!modalEditUser),setEditUserData(account)]} className='text-2xl text-yellow-500 cursor-pointer'/>
          
   
          </div>
           
        ):('Chỉ đăng nhập với vai trò quản trị viên mới có thể điều chỉnh được')

     ):('Chỉ đăng nhập mới điều chỉnh được')
       
     
   ),
   width:90,

 },
]}
pagination={false}
/>
<ModalDetailUser visible={modalDetailUser} data={detailUserData} setVisible={setModalDetailUser}/>
<ModalEditUser visible={modalEditUser} data={editUserData}  setVisible={setModalEditUser}/>

  </div>

  </div>

 
 </div>
  )
}

export default ManageUser

