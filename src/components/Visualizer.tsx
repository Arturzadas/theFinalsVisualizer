import { Flex, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Stats } from "./Stats";
import { TournamentCard } from "./TournamentCard";

export const Visualizer = ({ data, stats }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const [currPage, setCurrPage] = useState(1);

  // console.log(data);

  const getPageData = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data?.slice(start, end) || [];
  };

  const [matchData, setMatchData] = useState(getPageData(1));

  const circle = {
    w: "30px",
    h: "30px",
    borderRadius: "full",
    border: "1px solid white",
    justifyContent: "center",
    alignItems: "center",
    transition: "ease 0.2s all",
    _hover: {
      transform: "scale(1.02)",
      bgColor: "whiteAlpha.200",
    },
    cursor: "pointer",
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      const nextPage = currPage + 1;
      setCurrPage(nextPage);
      setMatchData(getPageData(nextPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currPage > 1) {
      const prevPage = currPage - 1;
      setCurrPage(prevPage);
      setMatchData(getPageData(prevPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
      <HStack w={"full"} justifyContent={"center"}>
        <Flex
          {...circle}
          onClick={handlePrev}
          opacity={currPage === 1 ? 0.4 : 1}
          cursor={currPage === 1 ? "not-allowed" : "pointer"}
        >
          <BiChevronLeft />
        </Flex>
        <Flex {...circle} h={"40px"} w={"40px"}>
          {currPage}
        </Flex>
        <Flex
          {...circle}
          onClick={handleNext}
          opacity={currPage === totalPages ? 0.4 : 1}
          cursor={currPage === totalPages ? "not-allowed" : "pointer"}
        >
          <BiChevronRight />
        </Flex>
      </HStack>
    </VStack>
  );
};
