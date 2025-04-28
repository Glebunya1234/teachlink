"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

import { PathPJ } from "@/utils/path";

interface PaginationDemoProps {
  hasNextPage: boolean;
  currentPage: number;
}

export const PaginationComponent: FC<PaginationDemoProps> = ({
  hasNextPage,
  currentPage,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    const queryString = params.toString();
    const path =
      page === 1 ? PathPJ.tutors : `${PathPJ.tutorsPagination}${page}`;
    return queryString ? `${path}?${queryString}` : path;
  };

  const isFirstPage = pathname === PathPJ.tutors;

  const renderPageLinks = () => {
    const links = [];

    if (currentPage > 2) {
      links.push(
        <PaginationItem key={currentPage - 1}>
          <PaginationLink href={generateHref(currentPage - 1)}>
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (currentPage !== 1) {
      links.push(
        <PaginationItem key={currentPage}>
          <PaginationLink href={generateHref(currentPage)} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    if (hasNextPage) {
      links.push(
        <PaginationItem key={currentPage + 1}>
          <PaginationLink href={generateHref(currentPage + 1)}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return links;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={generateHref(currentPage > 1 ? currentPage - 1 : 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={generateHref(1)} isActive={isFirstPage}>
            1
          </PaginationLink>
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href={generateHref(hasNextPage ? currentPage + 1 : currentPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
