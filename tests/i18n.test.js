// Английский режим: переключатель языка, английский материал всех уроков и то,
// что без перевода остаётся русским, а не исчезает.
const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app');

const CYR = /[А-Яа-яЁё]/;

// Окрестность первой кириллической буквы: без неё сообщение об ошибке —
// километровая строка, и по нему не видно, что именно не переведено.
function around(text) {
    const at = text.search(CYR);
    return text.slice(Math.max(0, at - 40), at + 40);
}

function navLabels(app) {
    return Array.from(app.document.querySelectorAll('.md-nav-item__label')).map(el => el.textContent);
}

// ------------------------------------------------------------ переключатель

test('язык по умолчанию — русский', () => {
    const app = loadApp();
    assert.deepStrictEqual(navLabels(app), ['Уроки', 'Словарь', 'Карточки', 'Прогресс', 'Настройки']);
    assert.strictEqual(app.document.documentElement.getAttribute('lang'), 'ru');
    app.close();
});

test('переключатель переводит оболочку и ставит lang="en"', () => {
    const app = loadApp();
    app.window.setAppLang('en');
    assert.deepStrictEqual(navLabels(app), ['Lessons', 'Dictionary', 'Cards', 'Progress', 'Settings']);
    assert.strictEqual(app.document.documentElement.getAttribute('lang'), 'en');
    assert.strictEqual(app.appBarTitle(), 'Ancient Greek');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('английский режим не оставляет русских подписей в оболочке', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    ['#navBar', '#topAppBar', '#mainMenu .card h3', '#mainFab'].forEach(sel => {
        const el = app.document.querySelector(sel);
        assert.ok(el, 'нет элемента ' + sel);
        assert.ok(!CYR.test(el.textContent), 'русский текст в ' + sel + ': ' + el.textContent);
    });
    app.close();
});

test('выбор языка переживает перезагрузку', () => {
    const app = loadApp();
    app.window.setAppLang('en');
    assert.strictEqual(app.window.localStorage.getItem('app_lang'), 'en');
    app.window.setAppLang('ru');
    assert.strictEqual(app.window.localStorage.getItem('app_lang'), 'ru');
    assert.deepStrictEqual(navLabels(app), ['Уроки', 'Словарь', 'Карточки', 'Прогресс', 'Настройки']);
    app.close();
});

// ------------------------------------------------------------ уроки

test('английский урок 1 отдаёт английскую грамматику', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(1);
    const grammar = app.document.getElementById('grammarContent');
    assert.ok(grammar.textContent.includes('The Greek alphabet (24 letters)'),
        'нет английского текста урока 1: ' + grammar.textContent.slice(0, 120));
    // Греческий текст на месте: алфавитная таблица пришла целиком.
    assert.ok(grammar.textContent.includes('άλφα'), 'в английской грамматике нет текста урока');
    assert.ok(!CYR.test(grammar.textContent), 'в английской грамматике остался русский текст');
    app.close();
});

// Упражнения открываются по мере перевода их ответов: пункт, у которого
// переведены не все вопросы, в список не попадает (englishDrillReady), а вместе
// с ним и в тест. Полностью непереведённый урок остаётся без вкладки.
test('в английском режиме открыты только переведённые упражнения', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(3);
    app.window.switchLessonPart('exercise');
    assert.strictEqual(app.window.eval('currentLessonPart'), 'exercise');
    const labels = Array.from(app.document.querySelectorAll('#drillGroups .lesson-item__headline'))
        .map(el => el.textContent);
    assert.ok(labels.includes('Phrases: Greek → English'),
        'нет переведённого перевода слов: ' + labels.join(' | '));
    assert.ok(labels.includes('Phrases: English → Greek'),
        'нет переведённого обратного перевода: ' + labels.join(' | '));
    // Предложения уроков переведены целиком — пункты открыты в обе стороны.
    assert.ok(labels.includes('Sentences: Greek → English'),
        'нет перевода предложений: ' + labels.join(' | '));
    assert.ok(labels.includes('Sentences: English → Greek'),
        'нет обратного перевода предложений: ' + labels.join(' | '));
    app.close();
});

test('непереведённые упражнения не попадают и в тест', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(3);
    const types = app.get('collectTestQuestions(getLessonData(3)).map(q => q._type).join(",")');
    assert.ok(types.includes('translate_greek_to_russian'), 'в тесте нет переведённого вида: ' + types);
    assert.ok(types.includes('translate_russian_to_greek'),
        'в тесте нет обратного перевода: ' + types);
    app.close();
});

test('ответ на перевод проверяется по английским словам', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    assert.strictEqual(app.window.keywordsMatch('He unties.', ['he', 'unties']), true);
    assert.strictEqual(app.window.keywordsMatch('unties', ['he', 'unties']), false);
    assert.strictEqual(app.window.keywordsMatch("I'm hearing", ['i', 'am', 'hearing']), true);
    assert.strictEqual(app.window.keywordsMatch('I see', ['i', 'sees']), false);
    assert.strictEqual(app.window.keywordsMatch('I see the man', ['i', 'see', 'the', 'man']), true);
    app.close();
});

test('упражнение перевода проходит с английским ответом', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(3);
    app.window.startExercise('translate_greek_to_russian');
    const q = app.get('exerciseState.questions[exerciseState.index]');
    const input = app.document.getElementById('transInput');
    assert.ok(input, 'нет поля ввода');
    input.value = q.keywords.join(' ');
    app.window.checkExerciseTranslation(app.get('exerciseState.index'));
    const text = app.document.getElementById('exerciseQuestion').textContent;
    assert.ok(!CYR.test(text), 'русский текст в обратной связи: ' + around(text));
    assert.ok(text.includes('Correct'), 'ответ не засчитан: ' + text);
    app.close();
});

// Механизм пометки остаётся, хотя переведены все уроки: он нужен уроку,
// который добавят в данные завтра. Проверяем его на синтетическом случае —
// перевод урока 4 убирается на время теста.
test('урок без английской версии открывается по-русски с пометкой', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    delete app.get('LESSONS_EN').greek['4'];
    app.window.clearLocalizedLessonCache();
    app.window.openLesson(4);
    const note = app.document.getElementById('lessonLanguageNote');
    assert.ok(!note.classList.contains('hidden'), 'пометка об отсутствии перевода не показана');
    assert.ok(note.textContent.includes('no English version'), 'пометка не объясняет причину');
    const grammar = app.document.getElementById('grammarContent');
    assert.ok(CYR.test(grammar.textContent), 'материал непереведённого урока должен остаться русским');
    app.close();
});

// Главное требование: материал каждого урока каждого курса открывается
// по-английски целиком — и грамматика, и словарь, и заголовок.
test('материал каждого урока открывается по-английски без русского текста', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const courses = app.get('COURSES');
    const order = app.get('COURSE_ORDER');
    order.forEach(courseId => {
        app.window.applyCourse(courseId);
        Object.keys(courses[courseId].lessons).forEach(n => {
            app.window.openLesson(Number(n));
            const grammar = app.document.getElementById('grammarContent');
            assert.ok(!CYR.test(grammar.textContent),
                'русский текст в грамматике ' + courseId + ' ' + n + ': ' + around(grammar.textContent));
            // Строка словаря — заголовок и значение. Примеры употребления под
            // раскрытой строкой остаются русскими: это предложения уроков, а
            // упражнения на английский не переведены (о чём говорит пометка
            // над списком в общем словаре).
            app.document.querySelectorAll('#vocabList .word-row').forEach(row => {
                assert.ok(!CYR.test(row.textContent),
                    'русский текст в строке словаря ' + courseId + ' ' + n + ': ' + around(row.textContent));
            });
            const title = app.document.getElementById('lessonTitle').textContent;
            assert.ok(!CYR.test(title), 'заголовок урока по-русски: ' + courseId + ' ' + n + ' — ' + title);
            const note = app.document.getElementById('lessonLanguageNote');
            assert.ok(note.classList.contains('hidden'), 'пометка об отсутствии перевода у переведённого урока');
        });
    });
    app.close();
});

// Заголовок словарной статьи тоже английский: у греческих глаголов он несёт
// пометку «Fut. от …», и в английском режиме она переведена.
test('английский заголовок словарной статьи без русской пометки', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(13);
    const heads = Array.from(app.document.querySelectorAll('#vocabList .word-row strong'))
        .map(el => el.textContent);
    assert.ok(heads.some(h => h.includes('fut. of')), 'нет английской пометки при форме будущего: ' + heads.join(' | '));
    heads.forEach(h => assert.ok(!CYR.test(h), 'русская пометка в заголовке статьи: ' + h));
    app.close();
});

test('русский режим показывает русский урок без пометки', () => {
    const app = loadApp();
    app.window.openLesson(1);
    const note = app.document.getElementById('lessonLanguageNote');
    assert.ok(note.classList.contains('hidden'), 'в русском режиме пометка не нужна');
    const grammar = app.document.getElementById('grammarContent');
    assert.ok(CYR.test(grammar.textContent), 'урок в русском режиме должен быть русским');
    app.close();
});

// ------------------------------------------------------------ данные

test('каждый английский урок покрывает весь словарь своего урока', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const packs = app.get('LESSONS_EN');
    const courses = app.get('COURSES');
    Object.keys(packs).forEach(courseId => {
        Object.keys(packs[courseId]).forEach(n => {
            const pack = packs[courseId][n];
            const lesson = courses[courseId].lessons[n];
            assert.ok(lesson, 'нет урока ' + courseId + ' ' + n);
            assert.ok(pack.title && CYR.test(lesson.title) && !CYR.test(pack.title),
                'заголовок урока не переведён: ' + courseId + ' ' + n);
            assert.ok(pack.grammar && !CYR.test(pack.grammar),
                'в грамматике остался русский текст: ' + courseId + ' ' + n);
            (lesson.vocabulary || []).forEach(word => {
                assert.ok(pack.vocabulary[word.greek],
                    'нет перевода слова ' + word.greek + ' (' + courseId + ' ' + n + ')');
            });
        });
    });
    app.close();
});

test('английский текст есть у каждого урока обоих курсов', () => {
    const app = loadApp();
    const courses = app.get('COURSES');
    Object.keys(courses).forEach(courseId => {
        Object.keys(courses[courseId].lessons).forEach(n => {
            assert.strictEqual(app.window.hasEnglishLesson(courseId, Number(n)), true,
                'нет английской версии: ' + courseId + ' ' + n);
        });
    });
    // Числа берутся из данных, а не зашиты: новый урок попадёт в проверку сам.
    assert.strictEqual(app.window.hasEnglishLesson('greek', 17), false);
    app.close();
});

// ------------------------------------------------------------ парадигмы

// Подписи осей — русские строки: греческие собирает legacyParadigm()
// (js/declension.js), ивритские написаны в данных. В английском режиме
// таблица форм должна читаться по-английски, иначе материал урока остаётся
// наполовину русским. Словарь закрытый, поэтому проверяется и он сам: новая
// подпись в данных обязана попасть в UI_EN, а не пропасть молча.
test('подписи парадигмы переводятся, а формы остаются', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(8);
    app.window.switchLessonPart('material');
    const table = app.document.querySelector('#vocabList table');
    assert.ok(table, 'нет таблицы форм в уроке 8');
    const text = table.textContent;
    assert.ok(!CYR.test(text), 'русская подпись в таблице форм: ' + around(text));
    ['Person', 'Singular', 'Plural', 'Translation', '1st person'].forEach(word => {
        assert.ok(text.includes(word), 'в таблице нет подписи «' + word + '»: ' + text.replace(/\s+/g, ' '));
    });
    // Форма — текст изучаемого языка, и она на месте.
    assert.ok(text.includes('εἰμί'), 'пропала греческая форма');
    app.close();
});

test('в русском режиме подписи парадигмы русские', () => {
    const app = loadApp();
    app.window.openLesson(8);
    app.window.switchLessonPart('material');
    const text = app.document.querySelector('#vocabList table').textContent;
    assert.ok(text.includes('Лицо') && text.includes('Ед.ч.') && text.includes('Перевод'),
        'русская таблица форм изменилась: ' + text.replace(/\s+/g, ' '));
    app.close();
});

// Указатель всех подписей, которые встречаются в парадигмах обоих курсов.
function paradigmLabels(app) {
    const out = new Set();
    const courses = app.get('COURSES');
    for (const courseId of app.get('COURSE_ORDER')) {
        for (const lesson of Object.values(courses[courseId].lessons)) {
            for (const word of (lesson.vocabulary || [])) {
                const p = app.window.paradigm(word.declension_forms, word.caseTranslations);
                if (!p) continue;
                for (const t of p.tables) {
                    if (t.caption) out.add(t.caption);
                    if (t.rows && t.rows.label) out.add(t.rows.label);
                    (t.rows ? t.rows.values : []).forEach(r => out.add(r[1]));
                    (t.cols ? t.cols.values : []).forEach(c => out.add(c[1]));
                    if (t.translations) Object.values(t.translations).forEach(v => out.add(v));
                }
            }
        }
    }
    return out;
}

test('каждая русская подпись парадигмы есть в английском словаре', () => {
    const app = loadApp();
    const ui = app.get('UI_EN');
    const missing = [...paradigmLabels(app)]
        .filter(s => s && CYR.test(s))
        .filter(s => !Object.prototype.hasOwnProperty.call(ui, s));
    assert.deepStrictEqual(missing, [],
        'эти подписи парадигмы не переведены: ' + missing.join(' | '));
    app.close();
});

// ------------------------------------------------------------ чтение слова

test('чтение ивритского слова по-английски — транслитерация учебника', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.applyCourse('hebrew');
    app.window.openLesson(3);
    app.window.switchLessonPart('material');
    const readings = Array.from(app.document.querySelectorAll('#vocabList .vocab-translit'))
        .map(el => el.textContent);
    assert.ok(readings.length, 'нет чтения при словах');
    readings.forEach(r => assert.ok(!CYR.test(r), 'русское чтение в английском режиме: ' + r));
    assert.ok(readings.some(r => r.includes('yǝhwāh')), 'нет транслитерации: ' + readings.join(' | '));
    app.close();
});

test('в русском режиме чтение ивритского слова остаётся двойным', () => {
    const app = loadApp();
    app.window.applyCourse('hebrew');
    app.window.openLesson(3);
    app.window.switchLessonPart('material');
    const readings = Array.from(app.document.querySelectorAll('#vocabList .vocab-translit'))
        .map(el => el.textContent);
    assert.ok(readings.some(r => /\(.+\)/.test(r) && CYR.test(r)),
        'русское чтение с транслитерацией в скобках пропало: ' + readings.join(' | '));
    app.close();
});

// ------------------------------------------------------------ лицензии

// Английский текст уроков — отдельный текст со своим положением, и в списке
// лицензий он должен быть назван: иначе настройки рассказывают только о
// русских учебниках, а английский материал остаётся без объяснения.
test('в лицензиях есть запись об английском тексте уроков', () => {
    const app = loadApp();
    const licences = app.get('LICENSES');
    const entry = licences.find(l => l.nameEn === 'English lesson text');
    assert.ok(entry, 'нет записи о правах на английский текст уроков');
    assert.strictEqual(entry.url, null, 'это утверждение, а не лицензия — ссылки быть не должно');
    assert.ok(entry.name && entry.terms, 'запись без русского названия или условий');
    assert.ok(entry.termsEn && entry.termsEn !== entry.terms, 'запись не переведена');
    app.close();
});

test('запись об английском тексте видна в настройках на обоих языках', () => {
    ['ru', 'en'].forEach(lang => {
        const app = loadApp({ storage: { app_lang: lang } });
        app.window.showSettings();
        const items = Array.from(app.document.querySelectorAll('#licenseList .license-item'));
        const found = items.filter(el => /Английский текст|English lesson text/.test(el.textContent));
        assert.strictEqual(found.length, 1, 'запись об английском тексте не показана (' + lang + ')');
        app.close();
    });
});

// ------------------------------------------------------------ упражнения

// Оболочка упражнений: вопросы видов, постоянные наборы вариантов, список
// упражнений урока. Сами данные (слова, формы, ключевые слова перевода)
// переводятся отдельно, поэтому образец вопроса здесь пустой: проверяется
// только текст, который написан в коде, а не пришёл из урока.
test('вопросы видов упражнений переведены на английский', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const types = app.get('EXERCISE_TYPES');
    const sample = {
        case: 'gen_sg', word: '', translation: '', letter: '', upper: '', phrase: '',
        adjective: '', article: '', noun: '', form: '', sign: '', diphthong: '',
        name: '', sound: '', final: ''
    };
    Object.keys(types).forEach(key => {
        const type = types[key];
        if (typeof type.prompt !== 'function') return;
        const text = type.prompt(sample);
        assert.ok(!CYR.test(text), 'русский вопрос вида ' + key + ': ' + text);
    });
    app.close();
});

// Постоянные наборы вариантов записаны в таблице видов русскими строками, а
// переводит их exerciseOptions(). Значит каждый обязан быть в словаре, иначе
// вопрос останется с русскими кнопками посреди английского экрана.
test('постоянные варианты видов есть в английском словаре', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const types = app.get('EXERCISE_TYPES');
    const ui = app.get('UI_EN');
    Object.keys(types).forEach(key => {
        const options = types[key].options;
        if (!Array.isArray(options)) return;
        const translated = app.window.exerciseOptions(types[key], {});
        translated.forEach(o => {
            assert.ok(!CYR.test(o), 'вариант вида ' + key + ' остался русским: ' + o);
        });
        options.forEach(o => {
            if (!CYR.test(o)) return;
            assert.ok(Object.prototype.hasOwnProperty.call(ui, o),
                'вариант вида ' + key + ' не переведён: ' + o);
        });
    });
    app.close();
});

// Правильный ответ сверяется с текстом нажатой кнопки, поэтому переводиться
// они обязаны одним словарём: русская подпись из данных — тот же ключ, что и
// вариант. Здесь это проверено на виде с постоянным набором вариантов.
test('правильный ответ переводится тем же словарём, что и варианты', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const type = app.get('EXERCISE_TYPES').heb_shva;
    const q = { correct: '«Немое» шва' };
    assert.strictEqual(app.window.exerciseCorrect(type, q), 'Silent shewa');
    assert.ok(app.window.exerciseOptions(type, q).includes('Silent shewa'),
        'английского правильного варианта нет среди кнопок');
    app.close();
});

test('список упражнений урока переведён, направление — на английский', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    [['greek', 3], ['hebrew', 4]].forEach(([course, lesson]) => {
        app.window.applyCourse(course);
        const data = app.window.getLessonData(lesson);
        app.window.renderLessonDrills(data);
        const box = app.document.getElementById('drillGroups');
        assert.ok(box.textContent.trim(), 'список упражнений пуст: ' + course + ' ' + lesson);
        assert.ok(!CYR.test(box.textContent),
            'русская подпись в списке упражнений ' + course + ': ' + around(box.textContent));
        app.window.renderLessonTestEntry(data, false);
        const entry = app.document.getElementById('lessonTestEntry');
        assert.ok(!CYR.test(entry.textContent),
            'русская подпись у теста ' + course + ': ' + around(entry.textContent));
    });
    app.window.applyCourse('greek');
    const forward = app.window.findLessonDrill('exercise', 'translate_greek_to_russian');
    assert.strictEqual(app.window.drillLabel(forward), 'Phrases: Greek → English');
    const backward = app.window.findLessonDrill('exercise', 'translate_russian_to_greek');
    assert.strictEqual(app.window.drillLabel(backward), 'Phrases: English → Greek');
    app.close();
});

// ------------------------------------------------------------ алфавит и чтение

// Пулы букв — единственный источник вариантов алфавитных упражнений: вопросы
// собираются из них, а не из отдельного списка. Поэтому у каждой русской
// подписи в пуле обязан быть английский ключ, иначе кнопка останется русской.
test('подписи пулов букв и огласовок переведены', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const ui = app.get('UI_EN');
    const missing = [];
    const check = (place, value) => {
        if (value && CYR.test(value) && !Object.prototype.hasOwnProperty.call(ui, value)) {
            missing.push(place + ': ' + value);
        }
    };
    app.get('COURSE_ORDER').forEach(courseId => {
        app.window.applyCourse(courseId);
        const pool = app.window.courseAlphabet();
        (pool.letters || []).forEach(l => ['name', 'ru', 'sound'].forEach(f => check(courseId + '.' + f, l[f])));
        (pool.diphthongs || []).forEach(d => check(courseId + '.diphthong', d.sound));
        (pool.breathings || []).forEach(b => check(courseId + '.breathing', b.correct));
        (pool.accents || []).forEach(a => check(courseId + '.accent', a.correct));
        (pool.vowels || []).forEach(v => ['name', 'sound'].forEach(f => check(courseId + '.vowel.' + f, v[f])));
    });
    // Колода письма — не пул: ש стоит в ней двумя буквами со своими именами,
    // и вопрос о письме называет именно их. Проверять только пул значит не
    // увидеть «шин» до тех пор, пока он не выпадет в случайном вопросе.
    app.window.applyCourse('hebrew');
    (app.get('HEBREW_WRITE_LETTERS') || []).forEach(l => check('writing.name', l.name));
    assert.deepStrictEqual(missing, [], 'нет перевода: ' + missing.join(' | '));
    app.close();
});

// Алфавитные виды спрашивают не о слове, а о букве или знаке, и весь их текст
// приходит из пула. Проверяем отрисовку каждого вопроса обоих курсов: так
// ловится не только забытый словарь, но и забытый t() в самом виде.
test('вопросы алфавита и чтения рисуются без русского текста', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const kinds = [
        'letter_name', 'letter_from_name', 'letter_sound', 'letter_order',
        'letter_case_lower', 'letter_case_upper', 'diphthong_sound',
        'breathing_type', 'accent_type', 'heb_letter_final',
        'heb_vowel_name', 'heb_vowel_sound', 'heb_vowel_fill', 'heb_shva',
        'heb_dagesh', 'heb_qamets', 'heb_begadkefat', 'heb_syllables'
    ];
    [['greek', 1], ['greek', 2], ['hebrew', 1], ['hebrew', 2], ['hebrew', 3]].forEach(([course, lesson]) => {
        app.window.applyCourse(course);
        const data = app.window.getLessonData(lesson);
        kinds.forEach(kind => {
            ((data.exercises && data.exercises[kind]) || []).forEach(q => {
                const text = app.window.choiceQuestionHtml(kind, q, 'answerOpt').replace(/<[^>]+>/g, ' ');
                assert.ok(!CYR.test(text),
                    'русский текст в ' + course + ' ' + lesson + ' ' + kind + ': ' + around(text));
            });
        });
    });
    app.close();
});

// Письмо буквы спрашивает имя буквы, а показ огласовки называет знак и звук.
// Это те же строки пула, но их рисует не choiceQuestionHtml, а отдельные
// экраны — поэтому проверяются они отдельно.
test('письмо буквы и огласовки называют букву и знак по-английски', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.applyCourse('hebrew');
    app.window.openLesson(1);
    app.window.beginExercise('letter_write', 'print');
    const write = app.document.getElementById('exerciseQuestion').textContent;
    assert.ok(!CYR.test(write), 'русское имя буквы при письме: ' + around(write));

    app.window.openLesson(2);
    app.window.startVowelWrite();
    const vowel = app.document.getElementById('exerciseQuestion').textContent;
    assert.ok(!CYR.test(vowel), 'русская огласовка при письме: ' + around(vowel));

    app.window.startVowelFlashcards();
    app.window.vowelFlashcardReveal();
    const card = app.document.getElementById('flashcardContainer').textContent;
    assert.ok(!CYR.test(card), 'русская огласовка на карточке: ' + around(card));
    app.close();
});

// ------------------------------------------------------------ греческая грамматика

// Именной строй греческого: падеж и число, формы слова, согласование,
// атрибут/предикатив, субстантивация, артикль. Варианты этих видов — русские
// подписи из данных, поэтому проверяется отрисовка каждого вопроса всех уроков.
test('вопросы греческой грамматики рисуются без русского текста', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const kinds = ['declension_fill', 'case_number', 'agreement', 'attribute_vs_predicate',
        'substantivation', 'article_fill'];
    app.window.applyCourse('greek');
    app.window.lessonNumbers().forEach(lesson => {
        app.window.openLesson(lesson);
        const data = app.window.getLessonData(lesson);
        kinds.forEach(kind => {
            ((data.exercises && data.exercises[kind]) || []).forEach(q => {
                const text = app.window.choiceQuestionHtml(kind, q, 'answerOpt').replace(/<[^>]+>/g, ' ');
                assert.ok(!CYR.test(text),
                    'русский текст в греческом уроке ' + lesson + ', ' + kind + ': ' + around(text));
            });
        });
    });
    app.close();
});

// Подсказка о слове в вопросе о форме берётся из английского словаря курса, а
// не из русского поля данных: иначе в скобках стоял бы русский перевод при
// английском словаре на соседнем экране.
test('значение слова в вопросе о форме совпадает со словарём', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.applyCourse('greek');
    app.window.openLesson(3);
    const q = { case: 'gen_sg', word: 'λύω', translation: 'развязываю' };
    const html = app.get('EXERCISE_TYPES').declension_fill.prompt(q);
    assert.ok(!CYR.test(html), 'русская подсказка в вопросе о форме: ' + around(html));
    assert.ok(html.includes('I untie, set free'),
        'подсказка не совпадает со словарной статьёй: ' + html);
    app.close();
});

// ------------------------------------------------------------ еврейская грамматика

// Род и число, бегадкефат, гортанные, сопряжённое сочетание, суффиксы,
// огласовка. Как и у греческого, проверяется отрисовка каждого вопроса всех
// глав: варианты этих видов тоже приходят из данных русскими строками.
test('вопросы еврейской грамматики рисуются без русского текста', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const skip = ['translate_greek_to_russian', 'translate_russian_to_greek', 'letter_write'];
    app.window.applyCourse('hebrew');
    app.window.lessonNumbers().forEach(lesson => {
        const data = app.window.getLessonData(lesson);
        Object.keys(data.exercises || {}).forEach(kind => {
            if (skip.includes(kind)) return;
            data.exercises[kind].forEach(q => {
                const text = app.window.choiceQuestionHtml(kind, q, 'answerOpt').replace(/<[^>]+>/g, ' ');
                assert.ok(!CYR.test(text),
                    'русский текст в еврейской главе ' + lesson + ', ' + kind + ': ' + around(text));
            });
        });
    });
    app.close();
});


test('обратный перевод собирается из английского условия', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(3);
    app.window.startExercise('translate_russian_to_greek');
    const q = app.get('exerciseState.questions[exerciseState.index]');
    const prompt = app.document.querySelector('#exerciseQuestion .md-prompt-ru').textContent;
    assert.ok(!CYR.test(prompt), 'русское условие обратного перевода: ' + around(prompt));
    // Подсказка поля сборки приходит из data-hint: в CSS её перевести нельзя.
    const hint = app.document.getElementById('buildArea').getAttribute('data-hint');
    assert.ok(hint && !CYR.test(hint), 'русская подсказка поля сборки: ' + hint);
    q.correct_sequence.forEach(word => app.window.pickWord(word));
    app.window.checkTranslationRu();
    const text = app.document.getElementById('exerciseQuestion').textContent;
    assert.ok(text.includes('Correct'), 'ответ не засчитан: ' + text);
    assert.ok(!CYR.test(text), 'русский текст в обратной связи: ' + around(text));
    app.close();
});

// Еврейский курс: слова, условия перевода и предложения переведены.
// В главе 3 предложения есть только в одну сторону, поэтому второй пункт
// и не должен появиться — availability решает данные, а не курс.
test('еврейские упражнения-переводы и предложения открыты', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.applyCourse('hebrew');
    app.window.openLesson(3);
    app.window.renderLessonDrills(app.window.getLessonData(3));
    const labels = Array.from(app.document.querySelectorAll('#drillGroups .lesson-item__headline'))
        .map(el => el.textContent);
    assert.ok(labels.includes('Phrases: Hebrew → English'), 'нет перевода слов: ' + labels.join(' | '));
    assert.ok(labels.includes('Phrases: English → Hebrew'), 'нет обратного перевода: ' + labels.join(' | '));
    assert.ok(labels.includes('Sentences: Hebrew → English'),
        'нет перевода предложений: ' + labels.join(' | '));
    assert.ok(!labels.includes('Sentences: English → Hebrew'),
        'в главе нет обратных предложений, а пункт есть: ' + labels.join(' | '));

    app.window.startExercise('translate_greek_to_russian');
    const q = app.get('exerciseState.questions[exerciseState.index]');
    app.document.getElementById('transInput').value = q.keywords.join(' ');
    app.window.checkExerciseTranslation(app.get('exerciseState.index'));
    const text = app.document.getElementById('exerciseQuestion').textContent;
    assert.ok(text.includes('Correct'), 'еврейский ответ не засчитан: ' + text);
    assert.ok(!CYR.test(text), 'русский текст в обратной связи: ' + around(text));
    app.close();
});

// Все проверяемые ответы обоих курсов переведены: слова, условия и предложения.
// Условие — это текст на экране, поэтому оно обязано быть строкой, а не
// массивом слов: массив в шаблоне склеивается запятыми («he,writes»), и именно
// так выглядел английский обратный перевод до этой проверки.
test('переводы обоих курсов переведены целиком и условие — строка', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const bad = [];
    const checkText = (where, value) => {
        if (typeof value !== 'string' || !value.trim()) {
            bad.push(where + ': не строка (' + typeof value + ')');
            return;
        }
        if (CYR.test(value)) bad.push(where + ': кириллица — ' + around(value));
        if (/,\S/.test(value)) bad.push(where + ': слова склеены запятой — ' + value);
    };
    const checkWords = (where, words) => {
        if (!Array.isArray(words) || !words.length) {
            bad.push(where + ': не набор слов');
            return;
        }
        words.forEach(w => {
            if (typeof w !== 'string' || !w.trim()) bad.push(where + ': пустое слово');
            else if (CYR.test(w)) bad.push(where + ': кириллица — ' + around(w));
        });
    };
    app.get('COURSE_ORDER').forEach(course => {
        app.window.applyCourse(course);
        app.window.lessonNumbers().forEach(n => {
            const lesson = app.window.getLessonData(n);
            const ready = lesson._englishDrills || {};
            const at = course + ' ' + n;
            const tr = lesson.translation || {};
            (tr.el_to_ru || []).forEach((q, i) => {
                checkWords(at + ' el_to_ru ' + i, q.correct);
                checkText(at + ' el_to_ru text ' + i, q.correctText);
            });
            (tr.ru_to_el || []).forEach((q, i) => {
                checkText(at + ' ru_to_el ' + i, q.source);
                checkWords(at + ' ru_to_el answer ' + i, q.correct);
            });
            ['translation:el_to_ru', 'translation:ru_to_el'].forEach(key => {
                const dir = key.slice('translation:'.length);
                if ((tr[dir] || []).length && ready[key] !== true) bad.push(at + ': не открыто ' + key);
            });
            const ex = lesson.exercises || {};
            (ex.translate_greek_to_russian || []).forEach((q, i) => {
                checkWords(at + ' words ' + i, q.keywords);
            });
            (ex.translate_russian_to_greek || []).forEach((q, i) => {
                checkText(at + ' prompt ' + i, q.russian);
            });
            ['exercise:translate_greek_to_russian', 'exercise:translate_russian_to_greek'].forEach(key => {
                const kind = key.slice('exercise:'.length);
                if ((ex[kind] || []).length && ready[key] !== true) bad.push(at + ': не открыто ' + key);
            });
        });
    });
    assert.deepStrictEqual(bad, [], bad.slice(0, 12).join('\n'));
    app.close();
});

// ------------------------------------------------------------ карточки
//
// Карточки — то же упражнение, что и остальные: слово, перевод и тренировка
// форм. Подписи у них давно в UI_EN, поэтому английский режим открывает их
// как есть, и проверять здесь надо не подписи, а содержимое колоды: оно
// приходит из английского словаря, а форма — из парадигмы слова.

test('карточки открываются в английском режиме и не показывают русского', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.startAllFlashcards();
    assert.strictEqual(app.screen(), 'allFlashcardsSection');
    const box = app.document.querySelector('#allFlashcardsSection');
    assert.ok(!CYR.test(box.textContent), 'русский текст в карточках: ' + around(box.textContent));
    app.window.allFlashcardReveal();
    assert.ok(!CYR.test(box.textContent), 'русский перевод на обороте: ' + around(box.textContent));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('оборот карточки спрашивает форму по-английски', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const word = app.window.getAllVocab().find(w => w.declension_forms && w.lesson);
    assert.ok(word, 'в словаре нет слова с парадигмой');
    app.window.startAllFlashcards('all', [word]);
    app.window.allFlashcardReveal();
    const box = app.document.querySelector('#allFlashcardsSection');
    const flip = box.querySelector('.flashcard-flip-btn');
    assert.ok(flip, 'у слова с парадигмой нет кнопки тренировки форм');
    flip.click();
    const back = box.querySelector('#cardDeclension');
    assert.ok(back && back.textContent.trim(), 'оборот карточки пуст');
    assert.ok(!CYR.test(back.textContent), 'русский текст на обороте: ' + around(back.textContent));
    assert.ok(back.querySelectorAll('.option-btn').length >= 2, 'нет вариантов формы');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

// ------------------------------------------------------------ разбор текста
//
// «Отче наш» и чтение Бытия — материал, а не оболочка, поэтому английский
// лежит в data/prayer.en.js и data/hebrew-reading.en.js и накладывается на
// русский источник по месту (js/i18n.js). Проверяем и данные, и экран: в
// данных не должно остаться ни одной русской строки, а на экране — ни одного
// русского слова, включая разбор формы по клику.

test('английский разбор покрывает каждый стих, слово и кусок стиха обоих курсов', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const bad = [];
    app.get('COURSE_ORDER').forEach(course => {
        app.window.applyCourse(course);
        const data = app.window.coursePrayer();
        const base = app.window.eval('COURSES["' + course + '"].prayer');
        const at = course;
        if (CYR.test(data.title || '')) bad.push(at + ': заголовок');
        if (data.book && CYR.test(data.book)) bad.push(at + ': книга');
        if (data.source && (CYR.test(data.source.label || '') || CYR.test(data.source.site || '')))
            bad.push(at + ': источник');
        assert.strictEqual(data.verses.length, base.verses.length, at + ': стихи');
        (data.days || []).forEach((d, i) => { if (CYR.test(d.title)) bad.push(at + ' day ' + i); });
        data.verses.forEach((v, i) => {
            if (CYR.test(v.russian || '')) bad.push(at + ' verse ' + i + ': ' + around(v.russian));
            assert.strictEqual(v.words.length, base.verses[i].words.length, at + ' verse ' + i + ': слова');
            v.words.forEach((w, j) => {
                if (CYR.test(w.translation || '')) bad.push(at + ' ' + i + '.' + j + ' gloss: ' + around(w.translation));
                if (CYR.test(w.analysis || '')) bad.push(at + ' ' + i + '.' + j + ' analysis: ' + around(w.analysis));
            });
            if (base.verses[i].segments) {
                assert.strictEqual((v.segments || []).length, base.verses[i].segments.length,
                    at + ' verse ' + i + ': куски стиха');
                v.segments.forEach((s, j) => { if (CYR.test(s.russian)) bad.push(at + ' segment ' + i + '.' + j); });
            }
        });
    });
    assert.deepStrictEqual(bad, [], bad.slice(0, 12).join('\n'));
    app.close();
});

test('«Отче наш» открывается по-английски и разбор слова английский', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.showPrayer();
    assert.strictEqual(app.screen(), 'prayerSection');
    assert.strictEqual(app.appBarTitle(), 'Our Father');
    const box = app.document.querySelector('#prayerSection');
    assert.ok(!CYR.test(box.textContent), 'русский текст в молитве: ' + around(box.textContent));
    box.querySelector('.prayer-word').click();
    const analysis = app.document.querySelector('#analysis-0');
    assert.strictEqual(analysis.style.display, 'block');
    assert.ok(!CYR.test(analysis.textContent), 'русский разбор формы: ' + around(analysis.textContent));
    assert.ok(/noun, masc\., sg\., vocative/.test(analysis.textContent), analysis.textContent);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('чтение Бытия по-английски: дни, стих, чтение слова и разбор', () => {
    const app = loadApp({ storage: { app_lang: 'en', app_course: 'hebrew', app_default_course: 'hebrew' } });
    app.window.showPrayer();
    assert.strictEqual(app.appBarTitle(), 'Bible reading');
    const box = app.document.querySelector('#prayerSection');
    assert.ok(!CYR.test(box.textContent), 'русский текст в чтении: ' + around(box.textContent));
    const chips = box.querySelectorAll('.prayer-day-chips .filter-chip');
    assert.strictEqual(chips.length, 6, 'чипы дней');
    assert.strictEqual(chips[0].textContent.trim(), 'Day 1');
    assert.ok(/In the beginning God created/.test(box.querySelector('.prayer-russian').textContent),
        'стих не по-английски');
    box.querySelector('.prayer-word').click();
    const analysis = app.document.querySelector('#analysis-0');
    assert.ok(!CYR.test(analysis.textContent), 'русский разбор слова: ' + around(analysis.textContent));
    // Чтение ивритского слова в английском режиме — латинская половина.
    assert.ok(/bǝrēʾšîṯ/.test(analysis.textContent), analysis.textContent);
    assert.ok(!/\(bǝrēʾšîṯ\)/.test(analysis.textContent), 'чтение осталось двойным');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('упражнения разбора спрашивают по-английски', () => {
    const app = loadApp({ storage: { app_lang: 'en', app_course: 'hebrew', app_default_course: 'hebrew' } });
    app.window.showPrayer();
    app.window.startPrayerFill();
    let q = app.document.querySelector('#prayerExerciseQuestion');
    assert.ok(q.textContent.trim(), 'вопрос «заполни пропуски» не нарисован');
    assert.ok(!CYR.test(q.textContent), 'русский текст в вопросе: ' + around(q.textContent));
    app.window.startPrayerTranslate();
    q = app.document.querySelector('#prayerExerciseQuestion');
    assert.ok(!CYR.test(q.textContent), 'русский текст в переводе: ' + around(q.textContent));
    // Подсказки у ивритского чтения нет (hideTranslateHint), а кнопки есть.
    assert.ok(/Check/.test(q.textContent) && /Clear/.test(q.textContent), q.textContent);
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('переключение языка сбрасывает английский разбор', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    const english = app.window.coursePrayer();
    assert.strictEqual(english.title, 'Our Father');
    app.window.setAppLang('ru');
    const russian = app.window.coursePrayer();
    assert.strictEqual(russian.title, 'Отче наш');
    assert.strictEqual(russian.verses[0].russian, 'Отче наш, сущий на небесах');
    app.window.setAppLang('en');
    assert.strictEqual(app.window.coursePrayer().title, 'Our Father');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('перевод стихов чтения назван в лицензиях на обоих языках', () => {
    const app = loadApp();
    const entry = app.get('LICENSES').find(l => /King James/.test(l.name));
    assert.ok(entry, 'нет записи о переводе стихов чтения');
    assert.ok(entry.terms && entry.termsEn && entry.termsEn !== entry.terms, 'запись не переведена');
    ['ru', 'en'].forEach(lang => {
        const a = loadApp({ storage: { app_lang: lang } });
        a.window.showSettings();
        const items = Array.from(a.document.querySelectorAll('#licenseList .license-item'));
        assert.strictEqual(items.filter(el => /King James/.test(el.textContent)).length, 1,
            'запись о переводе стихов не показана (' + lang + ')');
        a.close();
    });
    app.close();
});

test('смена языка перерисовывает открытый разбор текста', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.showPrayer();
    const box = app.document.querySelector('#prayerSection');
    assert.strictEqual(app.appBarTitle(), 'Our Father');
    app.window.setAppLang('ru');
    assert.strictEqual(app.appBarTitle(), 'Отче наш');
    assert.ok(/Отче наш, сущий на небесах/.test(box.textContent), 'экран остался английским');
    assert.strictEqual(app.screen(), 'prayerSection');
    app.window.setAppLang('en');
    assert.strictEqual(app.appBarTitle(), 'Our Father');
    assert.ok(!CYR.test(box.textContent), 'русский текст остался после возврата на английский');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});
