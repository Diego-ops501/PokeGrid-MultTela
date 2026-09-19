'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');
const preload = fs.readFileSync(path.join(root, 'preload.js'), 'utf8');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const ivHelper = fs.readFileSync(path.join(root, 'presets', 'justpokedex.js'), 'utf8');

let checks = 0;
function ok(value, message) {
  if (!value) throw new Error('FALHOU: ' + message);
  checks++;
  console.log('OK  ', message);
}

console.log('\n--- Voz local e eventos anunciados ---');
ok(html.includes('new SpeechSynthesisUtterance(item.text)') && html.includes("u.lang = lang === 'en' ? 'en-US'"), 'usa a voz local do sistema e escolhe o idioma');
ok(html.includes("shinyAppear: `Apareceu um ${poke} shiny na conta ${conta}.`") && html.includes("shinySuccess: `O shiny ${poke} foi capturado com sucesso na conta ${conta}.`"), 'fala aparição e captura bem-sucedida com Pokémon e conta');
ok(html.includes("shinyFail: `A captura do shiny ${poke} falhou na conta ${conta}.`"), 'fala a falha final da captura de shiny');
ok(html.includes("ballsLow: `As Pokébolas estão acabando na conta ${conta}. Restam ${qtd}.`") && html.includes("healsLow: `As curas estão acabando na conta ${conta}. Restam ${qtd} poções.`"), 'fala suprimento, conta e quantidade restante');
ok(html.includes("!x.sh && +x.q >= 1.7 && +x.q < 2"), 'voz de raridade fica somente na faixa Lendária, sem duplicar shiny');
ok(html.includes("const fieldShiny=fs?") && html.includes("if (r.fieldShiny)"), 'detecção precoce lê o shiny vivo no campo');
ok(html.includes('if (voiceQueue.length >= 8) voiceQueue.shift()') && html.includes("now - voiceLast.t < 5000"), 'fila e deduplicação impedem avalanche de voz');

console.log('\n--- Calculadora de IV confiável e empacotada ---');
ok(main.includes("ipcMain.handle('iv-helper:read'") && main.includes("path.join(__dirname, 'presets', 'justpokedex.js')"), 'IPC lê somente o helper fixo de IV');
ok(preload.includes("readIvHelper: () => ipcRenderer.invoke('iv-helper:read')"), 'preload expõe apenas a leitura sem caminho ou URL');
ok(html.includes('async function injectIvHelper(wv)') && html.includes('injectIvHelper(wv); // somente o helper de IV auditado e empacotado'), 'helper volta a ser injetado nas páginas do jogo');
ok(html.includes("if (ivHelperBloqueado(url))") && html.includes("'/login', '/register', '/forgot-password', '/verify-email'"), 'helper nunca entra nas telas com credenciais');
ok(pkg.build.files.includes('presets/justpokedex.js'), 'instalador inclui o helper que a calculadora precisa');
ok(ivHelper.includes('window.__pgIv = {') && ivHelper.includes('async calc(entrada)'), 'helper contém a ponte de cálculo esperada');

console.log(`\nVoz e IV: ${checks} checks passaram`);
