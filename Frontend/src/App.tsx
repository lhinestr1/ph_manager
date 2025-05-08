import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { Provider } from 'react-redux';
import store from "./store";
import Header from "./components/Header/Header";
import styled from "styled-components";
import { ConfigProvider } from 'antd';

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  > div {
    max-width: 100%;
    max-width: 500px;
    flex-grow: 1; 
    padding: 10px;
  }
`;

export default function App() {
  return (
    <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1f2937',
            },
          }}
        >
          <BrowserRouter basename={"/"}>
            <Main>
              <Header />
              <Content>
                <Routes />
              </Content>
            </Main>
          </BrowserRouter>
        </ConfigProvider>

    </Provider>
  );
}
