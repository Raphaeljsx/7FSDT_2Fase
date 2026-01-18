#!/bin/bash
# Script para fazer build e push da imagem para o Docker Hub
# Uso: ./docker-push.sh seu-usuario [tag] [image-name]

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Verificar argumentos
if [ -z "$1" ]; then
    echo -e "${RED}❌ Erro: Username do Docker Hub é obrigatório!${NC}"
    echo "Uso: ./docker-push.sh seu-usuario [tag] [image-name]"
    echo "Exemplo: ./docker-push.sh raphaelalves latest blogging-api"
    exit 1
fi

USERNAME=$1
TAG=${2:-latest}
IMAGE_NAME=${3:-blogging-api}
FULL_IMAGE_NAME="$USERNAME/$IMAGE_NAME:$TAG"

echo -e "${CYAN}🐳 Docker Hub Push Script${NC}"
echo -e "${CYAN}=========================${NC}"
echo ""

# Verificar se está logado
echo -e "${YELLOW}Verificando login no Docker Hub...${NC}"
if ! docker info 2>&1 | grep -q "Username"; then
    echo -e "${RED}⚠️  Você precisa fazer login no Docker Hub primeiro!${NC}"
    echo -e "${YELLOW}Execute: docker login${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Login verificado${NC}"
echo ""

# Build da imagem
echo -e "${YELLOW}🔨 Construindo a imagem: $FULL_IMAGE_NAME${NC}"
docker build -t $FULL_IMAGE_NAME .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao construir a imagem!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Imagem construída com sucesso!${NC}"
echo ""

# Push da imagem
echo -e "${YELLOW}📤 Enviando imagem para o Docker Hub...${NC}"
docker push $FULL_IMAGE_NAME

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao fazer push da imagem!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Sucesso! Imagem publicada no Docker Hub!${NC}"
echo -e "${CYAN}📍 URL: https://hub.docker.com/r/$USERNAME/$IMAGE_NAME${NC}"
echo ""
echo -e "${YELLOW}Para usar a imagem:${NC}"
echo -e "  docker pull $FULL_IMAGE_NAME"
