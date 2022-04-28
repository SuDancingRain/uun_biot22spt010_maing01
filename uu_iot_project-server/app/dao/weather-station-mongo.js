"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class WeatherStationMongo extends UuObjectDao {

  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async getByName(awid, name) {
    return await super.findOne({ name, awid });
  }

  async getByCode(awid, code) {
    return await super.findOne({ code, awid });
  }

  async listForAdmin(awid, order, pageInfo) {
    const filter = { awid };
    const sort = { name: order === "asc" ? 1 : -1 };

    return await super.find(filter, pageInfo, sort);
  }

  async listForReader(awid,userPool, order, pageInfo) {
    const filter = { awid, userPool };
    const sort = { name: order === "asc" ? 1 : -1 };

    return await super.find(filter, pageInfo, sort);
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = WeatherStationMongo;
