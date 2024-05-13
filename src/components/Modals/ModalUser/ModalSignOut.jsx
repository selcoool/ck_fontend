import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup"
import { signInUser, signOutUser } from '../../../redux/userReducerSlice';
import { useDispatch } from 'react-redux';
// import { api_movies } from '../services/api_movies';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Form, Modal } from 'antd';

function ModalSignOut({ isOpen, setIsOpen}) {
    console.log('isOpen', isOpen);
    // console.log('maPhim', maPhim);
    const dispatch=useDispatch();

    const handleCloseModal = (e) => {
        if (e.target.id === "wrapper") {
            setIsOpen(false)
        }
    }

  const handleSubmit=()=>{
    dispatch(signOutUser())
    setIsOpen(false)

   

    

  }

 


       

    


    return (


        <div className='w-full h-full'>
        <Modal
         cancelButtonProps={{ style: { display: 'none' } }}
         okButtonProps={{ style: { display: 'none' } }}
          open={isOpen}
          style={{top:'20%'}}
          okText="Thêm"
          cancelText="Hủy"
          onCancel={()=>{
              setIsOpen(false);
         
             
          }}
          onOk={() => { 
              setIsOpen(false);
    
          }}
        >
           
            <Form
            onSubmitCapture={handleSubmit}
            
            layout="horizontal"
            
           
          >
          

          <Form.Item >

             <h1 className='text-xl font-bold text-center pt-3'>Bạn có muốn đăng xuất không ?</h1>
               
            </Form.Item>
    
            
            <Form.Item >
              <div className='flex justify-end gap-2'>
              <Button onClick={()=>  setIsOpen(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Đăng xuất</button>
              </div>
               
            </Form.Item>
          </Form>
        </Modal>
        </div>




//         <>
//              {isOpen ? (

//             <div id='wrapper' onClick={handleCloseModal} className='fixed top-10 z-50 flex justify-center items-center w-full h-full'>
//                 <div className='w-fit h-fit '>
            
                    
//                 <div className='w-fit h-fit min-w-96 px-4  rounded-lg bg-slate-500 shadow-lg shadow-white'>
//                             <div className='flex  items-center justify-center gap-3 relative'>
//                                <div className='absolute font-bold text-white right-0 top-1 hover:text-black cursor-pointer' onClick={()=>setIsOpen(!isOpen)}>X</div>
//                             </div>
                            
//                             <div className='text-center mt-6  text-white font-bold'>Bạn muốn đăng xuất phải không ?</div>
                            
//                             <div className='flex flex-col gap-3 pb-3 pt-5'>
                        
                           

//                             <div className='flex items-center justify-end gap-3'>
//                                 <div onClick={handleSubmit} className=' min-w-[60px] w-20 h-[34px] bg-yellow-300 flex justify-center rounded-md items-center hover:shadow-md hover:shadow-gray-300 cursor-pointer hover:text-white hover:scale-105 '>Đăng xuất</div>
//                             </div>


//                         </div>


//                     </div>





//                 </div>
//             </div>

// ) : null}



          
//         </>
    );
}

export default ModalSignOut;