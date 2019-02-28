// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp from '../../../app/controller/app';

declare module 'egg' {
  interface IController {
    app: ExportApp;
  }
}
