// Build data/exercises.en.js — the English text of the checked drills.
//
// The translations are authored in the JSON files next to this script, lesson by
// lesson and in the order the questions stand in the Russian data. The script
// pairs each English answer with the question by **position** and writes the
// result keyed by the question's own text (the Greek/Hebrew form or the Russian
// prompt), so the app never depends on that order at runtime.
//
// The English text is typed by hand (there is nothing to copy it from), so the
// guards are different from build.js:
//   • every lesson must have exactly as many answers as it has questions;
//   • no answer may contain Cyrillic, and none may be empty;
//   • a Greek/Hebrew key is never typed here — it comes out of the Russian data,
//     byte for byte.
//
// Reordering the questions in data/*-lessons.js therefore means re-checking the
// matching JSON: the counts still match, and nothing else would notice.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const DIR = __dirname;

const CYR = /[\u0400-\u04FF]/;

function loadData(file, names) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    return new Function(src + '\nreturn {' + names.join(',') + '};')();
}

function readJson(file) {
    return JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
}

function words(s) {
    return String(s).trim().split(/\s+/).filter(Boolean);
}

function problemsFor(section, lesson, expected, given, problems) {
    if (!Array.isArray(given)) {
        problems.push({ section: section, lesson: lesson, missing: true });
        return;
    }
    if (given.length !== expected.length) {
        problems.push({ section: section, lesson: lesson, count: given.length + ' vs ' + expected.length });
    }
    given.forEach((value, i) => {
        if (typeof value !== 'string' || !value.trim()) {
            problems.push({ section: section, lesson: lesson, index: i, empty: true });
        } else if (CYR.test(value)) {
            problems.push({ section: section, lesson: lesson, index: i, cyrillic: value });
        }
    });
}

// Один раздел оверлея: вопросы из данных в их порядке и английские ответы из JSON.
function buildSection(data, map, problems, pick, key, field) {
    const out = {};
    Object.keys(data).forEach(n => {
        const questions = pick(data[n]);
        const given = map[n];
        // Непереведённый урок — не ошибка: английские упражнения появляются по
        // мере перевода, а недопереведённое упражнение просто не показывается.
        if (!questions || !questions.length) return;
        if (given == null) return;
        problemsFor(field, n, questions, given, problems);
        const pairs = {};
        questions.forEach((q, i) => {
            if (typeof given[i] !== 'string') return;
            pairs[key(q)] = words(given[i]);
        });
        if (Object.keys(pairs).length) out[n] = pairs;
    });
    return out;
}

function buildCourse(opts) {
    const { data, wordMap, promptMap, sentenceMap, constName, file } = opts;
    const problems = [];
    const packs = {};

    const wordLessons = buildSection(data, wordMap, problems,
        lesson => (lesson.exercises && lesson.exercises.translate_greek_to_russian) || [],
        q => q.greek,
        'translate_greek_to_russian');
    const promptLessons = buildSection(data, promptMap, problems,
        lesson => (lesson.exercises && lesson.exercises.translate_russian_to_greek) || [],
        q => q.russian,
        'translate_russian_to_greek');

    Object.keys(wordLessons).forEach(n => {
        packs[n] = packs[n] || {};
        packs[n].exercises = packs[n].exercises || {};
        packs[n].exercises.translate_greek_to_russian = wordLessons[n];
    });
    Object.keys(promptLessons).forEach(n => {
        packs[n] = packs[n] || {};
        packs[n].exercises = packs[n].exercises || {};
        packs[n].exercises.translate_russian_to_greek = promptLessons[n];
    });

    Object.keys(sentenceMap || {}).forEach(n => {
        const lesson = data[n];
        const given = sentenceMap[n];
        [['el_to_ru', 'source'], ['ru_to_el', 'source']].forEach(([dir]) => {
            const questions = (lesson.translation && lesson.translation[dir]) || [];
            const answers = given[dir];
            if (!questions.length) {
                if (answers) problems.push({ section: 'translation.' + dir, lesson: n, noQuestions: true });
                return;
            }
            if (answers == null) return;
            problemsFor('translation.' + dir, n, questions, answers, problems);
            const pairs = {};
            questions.forEach((q, i) => {
                if (typeof answers[i] !== 'string') return;
                pairs[q.source] = words(answers[i]);
            });
            packs[n] = packs[n] || {};
            packs[n].translation = packs[n].translation || {};
            packs[n].translation[dir] = pairs;
        });
    });

    return { packs, problems, constName, file };
}

const greek = loadData('data/lessons.js', ['LESSONS_DATA']).LESSONS_DATA;
const hebrew = loadData('data/hebrew-lessons.js', ['HEBREW_LESSONS_DATA']).HEBREW_LESSONS_DATA;

const builds = [
    buildCourse({
        data: greek,
        wordMap: readJson('words-greek.json'),
        promptMap: readJson('prompts-greek.json'),
        sentenceMap: readJson('sentences-greek.json'),
        constName: 'EXERCISES_EN_GREEK',
        file: 'data/exercises.en.js'
    }),
    buildCourse({
        data: hebrew,
        wordMap: readJson('words-hebrew.json'),
        promptMap: readJson('prompts-hebrew.json'),
        sentenceMap: readJson('sentences-hebrew.json'),
        constName: 'EXERCISES_EN_HEBREW',
        file: 'data/exercises.en.js'
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

if (bad) process.exit(1);

const HEADER = [
    '// ============================================================',
    '// ENGLISH TEXT OF THE CHECKED DRILLS',
    '// ============================================================',
    '// Keys of the translation drills and the English text of the sentences: what',
    '// the Russian data holds as answers and prompts. The material itself (grammar,',
    '// vocabulary, labels) lives in data/lessons.en.js and data/hebrew-lessons.en.js;',
    '// this file is the other half — the part that is graded.',
    '//',
    '// Generated by tools/en-build/exercises.js from the JSON maps beside it, never',
    '// typed here: the Greek and Hebrew keys are taken out of the Russian data',
    '// character by character, so a retyped breathing or niqqud cannot slip in.',
    '// Regenerate with the script named in translations/en/README.md.',
    '//',
    '// Shape:',
    '//   { <lesson>: {',
    '//       exercises: { <kind>: { <question text>: [<required English words>] } },',
    '//       translation: { <dir>: { <question source>: [<English words>] } }',
    '//   } }',
    '// A question with no entry stays Russian, and englishDrillReady() keeps that',
    '// drill off the screen until every one of its questions is translated.',
    '//'
];

function render(b) {
    const sorted = {};
    Object.keys(b.packs).sort((a, c) => +a - +c).forEach(k => { sorted[k] = b.packs[k]; });
    return 'const ' + b.constName + ' = ' + JSON.stringify(sorted, null, 4) + ';\n';
}

const body = HEADER.join('\n') + '\n' + builds.map(render).join('\n');
fs.writeFileSync(path.join(ROOT, builds[0].file), body);
console.log('wrote ' + builds[0].file + ' (' + body.length + ' bytes)');
