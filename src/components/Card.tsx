import { HStack, Text, VStack } from "@chakra-ui/react";
import Kyoto_day from "../assets/Kyoto_day.png";
import { formatTimestamp, imageSwitcher } from "../helpers/cardHelper";

export const Card = ({ data }) => {
  const mapInfo = imageSwitcher(data?.Data?.MapVariant);

  return (
    <HStack w={"100%"} bgColor={"#3C3940"} borderRadius={"4px"}>
      <VStack
        bgImage={`linear-gradient(to top, rgba(0, 0, 0, 1), transparent), url("${mapInfo?.map}")`}
        // bgAttachment="cover"
        bgSize={"cover"}
        h={"200px"}
        w={"33%"}
        maxW={"400px"}
        minW={"200px"}
        borderRadius={"4px 0 0 4px "}
        justifyContent={"flex-end"}
        alignItems={"flex-start"}
      >
        <VStack p={4} alignItems={"flex-start"} gap={0}>
          <Text
            fontWeight={"500"}
            fontStyle={"italic"}
            fontFamily={"Saira"}
            fontSize={"2xl"}
          >
            {mapInfo?.mapName?.toUpperCase()}
          </Text>
          <Text fontWeight={"500"} fontStyle={"italic"} fontFamily={"Saira"}>
            {formatTimestamp(data?.CreatedAt)}
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
};
