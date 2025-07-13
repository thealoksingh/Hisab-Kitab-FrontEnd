
import { useSearchParams, useParams, useOutletContext } from "react-router-dom";
import HelpAndSupport from "./HelpAndSupport";
import InviteModal from "./InviteModal";

const CommonModals = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");
//   const { transactionId, friendId } = useParams();
  const context = useOutletContext();

  if (action === "help") {
    return <HelpAndSupport {...context} />;
  }
  if (action === "invite") {
    return <InviteModal {...context} />;
  }
  return null;
};

export default CommonModals;