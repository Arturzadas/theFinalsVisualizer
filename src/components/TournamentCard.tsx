import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { WinCard } from "./WinCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { teamSelect } from "../helpers/cardHelper";
import { TournamentDetails } from "./TournamentDetails";

export const TournamentCard = ({ data, index }) => {
  const matches = data?.matches || [];
  const tournamentInfo = matches?.[0]?.RoundStat?.Data;
  const createdAt = data?.earliestCreatedAt;

  const squadName = tournamentInfo?.SquadName;
  const teamIcon = teamSelect(squadName);

  const allRoundsWon =
    matches.length > 0 &&
    matches.every((match) => match?.RoundStat?.Data?.RoundWon === true);

  return (
    <VStack
      w="100%"
      // bg={allRoundsWon ? "#D31C44" : "#4b4651ff"}
      bg={
        allRoundsWon
          ? "linear-gradient(40deg, #3f6d4750 0%, #7bff2f72 100%)"
          : "linear-gradient(40deg, #333333ff 0%, #D31C4480 100%)"
      }
      borderRadius="md"
      gap={4}
      p={4}
      boxShadow="md"
      fontFamily="Saira"
      border={"1px solid #989898ff"}
    >
      {/* Tournament Header */}
      <HStack w="100%" justifyContent="space-between" flexWrap="wrap">
        <HStack gap={3}>
          <Image src={teamIcon} alt={squadName} boxSize="36px" />
          <Text fontSize="xl" fontWeight="bold">
            {squadName} - Tournament Summary
          </Text>
        </HStack>
        <TournamentDetails data={data} />
      </HStack>

      {/* Metadata */}
      <HStack w="100%" justifyContent="space-between" flexWrap="wrap">
        <Text fontStyle="italic" fontSize="sm">
          Started: {new Date(createdAt).toLocaleString()}
        </Text>
        <HStack gap={3}>
          <Text fontSize="sm">Rounds Played: {matches.length}</Text>
          <WinCard isWin={allRoundsWon} isTournament={false} />
        </HStack>
      </HStack>

      {/* Round Cards Preview (up to 3) */}
      <VStack w="100%" gap={3}>
        {matches.map((match, i) => (
          <Card key={i} index={i} data={match.RoundStat} />
        ))}
      </VStack>
    </VStack>
  );
};
