import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GastosApp = () => {
  const CATEGORIAS = ['Alimentação', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Utilidades', 'Trabalho', 'Outro'];
  const CORES = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#6B7280'];

  const [gastos, setGastos] = useState(() => {
    const saved = localStorage.getItem('gastos');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    data: new Date().toISOString().split('T')[0],
    categoria: 'Alimentação',
    descricao: '',
    valor: ''
  });

  const [mesFiltro, setMesFiltro] = useState(new Date().toISOString().slice(0, 7));
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const adicionarGasto = (e) => {
    e.preventDefault();
    if (!form.valor || !form.descricao) {
      alert('Preencha valor e descrição');
      return;
    }

    const novoGasto = {
      id: Date.now(),
      ...form,
      valor: parseFloat(form.valor)
    };

    setGastos([...gastos, novoGasto]);
    setForm({
      data: new Date().toISOString().split('T')[0],
      categoria: 'Alimentação',
      descricao: '',
      valor: ''
    });
    setMostrarFormulario(false);
  };

  const deletarGasto = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este gasto?')) {
      setGastos(gastos.filter(g => g.id !== id));
    }
  };

  const gastosFiltrados = gastos.filter(g => g.data.startsWith(mesFiltro));
  const totalMes = gastosFiltrados.reduce((sum, g) => sum + g.valor, 0);

  const dadosPorCategoria = CATEGORIAS.map(cat => ({
    name: cat,
    valor: gastosFiltrados.filter(g => g.categoria === cat).reduce((sum, g) => sum + g.valor, 0)
  })).filter(d => d.valor > 0);

  const dadosGrafico = gastosFiltrados.reduce((acc, g) => {
    const dia = new Date(g.data).getDate();
    const item = acc.find(a => a.dia === dia);
    if (item) {
      item.gasto += g.valor;
    } else {
      acc.push({ dia, gasto: g.valor });
    }
    return acc;
  }, []).sort((a, b) => a.dia - b.dia);

  const exportarDados = () => {
    const csv = 'Data,Categoria,Descrição,Valor\n' +
      gastos.map(g => `${g.data},${g.categoria},${g.descricao},${g.valor.toFixed(2)}`).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gastos-${mesFiltro}.csv`;
    a.click();
  };

  const resetarDados = () => {
    if (window.confirm('Tem certeza que deseja deletar TODOS os dados? Esta ação não pode ser desfeita.')) {
      setGastos([]);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; }
        body { background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; opacity: 0.9; }
        .container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e0e0e0; }
        .card h3 { margin-top: 0; color: #333; }
        .btn { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.3s; }
        .btn-primary { background: #667eea; color: white; }
        .btn-primary:hover { background: #5568d3; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #f0f0f0; color: #333; margin-right: 10px; }
        .btn-secondary:hover { background: #e0e0e0; }
        .btn-danger { background: #ef4444; color: white; padding: 8px 12px; font-size: 12px; }
        .btn-danger:hover { background: #dc2626; }
        .btn-small { padding: 8px 12px; font-size: 12px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 600; color: #333; font-size: 14px; }
        .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
        .stat-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; text-align: center; }
        .stat-box h4 { margin: 0 0 10px 0; font-size: 12px; opacity: 0.9; }
        .stat-box .value { font-size: 28px; font-weight: bold; }
        .gasto-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #667eea; }
        .gasto-info { flex: 1; }
        .gasto-categoria { display: inline-block; background: #e0e7ff; color: #667eea; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-right: 10px; }
        .gasto-desc { font-weight: 600; color: #333; margin-top: 5px; }
        .gasto-data { font-size: 12px; color: #999; margin-top: 3px; }
        .gasto-valor { font-size: 20px; font-weight: bold; color: #667eea; margin-right: 15px; }
        .lista-vazia { text-align: center; color: #999; padding: 40px 20px; }
        .filtro-mes { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }
        .filtro-mes input { flex: 1; max-width: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
        .chart-container { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 20px; border: 1px solid #e0e0e0; }
        .chart-container h3 { margin-top: 0; color: #333; }
        @media (max-width: 768px) {
          .container { grid-template-columns: 1fr; }
          .stats { grid-template-columns: 1fr; }
          .header h1 { font-size: 22px; }
          .filtro-mes { flex-direction: column; }
          .filtro-mes input { max-width: 100%; }
        }
        .formulario { animation: slideDown 0.3s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; }
        .tab { padding: 12px 20px; cursor: pointer; border: none; background: none; font-weight: 600; color: #999; border-bottom: 3px solid transparent; transition: all 0.3s; }
        .tab.active { color: #667eea; border-bottom-color: #667eea; }
      `}</style>

      <div className="header">
        <h1>💰 Controle de Gastos</h1>
        <p>Acompanhe seus gastos com inteligência</p>
      </div>

      <div className="stats">
        <div className="stat-box">
          <h4>Total este mês</h4>
          <div className="value">R$ {totalMes.toFixed(2)}</div>
        </div>
        <div className="stat-box">
          <h4>Número de gastos</h4>
          <div className="value">{gastosFiltrados.length}</div>
        </div>
        <div className="stat-box">
          <h4>Ticket médio</h4>
          <div className="value">R$ {gastosFiltrados.length > 0 ? (totalMes / gastosFiltrados.length).toFixed(2) : '0.00'}</div>
        </div>
      </div>

      {gastos.length > 0 && (
        <div className="container">
          <div className="chart-container">
            <h3>Gastos por dia</h3>
            {dadosGrafico.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                  <Bar dataKey="gasto" fill="#667eea" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>Sem dados para este mês</p>
            )}
          </div>

          <div className="chart-container">
            <h3>Gastos por categoria</h3>
            {dadosPorCategoria.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dadosPorCategoria} dataKey="valor" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {dadosPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CORES[CATEGORIAS.indexOf(entry.name)]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>Sem dados para este mês</p>
            )}
          </div>
        </div>
      )}

      <div className="card" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Adicionar novo gasto</h3>
          <button className="btn btn-primary btn-small" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            {mostrarFormulario ? '✕ Cancelar' : '+ Novo gasto'}
          </button>
        </div>

        {mostrarFormulario && (
          <div className="formulario">
            <form onSubmit={adicionarGasto}>
              <div className="form-group">
                <label>Data</label>
                <input
                  type="date"
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  >
                    {CATEGORIAS.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.valor}
                    onChange={(e) => setForm({ ...form, valor: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  placeholder="Ex: Almoço com amigos"
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Adicionar gasto
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Meus gastos</h3>
          <div className="filtro-mes">
            <label style={{ fontWeight: '600', whiteSpace: 'nowrap', marginTop: '5px' }}>Filtrar mês:</label>
            <input
              type="month"
              value={mesFiltro}
              onChange={(e) => setMesFiltro(e.target.value)}
            />
          </div>
        </div>

        {gastosFiltrados.length > 0 ? (
          <>
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e0e0e0' }}>
              {gastosFiltrados
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .map(gasto => (
                  <div key={gasto.id} className="gasto-item">
                    <div className="gasto-info">
                      <span className="gasto-categoria">{gasto.categoria}</span>
                      <div className="gasto-desc">{gasto.descricao}</div>
                      <div className="gasto-data">{new Date(gasto.data).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span className="gasto-valor">R$ {gasto.valor.toFixed(2)}</span>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletarGasto(gasto.id)}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={exportarDados}>
                📥 Exportar CSV
              </button>
              <button className="btn btn-danger" onClick={resetarDados}>
                🗑️ Deletar tudo
              </button>
            </div>
          </>
        ) : (
          <div className="lista-vazia">
            <p>Nenhum gasto registrado para este mês</p>
            <p style={{ fontSize: '12px' }}>Adicione um novo gasto para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GastosApp;