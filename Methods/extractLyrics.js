import * as cheerio from "cheerio";

const extractLyrics = async (url) => {
  var data = await fetch(url).then((res) => res.text());

  const $ = cheerio.load(data);
  let lyrics = $('div[class="lyrics"]').text().trim();
  if (!lyrics) {
    lyrics = "";
    $('div[class^="Lyrics__Container"]').each((i, elem) => {
      if ($(elem).text().length !== 0) {
        let snippet = $(elem)
          .html()
          .replace(/<br>/g, " ")
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "")
          .replace(/\[(.*?)\]|\((.*?)\)/g, "")
          .replace(/['"](?= )|(?<= )['"]/g, "")
          .replace(/[.,?;!](?= )/gm, " ");
        lyrics += $("<textarea/>").html(snippet).text();
      }
    });
  }
  if (!lyrics) return null;
  return lyrics.trim().toLowerCase();
};

export { extractLyrics };
