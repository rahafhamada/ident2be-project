import { API_INSTANCE } from "../../api";
import companyTypes from "./company.types";

export const fetchCompaniesList = () => async dispatch => {
  dispatch({
    type: companyTypes.FETCH_COMPANIES_LIST_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get(`/company`, {
      headers: {
        Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
      },
    });

    dispatch({
      type: companyTypes.FETCH_COMPANIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: companyTypes.FETCH_COMPANIES_LIST_FAILED,
      payload: error,
    });
  }
};
