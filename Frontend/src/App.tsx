import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { Provider } from 'react-redux';
import store from "./store";
import Header from "./components/Header/Header";
import styled from "styled-components";

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 10px;
`;

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/"}>
        <Main>
          <Header />
          <Content>
            <Routes />
          </Content>
        </Main>
      </BrowserRouter>
    </Provider>
  );
}
