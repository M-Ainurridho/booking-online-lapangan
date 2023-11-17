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
