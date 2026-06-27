"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function AdminPiezas() {
  const supabase = getBrowserSupabase();
  const [piezas, setPiezas] = useState([]);
  const [colecciones, setColecciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ titulo: "", descripcion: "", precio: "", coleccion_id: "", tipo: "normal", imagenes: [], dimensiones: "", tecnica: "", disponible: true, destacado: false });
  const [gamas, setGamas] = useState([{ tipo: "subconsciente", emoji: "", descripcion: "", precio: "" }, { tipo: "real", emoji: "", descripcion: "", precio: "" }]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  async function load() {
    const [{ data: colData }, { data: pData }] = await Promise.all([
      supabase.from("colecciones").select("*").order("orden"),
      supabase.from("piezas").select("*, colecciones(nombre), gamas(*)").order("created_at", { ascending: false }),
    ]);
    setColecciones(colData || []);
    setPiezas(pData || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing("new");
    setForm({ titulo: "", descripcion: "", precio: "", coleccion_id: colecciones[0]?.id || "", tipo: "normal", imagenes: [], dimensiones: "", tecnica: "", disponible: true, destacado: false });
    setGamas([{ tipo: "subconsciente", emoji: "", descripcion: "", precio: "" }, { tipo: "real", emoji: "", descripcion: "", precio: "" }]);
    setImagePreview(null);
    setMsg(null);
  }

  function openEdit(pieza) {
    setEditing(pieza.id);
    setForm({
      titulo: pieza.titulo, descripcion: pieza.descripcion || "", precio: pieza.precio ? (pieza.precio / 100).toFixed(2) : "",
      coleccion_id: pieza.coleccion_id || "", tipo: pieza.tipo || "normal",
      imagenes: pieza.imagenes || [], dimensiones: pieza.dimensiones || "",
      tecnica: pieza.tecnica || "", disponible: pieza.disponible, destacado: pieza.destacado || false,
    });
    if (pieza.tipo === "animal_de_poder" && pieza.gamas?.length) {
      const sub = pieza.gamas.find((g) => g.tipo === "subconsciente") || {};
      const real = pieza.gamas.find((g) => g.tipo === "real") || {};
      setGamas([
        { tipo: "subconsciente", emoji: sub.emoji || "", descripcion: sub.descripcion || "", precio: sub.precio ? (sub.precio / 100).toFixed(2) : "" },
        { tipo: "real", emoji: real.emoji || "", descripcion: real.descripcion || "", precio: real.precio ? (real.precio / 100).toFixed(2) : "" },
      ]);
    } else {
      setGamas([{ tipo: "subconsciente", emoji: "", descripcion: "", precio: "" }, { tipo: "real", emoji: "", descripcion: "", precio: "" }]);
    }
    setImagePreview(null);
    setMsg(null);
  }

  function cancel() { setEditing(null); setMsg(null); }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from("piezas").upload(fileName, file);
    if (error) {
      setMsg({ type: "error", text: "Error al subir imagen: " + error.message });
    } else {
      const { data: urlData } = supabase.storage.from("piezas").getPublicUrl(fileName);
      setForm({ ...form, imagenes: [...form.imagenes, urlData.publicUrl] });
      setImagePreview(urlData.publicUrl);
    }
    setUploading(false);
  }

  function removeImage(index) {
    setForm({ ...form, imagenes: form.imagenes.filter((_, i) => i !== index) });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = { ...form };
    if (payload.precio) payload.precio = Math.round(parseFloat(payload.precio) * 100);
    if (!payload.coleccion_id) payload.coleccion_id = null;

    let result;
    if (editing === "new") {
      result = await supabase.from("piezas").insert(payload).select().single();
    } else {
      result = await supabase.from("piezas").update(payload).eq("id", editing).select().single();
    }

    if (result.error) {
      setMsg({ type: "error", text: result.error.message });
      setSaving(false);
      return;
    }

    // Save gamas if animal_de_poder
    if (form.tipo === "animal_de_poder" && result.data) {
      const piezaId = result.data.id;

      // Delete existing gamas
      await supabase.from("gamas").delete().eq("pieza_id", piezaId);

      // Insert new gamas
      const gamasToInsert = gamas
        .filter((g) => g.descripcion || g.emoji)
        .map((g) => ({ pieza_id: piezaId, tipo: g.tipo, emoji: g.emoji || null, descripcion: g.descripcion || null, precio: g.precio ? Math.round(parseFloat(g.precio) * 100) : null }));

      if (gamasToInsert.length > 0) {
        await supabase.from("gamas").insert(gamasToInsert);
      }
    }

    setMsg({ type: "success", text: editing === "new" ? "Pieza creada" : "Pieza actualizada" });
    setEditing(null);
    await load();
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta pieza?")) return;
    await supabase.from("piezas").delete().eq("id", id);
    await load();
    setMsg({ type: "success", text: "Pieza eliminada" });
  }

  if (loading) return <p className="text-[var(--secondary)]">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[var(--primary)] serif">Piezas</h2>
        <button onClick={openNew} className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-[var(--radius-sm)] text-sm font-semibold hover:bg-[var(--whisper)] transition-colors">
          + Nueva pieza
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
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Título</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Colección</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Tipo</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Precio</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)]">Estado</th>
              <th className="px-6 py-3 font-semibold text-[var(--secondary)] w-[120px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(0,0,0,0.04)]">
            {piezas.map((pieza) => (
              <tr key={pieza.id} className="hover:bg-[rgba(0,0,0,0.01)]">
                <td className="px-6 py-4 font-medium text-[var(--primary)]">{pieza.titulo}</td>
                <td className="px-6 py-4 text-[var(--secondary)]">{pieza.colecciones?.nombre || "—"}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${pieza.tipo === "animal_de_poder" ? "bg-[var(--mystical-tint)] text-[var(--mystical)]" : "bg-gray-100 text-gray-600"}`}>
                    {pieza.tipo === "animal_de_poder" ? "Animal de Poder" : "Normal"}
                  </span>
                </td>
                <td className="px-6 py-4 text-[var(--secondary)]">{pieza.precio ? `${(pieza.precio / 100).toFixed(2).replace(".", ",")}€` : "—"}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${pieza.disponible ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {pieza.disponible ? "Disponible" : "Vendido"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => openEdit(pieza)} className="text-blue-600 hover:underline text-xs mr-3">Editar</button>
                  <button onClick={() => handleDelete(pieza.id)} className="text-red-600 hover:underline text-xs">Eliminar</button>
                </td>
              </tr>
            ))}
            {piezas.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-[var(--secondary)]">No hay piezas</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/New modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 p-4 overflow-y-auto pt-10 pb-10">
          <div className="bg-white rounded-[var(--radius-md)] shadow-xl p-8 w-full max-w-[600px]">
            <h3 className="text-xl font-bold text-[var(--primary)] serif mb-6">
              {editing === "new" ? "Nueva pieza" : "Editar pieza"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Título *</label>
                  <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Colección</label>
                  <select value={form.coleccion_id} onChange={(e) => setForm({ ...form, coleccion_id: e.target.value })} className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]">
                    <option value="">— Sin colección —</option>
                    {colecciones.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Precio (€)</label>
                  <input type="number" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]">
                    <option value="normal">Normal</option>
                    <option value="animal_de_poder">Animal de Poder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dimensiones</label>
                  <input value={form.dimensiones} onChange={(e) => setForm({ ...form, dimensiones: e.target.value })} placeholder="Ej: 15×20 cm" className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Técnica</label>
                <input value={form.tecnica} onChange={(e) => setForm({ ...form, tecnica: e.target.value })} placeholder="Ej: Acuarela con tintes naturales" className="w-full px-3 py-2 border rounded-[var(--radius-sm)] text-sm focus:outline-none focus:border-[var(--primary)]" />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium mb-1">Imágenes</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="text-sm" />
                {uploading && <p className="text-xs text-[var(--secondary)] mt-1">Subiendo...</p>}
                {form.imagenes.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {form.imagenes.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="" className="w-20 h-20 object-cover rounded-[var(--radius-sm)] border" />
                        <button type="button" onClick={() => removeImage(i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.disponible} onChange={(e) => setForm({ ...form, disponible: e.target.checked })} />
                  Disponible
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.destacado} onChange={(e) => setForm({ ...form, destacado: e.target.checked })} />
                  Destacado
                </label>
              </div>

              {/* Gamas (only for animal_de_poder) */}
              {form.tipo === "animal_de_poder" && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-bold text-[var(--primary)] mb-4">Gamas (Animal de Poder)</h4>
                  {gamas.map((gama, i) => (
                    <div key={gama.tipo} className="mb-4 p-4 bg-[var(--neutral)] rounded-[var(--radius-sm)]">
                      <p className="text-xs font-bold uppercase text-[var(--secondary)] mb-2">{gama.tipo === "subconsciente" ? "🧠 Subconsciente" : "👁️ Real"}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs mb-1">Emoji</label>
                          <input value={gama.emoji} onChange={(e) => { const n = [...gamas]; n[i].emoji = e.target.value; setGamas(n); }} className="w-full px-2 py-1.5 border rounded-[var(--radius-sm)] text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Precio (€)</label>
                          <input type="number" step="0.01" value={gama.precio} onChange={(e) => { const n = [...gamas]; n[i].precio = e.target.value; setGamas(n); }} className="w-full px-2 py-1.5 border rounded-[var(--radius-sm)] text-sm" />
                        </div>
                        <div />
                      </div>
                      <div className="mt-2">
                        <label className="block text-xs mb-1">Descripción</label>
                        <input value={gama.descripcion} onChange={(e) => { const n = [...gamas]; n[i].descripcion = e.target.value; setGamas(n); }} className="w-full px-2 py-1.5 border rounded-[var(--radius-sm)] text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

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
