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
  UpdateNotificationListDTO,
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
   * @name NotificationsIdList
   * @request GET:/api/notifications/id
   * @secure
   */
  notificationsIdList = (
    query: {
      id: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<NotificationDTO, ProblemDetails | void>({
      path: `/api/notifications/id`,
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
   * @name NotificationsIdPartialUpdate
   * @request PATCH:/api/notifications/id
   * @secure
   */
  notificationsIdPartialUpdate = (
    query: {
      id: string;
    },
    data: UpdateNotificationDTO,
    params: RequestParams = {},
  ) =>
    this.request<UpdateNotificationDTO, ProblemDetails | void>({
      path: `/api/notifications/id`,
      method: "PATCH",
      query: query,
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
   * @name NotificationsIdsPartialUpdate
   * @request PATCH:/api/notifications/ids
   * @secure
   */
  notificationsIdsPartialUpdate = (data: UpdateNotificationListDTO, params: RequestParams = {}) =>
    this.request<UpdateNotificationListDTO, ProblemDetails | void>({
      path: `/api/notifications/ids`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
