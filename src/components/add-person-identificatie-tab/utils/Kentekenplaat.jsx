import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { FormControlLabel, FormGroup, Grid, Stack, TextField } from "@mui/material";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CustomTextareaAutosize } from "components/add-person-tab/styles";
import { useState } from "react";
import { useSelector } from "react-redux";

const Kentekenplaat = () => {
  const { isDarkMode } = useSelector(({ ui }) => ui);
  const [reidKaart, setReidKaart] = useState({
    code: "",
    date: new Date("2014-08-18T21:11:54"),
    Kaartlayout: "",
    actief: "",
    opmerking: "",
    pincode: "",
  });
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
};

export default Kentekenplaat;
