import { Field, FieldProps } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Eye, EyeOff, X } from 'lucide-react';

const Container = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  .ico {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

export const InputCSS = css<{ $invalid?: boolean; $empty?: boolean }>`
  box-sizing: border-box;
  width: 100%;
  height:37px;
  border: 2px solid ${(props) => (props.$invalid ? '#FF7375' : 'rgb(195, 204, 213)')};
  border-radius: 6px;
  color: #707070;
  background-color: #FFFFFF;
  font-size: 13px;
  padding: .375rem .75rem;
  line-height: 1.2rem;

  :not(:disabled) {
    :focus,
    :active {
      box-shadow: 0 0 5px
        ${(props) =>
    props.$invalid ? '#ff7375' : '#CFCFCF'};
    }
  }

  :disabled {
    opacity: 0.8;
    pointer-events: none;
    background-color: #E1E1E1;
    color: #B1B1B1;
  }
`;

export const InputStyled = styled.input<{ $invalid?: boolean; $empty?: boolean }>`
  width: 100%;
  ${InputCSS}
`;

export type InputType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'hidden'
  | 'image'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: InputType;
  reset?: boolean;
  autocomplete?: 'off' | 'on';
  format?: {
    match: RegExp;
    replace: string;
    upper?: boolean;
  };
}

export const Icon = styled.i`
  position: absolute;
  left: 1px;
  top: 0;
  height: 100%;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
  color: #083863;
`;

const InputComponent: React.FC<FieldProps & Props> = ({
  form,
  field,
  format,
  type,
  reset,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [typeInput, settypeInput] = useState<InputType>(type ?? "text");

  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (format) {
        //ev.target.value = ev.target.value.replace(format.match, format.replace);
        if (format.upper) {
          ev.target.value = ev.target.value.toString().toUpperCase()
        }
      }

      field.onChange(ev);
    },
    // eslint-disable-next-line
    [field.onChange, format]
  );

  const onToggleType = () => {
    if (!restProps.disabled) {
      settypeInput(prev => prev === "password" ? "text" : "password");
    }
  }

  const resetValue = () => {
    form.setFieldValue(field.name, "");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }


  return (
    <Container>
      <InputStyled
        ref={inputRef}
        $invalid={form.touched[field.name]! && !!form.errors[field.name]}
        $empty={!field.value}
        id={field.name}
        type={typeInput}
        {...restProps}
        {...field}
        onChange={onChange}
      />
      {type === "password" && (
        <div className='ico' onClick={onToggleType}>
          {typeInput === 'password' ? <EyeOff /> : <Eye />}
        </div>
      )}
      {reset && field.value !== "" && type !== "password" && (
        <div className='ico' onClick={resetValue}>
          <X />
        </div>
      )}
    </Container>
  );
};

const Input: React.FC<Props> = ({ name, ...restProps }) => (
  <Field name={name} {...restProps} component={InputComponent} />
);

export default Input;

export const formats = {
  wordUpper: {
    match: /[^a-z\u00A8-\u00FF\s]/i,
    replace: '',
    upper: true,
  },

  email: { match: /\s+/i, replace: '' },
};
