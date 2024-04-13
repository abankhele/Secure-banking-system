import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/User Dashboard/Dashboard';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountInfo from './pages/AccountInfo/AccountInfo';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Signup from './pages/SignUp/Signup';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import ViewAllAccounts from './pages/ViewAllAccounts/ViewAllAccounts';
import TransactionApproval from './pages/TransactionApproval/TransactionApproval';
import UserProfile from './pages/UserProfile/UserProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/account-info" element={<AccountInfo />} />

        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/accountDetails" element={<AccountDetails />} />
        <Route path="/all-accounts" element={<ViewAllAccounts/>} />
        <Route path="/pendingapproval" element={<TransactionApproval/>}/>
      </Routes>
    </Router>
  );
}

export default App;
