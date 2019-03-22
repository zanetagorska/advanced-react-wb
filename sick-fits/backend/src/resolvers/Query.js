//if the same like in prisma
const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db")
};

// If different
// const Query = {
//   async items(parent, args, ctx, info) {
//     console.log("Getting Items!!");
//     const items = await ctx.db.query.items();
//     return items;
//   }
// };

module.exports = Query;
