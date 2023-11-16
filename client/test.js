const waktuBooking = [];

const open = new Date("Nov 15, 2023 07:00:00").getTime();
const close = new Date("Nov 15, 2023 22:00:00").getTime();

for (let i = open; i < close; i += 1000 * 60 * 60 * 2) {
   waktuBooking.push({ start: i, end: i + 1000 * 60 * 60 });
   // waktuBooking.push(`${new Date(i).getHours()}:${new Date(i).getMinutes()}0 - ${new Date(i + 1000 * 60 * 60).getHours()}:${new Date(i + 1000 * 60 * 60).getMinutes()}0`);
}

waktuBooking.forEach((time) => {
   console.log(`${new Date(time.start).getHours()}:${new Date(time.start).getMinutes()}0 - ${new Date(time.end).getHours()}:${new Date(time.end).getMinutes()}0`);
});
