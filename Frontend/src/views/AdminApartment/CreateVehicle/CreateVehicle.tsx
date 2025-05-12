import { Formik } from 'formik'
import React from 'react'
import { Params } from '../../../services/vehiclePost'
import InputGroup from '../../../components/Form/InputGroup'
import Form from '../../../components/Form/Form'
import { Button } from 'antd'
import ValidationSchema from './ValidationSchema'
import InputSelect from '../../../components/Form/InputSelect'
import FormGroup from '../../../components/Form/FormGroup'
import Label from '../../../components/Form/Label'
import {vehicleTypes } from '../../../types/common'
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

interface Props {
    apartmentId: string;
    vehiclePost: (params: Params ) => Promise<void>;
    cancel?: () => void;
    loading?: boolean;
}

export const CreateVehicle: React.FC<Props> = ({
    apartmentId,
    vehiclePost,
    loading,
    cancel
}) => {

    return (
        <Styled.Container>
            <Formik
                validationSchema={ValidationSchema}
                initialValues={{ ...initialValues, apartmentId: apartmentId}}
                onSubmit={async values => {
                    try {
                        await vehiclePost(values);
                    } catch (error) {}
                }}
            >
                <Form className='form' autoComplete='off'>
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
                            loading={loading}
                        >
                            Guardar
                        </Button>
                        {
                            cancel && (
                                <Button
                                    className="btn"
                                    type="primary"
                                    danger
                                    loading={loading}
                                    onClick={cancel}
                                >
                                    Cancelar
                                </Button>
                            )
                        }
                    </Row>
                </Form>
            </Formik>
        </Styled.Container>
    )
}
