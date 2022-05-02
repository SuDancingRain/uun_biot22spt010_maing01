//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createVisualComponent, useState, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Tiles from "uu5tilesg02";

import Config from "../config/config";
import Calls from "../calls";
import Lsi from "./data-tile-lsi.js"
import WeatherStationDataList from "./weatherStation-data-list";
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DataTile = WeatherStationDataList(
    createVisualComponent({
        //@@viewOn:statics
        uu5Tag: Config.TAG + "DataTile",
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

            const dataListData = useDataList({
                handlerMap: {
                    load: Calls.Data.view
                },
                initialDtoIn: {},
            });

            //@@viewOff:private

            //@@viewOn:interface

            //@@viewOff:interface

            //@@viewOn:render

            const attrs = Utils.VisualComponent.getAttrs(props);
            const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel)
            return currentNestingLevel ? (
                <div {...attrs}>
                    <UU5.Bricks.Container>
                    <UU5.BlockLayout.Tile >
                        <UU5.BlockLayout.Block>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Text icon="mdi-factory">
                                    Company ({<UU5.Bricks.Icon icon="mdi-lock" />})
                                </UU5.BlockLayout.Text>
                            </UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Row>
                                <UU5.Bricks.Link>
                                    +5 (60) 400-168-258
                                </UU5.Bricks.Link>
                            </UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Row>
                                Here I am every time.
                            </UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Row size="s">
                                <UU5.Bricks.Link>
                                    <UU5.BlockLayout.Text icon="mdi-map-marker">
                                        Show on map
                                    </UU5.BlockLayout.Text>
                                </UU5.Bricks.Link> <UU5.BlockLayout.Text weight="secondary">50.107577, 14.453512</UU5.BlockLayout.Text>
                            </UU5.BlockLayout.Row>
                        </UU5.BlockLayout.Block>
                    </UU5.BlockLayout.Tile>
                </UU5.Bricks.Container>
                </div >
            ) : null;

    //@@viewOff:render
        },
    })
);

//@@viewOn:exports
export { DataTile };
export default DataTile;
//@@viewOff:exports