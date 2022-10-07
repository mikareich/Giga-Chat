function updateMessageTime(messageTimeStamps) {
  messageTimeStamps.forEach((timestamp, index) => {
    const timeElement = document.getElementById(index);
    timeElement.innerHTML = formatTimestamp(timestamp);
  });
}

export default updateMessageTime;
