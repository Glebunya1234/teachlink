import React, { FC } from "react";

import styles from "../user.module.scss";

import { DetailInfoCard } from "@/components/card/user-detail-card/detail-info-card/DetailInfoCard";
import { LocationCard } from "@/components/card/user-detail-card/location-card/LocationCard";
import { ProfileCard } from "@/components/card/user-detail-card/profile-card/ProfileCard";
import { ReviewCard } from "@/components/card/user-detail-card/review-card/ReviewCard";
import { SubjectsCard } from "@/components/card/user-detail-card/subjects-card/SubjectsCard";
import { ContactComponent } from "@/components/connect-component/ContactComponent";
import { TeacherQuery } from "@/quaries";

interface UserPageProps {
  params: { id: string };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const { id } = await params;
  const { data: teacher } = await TeacherQuery().teachersDetail(id);
  const ProfileInfo = {
    full_name: teacher.full_name,
    review_count: teacher.review_count,
    average_rating: teacher.average_rating,
    mini_description: teacher.mini_description,
    price: teacher.price,
  };
  const DetailInfo = {
    description: teacher.description,
    educational_institution: teacher.educational_institution,
    degree: teacher.degree,
    experience: teacher.experience,
    age: teacher.age,
    sex: teacher.sex,
  };
  const LocationInfo = {
    city: teacher.city,
    online: teacher.online,
  };
  const school_subjects = teacher.school_subjects;

  return (
    <div className={styles.UserPage}>
      <div className={styles.UserPage__ProfileWrapper}>
        <ProfileCard {...ProfileInfo} />
        <ContactComponent
          contact_id={id}
          for_teacher={true}
          contact_name={teacher.full_name}
        />
      </div>
      <SubjectsCard school_subjects={school_subjects} />
      <LocationCard {...LocationInfo} />
      <DetailInfoCard {...DetailInfo} />
      <ReviewCard teacher_subjects={teacher.school_subjects} />
    </div>
  );
};
export default UserPage;
