import { object, string } from 'yup';
import { FormValues } from './Search';

const placaRegex = /^(?:[A-Z]{3}\d{3}|[A-Z]{3}\d{2}[A-Z])$/;

export default object<FormValues>({
  search: string()
    .required('Ingrese placa del vehiculo')
    .matches(
      placaRegex,
      'La placa debe ser de un vehículo particular (ABC123) o moto (ABC12D)'
    )



});
