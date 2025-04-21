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

export class Degree<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Degrees
   * @name DegreeDetail
   * @request GET:/api/degree/{id}
   * @secure
   */
  degreeDetail = (id: string, params: RequestParams = {}) =>
    this.request<DegreeDTO, ProblemDetails | void>({
      path: `/api/degree/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
