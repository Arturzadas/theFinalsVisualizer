import { Box, HStack, Text } from "@chakra-ui/react";

export const PlayerClass = ({ archetype }) => {
  let barNum = 1;
  let barChar = "";

  if (archetype === "DA_Archetype_Medium") {
    barNum = 10;
    barChar = "M";
  }
  if (archetype === "DA_Archetype_Heavy") {
    barNum = 14;
    barChar = "H";
  }
  if (archetype === "DA_Archetype_Small") {
    barNum = 6;
    barChar = "L";
  }

  return (
    <HStack>
      <Text
        fontWeight={"bold"}
        p={1}
        px={3}
        borderRadius={"sm"}
        bgColor={"#3C394098"}
        boxShadow={"md"}
      >
        {barChar}
      </Text>
      <HStack w={{ sm: "0px", md: "200px" }} gap={1}>
        {Array(barNum)
          .fill(0)
          .map((_, i) => (
            <Box
              display={{ sm: "none", md: "block" }}
              boxShadow={"md"}
              key={i}
              bgColor="white"
              borderRadius="3px"
              h="15px"
              flex="1"
            />
          ))}
      </HStack>
    </HStack>
  );
};
