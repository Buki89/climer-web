import React, { FC } from "react";
import styled from "styled-components";
import { Category } from "../types";
import Box from "./Box";

const CategoryContainer = styled("div")`
  background-color: #000;
  color: #fff;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
`;

const LettersContainer = styled("div")`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Letter = styled("div")`
  background-color: #dadadc;
  width: 2rem;
  height: 2rem;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0.125rem;
  text-transform: capitalize;
  font-weight: 700;
`;

type GuesserBoardProps = {
  category: Category;
  text: string;
  visibleLetters: string[];
};

const GuesserBoard: FC<GuesserBoardProps> = ({
  category,
  text,
  visibleLetters,
}) => {
  // const [visibleLetters, setvisibleLetters] = useState<string[]>([]);
  const words = text.split(" ");

  return (
    <Box margin="0 0.75rem">
      <CategoryContainer>
        <h5>{category}</h5>
      </CategoryContainer>
      <LettersContainer>
        {words.map((word) => {
          return (
            <Box key={word} margin="0.5rem 0">
              {word.split("").map((letter, i) => {
                const visibleLetter = visibleLetters.includes(letter)
                  ? letter
                  : "";

                return <Letter key={`${i}-${letter}`}>{visibleLetter}</Letter>;
              })}
            </Box>
          );
        })}
      </LettersContainer>
    </Box>
  );
};

export default GuesserBoard;
