import styled from "styled-components";
import { mainColor } from "../../contants";

export const CompanyHederWrapper = styled.div`
  max-width: 977px;
  max-height: 250px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${mainColor};
  padding: 40px;
  border-radius: 37px;
`;

export const CompanyHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 2.5rem;
    font-weight: bold;
  }

  img {
    width: 92px;
    height: 92px;
    border-radius: 50%;
  }
`;
export const CompanyHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 200px;
    height: 100%;
  }
`;

export const CompanyHeaderPersonName = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const CompanyHeaderPersonEmail = styled.div`
  color: #fff;
`;
