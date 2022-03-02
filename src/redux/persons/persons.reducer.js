import personsTypes from "./persons.types";

const initialState = {
  loading: false,
  data: null,
  error: null,
  personsAddLoading: false,
  personsAddData: null,
  personsAddError: null,
  personsListLoading: false,
  personsListData: null,
  personsListError: null,
  singlePersonLoading: false,
  singlePersonData: null,
  singlePersonError: null,
  personsDeleteListLoading: false,
  personsDeleteListData: null,
  personsDeleteListError: null,
  changePersonToActiveLoading: false,
  changePersonToActiveDate: null,
  changePersonToActiveError: null,
  changePersonToUnActiveLoading: false,
  changePersonToUnActiveDate: null,
  changePersonToUnActiveError: null,
  generateRFIDCodeRequest: false,
  generateRFIDCodeSuccess: null,
  generateRFIDCodeError: null,
  generatePinCodeRequest: false,
  generatePinCodeSuccess: null,
  generatePinCodeError: null,
  generateBarCodeRequest: false,
  generateBarCodeSuccess: null,
  generateBarCodeError: null,
  generateLastBarCodeRequest: false,
  generateLastBarCodeSuccess: null,
  generateLastBarCodeError: null,
};

const personsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case personsTypes.ADD_NEW_PERSON_REQUEST:
      return {
        personsAddLoading: true,
        personsAddData: null,
        personsAddError: null,
      };
    case personsTypes.ADD_NEW_PERSON_SUCCESS:
      return {
        personsAddLoading: false,
        personsAddData: payload,
        personsAddError: null,
      };
    case personsTypes.ADD_NEW_PERSON_FAILED:
      return {
        personsAddLoading: false,
        personsAddData: null,
        personsAddError: payload,
      };

    case personsTypes.GET_PERSONS_LIST_REQUEST:
      return {
        personsListLoading: true,
        personsListData: null,
        personsListError: null,
      };
    case personsTypes.GET_PERSONS_LIST_SUCCESS:
      return {
        personsListLoading: false,
        personsListData: payload,
        personsListError: null,
      };
    case personsTypes.GET_PERSONS_LIST_FAILED:
      return {
        personsListLoading: false,
        personsListData: null,
        personsListError: payload,
      };

    // ** GET SINGLE PERSON
    case personsTypes.GET_SINGLE_PERSON_REQUEST:
      return {
        singlePersonLoading: true,
        singlePersonData: null,
        singlePersonError: null,
      };
    case personsTypes.GET_SINGLE_PERSON_SUCCESS:
      return {
        singlePersonLoading: false,
        singlePersonData: payload,
        singlePersonError: null,
      };
    case personsTypes.GET_SINGLE_PERSON_FAILED:
      return {
        singlePersonLoading: false,
        singlePersonData: null,
        singlePersonError: payload,
      };

    case personsTypes.DELETE_PERSON_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case personsTypes.DELETE_PERSON_SUCCESS:
      return {
        loading: false,
        data: payload,
        error: null,
      };
    case personsTypes.DELETE_PERSON_FAILED:
      return {
        loading: false,
        data: null,
        error: payload,
      };

    case personsTypes.CHANCE_PERSON_ACTIVITY_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case personsTypes.CHANCE_PERSON_ACTIVITY_SUCCESS:
      return {
        loading: false,
        data: payload,
        error: null,
      };
    case personsTypes.CHANCE_PERSON_ACTIVITY_ERROR:
      return {
        loading: false,
        data: null,
        error: payload,
      };
    case personsTypes.DELETE_SELECTED_PERSON_REQUEST:
      return {
        personsDeleteListLoading: true,
        personsDeleteListData: null,
        personsDeleteListError: null,
      };
    case personsTypes.DELETE_SELECTED_PERSON_SUCCESS:
      return {
        personsDeleteListLoading: false,
        personsDeleteListData: payload,
        personsDeleteListError: null,
      };
    case personsTypes.DELETE_SELECTED_PERSON_FAILED:
      return {
        personsDeleteListLoading: false,
        personsDeleteListData: null,
        personsDeleteListError: payload,
      };

    // ** UPDATE SELECTED PERSON TO ACTIVE
    case personsTypes.MAKE_PERSON_ACTIVE_REQUEST:
      return {
        changePersonToActiveLoading: true,
        changePersonToActiveDate: null,
        changePersonToActiveError: null,
      };
    case personsTypes.MAKE_PERSON_ACTIVE_SUCCESS:
      return {
        changePersonToActiveLoading: false,
        changePersonToActiveDate: payload,
        changePersonToActiveError: null,
      };
    case personsTypes.MAKE_PERSON_ACTIVE_ERROR:
      return {
        changePersonToActiveLoading: false,
        changePersonToActiveDate: null,
        changePersonToActiveError: payload,
      };

    // ** UPDATE SELECTED PERSON TO UNACTIVE
    case personsTypes.MAKE_PERSON_UNACTIVE_REQUEST:
      return {
        changePersonToUnActiveLoading: true,
        changePersonToUnActiveDate: null,
        changePersonToUnActiveError: null,
      };
    case personsTypes.MAKE_PERSON_UNACTIVE_SUCCESS:
      return {
        changePersonToUnActiveLoading: false,
        changePersonToUnActiveDate: payload,
        changePersonToUnActiveError: null,
      };
    case personsTypes.MAKE_PERSON_UNACTIVE_ERROR:
      return {
        changePersonToUnActiveLoading: false,
        changePersonToUnActiveDate: null,
        changePersonToUnActiveError: payload,
      };

    // ** GENERATE RFID CODE
    case personsTypes.GENERATE_RFID_CODE_REQUEST:
      return {
        generateRFIDCodeRequest: true,
        generateRFIDCodeSuccess: null,
        generateRFIDCodeError: null,
      };
    case personsTypes.GENERATE_RFID_CODE_SUCCESS:
      return {
        generateRFIDCodeRequest: false,
        generateRFIDCodeSuccess: payload,
        generateRFIDCodeError: null,
      };
    case personsTypes.GENERATE_RFID_CODE_ERROR:
      return {
        generateRFIDCodeRequest: false,
        generateRFIDCodeSuccess: null,
        generateRFIDCodeError: payload,
      };

    // ** GENERATE PIN CODE
    case personsTypes.GENERATE_PIN_CODE_REQUEST:
      return {
        generatePinCodeRequest: true,
        generatePinCodeSuccess: null,
        generatePinCodeError: null,
      };
    case personsTypes.GENERATE_PIN_CODE_SUCCESS:
      return {
        generatePinCodeRequest: false,
        generatePinCodeSuccess: payload,
        generatePinCodeError: null,
      };
    case personsTypes.GENERATE_PIN_CODE_ERROR:
      return {
        generatePinCodeRequest: false,
        generatePinCodeSuccess: null,
        generatePinCodeError: payload,
      };

    // ** GENERATE BAR CODE
    case personsTypes.GENERATE_BAR_CODE_REQUEST:
      return {
        generateBarCodeRequest: true,
        generateBarCodeSuccess: null,
        generateBarCodeError: null,
      };
    case personsTypes.GENERATE_BAR_CODE_SUCCESS:
      return {
        generateBarCodeRequest: false,
        generateBarCodeSuccess: payload,
        generateBarCodeError: null,
      };
    case personsTypes.GENERATE_BAR_CODE_ERROR:
      return {
        generateBarCodeRequest: false,
        generateBarCodeSuccess: null,
        generateBarCodeError: payload,
      };

    // ** GENERATE LAST BAR CODE
    case personsTypes.GENERATE_LAST_BAR_CODE_REQUEST:
      return {
        generateLastBarCodeRequest: true,
        generateLastBarCodeSuccess: null,
        generateLastBarCodeError: null,
      };
    case personsTypes.GENERATE_LAST_BAR_CODE_SUCCESS:
      return {
        generateLastBarCodeRequest: false,
        generateLastBarCodeSuccess: payload,
        generateLastBarCodeError: null,
      };
    case personsTypes.GENERATE_LAST_BAR_CODE_ERROR:
      return {
        generateLastBarCodeRequest: false,
        generateLastBarCodeSuccess: null,
        generateLastBarCodeError: payload,
      };

    default:
      return state;
  }
};

export default personsReducer;
