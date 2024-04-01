import React, { useContext, useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Switch from "../../components/Switch";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// project imports
import UpgradePlanCard from "./UpgradePlanCard";

import {
  IconLogout,
  IconSettings,
  IconUser,
  IconLink,
  IconShieldLock,
} from "@tabler/icons-react";
import styled from "styled-components";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/useHttp";

// ==============================|| PROFILE MENU ||============================== //

const StyledPopper = styled(Popper)`
  right: 10px;

  @media (max-width: 480px) {
    right: 3%;
  }
`;

const ProfileSection = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const isAdmin = auth.isAdmin;

  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUser, setLoadedUser] = React.useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}users/${userId}`
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [userId]);

  const theme = useTheme();
  const navigate = useNavigate();

  const [notification, setNotification] = useState(false);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, route = "") => {
    handleClose(event);

    if (route && route !== "") {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: "#391f66",
          backgroundColor: "#391f66",
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: "#180c2a",
            background: `${"#180c2a"}!important`,
            color: "#391f66",
            "& svg": {
              stroke: "#391f66",
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <img
            alt="Profile Picture"
            src={loadedUser?.imageUrl}
            style={{
              height: "35px",
              width: "35px",
              borderRadius: "50%",
              // margin: "8px 0 8px 8px !important",
              marginRight: "3px",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color="#180c2a" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <StyledPopper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{
          zIndex: 1302,
          left: "auto",
          top: "70px",
        }}
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
        anchororigin={{
          vertical: "bottom",
          horizontal: "end",
        }}
        transformorigin={{
          vertical: "top",
          horizontal: "end",
        }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -20 }}
            >
              <Paper
                sx={{
                  background: "#180c2a", // Background color
                  color: "white", // Text color
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <motion.div
                    initial={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: -20 }}
                    sx={{
                      p: 2,
                      fontFamily: "'Assistant', sans-serif", // Set font family
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        maxWidth: "300px", // Set a maximum width
                      }}
                    >
                      <Stack>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Assistant', sans-serif", // Set font family
                              textAlign: "center",
                              "& span": {
                                fontWeight: 400, // Adjust the value as needed
                              },
                            }}
                          >
                            {getGreeting()}, {loadedUser && loadedUser.name}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontFamily: "'Assistant', sans-serif", // Set font family
                          }}
                        >
                          {loadedUser && loadedUser.profession}
                        </Typography>
                      </Stack>
                      <Divider sx={{ background: "white" }} />
                    </Box>

                    <Box sx={{ p: 2 }}>
                      <UpgradePlanCard />
                      <Divider />
                      <Card
                        sx={{
                          bgcolor: "black",
                          my: 2,
                        }}
                      >
                        <CardContent>
                          <Grid item>
                            <Grid
                              item
                              container
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Typography
                                  variant="subtitle1"
                                  color="white"
                                  sx={{
                                    fontFamily: "'Assistant', sans-serif", // Set font family
                                  }}
                                >
                                  Allow Notifications
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Switch
                                // checked={notification}
                                // onChange={(e) =>
                                //   setNotification(e.target.checked)
                                // }
                                // name="sdm"
                                // size="small"
                                // color="secondary"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: "black",
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        {isAdmin && (
                          <ListItemButton
                            // selected={selectedIndex === 0}
                            onClick={(event) =>
                              handleListItemClick(event, "/admin")
                            }
                          >
                            <ListItemIcon>
                              <IconShieldLock
                                stroke={1.5}
                                size="1.3rem"
                                color="white"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontFamily: "'Assistant', sans-serif", // Set font family
                                  }}
                                >
                                  Admin
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        )}
                        <ListItemButton
                          // selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, "/collabs")
                          }
                        >
                          <ListItemIcon>
                            <IconLink
                              stroke={1.5}
                              size="1.3rem"
                              color="white"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "'Assistant', sans-serif", // Set font family
                                }}
                              >
                                Collabs
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          onClick={(event) =>
                            handleListItemClick(event, "/edit-profile")
                          }
                        >
                          <ListItemIcon>
                            <IconSettings
                              stroke={1.5}
                              size="1.3rem"
                              color="white"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "'Assistant', sans-serif", // Set font family
                                }}
                              >
                                Account Settings
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          // selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, "/profile")
                          }
                        >
                          <ListItemIcon>
                            <IconUser
                              stroke={1.5}
                              size="1.3rem"
                              color="white"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontFamily: "'Assistant', sans-serif", // Set font family
                                    }}
                                  >
                                    Social Profile
                                  </Typography>
                                </Grid>
                                <Grid item></Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton onClick={auth.logout}>
                          <ListItemIcon>
                            <IconLogout
                              stroke={1.5}
                              size="1.3rem"
                              color="white"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontFamily: "'Assistant', sans-serif", // Set font family
                                }}
                              >
                                Logout
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </motion.div>
                </ClickAwayListener>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </StyledPopper>
    </>
  );
};

export default ProfileSection;
