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

import { ExperienceDTO, ProblemDetails } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Experiences<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Experiences
   * @name ExperiencesList
   * @request GET:/api/experiences
   * @secure
   */
  experiencesList = (params: RequestParams = {}) =>
    this.request<ExperienceDTO[], ProblemDetails | void>({
      path: `/api/experiences`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Experiences
   * @name ExperiencesDetail
   * @request GET:/api/experiences/{id}
   * @secure
   */
  experiencesDetail = (id: string, params: RequestParams = {}) =>
    this.request<ExperienceDTO, ProblemDetails | void>({
      path: `/api/experiences/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
