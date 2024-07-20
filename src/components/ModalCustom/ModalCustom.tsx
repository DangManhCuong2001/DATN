import { ClearRounded } from "@mui/icons-material";
import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useModalContext } from "../../context/modal-contex/modal-context";

export default function ModalCustom() {
  const { open, closeModal, content, title, width } = useModalContext();
  function closeDialog() {
    closeModal();
  }
  console.log(open);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      scroll="paper"
      // maxWidth={options?.maxWidth || 'xsm'}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%!important",
          margin: "0!important",
          width: width ? width : "380px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
          alignItems: "center",
          px: { xs: 2, xsm: 4.5 },
        }}
      >
        <Typography variant="subtitle1" color={"text.primary"}>
          {title}
        </Typography>
        <ClearRounded
          onClick={closeDialog}
          sx={{
            color: (theme) => {
              return theme.palette.mode == "dark" ? "#4CADD3" : "#595F5A";
            },
            fontSize: "30px",
            cursor: "pointer",
          }}
        />
      </DialogTitle>
      {content}
    </Dialog>
  );
}
