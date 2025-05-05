import { object, string, } from 'yup';

export default object({
  plate: string()
    .trim()
    .required('Campo requerido'),
  vehicleType: string()
    .trim()
    .required('Campo requerido'),
  apartmentId: string()
    .trim()
    .required('Campo requerido')

});
