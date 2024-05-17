
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
  Rate,
} from 'antd';
import { useFormik } from 'formik';
import * as yup from "yup"
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addAUser } from '../../../redux/userReducerSlice';
import { addAJob } from '../../../redux/jobReducerSlice';
import { getAllTypeJobs } from '../../../redux/typeJobReducerSlice';
const { TextArea } = Input;

  


function ModalAddJob({visible,setVisible}) {

     const dispatch=useDispatch();

  const [createSkillTag, setCreateSkillTag]=useState([])
  const [inputSkillValue, setInputSkillValue] = useState('');

  const [createCertificationTag, setCreateCertificationTag]=useState([])
  const [inputCertificationValue, setInputCertificationValue] = useState('');

    // console.log('modalCreateMovie',visible)
    const {typeJobs} = useSelector((state) => state?.manageTypeJob);
    const [typeJobData, setTypeJobData] = useState([]);
  console.log('typeJobData',typeJobData)

 
 

    useEffect(() => {
      setTypeJobData(typeJobs);
    }, [typeJobs]);


    useEffect(() => {

      dispatch(getAllTypeJobs())
     
     }, []);
  

    const { handleChange, handleSubmit, handleBlur, resetForm, values, errors, touched,setFieldValue } = useFormik({
      
      initialValues: {
        tenCongViec: "",
        danhGia: 0,
        giaTien: 0,
        nguoiTao: localStorage.getItem('USER') ? JSON.parse(localStorage.getItem('USER')).user.id : 0,
        hinhAnh: "",
        moTa: "",
        maChiTietLoaiCongViec: 0,
        moTaNgan: "",
        saoCongViec: 0
       

      },
      validationSchema: yup.object().shape({
        tenCongViec: yup.string().required("Vui lòng nhập tên công việc "),
        danhGia: yup.number().required("Vui lòng nhập số"),
  
        giaTien: yup.number()
        .typeError('Giá tiền phải là một số')
        .required('Vui lòng nhập giá tiền'),
        moTa:yup.string().required("Vui lòng nhập miêu tả"),

        maChiTietLoaiCongViec:yup.string().required("Vui lòng nhập loại công việc"),
        moTaNgan:yup.string().required("Vui lòng miêu tả ngắn"),

      //  hinhAnh:yup.string().required("Vui lòng chọn ảnh")
      
  
  
      }),
      onSubmit: async(values) => {
         try {

                 console.log('onSubmitvaluesxxxxxxxxxx',values)
                  let formData = new FormData();
                  for (let key in values){
                    // console.log('values[key]',values[key])
                        formData.append(key,values[key]);
                    
                  }


                 await dispatch(addAJob({formData:values}))
                 resetForm();
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



    const handleChangeDatePicker = (date, dateString) => {

      // console.log('handleChangeDatePicker', moment('2024-04-30T00:00:00', 'DD/MM/YYYY'));
      // console.log('handleChangeDatePicker', moment(date.d).format('DD/MM/YYYY'));
      setFieldValue('birthday', dateString); // Update form value
    };

    

    // const handleChangeDatePicker = (value) => {
    //   // console.log('dateString', dateString);

    //   console.log("value_date", moment(value.selectedDate).format('DD/MM/YYYY'));
    // };

    const handleOnChangeCustom = (name) => {
      return (value) => {
        setFieldValue(name, value);
      };
    };

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
      open={visible}
      style={{top:20}}
      okText="Thêm"
      cancelText="Hủy"
      onCancel={()=>{
        setVisible(false);
        setCreateSkillTag('')
        setInputSkillValue('')
        setCreateCertificationTag('')
        setInputCertificationValue('')
         
      }}
      onOk={() => { 
        setVisible(false);
        setInputSkillValue('')
      }}
    >
        <h1 className='text-2xl font-bold text-center pb-3'>Thêm Công Việc Mới</h1>
        <Form
        onSubmitCapture={handleSubmit}
        
        layout="horizontal"
        
       
      >
      
        <Form.Item  label="Tên công việc">
        
          <Input  onChange={handleChange} onBlur={handleBlur} id='tenCongViec' value={values.tenCongViec} />
          
         
          {errors.tenCongViec && touched.tenCongViec ? (<div className='text-red-500 '>{errors.tenCongViec}</div>) : ''}

        </Form.Item>
        <Form.Item label="Giá tiền">
          <Input onChange={handleChange} onBlur={handleBlur} id='giaTien' value={values.giaTien} />
          {errors.giaTien && touched.giaTien ? (<div className='text-red-500 '>{errors.giaTien}</div>) : ''}

        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea onChange={handleChange} onBlur={handleBlur} id='moTa' value={values.moTa} />
          {errors.moTa && touched.moTa ? (<div className='text-red-500 '>{errors.moTa}</div>) : ''}

        </Form.Item>

        <Form.Item label="Mô tả ngắn">
          <TextArea onChange={handleChange} onBlur={handleBlur} id='moTaNgan' value={values.moTaNgan} />
          {errors.moTaNgan && touched.moTaNgan ? (<div className='text-red-500 '>{errors.moTaNgan}</div>) : ''}

        </Form.Item>








        {/* <Form.Item label="Mã chi tiết loại công việc">
          <Input onChange={handleChange} onBlur={handleBlur} id='maChiTietLoaiCongViec' value={values.maChiTietLoaiCongViec} />
          {errors.maChiTietLoaiCongViec && touched.maChiTietLoaiCongViec ? (<div className='text-red-500 '>{errors.maChiTietLoaiCongViec}</div>) : ''}
        </Form.Item> */}




        <Form.Item label="Mã chi tiết loại công việc">
  <Select
    onBlur={handleBlur}
    value={values.maNhom}
    onChange={handleOnChangeCustom('maChiTietLoaiCongViec')} id='maChiTietLoaiCongViec'
  >

    {typeJobData.length>0 && Array.isArray(typeJobData) 
    ?( 
      typeJobData.map((typeJob,index)=>{
        return ( <Select.Option  value={typeJob?.id} >{typeJob?.tenLoaiCongViec}</Select.Option>)
      })
   
    ) 
    :(<Select.Option  value='0' >Không có loại công việc</Select.Option>)}
  </Select>
  {errors.maChiTietLoaiCongViec && touched.maChiTietLoaiCongViec ? (<div className='text-red-500 '>{errors.maChiTietLoaiCongViec}</div>) : ''}
</Form.Item>









        <Form.Item label="Sao công việc">
        <Rate defaultValue={5}  onChange={handleOnChangeCustom('saoCongViec')}  id='saoCongViec' value={values.saoCongViec} />
  {errors.saoCongViec && touched.saoCongViec ? (
    <div className='text-red-500 '>{errors.saoCongViec}</div>
  ) : ''}
</Form.Item>


















        <Form.Item >
            <Button onClick={()=>  setVisible(false)} className='bg-yellow-500 text-white' >Hủy</Button> <button  type='submit' className='px-2 py-1 rounded bg-green-500 text-white' >Thêm Người Dùng</button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  )
}

export default ModalAddJob