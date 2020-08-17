const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

const translateTimeToNumber = (time) => {
  if (!time) return;
  const [hour, minute] = time.split(":");
  const minuteNumber = Number((Number(minute) / 60).toFixed(2));
  const total = Number(hour) + minuteNumber;
  return String(total);
};

module.exports = {
  formatTime: formatTime,
  translateTimeToNumber,
};
