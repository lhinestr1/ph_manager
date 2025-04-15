import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { Provider } from 'react-redux';
import store from "./store";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={"/"}>
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}
