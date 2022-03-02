import { Link } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";
import styled from "styled-components";

export const PersonPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;

  /* .text-input {
    margin-bottom: 20px;
  } */

  .css-19kzrtu {
    padding: 40px 20px 20px 0 !important;
  }
`;

export const PersonPageLeftSide = styled.div`
  padding: 0 30px 30px 30px;
`;

export const PersonPageLeftSidePerson = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 92px;
    height: 92px;
    border-radius: 50%;
  }

  & > div:first-of-type {
    font-weight: 600;
    color: #848484;
    margin: 5px 0;
  }

  & > div:last-of-type {
    font-size: 0.7rem;
  }
`;

export const PersonPageLeftSideCollapse = styled.div`
  margin: 30px 0;
`;

export const PersonPageLeftSideCollapseLink = styled(Link)`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 10px;
  color: #aaa;

  &:hover {
    color: ${({ maincolor }) => maincolor} !important;
  }

  svg {
    margin-right: 10px;
    color: ${({ maincolor }) => maincolor} !important;
    font-size: 1.2rem;
  }
`;

export const ProductsPageInputsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

export const ProductsPageInputsGridSecond = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-top: 20px;
`;

export const ProductsPageDateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

// ** Add person first row
export const AddPersonFirstRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
`;

export const CheckboxElWithLabelWrap = styled.div`
  padding: 8px;
  border: ${({ isDarkMode }) =>
    isDarkMode ? "1px solid #cbcbcb !important" : "1px solid #838383 !important"};
`;

export const CustomTextareaAutosize = styled(TextareaAutosize)`
  background: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#18191a")};
  border: ${({ isDarkMode }) =>
    isDarkMode ? "1px solid #cbcbcb !important" : "1px solid #838383 !important"};
  padding: 10px;
`;

export const AddNewPhoneBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cbcbcb;
`;

export const AddNewPhoneBtn = styled.button`
  border: 1px solid #cbcbcb;
  all: unset;
  background-color: transparent;
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#333")};
  padding: 0px 10px;
  margin-right: 10px;
  display: inline-block;
  cursor: ${({ numberLength }) => (numberLength ? "pointer" : "not-allowed")};
  text-transform: capitalize;
  font-weight: 600;
  height: 58px;
  flex: 1;
  text-align: center;
`;
