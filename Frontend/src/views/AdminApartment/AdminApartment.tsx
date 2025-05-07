import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Row from '../../components/Grid/Row';
import apartmentVehicleGet from '../../services/apartmentVehicleGet';
import { connect } from 'react-redux';
import { PHManagerState } from '../../store';
import { IApartment, IBuilding, IVehicle } from '../../types/common';
import { ListVehicles } from './ListVehicles';
import { vehicleDelete as vehicleDeleteService } from '../../services/vehicleDelete';
import { Alert } from '../../components/UI/Alert';
import { Button, Switch } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import apartmentGet from '../../services/apartmentGet';
import { useServiceStatus } from '../../hooks/useServiceStatus';
import ApiError from '../../types/ApiError';
import apartmentStatusPut from '../../services/apartmentStatusPut';

const Container = styled.div`
    .title {
        font-size: 28px;
    }
    .nameApto {
        margin-left: 10px;
    }
`;

interface Props {
    buildings: IBuilding[]
}

export const InitialApartmentSelected: IApartment = {
    buildingName: '',
    createdAt: '',
    id: '',
    isInArrears: false,
    number: '',
    updatedAt: '',
    buildingId: ''
}

const AdminApartment: React.FC<Props> = ({
    buildings
}) => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [apartmentSelected, setApartmentSelected] = useState<IApartment>(InitialApartmentSelected);
    const { apartmentId = '' } = useParams();
    const navigate = useNavigate();
    const [serviceStatus, setServiceStatus] = useServiceStatus({
        status: 'init'
    });

    const handlerGetVehicles = async () => {
        try {
            setServiceStatus({
                status: 'loading'
            })
            const { payload } = await apartmentVehicleGet({
                apartment_id: apartmentId
            });
            setVehicles(payload);
            setServiceStatus({
                status: 'init'
            });
        } catch (e) {
            if (e instanceof ApiError) {
                setServiceStatus({
                    status: 'error',
                    error: e
                });
            }
        }
    }

    const handlerGetApartment = async () => {
        try {
            setServiceStatus({
                status: 'loading'
            })
            const { payload } = await apartmentGet({
                apartment_id: apartmentId
            });
            setApartmentSelected(payload);
            setServiceStatus({
                status: 'init'
            });
        } catch (e) {
            if (e instanceof ApiError) {
                setServiceStatus({
                    status: 'error',
                    error: e
                });
            }
        }
    }

    const handlerDeleteVehicle = async (id: string) => {
        try {
            setServiceStatus({
                status: 'loading',
            })
            await vehicleDeleteService({
                vehicle_id: id
            });
            setServiceStatus({
                status: 'init'
            });
        } catch (e) {
            if (e instanceof ApiError) {
                setServiceStatus({
                    status: 'error',
                    error: e
                });
            }
        }
    }

    const handlerChangeStatus = async (isArrears: boolean) => {
        try {
            setServiceStatus({
                status: 'loading',
            })
            await apartmentStatusPut({
                apartment_id: apartmentId
            })({
                isArrears: !isArrears
            });
            setApartmentSelected(prev => ({
                ...prev,
                isInArrears: !prev.isInArrears
            }))
            setServiceStatus({
                status: 'init'
            });
        } catch (e) {
            if (e instanceof ApiError) {
                setServiceStatus({
                    status: 'error',
                    error: e
                });
            }
        }
    }

    useEffect(() => {
        (async () => {
            await handlerGetApartment()
            await handlerGetVehicles();
        })()
    }, []);

    const toBack = () => {
        console.log('toBack ? enviar buildingId por query param');
        navigate(`/admin?buildingId=${apartmentSelected.buildingId}`, { replace: true })
    }


    return (
        <Container>
            <Row $justifyContent='center' className='title'>
                <Button onClick={toBack} variant='link' shape="round" icon={<ArrowLeftOutlined />} />
                <span className='nameApto title'>
                    {`${apartmentSelected?.buildingName} APTO ${apartmentSelected?.number}`}
                </span>
            </Row>
            <Row $gap={10} style={{ marginTop: '20px' }}>
                <Switch
                    checked={!apartmentSelected.isInArrears}
                    checkedChildren="Al dia"
                    unCheckedChildren="En Mora"
                    onChange={handlerChangeStatus}
                />
            </Row>
            <ListVehicles
                idApartment={apartmentId}
                vehicles={vehicles}
                deleteVehicle={async (id: string) => {
                    await handlerDeleteVehicle(id);
                    await handlerGetVehicles();
                }}
                loading={serviceStatus.status === 'loading'} />
            {serviceStatus.status === 'error' &&
                <Alert message={serviceStatus.error.message} type="error" showIcon />}
        </Container>
    )
}

export default connect(
    (state: PHManagerState) => ({
        buildings: state.buildings,
    })
)(AdminApartment)
