const otpCode = () => {
   const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
   let otp = "";

   for (let i = 0; i < numbers.length; i++) {
      const rand = Math.floor(Math.random() * numbers.length);

      if (otp.length === 6) return otp;
      otp += numbers[rand];
   }
};

module.exports = otpCode;
