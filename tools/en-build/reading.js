// Build data/prayer.en.js and data/hebrew-reading.en.js from the Russian
// reading data plus the English maps in this folder.
//
// The studied-language text is never typed here: Hebrew words, their readings
// and the Greek prayer text stay in the Russian source files untouched. Only
// the Russian segments — the verse translation, the word glosses and the
// morphological analysis — are replaced by English. The build refuses to write
// unless every word and every analysis of the source is accounted for, the
// counts match, no empty string slipped in and no Cyrillic is left.
//
// Run: node tools/en-build/reading.js [--check]
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DIR = __dirname;
const CHECK = process.argv.includes('--check');
const CYR = /[\u0400-\u04FF]/;

function loadData(file, names) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn {' + names.join(',') + '};')();
}

function readJson(file) {
    return JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
}

function fail(problems) {
    problems.forEach(p => console.error('  ' + p));
    console.error('\n' + problems.length + ' problem(s); nothing written.');
    process.exit(1);
}

// Общая проверка одной строки перевода: непустая и без кириллицы.
function checkText(where, value, problems) {
    if (typeof value !== 'string' || !value.trim()) {
        problems.push(where + ': пустая строка');
        return;
    }
    if (CYR.test(value)) problems.push(where + ': осталась кириллица — ' + value);
}

// Разбор одной книги: стихи, слова и куски стихов. `segments` есть только у
// чтения Бытия (греческая молитва спрашивается стихом целиком), поэтому
// проверка терпима к его отсутствию.
function buildReading(base, pack, label, problems) {
    checkText(label + '.title', pack.title, problems);
    if (!Array.isArray(pack.verses) || pack.verses.length !== base.verses.length) {
        problems.push(label + ': стихов ' + (pack.verses || []).length +
            ', в данных ' + base.verses.length);
        return [];
    }
    const analyses = {};
    return pack.verses.map((verse, i) => {
        const source = base.verses[i];
        const where = label + '.verses[' + i + ']';
        checkText(where + '.text', verse.text, problems);
        if (!Array.isArray(verse.words) || verse.words.length !== source.words.length) {
            problems.push(where + ': слов ' + (verse.words || []).length +
                ', в данных ' + source.words.length);
            return null;
        }
        const words = source.words.map((word, j) => {
            const w = verse.words[j];
            checkText(where + '.words[' + j + ']', w, problems);
            const analysis = (pack.analyses || {})[word.analysis];
            if (analysis == null) {
                problems.push(where + '.words[' + j + ']: нет разбора для «' + word.analysis + '»');
            } else {
                checkText(where + '.analyses', analysis, problems);
                analyses[word.analysis] = analysis;
            }
            return { translation: w, analysis: analysis == null ? '' : analysis };
        });
        const out = { russian: verse.text, words: words };
        if (Array.isArray(source.segments)) {
            if (!Array.isArray(verse.segments) || verse.segments.length !== source.segments.length) {
                problems.push(where + ': кусков ' + (verse.segments || []).length +
                    ', в данных ' + source.segments.length);
            } else {
                out.segments = verse.segments.map(seg => {
                    checkText(where + '.segments', seg, problems);
                    return { russian: seg };
                });
            }
        }
        return out;
    });
}

function writeData(file, comment, name, value) {
    const body = comment + '\nconst ' + name + ' = ' + JSON.stringify(value, null, 4) + ';\n';
    if (CHECK) return;
    fs.writeFileSync(path.join(ROOT, file), body, 'utf8');
    console.log('written ' + file);
}

const { PRAYER_DATA, HEBREW_READING_DATA } = loadData(
    'data/prayer.js', ['PRAYER_DATA']);
const reading = loadData('data/hebrew-reading.js', ['HEBREW_READING_DATA'])
    .HEBREW_READING_DATA;

const prayerPack = readJson('prayer-en.json');
const readingPack = readJson('reading-en.json');

const problems = [];

const prayer = {
    title: prayerPack.title,
    verses: buildReading(PRAYER_DATA, { analyses: prayerPack.analyses, verses: prayerPack.verses, title: prayerPack.title },
        'prayer', problems)
};

const hebrew = {
    title: readingPack.title,
    book: readingPack.book,
    source: readingPack.source,
    days: readingPack.days,
    verses: buildReading(reading, readingPack, 'reading', problems)
};

checkText('reading.book', hebrew.book, problems);
checkText('reading.source.label', hebrew.source && hebrew.source.label, problems);
checkText('reading.source.site', hebrew.source && hebrew.source.site, problems);
if (!Array.isArray(hebrew.days) || hebrew.days.length !== reading.days.length) {
    problems.push('reading.days: дней ' + (hebrew.days || []).length +
        ', в данных ' + reading.days.length);
} else {
    hebrew.days.forEach((d, i) => checkText('reading.days[' + i + ']', d, problems));
}

// Каждый разбор, объявленный в карте, обязан где-то встретиться: иначе он
// устарел и следующий читатель будет править строку, которую никто не видит.
['prayer', 'reading'].forEach(which => {
    const pack = which === 'prayer' ? prayerPack : readingPack;
    const used = new Set();
    const base = which === 'prayer' ? PRAYER_DATA : reading;
    base.verses.forEach(v => v.words.forEach(w => used.add(w.analysis)));
    Object.keys(pack.analyses || {}).forEach(key => {
        if (!used.has(key)) console.warn('  unused analysis in ' + which + ': ' + key);
    });
});

if (problems.length) fail(problems);

const HEADER = `// ============================================================
// ENGLISH ${prayerPack.title.toUpperCase()}
// ============================================================
// Generated by tools/en-build/reading.js from data/prayer.js and
// data/hebrew-reading.js plus the maps in tools/en-build/. The Greek and
// Hebrew text, the readings and the verse numbers are copied out of the
// Russian data character by character; only the Russian segments (the verse
// translation, the word glosses and the analysis) are English here.
//
// Shape: { title, verses: [{ russian, words: [{ translation, analysis }] }] }
// The field is still called \`russian\` because that is what js/prayer.js reads;
// in this file it holds the English text.
`;

const READING_HEADER = `// ============================================================
// ENGLISH ${readingPack.title.toUpperCase()} / ${readingPack.book.toUpperCase()}
// ============================================================
// Generated by tools/en-build/reading.js from data/prayer.js and
// data/hebrew-reading.js plus the maps in tools/en-build/. The Hebrew text,
// the readings and the verse numbers are copied out of the Russian data
// character by character; only the Russian segments (the verse translation,
// the word glosses and the analysis) are English here.
//
// Shape:
//   { title, book, source, days, verses: [{ russian, segments, words }] }
// Each segment keeps its place: the build checks that the count matches the
// source verse, because from/to are read from the source and only the prompt
// is replaced. The verse text is the King James Version, public domain.
`;

if (!CHECK) {
    writeData('data/prayer.en.js', HEADER, 'PRAYER_EN', prayer);
    writeData('data/hebrew-reading.en.js', READING_HEADER, 'HEBREW_READING_EN', hebrew);
    console.log('ok: ' + prayer.verses.length + ' prayer verses, ' +
        hebrew.verses.length + ' reading verses');
} else {
    console.log('ok (check only): ' + prayer.verses.length + ' prayer verses, ' +
        hebrew.verses.length + ' reading verses');
}
