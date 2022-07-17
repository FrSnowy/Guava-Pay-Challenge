const getStrDateMS = (d: string) => {
  return Date.parse(d) - new Date().getTimezoneOffset() * 60000;
}

export default getStrDateMS;