import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarArmazenamento, mascararCpf } from '../modules/armazenamento.js';

// localStorage falso, em memória, com a mesma interface do navegador.
const storageFalso = () => {
  const dados = new Map();
  return {
    getItem: (k) => (dados.has(k) ? dados.get(k) : null),
    setItem: (k, v) => dados.set(k, String(v)),
    removeItem: (k) => dados.delete(k),
  };
};

const form = {
  nome: ' Maria da Silva ', email: 'maria@exemplo.com', cpf: '529.982.247-25',
  'tipo-participacao': 'voluntario', cidade: 'Curitiba', estado: 'PR', disponibilidade: '2', termos: true,
};

test('rascunho não guarda CPF nem aceite dos termos', () => {
  const arm = criarArmazenamento(storageFalso());
  arm.salvarRascunho(form);
  const { campos } = arm.lerRascunho();
  assert.equal(campos.cpf, undefined);
  assert.equal(campos.termos, undefined);
  assert.equal(campos.email, 'maria@exemplo.com');
  arm.limparRascunho();
  assert.equal(arm.lerRascunho(), null);
});

test('cadastro é salvo com CPF mascarado e o mais recente primeiro', () => {
  const arm = criarArmazenamento(storageFalso());
  const primeiro = arm.adicionarCadastro(form);
  const segundo = arm.adicionarCadastro({ ...form, nome: 'João Souza' });
  const lista = arm.listarCadastros();
  assert.equal(lista.length, 2);
  assert.equal(lista[0].id, segundo.id);
  assert.equal(primeiro.nome, 'Maria da Silva');
  assert.equal(primeiro.cpf, '***.982.247-**');
  assert.equal(primeiro.disponibilidade, 2);
});

test('remover cadastro tira só o item escolhido', () => {
  const arm = criarArmazenamento(storageFalso());
  const a = arm.adicionarCadastro(form);
  const b = arm.adicionarCadastro(form);
  const restante = arm.removerCadastro(a.id);
  assert.deepEqual(restante.map((c) => c.id), [b.id]);
});

test('sem localStorage disponível, não quebra: devolve valores padrão', () => {
  const quebrado = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('bloqueado'); }, removeItem() {} };
  const arm = criarArmazenamento(quebrado);
  assert.deepEqual(arm.listarCadastros(), []);
  assert.equal(arm.adicionarCadastro(form), null);
});

test('mascararCpf esconde os 3 primeiros e os 2 últimos dígitos', () => {
  assert.equal(mascararCpf('52998224725'), '***.982.247-**');
  assert.equal(mascararCpf('123'), '');
});
