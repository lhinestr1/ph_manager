import { object, string, number } from 'yup';

export default object({
  firstName: string()
    .trim()
    .required('Requerido'),
  lastName: string()
    .trim()
    .required('Requerido'),
  role: string()
    .trim()
    .required('Requerido'),
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
    .required('Requerido'),
  mainPhoneNumber: number()
    .min(1111111111, 'El celular debe tener 10 dígitos')
    .max(9999999999, 'El celular debe tener 10 dígitos')
    .typeError('Numero inválido')
    .required('Requerido'),
  email: string()
    .trim()
    .email('Correo electronico inválido')
    .required('Requerido'),
});
