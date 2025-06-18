'use client';
import React from "react";

type Balance = {
  currency_code: string;
  amount: string;
};

export default function Dashboard() {
  const [balances, setBalances] = React.useState<Balance[] | null>(null);

  const getBalances = async () => {
    try {
      const req = await fetch("/api/v1/balances/me/");
      if (req.status === 200) {
        const req_result = await req.json();
        if (Array.isArray(req_result)) {
          setBalances(req_result);
        }
      }
    } catch (err) {
      console.error("Failed to fetch balances", err);
    }
  };

  React.useEffect(() => {
    getBalances();
  }, []);

  return (
    <div id="logindiv">
        <label>Your finances</label>
      {balances ? (
        balances.map((balance, index) => (
          <div key={index}>
            <label>Currency : {balance.currency_code}</label> <label>Amount :{balance.amount}</label>
          </div>
        ))
      ) : (
        <div>Loading balances...</div>
      )}
    </div>
  );
}
