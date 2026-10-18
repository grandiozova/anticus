// Regenerate translations/en/<course>/lesson-NN.md from the English lesson data.
// These are the readable copies for proofreading; the app itself reads
// data/*.en.js. Nothing here is typed either: the grammar comes out of those
// files, which the builder produced from the Russian data.
const fs = require('fs');
const path = require('path');

// tools/en-build/ -> repository root
const ROOT = path.join(__dirname, '..', '..');

function loadEn(file, name) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn ' + name + ';')();
}

const GREEK = loadEn('data/lessons.en.js', 'LESSONS_EN_GREEK');
const HEBREW = loadEn('data/hebrew-lessons.en.js', 'LESSONS_EN_HEBREW');

function inline(text) {
    return String(text)
        .replace(/<b>([\s\S]*?)<\/b>/g, '**$1**')
        .replace(/<i>([\s\S]*?)<\/i>/g, '*$1*')
        .replace(/<span[^>]*>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function tableToMd(body) {
    const rows = [];
    for (const r of body.matchAll(/<tr>([\s\S]*?)<\/tr>/g)) {
        const cells = [];
        for (const c of r[1].matchAll(/<(th|td)[^>]*>([\s\S]*?)<\/\1>/g)) {
            cells.push(inline(c[2]).replace(/\|/g, '\\|'));
        }
        if (cells.length) rows.push(cells);
    }
    if (!rows.length) return '';
    const width = Math.max(...rows.map(r => r.length));
    const pad = r => { const c = r.slice(); while (c.length < width) c.push(''); return c; };
    const lines = ['| ' + pad(rows[0]).join(' | ') + ' |', '| ' + pad(rows[0]).map(() => '---').join(' | ') + ' |'];
    rows.slice(1).forEach(r => lines.push('| ' + pad(r).join(' | ') + ' |'));
    return lines.join('\n');
}

function grammarToMd(grammar) {
    const out = [];
    const withTables = String(grammar).replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (m, body) => {
        const md = tableToMd(body);
        out.push({ table: true, md: md });
        return '\u0000TABLE' + (out.length - 1) + '\u0000';
    });

    const parts = withTables.split('\u0000');
    const blocks = [];
    let paragraph = [];
    const flush = () => {
        if (paragraph.length) { blocks.push(paragraph.join(' ')); paragraph = []; }
    };

    for (const part of parts) {
        if (part === '') { flush(); continue; }
        const tableRef = part.match(/^TABLE(\d+)$/);
        if (tableRef) { flush(); blocks.push(out[Number(tableRef[1])].md); continue; }
        for (const raw of part.split(/<br\s*\/?>/i)) {
            const line = raw.trim();
            if (!line) { flush(); continue; }
            const heading = line.match(/^<b>([\s\S]*?)<\/b>$/);
            if (heading && !/<\/?[a-z]/i.test(heading[1])) {
                flush();
                const title = inline(heading[1]);
                blocks.push((/^\d+\./.test(title) ? '## ' : '### ') + title);
                continue;
            }
            const item = line.match(/^•\s*([\s\S]*)$/);
            if (item) { flush(); blocks.push('- ' + inline(item[1])); continue; }
            // <ul>/<ol> в материале: пункты становятся строками списка
            let rest = line;
            let touched = false;
            rest = rest.replace(/<\/?(ul|ol)[^>]*>/g, () => { flush(); touched = true; return ''; });
            if (touched) { /* emptied container tags */ }
            if (/<li[^>]*>/i.test(rest)) {
                flush();
                for (const li of rest.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) blocks.push('- ' + inline(li[1]));
                continue;
            }
            if (rest.trim()) paragraph.push(inline(rest));
        }
    }
    flush();
    return blocks.join('\n\n');
}

const NOTE = {
    greek: [
        '> Working English translation of the Russian grammar in `data/lessons.js`.',
        '> Greek forms are copied verbatim out of the data, never retyped. The text has',
        '> not been checked against Machen, *New Testament Greek for Beginners* (1923).'
    ],
    hebrew: [
        '> Working English translation of the Russian grammar in `data/hebrew-lessons.js`.',
        '> Hebrew forms are copied verbatim out of the data, never retyped, so no vowel',
        '> point or dagesh can have moved. The text has not been checked against Pratico &',
        '> Van Pelt, *Basics of Biblical Hebrew Grammar*.'
    ]
};

for (const [courseId, packs, source] of [['greek', GREEK, 'data/lessons.js'], ['hebrew', HEBREW, 'data/hebrew-lessons.js']]) {
    for (const n of Object.keys(packs)) {
        const pack = packs[n];
        const body = [
            '# Lesson ' + n + ' — ' + pack.title,
            '',
            NOTE[courseId].join('\n'),
            '',
            grammarToMd(pack.grammar),
            '',
            '## Vocabulary',
            '',
            Object.keys(pack.vocabulary).map(head => {
                const shown = (pack.headwords && pack.headwords[head]) || head;
                return '- ' + shown + ' — ' + pack.vocabulary[head];
            }).join('\n')
        ].join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
        const dir = path.join(ROOT, 'translations/en', courseId);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'lesson-' + String(n).padStart(2, '0') + '.md'), body);
    }
    console.log(courseId + ': ' + Object.keys(packs).length + ' files');
}
