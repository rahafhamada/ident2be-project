import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../../contants";

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

export const PersonPageNabNavigator = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
  box-shadow: 1px 1px 6px 1px #ddd;
  border-radius: 5px;
  overflow: hidden;

  .active {
    color: #fff;
    background: ${({ color }) => color};
  }
  li {
    padding: 10px;
    margin-right: 20px;
    cursor: pointer;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
      font-size: 1.3rem;
    }
  }
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
    color: ${mainColor};
  }

  svg {
    margin-right: 10px;
    color: ${mainColor};
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
