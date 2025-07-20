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

const RadialKD = ({ kills = 0, deaths = 0 }) => {
  const ratio = deaths === 0 ? kills : kills / deaths;
  const clampedRatio = Math.min(ratio, 2); // limit display to 3.0 for clean visuals
  const percentage = (clampedRatio / 2) * 100;

  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Center p={0}>
      <Box position="relative" w="100px" h="100px">
        <svg height="100" width="100">
          <circle
            stroke="#2D3748"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="50"
            cy="50"
          />
          <circle
            stroke={clampedRatio > 1 ? "#1CD322" : "#D31C44"}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
        >
          <Text fontSize="xl" fontWeight="bold">
            {ratio.toFixed(2)}
          </Text>
          <Text fontSize="xs">K/D</Text>
        </Box>
      </Box>
    </Center>
  );
};

export const Details = ({ data }) => {
  const mapDetails = imageSwitcher(data?.MapVariant);

  const text = {
    textAlign: "left",
    w: "full",
    m: 0,
  };

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
          <Dialog.Content fontFamily={"Saira"} w={"100%"}>
            <Dialog.Header w={"100%"} p={0} mb={4}>
              <Dialog.CloseTrigger asChild>
                <CloseButton bgColor={"black"} size="sm" />
              </Dialog.CloseTrigger>
              <VStack
                bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapDetails?.map}")`}
                // bgAttachment="cover"
                bgSize={"cover"}
                h={"200px"}
                w={"100%"}
                minW={"250px"}
                borderRadius={"4px 4px 0 0 "}
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
            <Dialog.Body pt={0}>
              <HStack p={0}>
                <VStack>
                  <HStack>
                    <Box
                      h={"50px"}
                      w={"70px"}
                      bgImage={`url("${teamSelect(data?.SquadName)}")`}
                      bgSize={"cover"}
                    ></Box>
                    <Text {...text}>{data?.SquadName}</Text>
                  </HStack>
                  <RadialKD kills={data?.Kills} deaths={data?.Deaths} />
                </VStack>
                <VStack gap={0} alignItems={"flex-start"}>
                  <WinCard
                    isWin={data?.RoundWon}
                    isTournament={!!data?.TournamentID}
                  />
                  {/* Divider */}
                  <Box p={1}></Box>
                  {/* Divider */}
                  <Text {...text}>Kills: {data?.Kills}</Text>
                  <Text {...text}>Deaths: {data?.Deaths}</Text>
                  <Text {...text}>Respawns: {data?.Respawns}</Text>
                  <Text {...text}>Revives: {data?.RevivesDone}</Text>
                  <Text {...text}>Damage: {Math.round(data?.DamageDone)}</Text>
                </VStack>
                <HStack position={"absolute"} right={"5"} bottom={"5"}>
                  <FaClock />
                  <Text>
                    {getMatchDuration(data?.StartTime, data?.EndTime)}
                  </Text>
                </HStack>
              </HStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
