export default function getFormattedTimestamp() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  return `${formattedHours}:${formattedMinutes} ${ampm},${formattedDate}`;
}
