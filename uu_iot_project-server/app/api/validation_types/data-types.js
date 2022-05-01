/* eslint-disable */

const dataViewDtoInType = shape({
  weatherStationCode: uu5String(10).isRequired(),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const dataGetDtoInType = shape({
  id: id().isRequired(),
  weatherStationCode: uu5String(10).isRequired(),
  startDate: date().isRequired(),
  endDate: date().isRequired(),
});
const dataCreateDtoInType = shape({
  
  weatherStationCode: uu5String(10),
  tempeture: uu5String(10),
  humidity: uu5String(10),
  date: datetime(),
});
