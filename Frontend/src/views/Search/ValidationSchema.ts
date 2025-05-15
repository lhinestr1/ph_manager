import { object, string } from 'yup';
import { FormValues } from './Search';

export default object<FormValues>({
  search: string()
    .required('Ingrese placa del vehiculo')
    .min(6, 'Si es placa debe tener 6 caracteres')
    .max(6, 'Si es placa debe tener 6 caracteres'),
});
