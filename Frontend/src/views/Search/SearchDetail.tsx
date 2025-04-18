import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Card, Flex } from 'antd';
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
    data: { apartment_number, building_name, is_in_arrears, plate, vehicle_type, brand, model, color }
}) => {

    const aptoName = `${building_name} apto ${apartment_number}`;

    return (
        <Flex gap="middle" align="center" vertical>
            <Card style={{ width: '100%', minWidth: 300 }}>
                <Card.Meta
                    title={plate}
                    description={
                        <>
                            <p>{aptoName}</p>
                            <p>Luis Javier Hinestroza Cepeda</p>
                            <p>Tipo de vihiculo: {vehicle_type}</p>
                            <p>Marca: {brand}</p>
                            <p>Modelo: {model}</p>
                            <p>Color: {color}</p>
                            <p>
                                <Alert
                                    type={is_in_arrears ? 'error' : 'success'}
                                    message={`Estado de cuenta: ${is_in_arrears ? "En mora" : "Al dia"}`}
                                    description={is_in_arrears ? `${aptoName}  tiene un saldo pendiente, favor acercarse a administraccion.` : "El vehiculo puede ingresar."}
                                    showIcon
                                />
                            </p>
                        </>
                    }
                />
            </Card>
        </Flex>
    );
};