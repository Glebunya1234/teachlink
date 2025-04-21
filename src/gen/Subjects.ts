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

import { ProblemDetails, SubjectDTO } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Subjects<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Subjects
   * @name SubjectsList
   * @request GET:/api/subjects
   * @secure
   */
  subjectsList = (params: RequestParams = {}) =>
    this.request<SubjectDTO[], ProblemDetails | void>({
      path: `/api/subjects`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Subjects
   * @name SubjectsDetail
   * @request GET:/api/subjects/{id}
   * @secure
   */
  subjectsDetail = (id: string, params: RequestParams = {}) =>
    this.request<SubjectDTO, ProblemDetails | void>({
      path: `/api/subjects/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
