import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LinkItem {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

interface Category {
  name: string;
  links: LinkItem[];
}

interface Props {
  data: {
    categories: Category[];
  };
}

export default function Home({ data }: Props) {
  const [search, setSearch] = useState("");

  const filteredLinks = (category: Category) =>
    category.links.filter(link => {
      const q = search.toLowerCase();
      return (
        link.title.toLowerCase().includes(q) ||
        link.description?.toLowerCase().includes(q) ||
        link.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">我的导航页</h1>
      <Input
        placeholder="搜索链接..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6"
      />
      {data.categories.map(category => (
        <div key={category.name} className="mb-10">
          <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLinks(category).map(link => (
              <Card key={link.url}>
                <CardContent>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline"
                  >
                    <div className="font-medium text-lg">{link.title}</div>
                    <div className="text-sm text-gray-500 mb-1">{link.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {link.tags?.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "public", "links.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);

  return {
    props: { data },
  };
};
