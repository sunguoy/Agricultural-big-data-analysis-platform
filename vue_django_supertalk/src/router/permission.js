// import users from "../views/Permission/user/user.vue"

const routers = [
    {
        path: "role",
        name: "role",
        component: () => import("../views/user/role.vue"),
        meta: {
            title: "角色管理",
            requiresAuth: true,
            isShow:true,
        }
    },
    {
        path: "user",
        name: "user",
        component: () => import("../views/user/user.vue"),
        // component: () => import("../views/Permission/user/user.vue"),
        // component: users,
        meta: {
            title: "用户管理",
            requiresAuth: true,
            isShow:true,
        }
    }
]

export default routers