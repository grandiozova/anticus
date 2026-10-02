// ============================================================
// ШРИФТ ИНТЕРФЕЙСА И РУССКОГО ТЕКСТА
// ============================================================
// Выбор пользователя — один токен --font-ru на <html> (js/fontpicker.js), а
// сами гарнитуры и их @font-face лежат в styles/tokens.css. Проверяем три
// вещи: что выбор читается и пишется под общим ключом app_font, что список в
// настройках собран целиком, и что ни один файл шрифта не забыт на диске и в
// офлайн-кэше. Как это выглядит на экране, jsdom не знает (var() он не
// разворачивает) — шрифты и разницу начертаний смотрят глазами в браузере.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const { loadApp, repoPath } = require('./helpers/app.js');

const read = rel => fs.readFileSync(repoPath(rel), 'utf8');
const GREEK = { storage: { app_default_course: 'greek' } };

const token = (app, name) =>
    app.document.documentElement.style.getPropertyValue(name).trim();

// id вариантов берём из самого кода, а не переписываем сюда руками: список —
// предмет этой настройки, и тест обязан ловить его изменение.
const choiceIds = () => {
    const app = loadApp(GREEK);
    const ids = app.get('FONT_CHOICES').map(c => c.id);
    app.close();
    return ids;
};

// ------------------------------------------------------------ чтение и запись

test('без настроек шрифт — системный, и в хранилище пусто', () => {
    const app = loadApp(GREEK);
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-system)');
    // Отсутствие ключа и есть «первый заход»: писать умолчание значило бы
    // заморозить его для всех, кто настройку не трогал.
    assert.strictEqual(app.window.localStorage.getItem('app_font'), null);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('выбранный шрифт поднимается из хранилища до первой отрисовки', () => {
    const app = loadApp({ storage: { app_default_course: 'greek', app_font: 'pt-serif' } });
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-pt-serif)');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('мусор в ключе не роняет старт и даёт системный шрифт', () => {
    const app = loadApp({ storage: { app_default_course: 'greek', app_font: 'комик-санс' } });
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-system)');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('выбор сохраняется и меняет токен; чужой id игнорируется', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.setFontChoice('literata');
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-literata)');
    assert.strictEqual(app.window.localStorage.getItem('app_font'), 'literata');

    // Не тот id — не выбор: не должно ни писаться, ни ломать текущее состояние.
    w.setFontChoice('нет-такого');
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-literata)');
    assert.strictEqual(app.window.localStorage.getItem('app_font'), 'literata');
    app.close();
});

test('выбор переживает перезапуск', () => {
    const storage = { app_default_course: 'greek' };
    const first = loadApp({ storage });
    first.window.setFontChoice('inter');
    const saved = first.window.localStorage.getItem('app_font');
    first.close();

    const second = loadApp({ storage: { app_default_course: 'greek', app_font: saved } });
    assert.strictEqual(token(second, '--font-ru'), 'var(--font-ru-inter)');
    second.close();
});

test('настройка общая для приложения, а не для курса', () => {
    // Тот же выбор в обоих курсах: ключ с приставкой app_, а не courseKey.
    for (const course of ['greek', 'hebrew']) {
        const app = loadApp({
            storage: { app_default_course: course, app_font: 'source-serif-4' }
        });
        assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-source-serif-4)');
        app.close();
    }
});

// ------------------------------------------------------------ список в настройках

test('в настройках перечислены все варианты, и выбранный отмечен', () => {
    const app = loadApp({ storage: { app_default_course: 'greek', app_font: 'noto-sans' } });
    app.window.showSettings();
    const options = [...app.document.querySelectorAll('#fontList .font-option')];
    // Сравниваем строками: массивы из другого realm не проходят deepStrictEqual
    // по прототипу (см. helpers/app.js).
    assert.strictEqual(options.map(o => o.getAttribute('data-font')).join(', '),
        choiceIds().join(', '),
        'список в разметке разошёлся с FONT_CHOICES');
    // У каждого варианта есть имя, набранное своей же гарнитурой.
    for (const o of options) {
        assert.ok(o.querySelector('.font-option__name').textContent.trim(), 'нет имени варианта');
        assert.strictEqual(o.querySelector('.font-option__sample'), null,
            'образец строки должен быть убран — меняется весь экран вокруг');
    }
    const checked = options.filter(o => o.getAttribute('aria-checked') === 'true');
    assert.strictEqual(checked.length, 1);
    assert.strictEqual(checked[0].getAttribute('data-font'), 'noto-sans');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('нажатие на вариант ставит отметку и меняет шрифт', () => {
    const app = loadApp(GREEK);
    app.window.showSettings();
    const btn = app.document.querySelector('#fontList [data-font="pt-sans"]');
    btn.click();
    assert.strictEqual(btn.getAttribute('aria-checked'), 'true');
    assert.strictEqual(app.document.querySelectorAll('#fontList [aria-checked="true"]').length, 1);
    assert.strictEqual(token(app, '--font-ru'), 'var(--font-ru-pt-sans)');
    app.close();
});

test('список шрифтов спрятан под «Выбрать шрифт»', () => {
    const app = loadApp(GREEK);
    app.window.showSettings();
    const toggle = app.document.getElementById('fontPickerToggle');
    const body = app.document.getElementById('fontPickerBody');
    assert.ok(toggle && body, 'нет раскрывающегося блока выбора шрифта');
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false', 'блок открыт по умолчанию');
    assert.strictEqual(body.classList.contains('open'), false, 'тело блока открыто по умолчанию');
    assert.ok(body.contains(app.document.getElementById('fontList')), 'список не спрятан в теле');

    toggle.click();
    assert.strictEqual(body.classList.contains('open'), true);
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'true');
    toggle.click();
    assert.strictEqual(body.classList.contains('open'), false);
    assert.strictEqual(toggle.getAttribute('aria-expanded'), 'false');
    app.close();
});

// ------------------------------------------------------------ изучаемый язык не тронут

test('текст изучаемого языка берёт свои гарнитуры, а не русскую', () => {
    // Комментарии вырезаем: слово «--font-ru» или «.script» в пояснении —
    // не правило, и по нему тест ловил бы прозу, а не CSS.
    const css = read('styles/base.css').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        const sel = m[1].trim().replace(/\s+/g, ' ');
        if (!/\.(script|greek|hebrew)\b/.test(sel)) continue;
        assert.doesNotMatch(m[2], /var\(--font-ru\)/,
            'русская гарнитура попала в правило: ' + sel);
    }
    assert.match(css, /font-family: var\(--md-ref-typeface-script\)/);
    assert.match(css, /font-family: var\(--md-ref-typeface-greek\)/);
    assert.match(css, /font-family: var\(--md-ref-typeface-hebrew\)/);
});

// ------------------------------------------------------------ файлы и офлайн

test('каждый @font-face ссылается на существующий файл без внешней CDN', () => {
    const css = read('styles/tokens.css');
    const srcs = [...css.matchAll(/@font-face\s*\{[^}]*?url\('([^']+)'\)[^}]*?\}/g)].map(m => m[1]);
    assert.ok(srcs.length > 0, 'в styles/tokens.css нет @font-face');
    for (const src of srcs) {
        assert.doesNotMatch(src, /^https?:/, 'шрифт тянется извне: ' + src);
        assert.ok(fs.existsSync(repoPath('styles', src)), 'нет файла шрифта: ' + src);
    }
    // Каждому @font-face — font-display: swap, иначе текст пропадает, пока
    // файл грузится.
    const blocks = css.match(/@font-face\s*\{[^}]*\}/g) || [];
    for (const b of blocks) assert.match(b, /font-display: swap/);
});

test('все файлы шрифтов предзагружены сервис-воркером', () => {
    const css = read('styles/tokens.css');
    const files = [...css.matchAll(/url\('\.\.\/(fonts\/[^']+)'\)/g)].map(m => m[1]);
    assert.ok(files.length > 0, 'не нашлось ссылок на fonts/');
    const sw = read('sw.js');
    for (const f of files) {
        assert.ok(sw.includes("'./" + f + "'"), 'нет в CORE_ASSETS: ' + f);
    }
    // Каждое семейство — только latin и cyrillic: ничего лишнего не грузим.
    for (const f of files) assert.match(f, /-(cyrillic|latin)(-\d+)?\.woff2$/);
});
