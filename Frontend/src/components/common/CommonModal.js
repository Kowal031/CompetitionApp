import { Button, Modal, Box } from "@mui/material";

export function CommonModal({ openModal, handleClose, children }) {
  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={openModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}
