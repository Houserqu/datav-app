import { Application } from "egg"
import checkLogin from "./middleware/checkLogin"

export default (app: Application) => {
  const { controller, router } = app

  // application
  router.get("/api/app/list", controller.app.list)
  router.get("/api/app/user-list", checkLogin, controller.app.userList)
  router.get("/api/app/some", checkLogin, controller.app.some) // id = id1, id2
  router.post("/api/app/create", checkLogin, controller.app.create) // data
  router.post("/api/app/update", checkLogin, controller.app.update) // data: { id }
  router.post("/api/app/delete", checkLogin, controller.app.delete) // id = id1, id2

  // 设置应用状态
  router.post("/api/app/set-status", checkLogin, controller.app.setStatus) //

  // 数据管理
  router.get("/api/source/list", checkLogin, controller.source.list)
  router.get("/api/source/some", checkLogin, controller.source.some) // id = id1, id2
  router.post("/api/source/create", checkLogin, controller.source.create) // data
  router.post("/api/source/update", checkLogin, controller.source.update) // data: { id }
  router.post("/api/source/delete", checkLogin, controller.source.delete) // id = id1, id2

  router.get(
    "/api/app/category/list_com",
    checkLogin,
    controller.category.listWithComponent
  )
  router.get("/api/app/category/list", checkLogin, controller.category.list)
}
