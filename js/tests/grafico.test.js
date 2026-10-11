import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contarPorTipo } from '../modules/grafico.js';

test('contarPorTipo agrupa os cadastros e ignora tipos desconhecidos', () => {
  const lista = [{ tipo: 'doador' }, { tipo: 'voluntario' }, { tipo: 'doador' }, { tipo: 'ambos' }, { tipo: 'outro' }];
  assert.deepEqual(contarPorTipo(lista), { doador: 2, voluntario: 1, ambos: 1 });
});

test('contarPorTipo com lista vazia devolve zeros', () => {
  assert.deepEqual(contarPorTipo([]), { doador: 0, voluntario: 0, ambos: 0 });
});
