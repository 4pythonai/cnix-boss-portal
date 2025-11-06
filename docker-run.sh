#!/bin/bash

# Docker 运行 nginx 服务构建后的静态文件
# 使用当前项目的 build 目录

BUILD_DIR="$HOME/codebase/CNIX/cnix-boss-portal/build"
PORT=${1:-8080}

# 检查 build 目录是否存在
if [ ! -d "$BUILD_DIR" ]; then
    echo "错误: build 目录不存在: $BUILD_DIR"
    echo "请先运行 'npm run build' 构建项目"
    exit 1
fi

# 检查 index.html 是否存在
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo "错误: index.html 不存在: $BUILD_DIR/index.html"
    echo "请先运行 'npm run build' 构建项目"
    exit 1
fi

echo "正在启动 nginx 容器..."
echo "构建目录: $BUILD_DIR"
echo "访问地址: http://localhost:$PORT"

# 运行 nginx 容器
docker run -d \
  --name cnix-boss-portal-nginx \
  -p $PORT:80 \
  -v "$BUILD_DIR:/usr/share/nginx/html:ro" \
  --rm \
  nginx:latest

echo ""
echo "nginx 容器已启动！"
echo "停止容器: docker stop cnix-boss-portal-nginx"
echo "查看日志: docker logs -f cnix-boss-portal-nginx"

