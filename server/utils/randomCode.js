const otpCode = () => {
   const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

   return dataRandom(numbers, 6);
};

const orderId = () => {
   const char = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

   return dataRandom(char, 12);
};

const dataRandom = (arr, range) => {
   let result = "";

   for (let i = 0; i < arr.length; i++) {
      const rand = Math.floor(Math.random() * arr.length);

      if (result.length === range) return result;
      result += arr[rand];
   }
};

module.exports = { otpCode, orderId };
