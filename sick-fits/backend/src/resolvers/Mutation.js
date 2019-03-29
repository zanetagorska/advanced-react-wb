const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    console.log(item);

    return item;
  },
  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //ctx - contex in the request, db - prisma data base, mutation - access prisma.graphql Mutation
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: args.id
      },
      info
    );
  }
};

module.exports = Mutations;
