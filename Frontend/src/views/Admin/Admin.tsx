import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Buildings } from './Buildings';
import { Apartments } from './Apartments';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Torres',
    children: <Buildings />,
  },
  {
    key: '2',
    label: 'Apartamentos',
    children: <Apartments />,
  }
];

const Admin: React.FC = () => 
  <div style={{ padding: '5px' }}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>;

export default Admin;