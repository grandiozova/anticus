// ============================================================
// НАСТРОЙКИ
// ============================================================

function renderLicenses() {
    let box = document.getElementById('licenseList');
    if (!box) return;
    let parts = [];
    for (let l of LICENSES) {
        parts.push('<div class="license-item">',
            '<div class="license-item__name">', escHtml(l.name), '</div>',
            '<div class="license-item__terms">', escHtml(l.terms));
        if (l.url) {
            parts.push(' <a href="', escHtml(l.url), '" target="_blank" rel="noopener noreferrer">',
                'текст лицензии<span class="msym">open_in_new</span></a>');
        }
        parts.push('</div></div>');
    }
    box.innerHTML = parts.join('');
}

function normalizeFontScaleValue(value, fallback) {
    let number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    if (number < 0.75) number = 0.75;
    if (number > 1.5) number = 1.5;
    return Number(number.toFixed(2));
}

function applyFontScaleSettings() {
    const root = document.documentElement;
    const general = normalizeFontScaleValue(readStore('app_font_scale'), 1);
    const greek = normalizeFontScaleValue(readStore('app_greek_font_scale'), 1);
    const hebrew = normalizeFontScaleValue(readStore('app_hebrew_font_scale'), 1);

    root.style.setProperty('--app-general-font-scale', String(general));
    root.style.setProperty('--app-greek-font-scale', String(greek));
    root.style.setProperty('--app-hebrew-font-scale', String(hebrew));

    writeStore('app_font_scale', String(general));
    writeStore('app_greek_font_scale', String(greek));
    writeStore('app_hebrew_font_scale', String(hebrew));
}

function setGeneralFontScale(value) {
    const normalized = normalizeFontScaleValue(value, 1);
    writeStore('app_font_scale', String(normalized));
    document.documentElement.style.setProperty('--app-general-font-scale', String(normalized));
    syncFontControls();
}

function setGreekFontScale(value) {
    const normalized = normalizeFontScaleValue(value, 1);
    writeStore('app_greek_font_scale', String(normalized));
    document.documentElement.style.setProperty('--app-greek-font-scale', String(normalized));
    syncFontControls();
}

function setHebrewFontScale(value) {
    const normalized = normalizeFontScaleValue(value, 1);
    writeStore('app_hebrew_font_scale', String(normalized));
    document.documentElement.style.setProperty('--app-hebrew-font-scale', String(normalized));
    syncFontControls();
}

function syncFontControls() {
    const map = {
        general: { key: 'app_font_scale', label: 'generalFontScaleValue' },
        greek: { key: 'app_greek_font_scale', label: 'greekFontScaleValue' },
        hebrew: { key: 'app_hebrew_font_scale', label: 'hebrewFontScaleValue' }
    };

    Object.keys(map).forEach(scale => {
        const input = document.querySelector('[data-font-scale="' + scale + '"]');
        const value = normalizeFontScaleValue(readStore(map[scale].key), 1);
        if (input) {
            input.value = String(value);
        }
        const label = document.getElementById(map[scale].label);
        if (label) {
            label.textContent = Math.round(value * 100) + '%';
        }
    });
}

function showSettings() {
    showSection('settingsSection');
    syncCourseControls();
    syncThemeControls();
    syncFontControls();
    renderLicenses();
}

