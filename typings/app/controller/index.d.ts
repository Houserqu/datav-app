// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/controller/app';
import ExportCategory from '../../../app/controller/category';
import ExportComponent from '../../../app/controller/component';

declare module 'egg' {
  interface IController {
    app: ExportApp;
    category: ExportCategory;
    component: ExportComponent;
  }
}
