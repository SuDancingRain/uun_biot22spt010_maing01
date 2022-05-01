//@@viewOn:imports
import { Utils, createVisualComponent, useState, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Tiles from "uu5tilesg02";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import Calls from "../calls.js";
import Lsi from "./user-lsi.js";
import UserForm from "../bricks/user-form.js"
//@@viewOff:imports

//@@viewOn:constants
const nestingLevel = "bigBoxCollection"
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let User = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "User",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    const userListData = useDataList({
      handlerMap: {
        load: Calls.User.list,
        createItem: Calls.User.create,
      },
      itemHandlerMap: {
        update: Calls.User.update,
        delete: Calls.User.delete,
      },
      initialDtoIn: {},
    });



    //@@viewOff:private

    //@@viewOn:interface
    
    function handleCreateUser(newUserData) {
      return userListData.handlerMap.createItem(newUserData);
    }

    function handleUpdateUser(updatedUserData) {
      return selectedUser.handlerMap.update(updatedUserData);
    }

    async function handleUserDelete() {
      await userToDelete.handlerMap.delete({ id: userToDelete.data.id });
      setUserToDelete(null);
      window.location.reload();
    }
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const currentNestingLevel =  Utils.NestingLevel.getNestingLevel(props, nestingLevel)
    
    function getCollumns() {
      return [
        
        
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name}/>,
          cell: (cellProps) => cellProps.data.data.name,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.role}/>,
          cell: (cellProps) => cellProps.data.data.role,
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
                    onClick={() => setSelectedUser(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setUserToDelete(cellProps.data)}
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
    const Filter =[
      
    ]
    const Sorter =[
      
    ]

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        {
          selectedUser && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedUser?.id ? Lsi.updateUser : Lsi.createUser} />}
              shown={!!selectedUser}
              onClose={() => setSelectedUser(null)}
            >
              <UserForm
                selectedUser={selectedUser.data}
                setSelectedUser={setSelectedUser}
                handleCreateUser={handleCreateUser}
                handleUpdateUser={handleUpdateUser}
              />
            </UU5.Bricks.Modal>
          )
        }

        {userToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm User Deletion"}
            shown={true}
            onClose={() => setUserToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setUserToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleUserDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        
        <UU5.Bricks.Container>
          <Uu5Tiles.ControllerProvider data={userListData.data || []} >
        <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedUser({data: {} })}>
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

User = withRoute(User, { authenticated: true });

//@@viewOn:exports
export { User };
export default User;
//@@viewOff:exports
