//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useState, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Tiles from "uu5tilesg02";

import Config from "./config/config.js";
import Lsi from "./home-lsi";
import Calls from "../calls";
import RouteBar from "../core/route-bar.js";
import WeatherStationForm from "../bricks/weather-station-form.js";
import DataTile from "../bricks/data-tile.js";
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"

//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  ...nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);

    const weatherStationListData = useDataList({
      handlerMap: {
        load: Calls.WeatherStation.list,
        createItem: Calls.WeatherStation.create,
      },
      initialDtoIn: {},
    });

    //@@viewOff:private

    //@@viewOn:interface

    function handleCreateWeatherStation(newWeatherStationData) {
      return weatherStationListData.handlerMap.createItem(newWeatherStationData);
    }

    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        {
          selectedWeatherStation && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedWeatherStation?.id ? Lsi.updateWeatherStation : Lsi.createWeatherStation} />}
              shown={!!selectedWeatherStation}
              onClose={() => setSelectedWeatherStation(null)}
            >
              <WeatherStationForm
                selectedWeatherStation={selectedWeatherStation.data}
                setSelectedWeatherStation={setSelectedWeatherStation}
                handleCreateWeatherStation={handleCreateWeatherStation}
              />
            </UU5.Bricks.Modal>
          )
        }

        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={weatherStationListData.data || []}>
            <div css = "text-align:center">
            <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedWeatherStation({ data: {} })}>
              <UU5.Bricks.Icon icon={"mdi-plus"} />
              <UU5.Bricks.Lsi lsi={Lsi.create} />
            </UU5.Bricks.Button>
            </div>
            <Uu5Tiles.Grid
              tileMinWidth={200}
              tileMaxWidth={400}
              tileSpacing={8}
              rowSpacing={8}
            >
              <DataTile />
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>
        </UU5.Bricks.Container>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
