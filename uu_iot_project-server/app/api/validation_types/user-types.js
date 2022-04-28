/* eslint-disable */

const userCreateDtoInType = shape({
    uuIdentity: uuIdentity().isRequired(),
    name: uu5String(255),
    role: oneOf(["Administrator", "User"]).isRequired(),
});

const userDeleteDtoInType = shape({
    id: id().isRequired(),
});

const userListDtoInType = shape({
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
        pageIndex: integer(),
        pageSize: integer(),
    }),
});

const userGetDtoInType = shape({
    id: id().isRequired(),
});

const userUpdateDtoInType = shape({
    id: id().isRequired(),
    uuIdentity: uuIdentity(),
    name: uu5String(255),
    role: oneOf(["Administrator", "User"]),
});
