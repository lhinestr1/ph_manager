import React, { useCallback, useEffect, useState } from 'react'
import { Formik } from 'formik'
import useService from '../../../hooks/useService';
import usersGet from '../../../services/usersGet';
import { ITypes, IUser } from '../../../types/common';
import Label from '../../../components/Form/Label';
import Form from '../../../components/Form/Form';
import Row from '../../../components/Grid/Row';
import { Button } from 'antd';
import FormGroup from '../../../components/Form/FormGroup';
import { SearchableSelect } from '../../../components/Form/SearchableSelect';
import Column from '../../../components/Grid/Column';

interface Props {
    close: () => void,
    openCreateUser?: () => void,
    setApartment: (value: { isInArrears?: boolean, ownerId?: string }) => Promise<void>,
    userSelected: {
        fullname: string,
        id: string
    } | null
}

const initialValues: Props["userSelected"] = {
    fullname: '',
    id: ''
}

export const AssignUser: React.FC<Props> = ({
    userSelected,
    setApartment,
    close,
    openCreateUser
}) => {
    const [_, getUsers] = useService(usersGet);

    const handlerGetUsers = useCallback(async (search: string, callback: (options: ITypes[]) => void) => {
        try {
            const { payload } = await getUsers({ page: 1, size: 100, search });
            callback(payload.items.map((user: IUser) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id
            })));
        } catch (error) {
            callback([])
        }
    }, []);



    return (
        <Formik
            initialValues={userSelected ?? initialValues}
            onSubmit={async (values) => {
                try {
                    await setApartment({ ownerId: values.id });
                    close();
                } catch (error) {
                    
                }
            }}>
            {
                ({ setFieldValue, values }) => (
                    <Form style={{ height: '250px' }}>
                        <Column $justifyContent='space-between' style={{ height: '100%' }}>
                            <FormGroup>
                            <Label>Escriba y seleccione el nuevo propietario</Label>
                            <SearchableSelect
                                onSelect={(value) => {
                                    setFieldValue('id', value.value);
                                    setFieldValue('fullname', value.label);
                                }}
                                onSearch={handlerGetUsers}
                                defaultValue={{
                                    label: userSelected?.fullname ?? '',
                                    value: userSelected?.id ?? ''
                                }}
                            />
                        </FormGroup>
                        <Row $justifyContent='right' $gap={10}>
                            <Button type='default' danger className='' onClick={close}>Cancelar</Button>
                            <Button type='default' className='' onClick={openCreateUser}>Crear</Button>
                            <Button htmlType='submit' type='primary' className='btn btn-primary' disabled={!values.id}>Asignar</Button>
                        </Row>
                        </Column>
                        
                    </Form>
                )
            }

        </Formik>
    )
}
