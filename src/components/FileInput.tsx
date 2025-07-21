import { useRef, useState, useEffect } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { TiUpload } from "react-icons/ti";
import { testData } from "../assets/testData.ts";
import { testStats } from "../assets/testStats.ts";

export const FileInput = ({ setter, setStatsData }) => {
  const inputRef: any = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    if (!files || !files.length) return;

    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = (e) => {
      const text = e?.target?.result;
      if (!text || typeof text !== "string") return;
      const textArr = text.split("\n");

      const format = textArr.map((el, index) => {
        try {
          return JSON.parse(el);
        } catch (err) {
          console.log(el, err, index);
        }
      });

      const matches = format.filter((el) => el?.RoundStat);
      const stats = format.find((el) => el?.RoundStatSummary);

      const tournamentMap = new Map();
      const noTournamentIDMatches: any = [];

      function parseDate(createdAtStr) {
        if (typeof createdAtStr !== "string") return null;
        const normalized = createdAtStr.replace(/\.(\d{3})\d*Z$/, ".$1Z");
        const date = new Date(normalized);
        return isNaN(date.getTime()) ? null : date;
      }

      for (const match of matches) {
        const tournamentID = match?.RoundStat?.Data?.TournamentID;
        const createdAtRaw = match?.RoundStat?.CreatedAt;
        const createdAt = parseDate(createdAtRaw);

        if (!createdAt) {
          // Skip matches with invalid createdAt date
          continue;
        }

        if (tournamentID && tournamentID.trim() !== "") {
          // Group matches with valid tournamentID
          if (!tournamentMap.has(tournamentID)) {
            tournamentMap.set(tournamentID, {
              tournamentID,
              matches: [],
              earliestCreatedAt: createdAt,
            });
          }
          const group = tournamentMap.get(tournamentID);
          group.matches.push(match);
          if (createdAt < group.earliestCreatedAt) {
            group.earliestCreatedAt = createdAt;
          }
        } else {
          // Collect matches without a tournamentID separately
          noTournamentIDMatches.push({ ...match, createdAt });
        }
      }

      // Format grouped tournaments
      const formattedGroupTournaments = Array.from(tournamentMap.values()).map(
        (group) => ({
          tournamentID: group.tournamentID,
          matches: group.matches,
          earliestCreatedAt: group.earliestCreatedAt.toISOString(),
        })
      );

      // Now combine grouped tournaments + matches without tournamentID
      // For sorting, use earliestCreatedAt for groups, createdAt for individual matches
      const combined = [
        ...formattedGroupTournaments,
        ...noTournamentIDMatches,
      ].sort((a: any, b: any) => {
        const dateA = a.earliestCreatedAt
          ? new Date(a.earliestCreatedAt)
          : a.createdAt;
        const dateB = b.earliestCreatedAt
          ? new Date(b.earliestCreatedAt)
          : b.createdAt;
        return dateB - dateA; // most recent first
      });

      setter(combined);
      setStatsData(stats);
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    // Prevent opening file dialog on interactive elements
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input")
    )
      return;

    inputRef.current?.click();
  };

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleUseExample = (e) => {
    e.stopPropagation();
    // Example data for preview/demo purposes
    setter(testData);
    setStatsData(testStats);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      border={isDragging ? "4px dashed teal" : "2px dashed gray.300"}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1000}
      cursor="pointer"
      p={10}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <VStack
        w={"100%"}
        h={"100%"}
        border={"1px solid gray"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"2xl"}
        transition={"ease 0.2s all"}
        _hover={{
          transform: "scale(1.01)",
        }}
      >
        <TiUpload size={100} fill={"gray"} />
        <Text fontSize="xl" color="gray">
          Upload File
        </Text>
        <Text>or</Text>
        <Button onClick={handleUseExample}>Use example</Button>
      </VStack>
    </Box>
  );
};
