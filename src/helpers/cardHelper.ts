import kyoto from "/Kyoto_day.png";
import bernal from "/Bernal_Standard_Afternoon.png";
import skyway from "/Skyway_Default_Afternnoon.jpg";
import fortune from "/Fortune_Stadium_Standard_Issue_Sunny_day.png";
import sysHorizon from "/Horizon_default_sunny_day.jpg";
import lasVegas from "/Las-Vegas-2023_Loading-Screen.png";
import monaco from "/Monaco_Default_Afternoon.jpg";
import seoul from "/Seoul_Default_Afternoon.jpg";
import heavyHitters from "/TestRange_Default.jpg";
import nozomi from "/1920px-NOZOMI_Placeholder.png";
import boundless from "/Frame 7.svg";
import ultraRares from "/Frame 22.svg";
import toughShells from "/Frame 21.svg";
import retros from "/Frame 16.svg";
import kingfish from "/Frame 5.svg";
import powerhouses from "/Frame 5.svg";
import highNotes from "/Frame 8.svg";
import socialites from "/Frame 10.svg";
import liveWires from "/Frame 11.svg";
import mighty from "/Frame 12.svg";
import overdogs from "/Frame 13.svg";
import jetSetters from "/Frame 17.svg";
import steamrollers from "/Frame 23.svg";
import finals from "/Frame 25.svg";

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

  if (typeof mapStr !== "string") return { map: "", mapName: "" };

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

export function getMatchDuration(startTime, endTime) {
  const durationMs = endTime - startTime;

  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);

  return `${minutes}m ${seconds}s`;
}

export const teamSelect = (teamStr) => {
  let img;

  switch (teamStr) {
    case "The Boundless":
      img = boundless;
      break;
    case "The Ultra Rares":
      img = ultraRares;
      break;
    case "The Tough Shells":
      img = toughShells;
      break;
    case "The Retros":
      img = retros;
      break;
    case "The Kingfish":
      img = kingfish;
      break;
    case "The Powerhouses":
      img = powerhouses;
      break;
    case "The High Notes":
      img = highNotes;
      break;
    case "The Socialites":
      img = socialites;
      break;
    case "The Live Wires":
      img = liveWires;
      break;
    case "The Mighty":
      img = mighty;
      break;
    case "The Overdogs":
      img = overdogs;
      break;
    case "The Jet Setters":
      img = jetSetters;
      break;
    case "The Steamrollers":
      img = steamrollers;
      break;
    default:
      img = finals; // or some fallback image
      break;
  }
  return img;
};

export function formatSeconds(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}h ${m}m ${s}s`;
}

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatWinRate(input) {
  const cleaned = input.replace(/,/g, "");

  const num = parseFloat(cleaned);

  return parseFloat(num.toFixed(2));
}
