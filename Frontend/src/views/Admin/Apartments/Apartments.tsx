import React, { useEffect, useState } from 'react'
import InputSelect from '../../../components/Form/InputSelect'
import { Formik } from 'formik'
import { IApartment, IBuilding, IOptionSelector } from '../../../types/common';
import buildingGet, { Response } from '../../../services/buildingGet';
import FormChange from '../../../components/Form/FormChange';
import apartmentsGet from '../../../services/apartmentsGet';
import { Button, List } from 'antd';
import InputGroup from '../../../components/Form/InputGroup';
import Row from '../../../components/Grid/Row';
import ValidationSchema from './ValidationSchema';
import { apartmentsPost } from '../../../services/apartmentPost';
import Form from '../../../components/Form/Form';
import { submitTrap } from '../../../helpers/formHelpers';
import { B } from 'ts-toolbelt';
import { Settings, SlidersHorizontal } from 'lucide-react';

export interface IFormValues {
    building: string;
    apto: string;
}
const initialValues: IFormValues = {
    building: '',
    apto: ''
}

export const Apartments = () => {
    const [apartments, setApartments] = useState<IApartment[]>([]);
    const [buildingOptions, setBuildingOptions] = useState<IOptionSelector[]>([]);
    const [buildingSelected, setBuildingSelected] = useState<string | null>(null);

    const getApartments = async () => {
        try {
            setApartments([]);
            if (!buildingSelected) return;
            const { payload } = await apartmentsGet({ building_id: buildingSelected });
            payload.sort((a: IApartment, b: IApartment) => {
                return a.number.localeCompare(b.number, undefined, { numeric: true });
            });
            setApartments(payload);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    }

    useEffect(() => {
        (async () => {
            await getApartments();
        })()
    }, [buildingSelected])


    useEffect(() => {
        (async () => {
            const { payload } = await buildingGet();
            payload.sort((a: IBuilding, b: IBuilding) => {
                return a.name.localeCompare(b.name, undefined, { numeric: true });
            });
            setBuildingOptions(payload.map((building: Response) => ({
                label: building.name,
                value: building.id,
            })));
        })()
    }, [])

    return (
        <div style={{ padding: '15px' }}>
            <Formik
                initialValues={initialValues}
                onSubmit={submitTrap(async (values, form, setFormError) => {
                    try {
                        await apartmentsPost({
                            number: values.apto,
                            building_id: values.building
                        });
                        form.setFieldValue('apto', '');
                        form.setFieldTouched('apto', false);
                        await getApartments();
                    } catch (error) {
                        setFormError('error to create apartment');
                    }
                })}
                validationSchema={ValidationSchema}
            >
                <Form autoComplete='off'>
                    <FormChange onChange={({ building }) => setBuildingSelected(building)} />
                    <Row gap={5} >
                        <InputSelect
                            placeholder='Seleccione...'
                            name='building'
                            options={buildingOptions} />
                        <InputGroup name='apto' placeholder='Número de apto' />
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{ marginLeft: '10px', height: '37px', backgroundColor: "#1f2937" }}
                        >
                            Guardar
                        </Button>
                    </Row>
                </Form>
            </Formik>
            <List
                style={{ maxHeight: '72vh', overflowY: 'auto' }}
                dataSource={apartments}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            description={`Apto ${item.number}`}
                        //description={`Apto ${item.number}`} 
                        />
                        <Button
                            title='Eliminar'
                            type='link'
                        ><SlidersHorizontal /></Button>
                    </List.Item>
                )}
            />
        </div>

    )
}
