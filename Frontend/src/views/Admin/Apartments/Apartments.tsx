import React, { useState } from 'react'
import InputSelect from '../../../components/Form/InputSelect'
import { Formik } from 'formik'
import { IApartment, IOptionSelector } from '../../../types/common';
import { Button, List } from 'antd';
import Row from '../../../components/Grid/Row';
import Form from '../../../components/Form/Form';
import { submitTrap } from '../../../helpers/formHelpers';
import { Settings } from 'lucide-react';
import { Pagination } from '../../../components/Pagination';
import { IPagination } from '../../../components/Pagination/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { PHManagerState } from '../../../store';
import apartmentsFilter from '../../../services/apartmentsFilter';

export interface IFormValues {
    building: string;
    isInArrears: string;
}
const initialValues: IFormValues = {
    building: '',
    isInArrears: ''
}

interface Props {
    buildingsSelector: IOptionSelector[]
}
const ApartmentsView: React.FC<Props> = ({
    buildingsSelector
}) => {
    const navigate = useNavigate();
    const [apartments, setApartments] = useState<IApartment[]>([]);
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        pageSize: 0,
        pages: 0,
        total: 0
    });
    const [params] = useSearchParams();

    const navigateAdminApartment = (id: string, building: string, numberApartment: string) => {
        navigate(`/admin/apartment/${id}`, { state: { building, apto: numberApartment, id } });
    };

    const getApartments = async (currentPage: number, data: IFormValues) => {
        try {
            setApartments([]);
            const response = await apartmentsFilter({
                pagination: {
                    page: currentPage,
                    size: 50
                },
                filters: {
                    isInArrears: data.isInArrears === 'true' ? true : data.isInArrears === 'false' ? false : undefined,
                    buildingId: data.building || undefined
                }
            });
            setPagination({
                currentPage: response.payload.page,
                pages: response.payload.pages,
                pageSize: response.payload.size,
                total: response.payload.total
            });
            
            const items = response.payload.items.sort((a: any, b: any) => a.number.localeCompare(b.number, undefined, { numeric: true }));
            setApartments(items);
        } catch (error) {
            console.error('Error buscando apartamentos:', error);
        }
    }

    return (
        <div style={{ padding: '15px' }}>
            <Formik
                initialValues={{
                    ...initialValues,
                    building: params.get('buildingId') || initialValues.building,
                }}
                onSubmit={submitTrap(async (values, form, setFormError) => {
                    try {
                        await getApartments(pagination.currentPage, values);
                    } catch (error) {
                        setFormError('Error al buscar apartamentos, intente nuevamente');
                    }
                })}
            >
                {
                    ({ values }) => (
                        <>
                            <Form autoComplete='off'>
                                <Row $gap={5} >
                                    <InputSelect
                                        placeholder='Seleccione torre'
                                        name='building'
                                        options={buildingsSelector}
                                    />
                                    <InputSelect
                                        placeholder='Estado de cuenta'
                                        name='isInArrears'
                                        options={[{
                                            value: false,
                                            label: 'Al dia'
                                        }, {
                                            value: true,
                                            label: 'En Mora'
                                        }]}
                                    />
                                    <Button
                                        type='primary'
                                        className='btn'
                                        htmlType='submit'
                                        style={{ height: '37px' }}
                                    >
                                        Buscar
                                    </Button>
                                </Row>
                            </Form>
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
                                            onClick={() => navigateAdminApartment(item.id, item.buildingId, item.number)}
                                        >
                                            <Settings color='#1f2937' />
                                        </Button>

                                    </List.Item>
                                )}
                            />
                            {pagination.total > 0 && pagination.pages > 1 && (
                                <Row $justifyContent='center' style={{ marginTop: '5px', padding: '10px' }}>
                                    <Pagination
                                        currentPage={pagination.currentPage}
                                        pageSize={pagination.pageSize}
                                        pages={pagination.pages}
                                        total={pagination.total}
                                        onPageChange={async (page) => await getApartments(page, values)}
                                    />
                                </Row>
                            )}
                        </>
                    )
                }

            </Formik>

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
