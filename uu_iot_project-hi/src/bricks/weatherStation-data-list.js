//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createComponent,  useDataList } from "uu5g05";

import Config from "./config/config.js";
import Calls from "../calls.js";

function WeatherStationDataList(Component, displayName) {
  return createComponent({
    //@@viewOn:statics
    displayName,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const weatherStationListData = useDataList({
        handlerMap: {
          load: Calls.WeatherStation.list
        },
        initialDtoIn: {},
      });

      let result;

      switch (weatherStationListData.state) {
        case "pendingNoData":
        case "pending":
          result = <UU5.Bricks.Loading />;
          break;
        case "readyNoData":
        case "ready":
          result = <Component {...props} data={weatherStationListData.data} />;
          break;
        case "errorNoData":
        case "error":
          result = <UU5.Bricks.Error data={weatherStationListData.error} />;
      }

      return result;
    },
  });
  //@@viewOff:render
}


//@@viewOn:exports
export { WeatherStationDataList };
export default WeatherStationDataList;
//@@viewOff:exports
