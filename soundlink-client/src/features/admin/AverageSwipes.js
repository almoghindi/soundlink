import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useHttpClient } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner";

const AverageSwipes = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [averageSwipesData, setAverageSwipesData] = useState([]);

  useEffect(() => {
    const fetchAverageSwipes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}admin/average-swipes`
        );
        setAverageSwipesData(responseData);
      } catch (err) {}
    };

    fetchAverageSwipes();
  }, []);

  const legendPayload = [
    {
      value: "Average Swipes",
      type: "square",
      color: "#8884d8",
    },
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && averageSwipesData && (
        <BarChart
          width={500}
          height={300}
          data={averageSwipesData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend payload={legendPayload} />
          <Bar dataKey="value" fill="#8884d8" barSize={20} />
        </BarChart>
      )}
    </>
  );
};

export default AverageSwipes;
