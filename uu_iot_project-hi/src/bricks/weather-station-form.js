//@@viewOn:imports
import { Utils, createVisualComponent, useDataList } from "uu5g05";

import Config from "./config/config.js";
import Calls from "../calls.js";
import { Form } from "uu5g05-forms";
import { Forms } from "uu5g04";
import Lsi from "./weather-station-lsi";
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const WeatherStationForm = createVisualComponent({
    //@@viewOn:statics
    uu5Tag: Config.TAG + "WeatherStationForm",
    ...nestingLevel,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {
        shown: UU5.PropTypes.bool,
        selectedWeatherStation: UU5.PropTypes.object,
        setFormOpened: UU5.PropTypes.func,
        setSelectedWeatherStation: UU5.PropTypes.func,
        handleCreateWeatherStation: UU5.PropTypes.func,
        handleUpdateWeatherStation: UU5.PropTypes.func,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        const weatherStationListData = useDataList({
            handlerMap: {
                load: Calls.WeatherStation.list,
            },
            initialDtoIn: {},
        });

        const weatherStationAvailableTags = [];
        if (weatherStationListData.data) {
            weatherStationListData.data.forEach((weatherStation) => {
                weatherStationAvailableTags.push({
                    value: weatherStation.data.id,
                    value: weatherStation.data.name,
                    value: weatherStation.data.info,
                    value: weatherStation.data.code,
                    value: weatherStation.data.userPool,
                });
            });
        }

        const userAvailableTags = [];
        if (props.data) {
            props.data.forEach((user) => {
                
                    userAvailableTags.push({
                        value: user.data.id,
                        content: user.data.name,
                    });
                
            });
        }

        async function handleOnSave(opt) {
            opt.component.setPending();
            try {
                if (props.selectedWeatherStation?.id) await props.handleUpdateWeatherStation({ id: props.selectedWeatherStation.id, ...opt.values });
                else await props.handleCreateWeatherStation(opt.values);
                opt.component.setReady();
                props.setSelectedWeatherStation(null);
            } catch (e) {
                opt.component.getAlertBus().setAlert({
                    content: <UU5.Bricks.Lsi lsi={Lsi.unsuccessful} />,
                    colorSchema: "red",
                });
                opt.component.setReady();
            }
        }
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = Utils.VisualComponent.getAttrs(props);
        const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, nestingLevel)
        return currentNestingLevel ? (
            <div {...attrs}>
                <Forms.Form
                
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
                    onSave={handleOnSave}
                    onCancel={() => props.selectedWeatherStation(null)}
                >

                    <Forms.Text
                        name={"name"}

                        label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
                        value={props.selectedWeatherStation?.name || ""}
                    />

                    <Forms.Text
                        name={"info"}
                        label={<UU5.Bricks.Lsi lsi={Lsi.info} />}

                        value={props.selectedWeatherStation?.info || ""}

                    />
                    <Forms.Text
                        name={"code"}
                        label={<UU5.Bricks.Lsi lsi={Lsi.code} />}

                        value={props.selectedWeatherStation?.code || ""}
                    />

                    <Forms.TagSelect
                        name={"userPool"}
                        label={<UU5.Bricks.Lsi lsi={Lsi.userPool} />}
                        value={props.selectedWeatherStation?.supervisors || []}
                        availableTags={userAvailableTags}
                        multiple={false}
                    />

                    <Forms.Controls
                        buttonReset
                    />

                </Forms.Form>
            </div>
        ) : null;
        //@@viewOff:render
    },
});

//@@viewOn:exports
export { WeatherStationForm };
export default WeatherStationForm;
//@@viewOff:exports
