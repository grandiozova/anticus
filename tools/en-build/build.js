// Build data/lessons.en.js and data/hebrew-lessons.en.js from the Russian lesson
// data plus the per-lesson translation maps in this folder.
//
// The English text is never typed: every studied-language run is cut out of the
// source lesson into a {{n}} placeholder, the remaining Russian text is looked up
// in a map, and the runs are put back byte for byte. The build then refuses to
// write unless the output has no Cyrillic left and every script run it contains
// occurs verbatim in the source lesson.
const fs = require('fs');
const path = require('path');

// tools/en-build/ -> repository root
const ROOT = path.join(__dirname, '..', '..');
const DIR = __dirname;
const CHECK = process.argv.includes('--check');

const SCRIPT_CHAR_CLASS = '\\u0370-\\u03FF\\u1F00-\\u1FFF\\u0590-\\u05FF\\uFB1D-\\uFB4F';
const SCRIPT_RUN_RE = new RegExp('[' + SCRIPT_CHAR_CLASS + ']+(?:\\s+[' + SCRIPT_CHAR_CLASS + ']+)*', 'g');
const SCRIPT_ONE = new RegExp('[' + SCRIPT_CHAR_CLASS + ']');
const CYR = /[\u0400-\u04FF]/;

function loadData(file, names) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn {' + names.join(',') + '};')();
}

function loadEn(file, constName) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn ' + constName + ';')();
}

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

function readJson(file) {
    return JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
}

function translateGrammar(n, grammar, map, problems) {
    const parts = splitHtml(grammar);
    const out = [];
    let missing = 0;
    for (const p of parts) {
        if (p.tag || !CYR.test(p.text)) { out.push(p.text); continue; }
        const { tpl, runs } = template(p.text);
        const en = map[tpl];
        if (en == null) {
            problems.push({ lesson: n, missing: tpl });
            missing += 1;
            out.push(p.text);
            continue;
        }
        if (CYR.test(en)) problems.push({ lesson: n, cyrillicInTranslation: en });
        const placeholders = en.match(/\{\{\d+\}\}/g) || [];
        if (placeholders.length !== runs.length) {
            problems.push({ lesson: n, placeholderCount: tpl, english: en });
            out.push(p.text);
            continue;
        }
        out.push(en.replace(/\{\{(\d+)\}\}/g, (m, i) => runs[Number(i) - 1]));
    }
    return { grammar: out.join(''), missing };
}

function checkGrammar(n, source, result, problems) {
    if (CYR.test(result)) {
        const at = result.search(CYR);
        problems.push({ lesson: n, cyrillicLeft: result.slice(Math.max(0, at - 60), at + 60) });
    }
    // Tags must be untouched: same sequence, same attributes.
    const srcTags = splitHtml(source).filter(p => p.tag).map(p => p.text);
    const outTags = splitHtml(result).filter(p => p.tag).map(p => p.text);
    if (srcTags.join('\u0000') !== outTags.join('\u0000')) {
        problems.push({ lesson: n, tagsChanged: true });
    }
    // Every studied-language run in the result must occur verbatim in the source.
    const runs = result.match(SCRIPT_RUN_RE) || [];
    for (const run of runs) {
        if (!source.includes(run)) problems.push({ lesson: n, scriptRunNotInSource: run });
    }
    // No studied-language run may vanish either: count of script chars must match.
    const count = s => (s.match(SCRIPT_ONE) || []).length;
    if (count(result) !== count(source)) {
        problems.push({ lesson: n, scriptCharsLost: count(source) - count(result) });
    }
}

function buildCourse(opts) {
    const { data, existing, mapPrefix, vocabFile, titleFile, headwordFile, constName, file } = opts;
    const problems = [];
    const packs = Object.assign({}, existing);
    const vocab = readJson(vocabFile);
    const titles = readJson(titleFile);
    const headwordMap = readJson(headwordFile);

    for (const n of Object.keys(data)) {
        if (+n < opts.firstLesson) continue;
        const lesson = data[n];
        const mapFile = mapPrefix + String(n).padStart(2, '0') + '.map.json';
        if (!fs.existsSync(path.join(DIR, mapFile))) {
            // Lessons translated before this build existed keep their hand-checked text.
            if (existing[n]) continue;
            problems.push({ lesson: n, noMapFile: mapFile });
            continue;
        }
        const map = readJson(mapFile);
        const { grammar } = translateGrammar(n, lesson.grammar || '', map, problems);
        checkGrammar(n, lesson.grammar || '', grammar, problems);

        const title = titles[n];
        if (!title) problems.push({ lesson: n, noTitle: true });
        else if (CYR.test(title)) problems.push({ lesson: n, cyrillicTitle: title });

        const glosses = vocab[n];
        const words = lesson.vocabulary || [];
        const vocabulary = {};
        const headwords = {};
        if (!glosses) {
            problems.push({ lesson: n, noVocabFile: true });
        } else if (glosses.length !== words.length) {
            problems.push({ lesson: n, vocabLength: glosses.length + ' vs ' + words.length });
        } else {
            words.forEach((w, i) => {
                if (vocabulary[w.greek] && vocabulary[w.greek] !== glosses[i]) {
                    problems.push({ lesson: n, duplicateHeadword: w.greek });
                }
                vocabulary[w.greek] = glosses[i];
                // A headword carrying Russian ("Fut. от …") is translated the same way
                // the grammar is: the studied-language runs are cut out, the Russian
                // around them is looked up, and the runs go back untouched.
                if (CYR.test(w.greek)) {
                    const head = template(w.greek);
                    const en = headwordMap[head.tpl];
                    if (en == null) problems.push({ lesson: n, noHeadword: head.tpl });
                    else headwords[w.greek] = en.replace(/\{\{(\d+)\}\}/g, (m, i) => head.runs[Number(i) - 1]);
                }
            });
            Object.keys(vocabulary).forEach(k => {
                if (CYR.test(vocabulary[k])) problems.push({ lesson: n, cyrillicGloss: vocabulary[k] });
            });
            Object.keys(headwords).forEach(k => {
                if (CYR.test(headwords[k])) problems.push({ lesson: n, cyrillicHeadword: headwords[k] });
            });
        }

        const pack = { title: title || lesson.title, grammar: grammar, vocabulary: vocabulary };
        if (Object.keys(headwords).length) pack.headwords = headwords;
        packs[n] = pack;
    }

    return { packs, problems, constName, file };
}

const greek = loadData('data/lessons.js', ['LESSONS_DATA']).LESSONS_DATA;
const hebrew = loadData('data/hebrew-lessons.js', ['HEBREW_LESSONS_DATA']).HEBREW_LESSONS_DATA;

const builds = [
    buildCourse({
        data: greek,
        existing: loadEn('data/lessons.en.js', 'LESSONS_EN_GREEK'),
        mapPrefix: 'greek-',
        vocabFile: 'vocab-greek.json',
        titleFile: 'titles-greek.json',
        headwordFile: 'headwords-greek.json',
        constName: 'LESSONS_EN_GREEK',
        file: 'data/lessons.en.js',
        firstLesson: 1
    }),
    buildCourse({
        data: hebrew,
        existing: loadEn('data/hebrew-lessons.en.js', 'LESSONS_EN_HEBREW'),
        mapPrefix: 'hebrew-',
        vocabFile: 'vocab-hebrew.json',
        titleFile: 'titles-hebrew.json',
        headwordFile: 'headwords-hebrew.json',
        constName: 'LESSONS_EN_HEBREW',
        file: 'data/hebrew-lessons.en.js',
        firstLesson: 1
    })
];

let bad = 0;
for (const b of builds) {
    if (b.problems.length) {
        bad += b.problems.length;
        console.log('=== ' + b.constName + ': ' + b.problems.length + ' problem(s)');
        for (const p of b.problems.slice(0, 80)) console.log(JSON.stringify(p));
        if (b.problems.length > 80) console.log('… ' + (b.problems.length - 80) + ' more');
    } else {
        console.log('=== ' + b.constName + ': ok, ' + Object.keys(b.packs).length + ' lessons');
    }
}

if (bad || CHECK) {
    if (CHECK) console.log('check only, nothing written');
    process.exit(bad ? 1 : 0);
}

const HEADER = {
    'data/lessons.en.js': [
        '// ============================================================',
        '// ENGLISH LESSON TEXT',
        '// ============================================================',
        '// Grammar, titles and vocabulary meanings for every Greek lesson in the app.',
        '// Everything else (numbers, parts of speech, paradigms, drills) stays in the',
        '// Russian source files and is not duplicated here.',
        '//',
        '// The file was generated, not typed: Greek and Hebrew forms are copied out of',
        '// the Russian data character by character, so no breathing or vowel point can',
        '// have moved. Regenerate with the script named in translations/en/README.md.',
        '//',
        '// Shape:',
        '//   { <lesson number>: { title, grammar, vocabulary: { <headword>: <meaning> } } }',
        '// The headword is the vocabulary entry\'s `greek` field, which the dictionary',
        '// already requires to be unique.'
    ],
    'data/hebrew-lessons.en.js': [
        '// ============================================================',
        '// ENGLISH LESSON TEXT',
        '// ============================================================',
        '// Grammar, titles and vocabulary meanings for every Hebrew chapter in the app.',
        '// Everything else (numbers, parts of speech, paradigms, drills) stays in the',
        '// Russian source files and is not duplicated here.',
        '//',
        '// The file was generated, not typed: Greek and Hebrew forms are copied out of',
        '// the Russian data character by character, so no breathing or vowel point can',
        '// have moved. Regenerate with the script named in translations/en/README.md.',
        '//',
        '// Shape:',
        '//   { <lesson number>: { title, grammar, vocabulary: { <headword>: <meaning> } } }',
        '// The headword is the vocabulary entry\'s `greek` field, which the dictionary',
        '// already requires to be unique.'
    ]
};

for (const b of builds) {
    const sorted = {};
    Object.keys(b.packs).sort((a, c) => +a - +c).forEach(k => { sorted[k] = b.packs[k]; });
    const body = HEADER[b.file].join('\n') + '\nconst ' + b.constName + ' = '
        + JSON.stringify(sorted, null, 4) + ';\n';
    fs.writeFileSync(path.join(ROOT, b.file), body);
    console.log('wrote ' + b.file + ' (' + body.length + ' bytes)');
}
