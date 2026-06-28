# 💰 App PWA de Controle de Gastos

Um aplicativo web progressivo (PWA) simples e poderoso para controlar seus gastos pessoais com funcionalidade **offline completa**.

## ✨ Características

### ✅ PWA (Progressive Web App)
- **Funciona Offline**: Use completamente sem internet
- **Instalável no Celular**: Adicione à tela inicial como um app nativo
- **Sync em Background**: Sincroniza dados quando volta online
- **Cache Inteligente**: Carrega rapidamente com dados em cache

### 💸 Funcionalidades Principais
- **Adicionar Gastos**: Data, categoria, descrição e valor
- **8 Categorias Pré-definidas**: Alimentação, Transporte, Saúde, Educação, Lazer, Utilidades, Trabalho, Outro
- **Filtrar por Mês**: Veja gastos de qualquer período
- **Estatísticas**: Total, quantidade de gastos e ticket médio
- **Gráficos Visuais**:
  - Gastos por dia (gráfico de barras)
  - Gastos por categoria (gráfico de pizza)
- **Exportar Dados**: Baixe seus gastos em CSV
- **Deletar Gastos**: Remova gastos individuais ou todos os dados

## 📱 Como Instalar

### No Celular (Android)
1. Abra este app em um navegador (Chrome, Firefox, Edge)
2. Você verá uma opção de "Instalar" ou "Adicionar à tela inicial"
3. Toque em "Instalar"
4. Pronto! O app aparecerá na sua tela inicial como um ícone

### No Celular (iPhone/iOS)
1. Abra em Safari
2. Toque no botão de compartilhar (caixa com seta)
3. Role para baixo e toque "Adicionar à Tela Inicial"
4. Escolha um nome e toque "Adicionar"
5. O app será instalado na tela inicial

### No Computador
- Abra `index.html` em qualquer navegador moderno
- Use normalmente como um site

## 🗂️ Estrutura de Arquivos

```
├── index.html          # Arquivo principal (abra este no navegador)
├── sw.js              # Service Worker (cache e offline)
├── manifest.json      # Configuração do PWA
├── app-gastos.jsx     # Componente React (opcional)
└── README.md          # Este arquivo
```

## 🚀 Como Usar

### Adicionar um Gasto
1. Clique em "+ Novo gasto"
2. Preencha a data, categoria, descrição e valor
3. Clique em "Adicionar gasto"
4. Os dados são salvos automaticamente no celular

### Filtrar por Mês
1. Use o seletor "Filtrar mês" para escolher um período
2. Os gastos, gráficos e totais atualizam automaticamente

### Ver Estatísticas
- **Total do Mês**: Soma de todos os gastos
- **Número de Gastos**: Quantidade de registros
- **Ticket Médio**: Valor médio por gasto

### Exportar Dados
1. Filtre o mês desejado
2. Clique em "📥 Exportar CSV"
3. Um arquivo será baixado com seus gastos

### Modo Offline
- O app funciona **completamente sem internet**
- Todos os dados são salvos no celular
- Quando voltar online, o app sincroniza automaticamente

## 💾 Como os Dados São Salvos

Os dados são salvos usando **localStorage** do navegador, que:
- ✅ Persiste entre sessões
- ✅ Não requer servidor
- ✅ Funciona offline
- ✅ É seguro no seu dispositivo

**Limite**: Até ~5-10MB de dados (suficiente para milhares de gastos)

## ⚙️ Instalação para Desenvolvimento

Se quiser rodar o app localmente:

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js
npx http-server

# Opção 3: Live Server (VS Code)
# Instale a extensão "Live Server" e clique em "Go Live"
```

Depois acesse: `http://localhost:8000`

## 🔒 Privacidade e Segurança

- ✅ **Todos os dados ficam no seu celular** - nada é enviado para um servidor
- ✅ **Sem rastreamento** - sem analytics, cookies ou publicidades
- ✅ **Open Source** - você pode inspecionar todo o código

## 🌐 Compatibilidade

| Navegador | Desktop | Celular |
|-----------|---------|---------|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ (iOS 15.1+) |
| Edge | ✅ | ✅ |
| Opera | ✅ | ✅ |

## 📝 Exemplo de Uso

```
1. Abra o app
2. Adicione um gasto: R$ 50,00 em Alimentação - Almoço
3. Adicione outro: R$ 10,00 em Transporte - Uber
4. Veja o total: R$ 60,00
5. Filtre por categoria e veja a distribuição
6. Exporte para planilha se quiser
```

## 🎨 Personalizações

Para personalizar as cores:
1. Abra `manifest.json`
2. Mude o `theme_color` (cor principal)
3. Abra `index.html` e mude as cores nos estilos

Exemplo: `#667eea` é a cor roxa atual

## 🐛 Troubleshooting

### O app não funciona offline
- Certifique-se de ter aberto online pelo menos uma vez
- O Service Worker precisa ser registrado na primeira visita

### Os dados desapareceram
- Verifique se você não limpou o cache/cookies do navegador
- Se limpou, infelizmente não há recuperação (sempre faça backup!)

### Não consigo instalar
- Use Chrome, Firefox ou Edge (melhor suporte para PWA)
- Certifique-se de estar usando HTTPS (PWA requer em produção)

## 📊 Dicas de Uso

1. **Faça Backups**: Exporte seus dados regularmente em CSV
2. **Categorize bem**: Use categorias consistentes para análises melhores
3. **Acompanhe mensalmente**: Filtre por mês para ver tendências
4. **Mantenha atualizado**: Adicione gastos logo após realizá-los

## 🚀 Melhorias Futuras

- [ ] Gráfico de evolução ao longo do tempo
- [ ] Orçamentos mensais por categoria
- [ ] Notificações quando exceder limite
- [ ] Temas claro/escuro
- [ ] Sincronização com nuvem (opcional)
- [ ] Importar dados de CSV

## 📄 Licença

Este projeto é de uso livre e pessoal.

## 💬 Feedback

Se encontrar problemas ou tiver sugestões, você pode:
- Adicionar consoles.log nos arquivos
- Verificar a aba "Application" do DevTools (F12)
- Checar se o Service Worker está registrado

---

**Desenvolvido com ❤️ para ajudar você a controlar seus gastos!**

Versão: 1.0 | Última atualização: 2024