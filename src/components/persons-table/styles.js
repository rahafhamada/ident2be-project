import styled from "styled-components";

export const SelectedTableHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #00000078, 1px 6px 33px 7px rgba(168, 168, 168, 0);
  box-shadow: 0px 10px 13px -7px #00000078, 1px 6px 33px 7px rgba(168, 168, 168, 0);
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
    color: ${({ showInput }) => (showInput ? "transparent" : "#000")};
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

  .select-container {
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

  .select-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: -10px;
    left: 0;
    height: 23px;
    width: 23px;
    /* background-color: #eee; */
  }

  .select-container:hover input ~ .checkmark {
    background-color: #fff;
  }

  .select-container input:checked ~ .checkmark {
    background-color: ${({ bg }) => (bg ? bg : "#2196f3")};
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .select-container input:checked ~ .checkmark:after {
    display: block;
  }

  .select-container .checkmark:after {
    left: 8px;
    top: 4px;
    width: 6px;
    height: 11px;
    border: solid #fff;
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
  padding-right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: ${({ showInput, bg }) => (showInput ? "transparent" : bg)};
`;

export const CustomTableWrapper = styled.div`
  .customers {
    border-collapse: collapse;
    width: calc(100% - 96px);
  }

  table {
    table-layout: fixed;
  }


  th:first-of-type {
    width: 60px !important;
  }

 .header-table-element .row-select-input {
  display: block !important;
}


  tr th {
    /* &:not(:first-of-type) {
      width: calc(100% / 5);
    } */
    /* &:first-of-type {
      width: 55px !important;
    }
    &:not(:first-of-type) {
      width: 200px;
    }

    &:nth-child(1) {
    } */
    /* &:nth-child(2) {
      width: 200px;
    }
    &:nth-child(3) {
      width: 150px !important;
    }
    &:nth-child(4) {
      width: 150px;
    }
    &:nth-child(5) {
      width: 150px;
    }
    &:nth-child(6) {
      width: 150px;
    } */
  }




  td,
  th {
    padding: ${({ padding }) => padding};
    padding: 5px;
    font-size: ${({ fontsize }) => fontsize};
  }

 tbody tr {
    #ddddd {
      width: 50px;
      height: 50px;

      .toggle-select-input {
          display: block;
          visibility: : visible;
          opacity: 1;
        }


        .hide-selected-char {
          display: none !important
        }

        .show-selected-char {
          input {
            border: 3px solid red
          }
        }
    }
    .row-select-input-wrapper {
          width: 50px;
          height: 50px;
          display: none;
          align-items: center;
          justify-content: center;
    }

    .row-select-input {
      display: none;
    }

     &:hover {
       .row-select-input-wrapper {
         display: flex
       }
        .row-select-input {
          display: block;
          visibility: : visible;
          opacity: 1;
        }
        .table-persons-char {
          display: none;
          visibility: : hidden;
          opacity: 0;
        }
      }
    
  }

  .customers tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .customers tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ;
    color: #333333a8;
    border-bottom: 3px solid ${({ maincolor }) => maincolor};
  }
`;

export const PersonTableSelectWrap = styled.div`
  display: flex;
  align-items: center;

  .toggle-select-input {
    display: none;
    /* transition: 0.1s ease-in-out; */
  }
`;

export const ShowFilterMenu = styled.div`
  margin-left: 20px;
  font-size: 2rem;
  cursor: pointer;
`;
export const ModelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ShowColumnsFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 0 10px 10px 10px;
`;
export const ShowColumnsFilter = styled.div`
  margin-top: 20px;
  margin-right: 15px;

  label {
    display: flex;
    align-items: center;

    input {
      margin-right: 5px;
    }
  }
`;

export const TablePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  ul {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin: 0 15px;
    border: 1px solid #d9d9d9;
  }
  .ant-pagination-item {
    margin-right: 0 !important;
    border: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & div:nth-child(1) {
    button {
      margin-right: 5px;
      cursor: pointer;
    }
  }

  & div:nth-child(2) {
    margin: 0 30px;
  }

  & div:nth-child(3) {
    input {
      outline: none;
      margin: 0 10px;
    }
  }
`;

export const FontSizeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h5 {
    margin-bottom: 0 !important;
    font-size: 1rem;
    margin-right: 15px;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 15px;
      cursor: pointer;
    }
  }
`;

export const TableActionMenuWrapper = styled.td`
  &:hover {
    .table-actions-menu {
      opacity: 1 !important;
      visibility: visible !important;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table-actions-menu {
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-in-out;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
`;

export const PersonsSearchForm = styled.form`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 30px;
`;

export const SearchColumnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cbcbcb;
  padding: 5px 10px;
  padding-right: 0;
  height: 58px;

  input {
    padding: 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    outline: none;
    /* width: calc(100% / 6); */
  }
`;

export const SearchColumnsInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
`;

export const SearchFullNameInput = styled.div`
  position: relative;
  width: ${({ width }) => (width ? width : "100%")};

  svg {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(-10px, -50%);
    cursor: pointer;
    font-size: 1rem;
    color: #fff;
    background-color: #80808099;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 4px;
  }
`;

export const SearchColumnsInput = styled.input`
  padding: 10px;
  /* border-radius: 20px; */
  font-size: 0.8rem;
  outline: none;
  width: 100%;
  border: none !important;
  position: relative;
  border: 1px solid red;
`;

export const TableSearchSubmit = styled.input`
  all: unset;
  border: 1px solid ${({ maincolor }) => maincolor} !important;
  padding: 7px 45px;
  border-radius: 20px;
  cursor: pointer;
  color: ${({ maincolor }) => maincolor} !important;
  font-weight: bold;
`;
