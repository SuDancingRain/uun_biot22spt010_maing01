import UU5 from "uu5g04";
import { Utils, createVisualComponent, useState, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import Uu5Tiles from "uu5tilesg02";

import config from "../config/config";
import Calls from "../calls";
import Lsi from "../data-tile-lsi.js"
import WeatherStationDataList from "./weatherStation-data-list";

const nestingLevel = "bigBoxCollection"

const DataTile = WeatherStationDataList(
    createVisualComponent({

        render(props) {
            const attrs = Utils.VisualComponent.getAttrs(props);
            const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel)
            return currentNestingLevel ? (
                <div {...attrs}>

                </div>
            ) : null;
        },
    })
);

export { DataTile };
export default DataTile;