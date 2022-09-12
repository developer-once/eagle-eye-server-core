import type { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // ---------- Report ----------
  router.post('/api/report', controller.report.userSubTableSave);
  router.post('/api/report/crash', controller.report.reportCrash);
};
