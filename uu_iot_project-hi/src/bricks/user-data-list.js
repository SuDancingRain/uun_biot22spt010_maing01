//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createComponent,  useDataList } from "uu5g05";

import Config from "./config/config.js";
import Calls from "../calls.js";

function UserDataList(Component, displayName) {
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
      const userListData = useDataList({
        handlerMap: {
          load: Calls.User.list
        },
        initialDtoIn: {},
      });

      let result;

      switch (userListData.state) {
        case "pendingNoData":
        case "pending":
          result = <UU5.Bricks.Loading />;
          break;
        case "readyNoData":
        case "ready":
          result = <Component {...props} data={userListData.data} />;
          break;
        case "errorNoData":
        case "error":
          result = <UU5.Bricks.Error data={userListData.error} />;
      }

      return result;
    },
  });
  //@@viewOff:render
}


//@@viewOn:exports
export { UserDataList };
export default UserDataList;
//@@viewOff:exports
