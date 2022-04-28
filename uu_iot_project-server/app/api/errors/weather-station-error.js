"use strict";

const IotProjectUseCaseError = require("./iot-project-use-case-error.js");
const WEATHER_STATION_ERROR_PREFIX = `${IotProjectUseCaseError.ERROR_PREFIX}weatherStation/`;

const Create = {
  UC_CODE: `${WEATHER_STATION_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  WeatherStationAlreadyExists: class extends IotProjectUseCaseError{
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}weatherStationAlreadyExists`;
      this.message = "WeatherStation already exists.";
    }
  },
  WeatherStationDaoCreateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}weatherStationDaoCreateFailed`;
      this.message = "Failed to create WeatherStation.";
    }
  },
};

const Delete = {
  UC_CODE: `${WEATHER_STATION_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  WeatherStationDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}weatherStationDoesNotExist`;
      this.message = "WeatherStation does not exist.";
    }
  },
  WeatherStationDaoDeleteFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}weatherStationDaoDeleteFailed`;
      this.message = "Failed to delete WeatherStation.";
    }
  },
};

const List = {
  UC_CODE: `${WEATHER_STATION_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  WeatherStationDaoListFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}weatherStationDaoListFailed`;
      this.message = "Failed to list WeatherStation.";
    }
  },
};

const Get = {
  UC_CODE: `${WEATHER_STATION_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  WeatherStationDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}weatherStationDoesNotExist`;
      this.message = "WeatherStation does not exist.";
    }
  },
  WeatherStationDaoGetFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}weatherStationDaoGetFailed`;
      this.message = "Failed to get WeatherStation.";
    }
  },
};

const Update = {
  UC_CODE: `${WEATHER_STATION_ERROR_PREFIX}update/`,
  
  InvalidDtoIn: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  WeatherStationDoesNotExist: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}weatherStationDoesNotExist`;
      this.message = "WeatherStation does not exist.";
    }
  },
  WeatherStationAlreadyExists: class extends IotProjectUseCaseError{
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}weatherStationAlreadyExists`;
      this.message = "WeatherStation already exists.";
    }
  },
  WeatherStationDaoUpdateFailed: class extends IotProjectUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}weatherStationDaoUpdateFailed`;
      this.message = "Failed to update WeatherStation.";
    }
  },
};

module.exports = {
  Update,
  Get,
  List,
  Delete,
  Create
};
