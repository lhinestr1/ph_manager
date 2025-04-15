import React, { useState } from "react";
import * as Styled from "./Login.styles";
import { Formik } from "formik";
import InputGroup from "../../../components/Form/InputGroup";
import Form from "../../../components/Form/Form";
import ValidationSchema from "./ValidationSchema";
import { connect } from "react-redux";
import { PHManagerState } from "../../../store";
import { loginRequest } from "../../../store/actions/session";
import { UserCredentials } from "../../../services/logInPost";
import { asyncDispatch } from "../../../store/asyncDispatch";
import { submitTrap } from "../../../helpers/formHelpers";
import FormError from "../../../components/Form/FormError";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface Props {
    loggedIn: boolean;
    login(payload: UserCredentials): Promise<void>;
}

const LoginView: React.FC<Props> = ({
    loggedIn,
    login
}) => {

    const [loading, setloading] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <Styled.Background>
            <Formik
                initialValues={{ email: "luishinestroza1992@gmail.com", password: "" }}
                onSubmit={submitTrap(async (values, _, setFormError) => {
                    try {
                        setloading(true);
                        await login(values);
                        navigate("/", { replace: true });
                    } catch (e) {
                        setFormError("Error de autenticación, verifique sus credenciales");
                    } finally {
                        setloading(false);
                    }
                })}
                validationSchema={ValidationSchema}
            >
                <Styled.StyledCard>
                    <Form autoComplete="off">
                        <Styled.Title>Iniciar Sesión</Styled.Title>
                        <InputGroup name="email" label="Correo electronico" placeholder="Ingrese correo electronico" />
                        <InputGroup name="password" type="password" label="Contraseña" placeholder="Ingrese contraseña" />
                        <FormError />
                        <Button htmlType="submit" type="primary" loading={loading} style={{ backgroundColor: "#1f2937", height: 37 }}>
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Styled.StyledCard>

            </Formik>
        </Styled.Background>
    );
};

export default connect(
    (state: PHManagerState) => ({
        loggedIn: state.session.loggedIn,
    }),
    (dispatch) => ({
        login: asyncDispatch(dispatch, loginRequest),
    }),
)(LoginView);
