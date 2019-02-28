// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTest from '../../../app/service/Test';
import ExportPermissions from '../../../app/service/permissions';
import ExportRoles from '../../../app/service/roles';

declare module 'egg' {
  interface IService {
    test: ExportTest;
    permissions: ExportPermissions;
    roles: ExportRoles;
  }
}
