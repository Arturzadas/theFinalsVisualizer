import React, { Suspense } from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Portal, Select, createListCollection, Stat } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  formatNumberWithCommas,
  formatSeconds,
  formatWinRate,
} from "../../helpers/cardHelper";
import { RadialKD } from "../RadialKD/RadialKD";
const StackedBarChart = React.lazy(
  () => import("../StackedBarChart/StackedBarChart")
);

import { statsStyles } from "./styles";

const Stats = ({ data }) => {
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
    Respawns,
    TournamentWinRate,
    TournamentsWon,
    TotalTimePlayed,
    RevivesDone,
  } = totalData;

  const [graphType, setGraphType] = useState("RoundsPlayedPerArchetype");
  const [graphItems, setGraphItems]: any = useState([]);
  const [version, setVersion] = useState(0);
  const {
    container,
    titleText,
    topHStack,
    radialBox,
    simpleGrid,
    graphVStack,
    select,
    trigger,
  } = statsStyles;

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
    <VStack {...container} onClick={() => console.log(data)}>
      <Text {...titleText}>All time stats</Text>

      <VStack w="full">
        <HStack {...topHStack}>
          <Box {...radialBox}>
            <RadialKD kills={Kills} deaths={Deaths} />
          </Box>

          <SimpleGrid {...simpleGrid}>
            <Stat.Root alignItems="center">
              <Stat.Label>Kills</Stat.Label>
              <Stat.ValueText>{formatNumberWithCommas(Kills)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Deaths</Stat.Label>
              <Stat.ValueText>{formatNumberWithCommas(Deaths)}</Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Respawns</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Respawns)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Revives</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(RevivesDone)}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Damage</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Math.round(DamageDone))}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Tournaments Won</Stat.Label>
              <Stat.ValueText>
                {formatNumberWithCommas(Math.round(TournamentsWon))}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Tournament win rate</Stat.Label>
              <Stat.ValueText>
                {formatWinRate(TournamentWinRate.toString())}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root alignItems="center">
              <Stat.Label>Time played</Stat.Label>
              <Stat.ValueText>
                {formatSeconds(Math.round(TotalTimePlayed))}
              </Stat.ValueText>
            </Stat.Root>
          </SimpleGrid>
        </HStack>

        <VStack {...graphVStack}>
          <Select.Root
            collection={types}
            onChange={(e: any) => setGraphType(e?.target?.value)}
            {...select}
          >
            <Select.HiddenSelect />
            <Select.Label>Graph types</Select.Label>
            <Select.Control>
              <Select.Trigger {...trigger}>
                <Select.ValueText placeholder="Data filter" />
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
          <Suspense fallback={<></>}>
            <StackedBarChart key={version} data={graphItems} type={graphType} />
          </Suspense>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Stats;
