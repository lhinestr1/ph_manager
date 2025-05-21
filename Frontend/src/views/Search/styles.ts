import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    line-height: 20px;
    > .label {
        font-size: 18px; 
    }
`;