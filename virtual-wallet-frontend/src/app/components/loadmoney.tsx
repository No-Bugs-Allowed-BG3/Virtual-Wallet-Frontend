'use client'
import React from "react";

export default function LoadMoney() {
        const [moneyReqResult,setMoneyReqResult] = React.useState(false);
        class LoadMoneyReq {
            card_number:string;
            currency_code:string;
            cvv_code:string;
            expiry:string;
            amount:string;

            constructor(card_number:string,currency_code:string,cvv_code:string,amount:string,expiry:string) {
                this.card_number=card_number;
                this.currency_code=currency_code;
                this.cvv_code=cvv_code;
                this.expiry=expiry;
                this.amount=amount;
            }
        }
        const loadMoney = async () => {
            const card_number = (document.getElementById("card_number") as HTMLInputElement).value;
            const cvv_code = (document.getElementById("card_cvv") as HTMLInputElement).value;
            const expiry = (document.getElementById("card_expiry") as HTMLInputElement).value;
            const currency = (document.getElementById("currency") as HTMLInputElement).value;
            const amount = (document.getElementById("amount") as HTMLInputElement).value;
            const loadMoneyReq:LoadMoneyReq = new LoadMoneyReq(card_number,currency,cvv_code,amount,expiry);
            const bodyContents = JSON.stringify(loadMoneyReq);
            const req = await fetch("/api/v1/users/me/cards/cards/load",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:bodyContents,
            });
            if ( req.status == 200) {
                setMoneyReqResult(true);
            }
            else {
                setMoneyReqResult(false);
            }
        }
    return(
        <div id="logindiv">
            <label>Card number</label>
            <input type="number" id="card_number"></input>
            <label>CVV Code</label>
            <input type="password" id="card_cvv"></input>
            <label>Expiry</label>
            <input type="text" id="card_expiry"></input>
            <label>Amount</label>
            <input type="number" id="amount"></input>
            <label>Currenccy</label>
            <select id="currency">
                <option key="1" defaultValue="BGN">BGN</option>
            </select>
            <input type="button" onClick={() =>loadMoney()} defaultValue="Transfer money"></input>
            {moneyReqResult && <label>Money transferred successfully!</label>}
        </div>
    );
}