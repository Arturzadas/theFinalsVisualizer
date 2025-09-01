import { Badge, HStack, Text } from "@chakra-ui/react";
import { winCardStyles } from "./styles";

export const WinCard = ({ isWin, isTournament }) => {
  const { badge, hStack, text } = winCardStyles;

  return (
    <HStack {...hStack}>
      <Badge {...badge} bgColor={isWin ? "#1CD322" : "#D31C44"}>
        {isWin ? "WIN" : "LOSS"}
      </Badge>
      {isTournament && <Text {...text}>Tournament</Text>}
    </HStack>
  );
};
