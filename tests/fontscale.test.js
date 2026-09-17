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

test('без настроек общий и греческий — единицы, еврейский крупнее', () => {
    const app = loadApp(GREEK);
    assert.strictEqual(token(app, '--app-font-scale'), '1');
    assert.strictEqual(token(app, '--app-greek-scale'), '1');
    // Огласовку кеглем интерфейса не разобрать — см. FONT_SCALE_AUTO_BASE.
    assert.strictEqual(token(app, '--app-hebrew-scale'), '1.2');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('еврейский по умолчанию 120% и остаётся привязанным к общему', () => {
    // Крупнее — но это основание для «как общий», а не отдельно заданный
    // размер: кнопки возврата быть не должно, возвращать нечего.
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    assert.strictEqual(w.effectiveFontScale('hebrew'), 1.2);
    assert.strictEqual(w.isFontScaleAuto('hebrew'), true);
    assert.strictEqual(app.document.getElementById('hebrewFontScaleValue').textContent, '120%');
    assert.strictEqual(app.document.getElementById('hebrewFontScaleReset').hidden, true);
    assert.strictEqual(app.document.getElementById('hebrewFontScaleState').textContent, 'как общий +20%');
    // Греческий такой прибавки не имеет: его диакритики стоят над строкой.
    assert.strictEqual(w.effectiveFontScale('greek'), 1);
    assert.strictEqual(app.document.getElementById('greekFontScaleState').textContent, 'как общий');
    app.close();
});

test('еврейское основание едет за общим, оставаясь на 20% выше', () => {
    const app = loadApp(GREEK);
    const w = app.window;

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

test('языковой размер по умолчанию следует за общим', () => {
    const app = loadApp(GREEK);
    const w = app.window;

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
    app.window.setFontScale('general', 1.2);
    assert.strictEqual(app.window.localStorage.getItem('app_font_scale'), '1.2');
    assert.notStrictEqual(app.window.localStorage.getItem('app_greek_font_scale'), '1.2');
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
    // Еврейский не трогали — он остался при общем, со своим основанием 1.2:
    // 1.2 × 1.2 = 1.44, ближайшее деление 1.45, добавка 1.45 / 1.2.
    assert.strictEqual(w.isFontScaleAuto('hebrew'), true);
    assert.strictEqual(token(app, '--app-hebrew-scale'), '1.2083');
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
    assert.strictEqual(second.window.isFontScaleAuto('greek'), true);
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
    // Языковой ползунок на «как общий» стоит там же, где общий, — иначе
    // пользователь не поймёт, какой размер у него сейчас на самом деле.
    assert.strictEqual(app.document.querySelector('[data-font-scale="greek"]').value, '1.2');
    assert.strictEqual(app.document.getElementById('greekFontScaleValue').textContent, '120%');
    assert.strictEqual(app.document.getElementById('greekFontScaleState').textContent, 'как общий');
    app.close();
});

test('кнопка возврата видна только у отвязанного языка', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.showSettings();

    const reset = app.document.getElementById('greekFontScaleReset');
    assert.strictEqual(reset.hidden, true, 'на «как общий» возвращать нечего');

    w.setFontScale('greek', 1.3);
    assert.strictEqual(reset.hidden, false);
    assert.strictEqual(app.document.getElementById('greekFontScaleState').textContent, 'задан отдельно');

    w.resetFontScale('greek');
    assert.strictEqual(reset.hidden, true);
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
    // самих файлов, а не переписывается сюда руками.
    const missing = [];
    const FILES = ['styles/base.css', 'styles/components.css', 'styles/screens.css', 'styles/settings.css'];
    for (const file of FILES) {
        const css = read(file);
        for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
            const [, selector, body] = m;
            const sel = selector.trim().split('\n').pop().trim();
            // Правило рисует текст изучаемого языка, если объявляет его
            // гарнитуру — или если метка стоит прямо в селекторе. Второй
            // признак ловит правила вроде .font-scale__sample.greek, которые
            // задают кегль сами, а гарнитуру наследуют.
            const draws = /--md-ref-typeface-(script|greek|hebrew)\b/.test(body);
            const marked = /\.(script|greek|hebrew)\b/.test(sel);
            if (!draws && !marked) continue;
            const size = body.match(/font-size: ([^;]+);/);
            if (!size) continue;
            if (/var\(--(md-ref-script-scale|app-greek-scale|app-hebrew-scale)\)/.test(size[1])) continue;
            missing.push(file + ' — ' + sel);
        }
    }
    assert.deepStrictEqual(missing, [],
        'кегль без множителя размера:\n  ' + missing.join('\n  '));
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
