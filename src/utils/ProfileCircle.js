import React from 'react';

const ProfileCircle = ({ name, color, className }) => {
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

  const displayLetter = typeof name === "string" && name?.length > 0 ? name[0] : "?";

  return (
    <div
      className={`text-white text-lg ${className}`}
      style={styles}
    >
      {displayLetter}
    </div>
  );
};

export default ProfileCircle;
