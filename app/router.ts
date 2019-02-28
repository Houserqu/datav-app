import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // user 权限
  router.get('/api/auth/user/:id', controller.user.userPermission)

  // 角色权限管理
  router.get('/api/auth/roles/:id/permissions', controller.roles.rolePermissions);
  router.post('/api/auth/roles/:id/permissions', controller.roles.updateRolePermissions);

  // 角色管理
  router.resources('roles', '/api/auth/roles', controller.roles);


  // 权限管理
  router.resources('permissions', '/api/auth/permissions', controller.permissions);
};
