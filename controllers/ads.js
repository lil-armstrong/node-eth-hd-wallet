const assert = require("assert");

module.exports = (server) => {
  const {
    db,
  } = server.app;

  return {
    async create(req) {
      const { user } = req.pre.user;
      return db.create({ ...req.payload, owner: user.id});
    },

    // Delete advert
    async destroy(req) {
      const { id } = req.payload;
    
      return await ad.destroy({
        where: id
      });
    },

    // retrieve advert
    async get(req) {
      const { ad } = req.payload;

      return db.Ads.findByPk(ad);
    },

    // fetch all adverts
    async getAll(req) {
      return await db.Ads.findAll();
    },
  };
};
