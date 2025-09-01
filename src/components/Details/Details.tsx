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
import { FaClock } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import {
  formatTimestamp,
  getMatchDuration,
  imageSwitcher,
  teamSelect,
} from "../../helpers/cardHelper";
import { PlayerClass } from "../PlayerClass/PlayerClass";
import { RadialKD } from "../RadialKD/RadialKD";
import { WinCard } from "../WinCard/WinCard";
import { detailsStyles } from "./styles";

export const Details = ({ data }) => {
  const mapDetails = imageSwitcher(data?.MapVariant);

  const {
    triggerButton,
    content,
    header,
    closeButton,
    headerImage,
    headerContent,
    headerTextBlock,
    body,
    bodyStack,
    teamInfo,
    teamLogo,
    statsBlock,
    winBox,
    clockRow,
    text,
  } = detailsStyles;

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button {...triggerButton}>
          Match Details
          <BsArrowRight />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content {...content}>
            <Dialog.Header {...header}>
              <Dialog.CloseTrigger asChild>
                <CloseButton {...closeButton} />
              </Dialog.CloseTrigger>
              <VStack
                {...headerImage}
                bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapDetails?.map}")`}
              >
                <VStack {...headerContent}>
                  <PlayerClass archetype={data?.CharacterArchetype} />
                  <VStack {...headerTextBlock}>
                    <Text fontStyle="italic" fontSize="2xl">
                      {mapDetails?.mapName?.toUpperCase()}
                    </Text>
                    <Text fontStyle="italic">
                      {formatTimestamp(data?.createdAt)}
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </Dialog.Header>

            <Dialog.Body {...body}>
              <Stack {...bodyStack}>
                <VStack {...teamInfo}>
                  <HStack>
                    <Box
                      {...teamLogo}
                      bgImage={`url("${teamSelect(data?.SquadName)}")`}
                    />
                    <Text {...text}>{data?.SquadName}</Text>
                  </HStack>
                  <RadialKD kills={data?.Kills} deaths={data?.Deaths} />
                </VStack>

                <VStack {...statsBlock}>
                  <Box {...winBox}>
                    <WinCard
                      isWin={data?.RoundWon}
                      isTournament={!!data?.TournamentID}
                    />
                  </Box>
                  <Box p={1}></Box>
                  <Text {...text}>Kills: {data?.Kills}</Text>
                  <Text {...text}>Deaths: {data?.Deaths}</Text>
                  <Text {...text}>Respawns: {data?.Respawns}</Text>
                  <Text {...text}>Revives: {data?.RevivesDone}</Text>
                  <Text {...text}>Damage: {Math.round(data?.DamageDone)}</Text>
                </VStack>

                <HStack {...clockRow}>
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
