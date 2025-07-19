import kyoto from "../assets/Kyoto_day.png";
import bernal from "../assets/Bernal_Standard_Afternoon.png";
import skyway from "../assets/Skyway_Default_Afternnoon.jpg";
import fortune from "../assets/Fortune_Stadium_Standard_Issue_Sunny_day.png";
import sysHorizon from "../assets/Horizon_default_sunny_day.jpg";
import lasVegas from "../assets/Las-Vegas-2023_Loading-Screen.png";
import monaco from "../assets/Monaco_Default_Afternoon.jpg";
import seoul from "../assets/Seoul_Default_Afternoon.jpg";
import heavyHitters from "../assets/TestRange_Default.jpg";
import nozomi from "../assets/1920px-NOZOMI_Placeholder.png";

export const imageSwitcher = (mapStr) => {
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

  let map;
  let mapName;

  switch (true) {
    case mapStr.includes("Kyoto"):
      map = kyoto;
      mapName = "Kyoto";
      break;
    case mapStr.includes("Bernal"):
      map = bernal;
      mapName = "Bernal";
      break;
    case mapStr.includes("Arena_01"):
      map = skyway;
      mapName = "Skyway Stadium";
      break;
    case mapStr.includes("Arena_04"):
      map = nozomi;
      mapName = "Nozomi/Citadel";
      break;
    case mapStr.includes("Arena_03"):
      map = fortune;
      mapName = "Fortune Stadium";
      break;
    case mapStr.includes("Arena_02"):
      map = sysHorizon;
      mapName = "SYS$HORIZON";
      break;
    case mapStr.includes("LasVegas"):
      map = lasVegas;
      mapName = "Las Vegas";
      break;
    case mapStr.includes("Monaco"):
      map = monaco;
      mapName = "Monaco";
      break;
    case mapStr.includes("Seoul"):
      map = seoul;
      mapName = "Seoul";
      break;
    case mapStr.includes("Playground"):
      map = heavyHitters;
      mapName = "Heavy Hitters";
      break;
    default:
      map = bernal;
      mapName = "N/A";
  }

  return { map, mapName };
};

export function formatTimestamp(isoString) {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  return `${getOrdinal(day)} ${month} ${year} @${hours}h${minutes}m`;
}
