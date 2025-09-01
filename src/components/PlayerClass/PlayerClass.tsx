import { Box, HStack, Text } from "@chakra-ui/react";
import { playerClassStyles } from "./styles";

export const PlayerClass = ({ archetype }) => {
  let barNum = 1;
  let barChar = "";

  switch (archetype) {
    case "DA_Archetype_Medium":
      barNum = 10;
      barChar = "M";
      break;
    case "DA_Archetype_Heavy":
      barNum = 14;
      barChar = "H";
      break;
    case "DA_Archetype_Small":
      barNum = 6;
      barChar = "L";
      break;
    default:
      barNum = 1;
      barChar = "";
      break;
  }

  const { barText, containerHStack, barBox } = playerClassStyles;

  return (
    <HStack>
      <Text {...barText}>{barChar}</Text>
      <HStack {...containerHStack}>
        {Array(barNum)
          .fill(0)
          .map((_, i) => (
            <Box {...barBox} key={i} />
          ))}
      </HStack>
    </HStack>
  );
};
