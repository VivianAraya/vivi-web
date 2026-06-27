const { Client } = require('pg');
const fs = require('fs');
const pw = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!pw) { console.error('Falta SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
const sql = fs.readFileSync(__dirname + '/../supabase/migrations/003_visitas.sql', 'utf8');
const connStr = 'postgresql://postgres:***@db.kspjffnjrtctipoxrrxn.supabase.co:5432/postgres?sslmode=require';
async function main() {
  const client = new Client({ connectionString: connStr });
  await client.connect();
  console.log('OK Conectado');
  await client.query(sql);
  console.log('OK Migracion 003 ejecutada');
  await client.end();
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
