import { object, string, } from 'yup';
import { LoginFormValues } from './types';

export default object<LoginFormValues>({
  email: string()
    .trim()
    .required('Campo requerido')
    .email('Formato de correo inválido'),
  password: string()
    .min(4, 'Mínimo 4 caracteres')
    .required('Campo requerido'),
});
