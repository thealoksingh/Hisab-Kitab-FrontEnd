import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import DeleteAlertModal from "./DeleteAlertModal";
import UpdateFriendTransactionModel from "./UpdateFriendTransactionModel";

const TransactionModals = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
  const { transactionId, friendId } = useParams();
  const context = useOutletContext();

  if (action === "update") {
    return <UpdateFriendTransactionModel {...context} />;
  }
  if (action === "delete") {
    return <DeleteAlertModal {...context} />;
  }
  return null;
};

export default TransactionModals;