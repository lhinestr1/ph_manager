import React from 'react'
import * as Styled from './styles'
import Row from '../../../components/Grid/Row'
import Column from '../../../components/Grid/Column'

interface Props {
    tenants: string[]
}

export const ListTenants: React.FC<Props> = ({
    tenants
}) => {
    return (
        <div>
            <Styled.Title>Lista de inquilinos:</Styled.Title>
            <Styled.ContainerList>
            {tenants.length === 0 ?
                    <div>No hay inquilinos registrados</div> :
                    tenants.map((item, index) => (
                        <Styled.Item>
                            <Row key={index} $justifyContent='space-between' >
                                <Column>
                                    <div>{item}</div>
                                </Column>
                            </Row>
                        </Styled.Item>
                    ))
                }
            </Styled.ContainerList>
        </div>
    )
}
