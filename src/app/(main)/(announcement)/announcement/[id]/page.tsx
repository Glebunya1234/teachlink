import React, { FC } from "react";

import styles from "../../announcement.module.scss";

import { AnnouncementCardSearch } from "@/components/card/announcement-card/announcement-card-search/AnnouncementCardSearch";
import { EmptyPlaceholder } from "@/components/empty-placeholder/EmptyPlaceholder";
import { ADCardFarmer } from "@/components/farmer-components/ad-card-farmer/ADCardFarmer";
import { PaginationComponent } from "@/components/pagination";
import { AnnouncementsQuery } from "@/quaries";
import { PathPJ } from "@/utils/path";
interface Props {
  params: { id: number };
}
const Page: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const { data } = await AnnouncementsQuery().announcementsList({
    offset: (id - 1) * 6 - 1,
    limit: 6,
  });
  return (
    <div className={styles.AnnouncementPage}>
      <h1>Announcement</h1>
      <p>Here you can find all the announcements related to your account.</p>
      {data.items?.length === 0 && <EmptyPlaceholder type="NotResults" />}
      <section className={styles.AnnouncementPage__List}>
        {data.items?.map((item, index) => (
          <ADCardFarmer key={item.id} index={index}>
            <AnnouncementCardSearch
              key={item.id}
              announcement_index={(id - 1) * 6 + index }
              announcement={item}
            />
          </ADCardFarmer>
        ))}
      </section>
      <PaginationComponent
        currentPage={Number(id)}
        mainLink={PathPJ.announcement}
        nextLink={PathPJ.announcementPagination}
        hasNextPage={data.hasNextPage !== undefined ? data.hasNextPage : false}
      />
    </div>
  );
};
export default Page;
