// ============================================================
// НАСТРОЙКИ
// ============================================================

function renderLicenses() {
    let box = document.getElementById('licenseList');
    if (!box) return;
    let parts = [];
    for (let l of LICENSES) {
        let name = isEnglish() && l.nameEn ? l.nameEn : l.name;
        let terms = isEnglish() && l.termsEn ? l.termsEn : l.terms;
        parts.push('<div class="license-item">',
            '<div class="license-item__name">', escHtml(name), '</div>',
            '<div class="license-item__terms">', escHtml(terms));
        if (l.url) {
            parts.push(' <a href="', escHtml(l.url), '" target="_blank" rel="noopener noreferrer">',
                t('текст лицензии') + '<span class="msym">open_in_new</span></a>');
        }
        parts.push('</div></div>');
    }
    box.innerHTML = parts.join('');
}

function showSettings() {
    showSection('settingsSection');
    syncLanguageControls();
    syncCourseControls();
    syncThemeControls();
    syncFontScaleControls();
    renderFontList();
    renderLicenses();
}

