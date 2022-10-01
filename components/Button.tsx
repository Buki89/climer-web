import React, { FC } from "react";
import styled from "styled-components";

type Variant = "primary" | "secondary" | "action" | "info";

const getColor = (variant: Variant) => {
  switch (variant) {
    case "primary":
      return "#2196f3";
    case "secondary":
      return "#f44336";
    case "action":
      return "#04AA6D";
    case "info":
      return "#efc050";
  }
};

const ButtonBase = styled("button")<{ variant: Variant }>`
  align-self: center;
  background-color: ${({ variant }) => getColor(variant)};
  color: #fff;
  font-size: 1rem;
  border: 0;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  margin: 0.25rem 0;
  min-width: 150px;
  :hover {
    cursor: pointer;
  }
  :disabled {
    /* background-color: #93959780; */
    opacity: 0.3;
    cursor: auto;
  }
`;

type ButtonProps = {
  title?: string;
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  const { variant = "primary" } = props;
  return (
    <ButtonBase variant={variant} {...props}>
      {props.title}
    </ButtonBase>
  );
};

export default Button;
