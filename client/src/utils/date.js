const getDay = (day) => {
   const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];
   switch (day) {
      case "Sun": {
         day = days[6];
         break;
      }
      case "Mon": {
         day = days[0];
         break;
      }
      case "Tue": {
         day = days[1];
         break;
      }
      case "Wed": {
         day = days[2];
         break;
      }
      case "Thu": {
         day = days[3];
         break;
      }
      case "Fri": {
         day = days[4];
         break;
      }
      case "Sat": {
         day = days[5];
         break;
      }
   }

   return day;
};

export const dates = () => {
   const jadwal = [];
   const now = Date.now();
   const week = now + 1000 * 60 * 60 * 24 * 7;

   for (let i = now; i < week; i += 1000 * 60 * 60 * 24) {
      const date = new Date(i).toDateString().split(" ");
      let day = getDay(date[0]);

      jadwal.push([day, date[2], date[1], date[3]]);
   }

   return jadwal;
};

export const times = ([open, close], [day, date, month, year]) => {
   const waktuBooking = [];

   const start = new Date(`${month}, ${date}, ${year} ${open}:00`).getTime();
   const end = new Date(`${month}, ${date}, ${year} ${close}:00`).getTime();

   for (let i = start; i < end; i += 1000 * 60 * 60) {
      waktuBooking.push({ start: i, end: i + 1000 * 60 * 60 });
   }

   const filter = waktuBooking.filter((time) => time.end != end);

   return filter;
};
