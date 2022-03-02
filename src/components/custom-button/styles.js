import styled from "styled-components";
// import { mainColor } from "../../contants";

export const CustomButtonWrapper = styled.button`
  all: unset;
  border: 1px solid ${({maincolor}) =>  maincolor} !important;
  padding: 7px 45px;
  border-radius: 20px;
  cursor: pointer;
  color: ${({maincolor}) =>  maincolor} !important;
  font-weight: bold;
`;
