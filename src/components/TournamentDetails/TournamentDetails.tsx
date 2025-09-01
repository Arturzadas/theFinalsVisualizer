import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
  Box,
  Stack,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";
import { PlayerClass } from "../PlayerClass/PlayerClass";
import { RadialKD } from "../RadialKD/RadialKD";
import { WinCard } from "../WinCard/WinCard";
import { FaClock } from "react-icons/fa";
import {
  formatTimestamp,
  getMatchDuration,
  imageSwitcher,
  teamSelect,
} from "../../helpers/cardHelper";
import { tournamentDetailsStyles } from "./styles";

export const TournamentDetails = ({ data }) => {
  const matches = data?.matches || [];
  const squadName = matches?.[0]?.RoundStat?.Data?.SquadName;
  const createdAt = data?.earliestCreatedAt;
  const teamIcon = teamSelect(squadName);

  const allRoundsWon = matches.every(
    (m) => m?.RoundStat?.Data?.RoundWon === true
  );

  const aggregated = matches.reduce(
    (acc, m) => {
      const d = m.RoundStat.Data;
      acc.kills += d.Kills || 0;
      acc.deaths += d.Deaths || 0;
      acc.respawns += d.Respawns || 0;
      acc.revives += d.RevivesDone || 0;
      acc.damage += d.DamageDone || 0;
      acc.duration += (d.EndTime || 0) - (d.StartTime || 0);
      return acc;
    },
    { kills: 0, deaths: 0, respawns: 0, revives: 0, damage: 0, duration: 0 }
  );

  const mapDetails = imageSwitcher(matches?.[0]?.RoundStat?.Data?.MapVariant);

  const {
    button,
    dialogContent,
    dialogHeader,
    closeButton,
    mapVStack,
    innerVStack,
    text,
    stackContainer,
    teamBox,
    absoluteHStack,
  } = tournamentDetailsStyles;

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button {...button}>
          Tournament Details
          <BsArrowRight />
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content {...dialogContent}>
            <Dialog.Header {...dialogHeader}>
              <Dialog.CloseTrigger asChild>
                <CloseButton {...closeButton} />
              </Dialog.CloseTrigger>

              <VStack
                bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapDetails?.map}")`}
                {...mapVStack}
              >
                <VStack {...innerVStack}>
                  <PlayerClass
                    archetype={
                      data?.matches[0]?.RoundStat?.Data?.CharacterArchetype
                    }
                  />
                  <VStack alignItems="flex-start" gap={0}>
                    <Text
                      fontStyle="italic"
                      fontSize="2xl"
                      textTransform="uppercase"
                    >
                      {mapDetails?.mapName}
                    </Text>
                    <Text fontStyle="italic">{formatTimestamp(createdAt)}</Text>
                  </VStack>
                </VStack>
              </VStack>
            </Dialog.Header>

            <Dialog.Body pt={0} px={4} pb={6}>
              <Stack {...stackContainer}>
                <VStack alignItems="flex-start" w="100%">
                  <HStack>
                    <Box bgImage={`url("${teamIcon}")`} {...teamBox} />
                    <Text {...text}>{squadName}</Text>
                  </HStack>

                  <RadialKD
                    kills={aggregated.kills}
                    deaths={aggregated.deaths}
                  />
                </VStack>

                <VStack gap={0} alignItems="flex-start" w="100%">
                  <WinCard isWin={allRoundsWon} isTournament />
                  <Box p={1}></Box>
                  <Text {...text}>Kills: {aggregated.kills}</Text>
                  <Text {...text}>Deaths: {aggregated.deaths}</Text>
                  <Text {...text}>Respawns: {aggregated.respawns}</Text>
                  <Text {...text}>Revives: {aggregated.revives}</Text>
                  <Text {...text}>Damage: {Math.round(aggregated.damage)}</Text>
                </VStack>

                <HStack {...absoluteHStack}>
                  <FaClock />
                  <Text>{getMatchDuration(0, aggregated.duration)}</Text>
                </HStack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
