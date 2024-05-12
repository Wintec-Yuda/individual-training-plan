export const greeting = () => {
  const current_time = new Date();
  const hour = current_time.getHours();

  if (hour >= 4 && hour < 10) {
    return "Good morning";
  } else if (hour >= 10 && hour < 15) {
    return "Good afternoon";
  } else if (hour >= 15 && hour < 18) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  let year: string | number = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const formattedDate = day + "-" + month + "-" + year;

  return formattedDate;
};

export const calculateYearsSince = (date: string) => {
  var joinDate = new Date(date);
  var currentDate = new Date();

  var years = currentDate.getFullYear() - joinDate.getFullYear();
  var months;

  // Periksa apakah tanggal lahir di bulan dan hari yang sama dengan tanggal saat ini
  if (currentDate.getMonth() < joinDate.getMonth() || (currentDate.getMonth() === joinDate.getMonth() && currentDate.getDate() < joinDate.getDate())) {
    years--;
    months = 12 - joinDate.getMonth() + currentDate.getMonth();
  } else {
    months = currentDate.getMonth() - joinDate.getMonth();
  }

  return [formatDate(date), years, months];
};

export const getYears = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const years: any = [];

  for (let i = 0; i <= 4; i++) {
    years.push((currentYear + i).toString());
  }

  return years;
}