import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { Button } from "@mui/material";
import AuthDialog from "../../features/auth/Dialog";
import { AuthContext } from "../../context/auth-context";
import BurgerMenu from "../../components/Menu";
import ProfileSection from "./ProfileSection";
const pages = ["About", "Q&A"];

function ResponsiveAppBar() {
  const auth = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenAuthDialog = () => {
    setIsOpen(true);
  };
  const handleCloseAuthDialog = () => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (auth.token) {
      handleCloseAuthDialog();
    }
  }, [auth]);

  return (
    <>
      <AppBar sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "none", sm: "block" },
              }}
            >
              <Logo />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
              <BurgerMenu pages={pages} isLeft={true} />
            </Box>
            <Box
              sx={{
                flexGrow: 2,
                display: { xs: "block", sm: "none" },
              }}
            >
              <Logo />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
              <NavLinks pages={pages} />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {auth.token ? (
                // <BurgerMenu pages={settings} isLeft={false} isAccount={true} />
                <ProfileSection />
              ) : (
                <Button
                  sx={{ color: "white", fontFamily: "Assistant" }}
                  onClick={handleOpenAuthDialog}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthDialog
        handleCloseAuthDialog={handleCloseAuthDialog}
        isOpen={isOpen}
      />
    </>
  );
}
export default ResponsiveAppBar;
