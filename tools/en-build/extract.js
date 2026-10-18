// Extract every translatable text node from lesson grammar, with studied-language
// runs replaced by {{n}} placeholders. Output: JSON inventory for translation.
const fs = require('fs');
const path = require('path');

// tools/en-build/ -> repository root
const ROOT = path.join(__dirname, '..', '..');
function load(file, names) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn {' + names.join(',') + '};')();
}

const SCRIPT_CHAR_CLASS = '\\u0370-\\u03FF\\u1F00-\\u1FFF\\u0590-\\u05FF\\uFB1D-\\uFB4F';
const SCRIPT_RUN_RE = new RegExp('[' + SCRIPT_CHAR_CLASS + ']+(?:\\s+[' + SCRIPT_CHAR_CLASS + ']+)*', 'g');
const CYR = /[\u0400-\u04FF]/;

function splitHtml(html) {
    const parts = [];
    let i = 0;
    while (i < html.length) {
        if (html[i] === '<') {
            const end = html.indexOf('>', i);
            const stop = end === -1 ? html.length : end + 1;
            parts.push({ tag: true, text: html.slice(i, stop) });
            i = stop;
        } else {
            const next = html.indexOf('<', i);
            const stop = next === -1 ? html.length : next;
            parts.push({ tag: false, text: html.slice(i, stop) });
            i = stop;
        }
    }
    return parts;
}

function template(text) {
    const runs = [];
    const tpl = text.replace(SCRIPT_RUN_RE, m => { runs.push(m); return '{{' + runs.length + '}}'; });
    return { tpl, runs };
}

const greek = load('data/lessons.js', ['LESSONS_DATA']).LESSONS_DATA;
const hebrew = load('data/hebrew-lessons.js', ['HEBREW_LESSONS_DATA']).HEBREW_LESSONS_DATA;

const out = { greek: { lessons: {}, templates: [], vocab: {} }, hebrew: { lessons: {}, templates: [], vocab: {} } };

for (const [cid, data] of [['greek', greek], ['hebrew', hebrew]]) {
    const seen = new Map();
    for (const n of Object.keys(data)) {
        const lesson = data[n];
        const parts = splitHtml(lesson.grammar || '');
        const local = [];
        for (const p of parts) {
            if (p.tag || !CYR.test(p.text)) continue;
            const { tpl, runs } = template(p.text);
            local.push(tpl);
            if (!seen.has(tpl)) seen.set(tpl, { tpl, runs, count: 0, lessons: [] });
            const e = seen.get(tpl);
            e.count += 1;
            if (!e.lessons.includes(n)) e.lessons.push(n);
        }
        out[cid].lessons[n] = { title: lesson.title, templates: local };
        out[cid].vocab[n] = (lesson.vocabulary || []).map(w => ({ id: w.greek || w.word, ru: w.translation }));
    }
    out[cid].templates = [...seen.values()];
}

fs.writeFileSync(path.join(__dirname, 'inventory.json'), JSON.stringify(out, null, 1));
const g = out.greek, h = out.hebrew;
console.log('greek: lessons', Object.keys(g.lessons).length, 'unique templates', g.templates.length);
console.log('  needing translation (4-16):', g.templates.filter(t => t.lessons.some(n => +n >= 4)).length);
console.log('hebrew: lessons', Object.keys(h.lessons).length, 'unique templates', h.templates.length);
console.log('  needing translation (4-12):', h.templates.filter(t => t.lessons.some(n => +n >= 4)).length);
console.log('greek vocab words 4-16:', Object.keys(g.vocab).filter(n => +n >= 4).reduce((a, n) => a + g.vocab[n].length, 0));
console.log('hebrew vocab words 4-12:', Object.keys(h.vocab).filter(n => +n >= 4).reduce((a, n) => a + h.vocab[n].length, 0));
console.log('greek total chars 4-16:', Object.keys(g.lessons).filter(n => +n >= 4).reduce((a, n) => a + dataLength(g.lessons[n]), 0));
console.log('hebrew total chars 4-12:', Object.keys(h.lessons).filter(n => +n >= 4).reduce((a, n) => a + dataLength(h.lessons[n]), 0));

function dataLength(l) { return l.templates.join(' ').length; }
