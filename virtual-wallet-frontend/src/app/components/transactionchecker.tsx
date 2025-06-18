import React from "react";

type TransactionCheckerProps = {
  transaction_id: string;
};

export default function TransactionChecker({ transaction_id }: TransactionCheckerProps) {
  const [status, setStatus] = React.useState<null | boolean>(null);

  const checkTransaction = async () => {
    try {
        console.log(`/api/v1/users/confirmations/check/${transaction_id}/`);
      const req = await fetch(`/api/v1/users/confirmations/check/${transaction_id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (req.ok) {
        const data = await req.json();
        setStatus(data.result === true); // true = approved, false = pending
      } else {
        setStatus(null); // error state
      }
    } catch (error) {
      console.error("Error checking transaction:", error);
      setStatus(null);
    }
  };

  React.useEffect(() => {
    checkTransaction(); // initial check
    const interval = setInterval(checkTransaction, 3000); // every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [transaction_id]);

  return (
    <div>
      {status === true && <label>Transaction approved</label>}
      {status === false && <label>Transaction pending</label>}
      {status === null && <label>Checking transaction...</label>}
    </div>
  );
}
