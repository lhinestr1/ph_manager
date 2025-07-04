import React, { useEffect, useState } from 'react'
import { IUser } from '../../../types/common';
import { IPagination, Pagination } from '../../../components/Pagination/Pagination';
import usersGet from '../../../services/usersGet';
import Row from '../../../components/Grid/Row';
import styled from 'styled-components';
import { UserCard } from '../../../components/UserCard';
import { ModalC, useModalC } from '../../../components/UI/Modal';
import { CreateUser } from '../../AdminApartment/CreateUser';
import { useServiceStatus } from '../../../hooks/useServiceStatus';
import ApiError from '../../../types/ApiError';
import { ParamsUserPost, usersPost } from '../../../services/usersPost';
import { Button } from 'antd';
import { Alert } from '../../../components/UI/Alert';

const ListUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 10px;
`;
const Container = styled.div`
`;


export const Users = () => {

    const [modal, openModal] = useModalC();
    const [users, setUsers] = useState<IUser[]>([]);
    const [serviceStatus, setServiceStatus] = useServiceStatus({
        status: 'init'
    });
    const [pagination, setPagination] = useState<IPagination>({
        currentPage: 1,
        pageSize: 0,
        pages: 0,
        total: 0
    });

    const getUsers = async (currentPage: number) => {
        try {
            const { payload: { items, ...paginationServer } } = await usersGet({
                page: currentPage,
                size: 50,
                search: ''
            });
            setPagination({
                currentPage: paginationServer.page,
                pages: paginationServer.pages,
                pageSize: paginationServer.size,
                total: paginationServer.total
            });
            setUsers(items);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    }



    const openCreateUser = async () => {
        openModal({
            main: <CreateUser
                close={modal.close}
                />,
            noClosable: true
        });
    }

    useEffect(() => {
        (async () => getUsers(pagination.currentPage))()
    }, [])


    return (
        <Container>
            <ModalC props={modal} />
            <Row $justifyContent='right'>
                <Button type='primary' className="btn" onClick={openCreateUser}>Nuevo</Button>
            </Row>
            <ListUsers style={{ maxHeight: 'calc(100vh - 230px)', overflowY: 'auto' }}>
                {users.map((user, index) => (
                    <UserCard key={index} user={user} delay={index * 5} />
                ))}
            </ListUsers>
            {pagination.total > 0 && (
                <Row $justifyContent='center' style={{ marginTop: '5px', padding: '10px' }}>
                    <Pagination
                        currentPage={pagination.currentPage}
                        pageSize={pagination.pageSize}
                        pages={pagination.pages}
                        total={pagination.total}
                        onPageChange={async (page) => await getUsers(page)}
                    />
                </Row>
            )}
            {serviceStatus.status === 'error' &&
                            <Alert message={serviceStatus.error.response.detail} type="error" showIcon />}
        </Container>
    )
}
