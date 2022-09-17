import * as cheerio from "cheerio"

export default async (url) => {
    
    var data = await fetch('/api?url=' + encodeURIComponent(url)).then(res => res.json())
    console.log(data)
    
    const $ = cheerio.load(data);
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
        lyrics = '';
        $('div[class^="Lyrics__Container"]').each((i, elem) => {
            if ($(elem).text().length !== 0) {
                let snippet = $(elem)
                    .html()
                    .replace(/<br>/g, '\n')
                    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
                lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
            }
        });
    }
    if (!lyrics) return null;
    return lyrics.trim();
}