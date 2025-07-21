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
  const normalizedData = data?.matches?.[0]?.RoundStat
    ? {
        ...data.matches[0].RoundStat,
        CreatedAt: data.earliestCreatedAt,
      }
    : data;

  const mapInfo = imageSwitcher(normalizedData?.Data?.MapVariant);

  return (
    <HStack
      w="100%"
      gap={0}
      bgColor="#3C3940"
      borderRadius="4px"
      fontWeight="500"
      fontFamily="Saira"
      transition="ease 0.2s all"
      _hover={{ transform: "scale(1.005)" }}
      boxShadow="md"
      flexDirection={{ base: "column", md: "row" }}
      alignItems="stretch"
      border={"1px solid #4d4d4dff"}
    >
      {/* Image Section */}
      <VStack
        bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapInfo?.map}")`}
        bgSize="cover"
        h={{ base: "180px", md: "200px" }}
        w={{ base: "100%", md: "33%" }}
        maxW={{ base: "100%", md: "400px" }}
        minW={{ base: "100%", md: "250px" }}
        borderRadius={{ base: "4px 4px 0 0", md: "4px 0 0 4px" }}
        justifyContent="flex-end"
        alignItems="flex-start"
        overflow="hidden"
      >
        <VStack p={4} alignItems="flex-start" gap={0} w="100%">
          <Text fontStyle="italic" fontSize={{ base: "lg", md: "2xl" }}>
            {mapInfo?.mapName?.toUpperCase()}
          </Text>
          <Text fontStyle="italic" fontSize={{ base: "sm", md: "md" }}>
            {formatTimestamp(normalizedData?.CreatedAt)}
          </Text>
        </VStack>
      </VStack>

      {/* Details Section */}
      <VStack
        h={{ base: "auto", md: "200px" }}
        w="100%"
        alignItems="flex-start"
        justifyContent="space-between"
        p={{ base: 2, md: 4 }}
        gap={{ base: 2, md: 0 }}
      >
        <HStack w="100%" justifyContent="space-between" flexWrap="wrap">
          <WinCard
            isWin={normalizedData?.Data?.RoundWon}
            isTournament={normalizedData?.Data?.TournamentID !== ""}
          />
          <HStack fontSize={{ base: "sm", md: "md" }}>
            <FaClock />
            <Text>
              {getMatchDuration(
                normalizedData?.Data?.StartTime,
                normalizedData?.Data?.EndTime
              )}
            </Text>
          </HStack>
        </HStack>

        <HStack w="100%" justifyContent="space-between" flexWrap="wrap">
          <PlayerClass archetype={normalizedData?.Data?.CharacterArchetype} />
          <Box>
            <Details
              data={{
                ...normalizedData?.Data,
                createdAt: normalizedData?.CreatedAt,
              }}
            />
          </Box>
        </HStack>
      </VStack>
    </HStack>
  );
};
