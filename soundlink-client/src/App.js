import "./App.css";
import React, { lazy, Suspense } from "react";
import Header from "./layout/header/index";
import Footer from "./layout/footer/index";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner";
// Lazy-loaded components
import LandingPage from "./pages/LandingPage/index";
const Profile = lazy(() => import("./pages/profile"));
const Collabs = lazy(() => import("./pages/Collabs/index"));
const AboutUs = lazy(() => import("./pages/AboutUs/index"));
const QA = lazy(() => import("./pages/QA/index"));
const LaunchingPage = lazy(() => import("./pages/LaunchingPage/index"));
const Swipe = lazy(() => import("./features/swipe/index"));
const EnterPassword = lazy(() =>
  import("./features/auth/resetPassword/EnterPassword")
);
const EditProfile = lazy(() => import("./features/profile/edit/index"));
const AdminPage = lazy(() => import("./pages/Admin"));
function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          isAdmin: isAdmin,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {isAdmin && <Route path="/admin" element={<AdminPage />} />}
              <Route path="/swipe" element={<Swipe />} />
              {token ? (
                <>
                  <Route path="/" element={<LaunchingPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/collabs" element={<Collabs />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/resetpassword/:userId"
                    element={<EnterPassword />}
                  />
                </>
              )}
              {/* <Route path="/launch" element={<LaunchingPage />} /> */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/q&a" element={<QA />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
