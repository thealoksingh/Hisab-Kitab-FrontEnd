import React from 'react';

const ProfileCircle = ({ name,  color }) => {
  const styles = {
    backgroundColor: color,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.2)',
    border: '1px solid #E5E7EB',

  };


  // Only display the first letter if name exists and is a string
  const displayLetter = typeof name === "string" && name?.length > 0 ? name[0] : "?";

  return (
    <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-13 md:w-13  text-white text-lg"
      style={styles}>
      {displayLetter}
    </div>
  );
};

export default ProfileCircle;
