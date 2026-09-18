const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const main = read('main.js');
const preload = read('preload.js');
const html = read('index.html');
const pkg = JSON.parse(read('package.json'));
const update = read('src/main/update-manager.js');
let failed = false;
const ok = (condition, label) => { console.log((condition ? 'OK  ' : 'FAIL') + ' ' + label); if (!condition) failed = true; };

console.log('\n--- PokeGrid MultTela: limites e segurança ---');
ok(main.includes('const MAX_ACCOUNTS = 4;') && main.includes('.slice(0, MAX_ACCOUNTS)'), 'cofre limita os dados a quatro contas');
ok(html.includes('Math.min(4, Math.max(1, +lsGet(\'count\') || 4))'), 'renderer limita a grade a quatro contas');
ok(!main.includes("JSON.parse(buf.toString('utf8'))"), 'credenciais não têm fallback em texto puro');
ok(main.includes('safeStorage.encryptString(json)') && main.includes("fs.renameSync(f + '.tmp', f)"), 'cofre usa criptografia e troca atômica');
ok(main.includes('contextIsolation: true') && main.includes('sandbox: true') && main.includes('nodeIntegration: false'), 'janelas locais usam isolamento, sandbox e sem Node');
ok(main.includes("origin !== GAME") && main.includes("target.getType() !== 'webview'"), 'screenshot só aceita webview do jogo');
ok(!main.includes("ipcMain.handle('userscript:fetch'") && !preload.includes('fetchUserScript'), 'não existe canal de userscript');

console.log('\n--- Compra, retorno e recursos locais ---');
ok(html.includes('let compraEmAndamento = false;') && html.includes('goldTem < custo'), 'compra bloqueia duplicidade e saldo insuficiente');
ok(html.includes('Number.isSafeInteger(ballId)') && html.includes('qtd > 10000'), 'compra valida identificador, quantidade e custo');
ok(html.includes("let voltaHuntOn = lsGet('voltaHunt') === '1'"), 'retorno à hunt continua desligado por padrão');
ok(html.includes("n>=3") && html.includes("},12000)"), 'retorno mantém três tentativas espaçadas');
ok(main.includes("ipcMain.handle('overlay:toggle'") && html.includes('id="overlayBtn"'), 'overlay somente-leitura disponível');
ok(main.includes("ipcMain.handle('shiny:capture'") && html.includes("let shotShinyOn = lsGet('shotShiny') === '1'"), 'print de shiny é opcional e local');

console.log('\n--- Instalador e atualização ---');
ok(pkg.name === 'pokegrid-multtela' && pkg.version === '1.0.0', 'produto personalizado começa em v1.0.0');
ok(pkg.build && pkg.build.win && pkg.build.nsis && pkg.build.nsis.deleteAppDataOnUninstall === false, 'instalador NSIS preserva dados');
ok(pkg.dependencies['electron-updater'] && pkg.devDependencies['electron-builder'], 'dependências de build e update declaradas');
ok(update.includes('autoDownload = false') && update.includes('autoInstallOnAppQuit = false'), 'atualização nunca baixa ou instala silenciosamente');
ok(update.includes("feed.protocol !== 'https:'") && update.includes("feed.hostname !== 'github.com'"), 'feed de atualização tem lista de origem restrita');
ok(update.includes("ipcMain.handle('update:download'") && update.includes("ipcMain.handle('update:install'"), 'download e instalação exigem ações separadas');
ok(update.includes('24 * 60 * 60 * 1000') && update.includes('checkAutomatic'), 'checagem automática é limitada a uma vez por dia');

if (failed) { console.error('\nFALHOU'); process.exit(1); }
console.log('\nTODOS PASSARAM');
