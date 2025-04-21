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

import { CreateStudentDTO, CreateTeacherDTO, ProblemDetails, StudentDTO, UpdateStudentDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Students<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Students
   * @name StudentsList
   * @request GET:/api/students
   * @secure
   */
  studentsList = (
    query?: {
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<StudentDTO[], ProblemDetails | void>({
      path: `/api/students`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsCreate
   * @request POST:/api/students
   * @secure
   */
  studentsCreate = (data: CreateStudentDTO, params: RequestParams = {}) =>
    this.request<CreateTeacherDTO, ProblemDetails | void>({
      path: `/api/students`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsDetail
   * @request GET:/api/students/{id}
   * @secure
   */
  studentsDetail = (id: string, params: RequestParams = {}) =>
    this.request<StudentDTO, ProblemDetails | void>({
      path: `/api/students/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsPartialUpdate
   * @request PATCH:/api/students/{id}
   * @secure
   */
  studentsPartialUpdate = (id: string, data: UpdateStudentDTO, params: RequestParams = {}) =>
    this.request<UpdateStudentDTO, ProblemDetails | void>({
      path: `/api/students/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
