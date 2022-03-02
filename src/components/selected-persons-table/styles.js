import styled from "styled-components";

export const SelectedTableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #00000078,
    1px 6px 33px 7px rgba(168, 168, 168, 0);
  box-shadow: 0px 10px 13px -7px #00000078,
    1px 6px 33px 7px rgba(168, 168, 168, 0);
`;

export const CharSelectWrapper = styled.tr`
  background-color: ${({ showInput }) => (showInput ? "#ccc" : "#fff")};
  &:hover {
    background-color: #ccc;
    .person-chars-input {
      z-index: 4 !important;
    }
    .person-chars {
      background-color: transparent !important;
    }
  }

  .person-chars-input-wrapper {
    position: relative;
    width: 35px;
    height: 35px;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
  }
  .person-chars {
    padding: 5px;
    font-size: 0.7rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    font-weight: 500;
    color: ${({ showInput }) => (showInput ? "#fff" : "#000")};
  }

  .person-chars-input {
    position: absolute;
    padding: 5px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({ showInput }) => (showInput ? 4 : -1)};
  }

  .container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    height: 100%;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 23px;
    width: 23px;
    /* background-color: #eee; */
  }

  .container:hover input ~ .checkmark {
    background-color: #fff;
  }

  .container input:checked ~ .checkmark {
    background-color: ${({ bg }) => (bg ? "yellow" : "#2196f3")};
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 8px;
    top: 4px;
    width: 6px;
    height: 11px;
    border: solid #ccc;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const InputTrigger = styled.div``;

export const HideInputOnHover = styled.div`
  border: 1px solid red;
`;

export const TablePersonsChar = styled.span`
  /* width: ${({ circleSize }) => circleSize}; */
  /* height: ${({ circleSize }) => circleSize}; */
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${({ showInput, bg }) => (showInput ? "transparent" : bg)};
`;
