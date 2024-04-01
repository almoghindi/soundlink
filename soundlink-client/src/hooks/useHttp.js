import { useState, useCallback, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth-context";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const auth = useContext(AuthContext);
  const token = auth.token;

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        authorization: token,
      }
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = axios.CancelToken.source();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios({
          method: method,
          url: url,
          data: body,
          headers: headers,
          cancelToken: httpAbortCtrl.token,
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        setIsLoading(false);
        return response.data;
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) =>
        abortCtrl.cancel("React component unmounted.")
      );
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
