// api/server.js
// API de resultados para el panel (independiente de Forms)

const express = require('express');
const multer = require('multer');
const Database = require('better-sqlite3');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Base SQLite (se crea automáticamente)
const db = new Database(path.join(__dirname, 'results.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    cuestionario TEXT NOT NULL,
    aciertos INTEGER NOT NULL,
    puntos INTEGER NOT NULL,
    fecha_hora TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  );
`);

const upload = multer();

// Mapeamos IDs antiguos → nombres normales
const FIELD_MAP = {
  'rf01a18cc054f44dd84d73f76b3c6810f': 'nombre',
  'rc6bf3a21d86842518d65daed218afaf5': 'cuestionario',
  'rc3d9c564eafa44f5a172beac5243902f': 'aciertos',
  'r4ed2d12d0d9c412d94fc49d52057426d': 'puntos',
  'r28d95b8810384a15ba1172f72c59bb2f': 'fechaHora'
};

const ALT_NAMES = {
  nombre: 'nombre',
  cuestionario: 'cuestionario',
  aciertos: 'aciertos',
  puntos: 'puntos',
  fechaHora: 'fechaHora'
};

function normaliza(obj) {
  const out = {};
  for (const k in FIELD_MAP) {
    if (obj[k] !== undefined) out[FIELD_MAP[k]] = obj[k];
  }
  for (const k in ALT_NAMES) {
    if (obj[k] !== undefined) out[ALT_NAMES[k]] = obj[k];
  }
  return out;
}

// Recibir datos
app.post('/api/resultados', upload.none(), (req, res) => {
  const data = normaliza(req.body);

  if (!data.nombre || !data.cuestionario) {
    return res.status(400).json({ ok:false, error:'Faltan campos' });
  }

  const ac = parseInt(data.aciertos || 0, 10);
  const pt = parseInt(data.puntos || 0, 10);
  const fh = data.fechaHora || new Date().toLocaleString();

  db.prepare(`
    INSERT INTO results (nombre, cuestionario, aciertos, puntos, fecha_hora)
    VALUES (?, ?, ?, ?, ?)
  `).run(data.nombre, data.cuestionario, ac, pt, fh);

  return res.json({ ok:true });
});

// Listar últimos resultados
app.get('/api/resultados', (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM results ORDER BY created_at DESC LIMIT 1000
  `).all();
  res.json(rows);
});

// Resumen y estadísticas
app.get('/api/resumen', (req, res) => {
  const tot = db.prepare(`SELECT COUNT(*) c FROM results`).get().c;
  const mp  = db.prepare(`SELECT AVG(puntos) m FROM results`).get().m || 0;
  const ma  = db.prepare(`SELECT AVG(aciertos) m FROM results`).get().m || 0;

  const porQuiz = db.prepare(`
    SELECT cuestionario,
           COUNT(*) intentos,
           ROUND(AVG(puntos),1) media_pts,
           ROUND(AVG(aciertos),1) media_ac
    FROM results
    GROUP BY cuestionario
  `).all();

  const ranking = db.prepare(`
    SELECT nombre,
           COUNT(*) intentos,
           ROUND(AVG(puntos),1) media_pts,
           ROUND(AVG(aciertos),1) media_ac
    FROM results
    GROUP BY nombre
    ORDER BY media_pts DESC
    LIMIT 20
  `).all();

  res.json({
    totales: tot,
    media_puntos: Number(mp.toFixed(1)),
    media_aciertos: Number(ma.toFixed(1)),
    por_quiz: porQuiz,
    ranking
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("API lista en http://localhost:" + PORT);
});

