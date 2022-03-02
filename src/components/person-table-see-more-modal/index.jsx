import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const PersonTableSeeMoreTable = ({ open, setOpen, array, isArrOfObj }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Click to Copy!
          </Typography>
          {array?.map((el, idx) => (
            <CopyToClipboard text={isArrOfObj ? el?.name : el} onCopy={() => setCopied(true)}>
              <div
                key={idx}
                className=" rounded-md p-3 text-white text-sm font-bold cursor-pointer mb-2 break-all w-fit"
                style={{ backgroundColor: "rgb(179 178 175)" }}
              >
                {isArrOfObj ? el?.name : el}
              </div>
            </CopyToClipboard>
          ))}
        </Box>
      </Modal>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to Clipboard!"
      />
    </div>
  );
};

export default PersonTableSeeMoreTable;
