import { Formik } from 'formik'
import React from 'react'
import { roles, rolesType } from '../../../types/common'
import InputGroup from '../../../components/Form/InputGroup'
import Row from '../../../components/Grid/Row'
import { Button } from 'antd'
import Form from '../../../components/Form/Form'
import ValidationSchema from './ValidationSchema'
import InputSelect from '../../../components/Form/InputSelect'
import FormGroup from '../../../components/Form/FormGroup'
import Label from '../../../components/Form/Label'
import { ApartmentSelector } from '../../../components/ApartmentSelector'
import { ParamsUserPost, usersPost } from '../../../services/usersPost'
import useService from '../../../hooks/useService'
import { Alert } from '../../../components/UI/Alert'

const initialValues: ParamsUserPost = {
    firstName: '',
    lastName: '',
    documentNumber: '',
    mainPhoneNumber: '',
    secondaryPhoneNumber: '',
    email: '',
    role: '',
    confirmPassword: '',
    password: ''
}

interface Props {
    close?: () => void;
    buildingId?: string;
    apartmentId?: string,
    roleSelected?: rolesType;
}

const rolesOptions = roles.map((item) => ({
    label: item,
    value: item
}));

export const CreateUser: React.FC<Props> = ({
    close,
    apartmentId = '',
    buildingId = '',
    roleSelected = ''
}) => {

    const [userPostStatus, userPost] = useService(usersPost);

    if (userPostStatus.status === 'loaded' && close) {
        // If the user was created successfully, close the modal
        close();
    }

    return (
        <Formik
            validationSchema={ValidationSchema}
            initialValues={{
                ...initialValues,
                buildingSelector: buildingId,
                apartmentSelector: apartmentId,
                role: roleSelected || '',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) =>
                userPost({
                    ...values,
                    documentNumber: values.documentNumber.toString(),
                    apartmentId: values.apartmentSelector,
                })

            }
        >
            {({
                values: { role },
            }) =>
                <Form style={{ width: '250px' }} autoComplete='off'>
                    <InputGroup name='firstName' label='Nombres' autoFocus />
                    <InputGroup name='lastName' label='Apellidos' />
                    <InputGroup name='documentNumber' type='number' label='Documento de identidad' />
                    <InputGroup name='mainPhoneNumber' label='Celular' />
                    <InputGroup name='email' label='Correo electronico' />
                    <FormGroup>
                        <Label htmlFor='role'>Rol</Label>
                        <InputSelect name='role' options={rolesOptions} disabled={!!roleSelected}/>
                    </FormGroup>
                    {(role === 'Propietario' || role === 'Inquilino') && (
                        <FormGroup>
                            <ApartmentSelector disabled={!!roleSelected}  />
                        </FormGroup>
                    )}
                    <Row $gap={5} $justifyContent='right'>
                        {close && (
                            <Button
                                type="default"
                                danger
                                loading={userPostStatus.status === 'loading'}
                                onClick={close}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            htmlType="submit"
                            className="btn"
                            type="primary"
                            loading={userPostStatus.status === 'loading'}
                        >
                            Guardar
                        </Button>
                    </Row>
                    {userPostStatus.status === 'error' &&
                        <Alert message={userPostStatus.error.response.detail} type="error" showIcon />}
                </Form>
            }

        </Formik>
    )
}
