import { Badge, Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import {
  formatTimestamp,
  getMatchDuration,
  imageSwitcher,
} from "../helpers/cardHelper";
import { FaClock } from "react-icons/fa";
import { Details } from "./Details";
import { WinCard } from "./WinCard";
import { PlayerClass } from "./PlayerClass";

export const Card = ({ data, index }) => {
  const mapInfo = imageSwitcher(data?.Data?.MapVariant);

  return (
    <HStack
      onClick={() => console.log(data)}
      w={"100%"}
      gap={0}
      bgColor={"#3C3940"}
      borderRadius={"4px"}
      fontWeight={"500"}
      fontFamily={"Saira"}
      transition={"ease 0.2s all"}
      _hover={{
        transform: "scale(1.02)",
      }}
      boxShadow={"md"}
    >
      <VStack
        bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapInfo?.map}")`}
        // bgAttachment="cover"
        bgSize={"cover"}
        h={"200px"}
        w={"33%"}
        maxW={"400px"}
        minW={"250px"}
        borderRadius={"4px 0 0 4px "}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
      >
        {/* Image container */}
        <VStack p={4} alignItems={"flex-start"} gap={0}>
          <Text fontStyle={"italic"} fontSize={"2xl"}>
            {mapInfo?.mapName?.toUpperCase()}
          </Text>
          <Text fontStyle={"italic"}>{formatTimestamp(data?.CreatedAt)}</Text>
        </VStack>
      </VStack>
      {/* Image Container END */}
      <VStack
        className={"findme"}
        h={"200px"}
        w={"100%"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        p={4}
      >
        <HStack w={"100%"} justifyContent={"space-between"}>
          <WinCard
            isWin={data?.Data?.RoundWon}
            isTournament={data?.Data?.TournamentID !== ""}
          />
          <HStack>
            <FaClock />
            <Text>
              {getMatchDuration(data?.Data?.StartTime, data?.Data?.EndTime)}
            </Text>
          </HStack>
        </HStack>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <PlayerClass archetype={data?.Data?.CharacterArchetype} />
          <Details data={{ ...data?.Data, createdAt: data?.CreatedAt }} />
        </HStack>
      </VStack>
    </HStack>
  );
};
