import { Formik } from 'formik'
import React, { useEffect } from 'react'
import { vehiclePost as vehiclePostService, Params } from '../../../services/vehiclePost'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import InputGroup from '../../../components/Form/InputGroup'
import Form from '../../../components/Form/Form'
import { Button } from 'antd'
import ValidationSchema from './ValidationSchema'
import InputSelect from '../../../components/Form/InputSelect'
import FormGroup from '../../../components/Form/FormGroup'
import Label from '../../../components/Form/Label'
import { vehicleTypes } from '../../../types/common'
import useService from '../../../hooks/useService'
import { Alert } from '../../../components/UI/Alert'
import Row from '../../../components/Grid/Row'
import * as Styled from './styles'

const initialValues: Params = {
    vehicleType: '',
    brand: '',
    model: '',
    color: '',
    plate: '',
    apartmentId: ''
}

const options = vehicleTypes.map((item: string) => ({ label: item, value: item }))

export const CreateVehicle = () => {
    const [vehiclePostStatus, vehiclePost] = useService(vehiclePostService);
    const { apartmentId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (vehiclePostStatus.status === 'loaded') {
            navigate(`/admin/apartment/${apartmentId}`);
        }
    });

    const handleCancel = () => {
        navigate(`/admin/apartment/${apartmentId}`)
    }

    return (
        <Styled.Container>
            <Row $justifyContent='center' className='title'>
                Torre XX APTO XXXX
            </Row>
            <Formik
                validationSchema={ValidationSchema}
                initialValues={{ ...initialValues, apartmentId: apartmentId || '' }}
                onSubmit={async values => {
                    try {
                        await vehiclePost(values);
                    } catch (error) { }
                }}
            >
                <Form className='form'>

                    <FormGroup>
                        <Label>Tipo de vehiculo*</Label>
                        <InputSelect name='vehicleType' placeholder='Seleccione' options={options} />
                    </FormGroup>
                    <InputGroup name='plate' label='Placa*' placeholder='Ingrese' />
                    <InputGroup name='brand' label='Marca' placeholder='Ingrese' />
                    <InputGroup name='model' label='Modelo' placeholder='Ingrese' />
                    <InputGroup name='color' label='Color' placeholder='Ingrese' />
                    <Row $gap={5} $justifyContent='right'>
                        <Button
                            htmlType="submit"
                            className="btn"
                            type="primary"
                            loading={vehiclePostStatus.status === 'loading'}
                        >
                            Guardar
                        </Button>
                        <Button
                            className="btn"
                            type="primary"
                            danger
                            loading={vehiclePostStatus.status === 'loading'}
                            onClick={handleCancel}
                        >
                            Cancelar
                        </Button>
                    </Row>
                    {vehiclePostStatus.status === 'error' && <Alert message={vehiclePostStatus.payload.detail} type='error' />}
                </Form>
            </Formik>
        </Styled.Container>
    )
}
