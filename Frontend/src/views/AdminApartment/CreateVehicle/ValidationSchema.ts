import { object, string, } from 'yup';

export default object({
  plate: string()
    .trim()
    .required('Campo requerido')
    .min(6, 'Placa debe tener 6 caracteres')
    .max(6, 'Placa debe tener 6 caracteres'),
  vehicleType: string()
    .trim()
    .required('Campo requerido'),
  apartmentId: string()
    .trim()
    .required('Campo requerido')

});
