import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Form, Input, Button, Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllJobs } from '../../../redux/jobReducerSlice';

function ModalDetailJob({visible,setVisible,data}) {
  console.log("ModalDetailJob",data)
  const dispatch=useDispatch();

  return (
   
    <div className='w-full h-full'>
    <Modal
     cancelButtonProps={{ style: { display: 'none' } }}
 
      open={visible}
      style={{top: 70 }}
      okText='Đóng'
      cancelText="Hủy"
      onCancel={()=>{
        setVisible(false)
        dispatch(getAllJobs())
      }}
      onOk={() => {
        setVisible(false)
      }}
    >
        <h1 className='text-2xl  font-bold text-center pb-3'><span className='text-red-500'>{data?.nguoiTao}</span>-[{data?.id}]</h1>
        <div className='flex gap-2'>
          <div className='w-1/2 flex justify-center items-center'>
            <img  className='w-80 h-80 object-cover' src={data?.hinhAnh} alt={data?.hinhAnh}
             onError={(e)=>{e.target.onError=null;e.target.src='https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}}
            ></img>

          </div>
          <div className='w-1/2 pt-7 pb-2'>
            <div >
           <span className='font-bold'>Tên công việc [{data?.
maChiTietLoaiCongViec}]:</span> {data?.tenCongViec}
         
            </div>
            <div >
           <span className='font-bold'>Giá tiền:</span>  {data?.giaTien}
            
            </div>
            <div>
           <span className='font-bold' >Đánh giá:</span>  {data?.danhGia}
        
            </div>
            <div>
           <span className='font-bold' >Số sao công việc:</span><Rate value={data?.saoCongViec}  disabled/>
            
            </div>
      
         
          

  

          </div>

        </div>

    

     
    </Modal>
    </div>
  )
}

export default ModalDetailJob