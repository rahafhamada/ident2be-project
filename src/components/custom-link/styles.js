import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../../contants";

export const CustomLinkWrapper = styled(Link)`
  border: 1px solid ${mainColor};
  padding: 7px 25px;
  border-radius: 20px;
  cursor: pointer;
  color: ${mainColor};
  font-weight: bold;
  display: block;
  height: fit-content;
  width: fit-content;
`;
