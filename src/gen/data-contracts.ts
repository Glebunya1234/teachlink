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

export interface AnnouncementDTO {
  id: string;
  id_students: StudentDTO;
  mini_description: string;
  school_subjects: SchoolSubjectDTO[];
  description: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface AuthDTO {
  isStudent: boolean;
  isTeacher: boolean;
}

export interface CreateAnnouncementDTO {
  id_student: string;
  mini_description: string;
  school_subjects?: SchoolSubjectDTO[];
  description: string;
}

export interface CreateNotificationDTO {
  id_teacher: string;
  id_student: string;
  is_read: boolean;
  for_teacher: boolean;
}

export interface CreateReviewDTO {
  id_teacher: string;
  id_student: string;
  reviews_text: string;
  school_subjects?: SchoolSubjectDTO[];
  /** @format int32 */
  rating: number;
}

export interface CreateStudentDTO {
  full_name: string;
  uid: string;
}

export interface CreateTeacherDTO {
  full_name: string;
  uid: string;
}

export interface DegreeDTO {
  id: string;
  degree_name: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface ExperienceDTO {
  id: string;
  experience_name: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface FullTeacherTileDTO {
  id: string;
  uid: string;
  full_name?: string;
  description?: string;
  mini_description?: string;
  school_subjects?: SchoolSubjectDTO[];
  experience?: string;
  degree?: string;
  educational_institution?: string;
  /** @format int32 */
  year_of_end?: number;
  city?: string;
  /** @format int32 */
  age?: number;
  sex?: string;
  online?: boolean;
  show_info: boolean;
  /** @format int32 */
  price?: number;
  /** @format int32 */
  review_count?: number;
  /** @format double */
  average_rating?: number;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface NotificationDTO {
  id: string;
  id_teacher: TeacherTileDTO;
  id_student: StudentDTO;
  is_read: boolean;
  for_teacher: boolean;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: any;
}

export interface ReviewDTO {
  id: string;
  id_teachers: TeacherTileDTO;
  id_students: StudentDTO;
  reviews_text: string;
  school_subjects: SchoolSubjectDTO[];
  /** @format int32 */
  rating: number;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface SchoolSubjectDTO {
  subject?: string;
}

export enum SortByEnumMDB {
  Rating = "Rating",
  Reviews = "Reviews",
  PriceAsc = "PriceAsc",
  PriceDesc = "PriceDesc",
}

export interface StudentDTO {
  id: string;
  uid: string;
  full_name?: string;
  city?: string;
  /** @format int32 */
  age?: number;
  sex?: string;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface SubjectDTO {
  id?: string;
  subject?: string;
  /** @format date-time */
  createdAt?: Date;
  /** @format date-time */
  updatedAt?: Date;
}

export interface TeacherTileDTO {
  id: string;
  uid: string;
  full_name?: string;
  mini_description?: string;
  school_subjects?: SchoolSubjectDTO[];
  experience?: string;
  degree?: string;
  educational_institution?: string;
  online?: boolean;
  /** @format int32 */
  price?: number;
  show_info?: boolean;
  city?: string;
  /** @format int32 */
  age?: number;
  /** @format int32 */
  review_count?: number;
  /** @format double */
  average_rating?: number;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface UpdateAnnouncementDTO {
  mini_description?: string;
  school_subjects?: SchoolSubjectDTO[];
  description?: string;
}

export interface UpdateNotificationDTO {
  is_read?: boolean;
}

export interface UpdateReviewDTO {
  reviews_text?: string;
  school_subjects?: SchoolSubjectDTO[];
  /** @format int32 */
  rating?: number;
}

export interface UpdateStudentDTO {
  full_name?: string;
  city?: string;
  /** @format int32 */
  age?: number;
  sex?: string;
}

export interface UpdateTeacherDTO {
  full_name?: string;
  description?: string;
  mini_description?: string;
  school_subjects?: SchoolSubjectDTO[];
  experience?: string;
  degree?: string;
  educational_institution?: string;
  /** @format int32 */
  year_of_end?: number;
  city?: string;
  /** @format int32 */
  age?: number;
  sex?: string;
  online?: boolean;
  show_info?: boolean;
  /** @format int32 */
  review_count?: number;
  /** @format double */
  average_rating?: number;
  /** @format int32 */
  price?: number;
}
