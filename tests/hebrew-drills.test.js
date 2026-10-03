// ============================================================
// УПРАЖНЕНИЯ ЕВРЕЙСКОГО КУРСА
// ============================================================
// Виды упражнений, которых нет у греческого: огласовка, шва, дагеш, камец,
// слогораздел, бегадкефат, гортанные, сопряжённое сочетание и местоименные
// суффиксы. Глав в data/hebrew-lessons.js ещё нет (фаза 5), поэтому проверочная
// глава подкладывается в живой объект уроков — так весь путь отрисовки и ответа
// проходится по-настоящему, а не по выдуманному состоянию.
//
// Материал в главе не выдуман: примеры взяты из пособия (см. ссылки на
// параграфы), поэтому заодно видно, что задуманная форма данных ложится на
// реальное содержание книги.

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');
const { playThrough } = require('./helpers/play.js');

const GREEK = { storage: { app_default_course: 'greek' } };

const HEBREW_CHAPTER = {
    title: 'Проверочная глава',
    grammar: '<b>Чтение</b><br><br>Слово <span class="script">דָּבָר</span> делится на два слога.',
    vocabulary: [{ greek: 'דָּבָר', translation: 'слово', type: 'noun' }],
    exercises: {
        // §2.3, §2.4 — таблицы гласных
        heb_vowel_name: [
            { sign: 'בַּ', correct: 'патах', distractors: ['сегол', 'хирек', 'киббуц'] },
            { sign: 'בֵּ', correct: 'цере', distractors: ['камец', 'холем', 'шва'] }
        ],
        heb_vowel_fill: [
            { word: 'דָּב_ר', translation: 'слово', correct: 'בָ', distractors: ['בַ', 'בֶ', 'בֹ'] }
        ],
        // §3.6 — шва читается, если перед ним не краткий гласный
        heb_shva: [
            { word: 'פַּרְעֹה', letter: 'ר', correct: '«Немое» шва' },
            { word: 'בְּרָכָה', letter: 'בּ', correct: '«Произносимое» шва' }
        ],
        // §3.5 — сильный дагеш после гласного, слабый после согласного
        heb_dagesh: [
            { word: 'אַתָּה', letter: 'תּ', correct: '«Сильный» дагеш' },
            { word: 'מַלְכָּה', letter: 'כּ', correct: '«Слабый» дагеш' }
        ],
        // §3.7 — камец хатуф только в закрытом безударном слоге
        heb_qamets: [
            { word: 'חָכְמָה', letter: 'ח', correct: 'Камец хатуф — краткий o' },
            { word: 'דָּבָר', letter: 'דּ', correct: 'Камец — долгий ā' }
        ],
        heb_begadkefat: [
            { word: 'מַלְכָּה', letter: 'כּ', correct: 'k, смычное', distractors: ['ḵ, щелевое'] }
        ],
        // §3.2 — границу слога пособие метит вертикальной чертой
        heb_syllables: [
            { word: 'דְּבָרִים', correct: 'דְּ|בָ|רִים', distractors: ['דְּבָ|רִים', 'דְּבָרִ|ים'] }
        ],
        // §5.4 — гортанные не удваиваются
        heb_gutturals: [
            { phrase: 'הָאִישׁ', correct: 'Заместительное удлинение' },
            { phrase: 'הֶחָכָם', correct: 'Неправильный сегол' },
            { phrase: 'הַמֶּלֶךְ', correct: 'Обычное удвоение' }
        ],
        // §10.2 — определённость сочетания задаёт абсолютная форма
        heb_construct: [
            { phrase: 'קוֹל הָאִישׁ', translation: '(этот) голос (этого) человека', correct: 'Определённое' },
            { phrase: 'קוֹל אִישׁ', translation: 'голос человека', correct: 'Неопределённое' }
        ],
        // §9.2 — у суффиксов второго типа есть йод
        heb_suffix_type: [
            { word: 'סוּסָיו', translation: 'его кони', correct: 'Тип 2 — существительное мн. ч.' },
            { word: 'סוּסוֹ', translation: 'его конь', correct: 'Тип 1 — существительное ед. ч.' }
        ],
        // Вид общий с греческим: вопрос «какой здесь артикль» один и тот же.
        article_fill: [
            { noun: 'אִישׁ', correct_article: 'הָ', distractors: ['הַ', 'הֶ'] }
        ]
    }
};

const HEBREW_KEYS = Object.keys(HEBREW_CHAPTER.exercises).filter(k => k.startsWith('heb_'));

function withHebrewChapter(app) {
    app.window.eval('HEBREW_LESSONS_DATA[3] = ' + JSON.stringify(HEBREW_CHAPTER) + ';');
    app.window.applyCourse('hebrew');
    app.window.openLesson(3);
    return app.window;
}

// ------------------------------------------------------------ каждый вид работает

test('каждый еврейский вид упражнения рисуется и проходится до конца', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    for (const key of Object.keys(HEBREW_CHAPTER.exercises)) {
        // Вид без пункта меню (например, огласовку тренируют карточкой) рисуется
        // напрямую — так же, как его спрашивает «Тест».
        if (w.findLessonDrill('exercise', key)) {
            w.startLessonDrill('exercise', key);
        } else {
            w.resetLessonDrill();
            w.showSection('drillSection');
            w.startExercise(key);
        }
        const box = app.document.querySelector('#drillSection');
        assert.ok(!/не поддерживается|Нет вопросов/.test(box.textContent),
            key + ' — упражнение не отрисовалось: ' + box.textContent.slice(0, 120));
        assert.ok(!/undefined|NaN|\[object Object\]/.test(box.innerHTML),
            key + ' — служебное значение в разметке');

        const result = playThrough(app, '#drillSection');
        assert.ok(result.finished, key + ' — упражнение не дошло до экрана результата');
    }

    // Карточки огласовок — отдельный вид со своим экраном, проходится теми же
    // кнопками, что и карточки слов.
    w.startLessonDrill('vowel_flashcards', 'vowels');
    const cardBox = app.document.querySelector('#drillSection');
    assert.ok(!/undefined|NaN|\[object Object\]/.test(cardBox.innerHTML),
        'карточки огласовок — служебное значение в разметке');
    assert.ok(playThrough(app, '#drillSection').finished, 'карточки огласовок не дошли до результата');

    assert.deepStrictEqual(app.errors, [], 'ошибки во время прохождения:\n' + app.errors.join('\n'));
    app.close();
});

test('правильный ответ засчитывается в еврейском упражнении', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('exercise', 'heb_shva');

    const state = app.get('exerciseState');
    const correct = state.questions[0].correct;
    const right = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')]
        .find(b => b.textContent === correct);
    assert.ok(right, 'среди вариантов нет правильного ответа «' + correct + '»');

    right.click();
    assert.strictEqual(app.get('exerciseState.correct'), 1, 'правильный ответ не засчитан');
    app.close();
});

test('ошибка в еврейском упражнении попадает в разбор со словом, а не со словом «вопрос»', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('exercise', 'heb_gutturals');

    const q = app.get('exerciseState').questions[0];
    const wrong = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')]
        .find(b => b.textContent !== q.correct);
    wrong.click();

    const recorded = app.get('JSON.stringify(stats.errors)');
    assert.match(recorded, /ה/, 'в разборе ошибок нет еврейского слова: ' + recorded);
    assert.ok(!/"вопрос"/.test(recorded), 'вопрос записан безымянным: ' + recorded);
    app.close();
});

// ------------------------------------------------------------ письмо и подсказки

test('варианты-огласовки помечены как текст изучаемого языка, русские — нет', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    const html = () => app.document.querySelector('#drillSection').innerHTML;

    // Ответ — знак огласовки: ряд вариантов разворачивается вместе с письмом.
    w.startLessonDrill('exercise', 'heb_vowel_fill');
    assert.match(html(), /options--script/, 'варианты на иврите не помечены');

    // Ответ — русское название знака: разворачивать его нельзя.
    w.startExercise('heb_vowel_name');
    assert.ok(!/options--script/.test(html()),
        'варианты «патах / сегол» русские, метку языка им ставить нельзя');
    app.close();
});

test('слово, о котором спрашивают, стоит отдельной строкой на изучаемом языке', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('exercise', 'heb_dagesh');

    const subject = app.document.querySelector('#drillSection .md-prompt-strong');
    assert.ok(subject, 'у вопроса нет строки с разбираемым словом');
    // Вопросы перемешаны, поэтому сверяем с тем, который выпал.
    assert.strictEqual(subject.textContent, app.get('exerciseState').questions[0].word);
    app.close();
});

test('вопрос не показывает перевод там, где перевод — это ответ', () => {
    // «его кони» назвало бы число, «(этот) голос (этого) человека» —
    // определённость. Перевод в данных есть, на экран он не идёт.
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    for (const key of ['heb_construct', 'heb_suffix_type']) {
        w.startLessonDrill('exercise', key);
        const text = app.document.querySelector('#drillSection .question').textContent;
        assert.ok(!/его|человека/.test(text), key + ' — перевод выдаёт ответ: ' + text);
    }
    app.close();
});

test('огласовка доезжает до экрана в целости', () => {
    // NFC переставляет знаки местами, а срезание «лишних» символов ломает
    // слово молча: сверяем кодовые точки, а не вид на глаз.
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('exercise', 'heb_syllables');

    const word = app.document.querySelector('#drillSection .md-prompt-strong').textContent;
    assert.strictEqual([...word].length, [...'דְּבָרִים'].length, 'слово потеряло или набрало знаки');
    assert.strictEqual(word, 'דְּבָרִים');
    app.close();
});

// ------------------------------------------------------------ греческий курс не задет

test('греческий урок не показывает ни еврейских упражнений, ни пустой группы', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.openLesson(4);
    w.switchLessonPart('exercise');

    const box = app.document.getElementById('drillGroups');
    assert.ok(!/Огласовка и чтение/.test(box.textContent),
        'группа без единого доступного упражнения не должна показываться');
    assert.ok(!/heb_/.test(box.innerHTML), 'в меню греческого урока просочился еврейский вид');
    app.close();
});

// ------------------------------------------------------------ тест урока

test('еврейские виды попадают в тест урока и проходятся', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    const pool = app.get('collectTestQuestions(getLessonData(3)).map(q => q._type).join(",")').split(',');
    for (const key of HEBREW_KEYS) {
        assert.ok(pool.includes(key), 'вид ' + key + ' не попал в пул вопросов теста');
    }

    w.startTest();
    const box = app.document.querySelector('#testContainer');
    assert.ok(!/Неизвестный тип вопроса/.test(box.textContent), 'тест не знает еврейского вида');

    const result = playThrough(app, '#testContainer');
    assert.ok(result.finished, 'тест не дошёл до результата');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('упражнение и тест задают вопрос одними и теми же словами', () => {
    // Раньше вид жил двумя ветками, и формулировки успели разойтись.
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    w.startLessonDrill('exercise', 'heb_qamets');
    const fromDrill = app.document.querySelector('#drillSection .question').textContent;

    // Тот же самый вопрос, а не первый из данных: на экране упражнения
    // вопросы перемешаны.
    app.window.eval(`
        testState = { questions: [Object.assign({}, exerciseState.questions[0], { _type: 'heb_qamets' })],
                      index: 0, correct: 0, total: 1, answered: false };
    `);
    w.showSection('testSection');
    w.showTest();
    const fromTest = app.document.querySelector('#testContainer .question').textContent;

    assert.strictEqual(fromTest, fromDrill);
    app.close();
});

// ------------------------------------------------------------ карточки огласовок

test('огласовки заучиваются карточками: на лице знак, на обороте название и звук', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('vowel_flashcards', 'vowels');

    const box = app.document.querySelector('#drillSection');
    assert.ok(!/Нет упражнений|не поддерживается/.test(box.textContent),
        'карточки огласовок не отрисовались: ' + box.textContent.slice(0, 120));

    // Лицо — знак с носителем, ответ до нажатия кнопки не виден.
    const sign = app.get('vowelFlashcardState.words[vowelFlashcardState.index].sign');
    assert.strictEqual(app.document.querySelector('#drillSection .flashcard-word').textContent, sign,
        'на лице карточки не знак огласовки');
    assert.ok(!app.document.querySelector('#drillSection .flashcard-vowel-name'),
        'название знака видно до ответа');

    // Оборот — название знака и звук, который он обозначает.
    app.document.querySelector('#drillSection .flashcard-buttons .show').click();
    const name = app.get('vowelFlashcardState.words[vowelFlashcardState.index].name');
    const sound = app.get('vowelFlashcardState.words[vowelFlashcardState.index].sound');
    assert.strictEqual(app.document.querySelector('#drillSection .flashcard-vowel-name').textContent, name,
        'на обороте нет названия знака');
    assert.strictEqual(app.document.querySelector('#drillSection .flashcard-vowel-sound').textContent, sound,
        'на обороте нет звука огласовки');

    app.document.querySelector('#drillSection .flashcard-buttons .know').click();
    assert.strictEqual(app.get('vowelFlashcardState.correct'), 1, 'правильный ответ не засчитан');
    assert.strictEqual(app.get('vowelFlashcardState.revealed'), false, 'следующая карточка открыта ответом');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('колода карточек огласовок — это пул знаков курса', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    assert.ok(w.lessonDrillAvailable(w.getLessonData(3), w.findLessonDrill('vowel_flashcards', 'vowels')),
        'в еврейской главе, где есть вопросы об огласовке, карточки недоступны');

    w.startLessonDrill('vowel_flashcards', 'vowels');
    const total = app.get('vowelFlashcardState.total');
    const pool = JSON.parse(app.get('JSON.stringify(HEBREW_ALPHABET.vowels)')).length;
    assert.strictEqual(total, pool, 'колода огласовок не совпала с пулом курса');

    // Карточки проходятся до конца теми же кнопками, что и карточки слов.
    const result = playThrough(app, '#drillSection');
    assert.ok(result.finished, 'карточки огласовок не дошли до экрана результата');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('карточки огласовок не появляются в греческом курсе', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.openLesson(1);

    assert.ok(!w.lessonDrillAvailable(w.getLessonData(1), w.findLessonDrill('vowel_flashcards', 'vowels')),
        'у греческого урока появились карточки огласовок');
    w.switchLessonPart('exercise');
    const box = app.document.getElementById('drillGroups');
    assert.ok(!/Карточки огласовок/.test(box.textContent),
        'карточки огласовок просочились в меню греческого урока');
    app.close();
});


// ------------------------------------------------------------ написание огласовки

test('огласовку дописывают по названию: под холстом носитель, на ответе знак', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);
    w.startLessonDrill('vowel_write', 'vowels');

    const box = app.document.querySelector('#drillSection');
    assert.ok(!/Нет упражнений|не поддерживается/.test(box.textContent),
        'написание огласовки не отрисовалось: ' + box.textContent.slice(0, 120));

    // Вопрос называет знак и его звук, а сам знак — ответ, и его на лице нет:
    // под холстом стоит только носитель, к которому знак дописывают.
    const v = app.get('vowelWriteState.words[vowelWriteState.index]');
    const carrier = app.get('VOWEL_CARRIER');
    assert.strictEqual(app.document.querySelector('#drillSection .vowel-write-prompt__name').textContent, v.name,
        'под холстом нет названия знака');
    assert.strictEqual(app.document.querySelector('#drillSection .vowel-write-prompt__sound').textContent, v.sound,
        'под холстом нет звука знака');
    const guide = app.document.querySelector('#drillSection .vowel-write-guide');
    assert.ok(guide, 'под холстом нет носителя');
    assert.strictEqual(guide.textContent, carrier, 'образец под холстом — не носитель знака');
    assert.ok(v.sign.startsWith(carrier), 'знак пула не дописан к носителю: ' + v.sign);
    assert.strictEqual(app.document.querySelector('#drillSection .vowel-write-form').textContent, carrier,
        'на лице виден сам знак, а не только носитель');
    assert.ok(app.document.querySelector('#drillSection #vowelWriteCanvas'), 'холст не нарисовался');
    assert.ok(!app.document.querySelector('#drillSection .flashcard-vowel-name'),
        'название знака на лице — оно и так стоит в вопросе');

    // «Готово» засчитывает ответ и показывает верный знак, его название и звук.
    w.completeVowelWritingPractice();
    assert.strictEqual(app.get('vowelWriteState.correct'), 1, 'ответ не засчитан');
    assert.strictEqual(app.get('stats.totalCorrect'), 1, 'ответ не попал в общий счёт');
    assert.ok(!app.document.querySelector('#drillSection #vowelWriteCanvas'),
        'холст остался после показа знака');
    assert.strictEqual(app.document.querySelector('#drillSection .vowel-write-form').textContent, v.sign,
        'на показе не верный знак');
    assert.strictEqual(app.document.querySelector('#drillSection .flashcard-vowel-name').textContent, v.name,
        'на показе нет названия знака');
    assert.strictEqual(app.document.querySelector('#drillSection .flashcard-vowel-sound').textContent, v.sound,
        'на показе нет звука знака');

    // «Назад» возвращает холст и снимает засчитанный ответ — как у письма буквы.
    w.backToVowelWriteCanvas();
    assert.strictEqual(app.get('vowelWriteState.correct'), 0, '«Назад» не сняла ответ');
    assert.strictEqual(app.get('stats.totalCorrect'), 0, '«Назад» не вернула общий счётчик');
    assert.ok(app.document.querySelector('#drillSection #vowelWriteCanvas'), '«Назад» не вернула холст');
    assert.ok(!app.document.querySelector('#drillSection .flashcard-vowel-name'),
        '«Назад» оставила показ знака на экране');

    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('колода написания огласовки — это пул знаков курса и проходит до конца', () => {
    const app = loadApp(GREEK);
    const w = withHebrewChapter(app);

    assert.ok(w.lessonDrillAvailable(w.getLessonData(3), w.findLessonDrill('vowel_write', 'vowels')),
        'в еврейской главе, где есть вопросы об огласовке, написание недоступно');

    w.startLessonDrill('vowel_write', 'vowels');
    const total = app.get('vowelWriteState.total');
    const pool = JSON.parse(app.get('JSON.stringify(HEBREW_ALPHABET.vowels)')).length;
    assert.strictEqual(total, pool, 'колода написания не совпала с пулом курса');

    const result = playThrough(app, '#drillSection');
    assert.ok(result.finished, 'написание огласовки не дошло до экрана результата');
    assert.deepStrictEqual(app.errors, []);
    app.close();
});

test('написание огласовки не появляется в греческом курсе', () => {
    const app = loadApp(GREEK);
    const w = app.window;
    w.openLesson(1);

    assert.ok(!w.lessonDrillAvailable(w.getLessonData(1), w.findLessonDrill('vowel_write', 'vowels')),
        'у греческого урока появилось написание огласовки');
    w.switchLessonPart('exercise');
    const box = app.document.getElementById('drillGroups');
    assert.ok(!/Написание огласовки/.test(box.textContent),
        'написание огласовки просочилось в меню греческого урока');
    app.close();
});
