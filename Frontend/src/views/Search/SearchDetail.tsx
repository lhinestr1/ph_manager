import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Response } from '../../services/vehicleGet';

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={() => alert("Prueba")} />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

interface Props {
    data: Response
}

export const SearchDetail: React.FC<Props> = ({
    data: { apartment_number, building_name, is_in_arrears, plate }
}) => {

    return (
        <Flex gap="middle" align="center" vertical>
            <Card actions={actions} style={{ minWidth: 300 }}>
                <Card.Meta
                    avatar={<UserOutlined />}
                    title={plate}
                    description={
                        <>
                            <p>{ `${building_name} ${apartment_number}` }</p>
                            <p>Luis Javier Hinestroza Cepeda</p>
                            <p>Tipo de vihiculo: MOTO</p>
                            <p>Estado cuenta: { `${ is_in_arrears ? "Al dia" : "En mora" }` } </p>
                        </>
                    }
                />
            </Card>
        </Flex>
    );
};