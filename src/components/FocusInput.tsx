import { useEffect, useRef } from 'react';
import styled from 'styled-components';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputStyled = styled.input`
  background-color: #ffc250;
  padding: 2px;
  border: 0;
  :focus {
    outline: none;
  }
`;

export default function FocusInput(props: InputProps){
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus(); 
  }, []);

  return (
    <InputStyled ref={ref} {...props} />
  );

}
