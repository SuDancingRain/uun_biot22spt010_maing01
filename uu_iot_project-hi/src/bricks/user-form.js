//@@viewOn:imports
import UU5 from "uu5g04";
import { Utils, createVisualComponent, useDataList } from "uu5g05";

import Calls from "../calls.js";
import Lsi from "../routes/user-lsi";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UserForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedUser: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedUser: UU5.PropTypes.func,
    handleCreateUser: UU5.PropTypes.func,
    handleUpdateUser: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const userListData = useDataList({
      handlerMap: {
        load: Calls.User.list,
      },
      initialDtoIn: {},
    });


    const userAvailableTags = [];
    if (userListData.data) {
      userListData.data.forEach((user) => {
        userAvailableTags.push({
          value: user.data.id,
          value: user.data.name,
          value: user.data.uuIdentity,
          value: user.data.role,
        });
      });
    }

    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedUser?.id) await props.handleUpdateUser({ id: props.selectedUser.id, ...opt.values });
        else await props.handleCreateUser(opt.values);
        opt.component.setReady();
        props.setSelectedUser(null);
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

        <UU5.Forms.Form
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
          onSave={handleOnSave}
          onCancel={() => props.setSelectedUser(null)}
        >
          <UU5.Forms.Text
            name={"uuIdentity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
            value={props.selectedUser?.uuIdentity || ""}
          />
          <UU5.Forms.Text
            name={"name"}
            label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
            value={props.selectedUser?.name || ""}
          />
          <UU5.Forms.Select
            name={"role"}
            label={<UU5.Bricks.Lsi lsi={Lsi.role} />}
          >

            <UU5.Forms.Select.Option value="Administrator" />
            <UU5.Forms.Select.Option value="User" />

          </UU5.Forms.Select>

          <UU5.Bricks.Line size={"s"} />
          <UU5.Forms.Controls
            buttonReset
          />
        </UU5.Forms.Form>



      </div >
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UserForm };
export default UserForm;
//@@viewOff:exports
