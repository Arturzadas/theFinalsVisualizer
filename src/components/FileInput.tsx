import { Input } from "@chakra-ui/react";

export const FileInput = ({ setter }) => {
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

      console.log(
        format
          .map((el) => {
            return {
              scenario: el?.RoundStat?.Data?.ScenarioID,
              tournament: el?.RoundStat?.Data?.TournamentID,
            };
          })
          .filter((el) => {
            // return el?.ScenarioID === "164312917" && el?.TournamentID !== "";
            return el?.tournament !== "";
          })
      );

      setter(format);
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
