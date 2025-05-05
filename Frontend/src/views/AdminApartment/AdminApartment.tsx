import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Row from '../../components/Grid/Row';
import apartmentVehicleGet from '../../services/apartmentVehicleGet';
import { connect } from 'react-redux';
import { PHManagerState } from '../../store';
import { IBuilding, IVehicle } from '../../types/common';
import { ListVehicles } from './ListVehicles';
import useService from '../../hooks/useService';
import { vehicleDelete as vehicleDeleteService } from '../../services/vehicleDelete';
import { Alert } from '../../components/UI/Alert';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const Container = styled.div`
    .title {
        font-size: 28px;
    }
    .nameApto {
        margin-left: 20px;
    }
`;

interface Props {
    buildings: IBuilding[]
}

const AdminApartment: React.FC<Props> = ({
    buildings
}) => {

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [vehicleDeleteStatus, vehicleDelete] = useService(vehicleDeleteService);
    const { apartmentId = '' } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { payload } = await apartmentVehicleGet({
                    apartment_id: apartmentId
                });
                setVehicles(payload);
            } catch (error) {

            }
        })()
    }, []);

    const getNameBuilding = (id: string) =>
        buildings.filter(item => item.id === id)[0].name || '';

    const toBack = () => {
        console.log('toBack');
        navigate("/admin", { replace: true })
    }


    return (
        <Container>
            <Row $justifyContent='center' className='title'>
                <Button onClick={toBack} variant='link' shape="round" icon={<ArrowLeftOutlined />} />
                <span className='nameApto'>Torre XX APTO XXXX</span>
            </Row>
            <ListVehicles
                idApartment={apartmentId}
                vehicles={vehicles}
                deleteVehicle={async (id: string) => {
                    await vehicleDelete({ vehicle_id: id })
                }}
                loading={vehicleDeleteStatus.status === 'loading'} />
            {vehicleDeleteStatus.status === 'error' &&
                <Alert message={vehicleDeleteStatus.payload.detail} type="error" showIcon />}
        </Container>
    )
}

export default connect(
    (state: PHManagerState) => ({
        buildings: state.buildings,
    })
)(AdminApartment)
