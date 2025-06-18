'use client'
import * as React from 'react';
import LoginPanel from './loginpanel';

type ContentProps = {
  onContentChangeRequested: (view: string) => void;
};

export default function RegistrationSuccessful({onContentChangeRequested}:ContentProps) {
    return(<>
        <div id="description_panel">
            <h2>👋 Welcome to Virtual Wallet</h2>
            <p>Take control of your finances — all in one place.</p>
            <p>Your registration is successful. Please complete the following steps:</p>
            <ul>
                <li>✅ Activate your account through the link you have received in your e-mail (check spam folder)</li>
                <li>✅ Verify your identity by uploading a photo of yourself and a valid national ID</li>
            </ul>
            <h3>🔐 Once You have completed the steps above you will be able to...</h3>
            <ul>
                <li>💳 Add and manage credit/debit cards — securely store multiple cards with full details.</li>
                <li>💸 Send & receive money — transfer funds between your cards or to other users.</li>
                <li>📥 Confirm or reject transfers — every transaction requires confirmation.</li>
                <li>📊 Track your history — view transactions, manage contacts, and monitor your account.</li>
            </ul>
</div>
<LoginPanel  onContentChangeRequested={onContentChangeRequested}></LoginPanel>
</>
    );
}