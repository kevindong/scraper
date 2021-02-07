import * as fs from "fs-extra";
import fetch from "node-fetch";

function getSaveDirectory(): string {
    let saveDirectory = process.env.SAVE_DIRECTORY;
    if (!saveDirectory) {
        saveDirectory = 'saved_htmls';
    }
    return saveDirectory;
}

function getUrls(): any[] {
    const input = process.env.URLS;
    if (!input) {
        const msg = "URLS env var not present.";
        console.error(msg);
        throw new Error(msg);
    }
    return JSON.parse(input);
}

function getTimestampSuffix(): string {
    let now = new Date().toISOString();
    now = now.substring(0, now.indexOf('.'));
    now = now.replace(/:/g, "_");
    return now;
}

async function downloadPage(filePrefix: string, url: string): Promise<void> {
    let text: string = null;
    try {
        let response = await fetch(url, { timeout: 30000 });
        let pageContents = await response.text();
        text = pageContents;
    } catch (e) {
        console.error(e);
        text = e.toString();
    }
    filePrefix = filePrefix.replace(/ /g, '-');
    let fileName = `${getSaveDirectory()}/${filePrefix}_${getTimestampSuffix()}.html`;
    return fs.writeFile(fileName, text);
}

function maybeCreateDirectory() {
    if (!fs.existsSync(getSaveDirectory())) {
        fs.mkdirSync(getSaveDirectory());
    }
}

async function main() {
    maybeCreateDirectory();
    let pages = getUrls();

    await Promise.all(pages.map(page => downloadPage(page.name, page.url)));
}

main();