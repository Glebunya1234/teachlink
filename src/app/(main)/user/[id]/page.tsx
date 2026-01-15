import React, { FC } from "react";

import styles from "../user.module.scss";

import { DetailInfoCard } from "@/components/card/user-detail-card/detail-info-card/DetailInfoCard";
import { LocationCard } from "@/components/card/user-detail-card/location-card/LocationCard";
import { ProfileCard } from "@/components/card/user-detail-card/profile-card/ProfileCard";
import { ReviewCard } from "@/components/card/user-detail-card/review-card/ReviewCard";
import { SubjectsCard } from "@/components/card/user-detail-card/subjects-card/SubjectsCard";
import { ContactComponent } from "@/components/connect-component/ContactComponent";
import {
  UserContentFarmer,
  UserProfileFarmer,
  UserSubjectFarmer,
} from "@/components/farmer-components/user-profile-farmer/UserProfileFarmer";
import { TeacherQuery } from "@/quaries";

interface UserPageProps {
  params: Promise<{ id: string }>;
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const { id } = await params;
  const { data: teacher } = await TeacherQuery().teachersDetail(id);
  const ProfileInfo = {
    full_name: teacher.full_name,
    avatarUrl: teacher.avatarUrl,
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
        <UserProfileFarmer>
          <ProfileCard {...ProfileInfo} />
        </UserProfileFarmer>

        <ContactComponent
          contact_id={id}
          for_teacher={true}
          contact_name={teacher.full_name}
        />
      </div>
      <UserSubjectFarmer>
        <SubjectsCard school_subjects={school_subjects} />
      </UserSubjectFarmer>
      <UserContentFarmer index={4}>
        <LocationCard {...LocationInfo} />
      </UserContentFarmer>
      <UserContentFarmer index={5}>
        <DetailInfoCard {...DetailInfo} />
      </UserContentFarmer>
      <UserContentFarmer index={6}>
        <ReviewCard teacher_subjects={teacher.school_subjects} />
      </UserContentFarmer>
    </div>
  );
};
export default UserPage;
