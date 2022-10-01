import React, { FC } from "react";
import styled from "styled-components";
import { BoxProps } from "../types";

const BoxContainer = styled("div")<BoxProps>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  height: ${({ height }) => height};
`;

const Box: FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxContainer {...rest}>{children}</BoxContainer>;
};

export default Box;
