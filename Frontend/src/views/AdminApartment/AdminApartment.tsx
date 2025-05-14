import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Row from '../../components/Grid/Row';
import apartmentVehicleGet from '../../services/apartmentVehicleGet';
import { connect } from 'react-redux';
import { PHManagerState } from '../../store';
import { IApartment, IBuilding, IUser, IVehicle } from '../../types/common';
import { ListVehicles } from './ListVehicles';
import { vehicleDelete as vehicleDeleteService } from '../../services/vehicleDelete';
import { Alert } from '../../components/UI/Alert';
import { Button, Switch } from 'antd';
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import apartmentGet from '../../services/apartmentGet';
import { useServiceStatus } from '../../hooks/useServiceStatus';
import ApiError from '../../types/ApiError';
import apartmentStatusPut from '../../services/apartmentStatusPut';
import { ModalC, useModalC } from '../../components/UI/Modal';
import { CreateVehicle } from './CreateVehicle';
import { vehiclePost, Params as ParamsVehiclePost } from '../../services/vehiclePost';
import { CreateUser } from './CreateUser';
import { usersPost } from '../../services/usersPost';
import { AssignUser } from './AssignUser';

const Container = styled.div`
    .nameApto {
        margin-left: 10px;
        font-size: 28px;
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
    buildingId: '',
    ownerName: ''
}

const AdminApartment: React.FC<Props> = ({
    buildings
}) => {
    const [modal, openModal] = useModalC();
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

    const handlerSaveVehicle = async (values: ParamsVehiclePost) => {
        try {
            setServiceStatus({
                status: 'loading'
            })
            await vehiclePost(values);
            modal.close();
            setServiceStatus({
                status: 'init'
            });
            await handlerGetVehicles();
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



    const openCreateVehicle = async () => {
        openModal({
            main: <CreateVehicle
                apartmentId={apartmentId}
                vehiclePost={handlerSaveVehicle}
                loading={serviceStatus.status === 'loading'}
                cancel={() => modal.close()}
            />,
            noClosable: true
        });
    }

    const openAssignUser = async () => {
        openModal({
            main: <AssignUser />,
        });
    }

    useEffect(() => {
        (async () => {
            await handlerGetApartment()
            await handlerGetVehicles();
        })()
    }, []);

    const toBack = () => {
        navigate(`/admin?buildingId=${apartmentSelected.buildingId}`, { replace: true })
    }


    return (
        <Container>
            <ModalC props={modal} />
            <Row $justifyContent='center' className='nameApto'>
                <Button onClick={toBack} variant='link' shape="round" icon={<ArrowLeftOutlined />} />
                <span className='nameApto'>
                    {`${apartmentSelected?.buildingName} APTO ${apartmentSelected?.number}`}
                </span>
            </Row>
            <Row $justifyContent='center' $gap={10} className='title' $alignItems='center' style={{ marginTop: '20px' }}>
                <Button
                    size='small'
                    title='Propietario/a'
                    type="primary"
                    className='addBtn'
                    shape="circle"
                    onClick={openAssignUser}
                    icon={<UserOutlined />}
                />
                {apartmentSelected?.ownerName}
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
                openModalCreate={openCreateVehicle}
                loading={serviceStatus.status === 'loading'} />
            {serviceStatus.status === 'error' &&
                <Alert message={serviceStatus.error.response.detail} type="error" showIcon />}
        </Container>
    )
}

export default connect(
    (state: PHManagerState) => ({
        buildings: state.buildings,
    })
)(AdminApartment)
