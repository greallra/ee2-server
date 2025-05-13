const isInDublin = (lat, lng) => {
  // Rough bounding box for Dublin
  const dublinBounds = {
    north: 53.4,
    south: 53.3,
    west: -6.4,
    east: -6.1,
  };

  return (
    lat >= dublinBounds.south &&
    lat <= dublinBounds.north &&
    lng >= dublinBounds.west &&
    lng <= dublinBounds.east
  );
};

export { isInDublin };
