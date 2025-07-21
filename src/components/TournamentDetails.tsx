import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  VStack,
  Center,
  Box,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  formatTimestamp,
  getMatchDuration,
  imageSwitcher,
  teamSelect,
} from "../helpers/cardHelper";
import { WinCard } from "./WinCard";
import { FaClock } from "react-icons/fa";
import { PlayerClass } from "./PlayerClass";
import { RadialKD } from "./RadialKD";
import { BsArrowRight } from "react-icons/bs";

export const TournamentDetails = ({ data }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const matches = data?.matches || [];
  const squadName = matches?.[0]?.RoundStat?.Data?.SquadName;
  const createdAt = data?.earliestCreatedAt;
  const teamIcon = teamSelect(squadName);

  const allRoundsWon = matches.every(
    (m) => m?.RoundStat?.Data?.RoundWon === true
  );

  // Aggregate stats
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

  const text = {
    textAlign: "left",
    w: "full",
    m: 0,
  };

  // Use first match for map thumbnail
  const mapDetails = imageSwitcher(matches?.[0]?.RoundStat?.Data?.MapVariant);

  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild>
        <Button boxShadow={"md"} fontWeight={"bold"}>
          Tournament Details
          <BsArrowRight />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            fontFamily={"Saira"}
            w={{ base: "100vw", md: "600px" }}
            h={{ base: "100vh", md: "auto" }}
            maxW={"100%"}
            borderRadius={{ base: 0, md: "md" }}
            overflow="hidden"
          >
            <Dialog.Header w={"100%"} p={0} mb={4}>
              <Dialog.CloseTrigger asChild>
                <CloseButton
                  bgColor={"black"}
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  zIndex={1}
                />
              </Dialog.CloseTrigger>
              <VStack
                bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapDetails?.map}")`}
                bgSize={"cover"}
                h={"200px"}
                w={"100%"}
                minW={"250px"}
                borderRadius={{ base: 0, md: "4px 4px 0 0" }}
                justifyContent={"flex-end"}
                alignItems={"flex-start"}
                boxShadow={"md"}
              >
                <VStack
                  p={4}
                  h={"100%"}
                  justifyContent={"space-between"}
                  gap={0}
                  alignItems={"flex-start"}
                >
                  <PlayerClass
                    archetype={
                      data?.matches[0]?.RoundStat?.Data?.CharacterArchetype
                    }
                  />
                  <VStack alignItems={"flex-start"} gap={0}>
                    <Text
                      fontStyle={"italic"}
                      fontSize={"2xl"}
                      textTransform={"uppercase"}
                    >
                      {mapDetails?.mapName}
                    </Text>
                    <Text fontStyle={"italic"}>
                      {formatTimestamp(createdAt)}
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </Dialog.Header>

            <Dialog.Body pt={0} px={4} pb={6}>
              <Stack
                direction={{ base: "column", md: "row" }}
                align="start"
                position="relative"
              >
                <VStack alignItems={"flex-start"} w="100%">
                  <HStack>
                    <Box
                      h={"50px"}
                      w={"70px"}
                      bgImage={`url("${teamIcon}")`}
                      bgSize={"cover"}
                    />
                    <Text {...text}>{squadName}</Text>
                  </HStack>
                  <RadialKD
                    kills={aggregated.kills}
                    deaths={aggregated.deaths}
                  />
                </VStack>

                <VStack gap={0} alignItems={"flex-start"} w="100%">
                  <WinCard isWin={allRoundsWon} isTournament={true} />
                  <Box p={1}></Box>
                  <Text {...text}>Kills: {aggregated.kills}</Text>
                  <Text {...text}>Deaths: {aggregated.deaths}</Text>
                  <Text {...text}>Respawns: {aggregated.respawns}</Text>
                  <Text {...text}>Revives: {aggregated.revives}</Text>
                  <Text {...text}>Damage: {Math.round(aggregated.damage)}</Text>
                </VStack>

                <HStack
                  position={{ base: "relative", md: "absolute" }}
                  right={{ base: "4", md: "3" }}
                  bottom={{ base: "4", md: "0" }}
                  pt={5}
                  pl={4}
                >
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
