import React from 'react';
import { getRandomColor } from './RandomColor';

const ProfileCircle = ({ name, className }) => {
    const backgroundColor = getRandomColor();
  
    const styles = {
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
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
  