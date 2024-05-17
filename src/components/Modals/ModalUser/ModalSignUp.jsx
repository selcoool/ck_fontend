
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
import { signUpUser } from '../../../redux/userReducerSlice';
const { TextArea } = Input;

function ModalSignUp({ isOpen, setIsOpen}) {
    const [createSkillTag, setCreateSkillTag]=useState([])
    const [inputSkillValue, setInputSkillValue] = useState('');
  
    const [createCertificationTag, setCreateCertificationTag]=useState([])
    const [inputCertificationValue, setInputCertificationValue] = useState('');
      // console.log('modalCreateMovie',visible)
   
      const dispatch=useDispatch();
    
  
      const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        
        initialValues: {
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: true,
          role: "USER",
          // skill: [
          //   "string"
          // ],
          skill: createSkillTag,
          certification: createCertificationTag
         
  
        },
        validationSchema: yup.object().shape({
          name: yup.string().required("Vui lòng nhập tên tài khoản "),
          email: yup.string().email('Địa chỉ email không hợp lệ').required("Vui lòng nhập email"),
    
          password: yup.string().required("Vui lòng nhập mật khẩu"),
          phone:yup.string()
          .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số")
          .required('Vui lòng nhập số điện thoại')
          .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
          .max(11, 'Số điện thoại không được vượt quá 11 chữ số'),
  
          birthday:yup.string().required("Vui lòng nhập ngày sinh"),
        
  
      
        
    
    
        }),
        onSubmit: async(values) => {
           try {
  
                   console.log('onSubmitvaluesxxxxxxxxxx',values)
                    let formData = new FormData();
                    for (let key in values){
                      // console.log('values[key]',values[key])
                          formData.append(key,values[key]);
                      
                    }
  
  
                   await dispatch(signUpUser({formData:values}))
                   resetForm();
                   setIsOpen(false)
                  //  setImageData();
                  
                 
                  //   fileInputRef.current.value = null;
                  
  
            
           } catch (error) {
                console.log('error',error)
           }
                    
        }
      });
    
      console.log('values', values)
      console.log('errors', errors)
      console.log('touched', touched);
  
  
  
      const handleChangeDatePicker = (date, dateString) => {
  
        // console.log('handleChangeDatePicker', moment('2024-04-30T00:00:00', 'DD/MM/YYYY'));
        // console.log('handleChangeDatePicker', moment(date.d).format('DD/MM/YYYY'));
        setFieldValue('birthday', dateString); // Update form value
      };
  
      
  
      // const handleChangeDatePicker = (value) => {
      //   // console.log('dateString', dateString);
  
      //   console.log("value_date", moment(value.selectedDate).format('DD/MM/YYYY'));
      // };
  
   const handleOnChangeCustom=(name)=>{
     return (value)=>{
      setFieldValue(name,value)
     }
   }
  
   const handleGenderOnChangeCustom=(name)=>{
    //  console.log('dddđ')
     return (event)=>{
      setFieldValue(name,event.target.value)
     }
   }
  
   const handleCloseSkill = (removedTag) => {
    const newTags = createSkillTag.filter((tag) => tag !== removedTag);
    console.log("newTags",newTags);
    setFieldValue('skill',newTags);
    setCreateSkillTag(newTags);
  };
  
  
  
  
  
   const handleSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
      if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
        setCreateSkillTag((prevTags) => {
  
          const newTags = [...prevTags, tagValue];
          console.log('Enter key pressed', newTags); 
          setFieldValue('skill',newTags);
          // Log giá trị mới của createTag
          return newTags; // Trả về mảng mới
        });
        e.target.value = ''; // Đặt giá trị của input về rỗng
        setInputSkillValue('')
      }
    }
    if (e.type === 'blur') {
      const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
      if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
        setCreateSkillTag((prevTags) => {
          const newTags = [...prevTags, tagValue];
          console.log('Mouse left input', newTags);
          setFieldValue('skill',newTags); // Log giá trị mới của createTag
          return newTags; // Trả về mảng mới
        });
        e.target.value = ''; // Đặt giá trị của input về rỗng
        setInputSkillValue('')
      }
    }
  };
  
  
  
  const handleCloseCertification = (removedTag) => {
    const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
    console.log("newTags",newTags);
    setFieldValue('certification',newTags);
    setCreateCertificationTag(newTags);
  };
  
  
  const handleCertification = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
      if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
        setCreateCertificationTag((prevTags) => {
  
          const newTags = [...prevTags, tagValue];
          console.log('Enter key pressed', newTags); 
          setFieldValue('certification',newTags);
          // Log giá trị mới của createTag
          return newTags; // Trả về mảng mới
        });
        e.target.value = ''; // Đặt giá trị của input về rỗng
        setInputCertificationValue('')
      }
    }
    if (e.type === 'blur') {
      const tagValue = e.target.value.trim(); // Lấy giá trị của tag và loại bỏ khoảng trắng đầu cuối
      if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
        setCreateCertificationTag((prevTags) => {
          const newTags = [...prevTags, tagValue];
          console.log('Mouse left input', newTags);
          setFieldValue('certification',newTags); // Log giá trị mới của createTag
          return newTags; // Trả về mảng mới
        });
        e.target.value = ''; // Đặt giá trị của input về rỗng
        setInputCertificationValue('')
      }
    }
  };
  
  
  
    return (
      <div className='w-full h-full'>
      <Modal
       cancelButtonProps={{ style: { display: 'none' } }}
       okButtonProps={{ style: { display: 'none' } }}
        open={isOpen}
        style={{top:20}}
        okText="Thêm"
        cancelText="Hủy"
        onCancel={()=>{
            setIsOpen(false);
          setCreateSkillTag('')
          setInputSkillValue('')
          setCreateCertificationTag('')
          setInputCertificationValue('')
           
        }}
        onOk={() => { 
            setIsOpen(false);
          setInputSkillValue('')
        }}
      >
          <h1 className='text-2xl font-bold text-center pb-3'>Đăng Ký Tài Khoản Người Dùng</h1>
          <Form
          onSubmitCapture={handleSubmit}
          
          layout="horizontal"
          
         
        >
        
          <Form.Item  label="Tên">
          
            <Input  onChange={handleChange} onBlur={handleBlur} id='name' value={values.name} />
            
           
            {errors.name && touched.name ? (<div className='text-red-500 '>{errors.name}</div>) : ''}
            
          </Form.Item>
          <Form.Item label="Email">
            <Input onChange={handleChange} onBlur={handleBlur} id='email' value={values.email} />
            {errors.email && touched.email ? (<div className='text-red-500 '>{errors.email}</div>) : ''}
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input type='password' onChange={handleChange} onBlur={handleBlur} id='password' value={values.password} />
            {errors.password && touched.password ? (<div className='text-red-500 '>{errors.password}</div>) : ''}
          </Form.Item>
  
          <Form.Item label="Số Điện Thoại">
            <Input onChange={handleChange} onBlur={handleBlur} id='phone' value={values.phone} />
            {errors.phone && touched.phone ? (<div className='text-red-500 '>{errors.phone}</div>) : ''}
          </Form.Item>
  
          <Form.Item label="Ngày sinh">
  
 
  <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker}  value={values.birthday ? moment(values.birthday, 'DD/MM/YYYY') : null}   placeholder='Chọn ngày'/>
  
    {errors.birthday && touched.birthday ? (<div className='text-red-500 '>{errors.birthday}</div>) : ''}
  </Form.Item>
  
  
  <Form.Item  label="Giới tính">
        <Radio.Group   onBlur={handleBlur}
      value={values.gender}
      onChange={handleGenderOnChangeCustom('gender')} id='gender'>
          <Radio value={true} >Nam</Radio>
          <Radio value={false}>Nữ</Radio>
         
        </Radio.Group>
      </Form.Item>
  

  
  

  <Form.Item label="Kỹ năng">
    <div className='flex flex-col gap-1'>
    <div>
    <Input 
     value={inputSkillValue}
     onChange={(e) => setInputSkillValue(e.target.value)}
    onBlur={handleSkill}
      onKeyDown={handleSkill} 
    />
    </div>
  
    <div className='flex gap-0.5 flex-wrap'>
     {  createSkillTag.length >0 && createSkillTag?.map((tag,index)=>{
      return <Tag style={{backgroundColor:'pink'}}
      closable
      onClose={(e) => {
        e.preventDefault();
        handleCloseSkill(tag);
      }}
    >
      {tag}
    </Tag>
     })
  
     }
  
    </div>
    </div>
    {/* {errors.phone && touched.phone ? (<div className='text-red-500 '>{errors.phone}</div>) : ''} */}
  </Form.Item>
  
  
  
  
  
  <Form.Item label="Chứng chỉ">
    <div className='flex flex-col gap-1'>
          <div>
          <Input 
          value={inputCertificationValue}
          onChange={(e) => setInputCertificationValue(e.target.value)}
          onBlur={handleCertification}
            onKeyDown={handleCertification} id='certification'
          />
          </div>
  
          <div className='flex gap-0.5 flex-wrap'>
          {  createCertificationTag.length >0 && createCertificationTag?.map((tag,index)=>{
            return <Tag
            style={{backgroundColor:'lightgreen'}}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleCloseCertification(tag);
            }}
          >
            {tag}
          </Tag>
          })
  
          }
  
          </div>
    </div>
    
  </Form.Item>
  
  
  
  
          <Form.Item >
              <Button onClick={()=>  setIsOpen(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Đăng Ký</button>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    )
    
}

export default ModalSignUp;