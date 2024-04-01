import { useState, useCallback, useEffect } from "react";
import { encryptObject, decryptObject } from "../utils/Encryption";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((uid, token, isAdmin) => {
    setToken(token);
    setUserId(uid);
    setIsAdmin(isAdmin);
    const tokenExpirationDate = new Date(
      new Date().getTime() + 1000 * 60 * 60 * 24
    );
    setTokenExpirationDate(tokenExpirationDate);
    const userData = {
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString(),
      isAdmin: isAdmin,
    };
    const encryptedUserData = encryptObject(userData);
    localStorage.setItem("userData", encryptedUserData);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setIsAdmin(false);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const decryptedUserData = decryptObject(storedData);
      if (decryptedUserData && decryptedUserData.token && decryptedUserData.isAdmin) {
        login(
          decryptedUserData.userId,
          decryptedUserData.token,
          decryptedUserData.isAdmin
        );
      }
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId, isAdmin };
};
