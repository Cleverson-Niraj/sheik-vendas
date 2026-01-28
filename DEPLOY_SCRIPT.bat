@echo off
echo ========================================
echo    Sheik Vendas - Git Setup Script
echo ========================================
echo.

echo [1/6] Verificando Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git nao encontrado! Por favor, instale o Git primeiro:
    echo    https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git encontrado!

echo.
echo [2/6] Configurando usuario Git...
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
echo ✅ Usuario configurado!

echo.
echo [3/6] Inicializando repositorio...
git init
echo ✅ Repositorio inicializado!

echo.
echo [4/6] Adicionando arquivos...
git add .
echo ✅ Arquivos adicionados!

echo.
echo [5/6] Criando commit inicial...
git commit -m "🎉 Initial commit: Sheik Vendas Marketplace

✨ Features:
- Marketplace profissional com React
- Sistema de admin completo
- Cadastro de produtos com multiplas imagens
- Integracao com WhatsApp
- Painel administrativo
- Design responsivo e moderno"
echo ✅ Commit criado!

echo.
echo [6/6] Conectando ao GitHub...
echo.
echo 🔑 AGORA VOCE PRECISA:
echo 1. Criar repositorio no GitHub: https://github.com/new
echo 2. Nome do repositorio: sheik-vendas-marketplace
echo 3. Copie a URL do repositorio (ex: https://github.com/SEU_USERNAME/sheik-vendas-marketplace.git)
echo 4. Cole a URL abaixo:
echo.
set /p github_url="URL do repositorio GitHub: "
echo.
git remote add origin %github_url%
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ SUCESSO! Seu projeto esta no GitHub!
    echo 🌐 Acesse: %github_url%
) else (
    echo.
    echo ❌ Erro ao fazer push. Verifique:
    echo    - Se a URL esta correta
    echo    - Se voce esta logado no GitHub
    echo    - Se o repositorio foi criado
)

echo.
echo ========================================
echo    Script concluido!
echo ========================================
pause
