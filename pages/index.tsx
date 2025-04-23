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
  icon?: string;
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
  const [activeCategory, setActiveCategory] = useState(data.categories[0]?.name || "");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // 新增：监听search变化，实现全局搜索自动切tab
  useEffect(() => {
    if (!search) {
      setActiveCategory(data.categories[0]?.name || "");
      return;
    }
    const q = search.toLowerCase();
    for (const cat of data.categories) {
      const hasMatch = cat.links.some(link =>
        link.title.toLowerCase().includes(q) ||
        link.description?.toLowerCase().includes(q) ||
        link.tags?.some(tag => tag.toLowerCase().includes(q))
      );
      if (hasMatch) {
        setActiveCategory(cat.name);
        break;
      }
    }
  }, [search, data.categories]);

  // 获取当前激活分类对象
  const currentCategory = data.categories.find(cat => cat.name === activeCategory) || data.categories[0];

  // 获取当前分类下所有标签（去重）
  const allTags = Array.from(
    new Set(currentCategory.links.flatMap(link => link.tags || []))
  );

  // 过滤逻辑：分类、标签、搜索
  const filteredLinks = currentCategory.links.filter(link => {
    const q = search.toLowerCase();
    const matchSearch =
      link.title.toLowerCase().includes(q) ||
      link.description?.toLowerCase().includes(q) ||
      link.tags?.some(tag => tag.toLowerCase().includes(q));
    const matchTag = activeTag ? link.tags?.includes(activeTag) : true;
    return matchSearch && matchTag;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">我的导航页</h1>
      {/* 分类 Tab 切换 */}
      <div className="flex gap-2 mb-4">
        {data.categories.map(category => (
          <button
            key={category.name}
            className={`px-4 py-2 rounded-lg font-medium transition border border-transparent ${
              activeCategory === category.name
                ? "bg-blue-500 text-white shadow"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
            onClick={() => {
              setActiveCategory(category.name);
              setActiveTag(null); // 切换分类时重置标签过滤
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <Input
        placeholder="搜索链接..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-6"
      />
      {/* 标签过滤器 */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                activeTag === tag
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-100"
              }`}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
      {/* 当前分类下的链接卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLinks.map(link => (
          <Card key={link.url}>
            <CardContent>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
              >
                <div className="flex items-center gap-2 font-medium text-lg">
                  {link.icon && (
                    <img
                      src={basePath + link.icon}
                      alt="icon"
                      className="w-5 h-5 rounded"
                      style={{ minWidth: 20 }}
                    />
                  )}
                  {link.title}
                </div>
                <div className="text-sm text-gray-500 mb-1">{link.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {link.tags?.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded ${
                        activeTag === tag
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.preventDefault();
                        setActiveTag(activeTag === tag ? null : tag);
                      }}
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
      {filteredLinks.length === 0 && (
        <div className="text-gray-400 text-center py-10">暂无符合条件的链接</div>
      )}
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
