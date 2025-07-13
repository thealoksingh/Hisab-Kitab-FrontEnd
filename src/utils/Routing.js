import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import ForgetPasswordModal from "../Authentication/ForgetPasswordModal";
import LoginForm from "../Authentication/LogInForm";
import SignUpForm from "../Authentication/SignupForm";
import Home from "../LandingPage/Home";
import About from "../Modals/About";
import { selectUser } from "../Redux/Selector";
import Addfriend from "../Tour/Addfriend";
import Document from "../Tour/Document";
import Forget from "../Tour/Forget";
import Help from "../Tour/Help";
import Invite from "../Tour/Invite";
import Transaction from "../Tour/Transaction";
import LeftSideDashboard from "../UserDashBoard/LeftSideDashboard";
import UnderDevPage from "../UserDashBoard/UnderDevPage";
import UserDashboard from "../UserDashBoard/UserDashboard";
import ErrorComponent from "./ErrorComponent";
import { useEffect } from "react";
import { getUserByToken } from "../Redux/Thunk";
import Friends from "../UserDashBoard/Friends";
import FriendTranscationDetail from "../UserDashBoard/FriendTransactionDetail";
import InstructionToSelect from "../UserDashBoard/instructionToSelect";
import CommentSection from "../UserDashBoard/CommentSection";
import GiveGotModal from "../Modals/GiveGotModal";
import UpdateFriendTransactionModel from "../Modals/UpdateFriendTransactionModel";
import DeleteAlertModal from "../Modals/DeleteAlertModal";
import TransactionModals from "../Modals/TransactionModals";
import UnfriendModal from "../Modals/UnfriendModal";

// AuthenticatedRoute using Redux state
function AuthenticatedRoute({ children }) {
  const isAuthenticated = useSelector(selectUser) !== null;
  return isAuthenticated ? children : <Navigate to="/" />;
}

const Routing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (refreshToken && accessToken) {
        await dispatch(getUserByToken());
      }
    };
    fetchUser();
  }, [dispatch]);

  const user = useSelector(selectUser);
  const role = "user";
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={user ? <Navigate to="/user-dashboard" /> : <Home />}
        />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forget-password" element={<ForgetPasswordModal />} />

        {/* User Routes */}
        {role === "user" && (
          <>
            <Route path="/user-dashboard" element={<UserDashboard />}>
              <Route index element={<Navigate to="friends" />} />
              <Route path="friends" element={<Friends />}>
                <Route index element={<InstructionToSelect />} />
                <Route
                  path=":friendId/transactions"
                  element={<FriendTranscationDetail />}
                >
                  <Route path=":transactionId" element={<CommentSection />}>
                    <Route path="" element={<TransactionModals />} />
                  </Route>
                  <Route
                    path=""
                    element={<GiveGotModal />}
                  />

                </Route>

                <Route path=":friendId" element={<UnfriendModal />} /> {/* <-- Add this */}


                <Route
                  path="instructionToSelect"
                  element={<InstructionToSelect />}
                />
              </Route>
              <Route path="under-dev" element={<UnderDevPage />} />
              <Route path="about" element={<About />} />
            </Route>

            <Route path="/document" element={<Document />}>
              <Route path="invite" element={<Invite />} />
              <Route path="addfriend" element={<Addfriend />} />
              <Route path="transaction" element={<Transaction />} />
              <Route path="help" element={<Help />} />
              <Route path="forget" element={<Forget />} />
            </Route>
          </>
        )}

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/under-dev" element={<UnderDevPage />} />
          </>
        )}

        {/* Fallback */}
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
