"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function AdminColecciones() {
  const supabase = getBrowserSupabase();
  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = new, object = edit
  const [form, setForm] = useState({ nombre: "", slug: "", descripcion: "", orden: 0 });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  async function load() {
    const { data } = await supabase.from("colecciones").select("*").order("orden");
    setColecciones(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing("new");
    setForm({ nombre: "", slug: "", descripcion: "", orden: colecciones.length + 1 });
    setMsg(null);
  }

  function openEdit(col) {
    setEditing(col.id);
    setForm({ nombre: col.nombre, slug: col.slug, descripcion: col.descripcion || "", orden: col.orden });
    setMsg(null);
  }

  function cancel() {
    setEditing(null);
    setMsg(null);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form };
    let result;
    if (editing === "new") {
      result = await supabase.from("colecciones").insert(payload).select().single();
    } else {
      result = await supabase.from("colecciones").update(payload).eq("id", editing).select().single();
    }

    if (result.error) {
      setMsg({ type: "error", text: result.error.message });
    } else {
      setMsg({ type: "success", text: editing === "new" ? "Colección creada" : "Colección actualizada" });
      setEditing(null);
      await load();
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta colección?")) return;
    await supabase.from("colecciones").delete().eq("id", id);
    await load();
    setMsg({ type: "success", text: "Colección eliminada" });
  }

  if (loading) return <p className="text-[var(--secondary)]">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[var(--primary)] serif">Colecciones</h2>
        <button onClick={openNew} className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-sm)] text-sm font-semibold hover:bg-[var(--whisper)] transition-colors">
          + Nueva colección
        </button>
      </div>

      {msg && (
        <div className={`mb-6 px-4 py-3 rounded-[var(--radius-sm)] text-sm ${msg.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
          {msg.text}
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--neutral)] text-left">
            <tr>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Nombre</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Slug</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Orden</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)] w-[120px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(0,0,0,0.04)]">
            {colecciones.map((col) => (
              <tr key={col.id} className="hover:bg-[rgba(0,0,0,0.01)]">
                <td className="px-6 py-4 font-medium text-[var(--primary)]">{col.nombre}</td>
                <td className="px-6 py-4 text-[var(--secondary)]">{col.slug}</td>
                <td className="px-6 py-4 text-[var(--secondary)]">{col.orden}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openEdit(col)} className="text-blue-600 hover:underline text-xs mr-3">Editar</button>
                  <button onClick={() => handleDelete(col.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
            {colecciones.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-[var(--secondary)]">No hay colecciones</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/New form */}
      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[var(--radius-md)] shadow-xl p-8 w-full max-w-[500px]">
            <h3 className="text-xl font-bold text-[var(--primary)] serif mb-6">
              {editing === "new" ? "Nueva colección" : "Editar colección"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Orden</label>
                <input type="number" value={form.orden} onChange={(e) => setForm({ ...form, orden: parseInt(e.target.value) || 0 })} className="w-24 px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-sm)] text-sm font-semibold hover:bg-[var(--whisper)] disabled:opacity-50">
                  {saving ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" onClick={cancel} className="px-6 py-2.5 border border-[rgba(0,0,0,0.12)] rounded-[var(--radius-sm)] text-sm font-medium">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
