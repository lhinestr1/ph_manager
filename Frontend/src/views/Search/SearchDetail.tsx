import React from 'react';
import { Alert, Card, Flex } from 'antd';
import { Response } from '../../services/vehiclePlateGet';
import { Plate } from '../../components/Plate/Plate';
import Row from '../../components/Grid/Row';
import { Item } from './styles';

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
                    title={<Row $justifyContent='center' className='title' style={{ fontSize: '24px' }}>{aptoName}</Row>}
                    description={
                        <div>
                            <Row $justifyContent='center' >
                                <Plate numero={vehicleInfo.plate} />
                            </Row>
                            <Item>
                                <div className='title label'>Propietario:</div>
                                <div>{apartmentInfo.ownerName}</div>
                            </Item>
                            {tenants.length > 0 && (
                                <Item>
                                    <div className='title label'>Inquilinos:</div>
                                    {tenants.map((name: string) => (
                                        <div>{name}</div>
                                    ))}
                                </Item>
                            )}
                            <Item>
                                <div className='title label'>Tipo de vihiculo:</div>
                                <div>{vehicleInfo.vehicleType}</div>
                            </Item>
                            {vehicleInfo.brand &&
                                <Item>
                                    <div className='title label'>Marca:</div>
                                    <div>{vehicleInfo.brand}</div>
                                </Item>
                            }
                            {vehicleInfo.model &&
                                <Item>
                                    <div className='title label'>Modelo:</div>
                                    <div>{vehicleInfo.model}</div>
                                </Item>
                            }
                            {vehicleInfo.color &&
                                <Item>
                                    <div className='title label'>Color:</div>
                                    <div>{vehicleInfo.color}</div>
                                </Item>
                            }
                            <Alert
                                style={{ marginTop: '20px' }}
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