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

const VirtualID = () => {
  const { isDarkMode, mainColor } = useSelector(({ ui }) => ui);
  const { data, loading } = useFetchData(
    "https://devel.ident2be.com:1443/bd/idtype?navigate[limit]=25&navigate[page]=1&filter[inuse]=true"
  );

  const [reidKaart, setReidKaart] = useState({
    code: "",
    date: new Date("2014-08-18T21:11:54"),
    Kaartlayout: "",
    actief: "",
    opmerking: "",
    pincode: "",
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
      pincode: result,
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
            value={reidKaart.name}
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
              value={reidKaart.pincode}
              onChange={e =>
                setReidKaart({
                  ...reidKaart,
                  pincode: e.target.value,
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

export default VirtualID;
