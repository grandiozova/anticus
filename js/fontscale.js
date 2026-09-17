// ============================================================
// РАЗМЕР ТЕКСТА
// ============================================================
// Три ползунка: общий, греческий, еврейский. Размер — настройка приложения,
// а не курса, поэтому ключи с приставкой app_, как у темы.
//
// Два множителя на три ползунка
// -----------------------------
// Общий масштаб применяется к font-size корня (html в styles/base.css), а вся
// шкала типографики M3 задана в rem — значит он уже доехал до всего на экране,
// включая текст изучаемого языка. Языковой ползунок поэтому хранится и
// показывается как АБСОЛЮТНЫЙ размер («греческий — 130%»), а в CSS уходит
// ОТНОСИТЕЛЬНЫЙ, добавкой поверх общего: нужный / общий. При «как общий»
// добавка равна единице, и языковой текст просто едет за общим.
//
// Отсюда же — почему языковое значение хранится как 'auto', а не как копия
// общего: копия замёрзла бы на том общем, какой стоял в момент первого показа
// настроек, и дальше перестала бы за ним следовать. Ровно та же причина, по
// которой тема хранит 'system', а не вычисленную светлую или тёмную.

const FONT_SCALE_MIN = 0.8;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.05;
// Языковой ползунок, которого не трогали, следует за общим.
const FONT_SCALE_AUTO = 'auto';

const FONT_SCALE_KEYS = {
    general: 'app_font_scale',
    greek: 'app_greek_font_scale',
    hebrew: 'app_hebrew_font_scale'
};
// Языки — те, что умеют 'auto'. Общий такого состояния не имеет: следовать
// ему не за чем.
const FONT_SCALE_SCRIPTS = ['greek', 'hebrew'];

// Во сколько раз язык крупнее общего, пока его не трогали. У иврита это не
// единица, и причина та же, по которой существует --md-ref-script-min-size:
// огласовка — это точки под буквой и внутри неё, и на кегле интерфейса дагеш
// сливается с буквой, а камец от сегола не отличить. Греческие диакритики
// стоят над строкой и столько места не требуют.
// Это именно основание для «как общий», а не отдельно заданный размер:
// ползунок по-прежнему следует за общим, просто на 20% выше него.
const FONT_SCALE_AUTO_BASE = { greek: 1, hebrew: 1.2 };

let fontScales = { general: 1, greek: FONT_SCALE_AUTO, hebrew: FONT_SCALE_AUTO };

// Число в допустимых границах и с шагом ползунка. Всё, что числом не
// является, — не наш формат: возвращаем null, решение принимает вызывающий.
function clampFontScale(value) {
    // Отдельной строкой, и не зря: Number(null) и Number('') — это 0, а не
    // NaN. Без этой проверки пустой ключ читался бы как «ноль» и прижимался
    // к нижней границе, то есть чистая установка открывалась бы мелким
    // шрифтом вместо обычного.
    if (value === null || value === undefined || value === '') return null;
    let n = Number(value);
    if (!Number.isFinite(n)) return null;
    if (n < FONT_SCALE_MIN) n = FONT_SCALE_MIN;
    if (n > FONT_SCALE_MAX) n = FONT_SCALE_MAX;
    // К шагу — иначе значение из старой версии или из чужих рук встанет между
    // делениями, и ползунок прыгнет при первом же прикосновении.
    n = Math.round(n / FONT_SCALE_STEP) * FONT_SCALE_STEP;
    return Number(n.toFixed(2));
}

// Абсолютный масштаб языка: свой, если задан, иначе общий с поправкой на
// основание письма.
//
// Через clampFontScale, а не прямым умножением: во-первых, у иврита на общем
// 1.4 вышло бы 1.68 — за верхней границей, и ползунок нечем было бы туда
// поставить; во-вторых, значение обязано попадать на деление шага, иначе
// бегунок встанет между насечками и дёрнется при первом прикосновении.
// Отсюда же следствие: у самого верха общего прибавка съедается границей,
// и подпись состояния считает её по факту, а не повторяет 20% на веру.
function effectiveFontScale(which) {
    if (which === 'general') return fontScales.general;
    let own = fontScales[which];
    if (own !== FONT_SCALE_AUTO) return own;
    return clampFontScale(fontScales.general * FONT_SCALE_AUTO_BASE[which]);
}

function isFontScaleAuto(which) {
    return FONT_SCALE_SCRIPTS.indexOf(which) !== -1 && fontScales[which] === FONT_SCALE_AUTO;
}

// Единственное место, где значения превращаются в токены CSS.
function applyFontScales() {
    let root = document.documentElement;
    let general = fontScales.general;
    root.style.setProperty('--app-font-scale', String(general));
    // Добавка поверх общего, а не размер сам по себе — см. шапку файла.
    // toFixed(4): 1.15 / 1.1 даёт 1.0454545454545454, и такой хвост в токене
    // читать в отладчике невозможно, а на отрисовку он не влияет.
    FONT_SCALE_SCRIPTS.forEach(lang => {
        let rel = effectiveFontScale(lang) / general;
        root.style.setProperty('--app-' + lang + '-scale', String(Number(rel.toFixed(4))));
    });
    // Ширина вкладок зависит от кегля, а индикатор под ними позиционируется
    // в пикселях: без пересчёта он остался бы под прежней шириной. resize при
    // смене размера шрифта не срабатывает, поэтому зовём руками.
    if (typeof moveTabIndicator === 'function') moveTabIndicator();
}

function setFontScale(which, value) {
    if (!FONT_SCALE_KEYS[which]) return;
    let n = clampFontScale(value);
    if (n === null) return;
    fontScales[which] = n;
    writeStore(FONT_SCALE_KEYS[which], String(n));
    applyFontScales();
    syncFontScaleControls();
}

// Вернуть язык под общий ползунок.
function resetFontScale(which) {
    if (FONT_SCALE_SCRIPTS.indexOf(which) === -1) return;
    fontScales[which] = FONT_SCALE_AUTO;
    writeStore(FONT_SCALE_KEYS[which], FONT_SCALE_AUTO);
    applyFontScales();
    syncFontScaleControls();
}

function fontScalePercent(value) { return Math.round(value * 100) + '%'; }

// Подпись состояния языкового ползунка. Прибавка считается из фактических
// значений, а не берётся из FONT_SCALE_AUTO_BASE: у верхней границы её
// срезает clampFontScale(), и обещать «+20%» там было бы неправдой.
function fontScaleStateLabel(which) {
    if (!isFontScaleAuto(which)) return 'задан отдельно';
    let pct = Math.round(effectiveFontScale(which) / fontScales.general * 100) - 100;
    if (pct === 0) return 'как общий';
    // Минус — типографский, как и везде в интерфейсе.
    return 'как общий ' + (pct > 0 ? '+' : '−') + Math.abs(pct) + '%';
}

// Положение заливки дорожки в процентах: у input[type=range] нет своего
// псевдоэлемента для пройденной части в WebKit, и её рисует градиент по
// этой переменной (styles/settings.css).
function fontScaleFill(value) {
    let pct = (value - FONT_SCALE_MIN) / (FONT_SCALE_MAX - FONT_SCALE_MIN) * 100;
    return Math.max(0, Math.min(100, pct));
}

function syncFontScaleControls() {
    Object.keys(FONT_SCALE_KEYS).forEach(which => {
        let value = effectiveFontScale(which);
        let input = document.querySelector('[data-font-scale="' + which + '"]');
        if (input) {
            input.value = String(value);
            input.style.setProperty('--slider-fill', fontScaleFill(value) + '%');
        }
        let label = document.getElementById(which + 'FontScaleValue');
        if (label) label.textContent = fontScalePercent(value);
        // Кнопка возврата — только у языка и только когда он отвязан: у
        // ползунка на «как общий» ей нечего делать.
        let reset = document.getElementById(which + 'FontScaleReset');
        if (reset) reset.hidden = isFontScaleAuto(which);
        let hint = document.getElementById(which + 'FontScaleState');
        if (hint) hint.textContent = fontScaleStateLabel(which);
    });
}

function initFontScale() {
    let general = clampFontScale(readStore(FONT_SCALE_KEYS.general));
    fontScales.general = general === null ? 1 : general;
    FONT_SCALE_SCRIPTS.forEach(lang => {
        let raw = readStore(FONT_SCALE_KEYS[lang]);
        // Нет значения или прямо 'auto' — следуем за общим. Мусор в ключе
        // тоже сюда: это безопаснее, чем растянуть текст непонятно во сколько.
        let own = raw === null || raw === FONT_SCALE_AUTO ? null : clampFontScale(raw);
        fontScales[lang] = own === null ? FONT_SCALE_AUTO : own;
    });
    applyFontScales();
    syncFontScaleControls();
}
