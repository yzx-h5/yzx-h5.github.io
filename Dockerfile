# 使用 Node.js 官方镜像作为基础镜像
FROM node:18.17.1 as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖项
COPY package*.json ./

# ARG npm_registry=https://registry.npmjs.org/
# RUN npm config set registry ${npm_registry}
RUN npm install -g npm@10.5.0
RUN npm install

# 复制项目文件
COPY . .

# 打包 React 应用程序
RUN npm run build

# 使用 Nginx 作为基础镜像来运行 React 应用程序
FROM nginx:latest

# 复制打包后的 React 应用程序到 Nginx 默认的静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 Nginx 默认端口
EXPOSE 80

# 容器启动时自动启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]