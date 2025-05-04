import React from 'react'
import { Pagination as AntdPagination, PaginationProps } from 'antd';


export interface IPagination {
    currentPage: number; //current page
    pageSize: number;//size
    pages: number    //total pages
    total: number;   //total items
}

interface IPaginationProps extends IPagination {
    onPageChange: (page: number, pageSize: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
    onPageChange,
    ...pagination
}) => {

    const showTotal: PaginationProps['showTotal'] = (total) => `${total} Registros`;

    const handlePageChange = (page: number, pageSize: number) => {
        onPageChange(page, pageSize);
    }

    return (
        <AntdPagination
            total={pagination.total}
            pageSize={pagination.pageSize}
            defaultCurrent={pagination.currentPage}
            onChange={handlePageChange}
            size='small'
            showTotal={(total) => `Total ${total} registros`}
        //showTotal={showTotal}
        />

    )
}
