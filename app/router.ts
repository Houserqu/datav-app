import { Application } from "egg"

export default (app: Application) => {
  const { controller, router } = app

  // application
  router.get("/api/app/list", controller.app.list)
  router.get("/api/app/some", controller.app.some) // id = id1, id2
  router.post("/api/app/create", controller.app.create) // data
  router.post("/api/app/update", controller.app.update) // data: { id }
  router.post("/api/app/delete", controller.app.delete) // id = id1, id2

  // 设置应用状态
  router.post("/api/app/set-status", controller.app.setStatus) //

  // 数据管理
  router.get("/api/source/list", controller.source.list)
  router.get("/api/source/some", controller.source.some) // id = id1, id2
  router.post("/api/source/create", controller.source.create) // data
  router.post("/api/source/update", controller.source.update) // data: { id }
  router.post("/api/source/delete", controller.source.delete) // id = id1, id2

  router.get(
    "/api/app/category/list_com",
    controller.category.listWithComponent
  )
  router.get("/api/app/category/list", controller.category.list)
}
