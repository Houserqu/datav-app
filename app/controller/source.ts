// import { createAppObj } from './../service/app';
import { createAppObj } from "../service/source"
import { Controller } from "egg"
import * as R from "ramda"

// 创建资源字段校验规则
const createRule = {
  name: "string",
  describe: "string?",
  type: "string",
  content: "string?",
  refresh: "string?",
  user_id: "int"
}

// 更新资源字段校验规则
const updateRule = {
  name: "string?",
  describe: "string?",
  type: "string?",
  content: "string?",
  refresh: "string?",
  user_id: "int",
  id: "int"
}

export default class SourceController extends Controller {
  // 资源列表
  public async list() {
    const {
      ctx: { helper, service, query }
    } = this

    try {
      const res = await service.source.getAppList(
        parseInt(query.pageSize),
        parseInt(query.page || 1),
        query.noPage
      )
      helper.resSuccess(res)
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 单个资源
  public async some() {
    const {
      ctx: { helper, service, query }
    } = this
    if (query.id) {
      try {
        const res = await service.source.getApp(query.id.split(","))
        helper.resSuccess(res)
      } catch (e) {
        helper.resError(e.message)
      }
    } else {
      helper.resSuccess([])
    }
  }

  // 创建资源
  public async create() {
    const {
      ctx: { helper, request, service }
    } = this
    console.log(helper.getUserId())
    const newApp = R.pick(Object.keys(createRule), {
      ...request.body,
      user_id: helper.getUserId()
    })

    console.log(newApp)
    // 参数校验
    if (!helper.validate(createRule, newApp)) return

    try {
      const id = await service.source.createApp(newApp as createAppObj)
      helper.resSuccess(id)
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 删除资源
  public async delete() {
    const {
      ctx: { helper, service, request }
    } = this
    try {
      const ids = request.body.id.split(",")

      await service.source.delApp(ids, helper.getUserId())
      helper.resSuccess(request.body.id)
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 设置状态
  public async setStatus() {
    const {
      ctx: { helper, service, request }
    } = this

    const id = parseInt(request.body.id)
    const status = parseInt(request.body.status)

    if (
      !helper.validate(
        {
          status: [1, 2, 3],
          id: "int"
        },
        { status, id }
      )
    )
      return

    try {
      await service.source.setStatus(id, status, helper.getUserId())
      helper.resSuccess(id)
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 更新资源
  public async update() {
    const {
      ctx: { helper, request, service, params }
    } = this
    const updateApp = R.pick([...Object.keys(updateRule)], request.body)

    // 参数校验
    if (!helper.validate({ id: "string" }, updateApp)) return

    try {
      await service.source.updateApp(
        updateApp as createAppObj,
        helper.getUserId()
      )
      helper.resSuccess(params.id)
    } catch (e) {
      helper.resError(e.message)
    }
  }
}
