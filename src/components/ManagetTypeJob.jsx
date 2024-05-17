import {  Button, Modal, Select, Table, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import {deleteAUser } from '../redux/apiUser';
import {  Rate } from 'antd'

import { deleteAJob, getAllJobs } from '../redux/jobReducerSlice';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";

import ModalDetailUser from './Modals/ModalUser/ModalDetailUser';
import ModalAddUser from './Modals/ModalUser/ModalAddUser';
import ModalEditUser from './Modals/ModalUser/ModalEditUser';
import ModalAddJob from './Modals/ModalJob/ModalAddJob';
import ModalDetailJob from './Modals/ModalJob/ModalDetailJob';
import ModalEditJob from './Modals/ModalJob/ModalEditJob';
import ModalEditImageJob from './Modals/ModalJob/ModalEditImageJob';
import { SiMalt } from 'react-icons/si';
import { deleteATypeJob, getAllTypeJobs } from '../redux/typeJobReducerSlice';
import ModalEditTypeJob from './Modals/ModalTypeJob/ModalEditTypeJob';
import ModalAddTypeJob from './Modals/ModalTypeJob/ModalAddTypeJob';
// import ModalEditMovie from './ModalEditMovie';
// import ModalEditUser from './ModalEditUser';

function ManageTypeJob() {

    // const onSearch = (value, _e, info) => console.log(info?.source, value);
    const {typeJobs} = useSelector((state) => state?.manageTypeJob);

     // console.log('yyyyyyyyyyyyygroup',group)

    // const [group, setGroup] = useState('GP00');
    // const [usersData, setUsersData] = useState(users);
    const [editTypeJobData, setEditTypeJobData] = useState();
    const [detailTypeJobData, setDetailTypeJobData] = useState();
    const [typeJobData, setTypeJobData] = useState([]);



    const [modalAddTypeJob, setModalAddTypeJob] = useState(false);
    const [modalEditTypeJob, setModalEditTypeJob] = useState(false);

    const [modalDetailTypeJob, setModalDetailTypeJob] = useState(false);


  

    console.log('typeJobData',typeJobData)
    // console.log('yyyyyyyyyyyyyusersData',usersData)
    // console.log('yyyyyyyyyyyyyeditUsersData',editUsersData)
  
    useEffect(() => {
      setTypeJobData(typeJobs);
    }, [typeJobs]);
    
    const onSearchJob = (value) => {
      setTypeJobData(typeJobs.filter(typeJob => typeJob.tenLoaiCongViec.toLowerCase().includes(value.toLowerCase())));

    };
  
   
  
    const dispatch=useDispatch();
  
    useEffect(() => {

     dispatch(getAllTypeJobs())

     
     
    }, []);


    // const handleChangeSelect = (value) => {
    //   // console.log(`selected ${value}`);
    //   setGroup(value)
    // };


    const handleDeleteTypeJob=(value)=>{
      // dispatch(deleteAMovie(value))

      console.log('xxxxxxxxxxxxx',value)

      Modal.confirm({
        title:"Bạn thật sự muốn xóa loại công việc này ?",
        okText:"Đồng ý",
        okType:"danger",
        cancelText:"Hủy",
        onOk:()=>{
          dispatch(deleteATypeJob(value))
        }
      })
    }

   
  return (
    <div className='w-full h-full'>
    <div className='flex flex-col'>

   




<div className='flex justify-center items-center md:justify-start md:w-96 p-3'>
    <Search
   placeholder="Nhập thông tin công việc "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchJob}
 />

</div>

<div className='flex justify-center items-center pt-3 '>
   <Title className='flex text-center text-sm md:text-2xl'>QUẢN LÝ LOẠI CÔNG VIỆC</Title>

</div>

<div className='px-3 pb-3 flex  gap-1 '>
<Button  size="large" className='bg-white' >Số loại công việc ({typeJobs ?typeJobs.length:0})</Button>
{JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (
      <> 
  <Button size="large"  onClick={()=>setModalAddTypeJob(!modalAddTypeJob)} className='bg-green-500'>Thêm Loại Công Việc</Button>
  <ModalAddTypeJob visible={modalAddTypeJob} setVisible={setModalAddTypeJob}/>
  </>
):''}
</div>
    

  <div className='px-3 '>
  <Table
  rowKey={'id'}
scroll={{ x: 700, y: 550 }}
dataSource={typeJobData}
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
    width:60,
  },
  {
    title: 'Tên loại công việc',
    dataIndex: 'tenLoaiCongViec',
    ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
    defaultSortOrder:'ascend',
    sortDirections:['descend','ascend'],
      sorter: (a, b) =>{
      let nameA=a.tenLoaiCongViec.toLowerCase().trim();
      let nameB=b.tenLoaiCongViec.toLowerCase().trim();
      if(nameA > nameB ){
        return 1;
      }
      return -1;
  },
   
    render: (text) => <span>{text}</span>,
    width:100,
  },
  
 

 {
   title: 'Điều Chỉnh',
   ellipsis: true, // Hiển thị ba chấm (...) nếu nội dung quá dài
   dataIndex: 'tenCongViec',
   render: (text,tenCongViecData) => (


    JSON.parse(localStorage.getItem('USER'))?.user.role==="USER" || JSON.parse(localStorage.getItem('USER'))?.user.role==="ADMIN" ? (

        JSON.parse(localStorage.getItem('USER'))?.user.id === tenCongViecData?.nguoiTao ||  JSON.parse(localStorage.getItem('USER'))?.user.role === "ADMIN"  ? (

          <div className='flex gap-2'>
     
          <MdDelete onClick={()=>handleDeleteTypeJob(tenCongViecData)} className='text-2xl text-red-600 cursor-pointer'/>
          <FaEdit onClick={()=>[setModalEditTypeJob(!modalEditTypeJob),setEditTypeJobData(tenCongViecData)]} className='text-2xl text-yellow-500 cursor-pointer'/>
        
          </div>


        ) :('Chỉ người thêm mới điều chỉnh được')
      

      
    ):('Chỉ đăng nhập mới điều chỉnh được')
  
     
       
     
   ),
   width:25,

 },
]}
pagination={false}
/>
<ModalEditTypeJob visible={modalEditTypeJob} data={editTypeJobData}  setVisible={setModalEditTypeJob}/>
  </div>

  </div>

 
 </div>
  )
}

export default ManageTypeJob