import BaseController from './BaseController';

/**
 * save report error msg to MYSQL
 * @controller 上报 Controller
 */
export default class ReportController extends BaseController {
  // --- save user report ---
  /**
   * @summary 上报接口
   * @router post /api/report
   * @request query string appkey 项目 appkey
   * @request query string event_type 事件类型
   * @response 200 SuccessBody 返回结果
   */
  public async report() {
    const { ctx, service } = this;
    const { userSubTable } = ctx.app.config;

    if (userSubTable) {
      this.userSubTableSave();
      return
    }
    /**
     *  直接上报，不分表
     */
    const data = ctx.request.body;
    const ip = ctx.request.ip;
    ctx.body = await service.report.saveReport(data, ip);
  }

  public async userSubTableSave() {
    const { ctx, service } = this;
    /**
     * 区分 PV/UV、用户上报、报错
     */
    const body = ctx.request.body;
    const ip = ctx.request.ip;
    let data: any;

    switch (body.event_type) {
      case "error":
      case "unhandledrejection":
        data = await service.report.saveError(body, ip);
        break
      case "ajaxLoad":
      case "fetchError":
      case "ajaxSlow":
        data = await service.report.savePageAjaxApi(body, ip);
        break
      case "resource":
        data = await service.report.savePageResource(body, ip);
        break
      case "uv":
      case "pv":
        data = await service.report.savePageUV(body, ip);
        break
      case "click":
        data = await service.report.savePageClick(body, ip);
        break
      default:
        data = await service.report.saveReport(body, ip);
        break;
    }

    this.success(data);
  }

  // --- save page crash ---
  public async reportCrash() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const data = await service.report.savePageCrash(body);

    this.success(data);
  }
}
