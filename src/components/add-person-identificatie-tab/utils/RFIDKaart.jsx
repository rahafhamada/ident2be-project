import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
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
import { useSelector } from "react-redux";

const RFIDKaart = () => {
  const { isDarkMode, mainColor } = useSelector(({ ui }) => ui);
  const { data, loading } = useFetchData(
    "https://devel.ident2be.com:1443/bd/idtype?navigate[limit]=25&navigate[page]=1&filter[inuse]=true"
  );

  const [reidKaart, setReidKaart] = useState({
    code: "",
    validfrom: new Date("2014-08-18T21:11:54"),
    expiredate: new Date("2014-08-18T21:11:54"),
    persontypeid: "",
    isvalid: "",
    pin: "",
    remark: "",
  });

  const pinCodeGenerator = () => {
    let result = "";
    const alphaChars = "1234567890";
    const alphaCharsLength = alphaChars.length;
    for (let i = 0; i < 4; i++) {
      result += alphaChars.charAt(Math.floor(Math.random() * alphaCharsLength));
    }

    setReidKaart({
      ...reidKaart,
      pin: result,
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="w-9/12">
        <Grid item xs={6} md={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="voornaam "
            variant="outlined"
            className="text-input"
            value={reidKaart.code}
            onChange={e =>
              setReidKaart({
                ...reidKaart,
                code: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={6} md={12} mt={3}>
          <div className="flex items-center">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Pincode "
              variant="outlined"
              className="text-input"
              value={reidKaart.pin}
              onChange={e =>
                setReidKaart({
                  ...reidKaart,
                  pin: e.target.value,
                })
              }
            />
            <button
              className="ml-3  text-white p-2 rounded-sm cursor-pointer"
              style={{ backgroundColor: mainColor }}
              onClick={pinCodeGenerator}
            >
              Generate
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
                  value={reidKaart.validfrom}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      validfrom: e,
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
                  value={reidKaart.expiredate}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      expiredate: e,
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
              value={reidKaart.persontypeid}
              onChange={e =>
                setReidKaart({
                  ...reidKaart,
                  persontypeid: e.target.value,
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
                  value={reidKaart.isvalid}
                  onChange={e =>
                    setReidKaart({
                      ...reidKaart,
                      isvalid: e.target.value,
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
            value={reidKaart.remark}
            onChange={e =>
              setReidKaart({
                ...reidKaart,
                remark: e.target.value,
              })
            }
            minRows={6}
          />
        </Grid>
      </div>
    );
  }
};

export default RFIDKaart;
