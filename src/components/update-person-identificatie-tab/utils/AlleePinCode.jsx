import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CustomTextareaAutosize } from "components/add-person-tab/styles";
import useFetchData from "hooks/useFetchData";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePinCodeAction } from "redux/persons/persons.actions";

const AlleePinCode = () => {
  const dispatch = useDispatch();
  const { isDarkMode, mainColor } = useSelector(({ ui }) => ui);
  const { generatePinCodeRequest, generatePinCodeSuccess } = useSelector(({ person }) => person);

  const { data, loading } = useFetchData(
    "https://devel.ident2be.com:1443/bd/idtype?navigate[limit]=25&navigate[page]=1&filter[inuse]=true"
  );

  const [reidKaart, setReidKaart] = useState({
    date: new Date("2014-08-18T21:11:54"),
    Kaartlayout: "",
    actief: "",
    opmerking: "",
    pincode: "",
  });

  const pinCodeGenerator = () => {
    dispatch(generatePinCodeAction());
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="w-9/12">
        <Grid item xs={6} md={12}>
          <div className="flex items-center">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Barcode "
              variant="outlined"
              className="text-input"
              value={generatePinCodeSuccess?.pin ? generatePinCodeSuccess?.pin : ""}
            />
            <button
              className="ml-3  text-white p-2 rounded-sm cursor-pointer w-32"
              style={{ backgroundColor: mainColor }}
              onClick={pinCodeGenerator}
            >
              {generatePinCodeRequest ? <CircularProgress size={20} color="inherit" /> : "Generate"}
            </button>
          </div>
        </Grid>
        <Grid container xs={12} spacing={2} mt={1}>
          <Grid item xs={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Startdatum"
                  inputFormat="dd/MM/yyyy"
                  value={reidKaart.date}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      date: e.target.value,
                    })
                  }
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Einddatum"
                  inputFormat="dd/MM/yyyy"
                  value={reidKaart.date}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      date: e.target.value,
                    })
                  }
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} mt={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Kaartlayout</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={reidKaart.Kaartlayout}
              onChange={e =>
                setReidKaart({
                  ...reidKaart,
                  Kaartlayout: e.target.value,
                })
              }
            >
              {data?.map(({ id, code, description }) => (
                <MenuItem key={id} value={code}>
                  {description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} mt={3} ml={1}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  className="mr-3"
                  value={reidKaart.actief}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      actief: e.target.value,
                    })
                  }
                />
              }
              label="Actief"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={9} mt={3}>
          <CustomTextareaAutosize
            isDarkMode={isDarkMode}
            aria-label="empty textarea"
            placeholder="Opmerking"
            style={{ width: "98%" }}
            value={reidKaart.opmerking}
            onChange={e =>
              setReidKaart({
                ...reidKaart,
                opmerking: e.target.value,
              })
            }
            minRows={6}
          />
        </Grid>
      </div>
    );
  }
};

export default AlleePinCode;
