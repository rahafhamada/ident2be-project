import styled from "styled-components";

export const NavbarWrapper = styled.div`
  padding: 20px 0;
  box-shadow: 1px 1px 1px 1px #ddd;
  margin-bottom: 40px;
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${({ maincolor }) => maincolor} !important;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
`;

export const NavbarSearchWrapper = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const NavbarSearchSearchCircle = styled.div`
  background-color: ${({ maincolor }) => maincolor} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;

  svg {
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export const NavbarSearchInput = styled.input`
  background-color: transparent;
  border: none !important;
  outline: none;
  flex: 1;
  padding-left: 50px;
  height: 40px;
`;

export const NavbarSearchFilter = styled.div`
  background-color: ${({ maincolor }) => maincolor} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;

  svg {
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;
