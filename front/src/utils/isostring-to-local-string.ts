const isoStringToLocalString = (dateString: string) => {
  const parsed = Date.parse(dateString);
  const date = new Date(parsed).toLocaleDateString();
  const time = new Date(parsed).toLocaleTimeString();

  return `${date} ${time}`;
};

export default isoStringToLocalString;
