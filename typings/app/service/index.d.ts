// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/service/app';

declare module 'egg' {
  interface IService {
    app: ExportApp;
  }
}
