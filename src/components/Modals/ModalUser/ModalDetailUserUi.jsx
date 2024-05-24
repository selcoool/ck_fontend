import React from 'react'
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Form, Input, Button, Rate } from 'antd';

function ModalDetailUserUi({visible,setVisible,data}) {


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
      }}
      onOk={() => {
        setVisible(false)
      }}
    >
        <h1 className='text-2xl  font-bold text-center pb-3'><span className='text-red-500'>{data?.name}</span></h1>
        <div className='flex gap-2'>
          <div className='w-1/2 flex justify-center items-center'>
            <img  className='w-80 h-80 object-cover' src={data?.avatar} alt={data?.avatar}
             onError={(e)=>{e.target.onError=null;e.target.src='https://tse2.mm.bing.net/th?id=OIP.x7X2oAehk5M9IvGwO_K0PgHaHa&pid=Api&P=0&h=220'}}
            ></img>

          </div>
          <div className='w-1/2  pb-2'>
            <div >
           <span className='font-bold'>Tên :</span> {data?.name}
         
            </div>
            <div >
           <span className='font-bold'>Email:</span>  {data?.email}
            
            </div>
            <div>
           <span className='font-bold' > Số điện thoại:</span>  {data?.phone}
           <div>
           <span className='font-bold' > Giới tính:</span>  {data?.gender ? "Nam" : "Nữ"}
            </div>
            </div>
            <div>
           <span className='font-bold' > Mật Khẩu:</span>{data?.password} 
            
            </div>
            <div>
           <span className='font-bold' > Chứng Chỉ:</span>  
           {/* {data?.certification?.map((certificate,index)=>{
             return (<span className='text-red-500'>{certificate+', '}</span>)
           })}   */}

             {data?.certification?.length > 0 && Array.isArray(data?.certification) ? (
                data.certification.map((certificate, index) => {
                    return <span key={index} className='text-red-500'>{certificate}{index !== data.skill.length - 1 ? ', ' : ''}</span>;
                })
                ) : (
                <span>Chưa có chứng chỉ nào</span>
                )}
            </div>

            <div>
           <span className='font-bold' > Kỹ Năng: </span> 

                        {data?.skill?.length > 0 && Array.isArray(data?.skill) ? (
                data.skill.map((sk, index) => {
                    return <span key={index} className='text-sky-400'>{sk}{index !== data.skill.length - 1 ? ', ' : ''}</span>;
                })
                ) : (
                <span>Chưa có kỹ năng nào</span>
                )}
                            
            </div>
            
          

  

          </div>

        </div>

    

     
    </Modal>
    </div>
  )
}

export default ModalDetailUserUi
