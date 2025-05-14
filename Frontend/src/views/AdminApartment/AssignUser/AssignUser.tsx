import React, { useEffect, useState } from 'react'
import InputSelect from '../../../components/Form/InputSelect'
import { Formik } from 'formik'
import useService from '../../../hooks/useService';
import usersGet from '../../../services/usersGet';
import { IUser } from '../../../types/common';
import Label from '../../../components/Form/Label';
import Form from '../../../components/Form/Form';
import Row from '../../../components/Grid/Row';
import { Button } from 'antd';
import FormGroup from '../../../components/Form/FormGroup';

export const AssignUser = () => {
    const [users, setUsers] = useState([]);
    const [usersStatus, getUsers] = useService(usersGet);

    useEffect(() => {
        (async () => {
            const { payload } = await getUsers({ page: 1, size: 100 });
            setUsers(payload.items.map((user: IUser) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: user.id
            })));
        })();
    }, [])


    return (
        <Formik
            initialValues={{
                userSelected: ''
            }}
            onSubmit={async (values) => {
            }}>
            <Form>
                <FormGroup>
                    <Label>Seleccione el propietario</Label>
                    <InputSelect name='userSelected' options={users} />
                </FormGroup>
                <Row $justifyContent='right'>
                    <Button htmlType='submit' type='primary' className='btn btn-primary'>Asignar</Button>
                </Row>
            </Form>
        </Formik>
    )
}
