import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../redux/jobReducerSlice';
import Search from 'antd/es/input/Search'

function ShowJobs() {

  const {jobs} = useSelector((state) => state?.manageJob);
  const [jobData, setJobData] = useState([]);
  console.log('jobData',jobData)

useEffect(() => {
    setJobData(jobs);
  }, [jobs]);


  const dispatch=useDispatch();
  
  useEffect(() => {

   dispatch(getAllJobs())

   
   
  }, []);

  const onSearchJob = (value) => {
    setJobData(jobs.filter(job => job.tenCongViec.trim().toLowerCase().includes(value.trim().toLowerCase())));

  };


  return (
    <div className='bg-orange-400 w-full h-screen '>
      <div className='px-4 bg-orange-100'>

      <div className='flex justify-center items-center md:justify-start md:w-96 py-3'>
    <Search
   placeholder="Nhập thông tin công việc "
   allowClear
   enterButton="Tìm kiếm"
   size="large"
   onSearch={onSearchJob}
 />

  </div>


      <div className='bg-orange-100  w-full flex flex-col  h-full lg:max-h-[520px] overflow-y-auto no-scrollbar'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 '>

      {jobData.length > 0 && Array.isArray(jobData) ? (
    [...jobData].reverse().map((job) => (
        <div key={job.id} className='relative overflow-hidden cursor-pointer group'>
            <div className='w-full shadow-lg shadow-slate-400 relative flex justify-center items-center '>
                <img className='w-full h-40 object-cover group-hover:scale-105 duration-300' src={job.hinhAnh} alt={job.hinhAnh} />
                <div className='absolute  hidden group-hover:block hover:bg-red-300  text-white text-center border-2 border-white p-4 w-fit bg-white/50 '>Xem Chi Tiết</div>
            </div>
            <div className='flex  flex-col p-3  transition-all duration-100 '>  
                <div className='pb-3 flex items-center gap-3'>
                    {/* <span className='text-white bg-red-500 p-1 rounded'>{job.tenCongViec}</span> */}
                    <h1 className='font-bold text-sky-500'>{job.tenCongViec}</h1>
                </div>
                {/* <div className='pb-3 flex items-center gap-3'>
                    <div><span className='text-black font-bold'>Bắt đầu: </span><span className='text-orange-500'>{moment(movie.ngayKhoiChieu).utcOffset(7 * 60).format('hh:mm:ss - DD/MM/YYYY ')}</span></div>
                </div> */}
                <p className='line-clamp-2'>{job.moTa}</p>
            </div>
        </div>
    ))
) : (

<div className='flex justify-center items-center w-screen h-screen '>

  <div className='bg-slate-400'>Không tìm thấy</div>
</div>

)}

   
      </div>






      </div>


      </div>

    </div>
  )
}

export default ShowJobs
