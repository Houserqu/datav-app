// import { createAppObj } from './../service/app';
import { createAppObj } from '../service/app';
import { Controller } from 'egg';
import * as R from 'ramda';

// 创建资源字段校验规则
const createRule = {
  name: 'string',
  start_time: 'string?',
  end_time: 'string?',
  describe: 'string?',
  logo: 'string?',
  access: 'int?',
  com_theme_id: 'int',
  page_theme_id: 'int',
  user_id: 'int'
};

export default class AppController extends Controller {
  // 资源列表
  public async list() {
    const { ctx: { helper, service, query } } = this;

    try {
      const res = await service.app.getAppList(parseInt(query.pageSize), parseInt(query.page || 1), query.noPage);
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 单个资源
  public async some() {
    const { ctx: { helper, service, query } } = this;
    try {
      const res = await service.app.getApp(query.id.split(','));
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message);
    }
  }

  // 创建资源
  public async create() {
    const { ctx: { helper, request, service } } = this;
    console.log(helper.getUserId())
    const newApp = R.pick(Object.keys(createRule), { ...request.body, user_id: helper.getUserId() })

    // 参数校验
    if (!helper.validate(createRule, newApp)) return;

    try {
      const id = await service.app.createApp(newApp as createAppObj);
      helper.resSuccess(id);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 删除资源
  public async delete() {
    const { ctx: { helper, service, request } } = this;

    try {
      await service.app.delApp(request.body.id.split(','));
      helper.resSuccess(request.body.id);
    } catch (e) {
      helper.resError(e.message)
    }
  }

  // 更新资源
  public async update() {
    const { ctx: { helper, request, service, params } } = this;
    const updateApp = R.pick(['id', ...Object.keys(createRule)], request.body)

    // 参数校验
    if (!helper.validate({ id: 'int' }, updateApp)) return;

    try {
      const curApp = await service.app.getApp([updateApp.id]);

      if (curApp.length > 0 && (curApp[0].user_id === helper.getUserId())) {
        await service.app.updateApp(updateApp as createAppObj);
        helper.resSuccess(params.id);
      } else {
        helper.resError('应用不存在或者没有操作权限')
      }

    } catch (e) {
      helper.resError(e.message)
    }
  }
}
