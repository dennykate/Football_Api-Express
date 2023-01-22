import axios from "axios";
import * as cheerio from "cheerio";
import { footballLeagues } from "../utils/data.js";

const BASE_URL = "https://football-api-express.vercel.app/standing";

export const getLeagueStanding = async (req, res) => {
  const league = req.params.league;
  const leagueData = footballLeagues.find((e) => e.path == league);

  if (!leagueData) {
    return res.status(400).json({
      message: "error in league name",
      data: [
        `${BASE_URL}/premier-league`,
        `${BASE_URL}/laliga`,
        `${BASE_URL}/bundesliga`,
        `${BASE_URL}/serie-a`,
        `${BASE_URL}/eredivise`,
        `${BASE_URL}/league-1`,
      ],
    });
  }

  const result = await axios.get(leagueData.url);
  const $ = cheerio.load(result.data);
  let table = [];

  $(".standings__row--link", result.data).each((index, element) => {
    const name = $(element).children("a").attr("aria-label");
    const standing = index + 1;
    const logo = $(element)
      .children("a")
      .children(".standings__team")
      .children(".standings__team-logo")
      .children(".entity-logo")
      .children("div")
      .children("picture")
      .children("source")
      .attr("srcset");
    const totalStats = $(element)
      .children("a")
      .children(".standings__cell--numeric")
      .text()
      .split(" ");
    const played = totalStats[3];
    const won = totalStats[5];
    const draw = totalStats[7];
    const lose = totalStats[9];
    const goalDifferent = totalStats[11];
    const points = totalStats[12];

    table.push({
      logo,
      name,
      standing,
      played,
      won,
      draw,
      lose,
      goalDifferent,
      points,
    });
  });

  return res.status(200).json({
    meta: {
      total: table.length,
      league: leagueData.name,
    },
    data: table,
  });
};
