import fs from "fs";
import path from "path";
import https from "https";
import { URL } from "url";

interface LinkItem {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  icon?: string;
}

interface Category {
  name: string;
  links: LinkItem[];
}

interface LinksJson {
  categories: Category[];
}

const linksPath = path.resolve(__dirname, "../public/links.json");
const iconsDir = path.resolve(__dirname, "../public/icons");

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const linksData: LinksJson = JSON.parse(fs.readFileSync(linksPath, "utf-8"));
const allLinks = linksData.categories.flatMap(c => c.links);

function downloadFavicon(domain: string, dest: string): Promise<void> {
  const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const filePath = path.join(iconsDir, dest);
      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

(async () => {
  const seen = new Set<string>();

  for (const link of allLinks) {
    const domain = new URL(link.url).hostname;
    const filename = `${domain}.png`;

    if (!seen.has(domain)) {
      seen.add(domain);
      await downloadFavicon(domain, filename);
    }

    link.icon = `/icons/${filename}`;
  }

  fs.writeFileSync(linksPath, JSON.stringify(linksData, null, 2), "utf-8");
  console.log("✅ Favicons downloaded and links.json updated.");
})();
