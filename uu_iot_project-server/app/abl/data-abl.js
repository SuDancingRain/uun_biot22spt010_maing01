"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/data-error.js");

const WARNINGS = {
  viewUnsupportedKeys: {
    code: `${Errors.View.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};

const DEFAULT = {
  order: "des",
  pageIndex: 0,
  pageSize: 100,
}
class DataAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("data");
    this.weatherStationDao = DaoFactory.getDao("weatherStation")
  }

  //FOR TESTING PURPOSES ONLY YOU FUCKING DUMBWIT FUCKAS
  async create(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("dataCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //attempts to create a new Dao record

    dtoOut = await this.dao.create(dtoIn);


    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }



  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("dataGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //Acquires Dao Record and checks for existence of specified data

    dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.DataDoesNotExist({ uuAppErrorMap }, { dataId: dtoIn.id });
    }

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async view(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("dataViewDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.View.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //Checks DtoIn for unfilled values which it fills from the default constant set in this file

    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULT.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULT.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULT.order;


    //attemps to create a list out of Dao File

    dtoOut = await this.dao.view(awid, dtoIn.weatherStationCode, dtoIn.order, dtoIn.pageInfo);

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new DataAbl();
