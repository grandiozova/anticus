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

// ------------------------------------------------------------ клавиатура
// Экранная клавиатура нужна потому, что греческую и еврейскую раскладку ещё
// надо поставить, а на телефоне — найти в списке языков. Буквы она берёт из
// пула курса, поэтому текст изучаемого языка здесь не набирается руками:
// слово вынимается из самого словаря, сворачивается ровно так, как сворачивает
// поиск, и набирается клавишами. Так одной проверкой закрываются и состав
// клавиатуры, и вставка, и свёртка диакритики.

const HEBREW_COURSE = { storage: { app_default_course: 'hebrew' } };

function openKeyboard(app) {
    app.document.getElementById('vocabKeyboardToggle').click();
    return app.document.getElementById('vocabKeyboardGrid');
}

// Клавиши-буквы: последняя клавиша набора — «стереть», и текст у неё не буква,
// а иконка, поэтому узнаём её по .msym.
function letterKeys(app) {
    return [...app.document.querySelectorAll('#vocabKeyboardGrid .vocab-key')]
        .filter(b => !b.querySelector('.msym'));
}

function keyboardLetters(app) {
    return letterKeys(app).map(b => b.textContent);
}

function typeWord(app, text) {
    for (const ch of text) {
        const key = letterKeys(app).find(b => b.textContent === ch);
        assert.ok(key, 'на клавиатуре нет клавиши «' + ch + '»');
        key.click();
    }
}

test('клавиатура словаря закрыта до нажатия и открывается той же кнопкой', () => {
    const app = openVocab();
    const box = app.document.getElementById('vocabKeyboard');
    const toggle = app.document.getElementById('vocabKeyboardToggle');

    assert.ok(box.classList.contains('hidden'), 'клавиатура открыта до нажатия');
    assert.strictEqual(toggle.getAttribute('aria-pressed'), 'false');

    toggle.click();
    assert.ok(!box.classList.contains('hidden'), 'кнопка не открыла клавиатуру');
    assert.strictEqual(toggle.getAttribute('aria-pressed'), 'true');
    assert.ok(letterKeys(app).length > 20, 'клавиш подозрительно мало: ' + letterKeys(app).length);

    toggle.click();
    assert.ok(box.classList.contains('hidden'), 'кнопка не убрала клавиатуру');
    assert.strictEqual(toggle.getAttribute('aria-pressed'), 'false');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('буквы клавиатуры — пул курса, конечные начертания входят в набор', () => {
    for (const opts of [{ storage: { app_default_course: 'greek' } }, HEBREW_COURSE]) {
        const app = loadApp(opts);
        app.window.showAllVocab();
        openKeyboard(app);

        // Ни одной буквы в тесте: набор сверяется с пулом курса, из которого
        // клавиатура и собрана.
        const expected = app.get(`
            (function () {
                let pool = courseAlphabet();
                return (pool.letters || []).map(l => l.letter)
                    .concat((pool.finals || []).map(f => f.final)).join('');
            })()`);
        assert.strictEqual(keyboardLetters(app).join(''), expected, 'набор клавиш разошёлся с пулом курса');

        // Диакритика на клавиатуре не нужна ни одной клавише: поиск её снимает.
        // Заодно это значит, что каждая клавиша — ровно один знак.
        for (const label of keyboardLetters(app)) {
            assert.strictEqual([...label].length, 1, 'клавиша не из одного знака: ' + label);
            assert.ok(!/\p{M}/u.test(label), 'на клавиатуре знак диакритики: ' + label);
        }
        assert.deepStrictEqual(app.errors, []);
        app.close();
    }
});

test('таблица конечных начертаний сходится с пулом курса', () => {
    // Свёртку конечных (FINAL_LETTER_FORMS в js/vocab.js) набрать по-другому
    // нечем — она в коде, и потому проверяется по данным: пары «буква —
    // конечная» лежат в пуле иврита, и каждая конечная обязана сводиться
    // ровно к своей букве. Набранная руками пара выглядит верно и ею не
    // является — тот же случай, что с огласовкой в данных уроков.
    const app = loadApp(HEBREW_COURSE);
    const pairs = app.get('(courseAlphabet().finals || []).map(f => f.letter + f.final).join(",")');
    assert.ok(pairs.length, 'в пуле иврита нет конечных начертаний');
    for (const pair of pairs.split(',')) {
        const chars = [...pair];
        assert.strictEqual(chars.length, 2, 'пара не из двух знаков: ' + pair);
        assert.strictEqual(app.window.foldForSearch(chars[1]), app.window.foldForSearch(chars[0]),
            'конечная ' + chars[1] + ' не сводится к ' + chars[0]);
    }
    // У греческого конечная сигма отдельной буквой в пуле не лежит — её сводит
    // сама свёртка. Знаки записаны кодами: конечная и обычная сигма выглядят
    // по-разному, но различить их при правке глазами нечем.
    assert.strictEqual(app.window.foldForSearch('\u03C2'), app.window.foldForSearch('\u03C3'));
    // И обратное: то, что конечным не является, свёртка не трогает.
    assert.strictEqual(app.window.foldForSearch('\u03C3'), '\u03C3');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('слово, набранное клавишами по буквам, находится в словаре', () => {
    // Свёртка — половина дела: клавиатура даёт только буквы, а в словаре слово
    // стоит с ударением и огласовкой. Берём первое слово, у которого они есть,
    // сворачиваем его как поиск и набираем то, что осталось.
    for (const opts of [{ storage: { app_default_course: 'greek' } }, HEBREW_COURSE]) {
        const app = loadApp(opts);
        app.window.showAllVocab();

        const picked = app.get(`
            (function () {
                let pool = courseAlphabet();
                let keys = (pool.letters || []).map(l => l.letter)
                    .concat((pool.finals || []).map(f => f.final)).join('');
                for (let e of getAllVocab()) {
                    let folded = foldForSearch(e.greek);
                    if (folded.length < 3 || folded === e.greek) continue;
                    if (![...folded].every(ch => keys.indexOf(ch) !== -1)) continue;
                    // Конечное начертание в слове обязательно: клавиатура даёт
                    // основную букву (в пуле курса лежит она), и найти слово
                    // с конечной буквой можно только свёрткой.
                    let bare = e.greek.normalize('NFD').replace(/\\p{M}+/gu, '').normalize('NFC');
                    if (bare !== folded) return e.id + '|' + e.greek + '|' + folded;
                }
                return '';
            })()`);
        assert.ok(picked, 'в словаре нет слова с конечной буквой, набираемого клавишами');
        const [id, word, folded] = picked.split('|');
        assert.notStrictEqual(folded, word, 'слово без диакритики — проверять нечего');

        openKeyboard(app);
        typeWord(app, folded);

        assert.strictEqual(app.document.getElementById('vocabSearchInput').value, folded, 'набор не дошёл до строки поиска');
        assert.ok(app.document.querySelector('#allVocabContent .word-item[data-vocab-id="' + id + '"]'),
            'набранное по буквам ' + folded + ' не нашло ' + word);
        assert.deepStrictEqual(app.errors, []);
        app.close();
    }
});

test('«стереть» убирает последнюю букву и не ломается на пустой строке', () => {
    const app = openVocab();
    openKeyboard(app);
    const input = app.document.getElementById('vocabSearchInput');
    const backspace = [...app.document.querySelectorAll('#vocabKeyboardGrid .vocab-key')]
        .find(b => b.querySelector('.msym'));
    assert.ok(backspace, 'клавиши «стереть» нет');

    const [first, second] = keyboardLetters(app);
    typeWord(app, first + second);
    assert.ok(input.value.length === 2, 'две клавиши не дали двух знаков: ' + input.value);

    backspace.click();
    assert.strictEqual(input.value, first);
    backspace.click();
    assert.strictEqual(input.value, '');
    backspace.click();
    assert.strictEqual(input.value, '', 'стирание пустой строки что-то испортило');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('клавиатура следует за курсом и у нового захода в словарь убрана', () => {
    const app = loadApp({ storage: { app_default_course: 'greek' } });
    app.window.showAllVocab();
    openKeyboard(app);
    const greek = keyboardLetters(app).join('');
    assert.ok(greek.length > 20);

    app.window.applyCourse('hebrew');
    // Смена курса забывает буквы прошлого: держать их незачем, а показать
    // их в еврейском словаре — ошибка.
    assert.ok(app.document.getElementById('vocabKeyboard').classList.contains('hidden'),
        'смена курса оставила клавиатуру открытой');
    assert.strictEqual(app.document.getElementById('vocabKeyboardGrid').textContent, '');

    app.window.showAllVocab();
    openKeyboard(app);
    const hebrew = keyboardLetters(app).join('');
    const expected = app.get(`
        (function () {
            let pool = courseAlphabet();
            return (pool.letters || []).map(l => l.letter)
                .concat((pool.finals || []).map(f => f.final)).join('');
        })()`);
    assert.strictEqual(hebrew, expected, 'еврейская клавиатура набрана не пулом курса');
    assert.notStrictEqual(hebrew, greek, 'клавиатура осталась греческой');

    // Новый заход в словарь — клавиатура снова убрана: это состояние экрана,
    // а не настройка, которую надо помнить.
    app.window.showAllVocab();
    assert.ok(app.document.getElementById('vocabKeyboard').classList.contains('hidden'),
        'клавиатура осталась открытой после нового захода в словарь');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});
