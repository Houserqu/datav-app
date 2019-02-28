import { createRoleObj } from '../service/roles';
import { Controller } from 'egg';
import auth from '../extend/auth'

export default class RoleController extends Controller {
  // 资源列表
  @auth('ROLE_LIST')
  public async index() {
    const { ctx: { helper, service, query } } = this;
    const res = await service.roles.getRolesList(parseInt(query.pageSize), parseInt(query.page || 1));
    if (res) {
      helper.resSuccess(res);
    } else {
      helper.resError('获取资源列表失败')
    }
  }

  // 单个资源
  public async show() {
    const { ctx: { helper, service, params } } = this;
    const res = await service.roles.getRole(parseInt(params.id));

    if (res) {
      helper.resSuccess(res);
    } else {
      helper.resError('获取失败')
    }
  }

  // 创建资源
  public async create() {
    const { ctx: { helper, request, service } } = this;
    let newRole: createRoleObj = {
      name: request.body.name,
      code: request.body.code
    }

    try{
      const id = await service.roles.createRole(newRole);
      helper.resSuccess(id);
    } catch(e) {
      helper.resError(e.message)
    }
  }

  // 删除资源
  public async destroy() {
    const { ctx: { helper, service, params } } = this;

    const res = await service.roles.delRole(params.id);

    if (res.affectedRows > 0) {
      helper.resSuccess(params.id);
    } else {
      helper.resError('删除失败')
    }
  }

  // 更新资源
  public async update() {
    const { ctx: { helper, request, service, params } } = this;
    let updateRole: createRoleObj = request.body;
    updateRole.id = parseInt(params.id);

    try{
      const id = await service.roles.updateRole(updateRole);
      helper.resSuccess(id);
    } catch(e) {
      helper.resError(e.message)
    }
  }

  // 获取角色权限
  public async rolePermissions() {
    const { ctx: { helper, service, params } } = this;

    try{
      const permissions = await service.roles.getRolePermissions(params.id);
      helper.resSuccess(permissions.map(v => v.code));
    } catch(e) {
      helper.resError(e.message)
    }
  }

  // 更新角色权限
  public async updateRolePermissions() {
    const { ctx: { helper, service, params, request } } = this;

    try{
      await service.roles.updateRolePermissions({
        role_id: params.id, 
        permission_ids: request.body.permission_ids 
      });
      helper.resSuccess(params.id);
    } catch(e) {
      helper.resError(e.message)
    }
  }
}
