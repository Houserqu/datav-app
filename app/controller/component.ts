// import { createAppObj } from './../service/app';
// import { createAppObj } from '../service/app';
import { Controller } from 'egg';

// // 创建资源字段校验规则
// const createRule = {
//   name: 'string',
//   start_time: 'string?',
//   end_time: 'string?',
//   describe: 'string?',
//   logo: 'string?',
//   access: 'string?',
//   com_theme_id: 'string',
//   page_theme_id: 'string',
//   user_id: 'int'
// };

export default class ComponentController extends Controller {
  // 资源列表
  public async category() {
    const { ctx: { helper, service } } = this;

    try {
      const res = await service.component.getCategory();
      helper.resSuccess(res);
    } catch (e) {
      helper.resError(e.message)
    }
  }
}
