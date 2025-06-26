import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .input-search {
        font-size: 45px;
        height: 60px;
        text-align: center;
    }
    .ico {
        top: 10px;
        > svg {
            height: 40px;
            width: 40px;
        }
    }
        .btn{
            height: 60px;
            font-size: 20px;
        }
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