// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportPermissions from '../../../app/controller/permissions';
import ExportRoles from '../../../app/controller/roles';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    permissions: ExportPermissions;
    roles: ExportRoles;
    user: ExportUser;
  }
}
