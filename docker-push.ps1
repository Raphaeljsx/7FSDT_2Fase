# Script para fazer build e push da imagem para o Docker Hub
# Uso: .\docker-push.ps1 -username seu-usuario -tag latest

param(
    [Parameter(Mandatory=$true)]
    [string]$username,
    
    [Parameter(Mandatory=$false)]
    [string]$tag = "latest",
    
    [Parameter(Mandatory=$false)]
    [string]$imageName = "blogging-api"
)

$fullImageName = "$username/$imageName`:$tag"

Write-Host "🐳 Docker Hub Push Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está logado
Write-Host "Verificando login no Docker Hub..." -ForegroundColor Yellow
$loginCheck = docker info 2>&1 | Select-String "Username"
if (-not $loginCheck) {
    Write-Host "⚠️  Você precisa fazer login no Docker Hub primeiro!" -ForegroundColor Red
    Write-Host "Execute: docker login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Login verificado" -ForegroundColor Green
Write-Host ""

# Build da imagem
Write-Host "🔨 Construindo a imagem: $fullImageName" -ForegroundColor Yellow
docker build -t $fullImageName .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao construir a imagem!" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Imagem construída com sucesso!" -ForegroundColor Green
Write-Host ""

# Push da imagem
Write-Host "📤 Enviando imagem para o Docker Hub..." -ForegroundColor Yellow
docker push $fullImageName

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push da imagem!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Sucesso! Imagem publicada no Docker Hub!" -ForegroundColor Green
Write-Host "📍 URL: https://hub.docker.com/r/$username/$imageName" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para usar a imagem:" -ForegroundColor Yellow
Write-Host "  docker pull $fullImageName" -ForegroundColor White
