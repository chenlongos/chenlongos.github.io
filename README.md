# ChenlongOS 项目

## 项目简介

ChenlongOS 是一个基于 Zola 框架构建的静态网站项目，用于展示 ChenlongOS 相关的技术内容、新闻动态和资源信息。网站采用现代化的设计风格，提供了清晰的导航结构和丰富的内容展示。

## 技术架构

### 核心技术栈
- **Zola**：静态网站生成器，基于 Rust 语言开发
- **Bulma**：现代化的 CSS 框架，提供响应式设计
- **Markdown**：内容编写格式
- **Sass**：CSS 预处理器
- **GitHub Actions**：自动化部署流程

### 项目结构

```
chenlongos.github.io/
├── .github/              # GitHub 配置文件
│   └── workflows/        # GitHub Actions 工作流
├── content/              # 网站内容
│   ├── news/             # 新闻文章
│   ├── resources/        # 资源文件
│   ├── workshop/         # 工作坊相关内容
│   └── _index.md         # 首页内容
├── ext/                  # 外部依赖
│   └── bulma/            # Bulma CSS 框架
├── .gitignore            # Git 忽略文件
├── .gitmodules           # Git 子模块配置
├── config.toml           # Zola 配置文件
└── README.md             # 项目说明文件
```

## 启动和部署

### 本地开发

1. **安装 Zola**
   - 访问 [Zola 官方网站](https://www.getzola.org/) 下载并安装适合您操作系统的版本
   - 或者使用包管理器安装，例如：
     - macOS: `brew install zola`
     - Linux: 参考官方文档的安装指南

2. **克隆项目**
   ```bash
   git clone https://github.com/chenlongos/chenlongos.github.io.git
   cd chenlongos.github.io
   git submodule update --init --recursive // 初始化并更新子模块
   ```

3. **启动本地服务器**
   ```bash
   zola serve
   ```
   然后在浏览器中访问 `http://localhost:1111` 查看网站

### 部署

项目使用 GitHub Actions 进行自动化部署，配置文件位于 `.github/workflows/main.yml`。当代码推送到 `main` 分支时，GitHub Actions 会自动构建并部署网站到 GitHub Pages。

## 内容管理

### 添加新内容

1. **添加新闻文章**：在 `content/news/` 目录下创建新的 Markdown 文件，文件名格式为 `YYYY-MM-DD-标题.md`

2. **添加资源**：在 `content/resources/` 目录下添加相关资源

3. **修改导航栏**：在 `config.toml` 文件中的 `[extra.navbar]` 部分修改导航栏链接

4. **修改页脚**：在 `config.toml` 文件中的 `[extra.footers]` 部分修改页脚链接

## 自定义主题

项目使用 Bulma CSS 框架进行样式设计，您可以通过修改 Sass 文件来自定义主题。Sass 文件会在构建过程中自动编译。

