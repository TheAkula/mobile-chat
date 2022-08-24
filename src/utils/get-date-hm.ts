export const getDateHm = (str: string) => {
  function addZero(s: string | number) {
    return s.toString().length === 1 ? "0" + s : s;
  }
  const date = new Date(str);

  const minutes = addZero(date.getMinutes());
  const hours = addZero(date.getHours());

  return `${hours}:${minutes}`;
};
