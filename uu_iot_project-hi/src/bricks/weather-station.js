//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";

import Config from "./config/config.js";
import LSI from "./weather-station-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const WeatherStation = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WeatherStation",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>

      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { WeatherStation };
export default WeatherStation;
//@@viewOff:exports
