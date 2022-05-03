//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createVisualComponent, useState, useDataList, useDataObject, useMemo} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Tiles from "uu5tilesg02";

import Config from "../config/config";
import Calls from "../calls";
import Lsi from "./data-tile-lsi.js"
import WeatherStationForm from "./weather-station-form";
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DataTile = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "DataTile",
    ...nestingLevel,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        dataToRender: UU5.PropTypes.object,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {

        //@@viewOn:private

        const [selectedWeatherStation, setSelectedWeatherStation] = useState(null);
        const [weatherStationToDelete, setWeatherStationToDelete] = useState(null);


        const weatherStationListData = useDataList({
            itemHandlerMap: {
                update: Calls.WeatherStation.update,
                delete: Calls.WeatherStation.delete
            },
            initialDtoIn: {},
        })

        const dataListData = useDataList({
            handlerMap: {
                load: Calls.Data.view
            },
            initialDtoIn: {code: props.dataToRender} ,
        });

        const weatherStationData = useDataObject({
            handlerMap:{
                load: Calls.WeatherStation.get
            },
            initialDtoIn: {id: props.dataToRender}
        })

        console.log(props.dataToRender)
console.log(weatherStationData);
        //@@viewOff:private

        //@@viewOn:interface
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
        const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel)
        return currentNestingLevel ? (
            <div {...attrs}>

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
                handleUpdateWeatherStation={handleUpdateWeatherStation}
              />
            </UU5.Bricks.Modal>

          )}

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

                )}

                <UU5.Bricks.Container>
                    <UU5.BlockLayout.Tile >
                        <UU5.BlockLayout.Block>

                            <UU5.BlockLayout.Row>
                                {weatherStationData.name}
                            </UU5.BlockLayout.Row>

                            <UU5.BlockLayout.Row>
                                <UU5.Bricks.Link>
                                    {weatherStationData.code}
                                </UU5.Bricks.Link>
                            </UU5.BlockLayout.Row>

                            <UU5.BlockLayout.Row>
                                {weatherStationData.info}
                            </UU5.BlockLayout.Row>

                            <UU5.BlockLayout.Row size="s">

                                <UU5.Bricks.Button
                                    colorSchema="blue"
                                    onClick={() => setSelectedWeatherStation(weatherStationData.data)}
                                >
                                    <UU5.Bricks.Icon icon="mdi-pencil" />
                                </UU5.Bricks.Button>
                                <UU5.Bricks.Button
                                    colorSchema="red"
                                    onClick={() => setWeatherStationToDelete(weatherStationData.data)}
                                >
                                    <UU5.Bricks.Icon
                                        icon="mdi-close"
                                    />
                                </UU5.Bricks.Button>

                            </UU5.BlockLayout.Row>

                        </UU5.BlockLayout.Block>
                    </UU5.BlockLayout.Tile>
                </UU5.Bricks.Container>
            </div >
        ) : null;

        //@@viewOff:render
    },
});

//@@viewOn:exports
export { DataTile };
export default DataTile;
//@@viewOff:exports