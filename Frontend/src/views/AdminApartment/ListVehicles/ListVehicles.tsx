import React from 'react'
import { IVehicle } from '../../../types/common'
import Row from '../../../components/Grid/Row'
import Column from '../../../components/Grid/Column'
import { Button } from 'antd';
import * as Styled from './styles'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { N } from 'ts-toolbelt';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
    vehicles: IVehicle[];
    loading: boolean;
    deleteVehicle: (id: string) => Promise<void>;
    idApartment: string;
}

export const ListVehicles: React.FC<Props> = ({
    vehicles,
    loading,
    deleteVehicle,
    idApartment
}) => {

    return (
        <div>
            <Styled.Title>
                <div>Lista de vehiculos</div>
                {
                    vehicles.length < 2 && (
                        <NavLink to={`/admin/apartment/${idApartment}/create-vehicle`}>
                            <Button
                                size='small'
                                title='Agregar nuevo vehiculo'
                                type="primary"
                                className='addBtn'
                                shape="circle"
                                disabled={loading || vehicles.length >= 2}
                                icon={<PlusOutlined />}
                            />
                        </NavLink>
                    )
                }
            </Styled.Title>
            <Styled.ContainerList>
                {vehicles.length === 0 ?
                    <div>No hay vehiculos registrados</div> :
                    vehicles.map((item, index) => (
                        <Styled.Item>
                            <Row key={index} $justifyContent='space-between' >
                                <Column>
                                    <div>{item.plate}</div>
                                    <div>{item.vehicleType}</div>
                                </Column>
                                <div>
                                    <Button
                                        className='btn'
                                        danger
                                        disabled={loading}
                                        icon={<CloseOutlined />}
                                        onClick={() => deleteVehicle(item.id)}
                                    />
                                </div>
                            </Row>
                        </Styled.Item>
                    ))
                }
            </Styled.ContainerList>

        </div>
    )
}
