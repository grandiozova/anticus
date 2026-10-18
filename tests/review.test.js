// ============================================================
// РАЗБОР ОШИБОК НА ЭКРАНЕ РЕЗУЛЬТАТА
// ============================================================
// У каждого захода свой список ошибок (state.mistakes), и экран результата
// показывает его сразу, не отправляя человека в «Статистику». Кнопка
// «Повторить ошибки» собирает новый заход только из этих вопросов. Общий
// список ошибок (stats.errors) при этом остаётся отдельным и не чистится.

const test = require('node:test');
const assert = require('node:assert');
const { loadApp } = require('./helpers/app.js');

function retryButton(root) {
    return [...root.querySelectorAll('.menu-btn')].find(b => /Повторить ошибки/.test(b.textContent));
}

test('выбор варианта: разбор показывает ошибку и повторяет только её', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startLessonDrill('exercise', 'case_number');

    const state = app.get('exerciseState');
    const correct = state.questions[0].correct;
    const wrong = [...app.document.querySelectorAll('#exerciseQuestion .option-btn')]
        .find(b => b.textContent !== correct);
    assert.ok(wrong, 'среди вариантов нет неправильного');
    wrong.click();
    w.cancelAdvance();

    assert.strictEqual(app.get('exerciseState.mistakes.length'), 1, 'ошибка захода не записана');

    state.index = state.total;
    w.showExercise();

    const box = app.document.getElementById('exerciseQuestion');
    const items = box.querySelectorAll('.error-item');
    assert.strictEqual(items.length, 1, 'разбор ошибок не показан');
    assert.ok(items[0].textContent.includes(correct), 'в разборе нет правильного ответа');
    assert.ok(box.textContent.includes('Разбор ошибок'), 'у списка нет заголовка');

    const retry = retryButton(box);
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('exerciseState.total'), 1, 'повтор идёт не только по ошибкам');
    assert.strictEqual(app.get('exerciseState.questions[0].correct'), correct);
    app.close();
});

test('карточки слов: «Не знаю» попадает в разбор и в повтор', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startLessonDrill('flashcards', 'flashcards');

    const box = () => app.document.getElementById('flashcardContainer');
    box().querySelector('.flashcard-buttons .show').click();
    box().querySelector('.flashcard-buttons .dontknow').click();

    const state = app.get('flashcardState');
    const missed = state.words[0].greek;
    assert.strictEqual(state.mistakes.length, 1, 'карточка «Не знаю» не записана в разбор');

    state.index = state.total;
    w.showFlashcard();

    assert.strictEqual(box().querySelectorAll('.error-item').length, 1, 'разбор не показан');
    const retry = retryButton(box());
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('flashcardState.total'), 1, 'повтор идёт не только по ошибкам');
    assert.strictEqual(app.get('flashcardState.words[0].greek'), missed);
    app.close();
});

test('письмо буквы: «Назад» после показа даёт разбор и повтор', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(1);
    w.startLessonDrill('exercise', 'letter_write');

    const q = app.get('exerciseState.questions[0]');
    w.completeLetterWritingPractice();
    // Написанное не проверяется: единственный признак ошибки — возврат к холсту.
    w.backToLetterWriteCanvas();

    assert.strictEqual(app.get('exerciseState.mistakes.length'), 1, 'возврат к холсту не записан');

    // Тот же вопрос можно переписать ещё раз — в разборе он должен остаться один.
    w.completeLetterWritingPractice();
    w.backToLetterWriteCanvas();
    assert.strictEqual(app.get('exerciseState.mistakes.length'), 1, 'вопрос задвоился в разборе');

    const state = app.get('exerciseState');
    state.index = state.total;
    w.showExercise();

    const box = app.document.getElementById('exerciseQuestion');
    const items = box.querySelectorAll('.error-item');
    assert.strictEqual(items.length, 1, 'разбор не показан');
    assert.ok(items[0].textContent.includes(q.ru || q.name), 'в разборе нет названия буквы');

    const retry = retryButton(box);
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('exerciseState.total'), 1);
    assert.strictEqual(app.get('exerciseState.questions[0].letter'), q.letter);
    assert.strictEqual(app.get('exerciseState.type'), 'letter_write');
    app.close();
});

test('написание огласовки: «Назад» после показа даёт разбор и повтор', () => {
    const app = loadApp({ storage: { app_default_course: 'hebrew' } });
    const w = app.window;

    w.openLesson(2);
    w.startLessonDrill('vowel_write', 'vowels');

    const v = app.get('vowelWriteState.words[0]');
    w.completeVowelWritingPractice();
    w.backToVowelWriteCanvas();

    assert.strictEqual(app.get('vowelWriteState.mistakes.length'), 1, 'возврат к холсту не записан');

    const state = app.get('vowelWriteState');
    state.index = state.total;
    w.showVowelWrite();

    const box = app.document.getElementById('exerciseQuestion');
    const items = box.querySelectorAll('.error-item');
    assert.strictEqual(items.length, 1, 'разбор не показан');
    assert.ok(items[0].textContent.includes(v.name), 'в разборе нет названия огласовки');

    const retry = retryButton(box);
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('vowelWriteState.total'), 1);
    assert.strictEqual(app.get('vowelWriteState.words[0].name'), v.name);
    app.close();
});

test('тест: ошибки разбираются на экране результата', () => {
    const app = loadApp();
    const w = app.window;

    w.openLesson(4);
    w.startTest();

    const state = app.get('testState');
    assert.ok(state.total > 0, 'в тесте нет вопросов');
    // Ответ неверный по построению: правильный вариант сюда не передаётся.
    w.testAnswer('__неверно__', 'верно');
    assert.strictEqual(app.get('testState.mistakes.length'), 1, 'ошибка теста не записана');

    state.index = state.total;
    w.showTest();

    const box = app.document.getElementById('testContainer');
    assert.strictEqual(box.querySelectorAll('.error-item').length, 1, 'разбор не показан');
    const retry = retryButton(box);
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('testState.total'), 1, 'повтор идёт не только по ошибкам');
    app.close();
});

test('«Отче наш»: неверный ответ попадает в разбор и в повтор', () => {
    const app = loadApp();
    const w = app.window;

    w.showPrayer();
    w.startPrayerFill();

    const state = app.get('prayerExerciseState');
    const q = state.questions[0];
    w.prayerFillAnswer('__неверно__', q.correct);
    w.cancelAdvance();

    assert.strictEqual(app.get('prayerExerciseState.mistakes.length'), 1, 'ошибка не записана');

    state.index = state.total;
    w.showPrayerExerciseQuestion();

    const box = app.document.getElementById('prayerExerciseQuestion');
    assert.strictEqual(box.querySelectorAll('.error-item').length, 1, 'разбор не показан');
    const retry = retryButton(box);
    assert.ok(retry, 'нет кнопки повтора ошибок');
    retry.click();

    assert.strictEqual(app.get('prayerExerciseState.total'), 1, 'повтор идёт не только по ошибкам');
    assert.strictEqual(app.get('prayerExerciseState.type'), 'fill');
    app.close();
});
