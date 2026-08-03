// Deploy automatico della cartella dist/ su FTP (Aruba, hosting condiviso).
// Uso:  npm run deploy
// Le credenziali vanno nel file .env (vedi .env.example). Non finiscono in git.

import { Client } from 'basic-ftp'
import 'dotenv/config'
import { existsSync } from 'node:fs'

const {
  FTP_HOST,
  FTP_USER,
  FTP_PASSWORD,
  FTP_REMOTE_DIR = '/',   // cartella di destinazione sul server (root del dominio)
  FTP_SECURE = 'false',   // "true" per FTPS esplicito, se Aruba lo supporta
  FTP_CLEAN = 'false',    // "true" per svuotare la cartella remota prima di caricare
} = process.env

const LOCAL_DIR = 'dist'

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  fail('Credenziali mancanti. Compila il file .env (host, utente, password).')
}
if (!existsSync(LOCAL_DIR)) {
  fail(`Cartella "${LOCAL_DIR}" non trovata. Esegui prima:  npm run build`)
}

const client = new Client(30_000)
client.ftp.verbose = false

try {
  console.log(`→ Connessione a ${FTP_HOST} come ${FTP_USER} ...`)
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === 'true',
    secureOptions: { rejectUnauthorized: false },
  })

  console.log(`→ Carico "${LOCAL_DIR}/" in "${FTP_REMOTE_DIR}" ...`)
  client.trackProgress((info) => {
    if (info.name) process.stdout.write(`   ${info.name}\r`)
  })
  // Su Aruba il login atterra già nella cartella web: entriamo in una
  // sottocartella solo se richiesto esplicitamente (diversa da "/" o vuota).
  const target = FTP_REMOTE_DIR.trim()
  if (target && target !== '/' && target !== '.') {
    await client.ensureDir(target)
  }
  if (FTP_CLEAN === 'true') {
    console.log('→ Svuoto la cartella remota ...')
    await client.clearWorkingDir()
  }
  await client.uploadFromDir(LOCAL_DIR)
  client.trackProgress()

  console.log('\n✔ Deploy completato.')
} catch (err) {
  fail(`Errore durante il deploy: ${err.message}`)
} finally {
  client.close()
}
