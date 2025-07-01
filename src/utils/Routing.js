import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import ForgetPasswordModal from '../Authentication/ForgetPasswordModal';
import LoginForm from '../Authentication/LogInForm';
import SignUpForm from '../Authentication/SignupForm';
import Home from "../LandingPage/Home";
import About from '../Modals/About';
import { selectUser } from '../Redux/Selector';
import Addfriend from '../Tour/Addfriend';
import Document from '../Tour/Document';
import Forget from '../Tour/Forget';
import Help from '../Tour/Help';
import Invite from '../Tour/Invite';
import Transaction from '../Tour/Transaction';
import LeftSideDashboard from '../UserDashBoard/LeftSideDashboard';
import UnderDevPage from '../UserDashBoard/UnderDevPage';
import UserDashboard from '../UserDashBoard/UserDashboard';
import ErrorComponent from './ErrorComponent';
import { useEffect } from 'react';
import { getUserByToken } from '../Redux/Thunk';

// AuthenticatedRoute using Redux state
function AuthenticatedRoute({ children }) {
  const isAuthenticated = useSelector(selectUser) !== null;
  return isAuthenticated ? children : <Navigate to="/" />;
}

const Routing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');

      if (refreshToken && accessToken) {
        await dispatch(getUserByToken());
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forget-password" element={<ForgetPasswordModal />} />
        <Route path="/user-dashboard" element={<AuthenticatedRoute><UserDashboard /></AuthenticatedRoute>} />
        <Route path="/admin-dashboard" element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
        <Route path="/under-dev" element={<AuthenticatedRoute><UnderDevPage /></AuthenticatedRoute>} />
        <Route path="/leftsection" element={<AuthenticatedRoute><LeftSideDashboard /></AuthenticatedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/document" element={<Document />}>
          <Route path="invite" element={<Invite />} />
          <Route path="addfriend" element={<Addfriend />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="help" element={<Help />} />
          <Route path="forget" element={<Forget />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;