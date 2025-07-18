import { Input } from "@chakra-ui/react";

export const FileInput = () => {
  const handleChange = (files) => {
    if (!files || !files?.length) return;

    const reader = new FileReader();

    reader.readAsText(files[0]);

    reader.onload = (e) => {
      const text = e?.target?.result;
      if (!text || typeof text !== "string") return;
      const textArr = text?.split("\n");

      const format = textArr
        .map((el) => {
          try {
            return JSON.parse(el);
          } catch {
            //do nothing
          }
        })
        .filter((el) => {
          return el?.RoundStat;
        });

      console.log(format);
    };
  };

  return (
    <Input
      type={"file"}
      onChange={(e) => {
        handleChange(e?.target?.files);
      }}
    />
  );
};
