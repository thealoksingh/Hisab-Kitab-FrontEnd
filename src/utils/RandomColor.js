export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      // Restrict to darker shades by using lower hex values (0-8)
      color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
  };
  