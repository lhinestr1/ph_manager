import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { ApartmentsView } from './Apartments';
import { Users } from './Users';

const items: TabsProps['items'] = [
  {
    key: '2',
    label: 'Apartamentos',
    children: <ApartmentsView />,
  },
  {
    key: '3',
    label: 'Usuarios',
    children: <Users />,
  }
];

const Admin: React.FC = () => {
  return (
    <div style={{height: "calc(100% - 64px)"}}>
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
}

export default Admin;