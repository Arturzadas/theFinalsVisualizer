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
        .map((el, index) => {
          try {
            return JSON.parse(el);
          } catch (err) {
            console.log(el, err, index);
          }
        })
        .filter((el) => {
          return el?.RoundStat;
        });

      //3 LTMs
      //4 casuals
      //2 tournaments
      //practice range?

      //!maps
      // monaco
      //seoul
      //lasVegas
      //bernal
      //kyoto
      //playground  - heavy hitters
      //forest - PEACE Center

      //fortune stadium arena_04
      //* skyway_stadium arena_01
      //sys horizon arena_02
      //nozomi/citadel arena_04

      setter(format);
    };
  };

  const mapData = {
    vegas: {
      standard: ["sunny", "sunset", "heavy rain", "clear night"],
      sandstorm: ["foggy day"],
    },
    nozomi: {
      standard: ["sunny", "clear night"],
    },
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
