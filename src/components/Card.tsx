import { HStack, Image, VStack } from "@chakra-ui/react";
import Kyoto_day from "../assets/Kyoto_day.png";

export const Card = ({ data }) => {
  const example = {
    RoundStat: {
      CreatedAt: "2025-05-04T19:49:52.018708Z",
      Data: {
        Kills: 14,
        KillsPerItem: { "473278792": 11 },
        Deaths: 13,
        Dbnos: 0,
        Respawns: 13,
        DamageDone: 4446.2427,
        RevivesDone: 0,
        RespawnsDone: 0,
        SquadID: 1,
        SquadName: "The Kingfish",
        TournamentID: "",
        MatchID: "",
        Tier: 0,
        StartTime: 1746387306676,
        EndTime: 1746388191452,
        CharacterArchetype: "DA_Archetype_Medium",
        RoundWon: true,
        TournamentWon: false,
        Currency: 20000,
        MapVariant: "DA_MV_Forest_01_Base_01",
        EnvironmentalCondition: "DA_EC_TDM_Forest_01_Day",
        Disconnected: false,
        FameAmount: 0,
        ScenarioID: "704866484",
        LeaderboardPosition: 1,
        IsBackfill: false,
      },
    },
  };

  return (
    <HStack w={"100%"} bgColor={"#3C3940"} borderRadius={"sm"}>
      <VStack
        bgImage={`url("${Kyoto_day}")`}
        // bgAttachment="cover"
        bgSize={"cover"}
        h={"200px"}
        w={"33%"}
        maxW={"400px"}
        minW={"200px"}
      ></VStack>
      Cenas aqui
    </HStack>
  );
};
