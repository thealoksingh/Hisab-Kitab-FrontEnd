import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../Redux/NotificationAlertSlice";

const NotificationAlert = () => {
  const dispatch = useDispatch();
  const { description,  title } = useSelector((state) => state.notificationAlert);
  
 useEffect(() => {
  if (description) {
    const audio = new Audio("/notification.mp3");
    audio.play().catch((err) => {
      // Optionally, you can show a message or just ignore
      console.warn("Notification sound blocked until user interacts with the page.");
    });
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
    return () => clearTimeout(timer);
  }
}, [description, dispatch]);

  if (!description) return null;


  return (
    <div className="fixed top-6 right-6 z-50 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 px-5 py-3 rounded-md shadow-md animate-slide-in">
      <p className="font-semibold text-sm">🔔 {title}</p>
      <p className="text-xs">{description}</p>
    </div>
  );
};

export default NotificationAlert;
