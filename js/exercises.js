// ============================================================
// УПРАЖНЕНИЯ (основные функции)
// ============================================================
function startExercise(type) {
    let questions = getExercises(currentLesson, type);
    if (!questions || questions.length === 0) {
        document.getElementById('exerciseQuestion').innerHTML = '<p>' + t('Нет вопросов.') + '</p>';
        return;
    }
    // Письмо начинается с выбора начертания: он один на всё упражнение, поэтому
    // спрашивается до первой буквы. Сюда же приходит «Ещё раз» с экрана
    // результата — поэтому выбор показывается при каждом заходе, а не только
    // при первом. Греческого это не касается: у него рукописного шрифта нет
    // (courseCursiveWriting), и выбирать нечего.
    if (exerciseWritingStyle(type) && courseCursiveWriting()) {
        // Начертание ещё не выбрано, и вопросов в состоянии тоже нет: экран
        // выбора — не вопрос, и заполнять состояние половиной нечего.
        exerciseState = { type: type, questions: [], index: 0, correct: 0, total: 0, mistakes: [] };
        showLetterWriteChoice();
        return;
    }
    beginExercise(type, exerciseWritingStyle(type));
}

// Прогон вопросов, начиная с первого. Отдельно от startExercise: письмо сперва
// показывает выбор начертания, и к прогону возвращаются уже после выбора.
// questions — необязательный набор: «Повторить ошибки» передаёт сюда только
// те вопросы, где ответ был неверным, и заход идёт по ним, а не по всему виду.
function beginExercise(type, style, questions) {
    let source = Array.isArray(questions) ? questions.slice() : getExercises(currentLesson, type);
    let shuffled = shuffle(source);
    exerciseState = { type: type, questions: shuffled, index: 0, correct: 0, total: shuffled.length, mistakes: [] };
    // Начертание вида — печатное или выбранное на экране выбора. У остальных
    // видов его нет, и letterWriteStyle остаётся нетронутым: его читает только
    // показ письма.
    if (style) letterWriteStyle = style;
    showExercise();
}

// «Повторить ошибки»: новый заход только по вопросам с неверным ответом.
// Начертание письма заново не спрашиваем — оно уже выбрано в этом заходе.
function retryExerciseMistakes() {
    const s = exerciseState;
    if (!s || !Array.isArray(s.mistakes) || s.mistakes.length === 0) return;
    const questions = s.mistakes.map(m => m.q).filter(Boolean);
    if (!questions.length) return;
    beginExercise(s.type, exerciseWritingStyle(s.type) ? letterWriteStyle : null, questions);
}

function getCaseName(caseKey) {
    let map = {
        // Падежи для существительных
        'gen_sg': 'Genitivus sg.',
        'dat_sg': 'Dativus sg.',
        'acc_sg': 'Accusativus sg.',
        'nom_pl': 'Nominativus pl.',
        'gen_pl': 'Genitivus pl.',
        'dat_pl': 'Dativus pl.',
        'acc_pl': 'Accusativus pl.',
        'voc_sg': 'Vocativus sg.',
        'nom_pl_m': 'Nominativus pl. m.',
        'gen_sg_m': 'Genitivus sg. m.',
        'dat_sg_f': 'Dativus sg. f.',
        'acc_sg_n': 'Accusativus sg. n.',
        // Для глаголов (личные формы)
        '1sg': '1 sg.',
        '2sg': '2 sg.',
        '3sg': '3 sg.',
        '1pl': '1 pl.',
        '2pl': '2 pl.',
        '3pl': '3 pl.'
    };
    return map[caseKey] || caseKey;
}

// ============================================================
// ВИДЫ УПРАЖНЕНИЙ
// ============================================================
// Почти любое упражнение — это вопрос и ряд вариантов, один из которых верный.
// Виды различаются тремя вещами: текстом вопроса, тем, откуда берутся варианты,
// и тем, на каком языке эти варианты набраны. Поэтому вид описан данными, а не
// веткой в showExercise: по одному и тому же списку рисуется и экран
// упражнения, и вопрос теста. Пока это были две ветки, один и тот же вид жил в
// двух местах и в двух формулировках; с еврейским курсом видов стало вдвое
// больше, и цена такого удвоения перестала быть терпимой.
//
// Поля:
//   prompt(q)   — текст вопроса; вставка на изучаемом языке — через sc()
//   subject(q)  — то, о чём спрашивают, отдельной строкой под вопросом
//   options     — массив (набор постоянный) или функция от вопроса;
//                 если поля нет — [правильный, ...q.distractors]
//   correct(q)  — правильный ответ; если поля нет — q.correct
//   script      — варианты набраны на изучаемом языке (шрифт и направление).
//                 Функция от вопроса — там, где это решает сам вопрос, а не
//                 вид: вопрос о названии буквы один и тот же в обоих курсах,
//                 а язык названия в них разный
//   custom      — вид рисует не choiceQuestionHtml, а сам вызывающий
//
// Ключ вида, общего для курсов, языка не называет (translate_*, agreement,
// article_fill). Виды, которых за пределами еврейского курса не бывает,
// начинаются с heb_. Это соглашение об именах: префикс код не разбирает.
// Значение слова в вопросе о форме («вставьте форму … для слова λύω
// (развязываю)»). Английское берётся из словаря курса, а не из отдельного
// списка: подсказка обязана совпадать со статьёй, которую ученик видит в
// словаре. Слово-парадигма (λύομαι), которого в словаре нет, остаётся подписью
// UI_EN — как и подписи падежей.
function drillGloss(word, translation) {
    if (!isEnglish()) return translation;
    const key = headwordChip(word);
    if (key) {
        for (let n of lessonNumbers()) {
            const data = getLessonData(n);
            const hit = ((data && data.vocabulary) || []).find(w => headwordChip(w.greek) === key);
            if (hit) return hit.translation;
        }
    }
    return t(translation);
}

const EXERCISE_TYPES = {
    // --- алфавит и чтение: уроки 1–2 в обоих курсах ---
    // Здесь спрашивают не о слове, а о букве. Вопросы берутся из пула букв
    // курса — courseAlphabet(): буква одна, а вопросов о ней несколько, и
    // переписывать алфавит в каждый вид значило бы держать четыре копии,
    // которые со временем разойдутся.
    //
    // Неверные варианты собирает otherValues() из того же пула: соседние буквы
    // алфавита похожи и начертанием, и звучанием, и отвлекать должны похожие.
    // Сам верный ответ она не возвращает — только похожие значения, — поэтому
    // каждый вид ставит его первым сам: варианты обязан содержать правильный
    // ответ, иначе вопрос без верной кнопки.
    // Повторов среди вариантов быть не может — ответ сравнивается с текстом
    // кнопки, и две одинаковые кнопки дадут два верных ответа (в греческом
    // [эв] — это и ευ, и ηυ; в еврейском «х» — и хе, и хет).
    letter_name: {
        prompt: () => t('Как называется эта буква?'),
        subject: q => q.letter,
        correct: q => q.name,
        options: q => [q.name].concat(
            otherValues(courseAlphabet().letters.map(l => l.name), q.name, 3)),
        // Названия букв бывают на изучаемом языке (ἄλφα), а бывают русскими
        // (а́леф, «син / шин») — шрифт выбирается по самой строке.
        script: q => isScriptText(q.name)
    },
    // Письмо от руки: по имени буквы её рисуют на холсте, а по кнопке «Готово»
    // показывается верное начертание. Вариантов ответа у вида нет (custom),
    // поэтому разметку рисует сам showExercise.
    //
    // Поле writing — начертание, с которого вид начинается: 'print'. Второе,
    // 'cursive' (курсив, рукописная гарнитура Гверет Левин), включает
    // переключатель внутри упражнения — и только там, где курс заявил, что
    // рукописный шрифт у него есть (courseCursiveWriting). Отдельным видом
    // курсив не объявлен намеренно: начертание — это не другое упражнение,
    // а другой показ того же вопроса, и разводить их по видам значило бы
    // держать в списке урока две почти одинаковые карточки.
    letter_write: {
        subject: q => q.name,
        correct: q => q.name,
        script: q => isScriptText(q.name),
        writing: 'print',
        custom: true
    },
    letter_from_name: {
        prompt: () => t('Какая буква так называется?'),
        subject: q => q.name,
        correct: q => q.letter,
        options: q => [q.letter].concat(
            otherValues(courseAlphabet().letters.map(l => l.letter), q.letter, 3)),
        script: true
    },
    letter_sound: {
        prompt: () => t('Как произносится эта буква?'),
        subject: q => q.letter,
        correct: q => q.sound,
        options: q => [q.sound].concat(
            otherValues(courseAlphabet().letters.map(l => l.sound), q.sound, 3))
    },
    // Порядок букв. Варианты — сами буквы, а не их названия: вопрос о том, что
    // стоит следом за буквой. Последняя буква алфавита в вопросы не входит —
    // ответа у неё нет, и в данных стоит .slice(0, -1).
    letter_order: {
        prompt: () => t('Какая буква идёт следом?'),
        subject: q => q.letter,
        correct: q => alphabetSuccessor(q.letter),
        options: q => {
            const next = alphabetSuccessor(q.letter);
            return [next].concat(otherValues(courseAlphabet().letters.map(l => l.letter),
                [q.letter, next], 3));
        },
        script: true
    },
    // Регистр есть только в греческом: в иврите прописных нет, и поля upper
    // в данных курса тоже нет — вида в главе просто не окажется.
    letter_case_lower: {
        prompt: () => t('Какая строчная буква соответствует прописной?'),
        subject: q => q.upper,
        correct: q => q.letter,
        options: q => [q.letter].concat(
            otherValues(courseAlphabet().letters.map(l => l.letter), q.letter, 3)),
        script: true
    },
    letter_case_upper: {
        prompt: () => t('Какая прописная буква соответствует строчной?'),
        subject: q => q.letter,
        correct: q => q.upper,
        options: q => [q.upper].concat(
            otherValues(courseAlphabet().letters.map(l => l.upper), q.upper, 3)),
        script: true
    },
    diphthong_sound: {
        prompt: () => t('Как произносится этот дифтонг?'),
        subject: q => q.diphthong,
        correct: q => q.sound,
        options: q => [q.sound].concat(
            otherValues(courseAlphabet().diphthongs.map(d => d.sound), q.sound, 3))
    },
    // Придыхание и ударение — вопрос о знаке, а не о букве или слове. Набор
    // вариантов постоянный и лежит здесь, чтобы автор не повторял его в каждом
    // вопросе; правильный ответ приходит из данных (q.correct), и тест следит,
    // чтобы он совпадал с одним из этих трёх-двух.
    breathing_type: {
        prompt: () => t('Какое придыхание при этой гласной?'),
        subject: q => q.sign,
        options: ['Густое (с [х])', 'Тонкое (не произносится)']
    },
    accent_type: {
        prompt: () => t('Какое ударение на этой гласной?'),
        subject: q => q.sign,
        options: ['Острое', 'Тупое', 'Облеченное']
    },
    // --- буквы еврейского алфавита: глава 1 ---
    // Пять конечных букв (ך ם ן ף ץ) похожи одна на другую сильнее, чем на
    // свои обычные формы, поэтому в вариантах все пять, а не выборка: подсказкой
    // служит только начертание.
    heb_letter_final: {
        prompt: () => t('Выберите конечную форму буквы'),
        subject: q => q.letter,
        correct: q => q.final,
        options: q => [q.final].concat(
            otherValues(courseAlphabet().finals.map(f => f.final), q.final, 4)),
        script: true
    },
    // --- греческий именной строй ---
    declension_fill: {
        prompt: q => t('Вставьте форму для <b>') + getCaseName(q.case) + t('</b> для слова ') +
            sc(q.word ? q.word + ' (' + drillGloss(q.word, q.translation) + ')' : ''),
        script: true
    },
    case_number: {
        prompt: q => t('Определите падеж и число для формы: ') + sc(q.form)
    },
    agreement: {
        prompt: q => t('Вставьте прилагательное ') + sc(q.adjective) + t(' в правильной форме:<br>') +
            sc(q.article + ' ____ ' + q.noun),
        script: true
    },
    attribute_vs_predicate: {
        prompt: q => t('Определите, атрибутив или предикатив:<br>') + sc(q.phrase)
    },
    substantivation: {
        prompt: q => t('Что означает:<br>') + sc(q.phrase)
    },
    // Артикль есть и там, и там: в греческом выбирают одну из форм ὁ/ἡ/τό, в
    // еврейском — огласовку ה перед первым согласным слова. Вопрос один и тот
    // же, поэтому вид общий и ключ без префикса. Пропуск стоит перед словом: в
    // тексте справа налево он окажется справа, где приставке и место.
    article_fill: {
        prompt: q => t('Вставьте правильную форму артикля:<br>') + sc('____ ' + q.noun),
        correct: q => q.correct_article,
        script: true
    },

    // --- огласовка и чтение: главы 2–3 еврейского курса ---
    // Знак огласовки сам по себе — комбинирующий символ, он не отображается без
    // согласного. Поэтому в данных он лежит вместе с носителем, как в пособии
    // (בַּ), а не голым.
    heb_vowel_name: {
        prompt: () => t('Как называется этот знак?'),
        subject: q => q.sign
    },
    // Тот же знак, другой вопрос: не как знак называется, а какой звук он
    // обозначает. Вариантов ровно пять — по числу гласных, набор постоянный,
    // а ответ берётся у самого знака: в пуле курса он и лежит полем sound.
    heb_vowel_sound: {
        prompt: () => t('Какой звук обозначает этот знак?'),
        subject: q => q.sign,
        correct: q => q.sound,
        options: ['[а]', '[э]', '[и]', '[о]', '[у]']
    },
    heb_vowel_fill: {
        prompt: q => t('Какого знака огласовки не хватает?') +
            (q.translation ? ' («' + t(q.translation) + '»)' : ''),
        subject: q => q.word,
        script: true
    },
    heb_shva: {
        prompt: q => t('Как читается шва') + (q.letter ? t(' под буквой ') + sc(q.letter) : '') + '?',
        subject: q => q.word,
        options: ['«Немое» шва', '«Произносимое» шва']
    },
    heb_dagesh: {
        prompt: q => t('Какой дагеш стоит в букве ') + sc(q.letter) + '?',
        subject: q => q.word,
        options: ['«Слабый» дагеш', '«Сильный» дагеш']
    },
    // Камец и камец хатуф выглядят одинаково, различает их только слог, —
    // поэтому в вопросе слово целиком, а не одна буква.
    heb_qamets: {
        prompt: q => t('Камец или камец хатуф') + (q.letter ? t(' под буквой ') + sc(q.letter) : '') + '?',
        subject: q => q.word,
        options: ['Камец — долгий ā', 'Камец хатуф — краткий o']
    },
    // Род и число — тот же вопрос, что греческий case_number, но падежей в
    // иврите нет, а подпись того вида их называет. Отдельный вид, а не общий:
    // «Падеж и число» над еврейской главой было бы просто неверно.
    heb_gender_number: {
        prompt: () => t('Определите род и число'),
        subject: q => q.word,
        options: ['Муж. р., ед. ч.', 'Муж. р., мн. ч.',
                  'Жен. р., ед. ч.', 'Жен. р., мн. ч.', 'Двойственное число']
    },
    heb_begadkefat: {
        prompt: q => t('Как произносится буква ') + sc(q.letter) + '?',
        subject: q => q.word
    },
    // Границу слога пособие метит вертикальной чертой (דְּ|בָ|רִים) — её же
    // ждём и в ответе, чтобы данные писались прямо из книги.
    heb_syllables: {
        prompt: () => t('Разделите слово на слоги'),
        subject: q => q.word,
        script: true
    },

    // --- формы: главы 5, 9, 10 еврейского курса ---
    // Гортанные и ר не удваиваются, и вместо удвоения происходит одно из трёх.
    // Четвёртый вариант — обычное удвоение: без него выбирать было бы не из чего.
    heb_gutturals: {
        prompt: () => t('Что произошло с артиклем?'),
        subject: q => q.phrase,
        options: ['Обычное удвоение', 'Заместительное удлинение',
                  'Скрытое удвоение гортанного', 'Неправильный сегол']
    },
    // Перевод в вопросе не показываем: «этот голос этого человека» — это и есть
    // ответ. То же и у суффиксов: «его кони» выдало бы множественное число.
    heb_construct: {
        prompt: () => t('Сочетание определённое или неопределённое?'),
        subject: q => q.phrase,
        options: ['Определённое', 'Неопределённое']
    },
    heb_suffix_type: {
        prompt: () => t('Суффикс какого типа?'),
        subject: q => q.word,
        options: ['Тип 1 — существительное ед. ч.', 'Тип 2 — существительное мн. ч.']
    },

    // Не «выбор варианта»: у этих двух свой виджет — поле ввода и банк слов.
    // Разметка у упражнения урока и у теста разная (свои id и свои обработчики),
    // общего кода не выходит, и рисуют их showExercise и showTest. Объявлены
    // здесь, чтобы список видов оставался полным.
    translate_greek_to_russian: { custom: true },
    translate_russian_to_greek: { custom: true }
};

// Подписи вариантов — русские строки: и постоянные наборы видов, и то, что
// приходит из данных («2-е л. ед.ч.»). В английском режиме переводится и
// вариант, и правильный ответ одним и тем же словарём: ответ сверяется с
// текстом нажатой кнопки, поэтому разойтись они не могут. Строки изучаемого
// языка в словаре отсутствуют, и t() возвращает их как есть.
function exerciseCorrect(type, q) {
    return t(type.correct ? type.correct(q) : q.correct);
}

function exerciseOptions(type, q) {
    let options;
    if (Array.isArray(type.options)) options = type.options;
    else if (typeof type.options === 'function') options = type.options(q);
    else options = [type.correct ? type.correct(q) : q.correct].concat(q.distractors || []);
    return options.map(o => t(o));
}

// Неверные варианты из пула значений: буквы, звуки, транслитерация. Берём не
// «что попало», а с равным шагом по пулу — тогда в вариантах оказываются в том
// числе соседние по алфавиту буквы, а их-то и путают. Шаг считается от ответа:
// отступив от него, мы не подсовываем в один вопрос две почти одинаковые
// подсказки подряд.
//
// Значения пула повторяются (в греческом [эв] — это и ευ, и ηυ), а два
// одинаковых варианта — это два верных ответа: ответ сравнивается с текстом
// кнопки. Поэтому пул сначала схлопывается, а исключённое (правильный ответ и
// то, о чём уже спросили в самом вопросе) не возвращается. Если значений в пуле
// меньше, чем просили, вернётся сколько есть — вопроса без вариантов не будет,
// пока в пуле есть хоть что-то.
function otherValues(values, exclude, n) {
    exclude = [].concat(exclude);
    let uniq = [];
    for (let v of values) if (!uniq.includes(v)) uniq.push(v);
    if (!uniq.length) return [];
    let start = 0;
    for (let e of exclude) {
        let i = uniq.indexOf(e);
        if (i >= start) start = i + 1;
    }
    let out = [];
    let step = Math.max(1, Math.round(uniq.length / (n + 1)));
    for (let k = 0; k < uniq.length && out.length < n; k++) {
        let v = uniq[(start + k * step) % uniq.length];
        if (exclude.includes(v) || out.includes(v)) continue;
        out.push(v);
    }
    // Шаг мог перескочить через исключённые значения и не добрать вариантов.
    for (let v of uniq) {
        if (out.length >= n) break;
        if (!exclude.includes(v) && !out.includes(v)) out.push(v);
    }
    return out;
}

// Следующая буква алфавита — ответ вида letter_order. Буквы лежат в данных
// в алфавитном порядке. У последней буквы следующей нет, поэтому в вопросы она
// не попадает (в данных стоит .slice(0, -1)); пустая строка здесь — не ответ,
// а признак того, что вопроса быть не должно.
function alphabetSuccessor(letter) {
    let letters = (courseAlphabet().letters || []).map(l => l.letter);
    let i = letters.indexOf(letter);
    return i >= 0 && i + 1 < letters.length ? letters[i + 1] : '';
}

// Разметка вопроса с выбором варианта. Обработчик передаётся именем: у
// упражнения урока и у теста они разные (answerOpt и testAnswer), но принимают
// одно и то же — выбранный ответ и правильный.
function choiceQuestionHtml(key, q, handler) {
    let type = EXERCISE_TYPES[key];
    if (!type || !type.prompt) return '<p>' + t('Тип упражнения не поддерживается.') + '</p>';
    let corr = exerciseCorrect(type, q);
    let html = '<div class="question">' + type.prompt(q) + '</div>';
    // Строки с разбираемым словом может не быть: у бегадкефат главы 1 слово не
    // приводится, спрашивают о букве, и поля word в этих вопросах нет.
    if (type.subject) {
        // Подпись переводится тем же словарём, что и варианты: имя буквы в
        // данных русское («а́леф»), в английском режиме это «aleph». Строки
        // изучаемого языка в словаре отсутствуют, и t() возвращает их как есть.
        let sub = t(type.subject(q));
        // Шрифт строки — по самой строке: под вопросом о букве стоит то её
        // начертание (ἄλφα, בּ), то русское название (а́леф). Серифный шрифт со
        // скриптом курса русскому тексту противопоказан, и наоборот.
        if (sub) html += '<div class="' + (isScriptText(sub) ? 'md-prompt-strong' : 'md-prompt-ru') + '">' + sub + '</div>';
    }
    // Варианты на изучаемом языке — не свойство вида, а свойство вопроса:
    // «как называется буква» в греческом курсе имеет греческие варианты,
    // в еврейском — русские.
    let script = typeof type.script === 'function' ? type.script(q) : type.script;
    html += '<div class="options' + (script ? ' options--script' : '') + '">';
    for (let o of shuffle(exerciseOptions(type, q))) {
        html += '<button class="option-btn" onclick="' + handler + '(\'' + escArg(o) + '\',\'' +
            escArg(corr) + '\')">' + o + '</button>';
    }
    return html + '</div>';
}

// Чем вопрос назван в разборе ошибок. Поле, в котором лежит разбираемое
// значение, у каждого вида своё, поэтому спрашиваем сам вид: у letter_case_upper
// разбирают строчную букву, а первый подходящий по имени ключ показал бы в
// разборе ошибок не то, о чём спрашивали. Виды без subject (перевод) по-прежнему
// отдают слово, фразу или форму; q.letter добавлен для вопросов об алфавите.
function questionSubject(q, key) {
    let type = EXERCISE_TYPES[key];
    if (type && type.subject) {
        let sub = t(type.subject(q));
        if (sub) return sub;
    }
    return q.word || q.phrase || q.form || q.sign || q.greek || q.letter || t('вопрос');
}

// Формы буквы для показа — в порядке чтения слева направо: сперва прописная,
// затем строчная («Σ σ»). Порядок задаёт этот список, а не место в разметке:
// он один на весь вид, поэтому разойтись с показом ему негде. Конечной сигмы
// (ς) в нём нет и быть не может — её нет в пуле курса (см. GREEK_ALPHABET
// в data/lessons.js), а спрашивают о начертании буквы, а не о чтении слова.
//
// К направлению письма порядок отношения не имеет: греческий всегда слева
// направо, а RTL приходит только из токена курса (--md-ref-script-direction).
function letterWriteForms(q) {
    return q.upper ? [q.upper, q.letter] : [q.letter];
}

// Формы для показа буквы. У греческого их две — прописная и строчная. У иврита
// буква одна, но у пяти букв есть конечная форма, и показ даёт обе: так же, как
// греческий показывает обе свои, — «כ ך». Пару ищет пул курса
// (courseAlphabet().finals), поэтому у буквы без конечной формы остаётся она
// одна. Порядок — обычная, затем конечная: в RTL-строке первой встанет справа
// обычная, и глаз читает их в порядке письма. Показ спрашивает эту функцию, а не
// letterWriteForms: тот отдаёт формы вопроса, и путать их незачем.
function letterWriteRevealForms(q) {
    if (q.upper) return [q.upper, q.letter];
    const pair = (courseAlphabet().finals || [])
        .find(f => f.letter === q.letter || f.final === q.letter);
    return pair ? [pair.letter, pair.final] : [q.letter];
}

// Вид «письмо от руки»: отдаёт начертание, с которого вид начинается, или null,
// если вид не про письмо. По этому ответу решается и какая разметка рисуется,
// и нужно ли инициализировать холст, — поэтому спрашиваем таблицу видов, а не
// сравниваем имя вида.
function exerciseWritingStyle(key) {
    const type = EXERCISE_TYPES[key];
    return type && type.custom && type.writing ? type.writing : null;
}

// Начертания письма: печатное и рукописное. Это один и тот же вопрос с разной
// гарнитурой показа (.script--cursive, styles/base.css), поэтому вид один, а
// начертание выбирается один раз на всё упражнение — экраном выбора, который
// показывается до первой буквы и повторяется при каждом заходе.
const LETTER_WRITE_STYLES = [
    { style: 'print', label: 'Печатные' },
    { style: 'cursive', label: 'Курсив' }
];
// Образец — одна буква, показанная обоими начертаниями: только по ней и видно,
// что выбираешь. א — первая буква алфавита, и в курсиве она отличается от
// печатной заметно. Записана кодом: так знак не потеряется при правке.
const LETTER_WRITE_SAMPLE = '\u05D0';

// Экран выбора начертания — список .lesson-item, но без круглого значка: в
// пункте стоит сама буква в нужном начертании, а за ней — слово, которым это
// начертание называется («א Печатные», «א Курсив»). Живёт он внутри экрана
// упражнения, а не перекрытием, как выбор курса: так остаются и заголовок
// «Написание буквы» в app bar, и кнопка «назад», то есть из выбора можно выйти,
// не начав упражнение.
//
// Заголовок карточки на этом шаге — приглашение выбрать начертание, а не
// название упражнения: в app bar уже стоит «Написание буквы», и та же строка
// над списком читалась бы как дубль. К прогону вопросов заголовок возвращает
// startLetterWrite().
function showLetterWriteChoice() {
    const box = document.getElementById('exerciseQuestion');
    if (!box) return;
    const stageTitle = document.getElementById('drillStageTitle');
    if (stageTitle) stageTitle.textContent = t('Выберите стиль написания');
    const rows = LETTER_WRITE_STYLES.map(o =>
        '<button class="lesson-item lesson-item--single" onclick="startLetterWrite(\'' + o.style + '\')">' +
            '<span class="lesson-item__text"><span class="lesson-item__headline">' +
                '<span class="script' + (o.style === 'cursive' ? ' script--cursive' : '') + '">' +
                    LETTER_WRITE_SAMPLE + '</span> ' + t(o.label) +
            '</span></span>' +
            '<span class="lesson-item__trailing msym">chevron_right</span>' +
        '</button>');
    box.innerHTML = '<div class="card letter-write-choice">' +
        '<div class="lesson-list">' + rows.join('<hr class="md-divider">') + '</div>' +
        '</div>';
}

// Выбор сделан — дальше обычный прогон вопросов в выбранном начертании.
// Заголовок карточки возвращается к названию упражнения: его сменил
// showLetterWriteChoice(), и без этого «Выберите стиль написания» осталось бы
// висеть над первой буквой.
function startLetterWrite(style) {
    if (!LETTER_WRITE_STYLES.some(o => o.style === style)) style = 'print';
    const stageTitle = document.getElementById('drillStageTitle');
    if (stageTitle && currentDrill) stageTitle.textContent = drillLabel(currentDrill);
    beginExercise(exerciseState && exerciseState.type ? exerciseState.type : 'letter_write', style);
}

function letterWritePracticeState() {
    const q = exerciseState && exerciseState.questions && exerciseState.questions[exerciseState.index] ? exerciseState.questions[exerciseState.index] : null;
    if (!q) return null;
    const isGreek = !!q.upper;
    return {
        isGreek,
        letters: letterWriteForms(q),
        // Имя одно на обе формы: обычную и конечную называют одинаково, и
        // пометки «(конечная)» нет — показ после «Готово» даёт сразу пару форм,
        // а вопрос называет букву, а не начертание. Русское имя, если оно есть
        // (греческий пул), иначе — само название (иврит уже назван
        // по-русски): рисовать букву надо по читаемому имени, а не по
        // греческому ἄλφα, которое в начале курса ещё не прочтёшь.
        prompt: t(q.ru || q.name),
        cardClass: isGreek ? 'writing-canvas-card--greek' : 'writing-canvas-card--hebrew',
        canvasClass: 'writing-canvas'
    };
}

// Холст — общий у письма буквы и у написания огласовки, отличается только id,
// поэтому и очистка одна на оба: id приходит из разметки.
function clearWritingCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    let ctx;
    try {
        ctx = canvas.getContext('2d');
    } catch (error) {
        return;
    }
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
}

function completeLetterWritingPractice() {
    if (!exerciseState || !exerciseState.questions || !exerciseState.questions.length) return;
    const q = exerciseState.questions[exerciseState.index];
    const box = document.getElementById('exerciseQuestion');
    if (!box || !q) return;

    stats.totalCorrect++;
    exerciseState.correct++;
    saveStats();

    const isGreek = !!q.upper;
    // Карточка показа — только начертание: имя уже было вопросом перед
    // рисованием, и повторять его на ответе незачем.
    //
    // Начертание взято из выбора на весь заход, а не у вида: печатное и
    // рукописное — один и тот же вопрос, и отличается у них только гарнитура
    // (.script--cursive, styles/base.css). Кегль, направление и цвет — те же.
    //
    // Оборот — та же карточка, что холст, только с показом буквы: ширина и тон
    // поверхности у них общие (md-flashcard--writing, styles/screens.css),
    // поэтому при перевороте не меняется ничего, кроме содержимого. Потолок
    // ширины у курсов разный, отсюда второй модификатор у греческого.
    // exercise-actions разводит «Назад» и «Далее» по краям — так же, как на
    // холсте разведены «Очистить» и «Готово» (styles/screens.css), поэтому
    // «Назад» встаёт на место «Очистить».
    const cursive = letterWriteStyle === 'cursive';
    const writingCardClass = 'md-flashcard md-flashcard--writing' +
        (isGreek ? ' md-flashcard--writing-greek' : '') +
        ' md-flashcard--back md-flashcard--has-flip md-flashcard--flip';
    // Показ устроен одинаково в обоих курсах: одна .letter-write-reveal__forms,
    // внутри — .script. Так обе карточки и центрируют букву одним и тем же
    // флексом, и берут один кегль. Кегль здесь складывается из двух множителей
    // нарочно: 3.5rem × ползунок на коробке даёт .script в 1em, а его
    // собственный множитель умножает ещё раз, — именно так выглядит греческий
    // показ, и иврит обязан совпасть с ним по крупности, а не остаться на
    // одном множителе (был вдвое мельче, см. tests/drills.test.js). Формы —
    // в том числе конечную у иврита — отдаёт letterWriteRevealForms;
    // начертание (.script--cursive) одно на весь заход.
    const revealForms = letterWriteRevealForms(q)
        .map(f => '<span class="script' + (cursive ? ' script--cursive' : '') + '">' + f + '</span>')
        .join('');
    const reveal =
        '<div class="letter-write-reveal">' +
        '<div class="letter-write-reveal__forms">' + revealForms + '</div>' +
        '</div>';

    // Назад к холсту: «Готово» можно нажать, не дорисовав или не написав букву,
    // — тогда ответ засчитан, а написать хочется. Кнопка стоит там же, где на
    // холсте стоит «Очистить»: слева, на своём месте между двумя шагами
    // (exercise-actions разводит обе кнопки по краям, styles/screens.css).
    box.innerHTML = progressHead(tProgress('Упражнение', exerciseState.index + 1, exerciseState.total), exerciseState.index, exerciseState.total) +
        '<div class="flashcard-flip"><div class="' + writingCardClass + '">' +
        reveal +
        '</div></div>' +
        '<div class="md-button-row exercise-actions"><button type="button" class="menu-btn outlined" onclick="backToLetterWriteCanvas()"><span class="msym">edit</span>' + t('Назад') + '</button><button type="button" class="menu-btn primary" onclick="nextExercise()"><span class="msym">arrow_forward</span>' + t('Далее') + '</button></div>';

    alignLetterReveal();
}

// Начертание ставится по центру карточки — по чернилам, а не по строке. Строку
// флекс центрует и так, но чернила глифа сидят в ней не посередине: у ламеда
// выносная уходит вверх, у конечных форм хвост вниз, и буква кажется сдвинутой.
// Поэтому после отрисовки меряем чернильную рамку буквы и сдвигаем показ ровно
// настолько, чтобы посередине карточки оказалась она. Сдвиг идёт через
// transform: поток не меняется, поле письма не удлиняется, карточка не прыгает.
function alignLetterReveal() {
    const reveal = document.querySelector('#exerciseQuestion .letter-write-reveal');
    const forms = reveal && reveal.querySelector('.letter-write-reveal__forms');
    if (!forms || !forms.children.length) return;
    const band = letterRevealInkBand(forms);
    if (!band) return;
    const shift = Math.round(forms.offsetHeight / 2 - (band.top + band.bottom) / 2);
    if (shift) reveal.style.setProperty('--letter-write-ink-shift', shift + 'px');
}

// Чернильная рамка форм относительно верха их строки: top — самый высокий глиф,
// bottom — самый низкий. Границы берём у холста (actualBoundingBox*): DOM до
// контура глифа не добирается. В jsdom холста нет (tests/helpers/app.js
// подменяет getContext на null) — тогда null, и показ остаётся как есть.
function letterRevealInkBand(forms) {
    const scripts = [...forms.querySelectorAll('.script')];
    if (!scripts.length) return null;
    let ctx;
    try {
        ctx = document.createElement('canvas').getContext('2d');
    } catch (error) {
        return null;
    }
    if (!ctx || typeof ctx.measureText !== 'function') return null;
    let top = Infinity;
    let bottom = -Infinity;
    for (const el of scripts) {
        const cs = getComputedStyle(el);
        const lineHeight = parseFloat(cs.lineHeight);
        if (!isFinite(lineHeight)) return null;
        ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
        const m = ctx.measureText(el.textContent);
        const rise = m.fontBoundingBoxAscent;
        const fall = m.fontBoundingBoxDescent;
        if (!isFinite(rise) || !isFinite(fall) ||
            !isFinite(m.actualBoundingBoxAscent) || !isFinite(m.actualBoundingBoxDescent)) return null;
        const baseline = (lineHeight - (rise + fall)) / 2 + rise;
        top = Math.min(top, baseline - m.actualBoundingBoxAscent);
        bottom = Math.max(bottom, baseline + m.actualBoundingBoxDescent);
    }
    return isFinite(top) && isFinite(bottom) ? { top: top, bottom: bottom } : null;
}

// Возврат к письму после показа буквы. Отменяет засчитанный ответ и отдаёт тот
// же вопрос с тем же id — обработчики showExercise навешиваются заново, потому
// что состояние осталось на прежнем индексе (completeLetterWritingPractice его
// не двигает; двигает nextExercise, который здесь не зовётся).
//
// Кегль, направление и гарнитуру холста задаёт разметка; вправлять цвет
// последнего штриха не нужно — холст был очищен перед началом вопроса.
function backToLetterWriteCanvas() {
    if (!exerciseState || !exerciseState.type) return;
    if (!exerciseWritingStyle(exerciseState.type)) return;
    if (stats.totalCorrect > 0) stats.totalCorrect--;
    if (exerciseState.correct > 0) exerciseState.correct--;
    saveStats();
    // Возврат к холсту — единственный признак, что начертание не совпало с
    // показанным: ответ в письме не проверяется, и «Назад» жмут именно тогда,
    // когда буква написана не так. Такой вопрос попадёт в разбор захода.
    const q = exerciseState.questions[exerciseState.index];
    if (q) noteDrillMistake(exerciseState, {
        word: q.ru || q.name,
        correct: letterWriteRevealForms(q).join(' '),
        your: t('вернулись переписать'),
        q: q
    });
    showExercise();
}

// Холст один на письмо буквы и на написание огласовки; id приходит из разметки,
// потому что на экране он всегда ровно один из двух.
//
// options.tapDot (только у огласовки, см. showVowelWrite) — простое нажатие без
// движения рисует точку, а не требует вести палец по кругу, чтобы её получить:
// половина знаков огласовки — это точки (хирек, холем, киббуц, сегол, цере), и
// вести палец по кругу ради одной точки и неудобно, и на точку не похоже. Штрих
// остаётся штрихом: палец, уехавший от точки касания дальше порога, рисует
// линию, как раньше, — чёрточку патаха и камеца по-прежнему ведут. У письма
// буквы тап точку не ставит: там точка — часть начертания, а не весь ответ.
function initWritingCanvas(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    let ctx;
    try {
        ctx = canvas.getContext('2d');
    } catch (error) {
        return;
    }
    if (!ctx) return;

    const tapDot = !!(options && options.tapDot);
    // Порог «это ещё тап, а не штрих» в CSS-пикселях: палец всегда чуть
    // вздрагивает на месте, и без порога каждый тап оставлял бы короткую
    // линию рядом с точкой. Пока смещение не превысило порог, линия не
    // начинается вовсе; перевалив — штрих ведётся от точки касания.
    const TAP_SLOP = 8;
    const state = { drawing: false, lastX: 0, lastY: 0, startX: 0, startY: 0, moved: false };
    // Размер буфера холста и его CSS-рамка — не одно и то же. Рамку задаёт
    // вёрстка (карточка тянется вместе с окном), а буфер надо под неё подогнать,
    // иначе браузер растянет нарисованное: штрих ляжет не под пальцем, а линии
    // выйдут размытыми. На телефоне колонка у́же, чем холст был в разметке
    // по умолчанию, и без этой подгонки всё поле оказывалось растянутым.
    //
    // Подгоняем на каждом изменении рамки, а не только по window.resize:
    // рамку меняет и контейнер (.app у́же на телефоне), а окно при этом может
    // не менять размера. Наблюдатель на самой карточке видит оба случая —
    // выбор начертания, поворот экрана, смена размера окна — и один.
    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        const w = Math.round(rect.width * ratio);
        const h = Math.round(rect.height * ratio);
        // Тот же размер — ничего не трогаем: только тогда сохранённый штрих
        // не пропадёт зря.
        if (canvas.width === w && canvas.height === h) return;
        // Было нарисовано — запоминаем и возвращаем после сброса буфера.
        // Менять размер canvas.width/height обнуляет содержимое, и на повороте
        // экрана рисунок иначе бы пропадал; переносим его один в один, потому
        // что рисуем мы в CSS-пикселях (см. setTransform ниже), а не в пикселях
        // буфера.
        let previous = null;
        if (canvas.width && canvas.height) {
            try {
                previous = document.createElement('canvas');
                previous.width = canvas.width;
                previous.height = canvas.height;
                previous.getContext('2d').drawImage(canvas, 0, 0);
            } catch (error) {
                previous = null;
            }
        }
        canvas.width = w;
        canvas.height = h;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary').trim() || '#6750a4';
        ctx.clearRect(0, 0, rect.width, rect.height);
        if (previous) ctx.drawImage(previous, 0, 0, rect.width, rect.height);
    };

    const pointerPos = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const drawLine = (from, to) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    };

    // Точка — залитый кружок того же цвета, что и штрих, и толщиной с него:
    // она должна читаться как та же точка, что в образце под холстом, а не как
    // клякса. Радиус от ширины линии (6px), но с запасом на случай, если
    // resize ещё не задал её.
    const drawDot = (pos) => {
        const radius = Math.max(3, (ctx.lineWidth || 6) * 0.85);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
    };

    // Начало и продолжение одного штриха. Вынесены сюда, потому что ведут их
    // две дороги — касания и указатель (мышь, перо): сам штрих у них общий.
    const startStroke = (pos) => {
        state.drawing = true;
        state.moved = false;
        state.startX = pos.x;
        state.startY = pos.y;
        state.lastX = pos.x;
        state.lastY = pos.y;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const moveStroke = (pos) => {
        if (!state.drawing) return;
        if (!state.moved) {
            const dx = pos.x - state.startX;
            const dy = pos.y - state.startY;
            if (Math.hypot(dx, dy) < TAP_SLOP) return;
            // Порог пройден — это штрих, и он начинается там, где палец
            // коснулся холста, а не там, где закончилось дрожание.
            state.moved = true;
            state.lastX = state.startX;
            state.lastY = state.startY;
        }
        drawLine({ x: state.lastX, y: state.lastY }, pos);
        state.lastX = pos.x;
        state.lastY = pos.y;
    };

    // Палец (или кнопку) отпустили. Тап без движения — точка: координату берём
    // из начала штриха, потому что у отпускания её может и не быть, а за время
    // тапа палец никуда не ушёл.
    const endStroke = () => {
        if (tapDot && state.drawing && !state.moved) {
            drawDot({ x: state.startX, y: state.startY });
        }
        state.drawing = false;
    };

    // Штрих прерван, а не закончен (указатель ушёл с холста, браузер забрал
    // жест): точку не ставим — палец ещё не отпустили.
    const cancelStroke = () => { state.drawing = false; };

    // --- касания ---------------------------------------------------------
    // Жест рисуем по touch-событиям, а не по pointer-событиям, и это
    // принципиально. iOS Safari на жесте, начатом на холсте, забирает движение
    // себе даже с touch-action: none: страница уезжает под рукой («дёргается
    // экран»), штрих обрывается на середине, и приходит pointercancel — а он в
    // прежней версии гасил рисование, поэтому дальше палец водили вхолостую
    // («думает, что я двигаю, а не пишу»). preventDefault на touchstart и
    // touchmove — это ответ «жест наш»: после него браузер не начинает ни
    // прокрутку, ни масштабирование, и движения продолжают приходить. Слушатели
    // не passive: passive preventDefault на iOS игнорируется.
    //
    // Поэтому же pointer-события с pointerType 'touch' ниже игнорируются —
    // иначе штрих писался бы дважды, а pointercancel обрывал бы его. Мышь и
    // перо остаются на pointer-событиях: touch-событий у них нет.
    //
    // Слушаем всю карточку, а не холст: холст вписан в неё с полем 12px
    // (styles/screens.css), и жест, начатый в этом поле, тоже должен рисовать,
    // а не уезжать страницей.
    const surface = canvas.closest('.writing-canvas-card') || canvas;
    const touchPos = (touch) => pointerPos(touch.clientX, touch.clientY);

    surface.addEventListener('touchstart', function (event) {
        // Второй палец — это масштабирование, а не рисование: жест ему и
        // оставляем, свой штрих заканчиваем.
        if (!event.touches || event.touches.length !== 1) { cancelStroke(); return; }
        event.preventDefault();
        startStroke(touchPos(event.touches[0]));
    }, { passive: false });

    surface.addEventListener('touchmove', function (event) {
        if (event.touches && event.touches.length > 1) { cancelStroke(); return; }
        // Прокрутку гасим всегда, даже вне штриха (синтетическое событие без
        // touches — как у прежнего предохранителя): поле не должно уезжать.
        event.preventDefault();
        if (!state.drawing || !event.touches || !event.touches.length) return;
        moveStroke(touchPos(event.touches[0]));
    }, { passive: false });

    surface.addEventListener('touchend', endStroke);
    surface.addEventListener('touchcancel', cancelStroke);

    // --- мышь и перо -----------------------------------------------------
    canvas.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'touch') return;
        // Состояние выставляем до захвата указателя: setPointerCapture может
        // бросить (указателя уже нет, браузер без поддержки), и тогда прежний
        // порядок оставлял холст нерисующим вовсе.
        startStroke(pointerPos(event.clientX, event.clientY));
        try { canvas.setPointerCapture(event.pointerId); } catch (error) {}
    });

    canvas.addEventListener('pointermove', function (event) {
        if (event.pointerType === 'touch') return;
        moveStroke(pointerPos(event.clientX, event.clientY));
    });

    canvas.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'touch') return;
        endStroke();
    });

    canvas.addEventListener('pointerleave', function (event) {
        if (event.pointerType === 'touch') return;
        cancelStroke();
    });
    canvas.addEventListener('pointercancel', function (event) {
        if (event.pointerType === 'touch') return;
        cancelStroke();
    });

    resize();
    // Подгоняем холст по обеим осям двумя путями, потому что одного мало.
    //
    // ResizeObserver на карточке ловит смену размера контейнера (на телефоне
    // карточка сужается без изменения окна) — но его одного недостаточно:
    // высота поля теперь зависит от высоты окна (100dvh в styles/screens.css),
    // а изменение только высоты окна ResizeObserver на карточке передаёт не
    // всегда и не во всех браузерах. window.resize — надёжный второй путь; он
    // же остаётся единственным там, где ResizeObserver нет вовсе.
    //
    // Наблюдатель живёт ровно столько, сколько сам холст: каждый вопрос
    // рисуется заново (showExercise переписывает #exerciseQuestion), вместе с
    // ним уходит и старый холст, и наблюдатель за ним. Отключать его по клику
    // нельзя — любой тап внутри упражнения (по тому же холсту, «Очистить»,
    // «Готово») погасил бы слежение, и поле перестало бы тянуться.
    if (typeof ResizeObserver === 'function') {
        new ResizeObserver(resize).observe(canvas.parentElement || canvas);
    }
    window.addEventListener('resize', resize);
}

function showExercise() {
    let s = exerciseState;
    if (s.index >= s.total) {
        document.getElementById('exerciseQuestion').innerHTML =
            resultBlock(s.correct, s.total, t('Упражнение завершено')) +
            drillReviewHtml(s.mistakes, 'retryExerciseMistakes()') +
            '<div class="md-button-row">' +
            '<button class="menu-btn primary" onclick="startExercise(\'' + s.type + '\')"><span class="msym">restart_alt</span>' + t('Ещё раз') + '</button>' +
            '<button class="menu-btn outlined" onclick="closeLessonDrill()"><span class="msym">arrow_back</span>' + t('К упражнениям') + '</button></div>';
        return;
    }
    let q = s.questions[s.index];
    let container = document.getElementById('exerciseQuestion');
    let html = progressHead(tProgress('Упражнение', s.index + 1, s.total), s.index, s.total);

    if (s.type === 'translate_greek_to_russian') {
        let idx = s.index;
        html += '<div class="question">' + t('Переведите на русский') + '</div><div class="md-prompt-strong">' + q.greek + '</div><div class="input-group"><input type="text" id="transInput" placeholder="' + t('Перевод') + '" autocomplete="off" onkeydown="if(event.key===\'Enter\'){checkExerciseTranslation(' + idx + ');}"><button type="button" onclick="checkExerciseTranslation(' + idx + ')"><span class="msym">check</span>' + t('Проверить') + '</button></div>';
    } else if (s.type === 'translate_russian_to_greek') {
        let words = shuffle(q.all_words);
        html += '<div class="question">' + t('Переведите на ') + courseLang() + '</div><div class="md-prompt-ru">' + q.russian + '</div><div class="build-area build-area--script" id="buildArea"></div><div class="word-bank word-bank--script" id="wordBank">';
        for (let w of words) html += '<span class="chip" onclick="pickWord(\'' + escArg(w) + '\')">' + w + '</span>';
        html += '</div><div class="md-button-row md-button-row--split"><button class="menu-btn text" onclick="clearChosen()"><span class="msym">undo</span>' + t('Очистить') + '</button><button class="menu-btn primary" onclick="checkTranslationRu()"><span class="msym">check</span>' + t('Готово') + '</button></div>';
        window._trans_ru = q;
        window._chosen = [];
    } else if (exerciseWritingStyle(s.type)) {
        const practice = letterWritePracticeState();
        let promptText = practice && practice.prompt ? practice.prompt : '';
        let promptClass = isScriptText(promptText) ? 'md-prompt-strong' : 'md-prompt-ru';
        const isGreek = practice && practice.isGreek;
        html += '<div class="' + promptClass + '">' + promptText + '</div>' +
            '<div class="writing-practice">' +
                '<div class="writing-canvas-card ' + (isGreek ? 'writing-canvas-card--greek' : 'writing-canvas-card--hebrew') + '">' +
                    '<canvas id="letterWriteCanvas" class="writing-canvas" aria-label="' + t('Поле для письма буквы') + '"></canvas>' +
                '</div>' +
                '<div class="md-button-row">' +
                    '<button type="button" class="menu-btn outlined" onclick="clearWritingCanvas(\'letterWriteCanvas\')"><span class="msym">delete</span>' + t('Очистить') + '</button>' +
                    '<button type="button" class="menu-btn primary" onclick="completeLetterWritingPractice()"><span class="msym">check</span>' + t('Готово') + '</button>' +
                '</div>' +
            '</div>';
    } else {
        html += choiceQuestionHtml(s.type, q, 'answerOpt');
    }
    container.innerHTML = html;

    if (exerciseWritingStyle(s.type)) initWritingCanvas('letterWriteCanvas');
}

// ============================================================
// НАПИСАНИЕ ОГЛАСОВКИ (еврейский курс)
// ============================================================
// Огласовка — комбинирующий знак: сам по себе он не отображается, а живёт при
// букве. Поэтому учить его начертание надо там же, где он стоит, и задание
// обратное карточке огласовок: карточка показывает знак и спрашивает название,
// здесь называют знак (и называют звук) и просят дорисовать его к носителю.
// Ход тот же, что у письма буквы: холст, «Готово» с показом верного знака и
// «Назад», снимающая засчитанный ответ, — но выбора начертания нет, оно одно.
//
// Носитель лежит под холстом бледным образцом (.vowel-write-guide), чтобы знак
// ставили на место, а не наугад. Колода — пул знаков курса
// (courseAlphabet().vowels), а не словарь урока: огласовка не слово. Пустой
// пул — не ошибка, а греческий курс, где таких знаков нет.
//
// Носитель — буква бет с дагешем: пул дописывает к ней все знаки (так же
// считает и tests/alphabet.test.js). Значения кодами: буква и дагеш — два
// разных знака, и глазами в редакторе их не различить.
const VOWEL_CARRIER = '\u05D1\u05BC';

// deck — необязательный набор знаков: «Повторить ошибки» передаёт сюда только
// те огласовки, к которым возвращались кнопкой «Назад».
function startVowelWrite(deck) {
    const vowels = Array.isArray(deck) ? deck.slice() : (courseAlphabet().vowels || []).slice();
    if (vowels.length === 0) {
        document.getElementById('exerciseQuestion').innerHTML = '<p>' + t('Нет огласовок.') + '</p>';
        return;
    }
    vowelWriteState = {
        words: shuffle(vowels), index: 0, revealed: false, correct: 0, total: vowels.length, mistakes: []
    };
    showVowelWrite();
}

// Повтор только тех знаков, к которым возвращались при письме.
function retryVowelWriteMistakes() {
    const s = vowelWriteState;
    if (!s || !Array.isArray(s.mistakes) || s.mistakes.length === 0) return;
    const words = s.mistakes.map(m => m.q).filter(Boolean);
    if (words.length) startVowelWrite(words);
}

function showVowelWrite() {
    const s = vowelWriteState;
    const box = document.getElementById('exerciseQuestion');
    if (!box) return;
    if (s.index >= s.total) {
        box.innerHTML = resultBlock(s.correct, s.total, t('Огласовки завершены')) +
            drillReviewHtml(s.mistakes, 'retryVowelWriteMistakes()') +
            '<div class="md-button-row">' +
            '<button class="menu-btn primary" onclick="startVowelWrite()"><span class="msym">restart_alt</span>' + t('Ещё раз') + '</button>' +
            '<button class="menu-btn outlined" onclick="closeLessonDrill()"><span class="msym">arrow_back</span>' + t('К упражнениям') + '</button></div>';
        return;
    }
    const v = s.words[s.index];
    let html = progressHead(tProgress('Огласовка', s.index + 1, s.total), s.index, s.total);
    if (s.revealed) {
        // Показ — тот же знак с носителем, что на обороте карточки, и те же
        // название и звук: ученик проверяет себя и заодно доучивает знак.
        html += '<div class="flashcard-flip"><div class="md-flashcard md-flashcard--writing md-flashcard--back md-flashcard--has-flip md-flashcard--flip">' +
            '<div class="letter-write-reveal">' +
                '<div class="vowel-write-form">' + v.sign + '</div>' +
                '<div class="flashcard-vowel-name">' + escHtml(t(v.name)) + '</div>' +
                '<div class="flashcard-vowel-sound">' + escHtml(t(v.sound)) + '</div>' +
            '</div>' +
            '</div></div>' +
            '<div class="md-button-row exercise-actions">' +
                '<button type="button" class="menu-btn outlined" onclick="backToVowelWriteCanvas()"><span class="msym">edit</span>' + t('Назад') + '</button>' +
                '<button type="button" class="menu-btn primary" onclick="nextVowelWrite()"><span class="msym">arrow_forward</span>' + t('Далее') + '</button>' +
            '</div>';
    } else {
        html += '<div class="question">' + t('Нарисуйте знак огласовки') + '</div>' +
            '<div class="vowel-write-prompt">' +
                '<span class="vowel-write-prompt__name">' + escHtml(t(v.name)) + '</span>' +
                '<span class="vowel-write-prompt__sound">' + escHtml(t(v.sound)) + '</span>' +
            '</div>' +
            '<div class="writing-practice">' +
                '<div class="writing-canvas-card writing-canvas-card--hebrew">' +
                    // Образец носителя — не текст для чтения, а подложка под
                    // штрих: от скринридера его прячем, вопрос и так назвал знак.
                    '<span class="vowel-write-form vowel-write-guide" aria-hidden="true">' + VOWEL_CARRIER + '</span>' +
                    '<canvas id="vowelWriteCanvas" class="writing-canvas" aria-label="' + t('Поле для знака огласовки') + '"></canvas>' +
                '</div>' +
                '<div class="md-button-row">' +
                    '<button type="button" class="menu-btn outlined" onclick="clearWritingCanvas(\'vowelWriteCanvas\')"><span class="msym">delete</span>' + t('Очистить') + '</button>' +
                    '<button type="button" class="menu-btn primary" onclick="completeVowelWritingPractice()"><span class="msym">check</span>' + t('Готово') + '</button>' +
                '</div>' +
            '</div>';
    }
    box.innerHTML = html;
    if (!s.revealed) initWritingCanvas('vowelWriteCanvas', { tapDot: true });
}

// Ответ засчитан уже на «Готово»: рисунок приложению не проверить, и это не
// проверка, а самопроверка. Ответ уходит в статистику тем же способом, что и
// у письма буквы, — чтобы в общем счёте он был виден.
function completeVowelWritingPractice() {
    const s = vowelWriteState;
    if (!s.total || s.revealed) return;
    stats.totalCorrect++;
    s.correct++;
    saveStats();
    s.revealed = true;
    showVowelWrite();
}

// Возврат к холсту: «Готово» жмут и не дорисовав знак. Как и у письма буквы,
// ответ снимается с обоих счётчиков, и тот же вопрос рисуется заново вместе с
// пустым холстом.
function backToVowelWriteCanvas() {
    const s = vowelWriteState;
    if (!s.total || !s.revealed) return;
    if (stats.totalCorrect > 0) stats.totalCorrect--;
    if (s.correct > 0) s.correct--;
    saveStats();
    // Как и у письма буквы, «Назад» — единственный признак того, что знак
    // нарисован неверно: рисунок не проверяется, его сверяют глазами.
    const v = s.words[s.index];
    if (v) noteDrillMistake(s, {
        word: t(v.name),
        correct: v.sign,
        your: t('вернулись переписать'),
        q: v
    });
    s.revealed = false;
    showVowelWrite();
}

function nextVowelWrite() {
    vowelWriteState.index++;
    vowelWriteState.revealed = false;
    showVowelWrite();
}

function answerOpt(sel, corr) {
    let container = document.getElementById('exerciseQuestion');
    let btns = container.querySelectorAll('.option-btn');
    let ok = sel === corr;
    btns.forEach(b => { b.disabled = true; if (b.textContent === corr) b.classList.add('correct'); if (b.textContent === sel && !ok) b.classList.add('wrong'); });
    if (ok) { stats.totalCorrect++; exerciseState.correct++; } else {
        stats.totalWrong++;
        let lesson = currentLesson;
        let q = exerciseState.questions[exerciseState.index];
        let subject = questionSubject(q, exerciseState.type);
        recordError(lesson, { word: subject, correct: corr, your: sel });
        noteDrillMistake(exerciseState, { word: subject, correct: corr, your: sel, q: q });
    }
    saveStats();
    exerciseState.index++;
    scheduleAdvance(showExercise, 1200);
}

// Одно и то же слово может стоять в банке дважды, поэтому берём первую ещё
// не выбранную фишку. Если такой нет — по фишке уже кликали, и повторный клик
// не должен класть слово в ответ второй раз: .picked гасит её только визуально.
function pickFreeChip(bankId, w) {
    let bank = document.getElementById(bankId);
    if (!bank) return null;
    let chips = bank.querySelectorAll('.chip');
    for (let i = 0; i < chips.length; i++) {
        if (chips[i].textContent === w && !chips[i].classList.contains('picked')) return chips[i];
    }
    return null;
}

function pickWord(w) {
    let chip = pickFreeChip('wordBank', w);
    if (!chip) return;
    chip.classList.add('picked');
    window._chosen.push(w);
    let area = document.getElementById('buildArea');
    let t = document.createElement('span');
    t.className = 'token';
    t.textContent = w;
    area.appendChild(t);
}

function clearChosen() {
    window._chosen = [];
    document.getElementById('buildArea').innerHTML = '';
    document.getElementById('wordBank').querySelectorAll('.chip').forEach(c => c.classList.remove('picked'));
}

function checkTranslationRu() {
    let chosen = window._chosen || [];
    let q = window._trans_ru;
    if (!q) return;
    let corr = q.correct_sequence;
    let ok = chosen.length === corr.length && chosen.every((w,i) => w === corr[i]);
    let container = document.getElementById('exerciseQuestion');
    if (ok) {
        stats.totalCorrect++;
        exerciseState.correct++;
        container.innerHTML = `
            <div class="feedback ok"><span>${t('Верно!')} <strong class="script">${corr.join(' ')}</strong></span></div>
            <div class="md-button-row exercise-next-actions"><button class="menu-btn primary" onclick="nextExercise()"><span class="msym">arrow_forward</span>${t('Далее')}</button></div>
        `;
    } else {
        stats.totalWrong++;
        let lesson = currentLesson;
        recordError(lesson, { word: q.russian, correct: corr.join(' '), your: chosen.join(' ') });
        noteDrillMistake(exerciseState, { word: q.russian, correct: corr.join(' '), your: chosen.join(' '), q: q });
        container.innerHTML = `
            <div class="feedback fail"><span>${t('Неверно. Правильный порядок: ')}<strong class="script">${corr.join(' ')}</strong></span></div>
            <div class="md-button-row exercise-next-actions"><button class="menu-btn primary" onclick="nextExercise()"><span class="msym">arrow_forward</span>${t('Далее')}</button></div>
        `;
    }
    saveStats();
    // Убираем setTimeout
}

