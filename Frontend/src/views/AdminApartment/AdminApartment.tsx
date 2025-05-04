import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import Row from '../../components/Grid/Row';
import apartmentVehicleGet from '../../services/apartmentVehicleGet';
import { connect } from 'react-redux';
import { PHManagerState } from '../../store';
import { IBuilding } from '../../types/common';

const Container = styled.div`
    padding: 10px;

    .title {
        font-size: 28px;
    }
`;

interface Props {
    buildings: IBuilding[]
}

const AdminApartment: React.FC<Props> = ({
    buildings
}) => {

    const { state } = useLocation();

    useEffect(() => {
        (async () => {
            await apartmentVehicleGet({
                apartment_number: state.apto
            })
        })()
    }, []);

    const getNameBuilding = (id: string) => buildings.filter(item => item.id === id)[0].name;


    return (
        <Container>
            <Row $center className='title'>{`${getNameBuilding(state.building)} Apto ${state.apto}`}</Row>
        </Container>
    )
}

export default connect(
    (state: PHManagerState) => ({
        buildings: state.buildings,
    })
)(AdminApartment)
