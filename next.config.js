const repoName = 'personal_homepage'; // 替换为你的仓库名

const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
