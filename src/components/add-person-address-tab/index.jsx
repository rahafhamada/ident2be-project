import { Grid, TextField } from "@mui/material";
import { useState } from "react";

const AddPersonAddressesTab = () => {
  const [personAddress, setPersonAddresses] = useState({
    streetdetail: "",
    postcode: "",
    map: "",
    street: "",
    houseno: "",
    housenoext: "",
    city: "",
  });
  return (
    <div className="w-3/5">
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.streetdetail}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                streetdetail: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.postcode}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                postcode: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.map}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                map: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.street}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                street: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.houseno}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                houseno: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Achternaam "
            variant="outlined"
            className="text-input"
            value={personAddress.housenoext}
            onChange={e =>
              setPersonAddresses({
                ...personAddress,
                housenoext: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Achternaam "
          variant="outlined"
          className="text-input"
          value={personAddress.city}
          onChange={e =>
            setPersonAddresses({
              ...personAddress,
              city: e.target.value,
            })
          }
        />
      </Grid>
      <button className="bg-yellow-500 text-white">Next </button>
    </div>
  );
};

export default AddPersonAddressesTab;
