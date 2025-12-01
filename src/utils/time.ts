export const convertToReadableTime = (time: number | string) => {
  if (typeof time === "number") {
    const dateObj = new Date(time * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();
    if (hours > 0) {
      return (
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    }
    return (
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }

  // If caller passed a Date, format as HH:MM (local time)
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0")
  );
};
