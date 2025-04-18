import React, { useEffect, useState } from 'react'
import buildingGet from '../../../services/buildingGet'
import { IBuilding } from '../../../types/common'
import { Button, List } from 'antd';
import { Formik } from 'formik';
import InputGroup from '../../../components/Form/InputGroup';
import Row from '../../../components/Grid/Row';
import Form from '../../../components/Form/Form';
import useService from '../../../hooks/useService';
import { buildingsPost } from '../../../services/buildingPost';
import { submitTrap } from '../../../helpers/formHelpers';
import FormError from '../../../components/Form/FormError';
import ValidationSchema from './ValidationSchema';

export interface IFormValues {
    name: string;
    description: string;
}

const initialValues: IFormValues = {
    name: '',
    description: ''
}

export const Buildings = () => {

    const [buildings, setBuildings] = useState<IBuilding[]>([]);
    const [building, postBuilding] = useService(buildingsPost);

    const getBuildings = async () => {
        try {
            const { payload } = await buildingGet();
            payload.sort((a: IBuilding, b: IBuilding) => {
                return a.name.localeCompare(b.name, undefined, { numeric: true });
            });
            setBuildings(payload);
        } catch (error) {
            console.error('Error fetching buildings:', error);
        }
    }

    useEffect(() => {
        (async () => {
            await getBuildings();
        })()
    }, []);




    return (
        <div style={{ padding: '15px' }}>
            <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={submitTrap(async (values, form, setFormError) => {
                    try {
                        await postBuilding(values);
                        form.resetForm();
                        await getBuildings();
                    } catch (error) {
                        setFormError('Error al crear la torre');
                    }
                })}
            >
                <Form autoComplete='off'>
                    <Row $fluid $center >
                        <InputGroup name='name' placeholder='Nombre de la torre' />
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={building.status === 'loading'}
                            style={{ marginLeft: '10px', height: '37px', backgroundColor: "#1f2937" }}
                            onClick={() => { }}
                        >
                            Guardar
                        </Button>
                    </Row>
                    <FormError />
                </Form>
            </Formik>
            <List
                style={{ maxHeight: '72vh', overflowY: 'auto' }}
                dataSource={buildings}
                renderItem={(item) => (
                    <List.Item>
                        {item.name}
                    </List.Item>
                )}
            />
        </div>
    )
}
