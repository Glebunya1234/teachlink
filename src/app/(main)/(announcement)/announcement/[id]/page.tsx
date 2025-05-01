import React, { FC } from "react";

import { PaginationComponent } from "@/components/pagination";
import { AnnouncementsQuery } from "@/quaries";
import { PathPJ } from "@/utils/path";
interface Props {
  params: { id: number };
}
const Page: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const { data } = await AnnouncementsQuery().announcementsList({
    offset: id * 10 - 1,
    limit: 20,
  });
  return (
    <div>
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
