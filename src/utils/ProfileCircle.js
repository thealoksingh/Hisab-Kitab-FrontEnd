import React from 'react';

const ProfileCircle = ({ name, className, color }) => {
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
  

  return (
    <div className={`${className}`} style={styles}>
      {name[0]} {/* Display the first letter */}
    </div>
  );
};

export default ProfileCircle;
