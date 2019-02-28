import { createPermissionObj } from '../service/permissions';
import { Controller } from 'egg';

// 创建资源字段校验规则
const createRule = {
  type: 'string',
  code: { type: 'string', max: 35 },
  app: 'string',
  id: 'int'
};

export default class PermissionController extends Controller {
  // 资源列表
  public async index() {
    const { ctx: { helper, service, query } } = this;

    try {
      const res = await service.permissions.getPermissionsList(parseInt(query.pageSize), parseInt(query.page || 1), query.noPage);
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 单个资源
  public async show() {
    const { ctx: { helper, service, params } } = this;

    try {
      const res = await service.permissions.getPermission(parseInt(params.id));
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message);
    }
  }

  // 创建资源
  public async create() {
    const { ctx: { helper, request, service } } = this;
    let newPermission: createPermissionObj = {
      type: request.body.type,
      code: request.body.code,
      app: request.body.app,
    }

    // 参数校验
    if (!helper.validate(createRule, newPermission)) return;

    try{
      const id = await service.permissions.createPermission(newPermission);
      helper.resSuccess(id);
    } catch(e) {
      helper.resError(e.message)
    }
  }

  // 删除资源
  public async destroy() {
    const { ctx: { helper, service, params } } = this;

    try {
      await service.permissions.delPermission(params.id);
      helper.resSuccess(params.id);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 更新资源
  public async update() {
    const { ctx: { helper, request, service, params } } = this;
    let updatePermission: createPermissionObj = request.body;
    updatePermission.id = parseInt(params.id);

    // 参数校验
    if (!helper.validate(createRule, updatePermission)) return;

    try {
      await service.permissions.updatePermission(updatePermission);
      helper.resSuccess(params.id);
    } catch(e) {
      helper.resError(e.message)
    }
  }
}
