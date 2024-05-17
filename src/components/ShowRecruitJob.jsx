import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/userReducerSlice';
import Search from 'antd/es/input/Search'
import { Button, Modal } from 'antd';
import ModalAddUser from './Modals/ModalUser/ModalAddUser';
import ModalDetailUserUi from './Modals/ModalUser/ModalDetailUserUi';
import { deleteARecruitJob, getAllRecruitJobs } from '../redux/recruitJobReducerSlice';
import { MdMoreVert } from "react-icons/md";
import ModalEditRecruitJob from './Modals/ModalRecruitJob/ModalEditRecruitJob';
import ModalDetailRecruitJob from './Modals/ModalRecruitJob/ModalDetailRecruitJob';
import Footer from './Footer';


function ShowRecruitJob() {
    const dispatch=useDispatch();

    const {recruitJobs} = useSelector((state) => state?.manageRecruitJob);
      
    const [recruitJobData, setRecruitJobData] = useState([]);
    
    const [editRecruitJobData, setEditRecruitJobData] = useState();
    const [detailRecruitJobData, setDetailRecruitJobData] = useState();
     const [modalEditRecruitJob, setModalEditRecruitJob] = useState(false);
     const [modalDetailRecruitJob, setModalDetailRecruitJob] = useState(false);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('USER'))?.user.id;
        const filteredJobs = recruitJobs.filter((recruitJob) => recruitJob.maNguoiThue === userId);
        setRecruitJobData(filteredJobs);
      }, [recruitJobs, JSON.parse(localStorage.getItem('USER'))?.user.id]);
      
      // Effect to fetch all recruit jobs
      useEffect(() => {
        dispatch(getAllRecruitJobs());
      }, []);

      const handleDeleteRecruitJob=(value)=>{
        // dispatch(deleteAMovie(value))
  
        console.log('xxxxxxxxxxxxx',value)
  
        Modal.confirm({
          title:"Bạn thật sự muốn xóa thuê công việc này ?",
          okText:"Đồng ý",
          okType:"danger",
          cancelText:"Hủy",
          onOk:()=>{
            dispatch(deleteARecruitJob(value))
          }
        })
      }

    


  return (
    <div className='bg-orange-100 w-full h-full md:min-h-screen'>
    <div className='px-4 bg-orange-100'>


      
<div className='flex justify-center items-start md:justify-start flex-col md:flex-row py-3 gap-1'>

 

<div className='flex gap-1 '>

<Button  size="large" className='bg-white' >Số công việc thuê ({recruitJobData ?recruitJobData.length:0})</Button> 

</div>

</div>

        
    <div className='bg-orange-100  w-full flex flex-col   h-full lg:max-h-[650px] overflow-y-auto no-scrollbar'>
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-4 '>

    {recruitJobData.length > 0 && Array.isArray(recruitJobData) ? (
    [...recruitJobData]?.reverse().map((recruitJob) => (
        <div key={recruitJob?.id} className=' overflow-hidden cursor-pointer group'>
            
            <div className='flex gap-1   flex-col p-3 bg-background_work bg-cover  transition-all duration-100 '>
                <div className='bg-gray-800/60 flex flex-col'>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.maNguoiThue}</h1>
                </div>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.maCongViec}</h1>
                </div>
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob?.ngayThue}</h1>
                </div>
               
                <div className='pb-3 flex items-center justify-center gap-3'>
                    <h1 className='font-bold text-sky-500 '>{recruitJob.hoanThanh ? (<div className='text-green-500'>Đã hoàn thành</div>) : (<div className='text-red-500'>Chưa hoàn thành</div>)}</h1>
                </div>
                

              <div className=' flex justify-center items-center'>
                   <div onClick={()=>[setModalEditRecruitJob(!modalEditRecruitJob),setEditRecruitJobData(recruitJob)]} className='p-2 bg-sky-500 rounded-l-full'>Cập nhật</div>
                   <div onClick={()=>[setModalDetailRecruitJob(!modalDetailRecruitJob),setDetailRecruitJobData(recruitJob)]} className='p-2 bg-orange-500'>Chi tiết CV</div>
                   <div onClick={()=>handleDeleteRecruitJob(recruitJob)} className='p-2 bg-red-500 rounded-r-full'>Xoá</div>

              </div>
              </div>
             
            </div>
        </div>
    ))
 ) : (

  <div className='flex justify-center items-start w-full h-screen '>
  
    <div >Không tìm thấy việc đã thuê</div>
  </div>
  
  )}



 
    </div>






    </div>


    </div>
    <ModalDetailRecruitJob visible={modalDetailRecruitJob} data={detailRecruitJobData}  setVisible={setModalDetailRecruitJob}/>
    <ModalEditRecruitJob visible={modalEditRecruitJob} data={editRecruitJobData}  setVisible={setModalEditRecruitJob}/>


  </div>
  )
}

export default ShowRecruitJob
