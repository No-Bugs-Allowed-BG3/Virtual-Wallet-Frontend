'use client'
import React from "react"

type ContentProps = {
  onContentChangeRequested: (view: string) => void;
};

export default function LoggedInMenu({onContentChangeRequested}:ContentProps) {    
        const showsettings = () => {
            onContentChangeRequested("usercards");
        };
        const showdashboard = () => {
            onContentChangeRequested("userdashboard");
        };        
        const showtransactions = () => {
            onContentChangeRequested("userstransactions");
        };
        const showloadmoney = () => {
            onContentChangeRequested("usersloadmoney");
        };
        const showcontacts = () => {
            onContentChangeRequested("userscontacts");
        };
        const [user,setUser] = React.useState(null);
        const [loading,setLoading] = React.useState(true);
            const fetchUser = async () => {
                try {
                    const req = await fetch("/api/v1/users/current/",{
                        method:"POST",
                        credentials:"include",
                    })
                    if ( req.status == 200) {
                        const current_user = await req.json();
                        console.log(current_user);
                        if ( current_user.username.length > 0 ) {
                            setUser(current_user.username);
                        }
                    }
                }
                catch(err) {
                    console.error("Fetch failed",err);
                }
                finally {
                    setLoading(false);
                }
            };
        React.useEffect(() => {fetchUser();},[]);
        return user ? (<><div id="logged_in_menu">
                                <input type="button" defaultValue="Create cards" onClick={() => showsettings()}/>
                                <input type="button" defaultValue="Transactions" onClick={() => showtransactions()}/>
                                <input type="button" defaultValue="Dashboard" onClick={() => showdashboard()}/>
                                <input type="button" defaultValue="Load money" onClick={() => showloadmoney()}/>
                                <input type="button" defaultValue="Contacts" onClick={() => showcontacts()}/>
                                </div>
                            </>
                            ) : <></>;
}