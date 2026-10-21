// ============================================================
// РАЗБОР ТЕКСТА: «ОТЧЕ НАШ» И ЧТЕНИЕ БИБЛИИ
// ============================================================

// prayerExerciseState и prayerDayIndex объявлены в core.js вместе с остальным
// состоянием: повторное `let` в другом файле — SyntaxError.

// Разбор текста есть не у каждого курса: у греческого это молитва «Отче наш»,
// у еврейского — первая глава Бытия, разбитая на дни творения. Данные разные
// (PRAYER_DATA / HEBREW_READING_DATA), а экран, разбор и упражнения общие;
// поэтому поля читаются через helpers ниже, а не по греческим именам напрямую.
// Карточку-ссылку на главном экране прячет applyCourseChrome(), а этот guard
// страхует прямой вызов — из строки адреса, теста или будущего кода.
function prayerWordText(word) { return word.text || word.greek || ''; }

// Дни чтения — необязательное поле данных: у молитвы его нет, и тогда экран
// показывает весь текст целиком, как раньше. День — это отрезок verses
// (from/to включительно), а не отдельный набор стихов: адрес разбора
// (#analysis-N) и data-verse остаются общими для всей главы.
function prayerDays() { return coursePrayer().days || []; }

function prayerDay() {
    const days = prayerDays();
    if (!days.length) return null;
    return days[Math.min(Math.max(prayerDayIndex, 0), days.length - 1)];
}

function prayerDayVerseIndices() {
    const day = prayerDay();
    const verses = coursePrayer().verses;
    if (!day) return verses.map((v, i) => i);
    let out = [];
    for (let i = day.from; i <= day.to; i++) out.push(i);
    return out;
}

// «Бытие 1:9–13» — книга из данных курса, диапазон из самого дня.
function prayerRangeLabel(day) {
    const book = coursePrayer().book;
    return (book ? book + ' ' : '') + day.range;
}

function showPrayer() {
    const data = coursePrayer();
    if (!data) return;
    showSection('prayerSection');
    const title = document.getElementById('prayerSectionTitle');
    if (title) title.textContent = data.incipit || '';
    renderPrayerText();
    renderPrayerExercise();
}

// Переключение дня: чипы над текстом и свайп по тексту зовут его же, поэтому
// оба пути делают ровно одно и то же.
function setPrayerDay(index) {
    const days = prayerDays();
    if (!days.length) return;
    const next = Math.max(0, Math.min(days.length - 1, index));
    if (next === prayerDayIndex) return;
    prayerDayIndex = next;
    // Начатое упражнение собрано по прошлому дню и под новым текстом значило бы
    // другое — его сбрасываем, а не оставляем висеть.
    resetPrayerExercise();
    renderPrayerText();
    renderPrayerExercise();
    // День — это страница: смена дня возвращает к началу нового, откуда бы её
    // ни позвали (чип наверху, кнопка внизу, свайп посреди текста).
    scrollPageTop();
}

function stepPrayerDay(step) { setPrayerDay(prayerDayIndex + step); }

// Внизу длинного дня — те же «предыдущий/следующий», что и свайп: шестой день
// это восемь стихов, и от его конца до чипов наверху далеко. Кнопки текстовые,
// крайние не показываются вовсе, поэтому ряд не заворачивается.
function prayerDayFootHtml() {
    const days = prayerDays();
    let html = '<div class="prayer-day-foot">';
    if (prayerDayIndex > 0) {
        html += `<button class="menu-btn text" onclick="stepPrayerDay(-1)">` +
            `<span class="msym">arrow_back</span>${tPrayerDay(prayerDayIndex)}</button>`;
    } else {
        html += '<span></span>';
    }
    if (prayerDayIndex < days.length - 1) {
        html += `<button class="menu-btn text" onclick="stepPrayerDay(1)">${tPrayerDay(prayerDayIndex + 2)}` +
            `<span class="msym">arrow_forward</span></button>`;
    }
    html += '</div>';
    return html;
}

function prayerDayNavHtml() {
    const days = prayerDays();
    const day = prayerDay();
    let html = `<div class="prayer-day-head">
        <span class="prayer-day-title md-title-medium">${day.title}</span>
        <span class="prayer-day-range">${prayerRangeLabel(day)}</span>
    </div>`;
    html += '<div class="chip-set prayer-day-chips">';
    days.forEach((d, i) => {
        html += `<button type="button" class="filter-chip" aria-pressed="${i === prayerDayIndex ? 'true' : 'false'}"` +
            ` onclick="setPrayerDay(${i})"><span class="filter-chip__body">${tPrayerDay(i + 1)}</span></button>`;
    });
    html += '</div>';
    return html;
}

function prayerSourceHtml(source) {
    const link = `<a href="${escHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escHtml(source.site)}</a>`;
    const tail = source.title ? ', ' + source.title : '';
    return `<div class="prayer-source">${escHtml(source.label)} — ${link}${escHtml(tail)}.</div>`;
}

function renderPrayerText() {
    const data = coursePrayer();
    const container = document.getElementById('prayerContent');
    let html = '';
    if (prayerDay()) html += prayerDayNavHtml();
    html += '<p class="md-body-medium mb-12">' + t('Нажмите на любое слово, чтобы увидеть разбор формы.') + '</p>';
    prayerDayVerseIndices().forEach(verseIdx => {
        const verse = data.verses[verseIdx];
        html += `<div class="prayer-verse">`;
        html += `<div class="prayer-line script">`;
        verse.words.forEach((word, wordIdx) => {
            html += `<span class="prayer-word" data-verse="${verseIdx}" data-word="${wordIdx}" role="button" tabindex="0" onclick="showWordAnalysis(${verseIdx}, ${wordIdx})">${prayerWordText(word)}</span>`;
        });
        html += `</div>`;
        html += `<div class="prayer-russian">${verse.ref ? `<span class="prayer-verse-ref">${verse.ref}</span>` : ''}${verse.russian}</div>`;
        if (verse.transcription) {
            html += `<div class="prayer-transcription">${verse.transcription}</div>`;
        }
        html += `<div id="analysis-${verseIdx}" class="prayer-analysis"></div>`;
        html += `</div>`;
    });
    if (prayerDay()) html += prayerDayFootHtml();
    if (data.source) html += prayerSourceHtml(data.source);
    container.innerHTML = html;
    // Выбранный день может оказаться за краем прокрутки чипов — подтягиваем
    // его в кадр, как это делает словарь со своей частью речи.
    const active = container.querySelector('.prayer-day-chips .filter-chip[aria-pressed="true"]');
    if (active && active.scrollIntoView) {
        try { active.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {}
    }
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
    // Чтение ивритского слова записано «русскими (latin)»: в английском режиме
    // остаётся латинская половина — то же чтение, а не второе (displayTranslit).
    const reading = word.translit
        ? `<span class="prayer-word-reading">${escHtml(displayTranslit(word.translit))}</span>`
        : '';
    analysisDiv.innerHTML = `
        <strong>${prayerWordText(word)}</strong> — ${word.translation}<br>
        ${reading}<span>${word.analysis}</span>
    `;
}

function renderPrayerExercise() {
    const container = document.getElementById('prayerExercise');
    const day = prayerDay();
    // День подписан и здесь: экран упражнений ниже текста, и по одной кнопке
    // не видно, какой день она спрашивает.
    let html = day
        ? `<div class="prayer-exercise-day">${day.title} · ${prayerRangeLabel(day)}</div>`
        : '';
    html += `<div class="md-button-row" style="margin-top:0;">
        <button class="menu-btn" onclick="startPrayerFill()"><span class="msym">edit</span>${t('Заполни пропуски')}</button>
        <button class="menu-btn primary" onclick="startPrayerTranslate()"><span class="msym">translate</span>${t('Перевод на ')}${courseLang()}</button>
    </div>`;
    html += `<div id="prayerExerciseQuestion"></div>`;
    container.innerHTML = html;
}

// Смена дня снимает начатое упражнение: его вопросы собраны из прошлого дня.
function resetPrayerExercise() {
    prayerExerciseState = { type: null, questions: [], index: 0, correct: 0, total: 0, chosen: [], mistakes: [] };
    const box = document.getElementById('prayerExerciseQuestion');
    if (box) box.innerHTML = '';
}
    
function closeAllAnalysis() {
    document.querySelectorAll('[id^="analysis-"]').forEach(el => {
        el.style.display = 'none';
    });
}
    
// Все слова разбора без повторов. В тексте они повторяются (в молитве ἡμῶν —
// четыре раза, καί — четыре, σου — три; в чтении — «элохим»), и без этого одно
// и то же лишнее слово могло попасть в варианты или в банк дважды.
// У чтения пул собирается по открытому дню, а не по всей главе: лишнее слово
// из дня, который человек ещё не читал, — это подсказка не по делу.
function prayerWordPool() {
    const verses = prayerDayVerseIndices().map(i => coursePrayer().verses[i]);
    return Array.from(new Set(verses.flatMap(v => v.words.map(prayerWordText))));
}

function startPrayerFill() {
    let questions = [];
    const allWords = prayerWordPool();
    prayerDayVerseIndices().map(i => coursePrayer().verses[i]).forEach(verse => {
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
    prayerExerciseState = { type: 'fill', questions: shuffle(questions), index: 0, correct: 0, total: questions.length, mistakes: [] };
    showPrayerExerciseQuestion();
}

function startPrayerTranslate() {
    let questions = [];
    const allWords = prayerWordPool();
    prayerDayVerseIndices().map(i => coursePrayer().verses[i]).forEach(verse => {
        // Стих спрашивается не целиком, а кусками из verse.segments, если они
        // есть: в чтении Бытия целый стих — это 10–12 фишек, и упражнение
        // превращалось в диктант. Куска нет — спрашивается стих, как раньше
        // (греческий «Отче наш» живёт именно так).
        const segments = verse.segments || [{ from: 0, to: verse.words.length - 1, russian: verse.russian }];
        segments.forEach(segment => {
            // Правильные слова — как в стихе, с повторами: одно слово в стихе
            // бывает дважды, и фишек для него нужно две. Без повторов — только лишние.
            const correctWords = verse.words.slice(segment.from, segment.to + 1).map(prayerWordText);
            const extras = shuffle(allWords.filter(w => !correctWords.includes(w))).slice(0, 3);
            const pool = shuffle([...correctWords, ...extras]);
            questions.push({
                russian: segment.russian,
                correct: correctWords,
                pool: pool
            });
        });
    });
    prayerExerciseState = { type: 'translate', questions: shuffle(questions), index: 0, correct: 0, total: questions.length, chosen: [], mistakes: [] };
    showPrayerExerciseQuestion();
}

function showPrayerExerciseQuestion() {
    const state = prayerExerciseState;
    const container = document.getElementById('prayerExerciseQuestion');
    if (state.index >= state.total) {
        container.innerHTML = resultBlock(state.correct, state.total, t('Упражнение завершено')) +
            drillReviewHtml(state.mistakes, 'retryPrayerMistakes()') +
            `<button class="menu-btn primary" onclick="startPrayer${state.type==='fill'?'Fill':'Translate'}()"><span class="msym">restart_alt</span>${t('Ещё раз')}</button>`;
        return;
    }
    const q = state.questions[state.index];
    if (state.type === 'fill') {
        const displayWords = q.words.map((w, i) => {
            if (i === q.blankIndex) return '___';
            return w;
        });
        const text = displayWords.join(' ');
        let html = progressHead(tProgress('Вопрос', state.index + 1, state.total), state.index, state.total);
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
        let html = progressHead(tProgress('Вопрос', state.index + 1, state.total), state.index, state.total);
        html += `<div class="question">${q.russian}</div>`;
        // Подсказку можно выключить в данных: у еврейского чтения она убрана,
        // потому что задание и так понятно, а лишняя строка отвлекает.
        if (!coursePrayer().hideTranslateHint) {
            html += `<div class="prayer-russian mb-12">${t('Соберите перевод на ')}${courseLang()}${t(' из слов')}</div>`;
        }
        html += `<div class="build-area build-area--script" id="prayerBuildArea" data-hint="${escHtml(t('Выберите слова по порядку'))}"></div>`;
        html += `<div class="word-bank word-bank--script" id="prayerWordBank">`;
        q.pool.forEach(w => {
            html += `<span class="chip" onclick="prayerPickWord('${escArg(w)}')">${w}</span>`;
        });
        html += `</div>`;
        html += `<div class="md-button-row md-button-row--split"><button class="menu-btn text" onclick="prayerClearTranslate()"><span class="msym">undo</span>${t('Очистить')}</button>`;
        html += `<button class="menu-btn primary" onclick="prayerCheckTranslate()"><span class="msym">check</span>${t('Проверить')}</button></div>`;
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
        const q = state.questions[state.index];
        noteDrillMistake(state, { word: q.russian, correct: correct, your: selected, q: q });
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
        container.innerHTML = '<div class="feedback ok"><span>' + t('Верно!') + '</span></div>';
    } else {
        stats.totalWrong++;
        noteDrillMistake(state, { word: q.russian, correct: correct.join(' '), your: chosen.join(' '), q: q });
        // Порядок слов — текст изучаемого языка: без .script иврит остался бы
        // в интерфейсной гарнитуре и слева направо.
        container.innerHTML = `<div class="feedback fail"><span>${t('Неверно. Правильный порядок:')} <strong class="script">${correct.join(' ')}</strong></span></div>`;
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

// «Повторить ошибки» в упражнениях молитвы: новый заход по тем же вопросам,
// что были решены неверно, — в том же виде задания (пропуски или перевод).
function retryPrayerMistakes() {
    const s = prayerExerciseState;
    if (!s || !Array.isArray(s.mistakes) || s.mistakes.length === 0) return;
    const questions = s.mistakes.map(m => m.q).filter(Boolean);
    if (!questions.length) return;
    prayerExerciseState = {
        type: s.type, questions: questions, index: 0, correct: 0,
        total: questions.length, chosen: [], mistakes: []
    };
    showPrayerExerciseQuestion();
}

// Свайп по тексту чтения переключает день — тот же жест, что листает разделы
// урока (initLessonSwipe, js/lesson.js). Слушаем контейнер, а не стихи: он
// перерисовывается вместе с днём, а сам элемент остаётся.
// Жест не начинается на чипах дня (они сами прокручиваются вбок), на полях
// ввода и в разборе слова — SWIPE_BLOCKERS называет те же цели, что у урока.
let prayerSwipe = null;

function initPrayerSwipe() {
    let host = document.getElementById('prayerContent');
    if (!host) return;

    host.addEventListener('touchstart', function (e) {
        if (!e.touches || e.touches.length !== 1) { prayerSwipe = null; return; }
        let t = e.touches[0];
        let blocked = !!(e.target && e.target.closest && e.target.closest(SWIPE_BLOCKERS));
        prayerSwipe = { x: t.clientX, y: t.clientY, blocked: blocked };
    }, { passive: true });

    host.addEventListener('touchmove', function (e) {
        // Второй палец — это масштабирование, а не листание.
        if (e.touches && e.touches.length > 1) prayerSwipe = null;
    }, { passive: true });

    host.addEventListener('touchend', function (e) {
        let s = prayerSwipe;
        prayerSwipe = null;
        if (!s || s.blocked || !e.changedTouches || e.changedTouches.length !== 1) return;
        if (prayerDays().length < 2) return;
        let t = e.changedTouches[0];
        let dx = t.clientX - s.x;
        let dy = t.clientY - s.y;
        // Короткий жест или жест больше вниз-вверх — это прокрутка страницы.
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        // Интерфейс русский и остаётся слева направо, поэтому влево — вперёд.
        stepPrayerDay(dx < 0 ? 1 : -1);
    }, { passive: true });
}
