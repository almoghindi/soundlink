import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Details from "./Details";
import "./style.css";

const Collab = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={2}
        onClick={handleOpen}
        sx={{ cursor: "pointer" }}
      >
        {user && (
          <div className="collab">
            <img src={user.imageUrl} alt={user.name} className="collab-img" />
            <Typography
              color="textPrimary"
              align="center"
              fontFamily="Assistant"
            >
              {user.name}
            </Typography>
          </div>
        )}
      </Grid>
      <Details open={open} handleClose={handleClose} user={user} />
    </>
  );
};

export default Collab;
