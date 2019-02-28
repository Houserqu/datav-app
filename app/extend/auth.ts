import 'reflect-metadata';

export default function auth (auth) {
  return function (_target: any, _propertyKey: string, descriptor: any){
    const oldFunc = descriptor.value;

    descriptor.value = async function() {
      const { ctx: { headers, service, helper, app: { config } } } = this;

      if(!config.userIdHeaderKey) {
        throw new Error('未配置 userid 在请求 header 中的 key')
      } else {
        if(headers['certificate-userid']) {
          // 数据库查询用户权限
          const result = await service.roles.getUserPermissions(headers['certificate-userid'])
          const permissions = result.map(v => v.code)

          if (permissions.indexOf(auth) === -1) {
            helper.resError('无权限')
            return 
          }
        } else {
          helper.resError('获取 userid 失败')
          return 
        }
      }

      return oldFunc.apply(this, arguments);
    }

    return descriptor;
  }
}