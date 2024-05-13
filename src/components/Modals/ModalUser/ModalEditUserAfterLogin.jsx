
import React, { useEffect, useRef, useState } from 'react';
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
import { addAUser, editAUser, editAUserAfterLogin, getAllUsers } from '../../../redux/userReducerSlice';
const { TextArea } = Input;


function ModalEditUserAfterLogin({visible,setVisible,data}) {


    
//     const [createSkillTag, setCreateSkillTag]=useState([])
//     const [inputSkillValue, setInputSkillValue] = useState('');
//     const [inputEditSkillValue, setInputEditSkillValue] = useState([]);


//     const [createCertificationTag, setCreateCertificationTag]=useState([])
//   const [inputCertificationValue, setInputCertificationValue] = useState('');
    // console.log('createSkillTag',createSkillTag)

    
  
  
    
 
    const dispatch=useDispatch();
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
        enableReinitialize:true,
        initialValues: {
        id: data?.id,
        name: data?.name,
        email: data?.email,
        // password: data?.password,
        phone: data?.phone,
        birthday: data?.birthday,
        gender: data?.gender,
        role:data?.role,
        skill: data?.skill,
        certification:data?.certification
       

      },
      validationSchema: yup.object().shape({
    //     taiKhoan: yup.string().required("Vui lòng nhập tên tài khoản "),
    //     hoTen: yup.string().required("Vui lòng nhập họ và tên"),
  
    //     email: yup.string().required("Vui lòng nhập email"),
    //     soDt:yup.number().required("Vui lòng nhập số điện thoại"),

    //     matKhau:yup.string().required("Vui lòng nhập mật khẩu"),
    //    maNhom:yup.string().required("Vui lòng chọn mã nhóm"),
    //    maLoaiNguoiDung:yup.string().required("Vui lòng chọn mã loại người dùng"),

      //  File:yup.string().required("Vui lòng chọn file")
      
  
  
      }),
      onSubmit: async(values) => {
         try {

                 console.log('onSubmitvaluesxxxxxxxxxx',values)
                  let formData = new FormData();
                  for (let key in values){
                    // console.log('values[key]',values[key])
                        formData.append(key,values[key]);
                    
                  }


                 await dispatch(editAUserAfterLogin({formData:values}))
                //  resetForm();
                   setVisible(false)
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



     const [createSkillTag, setCreateSkillTag] = useState(data?.skill || []);
  const [inputSkillValue, setInputSkillValue] = useState('');
  const [createCertificationTag, setCreateCertificationTag] = useState(data?.certification || []);
  const [inputCertificationValue, setInputCertificationValue] = useState('');


 

  useEffect(() => {
    setCreateSkillTag(data?.skill || []);
    setCreateCertificationTag(data?.certification || []);
  }, [data]);

  const handleCloseSkill = (removedTag) => {
        const newTags = createSkillTag.filter((tag) => tag !== removedTag);
        console.log("newTags", newTags);
        setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
        setCreateSkillTag(newTags); // Cập nhật state createSkillTag
      };

 
      
      const handleSkill = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const tagValue = e.target.value.trim();
          if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
            const newTags = [...createSkillTag, tagValue];
            console.log('Enter key pressed', newTags);
            setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
            setCreateSkillTag(newTags); // Cập nhật state createSkillTag
            e.target.value = '';
            setInputSkillValue('');
          }
        }
        if (e.type === 'blur') {
          const tagValue = e.target.value.trim();
          if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
            const newTags = [...createSkillTag, tagValue];
            console.log('Mouse left input', newTags);
            setFieldValue('skill', newTags); // Cập nhật giá trị trong formik
            setCreateSkillTag(newTags); // Cập nhật state createSkillTag
            e.target.value = '';
            setInputSkillValue('');
          }
        }
      };

//   const handleCloseCertification = (removedTag) => {
//     const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
//     setCreateCertificationTag(newTags);
//   };

    const handleCloseCertification = (removedTag) => {
        const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
        console.log("newTags", newTags);
        setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
        setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
      };
      
      const handleCertification = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const tagValue = e.target.value.trim();
          if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
            const newTags = [...createCertificationTag, tagValue];
            console.log('Enter key pressed', newTags);
            setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
            setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
            e.target.value = '';
            setInputCertificationValue('');
          }
        }
        if (e.type === 'blur') {
          const tagValue = e.target.value.trim();
          if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
            const newTags = [...createCertificationTag, tagValue];
            console.log('Mouse left input', newTags);
            setFieldValue('certification', newTags); // Cập nhật giá trị trong formik
            setCreateCertificationTag(newTags); // Cập nhật state createCertificationTag
            e.target.value = '';
            setInputCertificationValue('');
          }
        }
      };





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




  return (
    <div className='w-full h-full'>
    <Modal
     cancelButtonProps={{ style: { display: 'none' } }}
     okButtonProps={{ style: { display: 'none' } }}
      open={visible}
      style={{top:20}}
      okText="Thêm"
      cancelText="Hủy"
      onCancel={()=>{
        setVisible(false)
        dispatch(getAllUsers())

        // setInputSkillValue('')
      }}
      onOk={() => { 
        setVisible(false)
        // setInputSkillValue('')
      }}
    >
        <h1 className='text-2xl font-bold text-center pb-3'>Cập Nhật Người Dùng</h1>
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
        {/* <Form.Item label="Mật khẩu">
          <Input onChange={handleChange} onBlur={handleBlur} id='password' value={values.password} />
          {errors.password && touched.password ? (<div className='text-red-500 '>{errors.password}</div>) : ''}
        </Form.Item> */}

        <Form.Item label="Số Điện Thoại">
          <Input onChange={handleChange} onBlur={handleBlur} id='phone' value={values.phone} />
          {errors.phone && touched.phone ? (<div className='text-red-500 '>{errors.phone}</div>) : ''}
        </Form.Item>

        <Form.Item label="Ngày sinh">


<DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker}  value={ values.birthday ? moment(values.birthday,'DD/MM/YYYY'):null}  id='birthday'   placeholder='Chọn ngày'/>

  {errors.birthday && touched.birthday ? (<div className='text-red-500 '>{errors.birthday}</div>) : ''}
</Form.Item>


<Form.Item  label="Giới tính">
      <Radio.Group   onBlur={handleBlur}
    value={values.gender}
    onChange={handleGenderOnChangeCustom('gender')} id='gender'>
        <Radio value={true} >Name</Radio>
        <Radio value={false}>Nữ</Radio>
       
      </Radio.Group>
    </Form.Item>


{/* <Form.Item label="Vai trò">
  <Select
    style={{width:100}}
    onBlur={handleBlur}
    value={values.role}
    onChange={handleOnChangeCustom('role')} id='role'
  >
     <Select.Option value="USER"  >USER</Select.Option>
    <Select.Option  value="ADMIN" >ADMIN</Select.Option>
   
   
  </Select>
  {errors.role && touched.role ? (<div className='text-red-500 '>{errors.role}</div>) : ''}
</Form.Item> */}

{/* 
<Form.Item label="Skills">
          <div>
            <Input
              value={inputSkillValue}
              onChange={(e) => setInputSkillValue(e.target.value)}
              onKeyDown={handleSkill}
              onBlur={handleSkill}
            />
          </div>
          <div>
            { Array.isArray(createSkillTag) && createSkillTag?.map((tag, index) => (
              <Tag style={{backgroundColor:'pink'}} key={index} closable onClose={() => handleCloseSkill(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </Form.Item>
        <Form.Item label="Certifications">
          <div>
            <Input
              value={inputCertificationValue}
              onChange={(e) => setInputCertificationValue(e.target.value)}
              onKeyDown={handleCertification}
              onBlur={handleCertification}
            />
          </div>
          <div>
            {Array.isArray(createCertificationTag) && createCertificationTag?.map((tag, index) => (
              <Tag style={{backgroundColor:'lightgreen'}} key={index} closable onClose={() => handleCloseCertification(tag)}>
                {tag}
              </Tag>
            ))}
          </div>
        </Form.Item> */}
















        <Form.Item >
            <Button onClick={()=>  setVisible(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Cập Nhật Người Dùng</button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default ModalEditUserAfterLogin






// import React, { useEffect, useState } from 'react';
// import { Modal, Form, Input, Tag } from 'antd';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

// function ModalEditUser({ visible, setVisible, data }) {
//   const [createSkillTag, setCreateSkillTag] = useState(data?.skill || []);
//   const [inputSkillValue, setInputSkillValue] = useState('');
//   const [createCertificationTag, setCreateCertificationTag] = useState(data?.certification || []);
//   const [inputCertificationValue, setInputCertificationValue] = useState('');

//   useEffect(() => {
//     setCreateSkillTag(data?.skill || []);
//     setCreateCertificationTag(data?.certification || []);
//   }, [data]);

//   const handleCloseSkill = (removedTag) => {
//     const newTags = createSkillTag.filter((tag) => tag !== removedTag);
//     setCreateSkillTag(newTags);
//   };

//   const handleSkill = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const tagValue = e.target.value.trim();
//       if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
//         setCreateSkillTag((prevTags) => [...prevTags, tagValue]);
//         e.target.value = '';
//         setInputSkillValue('');
//       }
//     }
//     if (e.type === 'blur') {
//       const tagValue = e.target.value.trim();
//       if (tagValue && createSkillTag.indexOf(tagValue) === -1) {
//         setCreateSkillTag((prevTags) => [...prevTags, tagValue]);
//         e.target.value = '';
//         setInputSkillValue('');
//       }
//     }
//   };

//   const handleCloseCertification = (removedTag) => {
//     const newTags = createCertificationTag.filter((tag) => tag !== removedTag);
//     setCreateCertificationTag(newTags);
//   };

//   const handleCertification = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const tagValue = e.target.value.trim();
//       if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
//         setCreateCertificationTag((prevTags) => [...prevTags, tagValue]);
//         e.target.value = '';
//         setInputCertificationValue('');
//       }
//     }
//     if (e.type === 'blur') {
//       const tagValue = e.target.value.trim();
//       if (tagValue && createCertificationTag.indexOf(tagValue) === -1) {
//         setCreateCertificationTag((prevTags) => [...prevTags, tagValue]);
//         e.target.value = '';
//         setInputCertificationValue('');
//       }
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       onCancel={() => setVisible(false)}
//       onOk={() => setVisible(false)}
//       title="Edit User"
//       footer={null}
//     >
//       <Form>
//         <Form.Item label="Skills">
//           <div>
//             <Input
//               value={inputSkillValue}
//               onChange={(e) => setInputSkillValue(e.target.value)}
//               onKeyDown={handleSkill}
//               onBlur={handleSkill}
//             />
//           </div>
//           <div>
//             {createSkillTag.map((tag, index) => (
//               <Tag key={index} closable onClose={() => handleCloseSkill(tag)}>
//                 {tag}
//               </Tag>
//             ))}
//           </div>
//         </Form.Item>
//         <Form.Item label="Certifications">
//           <div>
//             <Input
//               value={inputCertificationValue}
//               onChange={(e) => setInputCertificationValue(e.target.value)}
//               onKeyDown={handleCertification}
//               onBlur={handleCertification}
//             />
//           </div>
//           <div>
//             {createCertificationTag.map((tag, index) => (
//               <Tag key={index} closable onClose={() => handleCloseCertification(tag)}>
//                 {tag}
//               </Tag>
//             ))}
//           </div>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// }

// export default ModalEditUser;
