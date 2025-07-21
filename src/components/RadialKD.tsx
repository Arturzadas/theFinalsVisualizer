import { Box, Center, Text } from "@chakra-ui/react";

export const RadialKD = ({ kills = 0, deaths = 0, type = "KD" }) => {
  const ratio = deaths === 0 ? kills : kills / deaths;
  const clampedRatio = Math.min(ratio, 2);
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
