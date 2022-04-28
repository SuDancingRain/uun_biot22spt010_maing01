/* eslint-disable */

const weatherStationCreateDtoInType = shape({
  name:uu5String(255).isRequired(),
  info:uu5String(255),
  code:uu5String(10).isRequired(),
  userPool:array(id())
  });
  
const weatherStationDeleteDtoInType = shape({
    id:id().isRequired(),
});

const weatherStationListDtoInType = shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const weatherStationGetDtoInType = shape({
  id:id().isRequired(),
});

const weatherStationUpdateDtoInType = shape({
  id:id().isRequired(),
  name:uu5String(255),
  info:uu5String(255),
  code:uu5String(10),
  userPool:array(id())
});
