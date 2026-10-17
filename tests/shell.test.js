// ============================================================
// ОБОЛОЧКА: app bar, навигация, кнопка «назад», FAB
// ============================================================
// Разметка index.html держит только пустые контейнеры (#appBarLeading,
// #appBarTitle, #mainFab) — наполняет их updateShell(). Когда shell.js
// однажды потерял половину содержимого, разметка осталась валидной, а
// кнопка «назад» исчезла со всех экранов разом. Эти тесты про такой отказ.

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');

const DESTINATIONS = [
    { dest: 'lessons',  section: 'mainMenu',             title: 'Древнегреческий', fab: 'Продолжить' },
    { dest: 'vocab',    section: 'allVocabSection',      title: 'Словарь',         fab: 'Повторить' },
    { dest: 'cards',    section: 'allFlashcardsSection', title: 'Проверка слов',   fab: 'Заново' },
    { dest: 'progress', section: 'statsSection',         title: 'Прогресс',        fab: null },
    { dest: 'settings', section: 'settingsSection',      title: 'Настройки',       fab: null }
];

test('нижняя навигация ведёт на свои экраны и ничего не роняет', () => {
    const app = loadApp();
    for (const d of DESTINATIONS) {
        app.window.navigateTo(d.dest);
        assert.strictEqual(app.screen(), d.section, 'navigateTo(' + d.dest + ')');
        assert.strictEqual(app.appBarTitle(), d.title, 'заголовок для ' + d.dest);
        assert.strictEqual(app.navActive(), d.dest, 'подсветка навигации для ' + d.dest);

        const fab = app.fab();
        if (d.fab === null) assert.ok(fab.hidden, 'на ' + d.dest + ' FAB должен быть скрыт');
        else {
            assert.ok(!fab.hidden, 'на ' + d.dest + ' FAB должен быть виден');
            assert.strictEqual(fab.label, d.fab);
        }
    }
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('ни один экран не остаётся пустым', () => {
    const app = loadApp();
    for (const d of DESTINATIONS) {
        app.window.navigateTo(d.dest);
        const text = app.document.getElementById(d.section).textContent.replace(/\s+/g, ' ').trim();
        assert.ok(text.length > 20, 'экран ' + d.section + ' отрисовался пустым: ' + JSON.stringify(text));
    }
    app.close();
});

test('в разметку экранов не протекают undefined и NaN', () => {
    const app = loadApp();
    for (const d of DESTINATIONS) {
        app.window.navigateTo(d.dest);
        const html = app.document.getElementById(d.section).innerHTML;
        assert.ok(!/undefined|NaN|\[object Object\]/.test(html),
            'служебное значение в разметке ' + d.section);
    }
    app.close();
});

test('кнопка «назад» появляется ровно там, где есть куда возвращаться', () => {
    const app = loadApp();
    const w = app.window;

    // экраны верхнего уровня — возвращаться некуда
    for (const d of DESTINATIONS) {
        w.navigateTo(d.dest);
        assert.strictEqual(!!app.backButton(), false, 'на ' + d.dest + ' кнопки «назад» быть не должно');
    }

    // вложенные экраны — кнопка обязана быть
    const nested = [
        ['урок',       () => w.openLesson(4)],
        ['упражнение', () => { w.openLesson(4); w.startLessonDrill('exercise', 'case_number'); }],
        ['тест',       () => { w.openLesson(4); w.startTest(); }],
        ['ошибки',     () => { w.showStats(); w.showErrors(); }],
        ['Отче наш',   () => w.showPrayer()]
    ];
    for (const [name, open] of nested) {
        open();
        assert.ok(app.backButton(), 'на экране «' + name + '» нет кнопки «назад»');
    }
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('урок открывается сразу на материале, а «назад» ведёт к списку уроков', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    assert.strictEqual(app.get('currentLessonPart'), 'material', 'урок открывается на материале');
    assert.ok(app.document.getElementById('partMaterial').classList.contains('active'));
    assert.ok(!app.document.getElementById('partMenu'), 'списка разделов больше нет');
    assert.ok(!app.document.getElementById('lessonTabs').classList.contains('hidden'), 'вкладки видны');

    w.goBack();
    assert.strictEqual(app.get('currentSectionId'), 'mainMenu', '«назад» с урока — к списку уроков');
    app.close();
});

test('«назад» с упражнения, теста и ошибок возвращает на нужный экран', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startLessonDrill('exercise', 'case_number');
    w.goBack();
    assert.strictEqual(app.get('currentSectionId'), 'lessonSection', 'с упражнения — к уроку');

    w.openLesson(4);
    w.startTest();
    w.goBack();
    assert.strictEqual(app.get('currentSectionId'), 'lessonSection', 'с теста — к уроку');

    w.showStats();
    w.showErrors();
    w.goBack();
    assert.strictEqual(app.get('currentSectionId'), 'statsSection', 'с ошибок — к прогрессу');
    app.close();
});

test('заголовок app bar называет текущий урок и упражнение', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(7);
    assert.strictEqual(app.appBarTitle(), 'Урок 7');

    w.startLessonDrill('exercise', 'case_number');
    assert.strictEqual(app.appBarTitle(), 'Падеж и число', 'на экране упражнения заголовок называет упражнение');
    app.close();
});

test('FAB на уроке ведёт к упражнениям и скрыт в самом списке упражнений', () => {
    const app = loadApp();
    const w = app.window;

    // Алфавит и правила чтения тоже тренируются, поэтому уроки 1–2 не вводные.
    w.openLesson(1);
    assert.ok(!app.fab().hidden, 'урок 1 — алфавит, упражнения есть');
    assert.strictEqual(app.fab().label, 'Упражнения');

    w.onFabClick();
    assert.strictEqual(app.get('currentLessonPart'), 'exercise', 'FAB открывает упражнения');
    assert.ok(app.fab().hidden, 'в списке упражнений выбирают вручную — FAB не нужен');

    w.switchLessonPart('material');
    assert.ok(!app.fab().hidden, 'на материале FAB снова виден');

    // Сам механизм вводных уроков остался — курс может объявить урок без
    // упражнений в introLessons, и тогда FAB прячется. Ни один курс таких
    // уроков сейчас не объявляет, поэтому проверяем на дописанном.
    app.get('(function () { activeCourse().introLessons.push(1); return 0; })()');
    w.openLesson(1);
    assert.ok(app.fab().hidden, 'вводный урок — тренировать нечего');
    assert.ok(app.document.getElementById('lessonTabs').classList.contains('hidden'),
        'у вводного урока одна вкладка — ряд вкладок не нужен');
    assert.ok(app.document.getElementById('lessonTestCard').classList.contains('hidden'),
        'и проверять нечего');
    app.get('(function () { activeCourse().introLessons.pop(); return 0; })()');
    app.close();
});

test('тест — пункт внутри упражнений, отдельной вкладки у него нет', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    const tabs = Array.from(app.document.querySelectorAll('#lessonTabs button'))
        .map(b => b.getAttribute('data-part'));
    assert.deepStrictEqual(tabs, ['material', 'exercise']);
    assert.strictEqual(app.document.querySelector('#partMaterial .lesson-item'), null,
        'в материале пунктов-меню больше нет');

    w.switchLessonPart('exercise');
    const entry = app.document.querySelector('#partExercise #lessonTestEntry .lesson-item');
    assert.ok(entry, 'в «Упражнениях» есть пункт «Тест»');
    assert.match(entry.textContent, /Тест/);

    entry.click();
    assert.strictEqual(app.get('currentSectionId'), 'testSection', 'пункт запускает тест');
    app.close();
});

test('подсветка навигации следует за экраном, а не только за кликом по панели', () => {
    const app = loadApp();
    const w = app.window;

    w.showPrayer();
    assert.strictEqual(app.navActive(), 'lessons', '«Отче наш» относится к разделу уроков');
    w.showStats();
    assert.strictEqual(app.navActive(), 'progress');
    w.showErrors();
    assert.strictEqual(app.navActive(), 'progress', 'разбор ошибок остаётся в разделе прогресса');
    app.close();
});

test('отложенный переход гасится при уходе с экрана', () => {
    // Иначе таймер срабатывает уже на другом экране и перерисовывает
    // спрятанный контейнер.
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startLessonDrill('exercise', 'case_number');
    app.document.querySelector('#drillSection .option-btn').click();
    assert.ok(app.get('window._advanceTimer'), 'после ответа переход должен быть запланирован');

    w.goToMain();
    assert.ok(!app.get('window._advanceTimer'), 'при уходе с экрана таймер обязан гаситься');
    app.close();
});

// Прокрутки из JS, которые просят behavior явно: CSS-блок reduced-motion
// над ними не властен, поэтому каждая обязана спросить систему сама.
function recordScrolls(app) {
    const calls = [];
    const record = (target) => function (opts) { calls.push({ target, behavior: opts && opts.behavior }); };
    app.window.scrollTo = record('window');
    app.window.HTMLElement.prototype.scrollTo = record('element');
    return calls;
}

function scrollAround(app) {
    const w = app.window;
    w.openLesson(4);               // showSection → прокрутка страницы
    w.switchLessonPart('material'); // вкладка → прокрутка панели вкладок
    w.goBack();                    // раздел → меню урока
    w.navigateTo('settings');      // смена экрана → прокрутка страницы
}

test('при «меньше движения» прокрутка из скрипта не плавная', () => {
    const app = loadApp({ reducedMotion: true });
    const calls = recordScrolls(app);
    scrollAround(app);

    assert.ok(calls.some(c => c.target === 'window'), 'страница ни разу не прокручивалась — тест ничего не проверил');
    assert.ok(calls.some(c => c.target === 'element'), 'панель вкладок ни разу не прокручивалась');
    const smooth = calls.filter(c => c.behavior === 'smooth');
    assert.deepStrictEqual(smooth.map(c => c.target), [], 'плавная прокрутка при prefers-reduced-motion');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('без «меньше движения» прокрутка из скрипта плавная', () => {
    const app = loadApp();
    const calls = recordScrolls(app);
    scrollAround(app);
    assert.ok(calls.length > 0);
    assert.ok(calls.every(c => c.behavior === 'smooth'), 'прокрутка потеряла плавность: ' +
        calls.map(c => c.target + ':' + c.behavior).join(', '));
    app.close();
});

test('FAB на главном экране открывает последний урок', () => {
    const app = loadApp({ storage: { greek_last_lesson: '6' } });
    app.window.goToMain();
    app.window.onFabClick();
    assert.strictEqual(app.get('currentLesson'), 6);
    assert.strictEqual(app.get('currentSectionId'), 'lessonSection');
    app.close();
});
