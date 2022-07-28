import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // ---------- Config ----------
  router.post('/api/get/config', controller.config.geAppConfig);

  // ---------- Report ----------
  router.post('/api/report', controller.report.userSubTableSave);
  router.post('/api/report/crash', controller.report.reportCrash);
};
