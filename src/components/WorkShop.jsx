import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';
import ShowJobs from './ShowJobs';
import ShowUsers from './ShowUsers';

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
        // {
        //   key: 'Công Việc Đã Thuê',
        //   label: 'Công Việc Đã Thuê',
        //   children: "Công Việc Đã Thuê",
        // },
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
