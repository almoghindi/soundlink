import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const ProfessionSplitChart = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}admin/user-count-by-profession`
        );
        setLoadedData(responseData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  const COLORS = [
    "#8c46fe",
    "#FF509E",
    "#A28",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
    "#D9E021",
  ];

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {loadedData && (
        <PieChart width={500} height={400}>
          <Pie
            data={loadedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {loadedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </>
  );
};

export default ProfessionSplitChart;
