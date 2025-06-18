'use client'
import * as React from 'react';
import LoginPanel from './components/loginpanel';
import RegistrationFormPanel from './components/registrationformpanel'
import RegistrationSuccessful from './components/registrationsuccessful'
import RegistrationFailed from './components/registrationfailed'
import UserVerification from './components/userverification'
import LoggedInMenu from './components/loggedinmenu'
import UsersContacts from './components/userscontacts';
import Transactions from './components/transactions';
import LoadMoney from './components/loadmoney';
import UserCards from './components/usercards';
import Dashboard from './components/dashboard';

export default function Page() {
  const [displayContent,setDisplayContent] = React.useState('default');
  switch (displayContent) {
    default:
      return (<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <LoginPanel onContentChangeRequested={setDisplayContent}/>
      </>);
    case 'register':
      return <>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <RegistrationFormPanel onContentChangeRequested={setDisplayContent}/>
      </>
      break;
    case 'registrationsuccessful':
      return  <>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <RegistrationSuccessful onContentChangeRequested={setDisplayContent} />
      </>
      break;
    case 'userverification':
      return (<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <UserVerification/>
      </>);
      break;
    case 'userscontacts':      
      return <>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <UsersContacts></UsersContacts>
      </>
      break;
    case 'userstransactions':
      return(<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <Transactions></Transactions>
      </>);
      break;
    case 'usersloadmoney':
      return(<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <LoadMoney></LoadMoney>
      </>);
      break;
    case 'usercards':
      return(<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <UserCards></UserCards>
      </>);
      break;
    case 'userdashboard':
      return(<>
      <LoggedInMenu onContentChangeRequested={setDisplayContent}/>
      <Dashboard></Dashboard>
      </>);
      break;
  }
}