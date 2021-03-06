import React, { useState, useEffect } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";

type Pager = {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
};
type Props = {
  items: any[];
  onChangePage: (pageOfItems: any) => void;
  pageSizeProp: number;
};

const Pagination: React.FC<Props> = ({ items, onChangePage, pageSizeProp }) => {
  const [pager, setPager] = useState<Pager>({
    totalItems: 1,
    currentPage: 1,
    pageSize: 1,
    totalPages: 1,
    startPage: 1,
    endPage: 1,
    startIndex: 1,
    endIndex: 1,
    pages: [],
  });
  useEffect(() => {
    if (items && items.length > 0) {
      setPage(1);
    } else {
      const newPager = pager;
      newPager.pages = [];
      setPager(newPager);
      onChangePage([]);
    }
  }, [items]);

  const setPage = (page: number) => {
    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    const newPager = getPager(items.length, page, pageSizeProp);

    // get new page of items from items array

    const pageOfItems = items.slice(newPager.startIndex, newPager.endIndex + 1);

    // update state
    setPager(newPager);
    // call change page function in parent component
    onChangePage(pageOfItems);
  };

  const getPager = (totalItems: number, currentPage: number, pageSize = 5) => {
    // default to first page

    // default page size is 10

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    }
    // more than 10 total pages so calculate start and end pages
    else if (currentPage <= 6) {
      startPage = 1;

      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    // console.log(`curren Page${currentPage}`);
    // console.log(`Total number ${totalItems}`);
    // console.log(`Start Index${startIndex}`);
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // console.log(`EndIndex${endIndex}`);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    // console.log("a");
    // console.log(items);
    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 pag
    return null;
  }

  return (
    // <Box>
    //   <Box>
    <Box display="flex" justifyContent="center">
      <Flex>
        <Button
          onClick={() => {
            setPage(1);
          }}
        >
          &lt; &lt;
        </Button>

        <Button onClick={() => setPage(pager.currentPage - 1)}>&lt;</Button>

        {pager.pages.map((page, index) => (
          <Button
            key={page}
            onClick={() => setPage(page)}
            bgColor={index + 1 === pager.currentPage ? "#3399ff" : "white"}
          >
            {page}
          </Button>
        ))}

        <Button onClick={() => setPage(pager.currentPage + 1)}>&gt;</Button>

        <Button onClick={() => setPage(pager.totalPages)}>&gt;&gt;</Button>
      </Flex>
    </Box>
    //   </Box>
    // </Box>
  );
};

export default Pagination;
