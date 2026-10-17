// ============================================================
// «ОТЧЕ НАШ»: разбор слов и упражнения
// ============================================================

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');
const { playThrough } = require('./helpers/play.js');

test('разбор молитвы открывается и показывает все слова', () => {
    const app = loadApp();
    app.window.showPrayer();

    assert.strictEqual(app.screen(), 'prayerSection');
    const words = app.document.querySelectorAll('.prayer-word');
    const expected = app.get('PRAYER_DATA.verses.reduce((n, v) => n + v.words.length, 0)');
    assert.strictEqual(words.length, expected, 'на экране не все слова молитвы');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('каждый стих сопровождается русским переводом', () => {
    const app = loadApp();
    app.window.showPrayer();
    const verses = app.document.querySelectorAll('.prayer-verse');
    assert.strictEqual(verses.length, app.get('PRAYER_DATA.verses.length'));
    for (const v of verses) {
        assert.ok(v.querySelector('.prayer-russian'), 'у стиха нет перевода');
    }
    app.close();
});

test('клик по слову показывает разбор формы', () => {
    const app = loadApp();
    app.window.showPrayer();

    app.document.querySelector('.prayer-word').click();
    const analysis = app.document.querySelector('#analysis-0');
    assert.strictEqual(analysis.style.display, 'block', 'разбор не открылся');
    assert.ok(analysis.textContent.trim().length > 0, 'разбор пуст');
    assert.ok(!/undefined/.test(analysis.innerHTML), 'в разборе undefined');
    assert.ok(app.document.querySelector('.prayer-word.selected'), 'разобранное слово не подсвечено');
    app.close();
});

test('разбор открыт только у одного стиха разом', () => {
    const app = loadApp();
    const w = app.window;
    w.showPrayer();

    w.showWordAnalysis(0, 0);
    w.showWordAnalysis(1, 0);

    const open = [...app.document.querySelectorAll('[id^="analysis-"]')]
        .filter(el => el.style.display === 'block');
    assert.strictEqual(open.length, 1, 'открыто несколько разборов сразу');
    assert.strictEqual(open[0].id, 'analysis-1');
    app.close();
});

test('разбор во всех стихах отрисовывается без дыр', () => {
    const app = loadApp();
    const w = app.window;
    w.showPrayer();

    const verses = app.get('PRAYER_DATA.verses.length');
    for (let v = 0; v < verses; v++) {
        const words = app.get(`PRAYER_DATA.verses[${v}].words.length`);
        for (let i = 0; i < words; i++) {
            w.showWordAnalysis(v, i);
            const html = app.document.querySelector('#analysis-' + v).innerHTML;
            assert.ok(!/undefined|NaN/.test(html), `стих ${v}, слово ${i}: ` + html);
        }
    }
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('упражнение «заполни пропуски» проходится до конца', () => {
    const app = loadApp();
    app.window.showPrayer();
    app.window.startPrayerFill();

    const result = playThrough(app, '#prayerExerciseQuestion');
    assert.ok(result.finished, 'упражнение не дошло до результата');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('упражнение «перевод на греческий» проходится до конца', () => {
    const app = loadApp();
    app.window.showPrayer();
    app.window.startPrayerTranslate();

    const result = playThrough(app, '#prayerExerciseQuestion');
    assert.ok(result.finished);
    app.close();
});

test('пропуск в стихе попадает ровно на одно слово', () => {
    const app = loadApp();
    app.window.showPrayer();
    app.window.startPrayerFill();

    const question = app.document.querySelector('#prayerExerciseQuestion .question').textContent;
    assert.strictEqual((question.match(/___/g) || []).length, 1, 'пропусков не ровно один: ' + question);
    app.close();
});

test('слова стиха и его разбор не разъезжаются в данных обоих курсов', () => {
    // Пропуск ищется по индексу в verse.words, а показывается тем же массивом
    // слов: если текст стиха и words расходятся, пропуск встанет не на место.
    // У иврита это особенно важно из-за маккефа (אֶת־הָאוֹר — одно слово).
    const app = loadApp();
    const bad = app.get(`
        Object.keys(COURSES).map(id => {
            const p = COURSES[id].prayer;
            if (!p) return null;
            const bad = p.verses.map((v, i) => {
                const words = v.words.map(w => w.text || w.greek);
                const text = v.text || v.greek;
                return words.join(' ') === text ? null : i;
            }).filter(i => i !== null);
            return bad.length ? id + ': ' + bad.join(', ') : null;
        }).filter(Boolean).join('; ')
    `);
    assert.strictEqual(bad, '', 'стихи, где текст и words расходятся: ' + bad);
    app.close();
});

test('в вариантах и в банке слов молитвы лишнее слово не повторяется', () => {
    // В молитве слова повторяются (ἡμῶν, καί, σου), и пул без повторов
    // собирался из текста как есть: одно и то же лишнее слово выпадало дважды.
    // Случайность прогоняем много раз — единичный прогон ловил бы через раз.
    const app = loadApp();
    const w = app.window;
    w.showPrayer();
    const bad = [];

    for (let run = 0; run < 60; run++) {
        w.startPrayerFill();
        const total = app.get('prayerExerciseState.total');
        for (let i = 0; i < total; i++) {
            w.eval('prayerExerciseState.index = ' + i);
            w.showPrayerExerciseQuestion();
            const opts = [...app.document.querySelectorAll('#prayerExerciseQuestion .option-btn')].map(b => b.textContent);
            if (new Set(opts).size !== opts.length) bad.push('пропуск: ' + opts.join(' | '));
        }

        w.startPrayerTranslate();
        const qs = app.get('prayerExerciseState.questions.length');
        for (let i = 0; i < qs; i++) {
            const pool = app.get(`prayerExerciseState.questions[${i}].pool.join('|')`).split('|');
            const correct = app.get(`prayerExerciseState.questions[${i}].correct.join('|')`).split('|');
            for (const word of correct) pool.splice(pool.indexOf(word), 1);
            if (new Set(pool).size !== pool.length) bad.push('банк: ' + pool.join(' | '));
        }
    }
    assert.deepStrictEqual(bad.slice(0, 5), [], 'повтор лишнего слова:\n' + bad.slice(0, 5).join('\n'));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('слово, дважды стоящее в стихе, получает в банке две фишки', () => {
    // Обратная сторона той же правки: без повторов — только лишние слова.
    const app = loadApp();
    const w = app.window;
    w.showPrayer();
    w.startPrayerTranslate();
    const bad = app.get(`
        prayerExerciseState.questions.filter(q =>
            q.correct.some(word => q.pool.filter(x => x === word).length < q.correct.filter(x => x === word).length)
        ).map(q => q.russian).join(' | ')
    `);
    assert.strictEqual(bad, '', 'правильных фишек меньше, чем слов в стихе: ' + bad);
    app.close();
});

test('повторный клик по фишке не дублирует слово', () => {
    const app = loadApp();
    app.window.showPrayer();
    app.window.startPrayerTranslate();

    const chip = app.document.querySelector('#prayerWordBank .chip');
    chip.click();
    chip.click();
    chip.click();

    assert.strictEqual(app.get('prayerExerciseState.chosen.length'), 1);
    assert.strictEqual(app.document.querySelectorAll('#prayerBuildArea .token').length, 1);
    app.close();
});

test('у греческой молитвы транслитерация под стихом остаётся', () => {
    const app = loadApp();
    app.window.showPrayer();
    assert.ok(app.document.querySelector('.prayer-verse .prayer-transcription'),
        'в греческом курсе транслитерацию под стихом убирать нельзя');
    app.close();
});

test('FAB на экране молитвы запускает упражнение', () => {
    const app = loadApp();
    app.window.showPrayer();
    assert.strictEqual(app.fab().label, 'Упражнение');

    app.window.onFabClick();
    assert.ok(app.document.querySelector('#prayerExerciseQuestion .word-bank'),
        'FAB не запустил упражнение с переводом');
    app.close();
});

// ------------------------------------------------------------ чтение Библии (иврит)

const HEBREW = { storage: { app_default_course: 'hebrew' } };

test('еврейское чтение открывается и показывает все слова', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    assert.strictEqual(app.screen(), 'prayerSection');
    assert.strictEqual(app.appBarTitle(), 'Чтение Библии');
    assert.strictEqual(app.text('#prayerSectionTitle'),
        app.get('HEBREW_READING_DATA.incipit'), 'в шапке не первая строка чтения');

    const words = app.document.querySelectorAll('.prayer-word');
    const expected = app.get('HEBREW_READING_DATA.verses.reduce((n, v) => n + v.words.length, 0)');
    assert.strictEqual(words.length, expected, 'на экране не все слова чтения');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('в чтении пять стихов первого дня, и каждое слово разобрано', () => {
    const app = loadApp(HEBREW);
    assert.strictEqual(app.get('HEBREW_READING_DATA.verses.length'), 5,
        'Бытие 1:1–5 — ровно пять стихов');
    assert.strictEqual(app.get('HEBREW_READING_DATA.verses.map(v => v.words.length).join(",")'),
        '7,12,5,10,11', 'разбивка стихов на слова разошлась с текстом');
    const bad = app.get(`
        HEBREW_READING_DATA.verses.flatMap((v, vi) => v.words.map((w, wi) =>
            ['text', 'translit', 'translation', 'analysis'].filter(f => !w[f]).length
                ? vi + ':' + wi : null
        )).filter(Boolean).join(', ')
    `);
    assert.strictEqual(bad, '', 'у слов нет полей: ' + bad);
    const markup = app.get(`
        HEBREW_READING_DATA.verses.flatMap(v => [v.text].concat(v.words.map(w => w.text)))
            .filter(t => /[<>]/.test(t)).join(' | ')
    `);
    assert.strictEqual(markup, '', 'в еврейском тексте оказалась разметка: ' + markup);
    app.close();
});

test('у каждого стиха чтения есть перевод, а транслитерации под стихом нет', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    const verses = app.document.querySelectorAll('.prayer-verse');
    assert.strictEqual(verses.length, app.get('HEBREW_READING_DATA.verses.length'));
    for (const v of verses) {
        assert.ok(v.querySelector('.prayer-russian'), 'у стиха нет перевода');
        assert.ok(!v.querySelector('.prayer-transcription'),
            'под стихом не должно быть транслитерации — она остаётся только в разборе слова');
    }
    app.close();
});

test('чтение слова по клику остаётся, даже когда транслитерации под стихом нет', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    app.document.querySelector('.prayer-word').click();
    assert.ok(app.document.querySelector('#analysis-0 .prayer-word-reading'),
        'у разобранного слова нет чтения');
    app.close();
});

test('клик по еврейскому слову показывает чтение и разбор', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    app.document.querySelector('.prayer-word').click();
    const analysis = app.document.querySelector('#analysis-0');
    assert.strictEqual(analysis.style.display, 'block', 'разбор не открылся');
    assert.ok(analysis.querySelector('.prayer-word-reading'), 'у слова нет чтения');
    assert.ok(analysis.textContent.trim().length > 0, 'разбор пуст');
    assert.ok(!/undefined|NaN/.test(analysis.innerHTML), 'в разборе undefined или NaN');
    assert.ok(app.document.querySelector('.prayer-word.selected'), 'разобранное слово не подсвечено');
    app.close();
});

test('разбор всех слов еврейского чтения отрисовывается без дыр', () => {
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();

    const verses = app.get('HEBREW_READING_DATA.verses.length');
    for (let v = 0; v < verses; v++) {
        const words = app.get(`HEBREW_READING_DATA.verses[${v}].words.length`);
        for (let i = 0; i < words; i++) {
            w.showWordAnalysis(v, i);
            const html = app.document.querySelector('#analysis-' + v).innerHTML;
            assert.ok(!/undefined|NaN/.test(html), `стих ${v}, слово ${i}: ` + html);
        }
    }
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('пропуск в еврейском стихе встаёт на слово, а не на часть маккефа', () => {
    // Пропуск адресуется words[blankIndex], а не разбивкой текста по пробелам:
    // עַל־פְּנֵי и אֶת־הָאוֹר — одно слово каждое, и разбивка сдвинула бы пропуск.
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();
    w.startPrayerFill();

    const total = app.get('prayerExerciseState.total');
    for (let i = 0; i < total; i++) {
        w.eval('prayerExerciseState.index = ' + i);
        w.showPrayerExerciseQuestion();
        const q = JSON.parse(app.get(`JSON.stringify(prayerExerciseState.questions[${i}])`));
        const expected = q.words.map((x, j) => j === q.blankIndex ? '___' : x).join(' ');
        const shown = app.document.querySelector('#prayerExerciseQuestion .question').textContent;
        assert.strictEqual(shown, expected, 'пропуск не на своём слове в стихе ' + (i + 1));
    }
    app.close();
});

test('оба упражнения еврейского чтения проходятся до конца', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    app.window.startPrayerFill();
    assert.ok(playThrough(app, '#prayerExerciseQuestion').finished,
        '«заполни пропуски» не дошло до результата');

    app.window.startPrayerTranslate();
    assert.ok(playThrough(app, '#prayerExerciseQuestion').finished,
        'перевод не дошёл до результата');

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('подсказка «Соберите перевод…» есть в греческом и убрана в иврите', () => {
    const greek = loadApp();
    greek.window.showPrayer();
    greek.window.startPrayerTranslate();
    assert.match(greek.text('#prayerExerciseQuestion'), /Соберите перевод на греческий из слов/);
    greek.close();

    const hebrew = loadApp(HEBREW);
    hebrew.window.showPrayer();
    hebrew.window.startPrayerTranslate();
    const text = hebrew.text('#prayerExerciseQuestion');
    assert.ok(!/Соберите перевод/.test(text), 'в иврите подсказки быть не должно: ' + text);
    assert.ok(hebrew.document.querySelector('#prayerWordBank .chip'), 'банк слов должен остаться');
    hebrew.close();
});

test('в неверном ответе порядок слов остаётся текстом изучаемого языка', () => {
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();
    w.startPrayerTranslate();
    app.document.querySelector('#prayerWordBank .chip').click();
    w.prayerCheckTranslate();
    const strong = app.document.querySelector('#prayerExerciseQuestion .feedback strong');
    assert.ok(strong, 'в обратной связи нет правильного порядка');
    assert.ok(strong.classList.contains('script'),
        'иврит в обратной связи должен быть помечен .script, иначе он LTR');
    app.close();
});

test('подписи упражнений чтения называют еврейский, а не греческий', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    assert.match(app.text('#prayerExercise'), /Перевод на еврейский/);
    app.close();
});

test('огласовка чтения не нормализована по NFC', () => {
    // Как и в уроках: NFC переставляет знаки, и слово, выглядящее так же,
    // хранится иначе. Текст взят из OSHB машинно, поэтому порядок знаков
    // должен остаться тем, что в XML.
    const app = loadApp(HEBREW);
    const data = app.get('JSON.stringify(HEBREW_READING_DATA)');
    app.close();
    const tokens = JSON.parse(data).verses.flatMap(v => v.words.map(w => w.text));
    const changed = tokens.filter(t => t.normalize('NFC') !== t);
    assert.ok(changed.length > 0,
        'ни одно слово не отличается от NFC-формы — похоже, огласовку нормализовали');
});
