import React, { useState, useContext, useEffect } from "react";
import ProfileCard from "../profile/card/index";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import UndoIcon from "@mui/icons-material/Undo";
import SettingsIcon from "@mui/icons-material/Settings";
import Confetti from "react-confetti";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import InfoIcon from "@mui/icons-material/Info";
import { encryptArray, decryptArray } from "../../utils/Encryption";
import FiltersDialog from "./FiltersDialog";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/useHttp";
import BoxImg from "../../assets/openbox.jpg";
import "./style.css";

const Swipe = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = React.useState();
  const [filteredUsers, setFilteredUsers] = React.useState();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [likedCards, setLikedCards] = useState([]);
  const [dislikedCards, setDislikedCards] = useState([]);
  const [prevCardState, setPrevCardState] = useState(null);
  const [emptyStack, setEmptyStack] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Global");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [collabs, setCollabs] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}matches/${userId}`
        );
        setLoadedUsers(responseData.recommendedUsers);
        setFilteredUsers(responseData.recommendedUsers);
      } catch (err) {}
    };
    fetchUsers();
    if (loadedUsers) {
      setEmptyStack(true);
    }
    setCurrentCardIndex(0);
  }, [userId]);

  const handleLike = () => {
    setLikedCards([
      ...likedCards,
      { _id: filteredUsers[currentCardIndex]._id, likedAd: Date.now() },
    ]);

    showNextCard();
  };

  const handleDislike = () => {
    setDislikedCards([
      ...dislikedCards,
      { _id: filteredUsers[currentCardIndex]._id, dislikedAd: Date.now() },
    ]);

    showNextCard();
  };

  const handleUndo = () => {
    if (prevCardState) {
      setCurrentCardIndex(prevCardState.currentIndex);
      if (likedCards.length > 0 && collabs.length > 0) {
        if (
          likedCards[likedCards.length - 1]._id ===
          collabs[collabs.length - 1].user2Id
        ) {
          setCollabs(collabs.slice(0, -1));
        }
      }
      setLikedCards(prevCardState.likedCards);
      setDislikedCards(prevCardState.dislikedCards);
      setPrevCardState(null); // Reset prevCardState after undo
    }
  };

  const showNextCard = () => {
    if (currentCardIndex < filteredUsers.length - 1) {
      setPrevCardState({
        currentIndex: currentCardIndex,
        likedCards: [...likedCards],
        dislikedCards: [...dislikedCards],
      });

      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setEmptyStack(true);
      console.log("All cards shown!");
    }
  };

  const handleOpenFilterDialog = () => {
    setIsFilterOpen(true);
  };
  const handleCloseFilterDialog = () => {
    setIsFilterOpen(false);
  };

  const handleSwipe = async () => {
    try {
      const liked = decryptArray(localStorage.getItem("liked"));
      const disliked = decryptArray(localStorage.getItem("disliked"));
      if (liked || disliked) {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}matches/swipe`,
          "POST",
          JSON.stringify({
            myId: userId,
            liked,
            disliked,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      }
      localStorage.removeItem("liked");
      localStorage.removeItem("disliked");
    } catch (err) {}
  };

  const handleCollabs = async () => {
    try {
      const collabs = decryptArray(localStorage.getItem("collabs"));
      if (collabs) {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}matches/new-collabs`,
          "POST",
          JSON.stringify({
            collabs,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      }
      localStorage.removeItem("collabs");
    } catch (err) {}
  };

  useEffect(() => {
    const encryptedDisArray = encryptArray(likedCards);
    localStorage.setItem("liked", JSON.stringify(encryptedDisArray));
    const encryptedLikArray = encryptArray(dislikedCards);
    localStorage.setItem("disliked", JSON.stringify(encryptedLikArray));
  }, [likedCards, dislikedCards]);

  useEffect(() => {
    const encryptedCollabsArray = encryptArray(collabs);
    localStorage.setItem("collabs", JSON.stringify(encryptedCollabsArray));
  }, [collabs]);

  useEffect(() => {
    return () => {
      handleSwipe();
      handleCollabs();
    };
  }, []);

  const isCollab = (swipedUser) => {
    const isAlreadyCollab = collabs.some(
      (collab) => collab.user1Id === userId && collab.user2Id === swipedUser._id
    );
    if (
      swipedUser.ILiked.some((liked) => liked._id === userId) &&
      !isAlreadyCollab
    ) {
      setCollabs([
        ...collabs,
        {
          user1Id: userId,
          user2Id: swipedUser._id,
          collabAt: Date.now(),
        },
      ]);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      handleOpenCollabDialog();
    }
  };

  useEffect(() => {
    if (likedCards.length > 0 && loadedUsers) {
      const likedUser = loadedUsers.find(
        (user) => user._id === likedCards[likedCards.length - 1]._id
      );
      isCollab(likedUser);
    }
  }, [likedCards]);

  const handleApplyFilters = () => {
    let filteredByGenre = [];
    if (selectedGenres.length > 0) {
      filteredByGenre = loadedUsers.filter((user) => {
        return (
          user.genres.some((userGenre) => selectedGenres.includes(userGenre)) &&
          !likedCards.some((likedUser) => likedUser._id === user._id) &&
          !dislikedCards.some((dislikedUser) => dislikedUser._id === user._id)
        );
      });
    } else {
      filteredByGenre = [...loadedUsers];
    }

    const filteredByArea = filteredByGenre.filter((user) => {
      if (selectedArea === "Country") {
        // return user.location === currentUserLocation;
      }
      return true;
    });

    setFilteredUsers(filteredByArea);
  };

  const handleOpenCollabDialog = () => {
    setIsMatch(true);
  };

  const handleCloseCollabDialog = () => {
    setIsMatch(false);
  };

  return (
    <>
      {" "}
      {isLoading && <LoadingSpinner />}
      {showConfetti && (
        <Confetti
          className="fade-out-confetti"
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.2}
        />
      )}
      <div className="swipe-page">
        {!emptyStack && (
          <div className="swipe-div">
            <div
              style={{
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div className="swipe-buttons">
                <button
                  onClick={handleOpenFilterDialog}
                  className="settings-btn"
                >
                  <SettingsIcon style={{ fontSize: "1.5rem" }} />
                </button>

                <button className="swipe-button" onClick={handleDislike}>
                  <ThumbDownIcon style={{ fontSize: "1.5rem" }} />
                </button>
                <button className="swipe-button" onClick={handleUndo}>
                  <UndoIcon style={{ fontSize: "1.5rem" }} />
                </button>
                <button className="swipe-button" onClick={handleLike}>
                  <ThumbUpIcon style={{ fontSize: "1.5rem" }} />
                </button>
              </div>
            </div>
            <div className="tinder-card">
              {filteredUsers && (
                <ProfileCard
                  name={filteredUsers[currentCardIndex]?.name}
                  profession={filteredUsers[currentCardIndex]?.profession}
                  location={filteredUsers[currentCardIndex]?.location}
                  description={filteredUsers[currentCardIndex]?.description}
                  genres={filteredUsers[currentCardIndex]?.genres}
                  imgUrl={filteredUsers[currentCardIndex]?.imageUrl}
                  songs={filteredUsers[currentCardIndex]?.songs}
                />
              )}
              {/* <ProfileCard description={cardsArray[currentCardIndex]} /> */}
            </div>
          </div>
        )}
        {emptyStack && (
          <div>
            <h1 style={{ color: "white" }}>
              Stack empty! please come back later to another swipes
            </h1>
            <img width="380px" src={BoxImg} alt="box" />
          </div>
        )}
        <FiltersDialog
          isOpen={isFilterOpen}
          handleCloseDialog={handleCloseFilterDialog}
          onApplyFilters={handleApplyFilters}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
        <Snackbar
          open={isMatch}
          autoHideDuration={3000}
          TransitionComponent={Fade}
          onClose={handleCloseCollabDialog}
          anchororigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseCollabDialog}
            severity="info"
            sx={{ backgroundColor: "black", color: "white" }}
            icon={<InfoIcon style={{ color: "#8c46fe" }} />}
          >
            <strong>Now:</strong> You have a match!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Swipe;
