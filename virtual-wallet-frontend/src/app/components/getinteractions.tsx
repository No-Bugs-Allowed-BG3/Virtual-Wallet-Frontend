'use client'
import React from "react";

type ContentProps = {
  onContentChangeRequested: (view: string) => void;
};

export default function GetInteractions({onContentChangeRequested}:ContentProps) {
    const showVerification = () => {
        onContentChangeRequested("userverification");
    };
    const getInteractions = async () => {
        try {
            const request = await fetch("/api/v1/users/current/interactions/",{
                method:"POST",
                headers:{
                    "credentials":"include",
                }
                
            });
            if ( request.status == 200) {
                const response = await request.json();
                setCanInteract(response.result);
            }
        }
        catch(err) {
            console.log("Error occurred during fetching user interactions capabilities ",err)
        }
        finally {
            setLoading(false);
        }
    }
    const [canInteract,setCanInteract] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    React.useEffect( () => {
        getInteractions();
    });
    if (loading) {
        return(<p>Loading...</p>);
    }
    if (!canInteract) {
        return(
        <>
            <p>💡Your account has limited capabilities, because :</p>
            <ul>
                <li>
                    📧 It is not activated through the link you have received via email (check spam folder), or
                </li>
                <li>
                    🔍 Your identity hasn't been verified by uploading personal photo and a valid ID.
                </li>                
            </ul>
                    <input type="button" onClick={() => showVerification()} defaultValue="Click here to verify ID"/>
        </>);
    }
    else {
        return <></>
    }

}