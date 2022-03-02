import companyTypes from "./company.types";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const companyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case companyTypes.FETCH_COMPANIES_LIST_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case companyTypes.FETCH_COMPANIES_LIST_SUCCESS:
      return {
        loading: false,
        data: payload,
        error: null,
      };
    case companyTypes.FETCH_COMPANIES_LIST_FAILED:
      return {
        loading: false,
        data: null,
        error: payload,
      };

    default:
      return state;
  }
};

export default companyReducer;
