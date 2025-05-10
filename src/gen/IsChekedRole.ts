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

import { AuthDTO } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class IsChekedRole<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name IsChekedRoleDetail
   * @request GET:/api/IsChekedRole/{uid}
   * @secure
   */
  isChekedRoleDetail = (uid: string, params: RequestParams = {}) =>
    this.request<AuthDTO, void>({
      path: `/api/IsChekedRole/${uid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
