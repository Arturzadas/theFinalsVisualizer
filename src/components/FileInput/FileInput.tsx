import { useRef, useState, useEffect } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { TiUpload } from "react-icons/ti";
import { testData } from "../../assets/testData";
import { testStats } from "../../assets/testStats";
import { fileInputStyles } from "./styles";

export const FileInput = ({ setter, setStatsData }) => {
  const inputRef: any = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const processStructuredData = (parsedArray) => {
    const matches = parsedArray.filter((el) => el?.RoundStat);
    const stats = parsedArray.find((el) => el?.RoundStatSummary);

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

      if (!createdAt) continue;

      if (tournamentID && tournamentID.trim() !== "") {
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
        noTournamentIDMatches.push({ ...match, createdAt });
      }
    }

    const formattedGroupTournaments = Array.from(tournamentMap.values()).map(
      (group) => ({
        tournamentID: group.tournamentID,
        matches: group.matches,
        earliestCreatedAt: group.earliestCreatedAt.toISOString(),
      })
    );

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
      return dateB - dateA;
    });

    return { combined, stats };
  };

  const handleFiles = (files) => {
    if (!files || !files.length) return;

    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = (e) => {
      const text = e?.target?.result;
      if (!text || typeof text !== "string") return;

      const textArr = text.split("\n");
      const parsed = textArr.map((line) => {
        try {
          return JSON.parse(line);
        } catch (err) {
          console.warn("Line parse failed:", line, err);
        }
      });

      const cleaned = parsed.filter(Boolean);
      const { combined, stats } = processStructuredData(cleaned);

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
    const { combined } = processStructuredData(testData);
    setter(combined);
    setStatsData(testStats);
  };

  const { container, inner, uploadIcon, uploadText } = fileInputStyles;

  return (
    <Box
      {...container}
      border={isDragging ? "4px dashed teal" : "2px dashed gray.300"}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <VStack {...inner}>
        <TiUpload {...uploadIcon} />
        <Text {...uploadText}>Upload File</Text>
        <Text>or</Text>
        <Button onClick={handleUseExample}>Use example</Button>
      </VStack>
    </Box>
  );
};
