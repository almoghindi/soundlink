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

const CollabsCount = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [collabCounts, setCollabCounts] = useState([]);

  useEffect(() => {
    const fetchCollabCounts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}admin/total-collabs`
        );

        const formattedData = responseData.map((item) => ({
          name: item.name.replace("last", ""),
          Collabs: item.value,
        }));
        setCollabCounts(formattedData);
      } catch (err) {}
    };

    fetchCollabCounts();
  }, []);

  const legendPayload = [
    {
      value: "Total Collabs",
      type: "square",
      color: "#8c46fe",
    },
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <BarChart
          width={500}
          height={300}
          data={collabCounts}
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
          <Bar dataKey="Collabs" fill="#8c46fe" />
        </BarChart>
      )}
    </>
  );
};

export default CollabsCount;
