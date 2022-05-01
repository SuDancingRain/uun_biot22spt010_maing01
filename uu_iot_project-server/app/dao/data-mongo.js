"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DataMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

  async getByCode(awid, weatherStationCode) {
    return await super.findOne({ weatherStationCode, awid });
  }

  //Will be deleted for testing purposes
  async view(awid, weatherStationCode,order, pageInfo) {
    const filter = { awid , weatherStationCode};
    const sort = { date: order === "asc" ? 1 : -1 };

    return await super.find(filter, pageInfo, sort);
  }

  async viewRange(awid, startDate, endDate,order, pageInfo) {
    const filter = { awid };
    const sort = { date: order === "asc" ? 1 : -1 };
    const range = {$gte:ISODate(startDate),$lt:ISODate(endDate)}
    return await super.find(filter, pageInfo, sort ,range)
  }

}

module.exports = DataMongo;
