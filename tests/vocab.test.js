// ============================================================
// СЛОВАРЬ: список, фильтр, поиск, примеры употребления
// ============================================================

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');

function openVocab() {
    const app = loadApp();
    app.window.showAllVocab();
    return app;
}
const entries = app => app.document.querySelectorAll('#allVocabContent .word-item').length;

function search(app, query) {
    app.document.getElementById('vocabSearchInput').value = query;
    app.window.applyVocabFilter();
    return entries(app);
}

test('словарь собирается и показывает слова', () => {
    const app = openVocab();
    assert.ok(entries(app) > 50, 'в словаре подозрительно мало слов: ' + entries(app));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('словарь не включает урок 1 — там названия букв, а не лексика', () => {
    const app = openVocab();
    const lessons = app.get('getAllVocab().map(e => e.lesson).join(",")').split(',').map(Number);
    assert.ok(!lessons.includes(1), 'в словарь попал урок 1');
    assert.ok(Math.min(...lessons) >= app.window.vocabFirstLesson());
    app.close();
});

test('в словаре нет повторов одного и того же слова', () => {
    const app = openVocab();
    const dupes = app.get(`
        (function () {
            let seen = new Set(), bad = [];
            for (let e of getAllVocab()) {
                let key = e.greek + '|' + e.article;
                if (seen.has(key)) bad.push(key); else seen.add(key);
            }
            return bad.join(', ');
        })()
    `);
    assert.strictEqual(dupes, '', 'повторы в словаре: ' + dupes);
    app.close();
});

test('фильтр по части речи сужает список и суммируется в целое', () => {
    const app = openVocab();
    const total = entries(app);

    let sum = 0;
    for (const type of app.get('VOCAB_TYPE_ORDER.join(",")').split(',')) {
        app.window.setVocabType(type);
        sum += entries(app);
    }
    assert.strictEqual(sum, total, 'сумма по частям речи не сходится с полным списком');

    app.window.setVocabType('all');
    assert.strictEqual(entries(app), total);
    app.close();
});

test('чипы фильтра строятся по данным и подписаны счётчиком', () => {
    const app = openVocab();
    const chips = [...app.document.querySelectorAll('#vocabTypeChips .filter-chip')];
    assert.ok(chips.length > 1, 'чипы фильтра не отрисовались');
    assert.match(chips[0].textContent, /Все/);
    for (const c of chips) {
        assert.match(c.querySelector('.filter-chip__count').textContent, /^\d+$/, 'у чипа нет счётчика');
    }
    app.close();
});

test('поиск не зависит от ударений, придыханий и регистра', () => {
    // Учащийся набирает «λογ», а в словаре стоит λόγος. Раньше поиск
    // требовал точного совпадения диакритики и не находил ничего.
    const app = openVocab();
    const withAccent = search(app, 'λόγ');
    assert.ok(withAccent > 0, 'не найдено даже с точной диакритикой');

    assert.strictEqual(search(app, 'λογ'), withAccent, 'поиск без ударения должен давать тот же результат');
    assert.strictEqual(search(app, 'ΛΟΓ'), withAccent, 'поиск заглавными должен давать тот же результат');
    assert.ok(search(app, 'αγαθ') > 0, 'поиск без придыхания ничего не нашёл');
    app.close();
});

test('поиск по русскому переводу работает', () => {
    const app = openVocab();
    assert.ok(search(app, 'слово') > 0);
    app.close();
});

test('поиск без совпадений показывает пустое состояние, а не пустоту', () => {
    const app = openVocab();
    assert.strictEqual(search(app, 'щщщщщ'), 0);
    const box = app.document.getElementById('allVocabContent');
    assert.match(box.textContent, /Ничего не найдено/, 'нет объяснения, почему список пуст');
    app.close();
});

test('крестик очищает поиск и возвращает полный список', () => {
    const app = openVocab();
    const total = entries(app);
    search(app, 'λογ');
    app.window.clearVocabSearch();
    assert.strictEqual(entries(app), total);
    assert.strictEqual(app.document.getElementById('vocabSearchInput').value, '');
    app.close();
});

test('раскрытие слова показывает примеры и не роняет разметку', () => {
    const app = openVocab();
    const rows = [...app.document.querySelectorAll('#allVocabContent .word-item')];
    let opened = 0;

    for (const row of rows.slice(0, 40)) {
        app.window.toggleVocabExamples(Number(row.getAttribute('data-vocab-id')));
        const details = row.querySelector('.word-details');
        assert.ok(details.innerHTML.trim().length > 0, 'блок примеров пуст');
        assert.ok(!/undefined|NaN|\[object Object\]/.test(details.innerHTML),
            'служебное значение в примерах: ' + details.innerHTML.slice(0, 200));
        opened++;
    }
    assert.ok(opened > 0);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('у каждого слова есть примеры, автопример или внятное объяснение', () => {
    const app = openVocab();
    const empty = app.get(`
        (function () {
            let bad = [];
            for (let e of getAllVocab()) {
                let html = renderVocabDetailsHtml(e);
                if (!html || !html.trim()) bad.push(e.greek);
            }
            return bad.join(', ');
        })()
    `);
    assert.strictEqual(empty, '', 'слова без всякого блока примеров: ' + empty);
    app.close();
});

test('слово раскрывается примером, а таблица форм — по желанию', () => {
    const app = openVocab();
    const target = app.get(`
        (function () {
            for (let e of getAllVocab()) {
                if (e.declension_forms && findUsageExamples(e, 1).length) return e.id;
            }
            return -1;
        })()
    `);
    assert.ok(target >= 0, 'в словаре нет слова и с примером, и с парадигмой');

    app.window.toggleVocabExamples(target);
    const details = app.document.querySelector(
        '#allVocabContent .word-item[data-vocab-id="' + target + '"] .word-details');
    // Пример идёт первым: он и есть ответ на нажатие.
    assert.ok(details.firstElementChild.classList.contains('vocab-examples'),
        'примеры должны идти первыми: ' + details.innerHTML.slice(0, 160));
    assert.ok(details.querySelector('.vocab-example__script'), 'пример не показан сразу');

    const strip = details.querySelector('.md-table-scroll');
    const toggle = details.querySelector('.vocab-forms-toggle');
    assert.ok(strip && toggle, 'нет кнопки форм или самой таблицы');
    assert.ok(!strip.classList.contains('open'), 'таблица раскрыта до нажатия');
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false');

    app.window.toggleVocabForms(target);
    assert.ok(strip.classList.contains('open'), 'кнопка не раскрыла таблицу форм');
    assert.ok(details.classList.contains('forms-open'), 'тело статьи не подняло потолок высоты');
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'true');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('примеры не выдают словарную форму за употребление', () => {
    // «ἡ ὥρα» — это сама словарная статья, а не пример её использования.
    const app = openVocab();
    const trivial = app.get(`
        (function () {
            let bad = [];
            for (let e of getAllVocab()) {
                for (let ex of findUsageExamples(e, 3)) {
                    if (isTrivialExample(ex.greek, e)) bad.push(e.greek + ' -> ' + ex.greek);
                }
            }
            return bad.join('; ');
        })()
    `);
    assert.strictEqual(trivial, '', 'тривиальные примеры: ' + trivial);
    app.close();
});

test('строка словаря отвечает на клавиатуру', () => {
    const app = openVocab();
    const row = app.document.querySelector('#allVocabContent .word-row');
    assert.strictEqual(row.getAttribute('role'), 'button');
    assert.strictEqual(row.getAttribute('tabindex'), '0');

    row.dispatchEvent(new app.window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    assert.strictEqual(row.getAttribute('aria-expanded'), 'true', 'Enter не раскрыл строку словаря');
    app.close();
});

test('возврат в словарь сохраняет набранный запрос', () => {
    const app = openVocab();
    search(app, 'λογ');
    const found = entries(app);

    app.window.navigateTo('progress');
    app.window.navigateTo('vocab');

    assert.strictEqual(app.document.getElementById('vocabSearchInput').value, 'λογ', 'запрос потерялся');
    assert.strictEqual(entries(app), found);
    app.close();
});

test('перевод делится по запятым, но не внутри скобок', () => {
    // Уточнение в скобках принадлежит слову, рядом с которым стоит: «имя
    // (известность, слава), Сим» — это два значения, а не три.
    const app = openVocab();
    // Array.from в области теста: массив из jsdom-области — другого прототипа,
    // и deepStrictEqual сравнил бы ещё и его.
    const split = s => Array.from(app.window.splitVocabGlosses(s));
    assert.deepStrictEqual(split('слово, дело, вещь'), ['слово', 'дело', 'вещь']);
    assert.deepStrictEqual(split('имя (известность, слава), Сим'), ['имя (известность, слава)', 'Сим']);
    assert.deepStrictEqual(split('человек'), ['человек']);
    assert.deepStrictEqual(split(''), []);
    app.close();
});

test('у греческого строка словаря остаётся целой', () => {
    // Сокращаются только переводы-перечни синонимов: так помечен еврейский
    // курс (vocabShortGloss в data/courses.js). В греческом перечислении через
    // запятую лежит ещё и управление падежом («в, во (куда; с Acc.)»), и
    // укоротить строку значило бы спрятать половину словарной статьи.
    const app = openVocab();
    const bad = app.get(`
        (function () {
            let hits = [];
            for (let e of getAllVocab()) {
                if (vocabRowGloss(e) !== e.translation) hits.push(e.greek + ': «' + vocabRowGloss(e) + '»');
                if (vocabExtraGlosses(e).length) hits.push(e.greek + ': лишние значения в статье');
            }
            return hits.join(' | ');
        })()
    `);
    assert.strictEqual(bad, '', bad);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});
