// ============================================================
// ШРИФТ ИНТЕРФЕЙСА И РУССКОГО ТЕКСТА
// ============================================================
// Пользователь выбирает гарнитуру для русского текста и интерфейса. Выбор — это
// один токен --font-ru на <html>: его берут body и те немногие правила, что
// задают шрифт интерфейса сами (styles/base.css, styles/components.css).
// Текст изучаемого языка сюда не смотрит — у него свой токен
// --md-ref-typeface-script и классы .script/.greek/.hebrew, поэтому ни греческий,
// ни иврит от этой настройки не меняются.
//
// Имён гарнитур в этом файле нет: id варианта — это суффикс токена
// --font-ru-<id> (styles/tokens.css), а сам стек со семейством и @font-face
// объявлен там же, в одном месте. Поэтому JS знает только идентификаторы, и
// добавить шрифт — это запись здесь плюс токен с @font-face в CSS.
//
// Настройка общая для приложения, а не курсовая, поэтому ключ с приставкой
// app_, как у темы и размера текста. Отсутствие ключа — первый заход, тогда
// «системный»: ровно то, что было до появления выбора.

const FONT_STORAGE_KEY = 'app_font';
const FONT_DEFAULT = 'system';

// label — человеческое имя для списка настроек, id — имя токена. Образца
// строки рядом с ним нет намеренно: имя набрано своей же гарнитурой, а всё
// вокруг меняется сразу после нажатия — сравнивать больше нечего.
const FONT_CHOICES = [
    { id: 'system', label: 'Системный' },
    { id: 'pt-sans', label: 'PT Sans' },
    { id: 'noto-sans', label: 'Noto Sans' },
    { id: 'inter', label: 'Inter' },
    { id: 'pt-serif', label: 'PT Serif' },
    { id: 'literata', label: 'Literata' },
    { id: 'source-serif-4', label: 'Source Serif 4' }
];

let fontChoice = FONT_DEFAULT;

function isFontChoice(id) {
    return FONT_CHOICES.some(c => c.id === id);
}

// Единственное место, где выбор превращается в токен. Значение — ссылка на
// токен гарнитуры, а не сам стек: так семейство остаётся в CSS.
function applyFontChoice() {
    document.documentElement.style.setProperty('--font-ru', 'var(--font-ru-' + fontChoice + ')');
}

// Читаем до первой отрисовки (js/boot.js, рядом с initFontScale): выбранный
// шрифт должен встать сразу, иначе страница успеет показаться в прежнем.
function initFontChoice() {
    let raw = readStore(FONT_STORAGE_KEY);
    fontChoice = isFontChoice(raw) ? raw : FONT_DEFAULT;
    applyFontChoice();
}

function setFontChoice(id) {
    if (!isFontChoice(id)) return;
    fontChoice = id;
    writeStore(FONT_STORAGE_KEY, id);
    applyFontChoice();
    syncFontChoiceControls();
}

function syncFontChoiceControls() {
    let box = document.getElementById('fontList');
    if (!box) return;
    box.querySelectorAll('[data-font]').forEach(btn => {
        btn.setAttribute('aria-checked', btn.getAttribute('data-font') === fontChoice ? 'true' : 'false');
    });
}

// Список строится заново при каждом открытии настроек — как список лицензий:
// вариант может быть выбран из другого места, и отметку проще поставить при
// сборке, чем синхронизировать отдельно.
function renderFontList() {
    let box = document.getElementById('fontList');
    if (!box) return;
    box.innerHTML = FONT_CHOICES.map(c => {
        let checked = c.id === fontChoice ? 'true' : 'false';
        return '<button type="button" class="font-option" role="radio" aria-checked="' + checked +
            '" data-font="' + escArg(c.id) + '" onclick="setFontChoice(\'' + escArg(c.id) + '\')">' +
            '<span class="font-option__name">' + escHtml(c.label) + '</span>' +
            '<span class="msym font-option__check">check</span>' +
        '</button>';
    }).join('');
}
