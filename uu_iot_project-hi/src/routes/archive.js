//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import LSI from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import WeatherStationDataList from "../bricks/weatherStation-data-list"
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Archive = WeatherStationDataList(
  createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "Archive",
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const weatherStationAvailableTags = [];
      if (props.data) {
        props.data.forEach((weatherStation) => {
          weatherStationAvailableTags.push({
            value: weatherStation.data.id,
            content: weatherStation.data.code,
          });
        });
      }
      //@@viewOff:private

      //@@viewOn:interface
      //@@viewOff:interface

      //@@viewOn:render
      const attrs = Utils.VisualComponent.getAttrs(props);
      return (
        <div {...attrs}>
          <RouteBar />
          <UU5.Forms.TagSelect
            availableTags={weatherStationAvailableTags}
          />

        </div>
      );
      //@@viewOff:render
    },
  }));

Archive = withRoute(Archive, { authenticated: true });

//@@viewOn:exports
export { Archive };
export default Archive;
//@@viewOff:exports
