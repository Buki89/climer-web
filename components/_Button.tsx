import React from "react";
import styled from "styled-components";

const ButtonBase = styled("button")`
  align-self: center;
  background-color: #2196f3;
`;

type ButtonProps<E extends React.ElementType> = {
  as?: E;
};

type Props<E extends React.ElementType> = React.PropsWithChildren<
  ButtonProps<E>
> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonProps<E>>;

const Button = <E extends React.ElementType = "button">({
  as,
  children,
  ...rest
}: Props<E>) => {
  const Component = as || "button";

  return <Component {...rest}>{children}</Component>;
};

export default Button;
