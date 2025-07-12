import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSnackbar } from '../Redux/SanckbarSlice';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.snackbar);
//  const message ="this is message";
//   const type = "error";
  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearSnackbar());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  const bgColor = type === 'error' ? '#FF5722' : '#4CAF50';

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: 60,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          backgroundColor: bgColor,
          color: 'white',
          borderRadius: 8,
          padding: '10px 40px 10px 16px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          position: 'relative',
          pointerEvents: 'auto',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <span style={{ fontSize: 14 }}>{message}</span>
        <button
          onClick={() => dispatch(clearSnackbar())}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: 18,
            position: 'absolute',
            top: 8,
            right: 12,
            cursor: 'pointer',
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
