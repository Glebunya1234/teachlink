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

import {
  CreateTeacherDTO,
  FullTeacherTileDTO,
  ProblemDetails,
  SortByEnumMDB,
  TeacherTileDTOPaginationResponse,
  UpdateTeacherDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Teachers<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Teachers
   * @name TeachersList
   * @request GET:/api/teachers
   * @secure
   */
  teachersList = (
    query?: {
      /**
       * @format int32
       * @default 0
       */
      offset?: number;
      /**
       * @format int32
       * @default 20
       */
      limit?: number;
      sortBy?: SortByEnumMDB;
      subjects?: string;
      isOnline?: boolean;
      city?: string;
      /** @format int32 */
      minPrice?: number;
      /** @format int32 */
      maxPrice?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TeacherTileDTOPaginationResponse, ProblemDetails | void>({
      path: `/api/teachers`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Teachers
   * @name TeachersCreate
   * @request POST:/api/teachers
   * @secure
   */
  teachersCreate = (data: CreateTeacherDTO, params: RequestParams = {}) =>
    this.request<CreateTeacherDTO, ProblemDetails | void>({
      path: `/api/teachers`,
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
   * @tags Teachers
   * @name TeachersDetail
   * @request GET:/api/teachers/{uid}
   * @secure
   */
  teachersDetail = (uid: string, params: RequestParams = {}) =>
    this.request<FullTeacherTileDTO, ProblemDetails | void>({
      path: `/api/teachers/${uid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Teachers
   * @name TeachersPartialUpdate
   * @request PATCH:/api/teachers/{uid}
   * @secure
   */
  teachersPartialUpdate = (uid: string, data: UpdateTeacherDTO, params: RequestParams = {}) =>
    this.request<UpdateTeacherDTO, ProblemDetails | void>({
      path: `/api/teachers/${uid}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
