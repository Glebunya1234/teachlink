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
  CreateNotificationDTO,
  NotificationDTO,
  ProblemDetails,
  UpdateNotificationDTO,
  UpdateReviewDTO,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Notifications<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Notifications
   * @name NotificationsList
   * @request GET:/api/notifications
   * @secure
   */
  notificationsList = (
    query: {
      id_entity: string;
      for_teacher: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<NotificationDTO[], ProblemDetails | void>({
      path: `/api/notifications`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Notifications
   * @name NotificationsCreate
   * @request POST:/api/notifications
   * @secure
   */
  notificationsCreate = (data: CreateNotificationDTO, params: RequestParams = {}) =>
    this.request<CreateNotificationDTO, ProblemDetails | void>({
      path: `/api/notifications`,
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
   * @tags Notifications
   * @name NotificationsDetail
   * @request GET:/api/notifications/{id}
   * @secure
   */
  notificationsDetail = (id: string, params: RequestParams = {}) =>
    this.request<NotificationDTO, ProblemDetails | void>({
      path: `/api/notifications/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Notifications
   * @name NotificationsPartialUpdate
   * @request PATCH:/api/notifications/{id}
   * @secure
   */
  notificationsPartialUpdate = (id: string, data: UpdateNotificationDTO, params: RequestParams = {}) =>
    this.request<UpdateReviewDTO, ProblemDetails | void>({
      path: `/api/notifications/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
