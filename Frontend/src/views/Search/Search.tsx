import { Formik } from 'formik';
import React, { useState } from 'react'
import Form from '../../components/Form/Form';
import InputGroup from '../../components/Form/InputGroup';
import validationSchema from './ValidationSchema';
import * as Styled from './styles'
import { submitTrap } from '../../helpers/formHelpers';
import vehicleGet, { Response } from '../../services/vehiclePlateGet';
import { Button, Empty } from "antd";
import ApiError from '../../types/ApiError';
import FormError from '../../components/Form/FormError';
import { SearchDetail } from './SearchDetail';

export interface FormValues {
  search: string
}

const initialValues: FormValues = {
  search: ''
}

export const Search = () => {

  const [loading, setloading] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<Response | null>(null);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitTrap(async (values, _, setFormError) => {
          try {
            setloading(true);
            setVehicle(null);
            const response = await vehicleGet({ plate: values.search.toUpperCase() });
            setVehicle(response.payload);
          } catch (error) {
            if (error instanceof ApiError) {
              setFormError(error.payload.detail);
            }
          } finally {
            setloading(false);
          }
        })}
      >
        <Form autoComplete='off'>
          <Styled.Container>
            <InputGroup name="search" placeholder="Ingrese la placa del vehículo (ej. ENM535)" autoFocus />
            <Button loading={loading} htmlType='submit' className='btn' type='primary' style={{ backgroundColor: "#1f2937" }}>Buscar</Button>
            <FormError />
          </Styled.Container>
        </Form>
      </Formik>
      <div style={{ marginTop: 40, padding: 10 }}>
        {vehicle ? <SearchDetail data={vehicle} /> : <Empty />}
      </div>
    </div>

  )
}
