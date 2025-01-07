// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { getFriendList } from "../Api/HisabKitabApi";

// import UserDashboardNavigation from "./UserDashboardNavigation";
// import FriendSectionDashboard from "./FriendSectionDashboard";
// const UserDashboard = () => {
  
//   const location = useLocation();
//   const [friends, setFriends] = useState([]);
//   const [error, setError] = useState(null);
//   const user = location.state?.user;
//   const [selectedSection, setSelectedSection] = useState("dashboard"); // Default section
//   useEffect(() => {
//     const fetchFriends = async () => {
//       if (!user) return;

//       try {
//         console.log("friendlist api called");
//         const response = await getFriendList(user.userId);
//         console.log(response.data);

//         setFriends(response.data.friendList); // Assuming the data is in response.data.friendList
//         console.log(friends.length);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchFriends();
//   }, [user]);

//   const renderSection = (selectedSection) => {
//     switch (selectedSection) {
//       case "dashboard":
//         return <div>Welcome to the Dashboard
//           {console.log("welcome page")}
//         </div>;
//       case "friends":
//         return <div>Welcome to the friends Dashboard</div>;
//         // return <FriendSectionDashboard  user={user} friends={friends} />;
//       case "settings":
//         return <div>Settings Section</div>;
//       case "profile":
//         return <div>Profile Section</div>;
//       default:
//         return <div>Welcome to the Dashboard</div>;
//     }
//   };
//   return (
//     <div>
//       <UserDashboardNavigation  user={user} friends={friends} setSelectedSection={setSelectedSection}/>
//       <div className="content">{renderSection()}</div>
//     </div>
//   );

// };
// export default UserDashboard;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFriendList } from "../Api/HisabKitabApi";
import UserDashboardNavigation from "./UserDashboardNavigation";

const UserDashboard = () => {
  const location = useLocation();
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("dashboard"); // Default section
  const user = location.state?.user;

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user) return;

      try {
        console.log("friendlist api called");
        const response = await getFriendList(user.userId);
        console.log(response.data);

        setFriends(response.data.friendList); // Assuming the data is in response.data.friendList
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFriends();
  }, [user]);

  // Render content based on selected section
  const renderSection = (selectedSection) => {
    switch (selectedSection) {
      case "dashboard":
        return (
          <div>
            Welcome to the Dashboard
            {console.log("Dashboard section")}
          </div>
        );
      case "friends":
        return (
          <div>
            Welcome to the Friends Dashboard
            {console.log("Friends section")}
          </div>
        );
      case "settings":
        return <div>Settings Section</div>;
      case "profile":
        return <div>Profile Section</div>;
      default:
        return <div>Welcome to the Dashboard</div>;
    }
  };

  return (
    <div>
      {/* Pass setSelectedSection to UserDashboardNavigation */}
      <UserDashboardNavigation
        user={user}
        friends={friends}
        setSelectedSection={setSelectedSection}
      />
      <div className="content">{renderSection()}</div>
    </div>
  );
};

export default UserDashboard;
