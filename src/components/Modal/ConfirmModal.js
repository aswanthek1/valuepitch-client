import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { deleteFormData } from "../Api/EditDetailsApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "white",
  border: "1px solid white",
  borderRadius: "9px",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({ open, setOpen, userId, refresh, setRefreshState }) => {
  const deleteDetails = async (userId) => {
    await deleteFormData(userId)
      .then((response) => {
        if (response.data) {
          setRefreshState(!refresh);
          setOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                color="red"
              >
                <b> Are you sure ?</b>
              </Typography>
              <Box>
                <Button
                  onClick={() => deleteDetails(userId)}
                  variant="contained"
                  color="error"
                  sx={{ marginTop: "30px" }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "20px", marginTop: "30px" }}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
