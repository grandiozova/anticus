// ============================================================
// M3 SHELL: top app bar, navigation bar, FAB
// ============================================================
// currentLessonPart живёт в core.js вместе с остальным состоянием —
// здесь только оболочка вокруг экранов.
let currentSectionId = 'mainMenu';
let titleFadeTimer = null;

// Метаданные экранов: заголовок app bar, активная точка навигации,
// действие кнопки «назад» (null → кнопка скрыта).
const SCREEN_META = {
    mainMenu:             { title: 'Древнегреческий', dest: 'lessons',  back: null },
    allVocabSection:      { title: 'Словарь',         dest: 'vocab',    back: null },
    allFlashcardsSection: { title: 'Проверка слов',   dest: 'cards',    back: null },
    statsSection:         { title: 'Прогресс',        dest: 'progress', back: null },
    lessonSection:        { title: 'Урок',            dest: 'lessons',  back: 'lessons' },
    drillSection:         { title: 'Упражнение',      dest: 'lessons',  back: 'lesson' },
    testSection:          { title: 'Тест',            dest: null,       back: 'test' },
    errorsSection:        { title: 'Ошибки',          dest: 'progress', back: 'progress' },
    // Заголовок этого экрана приходит из данных курса (молитва или чтение),
    // см. updateShell(); здесь — только запасное значение.
    prayerSection:        { title: 'Разбор текста',   dest: 'lessons',  back: 'lessons' },
    settingsSection:      { title: 'Настройки',       dest: 'settings', back: null }
};

const DEST_SECTION = {
    lessons:  'mainMenu',
    vocab:    'allVocabSection',
    cards:    'allFlashcardsSection',
    progress: 'statsSection',
    settings: 'settingsSection'
};

// Контекстный FAB — главное действие текущего экрана
const FAB_CONFIG = {
    mainMenu:             { icon: 'play_arrow',  label: 'Продолжить' },
    allVocabSection:      { icon: 'style',       label: 'Повторить' },
    allFlashcardsSection: { icon: 'restart_alt', label: 'Заново' },
    lessonSection:        { icon: 'edit_note',   label: 'Упражнения' },
    prayerSection:        { icon: 'translate',   label: 'Упражнение' }
};

function showSection(id) {
    // Уходя с экрана, гасим отложенный переход к следующему вопросу.
    cancelAdvance();
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    let t = document.getElementById(id);
    if (t) t.classList.add('active');
    currentSectionId = id;
    // Три экрана относятся к вкладке «Уроки» — запоминаем последний из них,
    // чтобы вернуться в него, а не сбрасывать на список.
    if (id === 'mainMenu' || id === 'lessonSection' || id === 'drillSection') {
        lessonsReturnSection = id;
    }
    // Внутренние вкладки урока сбрасываются вместе со всеми .section — восстанавливаем
    if (id === 'lessonSection') restoreLessonPart();
    updateShell();
    scrollPageTop();
}

function updateShell() {
    let meta = SCREEN_META[currentSectionId] || { title: activeCourse().name, dest: null, back: null };

    // --- заголовок ---
    let titleEl = document.getElementById('appBarTitle');
    if (titleEl) {
        // На главном экране заголовок — название курса, а не строка в SCREEN_META.
        let title = currentSectionId === 'mainMenu' ? courseName() : t(meta.title);
        if (currentSectionId === 'lessonSection') {
            let d = getLessonData(currentLesson);
            title = d ? tLessonNumber(currentLesson) : t('Урок');
        }
        // На экране упражнения заголовок называет само упражнение — его карточка
        // единственная на экране, и повторять «Урок N» здесь нечем помочь.
        if (currentSectionId === 'drillSection' && currentDrill) title = drillLabel(currentDrill);
        // Экран разбора общий для молитвы и чтения Библии, поэтому его
        // заголовок берётся из данных курса, а не из SCREEN_META.
        if (currentSectionId === 'prayerSection') {
            let data = coursePrayer();
            if (data && data.title) title = data.title;
        }
        if (titleEl.textContent !== title) {
            // мягкая замена заголовка; быстрые переходы подряд не должны гонять таймеры
            clearTimeout(titleFadeTimer);
            titleEl.style.opacity = '0';
            titleFadeTimer = setTimeout(() => { titleEl.style.opacity = '1'; }, 100);
            titleEl.textContent = title;
        }
    }

    // --- кнопка «назад» ---
    let leading = document.getElementById('appBarLeading');
    if (leading) {
        if (meta.back) {
            if (!leading.firstChild) {
                leading.innerHTML = '<button class="md-icon-button" onclick="goBack()" aria-label="' + t('Назад') + '"><span class="msym">arrow_back</span></button>';
            }
        } else {
            leading.innerHTML = '';
        }
    }

    // --- активная точка навигации ---
    document.querySelectorAll('.md-nav-item').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-dest') === meta.dest);
    });

    // --- контекстный FAB ---
    let fab = document.getElementById('mainFab');
    let cfg = FAB_CONFIG[currentSectionId];
    // На материале главное действие — перейти к упражнениям. В самом списке
    // упражнений выбирать нужно вручную, и подсказывать FAB нечего.
    if (currentSectionId === 'lessonSection' && currentLessonPart === 'exercise') cfg = null;
    // «Продолжить» нечему продолжать, пока в курсе нет ни одного урока.
    if (currentSectionId === 'mainMenu' && !courseHasLessons()) cfg = null;
    if (fab) {
        if (cfg && !(currentSectionId === 'lessonSection' && isIntroLesson(currentLesson))) {
            fab.classList.remove('hidden-fab');
            document.getElementById('mainFabIcon').textContent = cfg.icon;
            document.getElementById('mainFabLabel').textContent = t(cfg.label);
            fab.setAttribute('aria-label', t(cfg.label));
        } else {
            fab.classList.add('hidden-fab');
        }
    }
}

function navigateTo(dest) {
    let id = DEST_SECTION[dest];
    if (!id) return;
    if (dest === 'lessons') { goToLessonsDest(); return; }
    if (dest === 'progress') { showStats(); return; }
    if (dest === 'settings') { showSettings(); return; }
    if (dest === 'vocab') {
        // возвращаясь в словарь, сохраняем набранный запрос
        if (allVocabCache) { showSection(id); filterAllVocab(); }
        else showAllVocab();
        return;
    }
    if (dest === 'cards') {
        // не сбрасываем начатую колоду при переключении разделов
        if (allFlashcardState.total && allFlashcardState.index < allFlashcardState.total) {
            showSection(id);
            showAllFlashcard();
        } else {
            startAllFlashcards();
        }
        return;
    }
    showSection(id);
}

function goBack() {
    // Урок — один уровень: «назад» с любого его раздела ведёт к списку уроков.
    let meta = SCREEN_META[currentSectionId];
    if (!meta || !meta.back) return;
    if (meta.back === 'test') { cancelTest(); return; }
    if (meta.back === 'lesson') { closeLessonDrill(); return; }
    if (meta.back === 'lessons') { goToMain(); return; }
    navigateTo(meta.back);
}

function onFabClick() {
    switch (currentSectionId) {
        case 'mainMenu':             continueLesson(); break;
        case 'allVocabSection':      startAllFlashcards(vocabTypeFilter); break;
        case 'allFlashcardsSection': startAllFlashcards(); break;
        case 'lessonSection':        switchLessonPart('exercise'); break;
        case 'prayerSection':        startPrayerTranslate(); break;
    }
}

function continueLesson() {
    if (!courseHasLessons()) return;
    let last = firstLessonNumber();
    try { last = parseInt(localStorage.getItem(courseKey('last_lesson')), 10) || last; } catch (e) {}
    if (!getLessonData(last)) last = firstLessonNumber();
    openLesson(last);
}

function goToMain() { showSection('mainMenu'); renderMainMenu(); }
// Нижняя навигация «Уроки»: восстанавливает то, что было открыто до ухода
// (список уроков / сам урок / начатое упражнение), а не сбрасывает на список.
function goToLessonsDest() {
    if (currentSectionId === 'lessonSection' || currentSectionId === 'drillSection') return; // уже там
    if (lessonsReturnSection === 'drillSection' && currentDrill && getLessonData(currentLesson)) {
        showSection('drillSection');
        return;
    }
    if (lessonsReturnSection === 'lessonSection' && getLessonData(currentLesson)) {
        showSection('lessonSection');
        return;
    }
    goToMain();
}

// ============================================================
// ПОИСК ПО УРОКАМ И ТЕМАМ
// ============================================================
// Список уроков — оглавление курса, и когда уроков станет тридцать три,
// «в каком это уроке» перестаёт быть очевидным. Поэтому над списком стоит
// строка поиска, и ищет она не только по названиям уроков: темами служат
// заголовки материала — те же строки, которые renderGrammarHtml() (js/lesson.js)
// делает .grammar-h. Отдельного поля «темы» в данных нет и не нужно: указатель
// собирается из самого урока, поэтому следующий урок попадает в поиск сам,
// без правок в списке уроков.
let lessonQuery = '';
let lessonSearchIndex = null;

// Разметку заголовка разбирает DOM, а не регулярка: «&nbsp;» в теме тоже
// должен стать пробелом.
function lessonTopicText(html) {
    let box = document.createElement('div');
    box.innerHTML = html;
    return (box.textContent || '').replace(/\s+/g, ' ').trim();
}

function lessonSearchIndexBuild() {
    let out = [];
    lessonNumbers().forEach(n => {
        let data = getLessonData(n);
        if (!data) return;
        out.push({
            number: n,
            title: data.title || '',
            topics: grammarHeadings(data.grammar).map((raw, index) => ({
                index: index, html: raw, text: lessonTopicText(raw)
            }))
        });
    });
    return out;
}

function lessonIndex() {
    if (!lessonSearchIndex) lessonSearchIndex = lessonSearchIndexBuild();
    return lessonSearchIndex;
}

// Запрос режется на слова, и найтись должны все — как в любом поиске по
// заголовкам: «знак шва» находит «4. Знак шва и слогораздел», хотя подряд такой
// строки в теме нет. Обе стороны сравнения сворачиваются одинаково
// (foldForSearch из js/vocab.js), поэтому диакритика не мешает: «ωρα» находит
// «ὥρα», а набранное на телефоне слово — слово с огласовкой в данных.
function lessonTextMatches(text, words) {
    let folded = foldForSearch(text);
    return words.every(w => folded.indexOf(w) !== -1);
}

// null — запроса нет, список показывает все уроки. Иначе только совпадения,
// и темы внутри урока отфильтрованы тем же запросом.
function lessonSearchResults() {
    let words = lessonQuery.split(/\s+/).map(foldForSearch).filter(Boolean);
    if (!words.length) return null;
    let out = [];
    lessonIndex().forEach(entry => {
        let topics = entry.topics.filter(topic => lessonTextMatches(topic.text, words));
        if (!topics.length && !lessonTextMatches(entry.title, words)) return;
        out.push({ number: entry.number, title: entry.title, topics: topics });
    });
    return out;
}

// Указатель и запрос набраны по урокам курса: смена курса начинается с этого
// сброса (см. applyCourse в js/course.js), иначе поиск искал бы по прошлому.
function resetLessonSearch() {
    lessonSearchIndex = null;
    lessonQuery = '';
    let input = document.getElementById('lessonSearchInput');
    if (input) input.value = '';
    let clearBtn = document.getElementById('lessonSearchClear');
    if (clearBtn) clearBtn.classList.remove('show');
}

function filterLessonList() {
    let input = document.getElementById('lessonSearchInput');
    if (!input) return;
    lessonQuery = input.value.trim();
    let clearBtn = document.getElementById('lessonSearchClear');
    if (clearBtn) clearBtn.classList.toggle('show', lessonQuery.length > 0);
    renderMainMenu();
}

function clearLessonSearch() {
    resetLessonSearch();
    renderMainMenu();
}

function renderMainMenu() {
    let grid = document.getElementById('lessonGrid');
    if (!grid) return;
    grid.innerHTML = '';
    let heading = document.getElementById('lessonGridTitle');
    // Курс может быть подключён раньше, чем наполнен: показываем это прямо,
    // а не пустой карточкой без объяснений.
    if (!lessonNumbers().length) {
        grid.innerHTML = emptyState('hourglass_top', t('Уроки готовятся'),
            t('Материал этого курса ещё не подключён. Курс можно сменить в настройках.'));
        if (heading) heading.textContent = t('Уроки');
        return;
    }
    let last = 0;
    try { last = parseInt(localStorage.getItem(courseKey('last_lesson')), 10) || 0; } catch (e) {}
    let results = lessonSearchResults();
    // Поиск без совпадений — это ответ, а не пустой экран: говорим, по чему он
    // искал, и оставляем запрос в поле.
    if (results && !results.length) {
        grid.innerHTML = emptyState('search_off', t('Ничего не найдено'),
            t('Поиск идёт по названиям уроков и по темам внутри них.'));
        if (heading) heading.textContent = t('Поиск');
        return;
    }
    let numbers = lessonNumbers();
    // Без запроса список — оглавление: темы показываются только в результатах,
    // иначе под каждым уроком висел бы весь его материал.
    let entries = results || lessonIndex().map(e => ({ number: e.number, title: e.title, topics: [] }));
    entries.forEach(entry => {
        if (grid.children.length) grid.appendChild(Object.assign(document.createElement('hr'), { className: 'md-divider' }));
        grid.appendChild(lessonRow(entry, last));
        if (entry.topics && entry.topics.length) {
            let box = document.createElement('div');
            box.className = 'lesson-topics';
            entry.topics.forEach(topic => box.appendChild(lessonTopicRow(entry.number, topic)));
            grid.appendChild(box);
        }
    });
    // Заголовок карточки называет реальный диапазон уроков в данных
    if (heading) {
        heading.textContent = results
            ? tMatches(results.length)
            : tLessonRange(numbers[0], numbers[numbers.length - 1]);
    }
}

// Строка урока в списке — одна на весь экран: и в оглавлении, и в результатах
// поиска. Одна строка — номер и название. Подписи со счётчиками («24 слова ·
// 181 упражнение») у неё нет намеренно: список читается как оглавление, а не
// как отчёт о содержимом урока. Однострочный list item берёт у M3 свою высоту —
// как пункты меню разделов с той же разметкой.
function lessonRow(entry, last) {
    let btn = document.createElement('button');
    btn.className = 'lesson-item lesson-item--single';
    btn.innerHTML =
        '<span class="lesson-item__avatar">' + entry.number + '</span>' +
        '<span class="lesson-item__text">' +
            '<span class="lesson-item__headline">' + entry.title + '</span>' +
        '</span>' +
        '<span class="lesson-item__trailing msym">' + (entry.number === last ? 'resume' : 'chevron_right') + '</span>';
    btn.onclick = function() { openLesson(entry.number); };
    return btn;
}

// Найденная тема — отдельная цель, а не подпись строки: нажатие открывает урок
// на этой теме. Поэтому у неё своя кнопка в 48dp под строкой урока — кнопку
// внутри кнопки разметка не допускает.
function lessonTopicRow(lesson, topic) {
    let btn = document.createElement('button');
    btn.className = 'lesson-topic';
    btn.innerHTML = '<span class="msym sm">subdirectory_arrow_right</span>' +
        '<span class="lesson-topic__text">' + wrapScriptRuns(topic.html) + '</span>';
    btn.onclick = function() { openLessonTopic(lesson, topic.index); };
    return btn;
}

