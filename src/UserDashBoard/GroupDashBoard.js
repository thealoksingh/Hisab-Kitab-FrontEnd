import React, { useEffect, useState } from "react";
import GroupDashboardLeftSection from "./GroupDashboardLeftSection";
import GroupDashboardMiddleSection from "./GroupDashboardMiddleSection";
import GroupDashboardRightSection from "./GroupDashboardRightSection";
function GroupDashBoard() {
  return (
    <>
      <div className="group-dashboard rounded w-full h-[100vh]  relative overflow-hidden flex">
        {/* Left Column */}
        <GroupDashboardLeftSection/>

        {/* Middle Column */}
        <GroupDashboardMiddleSection/>

        {/* Right Column */}
       <GroupDashboardRightSection/>
      </div>
    </>
  );
}
export default GroupDashBoard;
