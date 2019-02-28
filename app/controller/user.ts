import { Controller } from 'egg';

export default class RoleController extends Controller {
  public async userPermission() {
    const { ctx: { helper, service, params } } = this;
    console.log(params.id)
    const result = await service.roles.getUserPermissions(params.id)
    const permissions = result.map(v => v.code)

    helper.resSuccess(permissions);
  }
}