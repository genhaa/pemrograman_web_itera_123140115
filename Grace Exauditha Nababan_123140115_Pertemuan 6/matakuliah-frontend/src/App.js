import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ id: '', kode_mk: '', nama_mk: '', sks: '', semester: '' });
  const API_URL = 'http://127.0.0.1:6543/api/matakuliah';

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.matakuliah) setData(json.matakuliah);
    } catch (err) { console.error("Server Pyramid mati, G!", err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setForm({ id: '', kode_mk: '', nama_mk: '', sks: '', semester: '' });
        fetchItems();
      }
    } catch (err) { alert("Failed to fetch! Pastikan Backend nyala ya G."); }
  };

  const deleteItem = async (id) => {
    if (window.confirm("Yakin mau hapus data Grace?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchItems();
      } catch (err) { alert("Gagal Hapus!"); }
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Management Matakuliah Grace (123140115)</h1>
      
      <div className="form-card">
        <form onSubmit={handleSubmit} className="input-group">
          <h3 style={{color: '#628141'}}>{form.id ? 'Edit Matakuliah' : 'Tambah Matakuliah'}</h3>
          <input placeholder="Kode MK" value={form.kode_mk} onChange={e => setForm({...form, kode_mk: e.target.value})} required />
          <input placeholder="Nama Matakuliah" value={form.nama_mk} onChange={e => setForm({...form, nama_mk: e.target.value})} required />
          <input placeholder="SKS" type="number" value={form.sks} onChange={e => setForm({...form, sks: e.target.value})} required />
          <input placeholder="Semester" type="number" value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} required />
          <button type="submit" className="btn-save">Simpan Perubahan</button>
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nama Matakuliah</th>
              <th>Kode MK</th>
              <th>SKS</th>
              <th>Semester</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map(mk => (
              <tr key={mk.id}>
                <td>{mk.nama_mk}</td>
                <td>{mk.kode_mk}</td>
                <td>{mk.sks}</td>
                <td>{mk.semester}</td>
                <td>
                  <button onClick={() => setForm(mk)} className="btn-edit">Edit</button>
                  <button onClick={() => deleteItem(mk.id)} className="btn-delete">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;