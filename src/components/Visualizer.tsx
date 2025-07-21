import { Flex, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Stats } from "./Stats";
import { TournamentCard } from "./TournamentCard";

export const Visualizer = ({ data, stats }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const [currPage, setCurrPage] = useState(1);

  const getPageData = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data?.slice(start, end) || [];
  };

  const [matchData, setMatchData] = useState(getPageData(1));

  const circle = {
    w: "40px",
    h: "40px",
    borderRadius: "full",
    border: "1px solid white",
    justifyContent: "center",
    alignItems: "center",
    transition: "ease 0.2s all",
    _hover: {
      transform: "scale(1.1)",
      bgColor: "whiteAlpha.300",
    },
    cursor: "pointer",
    userSelect: "none",
  };

  const handlePageChange = (page) => {
    if (page === currPage || page < 1 || page > totalPages) return;
    setCurrPage(page);
    setMatchData(getPageData(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => handlePageChange(currPage + 1);
  const handlePrev = () => handlePageChange(currPage - 1);

  // Compact pagination logic with ellipsis
  const renderPageNumbers = () => {
    const pages: any = [];

    // Helper to push page number buttons
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

    // Show first page always
    pushPage(1);

    if (currPage > 4) {
      // Show ellipsis if gap between first and current page group
      pages.push(
        <Text key="start-ellipsis" px={2} userSelect="none">
          ...
        </Text>
      );
    }

    // Pages around current page: from currPage-1 to currPage+1, within range (2 to totalPages-1)
    const startPage = Math.max(2, currPage - 1);
    const endPage = Math.min(totalPages - 1, currPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pushPage(i);
    }

    if (currPage < totalPages - 3) {
      // Show ellipsis before last page if gap exists
      pages.push(
        <Text key="end-ellipsis" px={2} userSelect="none">
          ...
        </Text>
      );
    }

    // Show last page always if totalPages > 1
    if (totalPages > 1) {
      pushPage(totalPages);
    }

    return pages;
  };

  return (
    <VStack
      gap={5}
      px={{ base: 3, md: 10 }}
      py={10}
      w={"100vw"}
      maxW={"1920px"}
    >
      <Stats data={stats} />
      <Heading
        fontFamily={"Saira"}
        fontStyle="italic"
        w={"full"}
        textAlign={"left"}
        py={"10"}
        pt={20}
        fontSize={{ base: "30px", md: "40px" }}
      >
        MATCH HISTORY
      </Heading>
      {matchData?.length > 0 &&
        matchData.map((el, index) => {
          const isTournament = el?.matches?.length > 0;

          return (
            <HStack key={index} w="100%">
              {isTournament ? (
                <TournamentCard data={el} index={index} />
              ) : (
                <Card data={el?.RoundStat} index={index} />
              )}
            </HStack>
          );
        })}
      <HStack
        w={"full"}
        justifyContent={"center"}
        flexWrap="wrap"
        gap={2}
        pb={20}
      >
        <Flex
          {...circle}
          h={"30px"}
          w={"30px"}
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
          onClick={handleNext}
          opacity={currPage === totalPages ? 0.4 : 1}
          cursor={currPage === totalPages ? "not-allowed" : "pointer"}
          userSelect="none"
          h={"30px"}
          w={"30px"}
        >
          <BiChevronRight />
        </Flex>
      </HStack>
    </VStack>
  );
};
