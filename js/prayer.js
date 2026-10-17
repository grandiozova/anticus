// ============================================================
// РАЗБОР ТЕКСТА: «ОТЧЕ НАШ» И ЧТЕНИЕ БИБЛИИ
// ============================================================

// prayerExerciseState объявлен в core.js вместе с остальным состоянием:
// повторное `let` в другом файле — SyntaxError.

// Разбор текста есть не у каждого курса: у греческого это молитва «Отче наш»,
// у еврейского — чтение Бытия 1:1–5. Данные разные (PRAYER_DATA /
// HEBREW_READING_DATA), а экран, разбор и упражнения общие; поэтому поля
// читаются через helpers ниже, а не по греческим именам напрямую.
// Карточку-ссылку на главном экране прячет applyCourseChrome(), а этот guard
// страхует прямой вызов — из строки адреса, теста или будущего кода.
function prayerWordText(word) { return word.text || word.greek || ''; }

function showPrayer() {
    const data = coursePrayer();
    if (!data) return;
    showSection('prayerSection');
    const title = document.getElementById('prayerSectionTitle');
    if (title) title.textContent = data.incipit || '';
    renderPrayerText();
    renderPrayerExercise();
}
    
function renderPrayerText() {
    const container = document.getElementById('prayerContent');
    let html = '<p class="md-body-medium mb-12">Нажмите на любое слово, чтобы увидеть разбор формы.</p>';
    coursePrayer().verses.forEach((verse, verseIdx) => {
        html += `<div class="prayer-verse">`;
        html += `<div class="prayer-line script">`;
        verse.words.forEach((word, wordIdx) => {
            html += `<span class="prayer-word" data-verse="${verseIdx}" data-word="${wordIdx}" role="button" tabindex="0" onclick="showWordAnalysis(${verseIdx}, ${wordIdx})">${prayerWordText(word)}</span>`;
        });
        html += `</div>`;
        html += `<div class="prayer-russian">${verse.russian}</div>`;
        if (verse.transcription) {
            html += `<div class="prayer-transcription">${verse.transcription}</div>`;
        }
        html += `<div id="analysis-${verseIdx}" class="prayer-analysis"></div>`;
        html += `</div>`;
    });
    container.innerHTML = html;
}

function showWordAnalysis(verseIdx, wordIdx) {
    const verse = coursePrayer().verses[verseIdx];
    const word = verse.words[wordIdx];
    const analysisDiv = document.getElementById(`analysis-${verseIdx}`);
    if (!analysisDiv) return;

    // Закрываем все другие окна анализа
    document.querySelectorAll('[id^="analysis-"]').forEach(el => {
        if (el.id !== `analysis-${verseIdx}`) {
            el.style.display = 'none';
        }
    });

    // Показываем и заполняем (без кнопки!)
    // подсветка активного слова
    document.querySelectorAll('.prayer-word.selected').forEach(el => el.classList.remove('selected'));
    let wordEl = document.querySelector(`.prayer-word[data-verse="${verseIdx}"][data-word="${wordIdx}"]`);
    if (wordEl) wordEl.classList.add('selected');

    analysisDiv.style.display = 'block';
    // Чтение слова необязательно: у греческой молитвы транскрипция стоит
    // под стихом целиком, у еврейского чтения — ещё и у каждого слова,
    // как в словаре иврита.
    const reading = word.translit
        ? `<span class="prayer-word-reading">${word.translit}</span>`
        : '';
    analysisDiv.innerHTML = `
        <strong>${prayerWordText(word)}</strong> — ${word.translation}<br>
        ${reading}<span>${word.analysis}</span>
    `;
}

function renderPrayerExercise() {
    const container = document.getElementById('prayerExercise');
    let html = `<div class="md-button-row" style="margin-top:0;">
        <button class="menu-btn" onclick="startPrayerFill()"><span class="msym">edit</span>Заполни пропуски</button>
        <button class="menu-btn primary" onclick="startPrayerTranslate()"><span class="msym">translate</span>Перевод на ${courseLang()}</button>
    </div>`;
    html += `<div id="prayerExerciseQuestion"></div>`;
    container.innerHTML = html;
}
    
function closeAllAnalysis() {
    document.querySelectorAll('[id^="analysis-"]').forEach(el => {
        el.style.display = 'none';
    });
}
    
// Все слова разбора без повторов. В тексте они повторяются (в молитве ἡμῶν —
// четыре раза, καί — четыре, σου — три; в чтении — «элохим»), и без этого одно
// и то же лишнее слово могло попасть в варианты или в банк дважды.
function prayerWordPool() {
    return Array.from(new Set(coursePrayer().verses.flatMap(v => v.words.map(prayerWordText))));
}

function startPrayerFill() {
    let questions = [];
    const allWords = prayerWordPool();
    coursePrayer().verses.forEach(verse => {
        const words = verse.words.map(prayerWordText);
        const wordIndex = Math.floor(Math.random() * words.length);
        const correctWord = words[wordIndex];
        const distractors = shuffle(allWords.filter(w => w !== correctWord)).slice(0, 3);
        questions.push({
            // Пропуск адресуется тем же массивом, из которого берётся индекс:
            // разбивка текста по пробелам разошлась бы с words там, где слова
            // соединены маккефом (ʾeṯ-hāʾôr), и пропуск встал бы не на место.
            words: words,
            correct: correctWord,
            distractors: distractors,
            blankIndex: wordIndex,
            russian: verse.russian
        });
    });
    prayerExerciseState = { type: 'fill', questions: shuffle(questions), index: 0, correct: 0, total: questions.length };
    showPrayerExerciseQuestion();
}

function startPrayerTranslate() {
    let questions = [];
    const allWords = prayerWordPool();
    coursePrayer().verses.forEach(verse => {
        // Правильные слова — как в стихе, с повторами: одно слово в стихе
        // бывает дважды, и фишек для него нужно две. Без повторов — только лишние.
        const correctWords = verse.words.map(prayerWordText);
        const extras = shuffle(allWords.filter(w => !correctWords.includes(w))).slice(0, 3);
        const pool = shuffle([...correctWords, ...extras]);
        questions.push({
            russian: verse.russian,
            correct: correctWords,
            pool: pool
        });
    });
    prayerExerciseState = { type: 'translate', questions: shuffle(questions), index: 0, correct: 0, total: questions.length, chosen: [] };
    showPrayerExerciseQuestion();
}

function showPrayerExerciseQuestion() {
    const state = prayerExerciseState;
    const container = document.getElementById('prayerExerciseQuestion');
    if (state.index >= state.total) {
        container.innerHTML = resultBlock(state.correct, state.total, 'Упражнение завершено') +
            `<button class="menu-btn primary" onclick="startPrayer${state.type==='fill'?'Fill':'Translate'}()"><span class="msym">restart_alt</span>Ещё раз</button>`;
        return;
    }
    const q = state.questions[state.index];
    if (state.type === 'fill') {
        const displayWords = q.words.map((w, i) => {
            if (i === q.blankIndex) return '___';
            return w;
        });
        const text = displayWords.join(' ');
        let html = progressHead(`Вопрос ${state.index+1} из ${state.total}`, state.index, state.total);
        html += `<div class="question"><span class="script">${text}</span></div>`;
        html += `<div class="prayer-russian mb-12">${q.russian}</div>`;
        html += `<div class="options options--script">`;
        const opts = shuffle([q.correct, ...q.distractors]);
        opts.forEach(opt => {
            html += `<button class="option-btn" onclick="prayerFillAnswer('${escArg(opt)}', '${escArg(q.correct)}')">${opt}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    } else if (state.type === 'translate') {
        let html = progressHead(`Вопрос ${state.index+1} из ${state.total}`, state.index, state.total);
        html += `<div class="question">${q.russian}</div>`;
        // Подсказку можно выключить в данных: у еврейского чтения она убрана,
        // потому что задание и так понятно, а лишняя строка отвлекает.
        if (!coursePrayer().hideTranslateHint) {
            html += `<div class="prayer-russian mb-12">Соберите перевод на ${courseLang()} из слов</div>`;
        }
        html += `<div class="build-area build-area--script" id="prayerBuildArea"></div>`;
        html += `<div class="word-bank word-bank--script" id="prayerWordBank">`;
        q.pool.forEach(w => {
            html += `<span class="chip" onclick="prayerPickWord('${escArg(w)}')">${w}</span>`;
        });
        html += `</div>`;
        html += `<div class="md-button-row md-button-row--split"><button class="menu-btn text" onclick="prayerClearTranslate()"><span class="msym">undo</span>Очистить</button>`;
        html += `<button class="menu-btn primary" onclick="prayerCheckTranslate()"><span class="msym">check</span>Проверить</button></div>`;
        container.innerHTML = html;
        prayerExerciseState.chosen = [];
    }
}

function prayerFillAnswer(selected, correct) {
    const state = prayerExerciseState;
    const container = document.getElementById('prayerExerciseQuestion');
    const btns = container.querySelectorAll('.option-btn');
    btns.forEach(b => {
        b.disabled = true;
        if (b.textContent === correct) b.classList.add('correct');
        if (b.textContent === selected && selected !== correct) b.classList.add('wrong');
    });
    if (selected === correct) {
        state.correct++;
        stats.totalCorrect++;
    } else {
        stats.totalWrong++;
    }
    saveStats();
    state.index++;
    scheduleAdvance(showPrayerExerciseQuestion, 1200);
}

function prayerPickWord(w) {
    let chip = pickFreeChip('prayerWordBank', w);
    if (!chip) return;
    chip.classList.add('picked');
    prayerExerciseState.chosen.push(w);
    let area = document.getElementById('prayerBuildArea');
    let t = document.createElement('span');
    t.className = 'token';
    t.textContent = w;
    area.appendChild(t);
}

function prayerClearTranslate() {
    prayerExerciseState.chosen = [];
    document.getElementById('prayerBuildArea').innerHTML = '';
    document.getElementById('prayerWordBank').querySelectorAll('.chip').forEach(c => c.classList.remove('picked'));
}

function prayerCheckTranslate() {
    const state = prayerExerciseState;
    const q = state.questions[state.index];
    const chosen = state.chosen;
    const correct = q.correct;
    const ok = chosen.length === correct.length && chosen.every((w, i) => w === correct[i]);
    const container = document.getElementById('prayerExerciseQuestion');
    if (ok) {
        state.correct++;
        stats.totalCorrect++;
        container.innerHTML = '<div class="feedback ok"><span>Верно!</span></div>';
    } else {
        stats.totalWrong++;
        // Порядок слов — текст изучаемого языка: без .script иврит остался бы
        // в интерфейсной гарнитуре и слева направо.
        container.innerHTML = `<div class="feedback fail"><span>Неверно. Правильный порядок: <strong class="script">${correct.join(' ')}</strong></span></div>`;
    }
    saveStats();
    state.index++;
    scheduleAdvance(showPrayerExerciseQuestion, 1500);
}    
    

// Закрываем окно анализа при клике на пустое место
document.addEventListener('click', function(e) {
    const target = e.target;
    // Если клик был по слову (prayer-word) – ничего не делаем (откроется в showWordAnalysis)
    if (target.classList.contains('prayer-word')) return;
    // Если клик был внутри любого окна анализа – ничего не делаем (оставляем открытым)
    if (target.closest('[id^="analysis-"]')) return;
    // Иначе – закрываем все окна
    closeAllAnalysis();
});
