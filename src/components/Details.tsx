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

export const Details = ({ data }) => {
  const mapDetails = imageSwitcher(data?.MapVariant);

  const text = {
    textAlign: "left",
    w: "full",
    m: 0,
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Dialog.Root placement={"center"}>
      <Dialog.Trigger asChild>
        <Button boxShadow={"md"} fontWeight={"bold"}>
          See Details {"->"}
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
                  <PlayerClass archetype={data?.CharacterArchetype} />
                  <VStack
                    alignItems={"flex-start"}
                    gap={0}
                    justifyContent={"flex-end"}
                  >
                    <Text fontStyle={"italic"} fontSize={"2xl"}>
                      {mapDetails?.mapName?.toUpperCase()}
                    </Text>
                    <Text fontStyle={"italic"}>
                      {formatTimestamp(data?.createdAt)}
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
                      bgImage={`url("${teamSelect(data?.SquadName)}")`}
                      bgSize={"cover"}
                    />
                    <Text {...text}>{data?.SquadName}</Text>
                  </HStack>
                  <RadialKD kills={data?.Kills} deaths={data?.Deaths} />
                </VStack>

                <VStack gap={0} alignItems={"flex-start"} w="100%">
                  <WinCard
                    isWin={data?.RoundWon}
                    isTournament={!!data?.TournamentID}
                  />
                  <Box p={1}></Box>
                  <Text {...text}>Kills: {data?.Kills}</Text>
                  <Text {...text}>Deaths: {data?.Deaths}</Text>
                  <Text {...text}>Respawns: {data?.Respawns}</Text>
                  <Text {...text}>Revives: {data?.RevivesDone}</Text>
                  <Text {...text}>Damage: {Math.round(data?.DamageDone)}</Text>
                </VStack>

                <HStack
                  position={"absolute"}
                  right={{ base: "4", md: "5" }}
                  bottom={{ base: "4", md: "5" }}
                >
                  <FaClock />
                  <Text>
                    {getMatchDuration(data?.StartTime, data?.EndTime)}
                  </Text>
                </HStack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
