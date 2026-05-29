// Caminho: src/main/resources/static/app.js
const baseUrl = '/veiculos';

async function fetchVeiculos(params = {}) {
  const url = new URL(window.location.origin + baseUrl);
  Object.keys(params).forEach(k => params[k] ? url.searchParams.append(k, params[k]) : null);
  const res = await fetch(url);
  return res.json();
}

async function listVeiculos(filters) {
  const tbody = document.querySelector('#veiculos-table tbody');
  tbody.innerHTML = '<tr><td colspan="9">Carregando...</td></tr>';
  try {
    const veiculos = await fetchVeiculos(filters);
    if (!Array.isArray(veiculos)) {
      tbody.innerHTML = '<tr><td colspan="9">Nenhum veículo encontrado</td></tr>';
      return;
    }
    tbody.innerHTML = '';
    veiculos.forEach(v => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.id}</td>
        <td>${v.marca}</td>
        <td>${v.modelo}</td>
        <td>${v.anoFabricacao || ''}</td>
        <td>${v.cor || ''}</td>
        <td>${v.preco != null ? v.preco.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}) : ''}</td>
        <td>${v.quilometragem != null ? v.quilometragem : ''}</td>
        <td>${v.status || ''}</td>
        <td>
          <button data-id="${v.id}" class="edit-btn">Editar</button>
          <button data-id="${v.id}" class="delete-btn">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="9">Erro ao carregar veículos</td></tr>';
    console.error(err);
  }
}

async function createVeiculo(data) {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Falha ao criar veículo');
  return res.json();
}

async function updateVeiculo(id, data) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Falha ao atualizar veículo');
  return res.json();
}

async function deleteVeiculo(id) {
  const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Falha ao deletar veículo');
}

function readForm() {
  return {
    marca: document.getElementById('marca').value.trim(),
    modelo: document.getElementById('modelo').value.trim(),
    anoFabricacao: parseInt(document.getElementById('anoFabricacao').value) || null,
    cor: document.getElementById('cor').value.trim(),
    preco: parseFloat(document.getElementById('preco').value) || null,
    quilometragem: parseInt(document.getElementById('quilometragem').value) || null,
    status: document.getElementById('status').value
  };
}

function fillForm(v) {
  document.getElementById('veiculo-id').value = v.id || '';
  document.getElementById('marca').value = v.marca || '';
  document.getElementById('modelo').value = v.modelo || '';
  document.getElementById('anoFabricacao').value = v.anoFabricacao || '';
  document.getElementById('cor').value = v.cor || '';
  document.getElementById('preco').value = v.preco != null ? v.preco : '';
  document.getElementById('quilometragem').value = v.quilometragem != null ? v.quilometragem : '';
  document.getElementById('status').value = v.status || 'DISPONIVEL';
  document.getElementById('form-title').innerText = v.id ? 'Editar veículo' : 'Cadastrar veículo';
}

function resetForm() {
  fillForm({});
  document.getElementById('vehicle-form').reset();
  document.getElementById('veiculo-id').value = '';
  document.getElementById('form-title').innerText = 'Cadastrar veículo';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vehicle-form');
  const tbody = document.querySelector('#veiculos-table tbody');

  async function refresh() {
    const marca = document.getElementById('filter-marca').value.trim();
    const status = document.getElementById('filter-status').value;
    const ano = document.getElementById('filter-ano').value;
    const filters = {};
    if (marca) filters.marca = marca;
    if (status) filters.status = status;
    if (ano) filters.anoFabricacao = ano;
    await listVeiculos(filters);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('veiculo-id').value;
    const data = readForm();
    try {
      if (id) {
        await updateVeiculo(id, data);
      } else {
        await createVeiculo(data);
      }
      resetForm();
      await refresh();
    } catch (err) {
      alert(err.message || 'Erro');
      console.error(err);
    }
  });

  document.getElementById('cancel-btn').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
  });

  document.getElementById('filter-btn').addEventListener('click', (e) => {
    e.preventDefault();
    refresh();
  });

  document.getElementById('clear-filter-btn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('filter-marca').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-ano').value = '';
    refresh();
  });

  tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('edit-btn')) {
      const id = e.target.dataset.id;
      try {
        const res = await fetch(`${baseUrl}/${id}`);
        if (!res.ok) throw new Error('Veículo não encontrado');
        const v = await res.json();
        fillForm(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        alert(err.message);
      }
    }
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      if (!confirm('Confirma exclusão do veículo #' + id + '?')) return;
      try {
        await deleteVeiculo(id);
        await refresh();
      } catch (err) {
        alert('Erro ao deletar');
      }
    }
  });

  // inicial
  refresh();
});