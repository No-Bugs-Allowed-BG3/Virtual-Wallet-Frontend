'use client'
import * as React from 'react';

export default function RegistrationFailed(server_error:string) {
    return(
        <div id="description_panel">
            <h2>🛠 An error occurred during registration</h2>
            <p>Please try again.</p>
            <p>If the issue persists, please contact an administrator.</p>
            <p>The server returned the following error : </p>
            <p>{server_error}</p>
</div>
    );
}