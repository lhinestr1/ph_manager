import { Field, FieldProps } from 'formik';
import React from 'react';
//import autoNextFocus from '../../helpers/autoNextFocus';
import { InputCSS } from './Input';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';

const SelectStyled = styled.div<{ $invalid?: boolean; $empty?: boolean }>`
  position: relative;
  width: 100%;
  height: 37px;

  select {
    ${InputCSS}
    -webkit-appearance: none;
    -moz-appearance: textfield;
    width: 100%;
    padding-right: 20px;
  }

  .dropdown {
    top: 55%;
    transform: translateY(-50%);
    right: 3px;
    position: absolute;
    color: #7E7E7E;
    pointer-events: none;
  }
`;

interface SelectProps extends FieldProps {
  onChangeOption?: (value: string | number) => any;
  disabled: boolean;
  children: React.ReactNode;
}

const InputSelectComponent: React.FC<SelectProps> = ({
  form,
  field,
  disabled,
  onChangeOption,
  children,
  ...restProps
}) => {
  return (
    <SelectStyled
      $invalid={form.touched[field.name]! && !!form.errors[field.name]}
    >
      <select
        id={field.name}
        disabled={disabled}
        autoComplete="off"
        {...restProps}
        {...field}
        onChange={(e) => {
          e.target.value = e.target.value || '';
          if (onChangeOption) onChangeOption(e.target.value);
          field.onChange(e);
          //autoNextFocus(e.target);
        }}
      >
        {children}
      </select>
      <ChevronDown className='dropdown' />
      {/*<FontAwesomeIcon className="dropdown" icon="chevron-down" />*/}
    </SelectStyled>
  );
};

export interface Props {
  name: string;
  placeholder?: string;
  defaultOption?: boolean | any;
  options: { label?: string; value: any }[];
  onChange?: (value: any) => any;
  help?: string;
  disabled?: boolean;
}

const InputSelect: React.FC<Props> = ({
  name,
  placeholder,
  options = [],
  defaultOption = '',
  disabled = false,
  help,
  onChange,
}) => (
  <>
    <Field
      name={name}
      onChangeOption={onChange}
      disabled={disabled}
      component={InputSelectComponent}
      options={options}
    >
      {defaultOption !== false && (
        <option value={defaultOption}>
          {placeholder || 'Seleccione una opción'}
        </option>
      )}
      {options !== null &&
        options.map((option, index) => {
          return (
            <option value={option.value} key={`${option.value}-${index}`}>
              {option.label || option.value}
            </option>
          );
        })}
    </Field>
    
  </>
);

export default InputSelect;
