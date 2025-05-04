import React from 'react'
import { IBuilding } from '../../../types/common'
import { List } from 'antd';
import { connect } from 'react-redux';
import { PHManagerState } from '../../../store';

interface Props {
    buildings: IBuilding[]
}
const BuildingsView: React.FC<Props> = ({
    buildings
}) => {
    return (
        <div style={{ padding: '15px' }}>
            <List
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
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

export default connect(
    (state: PHManagerState) => ({
        buildings: state.buildings,
    })
)(BuildingsView);
