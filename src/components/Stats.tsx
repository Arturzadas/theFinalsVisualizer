import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { RadialKD } from "./RadialKD";
import RoundsPlayedPieChart from "./StackedBarChart";
import StackedBarChart from "./StackedBarChart";
import {
  Portal,
  Select,
  createListCollection,
  Stat,
  StatLabel,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  formatNumberWithCommas,
  formatSeconds,
  formatWinRate,
} from "../helpers/cardHelper";

export const Stats = ({ data }) => {
  // average damage per match
  // average kills and deaths per match
  // average revives per match
  // average match time
  // average respawns
  // times played as each class
  // class win rate

  const types = createListCollection({
    items: [
      { label: "Time played", value: "TimePlayedByArchetype" },
      { label: "Rounds played", value: "RoundsPlayedPerArchetype" },
      { label: "Rounds Won", value: "RoundsWonPerArchetype" },
      { label: "Tournament Win rate", value: "TournamentWinRatePerArchetype" },
      { label: "Tournaments Played", value: "TournamentsPlayedPerArchetype" },
      { label: "Tournaments Won", value: "TournamentsWonPerArchetype" },
    ],
  });

  const totalData = data?.RoundStatSummary?.Data?.total;
  const {
    Kills,
    DamageDone,
    Deaths,
    Disconnects,
    Respawns,
    RoundWinRate,
    RoundsPlayed,
    TournamentWinRate,
    TournamentsWon,
    TotalTimePlayed,
    RevivesDone,
  } = totalData;

  const [graphType, setGraphType] = useState("RoundsPlayedPerArchetype");
  const [graphItems, setGraphItems]: any = useState([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const graphData = totalData[graphType];

    const formatted = [
      {
        label: "Heavy",
        amount: graphData?.DA_Archetype_Heavy || 0,
        color: "#aeaeaeff",
      },
      {
        label: "Medium",
        amount: graphData?.DA_Archetype_Medium || 0,
        color: "#797979ff",
      },
      {
        label: "Light",
        amount: graphData?.DA_Archetype_Small || 0,
        color: "#555555ff",
      },
    ];

    setVersion((prev) => prev + 1);

    setGraphItems(formatted);
  }, [graphType, totalData]);

  return (
    <VStack
      onClick={() => console.log(data)}
      w="100%"
      gap={0}
      bgColor="#3C3940"
      borderRadius="4px"
      fontWeight="500"
      fontFamily="Saira"
      transition="ease 0.2s all"
      _hover={{ transform: "scale(1.02)" }}
      boxShadow="md"
      p={4}
    >
      <Text
        textTransform={"uppercase"}
        fontWeight={"bold"}
        fontStyle={"italic"}
        fontSize={"2xl"}
        pb={10}
      >
        All time stats
      </Text>
      <VStack w={"full"}>
        <HStack
          w={"full"}
          // border={"1px solid gray"}
          // borderRadius={"md"}
          // p={2}
          // py={4}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"center"}
          gap={10}
        >
          <Box px={{ sm: 0, md: 6 }}>
            <RadialKD kills={Kills} deaths={Deaths} />
          </Box>
          <SimpleGrid columns={{ base: 2, md: 3 }} w="full" gapY={8}>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Kills</Stat.Label>
              <Stat.ValueText>{formatNumberWithCommas(Kills)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Deaths</Stat.Label>
              <Stat.ValueText>{formatNumberWithCommas(Deaths)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Respawns</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Respawns)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Revives</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(RevivesDone)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Damage</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Math.round(DamageDone))}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Tournaments Won</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Math.round(TournamentsWon))}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Tournament win rate</Stat.Label>
              <Stat.ValueText>
                {formatWinRate(TournamentWinRate.toString())}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems={"center"}>
              <Stat.Label>Time played</Stat.Label>
              <Stat.ValueText>
                {formatSeconds(Math.round(TotalTimePlayed))}
              </Stat.ValueText>
            </Stat.Root>
          </SimpleGrid>
        </HStack>
        <VStack w={"full"} pt={8} alignItems={"flex-start"}>
          <Select.Root
            collection={types}
            size="sm"
            minW="200px"
            onChange={(e: any) => setGraphType(e?.target?.value)}
            pb={2}
          >
            <Select.HiddenSelect />
            <Select.Label>Graph types</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Select framework" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {types.items.map((el) => (
                    <Select.Item item={el} key={el.value}>
                      {el.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
          <StackedBarChart key={version} data={graphItems} type={graphType} />
        </VStack>
      </VStack>
    </VStack>
  );
};
