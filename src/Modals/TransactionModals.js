import UpdateFriendTransactionModel from "./UpdateFriendTransactionModel";
import DeleteAlertModal from "./DeleteAlertModal";
import { useSearchParams, useParams, useOutletContext } from "react-router-dom";
import FriendRequestModal from "./FriendRequestModal";
import AddFriendModal from "./AddFriendModal";

const TransactionModals = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const { transactionId, friendId } = useParams();
  const context = useOutletContext();
   console.log("action:", action);
  if (action === "update") {
    return <UpdateFriendTransactionModel {...context} />;
  }
  if (action === "delete") {
    return <DeleteAlertModal {...context} />;
  }
   if (action === "friend-request") {
    return <FriendRequestModal {...context} />;
  }
   if (action === "add-friend") {
    return <AddFriendModal {...context} />;
  }
  return null;
};

export default TransactionModals;