import { Controller } from 'egg';

export default class ComponentController extends Controller {
  // 资源列表
  public async listWithComponent() {
    const { ctx: { helper, service } } = this;

    try {
      const res = await service.category.getCategoryWithComponent();
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  public async list() {
    const { ctx: { helper, service } } = this;

    try {
      const res = await service.category.getCategoryList();
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message)
    }
  }
}
