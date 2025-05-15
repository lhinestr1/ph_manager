import React, { useCallback, useEffect, useState } from 'react'
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
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import apartmentGet from '../../services/apartmentGet';
import { useServiceStatus } from '../../hooks/useServiceStatus';
import ApiError from '../../types/ApiError';
import apartmentStatusPatch from '../../services/apartmentStatusPatch';
import { ModalC, useModalC } from '../../components/UI/Modal';
import { CreateVehicle } from './CreateVehicle';
import { vehiclePost, Params as ParamsVehiclePost } from '../../services/vehiclePost';
import { AssignUser } from './AssignUser';
import { ListTenants } from './ListTenants';

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
    ownerName: '',
    tenant_names: []
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

    const handlerSetApartment = async (value: { isInArrears?: boolean, ownerId?: string }) => {
        try {
            setServiceStatus({
                status: 'loading',
            })

            const response = await apartmentStatusPatch({
                apartment_id: apartmentId
            })({
                ...(value.isInArrears && {
                    isInArrears: value.isInArrears
                }),
                ...(value.ownerId && {
                    ownerId: value.ownerId
                })
            });
            setApartmentSelected( prev => ({
                ...prev,
                ownerName: response.payload.ownerName
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
        //Falta back me devulva el id del usuario propietario
        openModal({
            main: <AssignUser
                close={modal.close}
                userSelected={null}
                setApartment={handlerSetApartment} />,
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
                    title='Cambiar propietario/a'
                    type="primary"
                    className='addBtn'
                    shape="circle"
                    onClick={openAssignUser}
                    icon={<EditOutlined />}
                />
                {apartmentSelected?.ownerName}
            </Row>
            <Row $gap={10} style={{ marginTop: '20px' }}>
                <Switch
                    checked={!apartmentSelected.isInArrears}
                    checkedChildren="Al dia"
                    unCheckedChildren="En Mora"
                    onChange={value => handlerSetApartment({ isInArrears: !value })}
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
            <div style={{ marginTop: "40px" }}>
                <ListTenants
                    tenants={apartmentSelected.tenant_names}
                />
            </div>

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
