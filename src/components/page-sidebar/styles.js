import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainColor } from "../../contants";

export const PersonPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
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
    color: ${mainColor};
  }

  svg {
    margin-right: 10px;
    color: ${mainColor};
    font-size: 1.2rem;
  }
`;
