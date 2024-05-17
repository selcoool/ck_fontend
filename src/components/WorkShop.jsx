import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import ShowJobs from './ShowJobs';
import ShowUsers from './ShowUsers';
import ShowRecruitJob from './ShowRecruitJob';
// import ShowRecruitJob from './ShowRecruitJob';

function WorkShop() {


    const items = [
        {
          key: 'Công Việc',
          label: 'Công Việc',
          children: <ShowJobs/>,
        },
        {
          key: 'Người Làm Việc',
          label: 'Người Làm Việc',
          children:<ShowUsers/>,
        },
        {
          key: 'Công Việc Bạn Đã Thuê',
          label: 'Công Việc Bạn Đã Thuê',
          children: <ShowRecruitJob/>,
        },
      ];
  
    
  
    return (
      <div >
       
        <Tabs
          tabPosition='top'
          items={items}
        />
      </div>
    );
}

export default WorkShop
