"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/weather-station-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
};

const DEFAULT = {
  order: "des",
  pageIndex: 0,
  pageSize: 100,
}
class WeatherStationAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("weatherStation");
  }

  async update(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("weatherStationUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //Checks for existence of specified weatherStation

    dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Update.WeatherStationDoesNotExist({ uuAppErrorMap }, { weatherStationId: dtoIn.id });
    }

    //Checks for an existence of a weatherStation with a same code
    let name = dtoIn.name;
    let wSNameValid = await this.dao.getByName(awid, name);

    if (wSNameValid) {
      if (dtoIn.id != wSNameValid.id) {
        throw new Errors.Update.WeatherStationAlreadyExists({ uuAppErrorMap }, { code: name });
      }
    }

    //Checks for an existence of a weatherStation with a same code
    let code = dtoIn.code;
    let wSCodeValid = await this.dao.getByCode(awid, code);

    if (wSCodeValid) {
      if (dtoIn.id != wSCodeValid.id) {
        throw new Errors.Update.WeatherStationAlreadyExists({ uuAppErrorMap }, { code: code });
      }
    }

    //attempts to update a new Dao record

    dtoOut = await this.dao.update(dtoIn);

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("weatherStationGetDtoInType", dtoIn);

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

    //Acquires Dao Record and checks for existence of specified weatherStation

    let wSValidity = await this.dao.get(awid, dtoIn.id);

    if (!wSValidity) {
      throw new Errors.Get.WeatherStationDoesNotExist({ uuAppErrorMap }, { weatherStationId: dtoIn.id });
    }

    //Acquires Dao Record 

    dtoOut = await this.dao.get(awid, dtoIn.id);

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("weatherStationListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
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

    dtoOut = await this.dao.listForAdmin(awid, dtoIn.order, dtoIn.pageInfo);

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("weatherStationDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Receives awid

    dtoIn.awid = awid;

    //Sets up a dtoOut

    let dtoOut;

    //Checks for existence of specified weatherStation

    dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Delete.WeatherStationDoesNotExist({ uuAppErrorMap }, { weatherStationId: dtoIn.id });
    }

    //attemps to delete record
     await this.dao.delete(awid, dtoIn.id);


    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async create(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("weatherStationCreateDtoInType", dtoIn);

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


    //Checks for an existence of a weatherStation with a same name
    let name = dtoIn.name;
    let wSNameValid = await this.dao.getByName(awid, name);

    if (wSNameValid) {
      throw new Errors.Update.WeatherStationAlreadyExists({ uuAppErrorMap }, { code: name });
    }

    //Checks for an existence of a weatherStation with a same code
    let code = dtoIn.code;
    let wSCodeValid = await this.dao.getByCode(awid, code);

    if (wSCodeValid) {
      throw new Errors.Update.WeatherStationAlreadyExists({ uuAppErrorMap }, { code: code });
    }

    //attempts to create a new Dao record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.WeatherStationDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new WeatherStationAbl();
