// ============================================================
// РАЗМЕР ТЕКСТА
// ============================================================
// Три ползунка, два множителя. Общий едет в font-size корня, языковой —
// добавкой поверх него, и в этой арифметике вся суть: языковое значение
// хранится и показывается как абсолютное («130%»), а в CSS уходит
// относительное («на 8% крупнее общего»). Проверяем обе стороны.
//
// Как это ВЫГЛЯДИТ, jsdom не считает: calc() и var() он не разворачивает,
// поэтому здесь сверяются значения токенов на <html>, а не реальные кегли.
// Что текст на экране действительно вырос — только глазами в браузере.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { loadApp, repoPath } = require('./helpers/app.js');

const read = rel => fs.readFileSync(repoPath(rel), 'utf8');
const GREEK = { storage: { app_default_course: 'greek' } };
const HEBREW = { storage: { app_default_course: 'hebrew' } };

const token = (app, name) =>
    app.document.documentElement.style.getPropertyValue(name).trim();

// ------------------------------------------------------------ значения по умолчанию

test('без настроек языки стоят на верхнем делении, общий — на 100%', () => {
    const app = loadApp(GREEK);
    assert.strictEqual(token(app, '--app-font-scale'), '1');
    // Изучаемый текст открывается крупнее русского вокруг него — см.
    // FONT_SCALE_DEFAULT. При общем 1 добавка над корнем равна самому размеру.
    assert.strictEqual(token(app, '--app-greek-scale'), '1.6');
    assert.strictEqual(token(app, '--app-hebrew-scale'), '1.6');
    // Умолчание в хранилище не пишется: отсутствие ключа и есть «первый
    // заход». Запись заморозила бы его для всех, кто ползунка не касался.
    assert.strictEqual(app.window.localStorage.getItem('app_greek_font_scale'), null);
    assert.strictEqual(app.window.localStorage.getItem('app_hebrew_font_scale'), null);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('оба языка по умолчанию 160% и отвязаны от общего', () => {
    // Отдельно заданный размер, а не основание для «как общий»: значит и
    // кнопка возврата видна сразу — возвращать есть к чему.
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    for (const lang of ['greek', 'hebrew']) {
        assert.strictEqual(w.effectiveFontScale(lang), 1.6);
        assert.strictEqual(w.isFontScaleAuto(lang), false);
        assert.strictEqual(app.document.getElementById(lang + 'FontScaleValue').textContent, '160%');
        assert.strictEqual(app.document.getElementById(lang + 'FontScaleReset').hidden, false);
        assert.strictEqual(app.document.getElementById(lang + 'FontScaleState').textContent, 'задан отдельно');
        assert.strictEqual(app.document.querySelector('[data-font-scale="' + lang + '"]').value, '1.6');
    }
    app.close();
});

test("в хранилище 'auto' — выбор пользователя, а не первый заход", () => {
    // Пустой ключ и ключ 'auto' — разные вещи, и путать их нельзя: первый даёт
    // умолчание, второй означает, что язык вернули кнопкой к общему размеру.
    const app = loadApp({ storage: { app_default_course: 'greek', app_greek_font_scale: 'auto' } });
    assert.strictEqual(app.window.isFontScaleAuto('greek'), true);
    assert.strictEqual(app.window.effectiveFontScale('greek'), 1);
    // Иврита в хранилище нет — он на умолчании.
    assert.strictEqual(app.window.effectiveFontScale('hebrew'), 1.6);
    app.close();
});

test('еврейское основание едет за общим, оставаясь на 20% выше', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    // Основание — это состояние 'auto', то есть кнопка возврата. По умолчанию
    // язык на неё не смотрит, поэтому сначала возвращаем его к общему.
    w.resetFontScale('hebrew');

    w.setFontScale('general', 1.2);
    assert.strictEqual(w.effectiveFontScale('hebrew'), 1.45, '1.2 × 1.2 = 1.44, ближайшее деление шага');
    assert.strictEqual(w.isFontScaleAuto('hebrew'), true);

    w.setFontScale('general', 0.8);
    assert.strictEqual(w.effectiveFontScale('hebrew'), 0.95, '0.8 × 1.2 = 0.96, ближайшее деление');
    app.close();
});

test('у верхней границы прибавка срезается, и подпись это признаёт', () => {
    // 1.6 × 1.2 = 1.92 — за пределом ползунка, поставить туда бегунок нечем.
    // Обещать «+20%» в этом месте было бы неправдой.
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();
    w.resetFontScale('hebrew');

    w.setFontScale('general', 1.6);
    assert.strictEqual(w.effectiveFontScale('hebrew'), 1.6);
    assert.strictEqual(app.document.getElementById('hebrewFontScaleState').textContent, 'как общий');
    assert.strictEqual(token(app, '--app-hebrew-scale'), '1');
    app.close();
});

test('корень масштабируется от --app-font-scale, а не body', () => {
    // Вся шкала типографики M3 задана в rem, а rem считается от html.
    // Масштаб на body не дошёл бы ни до одного её класса — ровно эта ошибка
    // и была в первой попытке этой настройки.
    const base = read('styles/base.css');
    assert.match(base, /html \{[^}]*font-size: calc\(100% \* var\(--app-font-scale\)\)/,
        'общий масштаб не применён к html');
    assert.ok(!/^body \{[^}]*font-size: calc\(/m.test(base),
        'общий масштаб применён к body — до rem-классов он так не дойдёт');
});

// ------------------------------------------------------------ «как общий»

test('язык, возвращённый кнопкой, снова следует за общим', () => {
    const app = loadApp(GREEK);
    const w = app.window;

    w.resetFontScale('greek');
    w.resetFontScale('hebrew');
    w.setFontScale('general', 1.4);
    // Абсолютный размер греческого — тот же 1.4…
    assert.strictEqual(w.effectiveFontScale('greek'), 1.4);
    // …а в CSS уходит добавка поверх общего, то есть ровно 1.
    assert.strictEqual(token(app, '--app-font-scale'), '1.4');
    assert.strictEqual(token(app, '--app-greek-scale'), '1');
    assert.strictEqual(w.isFontScaleAuto('greek'), true);
    // У иврита основание 1.2, и 1.4 × 1.2 = 1.68 упирается в верхнюю границу.
    // Привязку к общему это не отменяет — см. отдельные проверки выше.
    assert.strictEqual(w.effectiveFontScale('hebrew'), 1.6);
    assert.strictEqual(w.isFontScaleAuto('hebrew'), true);
    app.close();
});

test('в хранилище лежит auto, а не копия общего', () => {
    // Копия замёрзла бы на том общем, какой стоял в момент записи, и дальше
    // перестала бы за ним следовать — та же причина, по которой тема хранит
    // 'system', а не вычисленную светлую.
    const app = loadApp(GREEK);
    app.window.resetFontScale('greek');
    app.window.setFontScale('general', 1.2);
    assert.strictEqual(app.window.localStorage.getItem('app_font_scale'), '1.2');
    assert.strictEqual(app.window.localStorage.getItem('app_greek_font_scale'), 'auto');
    app.close();
});

// ------------------------------------------------------------ отдельный размер

test('сдвинутый языковой ползунок отвязывается от общего', () => {
    const app = loadApp(GREEK);
    const w = app.window;

    w.setFontScale('general', 1.2);
    w.setFontScale('greek', 1.5);

    assert.strictEqual(w.isFontScaleAuto('greek'), false);
    assert.strictEqual(w.effectiveFontScale('greek'), 1.5);
    // 1.5 / 1.2 = 1.25: общий уже в корне, добавка достраивает до 1.5.
    assert.strictEqual(token(app, '--app-greek-scale'), '1.25');
    // Еврейский не трогали — он остался на своём размере по умолчанию, а
    // общий вырос: абсолютный 1.6 сохраняется, значит добавка падает до
    // 1.6 / 1.2. Иначе на экране он уехал бы вместе с корнем.
    assert.strictEqual(w.isFontScaleAuto('hebrew'), false);
    assert.strictEqual(token(app, '--app-hebrew-scale'), '1.3333');
    app.close();
});

test('отвязанный язык не едет за общим, но остаётся того же размера на экране', () => {
    const app = loadApp(GREEK);
    const w = app.window;

    w.setFontScale('greek', 1.5);
    w.setFontScale('general', 1.2);

    // Абсолютный размер греческого от движения общего не изменился…
    assert.strictEqual(w.effectiveFontScale('greek'), 1.5);
    // …значит добавка обязана пересчитаться, иначе на экране он уедет вместе с корнем.
    assert.strictEqual(token(app, '--app-greek-scale'), '1.25');
    app.close();
});

test('кнопка возврата снова привязывает язык к общему', () => {
    const app = loadApp(GREEK);
    const w = app.window;

    w.setFontScale('general', 1.1);
    w.setFontScale('hebrew', 1.6);
    assert.strictEqual(w.isFontScaleAuto('hebrew'), false);

    w.resetFontScale('hebrew');
    assert.strictEqual(w.isFontScaleAuto('hebrew'), true);
    // Возврат — к основанию письма, а не к голому общему: 1.1 × 1.2 = 1.32,
    // ближайшее деление шага — 1.3.
    assert.strictEqual(w.effectiveFontScale('hebrew'), 1.3);
    assert.strictEqual(app.window.localStorage.getItem('app_hebrew_font_scale'), 'auto');

    // А греческий возвращается ровно к общему.
    w.setFontScale('greek', 0.9);
    w.resetFontScale('greek');
    assert.strictEqual(w.effectiveFontScale('greek'), 1.1);
    assert.strictEqual(token(app, '--app-greek-scale'), '1');
    app.close();
});

test('общий ползунка возврата не имеет — следовать ему не за чем', () => {
    const app = loadApp(GREEK);
    app.window.setFontScale('general', 1.3);
    app.window.resetFontScale('general');
    // Вызов ничего не сломал и ничего не сбросил.
    assert.strictEqual(app.window.effectiveFontScale('general'), 1.3);
    assert.strictEqual(app.document.getElementById('generalFontScaleReset'), null);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

// ------------------------------------------------------------ границы и мусор

test('значение вне границ прижимается, а не растягивает текст во сколько попало', () => {
    const app = loadApp(GREEK);
    const w = app.window;

    w.setFontScale('general', 99);
    assert.strictEqual(w.effectiveFontScale('general'), 1.6);
    assert.strictEqual(token(app, '--app-font-scale'), '1.6');

    w.setFontScale('general', 0.1);
    assert.strictEqual(token(app, '--app-font-scale'), '0.8');
    app.close();
});

test('нечисловое значение не проходит и не обнуляет настройку', () => {
    const app = loadApp(GREEK);
    app.window.setFontScale('general', 1.3);
    app.window.setFontScale('general', '很大');
    assert.strictEqual(token(app, '--app-font-scale'), '1.3', 'мусор перетёр рабочее значение');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('мусор в хранилище читается как «как общий», а не как размер', () => {
    const app = loadApp({
        storage: { app_default_course: 'greek', app_font_scale: 'nonsense', app_greek_font_scale: 'nonsense' }
    });
    assert.strictEqual(token(app, '--app-font-scale'), '1');
    assert.strictEqual(app.window.isFontScaleAuto('greek'), true);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

// ------------------------------------------------------------ сохранение

test('настройка переживает перезапуск', () => {
    const storage = { app_default_course: 'greek' };
    const first = loadApp({ storage });
    first.window.setFontScale('general', 1.25);
    first.window.setFontScale('hebrew', 1.45);
    const saved = {
        app_default_course: 'greek',
        app_font_scale: first.window.localStorage.getItem('app_font_scale'),
        app_hebrew_font_scale: first.window.localStorage.getItem('app_hebrew_font_scale')
    };
    first.close();

    const second = loadApp({ storage: saved });
    assert.strictEqual(second.window.effectiveFontScale('general'), 1.25);
    assert.strictEqual(second.window.effectiveFontScale('hebrew'), 1.45);
    // Греческий не трогали, и в хранилище его нет — второй заход берёт
    // умолчание, а не подобранное значение первого.
    assert.strictEqual(second.window.isFontScaleAuto('greek'), false);
    assert.strictEqual(second.window.effectiveFontScale('greek'), 1.6);
    second.close();
});

test('размер общий для курсов, а не свой у каждого', () => {
    // Ключи с приставкой app_, как у темы: размер шрифта — настройка
    // приложения, и переключение курса его не трогает.
    const js = read('js/fontscale.js');
    assert.ok(!/courseKey\(/.test(js), 'размер не должен разводиться по курсам');
    for (const key of ['app_font_scale', 'app_greek_font_scale', 'app_hebrew_font_scale']) {
        assert.ok(js.includes("'" + key + "'"), 'нет ключа ' + key);
    }

    const app = loadApp(GREEK);
    app.window.setFontScale('general', 1.35);
    app.window.applyCourse('hebrew');
    assert.strictEqual(token(app, '--app-font-scale'), '1.35', 'смена курса сбросила размер');
    app.close();
});

// ------------------------------------------------------------ элементы управления

test('ползунки и подписи показывают действующий размер', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    w.setFontScale('general', 1.2);
    assert.strictEqual(app.document.querySelector('[data-font-scale="general"]').value, '1.2');
    assert.strictEqual(app.document.getElementById('generalFontScaleValue').textContent, '120%');
    // Языковой ползунок отвязан и стоит на своём размере — не там же, где
    // общий: подпись обязана показывать тот размер, что и в самом деле на
    // экране.
    assert.strictEqual(app.document.querySelector('[data-font-scale="greek"]').value, '1.6');
    assert.strictEqual(app.document.getElementById('greekFontScaleValue').textContent, '160%');
    assert.strictEqual(app.document.getElementById('greekFontScaleState').textContent, 'задан отдельно');
    app.close();
});

test('кнопка возврата видна только у отвязанного языка', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    const reset = app.document.getElementById('greekFontScaleReset');
    const state = app.document.getElementById('greekFontScaleState');
    // По умолчанию язык отвязан — возвращать есть к чему.
    assert.strictEqual(reset.hidden, false);
    assert.strictEqual(state.textContent, 'задан отдельно');

    w.resetFontScale('greek');
    assert.strictEqual(reset.hidden, true, 'на «как общий» возвращать нечего');
    assert.strictEqual(state.textContent, 'как общий');

    w.setFontScale('greek', 1.3);
    assert.strictEqual(reset.hidden, false);
    assert.strictEqual(state.textContent, 'задан отдельно');
    app.close();
});

test('ползунки объявлены с одними границами и шагом', () => {
    const app = loadApp(GREEK);
    for (const which of ['general', 'greek', 'hebrew']) {
        const input = app.document.querySelector('[data-font-scale="' + which + '"]');
        assert.ok(input, 'нет ползунка ' + which);
        assert.strictEqual(input.getAttribute('type'), 'range');
        assert.strictEqual(input.getAttribute('min'), '0.8');
        assert.strictEqual(input.getAttribute('max'), '1.6');
        assert.strictEqual(input.getAttribute('step'), '0.05');
        // Подпись связана с ползунком — иначе у него нет доступного имени.
        const label = app.document.querySelector('label[for="' + input.id + '"]');
        assert.ok(label, 'у ползунка ' + which + ' нет подписи');
    }
    app.close();
});

// ------------------------------------------------------------ образцы

test('образцы взяты из данных побайтово, а не набраны заново', () => {
    // У комбинирующих знаков иврита нет канонического порядка: набранное
    // руками слово выглядит так же и является другой строкой. Тот же запрет,
    // что в AGENTS.md для данных уроков.
    const html = read('index.html');

    const lessons = new Function(read('data/lessons.js') + '; return LESSONS_DATA;')();
    const hebrew = new Function(read('data/hebrew-lessons.js') + '; return HEBREW_LESSONS_DATA;')();
    const pick = (data, lesson, translation) =>
        data[lesson].vocabulary.find(v => v.translation === translation).greek;

    const greekSample = pick(lessons, 4, 'человек');
    const hebrewSample = pick(hebrew, 5, 'правосудие, суд, приговор, справедливость');

    assert.ok(html.includes(greekSample), 'греческий образец разошёлся с данными');
    assert.ok(html.includes(hebrewSample), 'еврейский образец разошёлся с данными');

    // Порядок знаков — как в пособии: согласная, дагеш, точка шина, огласовка.
    // NFC переставил бы огласовку перед дагешем; проверяем, что этого не было.
    assert.notStrictEqual(hebrewSample.indexOf('ּ'), -1, 'в образце нет дагеша');
    assert.ok(hebrewSample.indexOf('ּ') < hebrewSample.indexOf('ָ'),
        'дагеш оказался после огласовки — строку переписали или нормализовали');
});

test('образец каждого языка помечен своим языком, а не текущим курсом', () => {
    // .script — «письмо текущего курса»: на экране настроек он показал бы оба
    // образца шрифтом открытого курса, и еврейский в греческом курсе остался
    // бы без единого глифа.
    const app = loadApp(GREEK);
    app.window.showSettings();
    assert.ok(app.document.querySelector('.font-scale__sample.greek'), 'греческий образец не помечен .greek');
    assert.ok(app.document.querySelector('.font-scale__sample.hebrew'), 'еврейский образец не помечен .hebrew');
    assert.strictEqual(app.document.querySelector('.font-scale__sample.script'), null,
        'образец помечен .script — он поедет за курсом, а не за своим ползунком');
    app.close();
});

test('образец задаёт кегль вместе с множителем своего языка', () => {
    // Разбор каскада здесь нужен точечно, и вот почему. Кегль образца задан
    // в settings.css, а множитель приходит от .greek/.hebrew в base.css —
    // специфичность одинаковая, settings.css подключается позже и молча
    // выигрывает. Образец тогда стоит на месте при любом ползунке.
    // Проверить это вычисленным стилем нельзя: jsdom не разворачивает
    // ни calc(), ни var(), — поэтому сверяем сами правила.
    const css = read('styles/settings.css');
    for (const lang of ['greek', 'hebrew']) {
        const re = new RegExp('\\.font-scale__sample\\.' + lang +
            '\\s*\\{[^}]*font-size: calc\\([^}]*var\\(--app-' + lang + '-scale\\)');
        assert.match(css, re,
            'образец ' + lang + ' не берёт множитель своего ползунка — он перестанет меняться');
    }
});

test('образцы видны в обоих курсах', () => {
    for (const opts of [GREEK, HEBREW]) {
        const app = loadApp(opts);
        app.window.showSettings();
        assert.strictEqual(app.document.querySelectorAll('.font-scale__sample').length, 2);
        assert.deepStrictEqual(app.errors, []);
        app.close();
    }
});

// ------------------------------------------------------------ полнота охвата

test('каждый кегль текста изучаемого языка несёт множитель ползунка', () => {
    // Забытое правило — это кусок экрана, который не слушается настройки:
    // онлайн незаметно, пользователю — нет. Поэтому список правил берётся из
    // самих файлов, а не переписывается сюда руками. layout.css в списке не
    // случайно: его узкий экран перебивает кегли своими, и именно там
    // множитель однажды и потерялся — на телефоне условие иврита было того
    // же размера, что греческое.
    const missing = [];
    const FILES = ['styles/base.css', 'styles/components.css', 'styles/screens.css',
        'styles/settings.css', 'styles/layout.css'];
    for (const file of FILES) {
        const css = read(file);
        for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
            const [, selector, body] = m;
            const sel = selector.trim().split('\n').pop().trim();
            // Правило рисует текст изучаемого языка, если объявляет его
            // гарнитуру, если метка стоит прямо в селекторе — или если оно
            // ветвится по письму курса. Третий признак ловит правила вроде
            // :root[data-script="hebrew"] .flashcard-word: своего класса
            // .script у них нет, а кегль они задают свой.
            const draws = /--md-ref-typeface-(script|greek|hebrew)\b/.test(body);
            const marked = /\.(script|greek|hebrew)\b|\[data-script/.test(sel);
            if (!draws && !marked) continue;
            // Намеренные исключения: буквы-знаки курса. Это не текст для
            // чтения, а знак фиксированного роста вместо иконки — буква на
            // круглой плашке стартового экрана (.course-card__glyph) и та же
            // буква в переключателе курса в настройках (.course-glyph).
            // Кегль там в px, и это закреплено отдельной проверкой ниже,
            // чтобы исключение не превратилось в забытое правило.
            // Третий такой случай — заголовок словарной статьи: его кегль
            // закреплён по просьбе владельца (словарь не должен ехать за
            // ползунками), тоже в px и тоже закреплён проверкой ниже.
            // Четвёртый — пример употребления: он читается там же, в строке
            // словаря и в «В словосочетании», и закреплён так же.
            if (sel.indexOf('.course-card__glyph') !== -1 ||
                sel.indexOf('.course-glyph') !== -1 ||
                sel.indexOf('.word-item .word-row strong') !== -1 ||
                sel.indexOf('.vocab-example__script') !== -1) continue;
            const size = body.match(/font-size: ([^;]+);/);
            if (!size) continue;
            if (/var\(--(md-ref-script-scale|md-ref-script-size|app-greek-scale|app-hebrew-scale)\)/.test(size[1])) continue;
            missing.push(file + ' — ' + sel);
        }
    }
    assert.deepStrictEqual(missing, [],
        'кегль без множителя размера:\n  ' + missing.join('\n  '));
});

test('коробка строки карточки иврита не меньше её кегля', () => {
    // Кегль карточки растёт шагом письма (у иврита это 1.6), а высота строки
    // была записана просто в rem и за шагом не шла. Коробка строки выходила
    // меньше самих букв: чернила с огласовкой вылезали из неё вниз, и чтение
    // под словом липло к буквам — запас между словом и чтением на карточке
    // сходил с 8px до 5px. Оба правила иврита — базовое (styles/screens.css)
    // и мобильное (styles/layout.css) — обязаны нести тот же множитель, что
    // и кегль.
    const rules = [];
    for (const file of ['styles/screens.css', 'styles/layout.css']) {
        const css = read(file);
        for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
            const sel = m[1].trim().split('\n').pop().trim();
            if (sel.indexOf('[data-script="hebrew"] .flashcard-word') === -1) continue;
            rules.push({ file, sel, body: m[2] });
        }
    }
    assert.strictEqual(rules.length, 2,
        'правил кегля карточки иврита ожидается два — широкий экран и узкий, а нашлось ' + rules.length);
    for (const r of rules) {
        const size = r.body.match(/font-size:\s*([^;]+);/);
        assert.ok(size && /var\(--md-ref-script-scale\)/.test(size[1]),
            r.file + ' — ' + r.sel + ': кегль без множителя ползунка');
        const lh = r.body.match(/line-height:\s*([^;]+);/);
        assert.ok(lh, r.file + ' — ' + r.sel + ': нет высоты строки');
        assert.ok(/var\(--md-ref-script-scale\)/.test(lh[1]),
            r.file + ' — ' + r.sel + ': высота строки без множителя, коробка меньше букв: ' + lh[1]);
    }
});

test('кегль словарной статьи закреплён, свой у каждого письма и не едет за ползунками', () => {
    // Словарь листают, а не читают: заголовок статьи — единственный текст
    // изучаемого языка, отвязанный от ползунков размера. Значение живёт
    // токеном в px, со своей величиной у каждого письма (иврит чуть крупнее:
    // огласовка сидит внутри буквы), а ветку выбирает курс через
    // data-script — ровно как у гарнитуры, шага и направления. Проверяем
    // и токены, и то, что правило берёт именно токен: вернуть туда шаг с
    // ползунком — значит потерять просьбу владельца молча.
    const tokens = read('styles/tokens.css');
    const greek = tokens.match(/--md-ref-script-headword-size: (\d+)px;/);
    assert.ok(greek, 'кегль словарной статьи не задан');
    const hebrew = tokens.match(/:root\[data-script="hebrew"\] \{[\s\S]*?--md-ref-script-headword-size: (\d+)px;/);
    assert.ok(hebrew, 'ивриту не задан свой кегль словарной статьи');
    assert.ok(Number(hebrew[1]) > Number(greek[1]),
        'ивритская статья должна быть чуть крупнее греческой — огласовка теснее');

    const css = read('styles/screens.css');
    const at = css.indexOf('\n.word-item .word-row strong {');
    assert.notStrictEqual(at, -1, 'правила словарной статьи нет');
    const body = css.slice(at, css.indexOf('}', at));
    const size = body.match(/font-size: ([^;]+);/);
    assert.strictEqual(size[1].trim(), 'var(--md-ref-script-headword-size)',
        'кегль словарной статьи снова считает себя от ползунков');
    // Строка списка у греческого остаётся M3-минимумом 56px: 24px × 1.3 +
    // 16px отступов — 47.2px. У иврита статья крупнее (40px × 1.3 + 16px —
    // 68px), и его строка выходит заметно выше минимума: так просил
    // владелец, читаемой огласовке нужно больше места.
    assert.match(css, /\.word-item \.word-row \{[^}]*min-height: 56px/, 'строка словаря потеряла высоту M3');
    assert.match(body, /line-height: 1\.3/, 'высота строки статьи разошлась с кеглем');
});

test('пример употребления закреплён так же, как статья, и свой у каждого письма', () => {
    // Пример читают в списке, а не подряд, и он живёт в том же компоненте в
    // двух местах — раскрытая статья словаря и «В словосочетании» под
    // карточкой. Оба места — одно правило, поэтому отдельного правила для
    // статьи быть не должно: пока их было два, статья поднимала пример шагом
    // кегля до 40.8px, то есть пример выходил крупнее самого слова.
    const tokens = read('styles/tokens.css');
    const greek = tokens.match(/--md-ref-script-example-size: (\d+)px;/);
    assert.ok(greek, 'кегль примера не задан');
    const hebrew = tokens.match(/:root\[data-script="hebrew"\] \{[\s\S]*?--md-ref-script-example-size: (\d+)px;/);
    assert.ok(hebrew, 'ивриту не задан свой кегль примера');
    assert.ok(Number(hebrew[1]) > Number(greek[1]),
        'ивритский пример должен быть чуть крупнее греческого — огласовка теснее');

    const head = tokens.match(/--md-ref-script-headword-size: (\d+)px;/);
    assert.ok(Number(greek[1]) < Number(head[1]),
        'пример не должен перекрывать статью: слово читается первым');

    const css = read('styles/components.css');
    assert.strictEqual(css.indexOf('.word-details .vocab-example__script'), -1,
        'у примера снова два кегля — статья и карточка разойдутся');
    const at = css.indexOf('\n.vocab-example__script {');
    assert.notStrictEqual(at, -1, 'правила примера нет');
    const body = css.slice(at, css.indexOf('}', at));
    const size = body.match(/font-size: ([^;]+);/);
    assert.strictEqual(size[1].trim(), 'var(--md-ref-script-example-size)',
        'кегль примера снова считает себя от ползунков');
    // Строка числом: закреплённый кегль не смеет идти за общим ползунком.
    assert.match(body, /line-height: 1\.4;/, 'высота строки примера отвязалась от кегля');
});

test('буквы-знаки курса не едут за ползунками размера', () => {
    // Те самые исключения из проверки выше, и они намеренные: бейдж курса —
    // круглая плашка фиксированного диаметра (48px), буква в нём должна
    // оставаться одного размера на всём диапазоне ползунка. Раньше кегль был
    // в rem с языковым множителем: на 160% «Ω» вырастала до 48px, то есть до
    // самого диаметра, а ивритская «א» — до 53.76px и вылезала за плашку.
    // В настройках буква стоит там, где раньше стояла иконка книги, и растёт
    // вместе с ней (18px), а не вместе с текстом урока.
    const marks = [
        ['styles/screens.css', '.course-card__glyph.', 'на бейдже курса'],
        ['styles/settings.css', '.course-glyph.', 'в переключателе курса']
    ];
    for (const [file, prefix, what] of marks) {
        const css = read(file);
        for (const lang of ['greek', 'hebrew']) {
            // Ищем все вхождения, а не первое: у знака в настройках есть ещё
            // правило на узком экране, и оно тоже должно остаться в px.
            let at = css.indexOf(prefix + lang);
            assert.notStrictEqual(at, -1, 'нет правила ' + prefix + lang);
            while (at !== -1) {
                const body = css.slice(at, css.indexOf('}', at));
                const size = body.match(/font-size: ([^;]+);/);
                assert.ok(size, 'у знака ' + what + ' (' + lang + ') не задан кегль');
                assert.match(size[1].trim(), /^\d+px$/,
                    'кегль знака ' + what + ' (' + lang + ') снова масштабируется: ' + size[1].trim());
                at = css.indexOf(prefix + lang, at + 1);
            }
        }
    }
});

test('буквы и знаки алфавита закреплены и не едут за ползунками размера', () => {
    // Алфавит и огласовку листают и узнают, а не читают подряд, поэтому их
    // кегль отвязан от ползунков — та же просьба владельца, что у словарной
    // статьи и примера. Кегль закреплён в px значением, которое прежняя
    // формула давала при ползунке 160% (шаг × ползунок на экране по
    // умолчанию), поэтому по умолчанию ничего не изменилось. Возврат туда
    // max() с var(--md-ref-script-scale) — молчаливая потеря закрепления,
    // поэтому держим тройку правил текстом: таблица алфавита (греческий
    // урок 1 и иврит глава 1), таблица «бегадкефат» (глава 1) и таблица
    // огласовок (глава 2).
    const css = read('styles/screens.css');
    const pinned = [
        ['.md-table--alphabet .alphabet-glyph', '44.8px', 'буква таблицы алфавита'],
        ['.grammar-text .md-table--begadkefat td[lang="he"]', '38.4px', 'буква таблицы «бегадкефат»'],
        ['.md-table--pool .md-table-pool__glyph', '35.2px', 'знак огласовки']
    ];
    for (const [sel, px, what] of pinned) {
        const at = css.indexOf('\n' + sel + ' {');
        assert.notStrictEqual(at, -1, 'нет правила: ' + sel);
        const body = css.slice(at, css.indexOf('}', at));
        const size = body.match(/font-size: ([^;]+);/);
        assert.ok(size, 'у ' + what + ' не задан кегль');
        assert.strictEqual(size[1].trim(), px,
            what + ' снова считает себя от ползунков: ' + size[1].trim());
        assert.strictEqual(body.indexOf('var(--md-ref-script-scale)'), -1,
            what + ' вернулась к множителю ползунка');
    }
});

test('шаг кегля изучаемого языка свой у каждого письма и не подменяет ползунок', () => {
    // Шаг (--md-ref-script-size) и ползунок (--md-ref-script-scale) — разные
    // величины: первый отвечает за то, что изучаемое крупнее русского, второй
    // — за настройку размера текста. Подменить шаг ползунком значит потерять
    // либо первое, либо второе, поэтому проверяем и токены, и то, что правила
    // целей умножают оба.
    const tokens = read('styles/tokens.css');
    assert.match(tokens, /--md-ref-script-size-greek: 1\.5;/,
        'греческому не задан шаг кегля');
    assert.match(tokens, /--md-ref-script-size-hebrew: 1\.6;/,
        'ивриту не задан шаг кегля');
    assert.match(tokens, /:root \{[\s\S]*?--md-ref-script-size: var\(--md-ref-script-size-greek\)/,
        'по умолчанию шаг должен быть греческим');
    assert.match(tokens, /:root\[data-script="hebrew"\] \{[\s\S]*?--md-ref-script-size: var\(--md-ref-script-size-hebrew\)/,
        'в еврейском курсе шаг не переключается на еврейский');

    // Селектор ищется как текст, а не регуляркой: эти селекторы содержат
    // точки и запятые, и собирать из них шаблон — значит держать в голове
    // двойное экранирование вместо самой проверки. Поиск с начала строки —
    // потому что .question .script встречается ещё и вторым селектором
    // в правиле веса (.question b, .question .script), и без якоря нашлось бы
    // оно, а не то правило, которое задаёт кегль.
    const ruleBody = (css, sel) => {
        const at = css.indexOf('\n' + sel + ' {');
        return at === -1 ? null : css.slice(at, css.indexOf('}', at));
    };
    const screens = read('styles/screens.css');
    const TARGETS = ['.grammar-p .script, .grammar-h .script, .grammar-list .script',
        '.question .script', '.md-prompt-strong', '.options--script .option-btn'];
    for (const sel of TARGETS) {
        const body = ruleBody(screens, sel);
        assert.ok(body, sel + ' — правила нет');
        assert.ok(body.includes('var(--md-ref-script-size)') &&
            body.includes('var(--md-ref-script-scale)'),
            sel + ' — нет шага кегля или множителя ползунка');
    }
    // Пример в раскрытой словарной статье живёт в components.css и набран тем
    // же шагом: это тоже текст для чтения, а не подпись строки списка.
    const bankBody = ruleBody(read('styles/components.css'),
        '.word-bank--script .chip, .build-area--script .token');
    assert.ok(bankBody && bankBody.includes('var(--md-ref-script-size)') &&
        bankBody.includes('var(--md-ref-script-scale)'),
        'фишки банка слов отстали от вариантов ответа');
});

test('подписи нижнего ряда не растут без предела', () => {
    // Пять назначений — максимум по M3, ряд фиксированной высоты, и на
    // масштабе 160% подписи переставали помещаться в ширину телефона и
    // слипались в сплошную строку. Потолок задан в двух местах, потому что
    // узкий экран перебивает базовое правило своим кеглем; забыть второй —
    // значит вернуть слипание ровно там, где места меньше всего.
    const base = read('styles/base.css');
    const layout = read('styles/layout.css');
    assert.match(base, /\.md-nav-item__label \{[^}]*font-size: min\(/,
        'базовой подписи не задан потолок кегля');
    assert.match(layout, /\.md-nav-item__label \{ font-size: min\(/,
        'на узком экране потолок кегля потерян — там подписи и слипаются первыми');
    // Многоточие как страховка: потолок подобран под русские подписи, а они
    // могут поменяться.
    assert.match(base, /\.md-nav-item__label \{[^}]*text-overflow: ellipsis/);
    assert.match(base, /\.md-nav-item \{[^}]*min-width: 0/,
        'без min-width: 0 flex-элемент не ужимается и многоточие не сработает');
});

test('ползунок выкрашен токенами, а не фиксированными цветами', () => {
    const css = read('styles/settings.css');
    const block = css.slice(css.indexOf('.md-slider'));
    const literals = block.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    assert.deepStrictEqual(literals, [], 'в ползунке фиксированные цвета: ' + literals.join(', '));
    assert.match(block, /--md-sys-color-primary/, 'активная часть дорожки не из токена');
});

// ------------------------------------------------------------ расширенные настройки

test('языковые ползунки свёрнуты под «Расширенными настройками»', () => {
    // Карточка размера текста была очень высокой: три ползунка с образцами
    // подряд. Общий остаётся видимым, языковые прячутся под раскрывающийся
    // заголовок — тем же приёмом, что примеры в словаре (.open + max-height).
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    const toggle = app.document.getElementById('fontScaleAdvancedToggle');
    const body = app.document.getElementById('fontScaleAdvancedBody');
    assert.ok(toggle && body, 'нет раскрывающегося блока размера текста');
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false', 'блок открыт по умолчанию');
    assert.strictEqual(body.classList.contains('open'), false, 'тело блока открыто по умолчанию');

    // Языковые ползунки лежат именно внутри тела, а не просто рядом.
    for (const which of ['greek', 'hebrew']) {
        const input = app.document.querySelector('[data-font-scale="' + which + '"]');
        assert.ok(body.contains(input), which + ': ползунок не спрятан под раскрывающийся блок');
    }
    // Общий — снаружи, он виден всегда.
    assert.strictEqual(body.contains(app.document.querySelector('[data-font-scale="general"]')), false,
        'общий ползунок попал в свёрнутый блок');

    toggle.click();
    assert.strictEqual(body.classList.contains('open'), true);
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'true');
    toggle.click();
    assert.strictEqual(body.classList.contains('open'), false);
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false');
    app.close();
});
