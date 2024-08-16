const groupDays = (dates: string[]) => {
  const years: { [key: number]: { [key: string]: number[] } } = {};

  dates.forEach((dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (!years[year]) {
      years[year] = {};
    }

    if (!years[year][month]) {
      years[year][month] = [];
    }

    years[year][month].push(day);
  });

  return years;
};

export default groupDays;
