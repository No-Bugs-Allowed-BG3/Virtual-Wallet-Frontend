'use client'
import React from "react";
import TransactionChecker from "./transactionchecker";

export default function Transactions() {

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
    class Category {
        id:string;
        name:string;

        constructor(id:string,name:string) {
            this.id=id;
            this.name=name;
        }
    }

    class Balance {
        id:string;
        amount:number;
        currency_code:string;
        currency_id:string;

        constructor(id:string,amount:number,currency_code:string,currency_id:string) {
            this.id = id;
            this.amount=amount;
            this.currency_code = currency_code;
            this.currency_id = currency_id;
        }
    }

    class TransactionRequest {        
        receiver_username:string;
        category_id:string;
        currency_id:string;
        card_number:string;
        amount:number;
        description:string;
        is_recurring: boolean;
        interval_days: number;
        next_run_date:string;

        constructor() {
            this.receiver_username=""
            this.card_number=""
            this.category_id=""
            this.currency_id=""
            this.amount = 0.0;
            this.description="No description";
            this.is_recurring=false;
            this.interval_days=1;
            this.next_run_date="2030-10-10";
        }
    }

    let transaction_request:TransactionRequest = new TransactionRequest();

    const sendTransaction = async () => {
        const body_contents = JSON.stringify(transaction_request);
        console.log(body_contents);
        const req = await fetch("/api/v1/transactions/user-to-user/",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:body_contents,
        });
        if ( req.status == 201) {
            const req_res = await req.json();
            console.log(req_res);
            if (req_res.id) {
                setTransactionID(req_res.id);
                setHasTransaction(true);
            }
        }
        
    };
    
    const setContact = (event:React.ChangeEvent<HTMLSelectElement>) => {
        transaction_request.receiver_username = event.target.value;
    }
    const setCard = (event:React.ChangeEvent<HTMLSelectElement>) => {
        transaction_request.card_number = event.target.value;
    }
    const setCategory = (event:React.ChangeEvent<HTMLSelectElement>) => {
        transaction_request.category_id = event.target.value;
    }
    const setCurrency = (event:React.ChangeEvent<HTMLSelectElement>) => {
        const selected_currency = event.target.value;
        let selected_currency_id = "";
        for (let balance of userBalances) {
            console.log(`${selected_currency}=>${balance.currency_code}`)
            if ( balance.currency_code.trim() === selected_currency.trim() ) {
                selected_currency_id = balance.currency_id;
                console.log("Equals");
            }
        }
        transaction_request.currency_id = selected_currency_id;
    console.log(`Selected currency_id:${selected_currency_id}`);
    }

    const setDescription = (event:React.ChangeEvent<HTMLInputElement>) => {
        transaction_request.description = event.target.value;
    }

    const setAmount = (event:React.ChangeEvent<HTMLInputElement>) => {
        transaction_request.amount = parseFloat(event.target.value);
    }

    const [userContacts,setUserContacts] = React.useState<{username:string}[]>([]);
    const [userCards,setUserCards] = React.useState<Card[]>([]);
    const [userCategories,setUserCategories] = React.useState<Category[]>([]);
    const [userBalances,setUserBalances] = React.useState<Balance[]>([]);
    const [hasTransaction,setHasTransaction] = React.useState(false);
    const [transactioID,setTransactionID] = React.useState("");
    React.useEffect(() =>  {
        const getUserContacts = async () => {
            const contacts_req = await fetch("/api/v1/users/me/contacts");
            if ( contacts_req.status == 200 ) {
                setUserContacts(await contacts_req.json());
            }
        }
        const getUseCards = async () => {
            const balances_req = await fetch("/api/v1/users/me/cards/");
            if ( balances_req.status == 200 ) {
                setUserCards(await balances_req.json());
            }
        }
        const getBalances = async () => {
            const balances_req = await fetch("/api/v1/balances/me/");
            if ( balances_req.status == 200 ) {
                setUserBalances(await balances_req.json());
            }
        }
        const getUserCategories = async () => {
            const categories_req = await fetch("/api/v1/categories/");
            if ( categories_req.status == 200 ) {
                setUserCategories(await categories_req.json());
            }
        }
        getUserContacts();
        getUseCards();
        getUserCategories();
        getBalances();
    },[]);
    return(<div id="logindiv">
    <label>Send my to someone from your contacts list :</label>
    <label>Select contact :</label>
    <select id="contact_transactions" onChange={setContact}  defaultValue="None">
         <option disabled value="None"> -- select an option -- </option>
        {userContacts && userContacts.map((contact,index) => (
            <option key={index} value={contact.username}>
                {contact.username}
            </option>
        ))}
    </select>
    <label>Select card :</label>
    <select id="cards_transactions" onChange={setCard}  defaultValue="None">
         <option disabled value="None"> -- select an option -- </option>
            {userCards && userCards.map((card,index) => (
            <option key={index} value={card.card_number}>
                {card.card_number}
            </option>
        ))}
    </select>
    <label>Select currency :</label>
    <select id="currency_transactions" onChange={setCurrency} defaultValue="None">
        <option disabled value="None"> -- select an option -- </option>
            {userBalances && userBalances.map((balance,index) => (
            <option key={index} value={balance.currency_code}>
                {balance.currency_code}
            </option>
        ))}
    </select>
    <label>Select a category for the transaction :</label>
    <select id="category_transactions" onChange={setCategory}  defaultValue="None">
         <option disabled value="None"> -- select an option -- </option>
            {userCategories && userCategories.map((category,index) => (
            <option key={index} value={category.id}>
                {category.name}
            </option>
        ))}
    </select>
    <label>Type the amount you wish to transfer :</label>
    <input type="number" id="amount" defaultValue="0.0" onChange={setAmount}></input>
    <label>Additional description :</label>
    <input type="text" id="description" defaultValue="No description" onChange={setDescription}></input>
    <label>After you click on "Process transaction" button, log into your MoneyHub mToken in order to confirm your transaction</label>
    <input type="button" defaultValue="Send money" onClick={() => sendTransaction()}></input>
    {hasTransaction && <TransactionChecker transaction_id={transactioID}></TransactionChecker>}
    </div>);
}