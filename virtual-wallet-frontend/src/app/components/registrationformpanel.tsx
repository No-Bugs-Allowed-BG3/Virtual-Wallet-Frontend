'use client'
import React from "react"

interface RegisterData {
    username:string,
    password:string,
    email:string,
    phone:string
}

type ContentProps = {
  onContentChangeRequested: (view: string) => void;
};


export default function RegistrationFormPanel({onContentChangeRequested}:ContentProps) {
    const registeruser = async () => {
            const registerData:RegisterData= {
                username:(document.getElementById("username_register") as HTMLInputElement).value,
                password:(document.getElementById("password_register") as HTMLInputElement).value,
                email:(document.getElementById("email_register") as HTMLInputElement).value,
                phone:(document.getElementById("phone_register") as HTMLInputElement).value
            }
            console.log(JSON.stringify(registerData));
            try {
                const req = await fetch("/api/v1/users/registrations/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "accept":"application/json",
                    },
                    body:JSON.stringify(registerData),
                });
                if ( req.status == 200) {
                    onContentChangeRequested("registrationsuccessful");
                }
            }
            catch(err) {
                console.error("Error during registration",err);
                onContentChangeRequested("registrationfailed");
            }
    };
    return(
        <>        
                <div id="registerdiv">
                        <label>Username:</label>
                        <input type="text" id="username_register" className="username_input"/>
                        <label>Password:</label>
                        <input type="password" id="password_register" className="password_input"/>
                        <label>E-mail:</label>
                        <input type="email" id="email_register" className="email_input"/>
                        <label>Phone number:</label>
                        <input type="text" id="phone_register" className="phone_input"/>
                        <input type="button" id="registersubmit" value="Register" onClick={() => registeruser()}/>
                </div>
        </>
    );
}