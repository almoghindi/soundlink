import React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Play from "../../components/Play";
const Details = ({ open, handleClose, user }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    backgroundColor: "black",
    color: "white",
    fontFamily: "Assistant",
    p: 4,
  };

  const [isPlayingSong1, setIsPlayingSong1] = React.useState(false);
  const [isPlayingSong2, setIsPlayingSong2] = React.useState(false);
  const [isPlayingSong3, setIsPlayingSong3] = React.useState(false);
  const [isPlayingSong4, setIsPlayingSong4] = React.useState(false);
  const handleTogglePlay1 = () => {
    setIsPlayingSong1((prevIsPlaying) => !prevIsPlaying);
    setIsPlayingSong2(false);
    setIsPlayingSong3(false);
    setIsPlayingSong4(false);
  };

  const handleTogglePlay2 = () => {
    setIsPlayingSong2((prevIsPlaying) => !prevIsPlaying);
    setIsPlayingSong1(false);
    setIsPlayingSong3(false);
    setIsPlayingSong4(false);
  };

  const handleTogglePlay3 = () => {
    setIsPlayingSong3((prevIsPlaying) => !prevIsPlaying);
    setIsPlayingSong1(false);
    setIsPlayingSong2(false);
    setIsPlayingSong4(false);
  };

  const handleTogglePlay4 = () => {
    setIsPlayingSong4((prevIsPlaying) => !prevIsPlaying);
    setIsPlayingSong1(false);
    setIsPlayingSong2(false);
    setIsPlayingSong3(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        {user && (
          <Box sx={style} display="flex">
            <div style={{ marginRight: "40px" }}>
              <Typography variant="h4" component="h2">
                {user.name}
              </Typography>
              <Typography variant="p" component="p">
                {user.profession} from {user.location}
              </Typography>
              <Typography
                variant="p"
                component="p"
                sx={{ mt: 0.3, fontSize: "14px", mb: 2 }}
              >
                Phone: {user.phone}
              </Typography>

              <Typography variant="p" sx={{ fontSize: "13px" }}>
                {user.description}{" "}
              </Typography>
            </div>
            {user.songs && (
              <div style={{ marginTop: "20px" }}>
                {/* Song 1 */}
                {user.songs[0] && (
                  <Play
                    song={user.songs[0]}
                    isPlay={isPlayingSong1}
                    handleTogglePlay={handleTogglePlay1}
                  />
                )}
                {/* Song 2 */}
                {user.songs[1] && (
                  <Play
                    song={user.songs[1]}
                    isPlay={isPlayingSong2}
                    handleTogglePlay={handleTogglePlay2}
                  />
                )}

                {/* Song 3 */}
                {user.songs[2] && (
                  <Play
                    song={user.songs[2]}
                    isPlay={isPlayingSong3}
                    handleTogglePlay={handleTogglePlay3}
                  />
                )}
                {user.songs[3] && (
                  <Play
                    song={user.songs[3]}
                    isPlay={isPlayingSong4}
                    handleTogglePlay={handleTogglePlay4}
                  />
                )}
              </div>
            )}
          </Box>
        )}
      </Fade>
    </Modal>
  );
};

export default Details;
