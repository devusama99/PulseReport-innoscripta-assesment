export const slidesToShow = () => {
  const width: number = window.innerWidth;

  switch (true) {
    case width <= 576:
      return 1.1; // Extra small devices (phones)
    case width <= 768:
      return 2.1; // Small devices (tablets)
    case width <= 992:
      return 3; // Medium devices (desktops)
    default:
      return 4; // Large + Extra large devices (larger desktops)
  }
};
