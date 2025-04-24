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
  id: string | null;
  id_students: StudentDTO;
  mini_description: string | null;
  school_subjects: SchoolSubjectDTO[] | null;
  description: string | null;
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
  id_student: string | null;
  mini_description: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  description: string | null;
}

export interface CreateNotificationDTO {
  id_teacher: string | null;
  id_student: string | null;
  is_read: boolean;
  for_teacher: boolean;
}

export interface CreateReviewDTO {
  id_teacher: string | null;
  id_student: string | null;
  reviews_text: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  /** @format int32 */
  rating: number;
}

export interface CreateStudentDTO {
  full_name: string | null;
  uid: string | null;
}

export interface CreateTeacherDTO {
  full_name: string | null;
  uid: string | null;
}

export interface DegreeDTO {
  id: string | null;
  degree_name: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface ExperienceDTO {
  id: string | null;
  experience_name: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface FullTeacherTileDTO {
  id: string | null;
  uid: string | null;
  full_name?: string | null;
  description?: string | null;
  mini_description?: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  experience?: string | null;
  degree?: string | null;
  educational_institution?: string | null;
  /** @format int32 */
  year_of_end?: number;
  city?: string | null;
  /** @format int32 */
  age?: number;
  sex?: string | null;
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
  id: string | null;
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
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export interface ReviewDTO {
  id: string | null;
  id_teachers: TeacherTileDTO;
  id_students: StudentDTO;
  reviews_text: string | null;
  school_subjects: SchoolSubjectDTO[] | null;
  /** @format int32 */
  rating: number;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface SchoolSubjectDTO {
  subject?: string | null;
}

export enum SortByEnumMDB {
  Rating = "Rating",
  Reviews = "Reviews",
  PriceAsc = "PriceAsc",
  PriceDesc = "PriceDesc",
}

export interface StudentDTO {
  id: string | null;
  uid: string | null;
  full_name?: string | null;
  city?: string | null;
  /** @format int32 */
  age?: number;
  sex?: string | null;
  /** @format date-time */
  createdAt: Date;
  /** @format date-time */
  updatedAt: Date;
}

export interface SubjectDTO {
  id?: string | null;
  subject?: string | null;
  /** @format date-time */
  createdAt?: Date;
  /** @format date-time */
  updatedAt?: Date;
}

export interface TeacherTileDTO {
  id: string | null;
  uid: string | null;
  full_name?: string | null;
  mini_description?: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  experience?: string | null;
  degree?: string | null;
  educational_institution?: string | null;
  online?: boolean;
  /** @format int32 */
  price?: number;
  show_info?: boolean;
  city?: string | null;
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
  mini_description?: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  description?: string | null;
}

export interface UpdateNotificationDTO {
  is_read?: boolean;
}

export interface UpdateReviewDTO {
  reviews_text?: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  /** @format int32 */
  rating?: number | null;
}

export interface UpdateStudentDTO {
  full_name?: string | null;
  city?: string | null;
  /** @format int32 */
  age?: number | null;
  sex?: string | null;
}

export interface UpdateTeacherDTO {
  full_name?: string | null;
  description?: string | null;
  mini_description?: string | null;
  school_subjects?: SchoolSubjectDTO[] | null;
  experience?: string | null;
  degree?: string | null;
  educational_institution?: string | null;
  /** @format int32 */
  year_of_end?: number | null;
  city?: string | null;
  /** @format int32 */
  age?: number | null;
  sex?: string | null;
  online?: boolean | null;
  show_info?: boolean | null;
  /** @format int32 */
  review_count?: number | null;
  /** @format double */
  average_rating?: number | null;
  /** @format int32 */
  price?: number | null;
}
