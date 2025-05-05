import styled from "styled-components";

export const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    .addBtn {
        background-color: #1f2937;
    }
`;

export const Item = styled.div`
    box-sizing: border-box;
    border: 1px solid #dee2e6;
    padding: 10px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`; 

export const ContainerList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
`;