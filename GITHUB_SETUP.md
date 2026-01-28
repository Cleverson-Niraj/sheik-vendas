# 🚀 Guia: Criar Repositório GitHub - Sheik Vendas Marketplace

## 📋 Passo a Passo Completo

### 1️⃣ Instalar Git (Se ainda não tiver)

**Windows:**
- Baixe em: https://git-scm.com/download/win
- Instale com as opções padrão
- Reinicie o computador

### 2️⃣ Configurar Git

Abra o terminal/powershell e execute:
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@example.com"
```

### 3️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com
2. Faça login na sua conta
3. Clique em **"New repository"** ( verde no canto superior direito)
4. Configure:
   - **Repository name**: `sheik-vendas-marketplace`
   - **Description**: `Marketplace profissional com cadastro de produtos e WhatsApp integration`
   - **Visibility**: Public (ou Private se preferir)
   - **Add README**: ✅ Marque
   - **Add .gitignore**: Selecione "Node"
   - **Choose license**: MIT License

5. Clique em **"Create repository"**

### 4️⃣ Conectar Projeto Local ao GitHub

Abra o terminal na pasta do projeto (`c:/Users/cleev/Desktop/sheik`) e execute:

```bash
# Inicializar repositório Git
git init

# Adicionar arquivos
git add .

# Primeiro commit
git commit -m "🎉 Initial commit: Sheik Vendas Marketplace

✨ Features:
- Marketplace profissional com React
- Sistema de admin completo
- Cadastro de produtos com múltiplas imagens
- Integração com WhatsApp
- Painel administrativo
- Design responsivo e moderno"

# Conectar ao GitHub (substitua SEU_USERNAME)
git remote add origin https://github.com/SEU_USERNAME/sheik-vendas-marketplace.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

### 5️⃣ Arquivos Principais do Projeto

```
sheik/
├── README.md                 # Documentação do projeto
├── package.json             # Dependências do projeto
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
├── .env.local              # Variáveis de ambiente (API keys)
├── demo.html               # Versão demo do marketplace
├── admin-demo.html         # Demo do painel admin
├── src/
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   ├── types.ts           # Tipos TypeScript
│   ├── constants.ts       # Dados mockados
│   └── components/
│       ├── Header.tsx
│       ├── AdCard.tsx
│       ├── AdModal.tsx
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminCadastro.tsx
│       └── CategoryBar.tsx
└── node_modules/          # Dependências
```

### 6️⃣ Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Adicionar arquivos específicos
git add nome-do-arquivo.tsx

# Fazer commit
git commit -m "feat: adiciona nova funcionalidade"

# Enviar mudanças
git push

# Puxar mudanças do GitHub
git pull

# Ver histórico
git log --oneline
```

### 7️⃣ Estrutura de Commits Recomendada

Use mensagens de commit padronizadas:

```bash
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: mudanças de estilo
refactor: refatoração de código
test: adicionar testes
chore: mudanças de build/dependências
```

### 8️⃣ Deploy Automático (Opcional)

Para deploy automático, configure:
- **Vercel**: Conecte seu repositório GitHub
- **Netlify**: Importe do GitHub
- **GitHub Pages**: Ative nas configurações do repositório

### 9️⃣ Próximos Passos

Após criar o repositório:

1. **Configure o README.md** com informações detalhadas
2. **Adicione screenshots** do projeto
3. **Crie issues** para futuras melhorias
4. **Configure branches** para desenvolvimento (develop/main)
5. **Adicione GitHub Actions** para CI/CD

### 🔗 Links Úteis

- **Documentação Git**: https://git-scm.com/doc
- **Guia GitHub**: https://guides.github.com/
- **Markdown Guide**: https://www.markdownguide.org/

---

## 📝 Exemplo de README.md Completo

```markdown
# Sheik Vendas - Marketplace Profissional

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
</div>

## 🚀 Sobre o Projeto

Marketplace profissional desenvolvido em React com sistema administrativo completo para cadastro de produtos e integração direta com WhatsApp.

## ✨ Features

- 🛍️ **Catálogo de Produtos** com múltiplas imagens
- 👑 **Painel Administrativo** exclusivo
- 📱 **Integração WhatsApp** direta
- 🎨 **Design Responsivo** e moderno
- ⭐ **Produtos Destacados**
- 📸 **Upload de Imagens e Vídeos**
- 🔍 **Busca e Filtros**
- 💾 **Dados Persistentes** (localStorage)

## 🛠️ Tecnologias

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU_USERNAME/sheik-vendas-marketplace.git

# Entre na pasta
cd sheik-vendas-marketplace

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Inicie o desenvolvimento
npm run dev
```

## 🔐 Acesso Admin

- **URL**: `http://localhost:5173/admin`
- **Senha**: `admin123`

## 📱 Demonstração

- **Demo**: [Link para Vercel/Netlify]
- **Admin Demo**: [Link para painel]

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

**Desenvolvido com ❤️ por [Seu Nome]**
```

---

## 🎯 Resumo Rápido

1. **Instale Git** se não tiver
2. **Crie repositório** no GitHub
3. **Execute comandos Git** na pasta do projeto
4. **Envie código** para o GitHub
5. **Configure README** e documentação

Seu marketplace estará no GitHub e pronto para colaboração! 🚀
