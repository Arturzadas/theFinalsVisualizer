import { Box, Center, Text } from "@chakra-ui/react";
import { radialKDStyles } from "./styles";

export const RadialKD = ({ kills = 0, deaths = 0 }) => {
  const ratio = deaths === 0 ? kills : kills / deaths;
  const clampedRatio = Math.min(ratio, 2);
  const percentage = (clampedRatio / 2) * 100;

  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const { center, container, textBox, ratioText, typeText } = radialKDStyles;

  return (
    <Center {...center}>
      <Box {...container}>
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
        <Box {...textBox}>
          <Text {...ratioText}>{ratio.toFixed(2)}</Text>
          <Text {...typeText}>K/D</Text>
        </Box>
      </Box>
    </Center>
  );
};
