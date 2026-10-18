// Английский режим: переключатель языка, английский текст уроков 1–3 и то,
// что без перевода остаётся русским, а не исчезает.
const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app');

const CYR = /[А-Яа-яЁё]/;

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

test('урок без английской версии открывается по-русски с пометкой', () => {
    const app = loadApp({ storage: { app_lang: 'en' } });
    app.window.openLesson(4);
    const note = app.document.getElementById('lessonLanguageNote');
    assert.ok(!note.classList.contains('hidden'), 'пометка об отсутствии перевода не показана');
    assert.ok(note.textContent.includes('no English version'), 'пометка не объясняет причину');
    const grammar = app.document.getElementById('grammarContent');
    assert.ok(CYR.test(grammar.textContent), 'материал непереведённого урока должен остаться русским');
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

test('английский урок берётся только там, где он есть', () => {
    const app = loadApp();
    assert.strictEqual(app.window.hasEnglishLesson('greek', 1), true);
    assert.strictEqual(app.window.hasEnglishLesson('greek', 4), false);
    assert.strictEqual(app.window.hasEnglishLesson('hebrew', 3), true);
    assert.strictEqual(app.window.hasEnglishLesson('hebrew', 12), false);
    app.close();
});
