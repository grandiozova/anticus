// ============================================================
// ПОИСК ПО УРОКАМ И ТЕМАМ
// ============================================================
// Список уроков остаётся оглавлением курса, а поиск над ним — единственный
// способ найти урок, когда не знаешь, в каком он («где вообще учат аористу»).
// Ищет он и по названиям уроков, и по темам внутри них, а темы берутся из
// заголовков материала. Поэтому главный тест здесь — не про строку поиска,
// а про то, что указатель тем и заголовки на экране это один и тот же список:
// разойтись они могут молча, и поиск тогда вёл бы не туда.

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');

const GREEK = { app_default_course: 'greek' };
const HEBREW = { app_course: 'hebrew', app_default_course: 'hebrew' };

const ROWS = '#lessonGrid .lesson-item__headline';
const NUMBERS = '#lessonGrid .lesson-item__avatar';
const TOPICS = '#lessonGrid .lesson-topic__text';

function texts(app, sel) {
    return Array.from(app.document.querySelectorAll(sel)).map(el => el.textContent.replace(/\s+/g, ' ').trim());
}

// Набираем запрос так же, как это делает поле: значение + обработчик oninput.
function search(app, text) {
    let input = app.document.getElementById('lessonSearchInput');
    input.value = text;
    app.window.filterLessonList();
}

test('без запроса список уроков — прежнее оглавление, без тем', () => {
    const app = loadApp({ storage: GREEK });
    // Число уроков берём из данных: курс растёт, и зашитая цифра ломалась бы
    // на каждом добавленном уроке.
    const nums = app.window.lessonNumbers();
    assert.strictEqual(app.text('#lessonGridTitle'), 'Уроки ' + nums[0] + '–' + nums[nums.length - 1]);
    assert.strictEqual(texts(app, ROWS).length, nums.length);
    assert.strictEqual(texts(app, NUMBERS)[0], '1');
    assert.strictEqual(texts(app, TOPICS).length, 0, 'темы в оглавлении не показываются');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('поиск находит урок по названию', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'правила чтения');
    assert.strictEqual(texts(app, NUMBERS).join(','), '2');
    assert.match(texts(app, ROWS)[0], /Ударение и правила чтения/);
    assert.strictEqual(app.text('#lessonGridTitle'), 'Совпадения: 1');
    assert.ok(app.document.getElementById('lessonSearchClear').classList.contains('show'),
        'крестик очистки появляется вместе с запросом');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('тема внутри урока находится и показывается под его строкой', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'praesens');
    assert.strictEqual(texts(app, NUMBERS).join(','), '3', 'регистр запроса не важен');
    const topics = texts(app, TOPICS);
    assert.ok(topics.length >= 2, 'найдены обе темы про Praesens: ' + topics.length);
    assert.ok(topics.some(t => /^2\. Praesens Indicativi Activi/.test(t)), topics.join(' | '));
    // Показаны только совпавшие темы, а не весь урок
    assert.ok(topics.every(t => /praesens/i.test(t)), 'в результатах лишние темы: ' + topics.join(' | '));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('нажатие на тему открывает урок на материале и подсвечивает заголовок', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'нечистой альфы');
    assert.strictEqual(texts(app, NUMBERS).join(','), '5');
    const topicEl = app.document.querySelector('#lessonGrid .lesson-topic');
    const topicText = topicEl.querySelector('.lesson-topic__text').textContent.replace(/\s+/g, ' ').trim();
    topicEl.click();

    assert.strictEqual(app.screen(), 'lessonSection');
    assert.ok(app.document.getElementById('partMaterial').classList.contains('active'),
        'материал урока открыт сразу, минуя список разделов');
    assert.strictEqual(app.text('#lessonTitle'), app.window.getLessonData(5).title);

    const target = app.document.querySelector('#grammarContent .grammar-h.is-target');
    assert.ok(target, 'заголовок должен быть подсвечен — иначе не видно, куда пришёл');
    assert.strictEqual(target.textContent.replace(/\s+/g, ' ').trim(), topicText);
    assert.ok(target.getAttribute('data-grammar-heading') !== null, 'у заголовка есть метка для прыжка');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('второй прыжок по тому же уроку оставляет одну подсветку', () => {
    const app = loadApp({ storage: GREEK });
    // Урок 5 — два разных заголовка одного материала
    app.window.openLessonTopic(5, 1);
    const first = app.document.querySelector('#grammarContent .grammar-h.is-target');
    assert.ok(first, 'первый заголовок подсвечен');
    app.window.openLessonTopic(5, 6);
    const marked = Array.from(app.document.querySelectorAll('#grammarContent .grammar-h.is-target'));
    assert.strictEqual(marked.length, 1, 'подсвечен должен быть только последний заголовок');
    assert.notStrictEqual(marked[0].textContent, first.textContent, 'и это другой заголовок');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('запрос без совпадений говорит об этом прямо', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'щщщ');
    assert.strictEqual(texts(app, ROWS).length, 0);
    assert.match(app.text('#lessonGrid'), /Ничего не найдено/);
    assert.strictEqual(app.text('#lessonGridTitle'), 'Поиск');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('очистка возвращает оглавление', () => {
    const app = loadApp({ storage: GREEK });
    const nums = app.window.lessonNumbers();
    search(app, 'ударен');
    assert.ok(texts(app, ROWS).length > 1);
    app.window.clearLessonSearch();
    assert.strictEqual(texts(app, ROWS).length, nums.length);
    assert.strictEqual(app.text('#lessonGridTitle'), 'Уроки ' + nums[0] + '–' + nums[nums.length - 1]);
    assert.strictEqual(app.document.getElementById('lessonSearchInput').value, '');
    assert.ok(!app.document.getElementById('lessonSearchClear').classList.contains('show'));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('искать можно и по-гречески без диакритики', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'ωρα');
    assert.strictEqual(texts(app, NUMBERS).join(','), '5', '«ωρα» находит «ὥρα»');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('слова запроса ищутся все, а не подряд', () => {
    const app = loadApp({ storage: HEBREW });
    // «знак шва» есть в теме целиком, «шва дагеш» — нет ни одной темы, где оба
    search(app, 'знак шва');
    assert.strictEqual(texts(app, NUMBERS).join(','), '2,3');
    search(app, 'шва дагеш');
    assert.strictEqual(texts(app, ROWS).length, 0, 'слова не должны склеиваться из разных тем');
    search(app, 'слогораздел дагеш');
    assert.strictEqual(texts(app, NUMBERS).join(','), '3');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('указатель тем и заголовки материала — один список', () => {
    for (const [storage, numbers] of [[GREEK, [1, 2, 3, 5, 8, 10]], [HEBREW, [1, 2, 5, 8, 11]]]) {
        const app = loadApp({ storage });
        for (const n of numbers) {
            app.window.openLesson(n);
            const rendered = Array.from(app.document.querySelectorAll('#grammarContent .grammar-h'));
            const raw = app.window.grammarHeadings(app.window.getLessonData(n).grammar);
            assert.strictEqual(rendered.length, raw.length, 'урок ' + n + ': число заголовков');
            rendered.forEach((el, i) => {
                assert.strictEqual(el.getAttribute('data-grammar-heading'), String(i),
                    'урок ' + n + ': метка заголовка ' + i + ' — это его порядок в материале');
                const box = app.document.createElement('div');
                box.innerHTML = raw[i];
                assert.strictEqual(el.textContent.replace(/\s+/g, ' ').trim(),
                    box.textContent.replace(/\s+/g, ' ').trim(),
                    'урок ' + n + ': текст заголовка ' + i);
            });
        }
        assert.deepStrictEqual(app.errors, []);
        app.close();
    }
});

test('поиск идёт по урокам открытого курса, а смена курса его забывает', () => {
    const app = loadApp({ storage: GREEK });
    search(app, 'шва');
    assert.strictEqual(texts(app, ROWS).length, 0, 'в греческом такого слова нет');
    const before = app.get('lessonSearchIndex');
    app.window.switchCourse();
    assert.strictEqual(app.get('lessonQuery'), '', 'запрос прошлого курса не переносится');
    assert.notStrictEqual(app.get('lessonSearchIndex'), before, 'указатель тем собран заново');
    assert.strictEqual(app.document.getElementById('lessonSearchInput').value, '');
    search(app, 'шва');
    assert.strictEqual(texts(app, NUMBERS).join(','), '2,3', 'в иврите тема находится');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

// Ради этого шага поиск и делался: урок, дописанный в data/*-lessons.js, должен
// попасть и в оглавление, и в поиск со своими темами — без правок в коде и без
// отдельного поля с темами. Здесь урок дописывается в данные на глазах у теста;
// в жизни он появляется в файле до запуска, и указатель собирается уже с ним.
test('урок, дописанный в данные, попадает в список и в поиск со своими темами', () => {
    const app = loadApp({ storage: GREEK });
    // Номер берём следующий за последним: настоящие уроки растут, и жёстко
    // зашитая «11» однажды совпала бы с реальным уроком и сломала бы тест.
    const nums = app.window.lessonNumbers();
    const num = nums[nums.length - 1] + 1;
    app.window.eval(`COURSES.greek.lessons[${num}] = {
        title: 'Урок-образец',
        grammar: '<b>1. Проверочная тема</b><br>Вторичные окончания.<br><br><b>2. Вторая проверочная тема</b><br>О незавершённом действии.'
    };`);
    app.window.eval('lessonSearchIndex = null');
    app.window.renderMainMenu();
    assert.strictEqual(texts(app, ROWS).length, nums.length + 1, 'новый урок попал в оглавление');
    search(app, 'проверочная');
    assert.strictEqual(texts(app, NUMBERS).join(','), String(num));
    assert.strictEqual(texts(app, TOPICS).length, 2, 'обе темы нового урока нашлись');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});
