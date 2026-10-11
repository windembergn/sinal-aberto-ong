import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapar, campo, cartaoProjeto } from '../modules/templates.js';

test('escapar neutraliza HTML vindo do usuário', () => {
  assert.equal(escapar('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  assert.equal(escapar(`"aspas" & 'simples'`), '&quot;aspas&quot; &amp; &#39;simples&#39;');
});

test('campo liga rótulo, dica e erro pelo id', () => {
  const html = campo({ id: 'cpf', rotulo: 'CPF', dica: 'Só números' });
  assert.match(html, /<label for="cpf">/);
  assert.match(html, /aria-describedby="cpf-dica cpf-erro"/);
  assert.match(html, /id="cpf-erro"/);
  assert.match(html, /required/);
});

test('cartão de projeto usa os dados e escapa o conteúdo', () => {
  const html = cartaoProjeto({
    id: 'teste', titulo: 'A <b>B</b>', etiqueta: { texto: 'Piloto', tipo: 'destaque' },
    resumo: 'r', comoFunciona: 'c', impacto: 'i',
  });
  assert.match(html, /<article id="teste"/);
  assert.match(html, /A &lt;b&gt;B&lt;\/b&gt;/);
  assert.match(html, /etiqueta--destaque/);
});
