// ============================================================
// ТЕСТ
// ============================================================
// Виды, попадающие в тест урока. Не Object.keys(EXERCISE_TYPES): в тест идут не
// все виды подряд, а те, что в нём уместны, и порядок здесь свой. Вид, которого
// в этом списке нет, остаётся отдельным упражнением и в тест не попадает.
const TEST_TYPES = [
    'letter_name', 'letter_from_name', 'letter_sound', 'letter_order',
    'letter_case_lower', 'letter_case_upper', 'diphthong_sound',
    'breathing_type', 'accent_type',
    'heb_letter_final',
    'declension_fill', 'translate_greek_to_russian', 'translate_russian_to_greek',
    'case_number', 'agreement', 'attribute_vs_predicate', 'substantivation', 'article_fill',
    'heb_vowel_name', 'heb_vowel_sound', 'heb_vowel_fill', 'heb_shva', 'heb_dagesh', 'heb_qamets',
    'heb_begadkefat', 'heb_syllables',
    'heb_gender_number', 'heb_gutturals', 'heb_construct', 'heb_suffix_type'
];

// Пул вопросов теста. Список разделов урока спрашивает только его размер,
// поэтому сбор вынесен из startTest — чтобы обе стороны считали одинаково.
function collectTestQuestions(data) {
    let all = [];
    if (!data) return all;
    for (let t of TEST_TYPES) {
        let qs = (data.exercises && data.exercises[t]) || [];
        // Копия, а не сам объект урока: помечать _type прямо в LESSONS_DATA
        // значит писать в общие данные при каждом открытии урока.
        for (let q of qs) all.push(Object.assign({}, q, { _type: t }));
    }
    return all;
}

function countTestQuestions(data) { return collectTestQuestions(data).length; }

// questions — необязательный набор: «Повторить ошибки» передаёт сюда только
// вопросы, на которые в прошлом заходе ответили неверно.
function startTest(questions) {
    let data = getLessonData(currentLesson);
    if (!data) return;
    let picked;
    if (Array.isArray(questions)) {
        picked = questions.slice();
    } else {
        let all = collectTestQuestions(data);
        if (all.length === 0) { showToast(t('Для этого урока вопросов пока нет'), 'info'); return; }
        picked = shuffle(all).slice(0, 10);
    }
    testState = { questions: picked, index: 0, correct: 0, total: picked.length, answered: false, mistakes: [] };
    showSection('testSection');
    showTest();
}

// Повтор только тех вопросов, где ответ был неверным.
function retryTestMistakes() {
    const s = testState;
    if (!s || !Array.isArray(s.mistakes) || s.mistakes.length === 0) return;
    const questions = s.mistakes.map(m => m.q).filter(Boolean);
    if (questions.length) startTest(questions);
}

function cancelTest() {
    testState = { questions: [], index: 0, correct: 0, total: 0, answered: false };
    showSection('lessonSection');
    switchLessonPart(currentLessonPart || 'material');
}

function showTest() {
    let s = testState;
    if (s.index >= s.total) {
        document.getElementById('testContainer').innerHTML =
            resultBlock(s.correct, s.total, t('Тест завершён')) +
            drillReviewHtml(s.mistakes, 'retryTestMistakes()') +
            '<div class="md-button-row">' +
            '<button class="menu-btn primary" onclick="startTest()"><span class="msym">restart_alt</span>' + t('Повторить') + '</button>' +
            '<button class="menu-btn outlined" onclick="cancelTest()"><span class="msym">arrow_back</span>' + t('К уроку') + '</button></div>';
        return;
    }
    let q = s.questions[s.index];
    let container = document.getElementById('testContainer');
    let html = progressHead(tProgress('Вопрос', s.index + 1, s.total), s.index, s.total);
    // Не t: этим именем названа функция перевода интерфейса, и локальная
    // переменная вида упражнения заслонила бы её во всей функции.
    let qtype = q._type;

    // Вопрос с выбором варианта рисует общий с упражнением урока код: текст
    // вопроса и набор вариантов у вида один, отличается только обработчик.
    if (EXERCISE_TYPES[qtype] && EXERCISE_TYPES[qtype].prompt) {
        html += choiceQuestionHtml(qtype, q, 'testAnswer');
    } else if (qtype === 'translate_greek_to_russian') {
        html += '<div class="question">' + t('Переведите на русский') + '</div><div class="md-prompt-strong">' + q.greek + '</div><div class="input-group"><input type="text" id="testTransInput" placeholder="' + t('Перевод') + '" autocomplete="off" onkeydown="if(event.key===\'Enter\'){testTranslation();}"><button onclick="testTranslation()"><span class="msym">check</span>' + t('Проверить') + '</button></div>';
        window._test_q = q;
    } else if (qtype === 'translate_russian_to_greek') {
        let words = shuffle(q.all_words);
        html += '<div class="question">' + t('Переведите на ') + courseLang() + '</div><div class="md-prompt-ru">' + q.russian + '</div>';
        html += '<div class="build-area build-area--script" id="testBuildArea"></div>' +
            '<div class="word-bank word-bank--script" id="testWordBank">';
        for (let w of words) html += '<span class="chip" onclick="testPickWord(\'' + escArg(w) + '\')">' + w + '</span>';
        html += '</div><div class="md-button-row md-button-row--split"><button class="menu-btn text" onclick="testClearChosen()"><span class="msym">undo</span>' + t('Очистить') + '</button><button class="menu-btn primary" onclick="testTranslationRu()"><span class="msym">check</span>' + t('Готово') + '</button></div>';
        window._test_ru = q;
        window._test_chosen = [];
    } else {
        html += '<p>' + t('Неизвестный тип вопроса.') + '</p>';
    }
    container.innerHTML = html;
    s.answered = false;
}

function nextTestQuestion() {
    testState.index++;
    showTest();
}

function testAnswer(sel, corr) {
    if (testState.answered) return;
    testState.answered = true;
    let ok = sel === corr;
    if (ok) testState.correct++;
    else {
        stats.totalWrong++;
        let lesson = currentLesson;
        let q = testState.questions[testState.index];
        let subject = questionSubject(q, q._type);
        recordError(lesson, { word: subject, correct: corr, your: sel });
        noteDrillMistake(testState, { word: subject, correct: corr, your: sel, q: q });
    }
    stats.totalCorrect += ok ? 1 : 0;
    saveStats();
    let container = document.getElementById('testContainer');
    // Правильный ответ бывает и формой изучаемого языка (вставить форму,
    // артикль, согласовать), и русской подписью (определить падеж). Что
    // сейчас на экране, уже решено при отрисовке вопроса — спрашиваем сам
    // ряд вариантов, а не повторяем список типов второй раз.
    let scriptAnswer = !!container.querySelector('.options--script');
    let strongCls = scriptAnswer ? ' class="script"' : '';
    let feedbackClass = ok ? 'ok' : 'fail';
    let feedbackText = ok ? t('Верно!') : t('Неверно. Правильный ответ: ') + '<strong' + strongCls + '>' + corr + '</strong>';
    container.innerHTML = `
        <div class="feedback ${feedbackClass}"><span>${feedbackText}</span></div>
        <div class="md-button-row exercise-next-actions">
            <button class="menu-btn primary" onclick="nextTestQuestion()"><span class="msym">arrow_forward</span>${t('Далее')}</button>
        </div>
    `;
}

function testTranslation() {
    if (testState.answered) return;
    let inp = document.getElementById('testTransInput');
    if (!inp) return;
    let ans = inp.value.trim().toLowerCase();
    let q = window._test_q;
    if (!q) return;
    let ok = keywordsMatch(ans, q.keywords);
    let container = document.getElementById('testContainer');
    let feedbackClass = ok ? 'ok' : 'fail';
    let feedbackText = ok ? t('Верно!') : t('Неверно. Ключевые слова: ') + q.keywords.join(', ');
    if (ok) { testState.correct++; stats.totalCorrect++; } else {
        stats.totalWrong++;
        let lesson = currentLesson;
        recordError(lesson, { word: q.greek, correct: q.keywords.join(', '), your: ans });
        noteDrillMistake(testState, { word: q.greek, correct: q.keywords.join(', '), your: ans, q: q });
    }
    saveStats();
    testState.answered = true;
    container.innerHTML = `
        <div class="feedback ${feedbackClass}"><span>${feedbackText}</span></div>
        <div class="md-button-row exercise-next-actions">
            <button class="menu-btn primary" onclick="nextTestQuestion()"><span class="msym">arrow_forward</span>${t('Далее')}</button>
        </div>
    `;
}

function testPickWord(w) {
    if (testState.answered) return;
    let chip = pickFreeChip('testWordBank', w);
    if (!chip) return;
    chip.classList.add('picked');
    window._test_chosen.push(w);
    let area = document.getElementById('testBuildArea');
    let t = document.createElement('span');
    t.className = 'token';
    t.textContent = w;
    area.appendChild(t);
}

function testClearChosen() {
    window._test_chosen = [];
    document.getElementById('testBuildArea').innerHTML = '';
    document.getElementById('testWordBank').querySelectorAll('.chip').forEach(c => c.classList.remove('picked'));
}

function testTranslationRu() {
    if (testState.answered) return;
    let chosen = window._test_chosen || [];
    let q = window._test_ru;
    if (!q) return;
    let corr = q.correct_sequence;
    let ok = chosen.length === corr.length && chosen.every((w,i) => w === corr[i]);
    let container = document.getElementById('testContainer');
    let feedbackClass = ok ? 'ok' : 'fail';
    let feedbackText = ok ? t('Верно!') : t('Неверно. Правильно: ') + '<strong class="script">' + corr.join(' ') + '</strong>';
    if (ok) { testState.correct++; stats.totalCorrect++; } else {
        stats.totalWrong++;
        let lesson = currentLesson;
        recordError(lesson, { word: q.russian, correct: corr.join(' '), your: chosen.join(' ') });
        noteDrillMistake(testState, { word: q.russian, correct: corr.join(' '), your: chosen.join(' '), q: q });
    }
    saveStats();
    testState.answered = true;
    container.innerHTML = `
        <div class="feedback ${feedbackClass}"><span>${feedbackText}</span></div>
        <div class="md-button-row exercise-next-actions">
            <button class="menu-btn primary" onclick="nextTestQuestion()"><span class="msym">arrow_forward</span>${t('Далее')}</button>
        </div>
    `;
}