import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import {
  formatTimestamp,
  getMatchDuration,
  imageSwitcher,
} from "../../helpers/cardHelper";
import { FaClock } from "react-icons/fa";
import { WinCard } from "../WinCard/WinCard";
import { PlayerClass } from "../PlayerClass/PlayerClass";
import { Details } from "../Details/Details";
import { cardStyles } from "./styles";

export const Card = ({ data }) => {
  const normalizedData = data?.matches?.[0]?.RoundStat
    ? {
        ...data.matches[0].RoundStat,
        CreatedAt: data.earliestCreatedAt,
      }
    : data;

  const mapInfo = imageSwitcher(normalizedData?.Data?.MapVariant);

  const {
    container,
    imageSection,
    imageContent,
    detailsSection,
    topRow,
    clock,
    bottomRow,
  } = cardStyles;

  return (
    <HStack {...container}>
      {/* Image Section */}
      <VStack
        {...imageSection}
        bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapInfo?.map}")`}
      >
        <VStack {...imageContent}>
          <Text fontStyle="italic" fontSize={{ base: "lg", md: "2xl" }}>
            {mapInfo?.mapName?.toUpperCase()}
          </Text>
          <Text fontStyle="italic" fontSize={{ base: "sm", md: "md" }}>
            {formatTimestamp(normalizedData?.CreatedAt)}
          </Text>
        </VStack>
      </VStack>

      {/* Details Section */}
      <VStack {...detailsSection}>
        <HStack {...topRow}>
          <WinCard
            isWin={normalizedData?.Data?.RoundWon}
            isTournament={normalizedData?.Data?.TournamentID !== ""}
          />
          <HStack {...clock}>
            <FaClock />
            <Text>
              {getMatchDuration(
                normalizedData?.Data?.StartTime,
                normalizedData?.Data?.EndTime
              )}
            </Text>
          </HStack>
        </HStack>

        <HStack {...bottomRow}>
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
