import { Formik } from 'formik'
import React from 'react'
import { IUser, roles } from '../../../types/common'
import InputGroup from '../../../components/Form/InputGroup'
import Row from '../../../components/Grid/Row'
import { Button } from 'antd'
import Form from '../../../components/Form/Form'
import ValidationSchema from './ValidationSchema'
import InputSelect from '../../../components/Form/InputSelect'
import FormGroup from '../../../components/Form/FormGroup'
import Label from '../../../components/Form/Label'
import { ApartmentSelector } from '../../../components/ApartmentSelector'
import { ParamsUserPost } from '../../../services/usersPost'

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
    apartmentId?: string,
    loading: boolean,
    cancel: () => void;
    userPost: (params: ParamsUserPost) => Promise<void>;
}

export const CreateUser: React.FC<Props> = ({
    apartmentId,
    loading,
    cancel,
    userPost
}) => {

    const rolesOptions = roles.map((item) => ({
        label: item,
        value: item
    }))

    return (
        <Formik
            validationSchema={ValidationSchema}
            initialValues={{
                ...initialValues,
                buildingSelector: '',
                apartmentSelector: ''
            }}
            onSubmit={async (values) => {
                try {
                    await userPost({
                        ...values,
                        documentNumber: values.documentNumber.toString(),
                        apartmentId: values.apartmentSelector,
                    });
                } catch (error) {
                    console.error(error)
                }
            }}
        >
            {({
                values: { role }
            }) =>
                <Form style={{ width: '250px' }} autoComplete='off'>
                    <InputGroup name='firstName' label='Nombres' autoFocus />
                    <InputGroup name='lastName' label='Apellidos' />
                    <InputGroup name='documentNumber' type='number' label='Documento de identidad' />
                    <InputGroup name='mainPhoneNumber' label='Celular' />
                    <InputGroup name='email' label='Correo electronico' />
                    <FormGroup>
                        <Label htmlFor='role'>Rol</Label>
                        <InputSelect name='role' options={rolesOptions} />
                    </FormGroup>
                    {(role === 'Propietario' || role === 'Inquilino') && (
                        <FormGroup>
                            <ApartmentSelector />
                        </FormGroup>
                    )}
                    <Row $gap={5} $justifyContent='right'>
                        <Button
                            className="btn"
                            type="primary"
                            danger
                            loading={loading}
                            onClick={cancel}
                        >
                            Cancelar
                        </Button>
                        <Button
                            htmlType="submit"
                            className="btn"
                            type="primary"
                            loading={loading}
                        >
                            Guardar
                        </Button>
                    </Row>
                </Form>
            }

        </Formik>
    )
}
