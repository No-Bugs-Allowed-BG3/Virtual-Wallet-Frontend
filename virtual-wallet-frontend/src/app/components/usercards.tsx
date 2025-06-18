'use client'
import React from "react";

export default function UserCards() {

    class Card {
        card_number:string;
        expiration_date:string;
        cardholder_name:string;

        constructor(card_number:string,expiration_date:string,cardholder_name:string) {
            this.card_number=card_number;
            this.expiration_date=expiration_date;
            this.cardholder_name=cardholder_name;
        }
    }
    class CardRequest {
        code:string;
        cardholder:string;

        constructor(code:string,cardholder:string) {
            this.code=code;
            this.cardholder=cardholder;
        }
    }

    const sendCardRequest = async () => {
        const cardHolder = (document.getElementById("cardholder_text") as HTMLInputElement).value;
        const cardCurrency = (document.getElementById("currency_select") as HTMLInputElement).value;
        const card_request_obj = new CardRequest(cardCurrency,cardHolder);
        const body_contents = JSON.stringify(card_request_obj);

        console.log(body_contents);
        const req = await fetch("/api/v1/users/me/cards/",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:body_contents,
        });
        if ( req.status == 200) {
            const req_res = await req.json();
            console.log(req_res);
            if (req_res.card_number) {
                setCardCreated(true);
            }
        }
        
    };
    const [cardCreated,setCardCreated] = React.useState(false);
    return(<div id="logindiv">
    <label>Create a card :</label>
    <label>Cardholder name:</label>
    <input type="text" id="cardholder_text"></input>
    <label>Select currency:</label>
    <select id="currency_select" defaultValue="None">
         <option disabled value="None"> -- select an option -- </option>
            <option defaultValue="BGN">
                BGN
            </option>
    </select>
    <input type="button" defaultValue="Create card" onClick={() => sendCardRequest()}></input>
    {cardCreated && <label>Card created successfully!</label>}
    </div>);
}