import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/useHttp";
import Collab from "./Collab";
import LoadingSpinner from "../../components/LoadingSpinner";

const CollabPage = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const { isLoading, sendRequest } = useHttpClient();

  const [loadedCollabs, setLoadedCollabs] = useState();

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}matches/my-collabs/${userId}`
        );
        setLoadedCollabs(responseData.collabPartners);
      } catch (err) {}
    };
    fetchCollabs();
  }, []);
  return (
    <>
      {" "}
      {isLoading && <LoadingSpinner />}
      <div className="collabs">
        <h1 className="title">Collabs</h1>
        <div className="collabs-container">
          {loadedCollabs &&
            loadedCollabs.map((collab) => (
              <Collab key={collab._id} user={collab} />
            ))}
        </div>
      </div>
    </>
  );
};
export default CollabPage;
