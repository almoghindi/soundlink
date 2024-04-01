import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import "./style.css";
import ContainerPlays from "../../../components/ContainerPlays";
const ProfileCard = ({
  name,
  profession,
  location,
  description,
  genres,
  imgUrl,
  songs,
  isSwipe,
}) => {
  return (
    <Card className="card-container" style={{ backgroundColor: "black" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ display: { xs: "block", md: "none" } }}>
          <div className="profile-img-container">
            <img src={imgUrl} alt="Profile Picture" className="profile-img" />
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ backgroundColor: "black", color: "white" }}
          className="card"
        >
          <CardContent className="profile-details">
            <h1 className="card-title">{name}</h1>
            <div style={{ fontFamily: "Assistant" }}>
              <Typography variant="p" gutterBottom>
                {profession} from {location}
              </Typography>
            </div>

            {/* Tags */}
            <div className="subgenre-container">
              {genres &&
                genres.map((genre) => (
                  <div className="subgenre" key={genre}>
                    {genre}
                  </div>
                ))}
            </div>

            <Typography variant="h6" gutterBottom sx={{ margin: 0 }}>
              Description:
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>

            <ContainerPlays songs={songs} />
          </CardContent>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <div className="profile-img-container">
            <img src={imgUrl} alt="Profile Picture" className="profile-img" />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard;
