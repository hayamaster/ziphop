const groupDaysByMonth = (dates: string[]) => {
  const months: { [key: number]: number[] } = {};

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (!months[month]) {
      months[month] = [];
    }

    months[month].push(day);
  });

  return months;
};

export default groupDaysByMonth;
