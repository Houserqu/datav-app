// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/service/app';
import ExportCategory from '../../../app/service/category';
import ExportComponent from '../../../app/service/component';

declare module 'egg' {
  interface IService {
    app: ExportApp;
    category: ExportCategory;
    component: ExportComponent;
  }
}
