"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/user-error.js");

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

const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};

class UserAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("user");
  }

  async update(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("userUpdateDtoInType", dtoIn);

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

    //Sets up a dtoOut and receives specified user by ID

    let id = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified user

    if (!id) {
      throw new Errors.Update.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.id });
    }

    //Sets up a dtoOut and receives specified user by uuIdentity

    let uuIdentity = await this.dao.get(awid, dtoIn.uuIdentity);

    //Checks for existence of specified user

    if (uuIdentity) {
      if (uuIdentity.id != dtoIn.id) {
        throw new Errors.Update.UserAlreadyExists({ uuAppErrorMap }, { uuIdentity: dtoIn.uuIdentity });
      }
    }
    //Attemps to change the dao record

    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Update.UserDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("userGetDtoInType", dtoIn);

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

    //Sets up a dtoOut and receives specified user by ID

    let id = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified user

    if (!id) {
      throw new Errors.Get.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.id });
    }

    //attempts to acquire Dao record
    try {
      dtoOut = await this.dao.get(awid, dtoIn.id)
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Get.UserDaoGetFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }


    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("userListDtoInType", dtoIn);

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
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;

    //attemps to create a list out of Dao File

    try {
      dtoOut = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.List.UserDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("userDeleteDtoInType", dtoIn);

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

    //Sets up a dtoOut and receives specified user by ID

    let id = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified user

    if (!id) {
      throw new Errors.Delete.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.id });
    }

    //attemps to delete record
    try {
      dtoOut = await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.UserDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async create(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("userCreateDtoInType", dtoIn);

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

    //Sets up a dtoOut and receives specified user by ID

    let id = await this.dao.get(awid, dtoIn.id);

    //Checks for existence of specified user

    if (id) {
      throw new Errors.Create.UserAlreadyExists({ uuAppErrorMap }, { userId: dtoIn.id });
    }

    //Sets up a dtoOut and receives specified user by uuIdentity

    let uuIdentity = await this.dao.get(awid, dtoIn.uuIdentity);

    //Checks for existence of user with existing uuIdentity

    if (uuIdentity) {
      throw new Errors.Create.UserAlreadyExists({ uuAppErrorMap }, { uuIdentity: dtoIn.uuIdentity });
    }

    //attempts to create a new Dao record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.UserDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns dtoOut with ErrorMap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new UserAbl();
