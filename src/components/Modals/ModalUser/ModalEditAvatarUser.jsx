
import React, { useRef, useState } from 'react';
import {
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Tag,
} from 'antd';
import { useFormik } from 'formik';
import * as yup from "yup"
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { editAvatarUser } from '../../../redux/userReducerSlice';
const { TextArea } = Input;
 



function ModalEditAvatarUser({ isOpen, setIsOpen}) {

    
      const fileInputRef = useRef(null);
      const [imageData,setImageData]=useState(null)
   
      const dispatch=useDispatch();
    
      const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
      const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        
        initialValues: {
        
            formFile: ""
  
        },
        
        validationSchema: yup.object().shape({
          formFile: yup.mixed()
          .required('Vui lòng chọn một file')
          .test(
            'fileType',
            'File không hợp lệ. Vui lòng chọn một file ảnh.',
            value => value && SUPPORTED_FORMATS.includes(value.type)
          )
     
        
    
    
        }),
        onSubmit: async(values) => {
           try {
  
           
                    let formData = new FormData();
                    for (let key in values){
                      // console.log('values[key]',values[key])
                          formData.append(key,values[key]);
                      
                    }
  
  
                   await dispatch(editAvatarUser({formData:formData}))
                   resetForm();
                   setIsOpen(false)
                   setImageData();
                  
                 
                    fileInputRef.current.value = null;
                  
  
            
           } catch (error) {
                // console.log('error',error)
           }
                    
        }
      });
    
      // console.log('values', values)
      // console.log('errors', errors)
      // console.log('touched', touched);
  
  
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
            setImageData();
            fileInputRef.current.value = null;
       
           
        }}
        onOk={() => { 
            setIsOpen(false);
  
        }}
      >
          <h1 className='text-2xl font-bold text-center pb-3'>Cập Avatar</h1>
          <Form
          onSubmitCapture={handleSubmit}
          
          layout="horizontal"
          
         
        >
        

        <Form.Item label="Avatar">
          <input type='file' ref={fileInputRef}  id='formFile' onBlur={handleBlur}
               onChange={(e) => {
                      //  const file = e.target.files[0];
                        setImageData(URL.createObjectURL(e.target.files[0]))
                        values.formFile = e.target.files[0];

                    }}/>
                 {errors.formFile && touched.formFile ? (<div className='text-red-500 '>{errors.formFile}</div>) : ''}
               <br />
              
              <img src={imageData!=null ? imageData :JSON.parse(localStorage?.getItem('USER'))?.user?.avatar  } alt='....' className='w-28 h-28 object-cover'/>
        </Form.Item>
         
  
          
          <Form.Item >
            <div className='flex justify-end gap-2'>
            <Button onClick={()=>  setIsOpen(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Cập nhật</button>
            </div>
             
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
}

export default ModalEditAvatarUser;