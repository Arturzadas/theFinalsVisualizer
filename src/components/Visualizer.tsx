import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Card } from "./Card";

export const Visualizer = ({ data }) => {
  const [matchData, setMatchData] = useState(data ? data : []);
  const [currPage, setCurrPage] = useState(1);

  const itemsPerPage = 25;

  return (
    <VStack gap={5} px={10} py={10} w={"100vw"} maxW={"1920px"}>
      {matchData?.length > 0 &&
        matchData?.map((el, index) => {
          return (
            <HStack key={index} w={"100%"}>
              <Card data={el?.RoundStat} />
            </HStack>
          );
        })}
    </VStack>
  );
};
