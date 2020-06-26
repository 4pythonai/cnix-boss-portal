
const routes = {
    path: "/",

    indexRoute: { onEnter: (nextState, replace) => replace("/home") },
    childRoutes: [
        require("./home").default,
<<<<<<< HEAD
        require("./completionOrder").default,
        require("./completionOrdercompare").default,       
        require("./lineCompletionOrder").default,
        require("./tableDetail").default,
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
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
<<<<<<< HEAD
        require("./contractRetreatLine").default,
        require("./saleschancemnt").default,
        require("./custportal").default,
=======
        require("./custportal").default,



>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    ]
};


export {
    routes
}

