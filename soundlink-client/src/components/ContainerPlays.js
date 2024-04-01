import React from "react";
import Play from "./Play";

const ContainerPlays = ({ songs }) => {
  const [isPlaying, setIsPlaying] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const handleTogglePlay = (index) => {
    setIsPlaying((prevState) =>
      prevState.map((prev, i) => (i === index ? !prev : false))
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Render song plays */}
      {songs &&
        songs.map((song, index) => (
          <Play
            key={index}
            song={song}
            isPlay={isPlaying[index]}
            handleTogglePlay={() => handleTogglePlay(index)}
          />
        ))}
    </div>
  );
};

export default ContainerPlays;
