import { object, string, } from 'yup';
import { IFormValues } from './Apartments';

export default object<IFormValues>({
  building: string()
    .required('Campo requerido'),
  apto: string()
    .trim()
    .min(3, 'Mínimo 4 caracteres')
    .required('Campo requerido'),
});
