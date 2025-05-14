import { object, string, number, StringSchema } from 'yup';
import { rolesType } from '../../../types/common';

export default object({
  firstName: string()
    .trim()
    .required('requerido'),
  lastName: string()
    .trim()
    .required('requerido'),
  role: string()
    .trim()
    .required('requerido'),
  buildingSelector: string()
    .trim()
    .when('role', {
      is: (role: string) => ['Propietario', 'Inquilino'].includes(role),
      then: (schema) => schema.required('Requerido'),
      otherwise: (schema) => schema,
    }),
    apartmentSelector: string()
    .trim()
    .when('role', {
      is: (role: string) => ['Propietario', 'Inquilino'].includes(role),
      then: (schema) => schema.required('Requerido'),
      otherwise: (schema) => schema,
    }),
  documentNumber: string()
    .trim()
    .required('requerido'),
  mainPhoneNumber: number()
    .min(1111111111, 'El celular debe tener 10 dígitos')
    .max(9999999999, 'El celular debe tener 10 dígitos')
    .typeError('Numero invalido')
    .required('requerido'),
  email: string()
    .trim()
    .email('Correo electronico invalido')
    .required('requerido'),
});
