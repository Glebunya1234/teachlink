/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { NotificationDTO } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class IsChekedRole<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name IsChekedRoleDetail
   * @request GET:/api/IsChekedRole/{id}
   * @secure
   */
  isChekedRoleDetail = (id: string, params: RequestParams = {}) =>
    this.request<NotificationDTO, void>({
      path: `/api/IsChekedRole/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
