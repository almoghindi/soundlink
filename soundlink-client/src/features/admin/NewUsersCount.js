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
import { useHttpClient } from "../../hooks/useHttp"; // Assuming this is your custom hook for HTTP requests
import LoadingSpinner from "../../components/LoadingSpinner"; // Assuming you have a LoadingSpinner component

const NewUsersCount = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [newUsersData, setNewUsersData] = useState([]);

  useEffect(() => {
    const fetchNewUsersCount = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}admin/total-new-users` // Adjust the endpoint as needed
        );
        // Transform the response data to match the expected format for recharts
        const formattedData = responseData.map((item) => ({
          name: item.name.replace("last", ""), // Formatting the period names for better readability
          NewUsers: item.value, // Using 'NewUsers' as the key for the bar chart
        }));
        setNewUsersData(formattedData);
      } catch (err) {}
    };

    fetchNewUsersCount();
  }, []);

  const legendPayload = [
    {
      value: "New Users",
      type: "square",
      color: "#FF509E",
    },
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <BarChart
          width={500}
          height={300}
          data={newUsersData}
          margin={{
            top: 20,
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
          <Bar dataKey="NewUsers" fill="#FF509E" />
        </BarChart>
      )}
    </>
  );
};

export default NewUsersCount;
