import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";

const Play = ({ song, isPlay, handleTogglePlay }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          width: "21px",
          height: "21px",
          backgroundColor: "#8c46fe",
          borderRadius: "50%",
        }}
      >
        {isPlay ? (
          <PauseIcon sx={{ fontSize: "22px" }} onClick={handleTogglePlay} />
        ) : (
          <PlayArrowIcon sx={{ fontSize: "22px" }} onClick={handleTogglePlay} />
        )}
        <ReactPlayer
          className="react-player"
          url={song.url}
          width="0"
          height="0"
          playing={isPlay}
          playsinline={true}
          autoplay={false}
          muted={!isPlay}
          volume={0.3}
        />
      </div>
      <Typography variant="body2">{song.name}</Typography>
    </div>
  );
};

export default Play;
