import React, { FC } from "react";

import styles from "../detail.module.scss";

import { AnnouncementCardDetal } from "@/components/card/announcement-card/announcement-card-detail/AnnouncementCardDetal";
import { ContactComponent } from "@/components/connect-component/ContactComponent";
import { AnnouncementsQuery } from "@/quaries";
interface Props {
  params: Promise<{ id: string }>;
}
const DetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const { data } = await AnnouncementsQuery().announcementsDetail(id);
  return (
    <div className={styles.DetailPage}>
      <AnnouncementCardDetal announcement={data} />
      <ContactComponent
        contact_id={data.id_students.uid}
        contact_name={data.id_students.full_name}
        for_teacher={false}
      />
    </div>
  );
};
export default DetailPage;
