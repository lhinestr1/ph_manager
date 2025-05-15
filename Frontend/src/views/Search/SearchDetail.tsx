import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Card, Flex } from 'antd';
import { Response } from '../../services/vehiclePlateGet';

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={() => alert("Prueba")} />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

interface Props {
    data: Response
}

export const SearchDetail: React.FC<Props> = ({
    data: { apartmentInfo, vehicleInfo, tenants }
}) => {

    const aptoName = `${apartmentInfo.buildingName} apto ${apartmentInfo.number}`;

    return (    
        <Flex gap="middle" align="center" vertical>
            <Card style={{ width: '100%', minWidth: 300 }}>
                <Card.Meta
                    title={<h3>{ apartmentInfo.ownerName }</h3>}
                    description={
                        <div>
                            <div>{vehicleInfo.plate}</div>
                            <p>{aptoName}</p>
                            {
                                tenants.map( (name: string) => (
                                    <p>{ name }</p>
                                ))
                            }
                            <p>Tipo de vihiculo: {vehicleInfo.vehicleType}</p>
                            <p>Marca: {vehicleInfo.brand}</p>
                            <p>Modelo: {vehicleInfo.model}</p>
                            <p>Color: {vehicleInfo.color}</p>
                            <Alert
                                type={apartmentInfo.isInArrears ? 'error' : 'success'}
                                message={`Estado de cuenta: ${apartmentInfo.isInArrears ? "En mora" : "Al dia"}`}
                                description={apartmentInfo.isInArrears ? `${aptoName}  tiene un saldo pendiente, favor acercarse a administraccion.` : "El vehiculo puede ingresar."}
                                showIcon
                            />
                        </div>
                    }
                />
            </Card>
        </Flex>
    );
};