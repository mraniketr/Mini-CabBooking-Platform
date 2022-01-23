const getLocation = async () => {
  if (!navigator.geolocation) {
    return "Geolocation is not supported by your browser";
  } else {
    await navigator.geolocation.getCurrentPosition((position) => {
      return [position.coords.latitude, position.coords.longitude];
    });
  }
};
