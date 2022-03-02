// ** Imports
import { useState, memo } from "react";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Grid, Radio, RadioGroup } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MaterialSelect from "@mui/material/Select";
import { Modal, Form, Input, Button, Space, Select } from "antd";

// ** Icons
import { AiOutlineClose, AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineMinusCircle } from "react-icons/hi";

// ** Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import { AddNewPersonsAction } from "../../redux/persons/persons.actions";

// ** Components
import CustomButton from "components/custom-button";
import LoadingSpinner from "components/loading-spinner";

// ** Styles
import {
  AddNewPhoneBtn,
  AddNewPhoneBtnWrapper,
  CheckboxElWithLabelWrap,
  CustomTextareaAutosize,
} from "./styles";
import UploadMedia from "components/upload-media";
import useFetchData from "hooks/useFetchData";
import { personFullNameValidation } from "utils";

const AddPersonTab = () => {
  // ** Hooks
  const { loading: isLoadingSites, data: sitesData } = useFetchData(
    `https://devel.ident2be.com:1443/bd/sitetype?navigate[limit]=25&navigate[page]=1`
  );

  // ** State
  const [fullNameMessage, setFullNameMessage] = useState("");
  // eslint-disable-next-line
  const [personNumberss, setPersonNumbers] = useState([]);
  const { loading: companiesLoading, data: companiesData } = useSelector(({ company }) => company);

  const theme = useTheme();
  // eslint-disable-next-line
  const [bedridNaam, setBedrijfNaam] = useState([]);
  const [groupNaam, setGroupNaam] = useState([]);
  const { isDarkMode } = useSelector(({ ui }) => ui);
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date("2014-08-18T21:11:54"));
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState(new Date("2014-08-18T21:11:54"));
  // eslint-disable-next-line
  const [active, setActive] = useState("");
  const [addPhoneNumModal, setAddPhoneNumModal] = useState(false);
  // eslint-disable-next-line
  const [telefoonnummersArr, setTelefoonnummersArr] = useState(null);
  const [personCreated, setPersonCreated] = useState(false);
  const [personData, setPersonData] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    surname: "",
    persontype: "",
    gender: "",
    remark: "",
    initials: "",
    isactive: "actief",
    personAtCompany: "anawezig",
    companies: [],
    sites: [],
    startdate: new Date("2014-08-18T21:11:54"),
    enddate: new Date("2014-08-18T21:11:54"),
  });

  const personCreatedHandler = () => {
    setPersonCreated(true);
  };

  const personCreateAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setPersonCreated(false)}
      >
        <AiOutlineClose />
      </IconButton>
    </>
  );

  // Redux
  const dispatch = useDispatch();
  const { personsAddLoading } = useSelector(({ person }) => person);

  /** Handlers */
  const addPersonHandler = e => {
    e.preventDefault();
    const { message } = personFullNameValidation(personData.fullname);
    if (message) {
      setFullNameMessage(message);
      return;
    }
    dispatch(AddNewPersonsAction(personData));
  };

  const onFinish = values => {
    setTelefoonnummersArr(values);
  };

  const { Option } = Select;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const getStyles = (name, personName, theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  if (companiesLoading || isLoadingSites) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="mt-10">
        <div style={{ margin: "30px 0" }}>
          {/* {data?.message && <Alert severity="error">{data?.message}</Alert>} */}
        </div>
        <form onSubmit={addPersonHandler} className="add-person-form">
          <Grid container spacing={2} paddingLeft={2}>
            <Grid container xs={9} spacing={2}>
              <Grid item xs={8} md={8} marginBottom={3} className="mb-10 border-red-500 ">
                <TextField
                  error={!fullNameMessage?.length ? false : true}
                  id="outlined-basic"
                  label="volledige naam "
                  variant="outlined"
                  fullWidth
                  className="text-input"
                  value={personData.fullname}
                  onChange={e =>
                    setPersonData({
                      ...personData,
                      fullname: e.target.value,
                    })
                  }
                />
                {fullNameMessage.length ? (
                  <p className={`${fullNameMessage ? "text-red-700 font-bold mt-1" : ""}`}>
                    {fullNameMessage}
                  </p>
                ) : null}
              </Grid>
              <Grid item xs={4} md={4} className="mb-10 border-red-500 ">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Voorletter "
                  variant="outlined"
                  className="text-input"
                  value={personData.initials}
                  onChange={e =>
                    setPersonData({
                      ...personData,
                      initials: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid container spacing={2} marginBottom={5} paddingLeft={2}>
                <Grid item xs={4} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="voornaam "
                    variant="outlined"
                    className="text-input"
                    value={personData.firstname}
                    onChange={e =>
                      setPersonData({
                        ...personData,
                        firstname: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Tussenvoegsel "
                    variant="outlined"
                    className="text-input"
                    value={personData.nameprep}
                    onChange={e =>
                      setPersonData({
                        ...personData,
                        nameprep: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Achternaam "
                    variant="outlined"
                    className="text-input"
                    value={personData.surname}
                    onChange={e =>
                      setPersonData({
                        ...personData,
                        surname: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid style={{ height: 75 }} container spacing={2} paddingLeft={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Email adress "
                    variant="outlined"
                    className="text-input"
                    value={personData.emaddress}
                    onChange={e =>
                      setPersonData({
                        ...personData,
                        emaddress: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AddNewPhoneBtnWrapper>
                    <AddNewPhoneBtn
                      type="button"
                      numberLength
                      onClick={() => setAddPhoneNumModal(true)}
                    >
                      Add Phone
                    </AddNewPhoneBtn>
                    <AddNewPhoneBtn type="button" numberLength={false}>
                      View All Numbers
                    </AddNewPhoneBtn>
                  </AddNewPhoneBtnWrapper>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={3}>
              <UploadMedia />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} paddingLeft={2}>
            <Grid container xs={9} spacing={2}>
              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">Bedrijf</InputLabel>
                  <MaterialSelect
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personData.companies}
                    onChange={({ target: { value } }) =>
                      setPersonData({
                        ...personData,
                        companies: typeof value === "string" ? value.split(",") : value,
                      })
                    }
                    // company => [{name: "ddd", name: ""rrr}]
                    // company => [""]
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {companiesData?.data?.map(company => (
                      <MenuItem
                        key={company?.id}
                        value={company?.code}
                        style={getStyles(company?.name, bedridNaam, theme)}
                      >
                        {company?.name}
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">Vestiging</InputLabel>
                  <MaterialSelect
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personData.sites}
                    onChange={({ target: { value } }) =>
                      setPersonData({
                        ...personData,
                        sites: typeof value === "string" ? value.split(",") : value,
                      })
                    }
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {sitesData?.map(({ id, code, description }) => (
                      <MenuItem key={id} value={code} style={getStyles(code, bedridNaam, theme)}>
                        {description}
                      </MenuItem>
                    ))}
                  </MaterialSelect>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={3} className="field-below-avatar">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Group</InputLabel>
                <MaterialSelect
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={groupNaam}
                  //
                  onChange={({ target: { value } }) => {
                    setGroupNaam(typeof value === "string" ? value.split(",") : value);
                  }}
                  // company => [{name: "ddd", name: ""rrr}]
                  // company => [""]
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name} style={getStyles(name, bedridNaam, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </MaterialSelect>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1} paddingLeft={2}>
            <Grid container xs={9} spacing={2}>
              <Grid item xs={6} md={6}>
                <div className="mt-3">
                  <CheckboxElWithLabelWrap isDarkMode={isDarkMode}>
                    <RadioGroup
                      row
                      aria-label="actief"
                      defaultValue="actief"
                      name="radio-buttons-group"
                      value={personData.isactive}
                      onChange={e =>
                        setPersonData({
                          ...personData,
                          isactive: e.target.value,
                        })
                      }
                    >
                      <FormControlLabel value="actief" control={<Radio />} label="Actief" />
                      <FormControlLabel value="incatief" control={<Radio />} label="Inactief" />
                    </RadioGroup>
                  </CheckboxElWithLabelWrap>
                </div>
              </Grid>
              <Grid item xs={6} md={6}>
                <div className="mt-3">
                  <CheckboxElWithLabelWrap isDarkMode={isDarkMode}>
                    <RadioGroup
                      row
                      aria-label="gender"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={personData.personAtCompany}
                      onChange={e =>
                        setPersonData({
                          ...personData,
                          personAtCompany: e.target.value,
                        })
                      }
                    >
                      <FormControlLabel value="anawezig" control={<Radio />} label="Aanwezig" />
                      <FormControlLabel value="afwezig" control={<Radio />} label="Afwezig" />
                    </RadioGroup>
                  </CheckboxElWithLabelWrap>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3} className="field-below-avatar" />
          </Grid>

          <Grid container spacing={2} mt={2} paddingLeft={2}>
            <Grid container xs={9} spacing={2}>
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} style={{ padding: 8 }}>
                    <DesktopDatePicker
                      label="Startdatum"
                      inputFormat="dd/MM/yyyy"
                      value={personData.startdate}
                      onChange={value =>
                        setPersonData({
                          ...personData,
                          startdate: value,
                        })
                      }
                      renderInput={params => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} style={{ padding: 8 }}>
                    <DesktopDatePicker
                      label="Einddatum"
                      inputFormat="dd/MM/yyyy"
                      value={personData.enddate}
                      onChange={value =>
                        setPersonData({
                          ...personData,
                          enddate: value,
                        })
                      }
                      renderInput={params => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={3} className="field-below-avatar" />
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={9}>
              <CustomTextareaAutosize
                isDarkMode={isDarkMode}
                aria-label="empty textarea"
                placeholder="Opmerking"
                value={personData.remark}
                style={{ width: "98%" }}
                onChange={e =>
                  setPersonData({
                    ...personData,
                    remark: e.target.value,
                  })
                }
                minRows={6}
              />
            </Grid>
          </Grid>

          <CustomButton
            text={personsAddLoading ? "Loading..." : "Submit"}
            type="submit"
            style={{ marginTop: 30 }}
          />
        </form>
        <Snackbar
          open={personCreated}
          autoHideDuration={6000}
          onClose={personCreatedHandler}
          message={`Persoon wordt teogevoegd`}
          action={personCreateAction}
        />

        <Modal
          title="Voeg telefoonnummers toe "
          centered
          visible={addPhoneNumModal}
          footer={null}
          onOk={() => setAddPhoneNumModal(false)}
          onCancel={() => setAddPhoneNumModal(false)}
        >
          <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Form.List name="Telefoonnummers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        rules={[
                          {
                            required: true,
                            message: "Telefoonnummer type is verplict",
                          },
                        ]}
                      >
                        <Select
                          defaultValue="primair"
                          style={{ width: 220 }}
                          onChange={e => setPersonNumbers(e)}
                        >
                          <Option value="primair">Primair</Option>
                          <Option value="mobiel">Mobiel</Option>
                          <Option value="werk">Werk</Option>
                          <Option value="thuis">Thuis</Option>
                          <Option value="piepar">Piepar</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "telefoonnummer"]}
                        rules={[
                          {
                            required: true,
                            message: "Telefoonnummer is verplict",
                          },
                        ]}
                      >
                        <Input placeholder="Telefoonnummer" />
                      </Form.Item>
                      <HiOutlineMinusCircle onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<AiOutlinePlusCircle />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Telefoonnummer
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
};

export default memo(AddPersonTab);
