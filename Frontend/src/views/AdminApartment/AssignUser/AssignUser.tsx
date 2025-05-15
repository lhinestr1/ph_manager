import React, { useCallback, useEffect, useState } from 'react'
import InputSelect from '../../../components/Form/InputSelect'
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

interface Props {
    close: () => void,
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
    close
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
                ({ setFieldValue }) => (
                    <Form style={{ height: '250px' }}>
                        <FormGroup>
                            <Label>Seleccione el propietario</Label>
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
                        <Row $justifyContent='right'>
                            <Button htmlType='submit' type='primary' className='btn btn-primary'>Asignar</Button>
                        </Row>
                    </Form>
                )
            }

        </Formik>
    )
}
