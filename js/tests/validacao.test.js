import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpfValido, calcularIdade, validarCampo, validarFormulario } from '../modules/validacao.js';

const HOJE = new Date(2026, 9, 11); // 11/10/2026

const formValido = {
  nome: 'Maria da Silva',
  email: 'maria@exemplo.com',
  nascimento: '2000-05-10',
  telefone: '(41) 99999-0000',
  cpf: '529.982.247-25',
  cep: '80000-000',
  endereco: 'Rua das Palmeiras, 120',
  cidade: 'Curitiba',
  estado: 'PR',
  'tipo-participacao': 'doador',
  disponibilidade: '',
  mensagem: '',
  termos: true,
};

test('CPF: aceita dígitos verificadores corretos, com ou sem máscara', () => {
  assert.equal(cpfValido('529.982.247-25'), true);
  assert.equal(cpfValido('52998224725'), true);
});

test('CPF: recusa dígito verificador errado, sequência repetida e tamanho errado', () => {
  assert.equal(cpfValido('529.982.247-24'), false);
  assert.equal(cpfValido('111.111.111-11'), false);
  assert.equal(cpfValido('123.456'), false);
});

test('idade considera se o aniversário do ano já passou', () => {
  assert.equal(calcularIdade('2010-10-11', HOJE), 16);
  assert.equal(calcularIdade('2010-10-12', HOJE), 15);
});

test('formulário completo e consistente não tem erros', () => {
  assert.deepEqual(validarFormulario(formValido, HOJE), {});
});

test('menor de 16 anos é recusado', () => {
  const erro = validarCampo('nascimento', { ...formValido, nascimento: '2012-01-01' }, HOJE);
  assert.match(erro, /16 anos/);
});

test('nome precisa de sobrenome', () => {
  assert.equal(validarCampo('nome', { ...formValido, nome: 'Maria' }), 'Informe nome e sobrenome.');
});

test('regra cruzada: horas só são obrigatórias para voluntário', () => {
  assert.equal(validarCampo('disponibilidade', { ...formValido, 'tipo-participacao': 'doador' }), '');
  assert.match(validarCampo('disponibilidade', { ...formValido, 'tipo-participacao': 'voluntario' }), /horas/);
  assert.equal(validarCampo('disponibilidade', { ...formValido, 'tipo-participacao': 'ambos', disponibilidade: '2' }), '');
  assert.match(validarCampo('disponibilidade', { ...formValido, 'tipo-participacao': 'ambos', disponibilidade: '50' }), /entre 1 e 40/);
});

test('formulário vazio aponta todos os obrigatórios', () => {
  const vazio = Object.fromEntries(Object.keys(formValido).map((k) => [k, '']));
  vazio.termos = false;
  const erros = validarFormulario(vazio, HOJE);
  assert.deepEqual(Object.keys(erros).sort(), [
    'cep', 'cidade', 'cpf', 'email', 'endereco', 'estado', 'nascimento',
    'nome', 'telefone', 'termos', 'tipo-participacao',
  ]);
});
