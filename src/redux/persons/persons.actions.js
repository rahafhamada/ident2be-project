import { notification } from "antd";
import axios from "axios";
import { API_INSTANCE } from "../../api";
import personsTypes from "./persons.types";

/**
 * @method POST
 * @description Add new Person
 */
export const AddNewPersonsAction = personData => async dispatch => {
  dispatch({
    type: personsTypes.ADD_NEW_PERSON_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.post("/person", personData, {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.ADD_NEW_PERSON_SUCCESS,
      payload: data,
    });
    const openNotificationWithIcon = type => {
      notification[type]({
        message: "Persons Has been created!",
      });
    };
    openNotificationWithIcon("success");
  } catch (error) {
    dispatch({
      type: personsTypes.ADD_NEW_PERSON_FAILED,
      payload: error,
    });
  }
};

export const getPersonsList = url => async dispatch => {
  dispatch({
    type: personsTypes.GET_PERSONS_LIST_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get(url, {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GET_PERSONS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GET_PERSONS_LIST_FAILED,
      payload: "ërror",
    });
  }
};

export const getSinglePerson = id => async dispatch => {
  dispatch({
    type: personsTypes.GET_SINGLE_PERSON_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get(`/person/${id}`, {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GET_SINGLE_PERSON_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GET_SINGLE_PERSON_FAILED,
      payload: "ërror",
    });
  }
};

export const DeletePerson = id => async dispatch => {
  dispatch({
    type: personsTypes.DELETE_PERSON_REQUEST,
  });

  try {
    const { data } = await axios.delete(`https://devel.ident2be.com:1443/person/${id}`, {
      headers: {
        Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
      },
    });

    dispatch({
      type: personsTypes.DELETE_PERSON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.DELETE_PERSON_FAILED,
      payload: "Bad Request",
    });
  }
};

export const DeleteSelectedPersons = personsArray => async dispatch => {
  dispatch({
    type: personsTypes.DELETE_SELECTED_PERSON_REQUEST,
  });

  try {
    const { data } = await axios.delete(`https://devel.ident2be.com:1443/person`, {
      data: personsArray,
      headers: {
        Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
      },
    });

    dispatch({
      type: personsTypes.DELETE_SELECTED_PERSON_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      window.location.reload(true);
    });
  } catch (error) {
    dispatch({
      type: personsTypes.DELETE_SELECTED_PERSON_FAILED,
      payload: "Bad Request",
    });
  }
};

export const changePersonActiveStatus = (id, isactive) => async dispatch => {
  dispatch({
    type: personsTypes.CHANCE_PERSON_ACTIVITY_REQUEST,
  });

  try {
    const { data } = await axios.put(
      `https://devel.ident2be.com:1443/person/${id}`,
      { isactive },
      {
        headers: {
          Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
        },
      }
    );

    dispatch({
      type: personsTypes.CHANCE_PERSON_ACTIVITY_SUCCESS,
      payload: data,
    });
    if (isactive) {
      const openNotificationWithIcon = type => {
        notification[type]({
          message: "Person Has been updated!",
        });
      };
      openNotificationWithIcon("success");
      setTimeout(() => {
        window.location.reload(true);
      }, 2500);
    }
  } catch (error) {
    dispatch({
      type: personsTypes.CHANCE_PERSON_ACTIVITY_ERROR,
      payload: "Bad Request",
    });
  }
};

export const updateSelectedPersonToActive = arr => async dispatch => {
  dispatch({
    type: personsTypes.MAKE_PERSON_ACTIVE_REQUEST,
  });

  try {
    const { data } = await axios.put(`https://devel.ident2be.com:1443/person`, arr, {
      headers: {
        Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
      },
    });

    dispatch({
      type: personsTypes.MAKE_PERSON_ACTIVE_SUCCESS,
      payload: data,
    });
    const openNotificationWithIcon = type => {
      notification[type]({
        message: "Persons Has been updated!",
      });
    };
    openNotificationWithIcon("success");
    setTimeout(() => {
      window.location.reload(true);
    }, 2500);
  } catch (error) {
    dispatch({
      type: personsTypes.MAKE_PERSON_ACTIVE_ERROR,
      payload: "Bad Request",
    });
  }
};

export const updateSelectedPersonToUnActive = arr => async dispatch => {
  dispatch({
    type: personsTypes.MAKE_PERSON_UNACTIVE_REQUEST,
  });

  try {
    const { data } = await axios.put(`https://devel.ident2be.com:1443/person`, arr, {
      headers: {
        Authorization: "Basic ZXh0ZGF0YTplYTI0MmM3MjhiYmVjZWUxOWY3NzEyNjcyNzNlOWU4Yg==",
      },
    });

    dispatch({
      type: personsTypes.MAKE_PERSON_UNACTIVE_SUCCESS,
      payload: data,
    });
    const openNotificationWithIcon = type => {
      notification[type]({
        message: "Persons Has been updated!",
      });
    };
    openNotificationWithIcon("success");
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  } catch (error) {
    dispatch({
      type: personsTypes.MAKE_PERSON_UNACTIVE_ERROR,
      payload: "Bad Request",
    });
  }
};

export const generateRFIDCodeAction = () => async dispatch => {
  dispatch({
    type: personsTypes.GENERATE_RFID_CODE_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get("/id/genpin?idtype=RFIDCARD", {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GENERATE_RFID_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GENERATE_RFID_CODE_ERROR,
      payload: error,
    });
  }
};

export const generatePinCodeAction = () => async dispatch => {
  dispatch({
    type: personsTypes.GENERATE_PIN_CODE_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get("/id/genpin?idtype=PINONLY", {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GENERATE_PIN_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GENERATE_PIN_CODE_ERROR,
      payload: error,
    });
  }
};

export const generateBarCodeAction = () => async dispatch => {
  dispatch({
    type: personsTypes.GENERATE_BAR_CODE_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get("/id/genbarcode", {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GENERATE_BAR_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GENERATE_BAR_CODE_ERROR,
      payload: error,
    });
  }
};

export const generateLastBarCodeAction = () => async dispatch => {
  dispatch({
    type: personsTypes.GENERATE_LAST_BAR_CODE_REQUEST,
  });

  try {
    const { data } = await API_INSTANCE.get("/id/genpin?idtype=BARCODE&lengthfrom=RFIDCARD", {
      headers: {
        Authorization: "Basic aTJiYXBpOlJGJD4wa051VTM2aA==",
      },
    });

    dispatch({
      type: personsTypes.GENERATE_LAST_BAR_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: personsTypes.GENERATE_LAST_BAR_CODE_ERROR,
      payload: error,
    });
  }
};
