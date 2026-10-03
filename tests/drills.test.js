// ============================================================
// УПРАЖНЕНИЯ УРОКА И ТЕСТ
// ============================================================

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');
const { playThrough } = require('./helpers/play.js');

const DRILLS = [
    ['exercise', 'letter_name'],
    ['exercise', 'letter_write'],
    ['exercise', 'letter_from_name'],
    ['exercise', 'letter_sound'],
    ['exercise', 'letter_order'],
    ['exercise', 'letter_case_lower'],
    ['exercise', 'letter_case_upper'],
    ['exercise', 'diphthong_sound'],
    ['exercise', 'breathing_type'],
    ['exercise', 'accent_type'],
    ['exercise', 'heb_letter_final'],
    ['exercise', 'heb_begadkefat'],
    ['exercise', 'heb_vowel_name'],
    ['exercise', 'heb_vowel_sound'],
    ['vowel_flashcards', 'vowels'],
    ['vowel_write', 'vowels'],
    ['exercise', 'case_number'],
    ['exercise', 'agreement'],
    ['exercise', 'attribute_vs_predicate'],
    ['exercise', 'substantivation'],
    ['exercise', 'article_fill'],
    ['exercise', 'translate_greek_to_russian'],
    ['exercise', 'translate_russian_to_greek'],
    ['translation', 'el_to_ru'],
    ['translation', 'ru_to_el'],
    ['flashcards', 'flashcards']
];

test('letter_write показывает русское имя буквы, а не её начертание', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(1);
    w.startLessonDrill('exercise', 'letter_write');

    const q = app.get('exerciseState').questions[0];
    const prompt = app.document.querySelector('#exerciseQuestion .md-prompt-strong, #exerciseQuestion .md-prompt-ru');
    assert.ok(prompt, 'строка вопроса не отрисовалась');
    // Рисуют по читаемому имени: греческое ἄλφα в начале курса ещё не читается,
    // поэтому под вопросом стоит русское прочтение названия из пула (q.ru).
    assert.strictEqual(prompt.textContent.trim(), q.ru, 'под вопросом должно быть русское имя буквы');
    assert.ok(prompt.classList.contains('md-prompt-ru'), 'русское имя набрано как изучаемый текст');
    assert.notStrictEqual(prompt.textContent.trim(), q.name, 'под вопросом осталось греческое название');
    assert.notStrictEqual(prompt.textContent.trim(), q.letter, 'под вопросом не должно быть начертания буквы');
    app.close();
});

test('греческий показ буквы идёт прописной вперёд — и без RTL', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(1);
    w.startLessonDrill('exercise', 'letter_write');

    const state = app.get('exerciseState');
    // Сигма — крайний случай: строчная и прописная у неё разной ширины, и
    // порядок «строчная, прописная» на ней и выглядел перевёрнутым.
    const sigma = state.questions.findIndex(x => x.letter === 'σ');
    assert.ok(sigma >= 0, 'в вопросах урока 1 нет сигмы');

    // Экрана выбора начертания у греческого нет: рукописного шрифта у курса нет
    // (COURSES.greek без cursiveWriting), выбирать нечего — упражнение идёт
    // сразу с первой буквы, минуя выбор.
    assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .letter-write-choice').length, 0,
        'у греческого письма появился экран выбора начертания');
    assert.ok(app.document.querySelector('#letterWriteCanvas'), 'греческое письмо не началось с холста');

    for (const index of [0, sigma]) {
        state.index = index;
        w.completeLetterWritingPractice();

        const q = state.questions[index];
        const forms = app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__forms .script');
        assert.strictEqual(forms.length, 2, q.name + ': должны показаться обе формы');
        assert.strictEqual(forms[0].textContent, q.upper, q.name + ': первой идёт прописная');
        assert.strictEqual(forms[1].textContent, q.letter, q.name + ': второй идёт строчная');

        // Разворот греческого показа был бы утечкой направления письма курса
        // в чужой язык: ни dir, ни direction в разметке здесь быть не должно —
        // письмо задаёт .script, а он берёт сторону у <html>.
        assert.strictEqual(
            app.document.querySelectorAll('#exerciseQuestion [dir], #exerciseQuestion [style*="rtl"]').length,
            0,
            q.name + ': в греческом показе не должно быть ни dir, ни rtl');

        // Греческий показ собирается своей строкой, а не ветвью еврейского:
        // заголовка «Готово» над буквами здесь тоже быть не должно.
        assert.strictEqual(
            app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__title').length, 0,
            q.name + ': над буквами остался заголовок карточки показа');

        // Показ грека — две формы и ничего больше: ни имени буквы, ни курсива,
        // ни выбора начертания на экране.
        assert.strictEqual(
            app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__name').length, 0,
            q.name + ': на карточке показа осталось имя буквы');
        assert.strictEqual(
            app.document.querySelector('#exerciseQuestion .letter-write-reveal').children.length, 1,
            q.name + ': в карточке показа больше одного элемента');
        assert.strictEqual(
            app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__forms.script--cursive').length, 0,
            q.name + ': греческий показ показан курсивом');
        assert.strictEqual(
            app.document.querySelectorAll('#exerciseQuestion .letter-write-toggle, #exerciseQuestion .letter-write-choice').length,
            0,
            q.name + ': у греческого письма появился выбор начертания');
    }

    app.close();
});

test('после показа буквы можно вернуться к письму', () => {
    // «Готово» можно нажать, не дорисовав букву, — тогда ответ засчитан, а
    // написать хочется. Кнопка «Назад» возвращает тот же вопрос с холстом и
    // снимает засчитанный ответ, чтобы «Готово» засчитало его заново, а не
    // удвоило счёт.
    const app = loadApp();
    const w = app.window;
    const state = () => app.get('exerciseState');
    const nextBtn = () => [...app.document.querySelectorAll('#exerciseQuestion .menu-btn')]
        .find(b => /Далее/.test(b.textContent));
    const backBtn = () => [...app.document.querySelectorAll('#exerciseQuestion .menu-btn')]
        .find(b => /Назад/.test(b.textContent));

    w.openLesson(1);
    w.startLessonDrill('exercise', 'letter_write');
    const index = state().index;
    const before = state().correct;
    const totalBefore = w.eval('stats.totalCorrect');

    w.completeLetterWritingPractice();
    // Ответ засчитан, показан показ буквы и «Далее».
    assert.strictEqual(state().correct, before + 1, 'ответ не засчитан');
    assert.strictEqual(w.eval('stats.totalCorrect'), totalBefore + 1, 'счётчик ответов не вырос');
    assert.ok(nextBtn(), 'после показа нет кнопки «Далее»');
    assert.ok(!app.document.querySelector('#letterWriteCanvas'), 'холст остался после показа');

    // «Назад» — тот же вопрос с холстом, без показа.
    const back = backBtn();
    assert.ok(back, 'после показа нет кнопки «Назад»');
    // Стоит там же, где «Очистить»: у левого края строки.
    assert.ok(back.classList.contains('menu-btn') && back.classList.contains('outlined'),
        '«Назад» — не текстовая кнопка рядом с главным действием');
    assert.strictEqual(back.parentElement.className.indexOf('exercise-actions') >= 0, true,
        '«Назад» потеряла общий с холстом ряд кнопок');
    back.click();

    assert.ok(app.document.querySelector('#exerciseQuestion #letterWriteCanvas'), '«Назад» не вернула холст');
    assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal').length, 0,
        'после «Назад» остался показ буквы');
    assert.strictEqual(state().index, index, '«Назад» сдвинула вопрос');
    assert.strictEqual(state().correct, before, '«Назад» не сняла засчитанный ответ');
    assert.strictEqual(w.eval('stats.totalCorrect'), totalBefore, '«Назад» не вернула счётчик ответов');
    // На возвращённом холсте те же кнопки, что и были: «Очистить» и «Готово».
    assert.ok([...app.document.querySelectorAll('#exerciseQuestion .menu-btn')].some(b => /Очистить/.test(b.textContent)),
        'на возвращённом холсте нет «Очистить»');
    assert.ok([...app.document.querySelectorAll('#exerciseQuestion .menu-btn')].some(b => /Готово/.test(b.textContent)),
        'на возвращённом холсте нет «Готово»');

    // И «Готово» снова засчитывает ответ — ровно один раз.
    w.completeLetterWritingPractice();
    assert.strictEqual(state().correct, before + 1, 'повторное «Готово» не засчитало ответ');
    assert.strictEqual(w.eval('stats.totalCorrect'), totalBefore + 1, 'повторное «Готово» удвоило счётчик');

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('холст письма подгоняется под свою ширину, а не растягивается', () => {
    // jsdom ни вёрстку, ни canvas не умеет, поэтому и замер, и 2d-контекст
    // подменяем сами: рамка объявляется заранее, а буфер обязан прийти к ней, а
    // не к 300×150 по умолчанию. Это и есть регрессия, которую ловим: холст
    // получал размер один раз, до того как карточка стала своей ширины, а CSS
    // потом растягивал буфер — на телефоне штрих уезжал из-под пальца, а линии
    // выходили размытыми.
    const app = loadApp();
    const w = app.window;

    w.eval(`
        HTMLCanvasElement.prototype.getBoundingClientRect = function () {
            return { width: 300, height: 200, left: 0, top: 0, right: 300, bottom: 200 };
        };
        // Заглушка 2d-контекста: приложению нужны только эти вызовы, и все они
        // должны пройти, иначе initWritingCanvas вернётся до подгонки.
        const noop = function () {};
        const fakeCtx = {
            setTransform: noop, clearRect: noop, beginPath: noop, moveTo: noop,
            lineTo: noop, stroke: noop, drawImage: noop,
            getImageData: function () { return { data: [] }; }
        };
        HTMLCanvasElement.prototype.getContext = function () { return fakeCtx; };
        window.ResizeObserver = undefined;
    `);

    w.openLesson(1);
    w.startLessonDrill('exercise', 'letter_write');

    const canvas = app.document.querySelector('#letterWriteCanvas');
    assert.ok(canvas, 'холст письма не отрисовался');
    assert.strictEqual(canvas.width, 300, 'ширина буфера не подогнана под рамку');
    assert.strictEqual(canvas.height, 200, 'высота буфера не подогнана под рамку');

    // Подгонка обязана продолжаться после клика по упражнению. Первая версия
    // гасила наблюдатель на первом же тапе внутри #exerciseQuestion — то есть
    // на первом штрихе по холсту, — и окно после этого поле больше не двигало.
    // Ловим это прямо: свой ResizeObserver считает подписки, а клик по холсту
    // их число менять не должен. jsdom настоящего ResizeObserver не имеет.
    w.eval(`
        window.__roLive = 0;
        const RealRO = window.ResizeObserver;
        window.ResizeObserver = function (cb) {
            window.__roLive++;
            this.__cb = cb;
            this.observe = function () {};
            this.disconnect = function () { window.__roLive--; };
        };
    `);
    // Перерисовываем холст — приложение заводит на нём наблюдателя…
    w.showExercise();
    const canvas2 = app.document.querySelector('#letterWriteCanvas');
    assert.strictEqual(w.eval('window.__roLive'), 1, 'наблюдатель за холстом не заведён');
    // …и клик по упражнению (тапа по холсту достаточно) не должен его гасить.
    canvas2.click();
    assert.strictEqual(w.eval('window.__roLive'), 1,
        'клик по упражнению отключил наблюдатель за холстом — поле перестанет тянуться');

    // Смена высоты окна обязана пересобирать буфер. Высота поля теперь считается
    // от высоты окна (100dvh), а ResizeObserver на карточке такое изменение
    // передаёт не во всех браузерах, — поэтому слежение обязано дублироваться
    // window.resize. Проверяем сам путь: шлём событие и смотрим на буфер.
    w.eval(`
        HTMLCanvasElement.prototype.getBoundingClientRect = function () {
            return { width: 250, height: 400, left: 0, top: 0, right: 250, bottom: 400 };
        };
    `);
    w.dispatchEvent(new w.Event('resize'));
    assert.strictEqual(canvas2.width, 250, 'window.resize не сузил буфер под новую рамку');
    assert.strictEqual(canvas2.height, 400, 'window.resize не растянул буфер под новую высоту окна');

    // Жест, начатый на холсте, не должен тянуть страницу. На iOS Safari одного
    // touch-action: none не хватает: прокрутка доходит до документа, и поле
    // уезжает вниз прямо под рукой. Ловим сам предохранитель — touchmove
    // обязан быть погашен.
    const touchMove = new w.Event('touchmove', { bubbles: true, cancelable: true });
    canvas2.dispatchEvent(touchMove);
    assert.ok(touchMove.defaultPrevented,
        'touchmove на холсте не погашен — на iOS поле уедет вниз под рукой');

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('письмо начинается с выбора начертания на весь заход', () => {
    // Печатное и рукописное — один и тот же вопрос с разным показом, поэтому
    // начертание выбирается один раз, до первой буквы, и держится до конца
    // захода. Переключателя внутри упражнения нет.
    const app = loadApp({ storage: { app_course: 'hebrew', app_default_course: 'hebrew' } });
    const w = app.window;
    const rowsIn = () => [...app.document.querySelectorAll('#exerciseQuestion .letter-write-choice .lesson-item')];
    const open = () => { w.openLesson(1); w.startLessonDrill('exercise', 'letter_write'); };
    open();

    // Сперва выбор, а не первая буква: вопросов ещё нет, холста тоже.
    const card = app.document.querySelector('#exerciseQuestion .letter-write-choice');
    assert.ok(card, 'письмо не показало выбор начертания');
    assert.ok(!app.document.querySelector('#exerciseQuestion canvas'), 'холст показан до выбора');
    assert.strictEqual(app.get('exerciseState.questions.length'), 0, 'вопросы начались до выбора');
    const rows = rowsIn();
    assert.strictEqual(rows.length, 2, 'пунктов выбора не два');
    assert.strictEqual(rows.map(r => r.querySelector('.lesson-item__headline').textContent).join(' | '),
        '\u05D0 Печатные | \u05D0 Курсив', 'пункты выбора названы не так');
    // Ни заголовка «Как писать буквы», ни круглого значка, ни поясняющей строки:
    // в пункте стоит сама буква-образец, а за ней — название начертания.
    assert.strictEqual(
        app.document.querySelectorAll('#exerciseQuestion .letter-write-choice h3, ' +
            '#exerciseQuestion .letter-write-choice .lesson-item__avatar, ' +
            '#exerciseQuestion .letter-write-choice .lesson-item__supporting').length,
        0, 'в выборе начертания остались заголовок, значок или поясняющая строка');
    // Образец в пункте — та же буква в двух начертаниях: по нему и видно, что
    // выбираешь, поэтому у курсива он помечен .script--cursive.
    const samples = rows.map(r => r.querySelector('.lesson-item__headline .script'));
    assert.ok(samples[0] && samples[1], 'в пунктах нет образца буквы');
    assert.strictEqual(samples[0].textContent.trim(), samples[1].textContent.trim(),
        'образцы в пунктах — разные буквы');
    assert.ok(!samples[0].classList.contains('script--cursive'), 'печатный образец помечен курсивом');
    assert.ok(samples[1].classList.contains('script--cursive'), 'образец курсива не помечен .script--cursive');

    // Выбор курсива: весь заход идёт курсивом, и переключателя нигде нет.
    rows[1].click();
    assert.ok(!app.document.querySelector('#exerciseQuestion .letter-write-choice'), 'выбор остался на экране');
    assert.strictEqual(app.get('exerciseState.questions.length'), 28, 'после выбора не 28 букв');
    assert.ok(app.document.querySelector('#exerciseQuestion canvas'), 'после выбора нет холста');
    assert.strictEqual(
        app.document.querySelectorAll('#exerciseQuestion .letter-write-toggle, #exerciseQuestion .md-segmented').length,
        0, 'на экране упражнения остался переключатель начертания');
    // В упражнении нет поясняющей строки: под прогрессом сразу название буквы.
    assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .question').length, 0,
        'в письме осталась строка «Напишите букву от руки»');
    const prompt = app.document.querySelector('#exerciseQuestion .md-prompt-strong, #exerciseQuestion .md-prompt-ru');
    const q0 = app.get('exerciseState.questions[0]');
    // У конечной формы к названию добавлена пометка — иначе «каф» просило бы
    // и обычную כ, и конечную ך.
    assert.strictEqual(prompt.textContent.trim(), q0.name + (q0.finalForm ? ' (конечная)' : ''),
        'под вопросом не имя буквы');

    w.completeLetterWritingPractice();
    const forms = app.document.querySelector('#exerciseQuestion .letter-write-reveal__forms');
    const glyph = forms.querySelector('.script');
    const q = app.get('exerciseState.questions[0]');
    assert.strictEqual(forms.textContent.trim(), q.letter, 'показано не то начертание');
    // Буква помечена .script внутри коробки, как у греческого, а не самой
    // коробкой: та же разметка даёт и общий с греком кегль (см. ниже), и
    // центрирование. Пометка на коробке оставила бы иврит на одном множителе —
    // вдвое мельче греческого показа.
    assert.ok(glyph, 'буква не помечена .script');
    assert.strictEqual(forms.children.length, 1, 'в показе больше одной формы');
    assert.ok(glyph.classList.contains('script--cursive'), 'курсив не получил .script--cursive');
    // Карточка показа — только начертание: имени буквы на ней нет, «Готово» тоже
    // (кнопку с этим словом уже нажали, и после показа её сменила «Далее»).
    assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__name').length, 0,
        'на карточке показа осталось имя буквы');
    assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__title').length, 0,
        'над буквой остался заголовок карточки показа');
    assert.ok(!/Готово/.test(app.document.getElementById('exerciseQuestion').textContent),
        'на карточке показа осталось слово «Готово»');
    assert.strictEqual(app.document.querySelector('#exerciseQuestion .letter-write-reveal').children.length, 1,
        'в карточке показа больше одного элемента');

    // Начертание держится до конца захода, а не слетает на следующем вопросе.
    for (let i = 0; i < 3; i++) {
        const next = [...app.document.querySelectorAll('#exerciseQuestion .menu-btn')]
            .find(b => /Далее/.test(b.textContent));
        assert.ok(next, 'нет кнопки «Далее»');
        next.click();
        assert.ok(app.document.querySelector('#exerciseQuestion canvas'), 'вопрос без холста');
        w.completeLetterWritingPractice();
        assert.ok(app.document.querySelector('#exerciseQuestion .letter-write-reveal__forms .script--cursive'),
            'начертание слетело на ' + (i + 2) + '-м вопросе');
    }

    // «Ещё раз» с экрана результата спрашивает начертание заново.
    w.eval('exerciseState.index = exerciseState.total');
    w.showExercise();
    const again = [...app.document.querySelectorAll('#exerciseQuestion .menu-btn')]
        .find(b => /Ещё раз/.test(b.textContent));
    assert.ok(again, 'на экране результата нет кнопки «Ещё раз»');
    again.click();
    assert.ok(app.document.querySelector('#exerciseQuestion .letter-write-choice'),
        '«Ещё раз» не спросил начертание');
    assert.strictEqual(app.get('exerciseState.questions.length'), 0, '«Ещё раз» начал вопросы до выбора');

    // Второй заход печатный — и он тоже печатный до конца.
    rowsIn()[0].click();
    assert.ok(app.document.querySelector('#exerciseQuestion canvas'), 'печатный заход не начался с холста');
    w.completeLetterWritingPractice();
    assert.ok(!app.document.querySelector('#exerciseQuestion .letter-write-reveal__forms .script--cursive'),
        'печатный заход показан курсивом');

    // И повторное открытие упражнения из списка тоже спрашивает заново.
    open();
    assert.ok(app.document.querySelector('#exerciseQuestion .letter-write-choice'),
        'повторное открытие не спросило начертание');

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('письмо помечает конечные формы и различает шин и син', () => {
    // Обе пометки нужны до рисования. У конечной формы начертание другое, а имя
    // то же, что у основной буквы. У ש в письме два разных начертания, и по
    // общему названию «син / шин» ученик не знал бы, что рисовать.
    const app = loadApp({ storage: { app_course: 'hebrew', app_default_course: 'hebrew' } });
    const w = app.window;
    const state = () => app.get('exerciseState');
    const promptOf = () => app.document
        .querySelector('#exerciseQuestion .md-prompt-strong, #exerciseQuestion .md-prompt-ru').textContent.trim();
    // Заход начинается с выбора начертания; выбираем нужное нажатием пункта —
    // так же, как это делает ученик.
    const choose = cursive => {
        w.openLesson(1);
        w.startLessonDrill('exercise', 'letter_write');
        app.document.querySelectorAll('#exerciseQuestion .letter-write-choice .lesson-item')[cursive ? 1 : 0].click();
    };
    // Ставим вопрос по букве: индекс тот же, меняется только буква на экране.
    const show = letter => {
        const s = state();
        s.index = s.questions.findIndex(x => x.letter === letter);
        assert.ok(s.index >= 0, 'в вопросах письма нет ' + letter);
        w.showExercise();
    };

    choose(false);
    const s = state();
    assert.strictEqual(s.questions.filter(x => x.finalForm).length, 5, 'помечены не пять конечных форм');
    assert.ok(!s.questions.some(x => x.letter === '\u05E9'), 'в письме есть голая ש');

    show('\u05DA');                                   // ך
    assert.strictEqual(promptOf(), 'каф (конечная)', 'конечная форма не помечена в вопросе');
    show('\u05DB');                                   // כ
    assert.strictEqual(promptOf(), 'каф', 'обычная буква получила пометку конечной формы');
    assert.ok(!state().questions[state().index].finalForm, 'обычная буква помечена finalForm');

    // Точки шина и сина — те же кодовые точки, что в таблице алфавита главы 1.
    // Значение из данных, а не набранное в тесте: сверить надо данные.
    const SHIN = s.questions.find(x => x.name === 'шин').letter;
    const SIN = s.questions.find(x => x.name === 'син').letter;
    const points = str => [...str].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')).join(' ');
    assert.strictEqual(points(SHIN), 'U+05E9 U+05C1', 'шин собран не из U+05E9 U+05C1');
    assert.strictEqual(points(SIN), 'U+05E9 U+05C2', 'син собран не из U+05E9 U+05C2');
    assert.notStrictEqual(SHIN, SIN, 'шин и син — одна и та же строка');

    // Печатный заход: показ — та же строка с точкой, без имени на карточке.
    for (const [letter, name] of [[SHIN, 'шин'], [SIN, 'син']]) {
        show(letter);
        assert.strictEqual(promptOf(), name, 'точка ' + name + ' названа не своим именем');
        w.completeLetterWritingPractice();
        const forms = app.document.querySelector('.letter-write-reveal__forms');
        assert.strictEqual(forms.textContent.trim(), letter, 'показ ' + name + ' — не та строка');
        assert.strictEqual(points(forms.textContent.trim()), points(letter),
            'показ ' + name + ' потерял точку');
        assert.ok(!forms.querySelector('.script').classList.contains('script--cursive'),
            'печатный показ ' + name + ' курсивом');
        assert.strictEqual(app.document.querySelectorAll('#exerciseQuestion .letter-write-reveal__name').length, 0,
            'на карточке показа ' + name + ' есть имя буквы');
    }

    // Курсивный заход — те же строки, но рукописной гарнитурой.
    choose(true);
    for (const [letter, name] of [[SHIN, 'шин'], [SIN, 'син']]) {
        show(letter);
        w.completeLetterWritingPractice();
        const forms = app.document.querySelector('.letter-write-reveal__forms');
        assert.strictEqual(points(forms.textContent.trim()), points(letter),
            'курсивный показ ' + name + ' потерял точку');
        assert.ok(forms.querySelector('.script').classList.contains('script--cursive'),
            'показ ' + name + ' не курсивом');
    }

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('каждое доступное упражнение каждого урока проходится до конца', () => {
    const app = loadApp();
    const w = app.window;
    let played = 0;

    for (const lesson of w.lessonNumbers()) {
        w.openLesson(lesson);
        const data = w.getLessonData(lesson);

        for (const [kind, key] of DRILLS) {
            const drill = w.findLessonDrill(kind, key);
            if (!w.lessonDrillAvailable(data, drill)) continue;

            w.startLessonDrill(kind, key);
            const label = `урок ${lesson} / ${kind}:${key}`;

            const box = app.document.querySelector('#drillSection');
            assert.ok(box.textContent.trim().length > 0, label + ' — экран упражнения пуст');
            assert.ok(!/Тип упражнения не поддерживается|Нет вопросов|Нет упражнений|Нет слов/.test(box.textContent),
                label + ' — упражнение не отрисовалось: ' + box.textContent.slice(0, 120));

            const result = playThrough(app, '#drillSection');
            assert.ok(result.steps > 0, label + ' — не удалось сделать ни одного хода');
            assert.ok(result.finished, label + ' — упражнение не дошло до экрана результата');
            played++;
        }
    }

    // Порог — это число доступных упражнений греческого курса. Планка снизу:
    // добавить уроки можно, а вот потерять упражнение из меню — нельзя, и
    // без счёта такое исчезновение прошло бы незамеченным.
    assert.ok(played >= 62, 'ожидалось не меньше 62 упражнений, пройдено всего ' + played);
    assert.deepStrictEqual(app.errors, [], 'ошибки во время прохождения:\n' + app.errors.join('\n'));
    app.close();
});

test('тест урока проходится до конца во всех уроках, где он есть', () => {
    const app = loadApp();
    const w = app.window;
    let played = 0;

    for (const lesson of w.lessonNumbers()) {
        w.openLesson(lesson);
        if (!w.countTestQuestions(w.getLessonData(lesson))) continue;

        w.startTest();
        const box = app.document.querySelector('#testContainer');
        assert.ok(!/Неизвестный тип вопроса/.test(box.textContent), 'урок ' + lesson + ': неизвестный тип вопроса');

        const result = playThrough(app, '#testContainer');
        assert.ok(result.finished, 'урок ' + lesson + ': тест не дошёл до результата');
        played++;
    }

    assert.ok(played > 0, 'ни одного теста не запустилось');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('в вопросах упражнений не протекают undefined и NaN', () => {
    const app = loadApp();
    const w = app.window;

    for (const lesson of w.lessonNumbers()) {
        w.openLesson(lesson);
        const data = w.getLessonData(lesson);
        for (const [kind, key] of DRILLS) {
            if (!w.lessonDrillAvailable(data, w.findLessonDrill(kind, key))) continue;
            w.startLessonDrill(kind, key);
            const html = app.document.querySelector('#drillSection').innerHTML;
            assert.ok(!/undefined|NaN|\[object Object\]/.test(html),
                `урок ${lesson} / ${kind}:${key} — служебное значение в разметке`);
        }
    }
    app.close();
});

test('правильный ответ засчитывается, неправильный попадает в ошибки', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startLessonDrill('exercise', 'case_number');

    const state = app.get('exerciseState');
    const correct = state.questions[0].correct;
    const buttons = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')];
    const right = buttons.find(b => b.textContent === correct);
    assert.ok(right, 'среди вариантов нет правильного ответа');

    right.click();
    assert.strictEqual(app.get('exerciseState.correct'), 1, 'правильный ответ не засчитан');
    assert.strictEqual(app.get('stats.totalCorrect'), 1);
    assert.strictEqual(app.get('stats.totalWrong'), 0);

    // неправильный
    w.cancelAdvance();
    w.showExercise();
    const state2 = app.get('exerciseState');
    const correct2 = state2.questions[state2.index].correct;
    const wrong = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')]
        .find(b => b.textContent !== correct2);
    wrong.click();
    assert.strictEqual(app.get('stats.totalWrong'), 1, 'неправильный ответ не учтён');
    assert.ok(app.get('Object.keys(stats.errors).length') > 0, 'ошибка не записана в разбор');
    app.close();
});

test('после ответа варианты блокируются и правильный подсвечен', () => {
    const app = loadApp();
    const w = app.window;
    w.openLesson(4);
    w.startLessonDrill('exercise', 'case_number');

    const correct = app.get('exerciseState').questions[0].correct;
    app.document.querySelector('#exerciseQuestion .option-btn').click();

    const buttons = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')];
    assert.ok(buttons.every(b => b.disabled), 'после ответа кнопки должны блокироваться');
    const marked = buttons.find(b => b.classList.contains('correct'));
    assert.ok(marked, 'правильный вариант не подсвечен');
    assert.strictEqual(marked.textContent, correct);
    app.close();
});

test('повторный клик по выбранной фишке не дублирует слово', () => {
    // Фишка гасится только визуально (.picked), кликабельной она остаётся:
    // без защиты второй клик клал слово в ответ ещё раз.
    const app = loadApp();
    const w = app.window;

    w.openLesson(5);
    w.startLessonDrill('translation', 'ru_to_el');

    const chip = app.document.querySelector('#transWordBank .chip');
    chip.click();
    chip.click();
    chip.click();

    assert.strictEqual(app.get('translationState.chosen.length'), 1, 'слово попало в ответ несколько раз');
    assert.strictEqual(app.document.querySelectorAll('#transBuildArea .token').length, 1, 'лишние токены в поле сборки');
    app.close();
});

test('клик по собранному слову убирает ровно его', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(5);
    w.startLessonDrill('translation', 'ru_to_el');

    const chips = [...app.document.querySelectorAll('#transWordBank .chip')].slice(0, 3);
    chips.forEach(c => c.click());
    assert.strictEqual(app.get('translationState.chosen.length'), 3);

    // убираем средний
    app.document.querySelectorAll('#transBuildArea .token')[1].click();
    assert.strictEqual(app.get('translationState.chosen.length'), 2);
    assert.strictEqual(app.document.querySelectorAll('#transBuildArea .token').length, 2);
    assert.strictEqual(app.document.querySelectorAll('#transWordBank .chip.picked').length, 2,
        'фишка убранного слова должна снова стать доступной');
    app.close();
});

test('«Очистить» возвращает все фишки в банк', () => {
    const app = loadApp();
    const w = app.window;
    w.openLesson(5);
    w.startLessonDrill('translation', 'ru_to_el');

    [...app.document.querySelectorAll('#transWordBank .chip')].slice(0, 3).forEach(c => c.click());
    w.transClear();

    assert.strictEqual(app.get('translationState.chosen.length'), 0);
    assert.strictEqual(app.document.querySelectorAll('#transBuildArea .token').length, 0);
    assert.strictEqual(app.document.querySelectorAll('#transWordBank .chip.picked').length, 0);
    app.close();
});

test('верно собранное предложение засчитывается', () => {
    const app = loadApp();
    const w = app.window;
    w.openLesson(5);
    w.startLessonDrill('translation', 'ru_to_el');

    const correct = app.get('translationState').questions[0].correct;
    for (const word of correct) {
        const chip = [...app.document.querySelectorAll('#transWordBank .chip:not(.picked)')]
            .find(c => c.textContent === word);
        assert.ok(chip, 'в банке нет слова «' + word + '»');
        chip.click();
    }
    w.checkTranslationBuild();

    assert.ok(app.document.querySelector('#translationQuestion .feedback.ok'), 'правильный сбор не засчитан');
    assert.strictEqual(app.get('translationState.correct'), 1);
    app.close();
});

test('лишние фишки в предложениях — отдельные слова, а не словарные статьи', () => {
    // Лишние фишки берутся из словаря урока. Прямо из статьи они давали
    // «ἀγαθός, ή, όν» и «ἔρχομαι (dep.)» среди словоформ, а разрезанный по
    // запятым перевод — «хороший (-ая» и «-ее)».
    const app = loadApp();
    const w = app.window;
    const bad = [];
    let checked = 0;

    for (const course of app.get('COURSE_ORDER.join(",")').split(',')) {
        w.applyCourse(course);
        for (const lesson of w.lessonNumbers()) {
            const data = w.getLessonData(lesson);
            for (const dir of ['ru_to_el', 'el_to_ru']) {
                if (!data.translation || !(data.translation[dir] || []).length) continue;
                w.openLesson(lesson);
                w.startLessonDrill('translation', dir);
                const total = app.get('translationState.total');
                for (let i = 0; i < total; i++) {
                    w.eval('translationState.index = ' + i);
                    w.showTranslation();
                    const correct = app.get('translationState.questions[' + i + '].correct.join("\\u0001")').split('\u0001');
                    const extras = [...app.document.querySelectorAll('#transWordBank .chip')].map(c => c.textContent);
                    for (const word of correct) {
                        const at = extras.indexOf(word);
                        if (at === -1) bad.push(`${course} ${lesson} ${dir}: в банке нет правильного «${word}»`);
                        else extras.splice(at, 1);
                    }
                    for (const x of extras) {
                        checked++;
                        if (/[\s()+,;]/.test(x) || /^-|-$/.test(x)) bad.push(`${course} ${lesson} ${dir}: «${x}»`);
                    }
                    if (new Set(extras).size !== extras.length) bad.push(`${course} ${lesson} ${dir}: повтор среди лишних — ${extras.join(' ')}`);
                }
            }
        }
    }
    assert.ok(checked > 100, 'проверено слишком мало лишних фишек: ' + checked);
    assert.deepStrictEqual(bad.slice(0, 15), [], 'фишки-огрызки словарных статей:\n' + bad.slice(0, 15).join('\n'));
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('перевод, набранный как обычно, засчитывается по каждому ключевому слову', () => {
    // Ключевое слово в данных — словарная статья: «почему?», «(домашнее)
    // животное», «ещё (ещё раз)». Сравнение шло подстрокой как есть, и такой
    // вопрос нельзя было решить: нужно было набрать и скобки, и знак вопроса.
    const app = loadApp();
    const failed = app.get(`
        (function () {
            let hits = [];
            for (let id in COURSES) {
                let lessons = COURSES[id].lessons || {};
                for (let n in lessons) {
                    let qs = ((lessons[n] || {}).exercises || {}).translate_greek_to_russian || [];
                    for (let q of qs) {
                        // как набрал бы человек: без пояснений в скобках, без знаков, с «е» вместо «ё»
                        let natural = q.keywords.map(k => k.replace(/\\([^)]*\\)/g, ' ')
                            .replace(/[?!.,;:]/g, '').replace(/ё/g, 'е').trim()).join(' ');
                        if (!keywordsMatch(natural, q.keywords)) hits.push(id + '/' + n + ': «' + natural + '» при ' + q.keywords.join(' + '));
                        // и ключ слово в слово, как раньше, — тоже верный ответ
                        if (!keywordsMatch(q.keywords.join(' '), q.keywords)) hits.push(id + '/' + n + ': ключ как есть');
                    }
                }
            }
            return hits.join(' | ');
        })()
    `);
    assert.strictEqual(failed, '', 'не засчитан естественный ответ: ' + failed);
    app.close();
});

test('упражнение на перевод засчитывает ответ без скобок и знаков ключа', () => {
    // Сквозь экран: обработчик кнопки «Проверить» идёт через keywordsMatch.
    const app = loadApp({ storage: { app_default_course: 'hebrew' } });
    const w = app.window;
    const found = app.get(`
        (function () {
            let lessons = courseLessons();
            for (let n in lessons) {
                let qs = ((lessons[n] || {}).exercises || {}).translate_greek_to_russian || [];
                for (let q of qs) if (/[?()]/.test(q.keywords.join(''))) return n + '|' + q.keywords[0];
            }
            return '';
        })()
    `);
    assert.ok(found, 'в еврейском курсе нет ключа со скобками или знаком — проверять нечего');
    const [lesson, keyword] = found.split('|');

    w.openLesson(Number(lesson));
    w.startLessonDrill('exercise', 'translate_greek_to_russian');
    const idx = app.get('exerciseState.questions.findIndex(q => q.keywords[0] === ' + JSON.stringify(keyword) + ')');
    w.eval('exerciseState.index = ' + idx);
    w.showExercise();
    app.document.getElementById('transInput').value = keyword.replace(/\([^)]*\)/g, '').replace(/[?]/g, '').trim();
    w.checkExerciseTranslation(idx);

    assert.ok(app.document.querySelector('#exerciseQuestion .feedback.ok'),
        'ответ без скобок и знаков не засчитан для «' + keyword + '»');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('тест не даёт ответить на один вопрос дважды', () => {
    const app = loadApp();
    const w = app.window;
    w.openLesson(4);
    w.startTest();

    const before = app.get('testState.correct') + app.get('testState.index');
    const btn = app.document.querySelector('#testContainer .option-btn');
    if (btn) {
        btn.click();
        w.testAnswer('что угодно', 'ещё что-то'); // повторный ответ на тот же вопрос
        assert.ok(app.get('testState.answered'), 'вопрос должен быть помечен как отвеченный');
        assert.ok(app.get('testState.correct') <= before + 1, 'повторный ответ засчитался второй раз');
    }
    app.close();
});

test('упражнения не помечают общие данные урока служебными полями', () => {
    // collectTestQuestions когда-то писал _type прямо в LESSONS_DATA.
    const app = loadApp();
    const w = app.window;

    for (const lesson of w.lessonNumbers()) {
        w.openLesson(lesson);
        w.countTestQuestions(w.getLessonData(lesson));
    }
    // Строкой, а не массивом: значение приходит из другого realm, и
    // deepStrictEqual сравнил бы ещё и прототипы.
    const polluted = app.get(`
        (function () {
            let hits = [];
            for (let l of lessonNumbers()) {
                let ex = (LESSONS_DATA[l] || {}).exercises || {};
                for (let k in ex) for (let q of (ex[k] || [])) if ('_type' in q) hits.push(l + '/' + k);
            }
            return hits.join(', ');
        })()
    `);
    assert.strictEqual(polluted, '', 'в LESSONS_DATA попало служебное поле _type: ' + polluted);
    app.close();
});

// ============================================================
// СПИСОК ВИДОВ УПРАЖНЕНИЙ
// ============================================================
// Вид упражнения живёт в трёх списках сразу: EXERCISE_TYPES (как рисуется),
// LESSON_DRILL_GROUPS (как называется и где в меню) и TEST_TYPES (попадает ли
// в тест). Забыть один из них — значит получить либо упражнение, до которого
// нет хода, либо пункт меню с надписью «тип не поддерживается».

function registry(app) {
    return {
        types: app.get('Object.keys(EXERCISE_TYPES).join(",")').split(','),
        drills: app.get('LESSON_DRILL_GROUPS.flatMap(g => g.drills.map(d => d.kind + ":" + d.key)).join(",")')
            .split(',').map(s => s.split(':')),
        testTypes: app.get('TEST_TYPES.join(",")').split(',')
    };
}

test('до каждого объявленного вида упражнения есть ход', () => {
    // Не «у каждого вида есть пункт меню»: declension_fill отдельным
    // упражнением не показывается (склонение отрабатывается на обороте
    // карточки), но в тесте урока встречается. Спрашиваем то, что важно, —
    // добраться до вида можно хоть как-то.
    const app = loadApp();
    const r = registry(app);
    const inMenu = r.drills.filter(([kind]) => kind === 'exercise').map(([, key]) => key);

    const unreachable = r.types.filter(k => !inMenu.includes(k) && !r.testTypes.includes(k));
    assert.deepStrictEqual(unreachable, [],
        'вид объявлен, но до него нет хода ни из меню, ни из теста: ' + unreachable.join(', '));

    const noType = inMenu.filter(k => !r.types.includes(k));
    assert.deepStrictEqual(noType, [],
        'пункт меню ведёт к виду, которого нет в EXERCISE_TYPES: ' + noType.join(', '));
    app.close();
});

test('в тест попадают только объявленные виды', () => {
    const app = loadApp();
    const r = registry(app);
    const unknown = r.testTypes.filter(k => !r.types.includes(k));
    assert.deepStrictEqual(unknown, [], 'в TEST_TYPES вид, которого нет в EXERCISE_TYPES: ' + unknown.join(', '));
    app.close();
});

test('вид упражнения либо рисуется списком вариантов, либо помечен custom', () => {
    const app = loadApp();
    const broken = app.get(`
        Object.keys(EXERCISE_TYPES).filter(function (k) {
            let t = EXERCISE_TYPES[k];
            return !t.prompt === !t.custom;   // ни того ни другого — или сразу оба
        }).join(',')
    `);
    assert.strictEqual(broken, '',
        'у вида должно быть ровно одно из двух — prompt или custom: ' + broken);
    app.close();
});

test('у вида с постоянным набором вариантов правильный ответ есть среди них', () => {
    // Набор вариантов такого вида записан в коде, а ответ — в данных урока.
    // Опечатка в данных дала бы вопрос, на который нельзя ответить верно.
    const app = loadApp();
    const bad = app.get(`
        (function () {
            let hits = [];
            for (let id in COURSES) {
                let lessons = COURSES[id].lessons || {};
                for (let n in lessons) {
                    let ex = (lessons[n] || {}).exercises || {};
                    for (let key in ex) {
                        let type = EXERCISE_TYPES[key];
                        if (!type || !Array.isArray(type.options)) continue;
                        for (let q of (ex[key] || [])) {
                            let corr = exerciseCorrect(type, q);
                            if (type.options.indexOf(corr) === -1) hits.push(id + '/' + n + '/' + key + ': ' + corr);
                        }
                    }
                }
            }
            return hits.join(' | ');
        })()
    `);
    assert.strictEqual(bad, '', 'ответ не совпадает ни с одним вариантом: ' + bad);
    app.close();
});
