export const setTitle = (title) => {
   document.title = title;
};

export const toRupiah = (price) => {
   let cost;
   cost = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
   }).format(price);

   cost = cost.split(",");
   cost.pop();
   return cost.join();
};

export const timeString = (time) => {
   return `${new Date(time).getHours()}:${new Date(time).getMinutes().toString().length > 1 ? new Date(time).getMinutes() : "00"}`;
};

export const dateString = (date) => {
   return new Date(date).toDateString().split(" ");
};
