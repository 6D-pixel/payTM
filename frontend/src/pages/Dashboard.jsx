import { useState, useEffect } from "react";
import AppBar from "../component/AppBar";
import Balance from "../component/Balance";
import Users from "../component/User";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(response.data.balance.toFixed(2));
    };
    fetchBalance();
  }, [balance]);
  return (
    <div>
      <AppBar />
      <Balance value={balance} />
      <Users />
    </div>
  );
};

export default Dashboard;
