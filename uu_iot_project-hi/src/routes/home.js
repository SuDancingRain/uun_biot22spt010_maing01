//@@viewOn:imports
import { Utils, createVisualComponent, useSession, useState, useDataList} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Tiles from "uu5tilesg02";

import Config from "./config/config.js";
import Lsi from "./home-lsi";
import Calls from "../calls";
import RouteBar from "../core/route-bar.js";
import WeatherStationForm from "../bricks/weather-station-form.js";
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
    const { identity } = useSession();

    const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);
    const [weatherStationToDelete, setWeatherStationToDelete] = useState(null);

    const weatherStationListData = useDataList({
      handlerMap: {
        load: Calls.WeatherStation.list,
        createItem: Calls.WeatherStation.create,
      },
      itemHandlerMap: {
        update: Calls.WeatherStation.update,
        delete: Calls.WeatherStation.delete,
      },
      initialDtoIn: {},
    });

    //@@viewOff:private

    //@@viewOn:interface

    function handleCreateWeatherStation(newWeatherStationData) {
      return weatherStationListData.handlerMap.createItem(newWeatherStationData);
    }

    function handleUpdateWeatherStation(updatedWeatherStationData) {
      return selectedWeatherStation.handlerMap.update(updatedWeatherStationData);
    }

    async function handleWeatherStationDelete() {
      await weatherStationToDelete.handlerMap.delete({ id: weatherStationToDelete.data.id });
      setWeatherStationToDelete(null);
      window.location.reload();
    }

    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.name,

        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.info} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.info,

        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.code} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.code,

        },
        {
          cell: (cellProps) => {
            if (cellProps.data.state.includes("pending")) {
              return <UU5.Bricks.Loading />
            } else {
              return (
                <>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedWeatherStation(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setWeatherStationToDelete(cellProps.data)}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-close"
                    />
                  </UU5.Bricks.Button>
                </>
              );
            }
          },
        },
      ];
    }

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
                handleUpdateWeatherStation={handleUpdateWeatherStation}
              />
            </UU5.Bricks.Modal>
          )
        }

        {weatherStationToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm WeatherStation Deletion"}
            shown={true}
            onClose={() => setWeatherStationToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setWeatherStationToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleWeatherStationDelete} >
                Confirm
              </UU5.Bricks.Button>
              
            </div>
          </UU5.Bricks.Modal>
          
        )
        }


        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={weatherStationListData.data || []}>
            <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedWeatherStation({ data: {} })}>
              <UU5.Bricks.Icon icon={"mdi-plus"} />
              <UU5.Bricks.Lsi lsi={Lsi.create} />
            </UU5.Bricks.Button>
            <Uu5Tiles.List columns={getCollumns()} rowAlignment="center" rowHeight={150} />
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
