// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/service/app';
import ExportCategory from '../../../app/service/category';
import ExportComponent from '../../../app/service/component';
import ExportSource from '../../../app/service/source';

declare module 'egg' {
  interface IService {
    app: ExportApp;
    category: ExportCategory;
    component: ExportComponent;
    source: ExportSource;
  }
}
