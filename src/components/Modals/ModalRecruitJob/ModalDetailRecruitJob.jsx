import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../../redux/jobReducerSlice';

function ModalDetailRecruitJob({ visible, setVisible, data }) {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state?.manageJob);
  const [detailRecruitJobData, setDetailRecruitJobData] = useState([]);

  useEffect(() => {
    if (data) {
      const jobId = data?.maCongViec;
      const filteredJob = jobs.filter((job) => job.id === jobId);
      setDetailRecruitJobData(filteredJob);
    }
  }, [data, jobs]);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  return (
    <div className='w-full h-full'>
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        open={visible}
        style={{ top: 70 }}
        okText='Đóng'
        cancelText='Hủy'
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <h1 className='text-2xl font-bold text-center pb-3'>
          <span className='text-red-500'>
            {Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.nguoiTao}
          </span>
          -[{data?.id}]
        </h1>
        <div className='flex gap-3'>
          <div className='w-1/2 flex justify-center items-center'>
            <img
              className='w-80 h-80 object-cover'
              src={detailRecruitJobData[0]?.hinhAnh || 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}
              alt={detailRecruitJobData[0]?.hinhAnh || 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-gai-xinh-hd.jpg';
              }}
            />
          </div>
          <div className='w-1/2 pb-2'>
            <div>
           
              <span className='font-bold'>Tên công việc [ {Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.maChiTietLoaiCongViec}]:</span> {Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.tenCongViec}
            </div>
            <div>
              <span className='font-bold'>Giá tiền:</span> {Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.giaTien}
            </div>
            <div>
              <span className='font-bold'>Đánh giá:</span> {Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.danhGia}
            </div>
            <div>
              <span className='font-bold'>Số sao công việc:</span>
              <Rate value={Array.isArray(detailRecruitJobData) && detailRecruitJobData[0]?.saoCongViec} disabled />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetailRecruitJob;
