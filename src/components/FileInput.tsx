import { useRef, useState, useEffect } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { TiUpload } from "react-icons/ti";
import { testData } from "../assets/testData.ts";

export const FileInput = ({ setter }) => {
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

      const format = textArr
        .map((el, index) => {
          try {
            return JSON.parse(el);
          } catch (err) {
            console.log(el, err, index);
          }
        })
        .filter((el) => el?.RoundStat);

      setter(format);
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
    console.log(testData);
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
