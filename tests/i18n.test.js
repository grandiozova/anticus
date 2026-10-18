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

test('в английском режиме вкладки упражнений нет', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(1);
    const tab = app.document.querySelector('#lessonTabs button[data-part="exercise"]');
    assert.strictEqual(tab.style.display, 'none', 'вкладка упражнений должна быть скрыта');
    // И попасть в раздел упражнений нельзя даже вызовом
    app.window.switchLessonPart('exercise');
    assert.strictEqual(app.window.eval('currentLessonPart'), 'material');
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
