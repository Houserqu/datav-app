import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // application
  router.get('/api/app/list', controller.app.list);
  router.get('/api/app/some', controller.app.some);  // id = id1, id2
  router.post('/api/app/create', controller.app.create); // data
  router.post('/api/app/update', controller.app.update); // data: { id }
  router.post('/api/app/delete', controller.app.delete); // id = id1, id2
};
