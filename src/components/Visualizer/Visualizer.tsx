import { Flex, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Stats } from "../Stats/Stats";
import { TournamentCard } from "../TournamentCard/TournamentCard";
import { Card } from "../Card/Card";
import { visualizerStyles } from "./styles";

export const Visualizer = ({ data, stats }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const [currPage, setCurrPage] = useState(1);

  const { container, heading, circle, paginationHStack } = visualizerStyles;

  const getPageData = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data?.slice(start, end) || [];
  };

  const [matchData, setMatchData] = useState(getPageData(1));

  const handlePageChange = (page) => {
    if (page === currPage || page < 1 || page > totalPages) return;
    setCurrPage(page);
    setMatchData(getPageData(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => handlePageChange(currPage + 1);
  const handlePrev = () => handlePageChange(currPage - 1);

  const renderPageNumbers = () => {
    const pages: any = [];

    const pushPage = (page) => {
      pages.push(
        <Flex
          key={page}
          {...circle}
          bg={
            page === currPage
              ? "linear-gradient(40deg, #00000050 0%, #ffffff72 100%)"
              : "transparent"
          }
          fontWeight={page === currPage ? "bold" : "normal"}
          cursor={page === currPage ? "default" : "pointer"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Flex>
      );
    };

    pushPage(1);

    if (currPage > 4) {
      pages.push(
        <Text key="start-ellipsis" px={2} userSelect="none">
          ...
        </Text>
      );
    }

    const startPage = Math.max(2, currPage - 1);
    const endPage = Math.min(totalPages - 1, currPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pushPage(i);
    }

    if (currPage < totalPages - 3) {
      pages.push(
        <Text key="end-ellipsis" px={2} userSelect="none">
          ...
        </Text>
      );
    }

    if (totalPages > 1) {
      pushPage(totalPages);
    }

    return pages;
  };

  return (
    <VStack {...container}>
      <Stats data={stats} />

      <Heading {...heading}>MATCH HISTORY</Heading>

      {matchData?.length > 0 &&
        matchData.map((el, index) => {
          const isTournament = el?.matches?.length > 0;
          return (
            <HStack key={index} w="100%">
              {isTournament ? (
                <TournamentCard data={el} />
              ) : (
                <Card data={el?.RoundStat} />
              )}
            </HStack>
          );
        })}

      <HStack {...paginationHStack}>
        <Flex
          {...circle}
          h="30px"
          w="30px"
          onClick={handlePrev}
          opacity={currPage === 1 ? 0.4 : 1}
          cursor={currPage === 1 ? "not-allowed" : "pointer"}
          userSelect="none"
        >
          <BiChevronLeft />
        </Flex>

        {renderPageNumbers()}

        <Flex
          {...circle}
          h="30px"
          w="30px"
          onClick={handleNext}
          opacity={currPage === totalPages ? 0.4 : 1}
          cursor={currPage === totalPages ? "not-allowed" : "pointer"}
          userSelect="none"
        >
          <BiChevronRight />
        </Flex>
      </HStack>
    </VStack>
  );
};
