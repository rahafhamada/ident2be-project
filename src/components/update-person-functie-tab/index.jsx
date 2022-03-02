import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { CustomTextareaAutosize } from "components/add-person-tab/styles";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddPersonFunctieTab = () => {
  const [BVH, setBVH] = useState(false);
  const [BVHMessage, setBVHMessage] = useState("");
  const { isDarkMode } = useSelector(({ ui }) => ui);

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...label} onChange={e => setBVH(!BVH)} />}
          label="BVH"
        />
      </FormGroup>
      {BVH && (
        <CustomTextareaAutosize
          isDarkMode={isDarkMode}
          aria-label="empty textarea"
          placeholder="Opmerking"
          value={BVHMessage}
          style={{ width: "50%", marginTop: 20 }}
          onChange={e => setBVHMessage(e.target.value)}
          minRows={6}
        />
      )}
    </div>
  );
};

export default AddPersonFunctieTab;
