import { object, string, } from 'yup';
import { IFormValues } from './Buildings';

export default object<IFormValues>({
  name: string()
    .required('Campo requerido')
});
