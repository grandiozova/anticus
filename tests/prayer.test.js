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

test('еврейское чтение открывается и показывает все слова первого дня', () => {
    // На экране ровно один день: человек читает за раз один день творения,
    // а не всю главу. Слов на экране — сколько их в стихах этого дня.
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    assert.strictEqual(app.screen(), 'prayerSection');
    assert.strictEqual(app.appBarTitle(), 'Чтение Библии');
    assert.strictEqual(app.text('#prayerSectionTitle'),
        app.get('HEBREW_READING_DATA.incipit'), 'в шапке не первая строка чтения');

    const words = app.document.querySelectorAll('.prayer-word');
    const expected = app.get(`
        HEBREW_READING_DATA.verses
            .slice(HEBREW_READING_DATA.days[0].from, HEBREW_READING_DATA.days[0].to + 1)
            .reduce((n, v) => n + v.words.length, 0)
    `);
    assert.strictEqual(words.length, expected, 'на экране не все слова дня');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('в чтении вся первая глава Бытия, и каждое слово разобрано', () => {
    const app = loadApp(HEBREW);
    assert.strictEqual(app.get('HEBREW_READING_DATA.verses.length'), 31,
        'Бытие 1 — тридцать один стих');
    // Разбивка на слова машинная: первые стихи сверяются с той, что уже была.
    assert.strictEqual(app.get('HEBREW_READING_DATA.verses.slice(0, 5).map(v => v.words.length).join(",")'),
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

test('у каждого стиха чтения есть перевод и адрес, а транслитерации под стихом нет', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();

    const verses = app.document.querySelectorAll('.prayer-verse');
    const day = app.get('HEBREW_READING_DATA.days[0]');
    assert.strictEqual(verses.length, day.to - day.from + 1);
    for (const v of verses) {
        assert.ok(v.querySelector('.prayer-russian'), 'у стиха нет перевода');
        assert.ok(v.querySelector('.prayer-verse-ref'), 'у стиха нет адреса (1:9)');
        assert.ok(!v.querySelector('.prayer-transcription'),
            'под стихом не должно быть транслитерации — она остаётся только в разборе слова');
    }
    app.close();
});

test('дни чтения покрывают главу подряд, без пропусков и налезаний', () => {
    const app = loadApp(HEBREW);
    const bad = app.get(`
        (() => {
            const d = HEBREW_READING_DATA;
            const problems = [];
            let expect = 0;
            d.days.forEach((day, i) => {
                if (day.from !== expect) problems.push('день ' + (i + 1) + ' начинается с ' + day.from);
                if (day.to < day.from) problems.push('день ' + (i + 1) + ' пуст');
                if (!day.title || !day.range) problems.push('день ' + (i + 1) + ' без подписи');
                expect = day.to + 1;
            });
            if (expect !== d.verses.length) problems.push('покрыто ' + expect + ' из ' + d.verses.length);
            return problems.join('; ');
        })()
    `);
    assert.strictEqual(bad, '', bad);
    assert.strictEqual(app.get('HEBREW_READING_DATA.days.length'), 6, 'дней творения шесть');
    app.close();
});

test('переключение дня показывает только его стихи', () => {
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();

    const chips = [...app.document.querySelectorAll('.prayer-day-chips .filter-chip')];
    assert.strictEqual(chips.length, app.get('HEBREW_READING_DATA.days.length'),
        'чипов не по числу дней');

    chips[2].click();
    // День перерисовывает всю карточку, включая чипы: спрашиваем заново.
    const after = [...app.document.querySelectorAll('.prayer-day-chips .filter-chip')];
    assert.strictEqual(after[2].getAttribute('aria-pressed'), 'true');
    assert.strictEqual(after[0].getAttribute('aria-pressed'), 'false');

    const day = app.get('HEBREW_READING_DATA.days[2]');
    assert.strictEqual(app.document.querySelectorAll('.prayer-verse').length, day.to - day.from + 1);
    assert.strictEqual(app.text('.prayer-day-title'), day.title);
    assert.match(app.text('.prayer-day-range'), /1:9–13/);
    // Первое слово экрана — первое слово первого стиха дня, а не главы.
    assert.strictEqual(app.document.querySelector('.prayer-word').getAttribute('data-verse'), String(day.from));

    // Внизу дня — те же соседние дни: у третьего есть оба.
    const footLabel = b => b.textContent.replace(/arrow_(back|forward)/, '').trim();
    const foot = [...app.document.querySelectorAll('.prayer-day-foot .menu-btn')];
    assert.deepStrictEqual(foot.map(footLabel), ['День 2', 'День 4']);
    foot[1].click();
    assert.strictEqual(app.get('prayerDayIndex'), 3, 'кнопка «День 4» не переключила день');
    // На краю ряда соседней кнопки нет и ряд не заворачивается.
    app.window.setPrayerDay(0);
    assert.deepStrictEqual(
        [...app.document.querySelectorAll('.prayer-day-foot .menu-btn')].map(footLabel),
        ['День 2']);
    app.window.setPrayerDay(5);
    assert.deepStrictEqual(
        [...app.document.querySelectorAll('.prayer-day-foot .menu-btn')].map(footLabel),
        ['День 5']);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('свайп по тексту переключает день', () => {
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();
    const host = app.document.querySelector('#prayerContent');
    const swipe = (type, x, y) => {
        const ev = new w.Event(type, { bubbles: true, cancelable: true });
        ev.touches = type === 'touchend' ? [] : [{ clientX: x, clientY: y }];
        ev.changedTouches = [{ clientX: x, clientY: y }];
        host.dispatchEvent(ev);
    };

    swipe('touchstart', 240, 200);
    swipe('touchend', 120, 205);      // влево — следующий день
    assert.strictEqual(app.get('prayerDayIndex'), 1);

    swipe('touchstart', 120, 200);
    swipe('touchend', 240, 205);      // вправо — предыдущий
    assert.strictEqual(app.get('prayerDayIndex'), 0);

    // Вниз-вверх и короткий жест — это прокрутка, а не листание.
    swipe('touchstart', 120, 200);
    swipe('touchend', 90, 320);
    assert.strictEqual(app.get('prayerDayIndex'), 0);
    swipe('touchstart', 120, 200);
    swipe('touchend', 100, 202);
    assert.strictEqual(app.get('prayerDayIndex'), 0);

    // С краю ряда жест ничего не делает и не заворачивается.
    swipe('touchstart', 240, 200);
    swipe('touchend', 120, 205);
    swipe('touchstart', 240, 200);
    swipe('touchend', 120, 205);
    for (let i = 0; i < 6; i++) { swipe('touchstart', 240, 200); swipe('touchend', 120, 205); }
    assert.strictEqual(app.get('prayerDayIndex'), app.get('HEBREW_READING_DATA.days.length') - 1);
    app.close();
});

test('смена курса возвращает чтение к первому дню', () => {
    // День — состояние экрана, а не курса: у другого курса свои дни, и
    // открывать его с чужого дня нельзя.
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    app.window.setPrayerDay(4);
    assert.strictEqual(app.get('prayerDayIndex'), 4);

    app.window.switchCourse();
    assert.strictEqual(app.get('prayerDayIndex'), 0);
    app.close();
});

test('источник перевода указан на экране чтения', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    const link = app.document.querySelector('.prayer-source a');
    assert.ok(link, 'нет ссылки на источник перевода');
    assert.strictEqual(link.getAttribute('href'), app.get('HEBREW_READING_DATA.source.url'));
    assert.strictEqual(link.getAttribute('target'), '_blank');
    assert.match(app.text('.prayer-source'), /ru\.chabad\.org/);
    // У греческой молитвы источник не выдумывается.
    const greek = loadApp();
    greek.window.showPrayer();
    assert.ok(!greek.document.querySelector('.prayer-source'), 'у молитвы нет источника перевода');
    greek.close();
    app.close();
});

test('в чтении шесть дней, а у молитвы дней нет', () => {
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    assert.strictEqual(app.document.querySelectorAll('.prayer-day-chips .filter-chip').length, 6);
    app.close();

    const greek = loadApp();
    greek.window.showPrayer();
    assert.ok(!greek.document.querySelector('.prayer-day-chips'), 'у молитвы не должно быть дней');
    assert.ok(!greek.document.querySelector('.prayer-day-head'));
    assert.strictEqual(greek.document.querySelectorAll('.prayer-verse').length,
        greek.get('PRAYER_DATA.verses.length'), 'молитва показывается целиком');
    greek.close();
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

    // Разбор есть у каждого слова главы, но на экране живёт только открытый
    // день — поэтому глава проходится днём за днём.
    const days = app.get('HEBREW_READING_DATA.days');
    days.forEach((day, d) => {
        w.setPrayerDay(d);
        const verses = app.get('HEBREW_READING_DATA.verses.length');
        for (let v = day.from; v <= Math.min(day.to, verses - 1); v++) {
            const words = app.get(`HEBREW_READING_DATA.verses[${v}].words.length`);
            for (let i = 0; i < words; i++) {
                w.showWordAnalysis(v, i);
                const html = app.document.querySelector('#analysis-' + v).innerHTML;
                assert.ok(!/undefined|NaN/.test(html), `день ${d + 1}, стих ${v}, слово ${i}: ` + html);
            }
        }
    });
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

test('перевод еврейского чтения спрашивает куски стихов, а не стихи целиком', () => {
    // Упражнение собирается по открытому дню: его стихи и только они.
    const app = loadApp(HEBREW);
    app.window.showPrayer();
    const data = JSON.parse(app.get('JSON.stringify(HEBREW_READING_DATA)'));
    const days = data.days.length;

    for (let d = 0; d < days; d++) {
        app.window.setPrayerDay(d);
        app.window.startPrayerTranslate();

        const day = data.days[d];
        const segments = data.verses.slice(day.from, day.to + 1).flatMap((v, k) =>
            (v.segments || []).map(s => Object.assign({ verse: day.from + k }, s)));
        const total = app.get('prayerExerciseState.total');
        assert.strictEqual(total, segments.length, `день ${d + 1}: вопрос не на каждый кусок стиха`);

        // Вопрос — ровно слова своего куска, взятые из words стиха: кусок,
        // набранный заново, разошёлся бы со стихом в порядке знаков огласовки.
        const questions = JSON.parse(app.get('JSON.stringify(prayerExerciseState.questions)'));
        const byRussian = new Map(segments.map(s => [s.russian, s]));
        for (const q of questions) {
            const segment = byRussian.get(q.russian);
            assert.ok(segment, 'вопрос не из куска стиха: ' + q.russian);
            const words = data.verses[segment.verse].words.slice(segment.from, segment.to + 1).map(w => w.text);
            assert.deepStrictEqual(q.correct, words, 'фишки вопроса разошлись со стихом: ' + q.russian);
        }
    }
    app.close();
});

test('куски стихов коротки, подряд идут и покрывают стих целиком', () => {
    // Куски нужны не ради «не весь стих», а ради длины задания: целый стих
    // в 15 фишек — это диктант. Поэтому проверяется длина куска в словах,
    // а не то, что он короче стиха: в коротком стихе он и есть стих.
    const app = loadApp(HEBREW);
    const bad = app.get(`
        HEBREW_READING_DATA.verses.map((v, vi) => {
            const segs = v.segments || [];
            const problems = [];
            if (!segs.length) problems.push('нет кусков');
            let prevTo = -1;
            segs.forEach((s, si) => {
                if (s.from < 0 || s.to >= v.words.length || s.from > s.to) problems.push('границы ' + si);
                if (s.from !== prevTo + 1) problems.push('разрыв перед ' + si);
                if (s.to - s.from + 1 > 8) problems.push('кусок длиной ' + (s.to - s.from + 1) + ' в ' + si);
                if (!s.russian) problems.push('нет перевода ' + si);
                prevTo = s.to;
            });
            if (prevTo !== v.words.length - 1) problems.push('стих покрыт не весь');
            return problems.length ? 'стих ' + (vi + 1) + ': ' + problems.join(', ') : null;
        }).filter(Boolean).join('; ')
    `);
    assert.strictEqual(bad, '', bad);
    app.close();
});

test('упражнения спрашивают только открытый день', () => {
    const app = loadApp(HEBREW);
    const w = app.window;
    w.showPrayer();

    w.startPrayerFill();
    const firstDay = app.get('HEBREW_READING_DATA.days[0]');
    assert.strictEqual(app.get('prayerExerciseState.total'), firstDay.to - firstDay.from + 1,
        '«заполни пропуски» собрано не по дню');

    // Смена дня снимает начатое упражнение: его вопросы относились к прошлому дню.
    w.setPrayerDay(5);
    assert.strictEqual(app.get('prayerExerciseState.total'), 0, 'упражнение пережило смену дня');
    assert.strictEqual(app.text('#prayerExerciseQuestion').trim(), '', 'вопрос прошлого дня остался на экране');

    w.startPrayerFill();
    const lastDay = app.get('HEBREW_READING_DATA.days[5]');
    assert.strictEqual(app.get('prayerExerciseState.total'), lastDay.to - lastDay.from + 1);
    assert.deepStrictEqual(app.errors, []);
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
