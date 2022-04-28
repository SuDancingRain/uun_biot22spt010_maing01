/* eslint-disable */

const dataViewDtoInType = shape({
  weatherStationId: id().isRequired(),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const dataGetDtoInType = shape({
  id: id().isRequired(),
  weatherStationId: id().isRequired(),
  startDate: date().isRequired(),
  endDate: date().isRequired(),
});
