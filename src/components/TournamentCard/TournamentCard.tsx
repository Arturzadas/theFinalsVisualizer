import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "../Card/Card";
import { WinCard } from "../WinCard/WinCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { teamSelect } from "../../helpers/cardHelper";
import { TournamentDetails } from "../TournamentDetails/TournamentDetails";
import { tournamentCardStyles } from "./styles";

export const TournamentCard = ({ data, index }) => {
  const matches = data?.matches || [];
  const tournamentInfo = matches?.[0]?.RoundStat?.Data;
  const createdAt = data?.earliestCreatedAt;

  const squadName = tournamentInfo?.SquadName;
  const teamIcon = teamSelect(squadName);

  const allRoundsWon =
    matches.length > 0 &&
    matches.every((match) => match?.RoundStat?.Data?.RoundWon === true);

  const {
    container,
    headerHStack,
    squadInfoHStack,
    squadImage,
    squadText,
    metadataHStack,
    italicText,
    roundsHStack,
    roundsVStack,
  } = tournamentCardStyles;

  return (
    <VStack {...container(allRoundsWon)}>
      {/* Tournament Header */}
      <HStack {...headerHStack}>
        <HStack {...squadInfoHStack}>
          <Image src={teamIcon} alt={squadName} {...squadImage} />
          <Text {...squadText}>{squadName} - Tournament Summary</Text>
        </HStack>
        <TournamentDetails data={data} />
      </HStack>

      {/* Metadata */}
      <HStack {...metadataHStack}>
        <Text {...italicText}>
          Started: {new Date(createdAt).toLocaleString()}
        </Text>
        <HStack {...roundsHStack}>
          <Text fontSize="sm">Rounds Played: {matches.length}</Text>
          <WinCard isWin={allRoundsWon} isTournament={false} />
        </HStack>
      </HStack>

      {/* Round Cards Preview (up to 3) */}
      <VStack {...roundsVStack}>
        {matches.map((match, i) => (
          <Card key={i} index={i} data={match.RoundStat} />
        ))}
      </VStack>
    </VStack>
  );
};
