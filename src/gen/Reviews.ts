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

import { CreateReviewDTO, ProblemDetails, ReviewDTO, UpdateReviewDTO } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Reviews<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Reviews
   * @name ReviewsDetail
   * @request GET:/api/reviews/{id_teacher}
   * @secure
   */
  reviewsDetail = (
    idTeacher: string,
    query?: {
      /** @format int32 */
      offset?: number;
      /** @format int32 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ReviewDTO[], ProblemDetails | void>({
      path: `/api/reviews/${idTeacher}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Reviews
   * @name ReviewsDetail2
   * @request GET:/api/reviews/{id_teacher}/{id_student}
   * @originalName reviewsDetail
   * @duplicate
   * @secure
   */
  reviewsDetail2 = (idTeacher: string, idStudent: string, params: RequestParams = {}) =>
    this.request<ReviewDTO, ProblemDetails | void>({
      path: `/api/reviews/${idTeacher}/${idStudent}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Reviews
   * @name ReviewsCreate
   * @request POST:/api/reviews
   * @secure
   */
  reviewsCreate = (data: CreateReviewDTO, params: RequestParams = {}) =>
    this.request<CreateReviewDTO, ProblemDetails | void>({
      path: `/api/reviews`,
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
   * @tags Reviews
   * @name ReviewsPartialUpdate
   * @request PATCH:/api/reviews/{id}
   * @secure
   */
  reviewsPartialUpdate = (id: string, data: UpdateReviewDTO, params: RequestParams = {}) =>
    this.request<UpdateReviewDTO, ProblemDetails | void>({
      path: `/api/reviews/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
