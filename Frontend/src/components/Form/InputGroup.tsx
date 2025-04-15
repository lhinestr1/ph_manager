import React from 'react';
import Error from './Error';
import FormGroup from './FormGroup';
import Input, { Props as InputProps } from './Input';
import InputIcon from './InputIcon';
import Label from './Label';

export interface Props extends InputProps {
  label?: string;
  icon?: string;
  help?: string;
}

const InputGroup: React.FC<Props> = ({
  label,
  help,
  name,
  icon,
  children,
  ...restProps
}) => (
  <FormGroup>
    {label && <Label htmlFor={name}>{label}</Label>}
    {icon ? (
      <InputIcon name={name} icon={icon} {...restProps} />
    ) : (
      <Input name={name} {...restProps} />
    )}
    <Error name={name} help={help} />
  </FormGroup>
);

export default InputGroup;
