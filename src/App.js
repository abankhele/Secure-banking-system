import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/User Dashboard/Dashboard';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AccountInfo from './pages/AccountInfo/AccountInfo';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Signup from './pages/SignUp/Signup';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import ViewAllAccounts from './pages/ViewAllAccounts/ViewAllAccounts';
import TransactionApproval from './pages/TransactionApproval/TransactionApproval';
import UserProfile from './pages/UserProfile/UserProfile';
import Transactionhistory from './pages/TransactionHistory/TransactionHistory';
import Homepage from './pages/Homepage/Homepage';


function App() {
  const userp = localStorage.getItem('user');
  const secureRoute = (Component) => userp ? <Component /> : <Navigate to="/" replace />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={secureRoute(Dashboard)} />
        <Route path="/account-info" element={secureRoute(AccountInfo)} />
        <Route path="/createaccount" element={secureRoute(CreateAccount)} />
        <Route path="/userprofile" element={secureRoute(UserProfile)} />
        <Route path="/accountDetails" element={secureRoute(AccountDetails)} />
        <Route path="/all-accounts" element={secureRoute(ViewAllAccounts)} />
        <Route path="/pendingapproval" element={secureRoute(TransactionApproval)} />
        <Route path="/transactionhistory" element={secureRoute(Transactionhistory)} />
      </Routes>
    </Router>
  );
}

export default App;
