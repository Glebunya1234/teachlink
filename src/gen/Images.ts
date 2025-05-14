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

import { ProblemDetails, UpdateImagesDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Images<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Images
   * @name ImagesUidPartialUpdate
   * @request PATCH:/api/images/uid
   * @secure
   */
  imagesUidPartialUpdate = (
    data: {
      uid: string;
      for_teacher: boolean;
      /** @format binary */
      avatarFile: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<UpdateImagesDTO, ProblemDetails | void>({
      path: `/api/images/uid`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Images
   * @name ImagesAvatarDetail
   * @request GET:/api/images/{avatar_id}/avatar
   * @secure
   */
  imagesAvatarDetail = (avatarId: string, params: RequestParams = {}) =>
    this.request<void, ProblemDetails | void>({
      path: `/api/images/${avatarId}/avatar`,
      method: "GET",
      secure: true,
      ...params,
    });
}
