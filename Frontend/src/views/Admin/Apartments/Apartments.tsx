import React, { useEffect, useState } from 'react'
import InputSelect from '../../../components/Form/InputSelect'
import { Formik } from 'formik'
import { IApartment, IOptionSelector } from '../../../types/common';
import apartmentsGet from '../../../services/apartmentsGet';
import { Button, List } from 'antd';
import Row from '../../../components/Grid/Row';
import ValidationSchema from './ValidationSchema';
import { apartmentsPost } from '../../../services/apartmentPost';
import Form from '../../../components/Form/Form';
import { submitTrap } from '../../../helpers/formHelpers';
import { Settings } from 'lucide-react';
import { Pagination } from '../../../components/Pagination';
import { IPagination } from '../../../components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PHManagerState } from '../../../store';

export interface IFormValues {
    building: string;
    apto: string;
}
const initialValues: IFormValues = {
    building: '',
    apto: ''
}

interface Props {
    buildingsSelector: IOptionSelector[]
}
const ApartmentsView: React.FC<Props> = ({
    buildingsSelector
}) => {
    const navigate = useNavigate();
    const [apartments, setApartments] = useState<IApartment[]>([]);
    const [buildingSelected, setBuildingSelected] = useState<string | null>(null);
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        pageSize: 0,
        pages: 0,
        total: 0
    });
    const [params] = useSearchParams();

    const navigateAdminApartment = (id: string, numberApartment: string) => {
        navigate(`/admin/apartment/${id}`, { state: { building: buildingSelected, apto: numberApartment, id } });
    };

    const handlerSetBuildingSelected = (value: string | null) => {
        setBuildingSelected(value);
    }

    const getApartments = async (currentPage: number) => {
        try {
            setApartments([]);
            if (!buildingSelected) return;
            const { payload: { items, ...paginationServer } } = await apartmentsGet({ building_id: buildingSelected })({
                page: currentPage,
                size: 50
            });
            setPagination({
                currentPage: paginationServer.page,
                pages: paginationServer.pages,
                pageSize: paginationServer.size,
                total: paginationServer.total
            });
            setApartments(items);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    }

    useEffect(() => {
        (async () => {
            await getApartments(1);
        })()
    }, [buildingSelected]);

    useEffect(() => {
        const buildingPreselected = params.get('buildingId') as string || null;
        if(buildingPreselected){
            setBuildingSelected(buildingPreselected);
        }
    }, []);

    return (
        <div style={{ padding: '15px' }}>
            <Formik
                initialValues={{
                    ...initialValues,
                    building: params.get('buildingId') || initialValues.building,
                }}
                onSubmit={submitTrap(async (values, form, setFormError) => {
                    try {
                        await apartmentsPost({
                            number: values.apto,
                            building_id: values.building
                        });
                        form.setFieldValue('apto', '');
                        form.setFieldTouched('apto', false);
                        await getApartments(pagination.currentPage);
                    } catch (error) {
                        setFormError('error to create apartment');
                    }
                })}
                validationSchema={ValidationSchema}
            >
                <Form autoComplete='off'>
                    <Row $gap={5} >
                        <InputSelect
                            placeholder='Seleccione torre'
                            name='building'
                            options={buildingsSelector}
                            onChange={(value: string) => handlerSetBuildingSelected(value)}
                        />

                        {/*<InputGroup name='apto' placeholder='Número de apto' />
                        <Button
                            type='primary'
                            htmlType='submit'
                            style={{ marginLeft: '10px', height: '37px', backgroundColor: "#1f2937" }}
                        >
                            Guardar
                        </Button>*/}
                    </Row>
                </Form>
            </Formik>
            <List
                style={{ maxHeight: 'calc(100vh - 270px)', overflowY: 'auto', marginTop: '20px' }}
                dataSource={apartments}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            description={`Apto ${item.number}`}
                        />
                        <Button
                            title='Editar'
                            type='link'
                            onClick={() => navigateAdminApartment(item.id, item.number)}
                        >
                            <Settings color='#1f2937' />
                        </Button>

                    </List.Item>
                )}
            />
            {pagination.total > 0 && (
                <Row $justifyContent='center' style={{ marginTop: '5px', padding: '10px' }}>
                    <Pagination
                        currentPage={pagination.currentPage}
                        pageSize={pagination.pageSize}
                        pages={pagination.pages}
                        total={pagination.total}
                        onPageChange={async (page) => await getApartments(page)}
                    />
                </Row>
            )}
        </div>

    )
}

export default connect(
    (state: PHManagerState) => ({
        buildingsSelector: state.buildings.map(item => ({
            label: item.name,
            value: item.id
        }))
    })
)(ApartmentsView)
