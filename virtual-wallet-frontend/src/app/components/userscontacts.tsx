'use client'
import React from "react"
export default function UsersContacts() {
    const [acUser,setAcUser] = React.useState<string|null>(null);
    const addcontact = async () => {
        const contact_username_field = document.getElementById("contact_username") as HTMLInputElement;
        if ( contact_username_field ) {
            const contact_username = contact_username_field.value;
            const username_data = JSON.stringify({"username":contact_username,});
            const req = await fetch("/api/v1/users/me/contacts/",{
                method:"POST",
                headers: {
                    "accept":"application/json",
                    "Content-Type":"application/json",
                },
                body:username_data,
            });
            if ( req.status == 200 ) {
                setAcUser(contact_username);
            }
        }
    }

    return (<div id="logindiv">
    <label>Add contacts by username:</label>
    <input type="text" id="contact_username"></input>
    <input type="button" defaultValue="Add" onClick={() => addcontact()}></input>
    {acUser && <p>Contact {acUser} added successfully!</p>}
    </div>);
}