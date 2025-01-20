import React from 'react';

const ProfileCircle = ({ name, className, color }) => {
  const styles = {
    backgroundColor: color, // Set the background color dynamically
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  return (
    <div className={`${className}`} style={styles}>
      {name[0]} {/* Display the first letter */}
    </div>
  );
};

export default ProfileCircle;
