const ul = document.querySelector("ul");
const now = Date.now();
const week = now + 1000 * 60 * 60 * 24 * 7;
const dates = [];

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

for (let i = now; i < week; i += 1000 * 60 * 60 * 24) {
   const date = new Date(i).toDateString().split(" ");
   let day = getDay(date[0]);

   dates.push(`${day}, ${date[2]} ${date[1]} ${date[3]}`);
}
