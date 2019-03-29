//user forwardTo if the same like in prisma
const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db")
};

module.exports = Query;
