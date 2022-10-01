import { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;
`;

type TextInputProps = {
  name: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput: FC<TextInputProps> = ({ label, name, ...rest }) => {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest}></input>
    </Container>
  );
};

export default TextInput;
