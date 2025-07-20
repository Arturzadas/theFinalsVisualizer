import { Badge, HStack, Text } from "@chakra-ui/react";

export const WinCard = ({ isWin, isTournament }) => {
  return (
    <HStack>
      <Badge
        fontSize={"2xl"}
        fontWeight={"500"}
        fontFamily={"Saira"}
        py={2}
        bgColor={isWin ? "#1CD322" : "#D31C44"}
        boxShadow={"md"}
      >
        {isWin ? <>WIN</> : <>LOSS</>}
      </Badge>
      {isTournament && <Text>Tournament</Text>}
    </HStack>
  );
};
