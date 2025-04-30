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

import { AnnouncementDTO, CreateAnnouncementDTO, ProblemDetails, UpdateAnnouncementDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Announcements<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Announcements
   * @name AnnouncementsList
   * @request GET:/api/announcements
   * @secure
   */
  announcementsList = (
    query?: {
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<AnnouncementDTO[], ProblemDetails | void>({
      path: `/api/announcements`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcements
   * @name AnnouncementsCreate
   * @request POST:/api/announcements
   * @secure
   */
  announcementsCreate = (data: CreateAnnouncementDTO, params: RequestParams = {}) =>
    this.request<AnnouncementDTO, ProblemDetails | void>({
      path: `/api/announcements`,
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
   * @tags Announcements
   * @name AnnouncementsListStudentDetail
   * @request GET:/api/announcements/list/student/{uid}
   * @secure
   */
  announcementsListStudentDetail = (uid: string, params: RequestParams = {}) =>
    this.request<AnnouncementDTO[], ProblemDetails | void>({
      path: `/api/announcements/list/student/${uid}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcements
   * @name AnnouncementsDetail
   * @request GET:/api/announcements/{id}
   * @secure
   */
  announcementsDetail = (id: string, params: RequestParams = {}) =>
    this.request<AnnouncementDTO, ProblemDetails | void>({
      path: `/api/announcements/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcements
   * @name AnnouncementsPartialUpdate
   * @request PATCH:/api/announcements/{id}
   * @secure
   */
  announcementsPartialUpdate = (id: string, data: UpdateAnnouncementDTO, params: RequestParams = {}) =>
    this.request<UpdateAnnouncementDTO, ProblemDetails | void>({
      path: `/api/announcements/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcements
   * @name AnnouncementsDelete
   * @request DELETE:/api/announcements/{id}
   * @secure
   */
  announcementsDelete = (id: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/announcements/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
