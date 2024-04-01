import ProfileCard from "../features/profile/card/index";
import React, { useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/useHttp";

const Profile = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
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

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="page-container" style={{ backgroundColor: " #201139" }}>
        <div
          className="card-container"
          style={{ backgroundColor: " #201139", marginTop: "80px" }}
        >
          <ProfileCard
            name={loadedUser?.name}
            profession={loadedUser?.profession}
            location={loadedUser?.location}
            description={loadedUser?.description}
            genres={loadedUser?.genres}
            imgUrl={loadedUser?.imageUrl}
            songs={loadedUser?.songs}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
