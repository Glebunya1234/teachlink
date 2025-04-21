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

import { DegreeDTO, ProblemDetails } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Degrees<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Degrees
   * @name DegreesList
   * @request GET:/api/degrees
   * @secure
   */
  degreesList = (params: RequestParams = {}) =>
    this.request<DegreeDTO[], ProblemDetails | void>({
      path: `/api/degrees`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
