const repoName = 'personal_homepage'; // 替换为你的仓库名

const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: `/${repoName}`,
  },
};

module.exports = nextConfig;
