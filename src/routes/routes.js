
const routes = {
    path: "/",

    indexRoute: { onEnter: (nextState, replace) => replace("/home") },
    childRoutes: [
        require("./home").default,
        require("./auth").default,
        require("./flow").default,
        require("./commonAntTable").default,
        require("./dashboard").default,
        require("./processmanagement").default,
        require("./datagridmnt").default,
        require("./docs").default,
        require("./settings").default,
        require("./profile").default,
        require("./permissionManage").default,
        require("./contract").default,
        require("./custportal").default,



    ]
};


export {
    routes
}

