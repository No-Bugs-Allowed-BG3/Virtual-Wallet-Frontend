'use client'
import React from "react";
import DescriptionPanel from "./descriptionpanel";
import GetInteractions from "./getinteractions";
import LoggedInMenu from "./loggedinmenu";

type ContentProps = {
  onContentChangeRequested: (view: string) => void;
};

export default function LoginPanel({onContentChangeRequested}:ContentProps) {    
            const fetchUser = async () => {
                try {
                    const req = await fetch("/api/v1/users/current/",{
                        method:"POST",
                        credentials:"include",
                    })
                    if ( req.status == 200) {
                        const current_user = await req.json();
                        setUser(current_user.username);
                    }
                }
                catch(err) {
                    console.error("Fetch failed",err);
                }
                finally {
                    setLoading(false);
                }
            };

    const login = async () => {
        const formData = new FormData();
        formData.append("username",(document.getElementById("username_login") as HTMLInputElement)?.value);
        formData.append("password",(document.getElementById("password_login") as HTMLInputElement)?.value);
        try {
            const req = await fetch("/api/v1/tokens/",{
                method:"POST",
                body:formData,
                credentials:"include",
            })
            if ( req.status == 200) {
                const req_result = await req.json();
                console.log(req_result.result);
                await fetchUser();
            }
        }
        catch(err) {
            console.error("Error during login : ",err);
        }
    };
    
    const register = () => {
        onContentChangeRequested("register");
    }

        const [user,setUser] = React.useState(null);
        const [loading,setLoading] = React.useState(true);

        React.useEffect(() => {
            fetchUser();
        });

        if (loading) {
            return(
                <p>Loading</p>
            );
        }
        if (user) {
            return(
                <>
                <div id="logindiv">
                <p>You are logged in as {user}</p>
                <GetInteractions onContentChangeRequested={onContentChangeRequested}/>
                </div></>
            );
        }

        return( <>
                <DescriptionPanel/>
                <div id="logindiv">
                        <label>Username:</label>
                        <input type="text" id="username_login" className="username_input"/>
                        <label>Password:</label>
                        <input type="password" id="password_login" className="password_input"/>
                        <input type="button" id="loginsubmit" value="Login"  onClick={() => login()}/>
                        <label>or</label>
                        <input type="button" id="loginsubmit" value="Register" onClick={() => register()}/>
                </div>
                </>
                );

}