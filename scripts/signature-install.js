import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Generateur de brand-assets/signature-install.html, la page qui installe la
// signature mail.
//
// Pourquoi une page dediee plutot que "ouvre le fichier et selectionne tout" :
// coller une signature dans Gmail suppose de copier le rendu et non le code
// source, et la manoeuvre habituelle demande une souris. Cette page copie la
// signature au clavier, avec la mise en forme, en une touche.
//
// Elle est generee et non ecrite a la main, pour que la signature qu'elle
// copie soit toujours celle de brand-assets/email-signature.html. Une copie
// dupliquee a la main derive au premier changement, et Kevin collerait une
// signature perimee sans le voir.
//
//   node scripts/signature-install.js

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'brand-assets', 'email-signature.html');
const DST = path.join(ROOT, 'brand-assets', 'signature-install.html');

// Les commentaires du fichier source expliquent le HTML de mail. Ils n'ont
// rien a faire dans le presse-papier.
const signature = (await fs.readFile(SRC, 'utf8')).replace(/<!--[\s\S]*?-->/g, '').trim();

const page = `<!doctype html>
<html lang="fr">
<meta charset="utf-8" />
<title>Installer la signature KEVINGYM</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;500;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #000; color: #fff; min-height: 100vh; padding: 48px 24px;
    font-family: 'Geist', 'Helvetica Neue', Arial, sans-serif; font-weight: 300;
  }
  .wrap { max-width: 720px; margin: 0 auto; }
  .eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.24em;
             text-transform: uppercase; color: #52525b; }
  h1 { font-size: 34px; font-weight: 700; letter-spacing: -0.03em; margin-top: 14px; }

  /* L'appel a l'action est une zone au clavier, pas un bouton a cliquer : le
     pave tactile de la machine ne repond pas. */
  .key {
    margin-top: 32px; border: 1px solid rgba(255,255,255,0.14); border-radius: 18px;
    background: rgba(255,255,255,0.035); padding: 28px 30px; text-align: center;
  }
  .key strong { display: block; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; }
  .key span { display: block; margin-top: 8px; font-size: 13.5px; color: #a1a1aa; }
  kbd {
    display: inline-block; padding: 3px 12px; margin: 0 3px;
    border: 1px solid rgba(255,255,255,0.28); border-radius: 7px;
    font-family: inherit; font-weight: 600; font-size: 14px;
  }
  .key.done { border-color: #fff; background: rgba(255,255,255,0.10); }
  .key.fail { border-color: #b45309; }

  ol { margin-top: 34px; padding-left: 22px; }
  li { font-size: 14.5px; line-height: 1.7; color: #a1a1aa; margin-bottom: 10px; }
  li b { color: #fff; font-weight: 600; }

  .preview-label { margin-top: 40px; }
  /* Fond blanc : c'est le contexte reel, le bas d'un fil de discussion. */
  .preview { margin-top: 14px; background: #fff; border-radius: 14px; padding: 26px; }

  .note { margin-top: 30px; font-size: 12.5px; line-height: 1.65; color: #52525b; }
</style>

<div class="wrap">
  <div class="eyebrow">KEVINGYM</div>
  <h1>Installer la signature</h1>

  <div class="key" id="key">
    <strong>Appuie sur <kbd>Espace</kbd></strong>
    <span>La signature part dans le presse-papier, avec sa mise en forme. Aucune souris necessaire.</span>
  </div>

  <ol>
    <li>Appuie sur <b>Espace</b> ci-dessus.</li>
    <li>Va dans Gmail, roue crantee en haut a droite, <b>Voir tous les parametres</b>.</li>
    <li>Onglet <b>General</b>, descends jusqu'a <b>Signature</b>, puis <b>Creer</b>.</li>
    <li>Clique dans le grand cadre et fais <b>Ctrl+V</b>.</li>
    <li>Juste en dessous, mets cette signature par defaut pour les <b>nouveaux messages</b> et pour les <b>reponses</b>.</li>
    <li>Tout en bas de la page : <b>Enregistrer les modifications</b>. Gmail ne sauvegarde pas tout seul.</li>
  </ol>

  <div class="eyebrow preview-label">Apercu, tel qu'il arrivera</div>
  <div class="preview"><div id="sig">${signature}</div></div>

  <p class="note">
    Envoie-toi un mail de test et ouvre-le sur ton telephone. C'est le seul vrai controle.
    L'appli Gmail mobile ne recupere pas cette signature : elle a la sienne, en texte brut.
  </p>
</div>

<script>
  const key = document.getElementById('key');

  // execCommand est deprecie mais reste le seul chemin fiable depuis un
  // fichier local : il copie la selection avec sa mise en forme, la ou
  // navigator.clipboard est souvent refuse sur file://. On tente l'API
  // moderne d'abord, et on retombe dessus.
  async function copySignature() {
    const node = document.getElementById('sig');
    try {
      const item = new ClipboardItem({
        'text/html': new Blob([node.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([node.innerText], { type: 'text/plain' }),
      });
      await navigator.clipboard.write([item]);
      return true;
    } catch (e) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      const ok = document.execCommand('copy');
      sel.removeAllRanges();
      return ok;
    }
  }

  document.addEventListener('keydown', async (e) => {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault();
    const ok = await copySignature();
    key.className = ok ? 'key done' : 'key fail';
    key.innerHTML = ok
      ? '<strong>Copie.</strong><span>Va dans Gmail et fais Ctrl+V dans le cadre Signature.</span>'
      : '<strong>La copie a echoue.</strong><span>Fais Ctrl+A puis Ctrl+C sur cette page, ca marche aussi.</span>';
  });
</script>
</html>
`;

await fs.writeFile(DST, page, 'utf8');
console.log('signature-install: brand-assets/signature-install.html ecrit');
console.log('  ouvrir ce fichier, appuyer sur Espace, coller dans Gmail');
