const bcrypt = require("bcrypt");

const hashPassword = (password) => {
   const saltRounds = 10;
   const hash = bcrypt.hashSync(password, saltRounds);
   return hash;
};

const comparePassword = (password, hash) => {
   return bcrypt.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
