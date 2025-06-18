'use client'
import React from "react"

export default function UserVerification() {
        const [verificationMessage,setVerificationMessage] = React.useState("");
    const sendVerificationRequest = async () => {
        const formData = new FormData();
        const selfieInput = document.getElementById("selfie") as HTMLInputElement;
        const idDocumentInput = document.getElementById("id_document") as HTMLInputElement;
        if ( selfieInput == null || idDocumentInput == null ) {
            console.log("Empty values for selfie and ID");
            return(
                <p>You must upload selfie and ID!</p>
            );
        }
        else {
            if ( selfieInput.files && idDocumentInput.files ) {
                formData.append("selfie",selfieInput.files[0]);
                formData.append("id_document",idDocumentInput.files[0]);

                const req = await fetch("/api/v1/users/verifications/",{
                    method:"POST",
                    body:formData,
                    headers:{
                        'accept':'application/json',
                    },
                });
                if ( req.status == 200 ) {
                    const responseData = await req.json();
                        console.log(responseData);
                    if (responseData.result===true) {
                        console.log(responseData.result);
                        setVerificationMessage("Verified successfully!");
                    }
                    else {
                        setVerificationMessage("Identity verification failed!");
                    }
                }
                else {
                setVerificationMessage("Identity verification failed!");
                }
            }
            else {
                    setVerificationMessage("You must upload selfie and ID!");
                
            }
        }
    };
    return(
        <div id="logindiv">
            <label>Upload selfie :</label>
            <input type="file" id="selfie"/>
            <label>Upload ID document :</label>
            <input type="file" id="id_document"/>
            <input type="button" onClick={() => sendVerificationRequest()} defaultValue="Verify"/>
            {verificationMessage && <p>{verificationMessage}</p>}
        </div>
    );
}