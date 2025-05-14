import React, { useEffect, useState } from 'react'
import Row from '../Grid/Row'
import InputSelect from '../Form/InputSelect'
import buildingGet from '../../services/buildingGet'
import { IApartment, IBuilding } from '../../types/common'
import apartmentsGet from '../../services/apartmentsGet'

export const ApartmentSelector: React.FC = () => {

  const [buildingSelector, setBuildingSelector] = useState([]);
  const [apartmentSelector, setApartmentSelector] = useState([]);

  //BUGS SE DEBE OBTENER DEL REDUCER
  const getBuildings = async () => {
    try {
      const response = await buildingGet();
      response.payload.items.sort((a: IBuilding, b: IBuilding) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      const items = response.payload.items.map((item: IBuilding) => ({
        label: item.name,
        value: item.id
      }));
      setBuildingSelector(items);
    } catch (error) { }
  }

  //get apartments
  const getApartments = async (building_id: string) => {
    try {
      const response = await apartmentsGet({ building_id })({
        page: 1,
        size: 50
      });
      const items = response.payload.items.map((item: IApartment) => ({
        label: item.number,
        value: item.id
      }));
      setApartmentSelector(items);
    } catch (error) { }
  }

  useEffect(() => {
    (async () => await getBuildings())()
  }, [])

  return (
    <Row $gap={10}>
      <InputSelect placeholder='Torre' name='buildingSelector' options={buildingSelector} onChange={getApartments} />
      <InputSelect placeholder='Apartamento' name='apartmentSelector' options={apartmentSelector} />
    </Row>
  )
}
