import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../../contants";

export const CompanyWidgetsWrapper = styled.div`
  max-width: 977px;
  margin: 40px auto;

  h3 {
    margin-bottom: 20px;
  }

  /* Weather widget overwrite styles */
  .container-d0-0-2-6 {
    height: 100% !important;
  }

  .main-0-2-2 {
    height: auto !important;
  }
`;

export const CompanyWidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
`;

export const CompanyWidgetsGridLeft = styled.div`
  /* height: fit-content; */
  `;

export const CompanyWidgetsGridMiddle = styled.div`
  display: grid;
  gap: 30px;
  `;

export const CompanyWidgetsGridRight = styled.div`
`;

export const CompanyWidgetsGridLeftBoxLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
  width: 100%;
  height: 150px;
  border-radius: 15px;
`;


export const CompanyWidgetsGridLeftBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #f5f6fa;
  height: 150px;

  svg {
    font-size: 4rem;
    margin-right: 15px;
    color: ${mainColor};
  }

  span {
    color: ${mainColor};
    font-weight: bold;
  }

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
