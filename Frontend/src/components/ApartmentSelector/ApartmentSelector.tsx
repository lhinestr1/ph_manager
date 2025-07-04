import React, { useState } from 'react'
import Row from '../Grid/Row'
import InputSelect from '../Form/InputSelect'
import { IApartment, IBuilding, IOptionSelector } from '../../types/common'
import apartmentsGet from '../../services/apartmentsGet'
import FormChange from '../Form/FormChange'
import { connect } from 'react-redux'
import { PHManagerState } from '../../store'

interface Props {
  buildings: IOptionSelector[],
  disabled?: boolean
}

const ApartmentSelector: React.FC<Props> = ({
  buildings = [],
  disabled = false
}) => {

  const [apartmentSelector, setApartmentSelector] = useState([])
  const [buildindSelected, setBuildindSelected] = useState<string>("");

  const getApartments = async (building_id: string) => {
    try {
      
      if (buildindSelected != building_id) {
        const response = await apartmentsGet({ building_id })({
          page: 1,
          size: 50
        });
        const items = response.payload.items.map((item: IApartment) => ({
          label: item.number,
          value: item.id
        }));
        setBuildindSelected(building_id);
        setApartmentSelector(items);
      }

    } catch (error) { }
  }

  return (
    <Row $gap={10}>
      <InputSelect placeholder='Torre' name='buildingSelector' options={buildings} disabled={disabled} />
      <InputSelect placeholder='Apartamento' name='apartmentSelector' options={apartmentSelector} disabled={disabled}/>
      <FormChange onChange={v => getApartments(v.buildingSelector)} />
    </Row>
  )
}

export default connect(
  (state: PHManagerState) => ({
    buildings: state.buildings.map((building: IBuilding) => ({
      label: building.name,
      value: building.id
    }))
  }),
)(ApartmentSelector);
