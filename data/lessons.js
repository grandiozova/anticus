// ============================================================
// ДАННЫЕ УРОКОВ 1–10 (ПОЛНЫЙ ВОКАБУЛЯР + ГРАММАТИКА + ПЕРЕВОДЫ)
// ============================================================

// ============================================================
// АЛФАВИТ ГРЕЧЕСКОГО КУРСА
// ============================================================
// Пул букв для упражнений уроков 1–2. В этих уроках нет лексики — весь их
// материал это алфавит, придыхания и ударения, а вопросов о буквах много.
// Писать их по одному в каждом уроке значило бы переписать алфавит трижды
// (название, произношение, порядок), поэтому буквы лежат здесь одним списком,
// а виды упражнений letter_* собирают из него и вопросы, и неверные варианты
// (см. EXERCISE_TYPES в js/exercises.js). Тот же список отдаёт курс:
// courseAlphabet() в js/course.js.
//
// Ничего не выдумано: буквы, прописные, названия и произношение перенесены из
// таблицы алфавита и словаря урока 1 (оба — ниже в этом файле), а знаки
// ударения сняты с самих названий.
//
// Поля:
//   letter — строчная буква, как в таблице. Σ дана без конечной сигмы: ς — это
//            про чтение слова, а не про начертание буквы, и спрашивать о ней
//            здесь нечем
//   upper  — прописная
//   name   — название из словаря урока 1: в таблице у первой буквы оно
//            записано без придыхания (άλφα), а в словаре с придыханием (ἄλφα)
//   sound  — произношение. Оговорки о том, как буква читается в окружении
//            («[н] (перед γ, κ, ξ, χ)»), сняты: вопрос о букве, а не о слове.
//            Оговорки о самом звуке («[э] (долгий)») оставлены — без них η и ε
//            не различить
const GREEK_ALPHABET = {
    // ru — русское прочтение названия, то же, что стоит первым словом в
    // переводе словаря урока 1 («альфа (Α α)»). Нужно упражнению письма: там
    // ученик рисует букву по названию, и греческое ἄλφα в начале курса ещё не
    // читается, поэтому под вопросом ставится русское имя (см.
    // letterWritePracticeState в js/exercises.js). В остальных видах название
    // остаётся греческим: letter_name спрашивает именно о нём.
    letters: [
        {letter:"α", upper:"Α", name:"ἄλφα", ru:"альфа", sound:"[а]"},
        {letter:"β", upper:"Β", name:"βῆτα", ru:"бета", sound:"[в]"},
        {letter:"γ", upper:"Γ", name:"γάμμα", ru:"гамма", sound:"[г]"},
        {letter:"δ", upper:"Δ", name:"δέλτα", ru:"дельта", sound:"[д]"},
        {letter:"ε", upper:"Ε", name:"ἒψιλόν", ru:"эпсилон", sound:"[э]"},
        {letter:"ζ", upper:"Ζ", name:"ζῆτα", ru:"дзета", sound:"[дз]"},
        {letter:"η", upper:"Η", name:"ῆτα", ru:"эта", sound:"[э] (долгий)"},
        {letter:"θ", upper:"Θ", name:"θῆτα", ru:"тета", sound:"[т] (придыхательный)"},
        {letter:"ι", upper:"Ι", name:"ἰῶτα", ru:"йота", sound:"[и]"},
        {letter:"κ", upper:"Κ", name:"κάππα", ru:"каппа", sound:"[к]"},
        {letter:"λ", upper:"Λ", name:"λάβδα", ru:"лямбда", sound:"[л]"},
        {letter:"μ", upper:"Μ", name:"μῦ", ru:"мю", sound:"[м]"},
        {letter:"ν", upper:"Ν", name:"νῦ", ru:"ню", sound:"[н]"},
        {letter:"ξ", upper:"Ξ", name:"ξεῖ", ru:"кси", sound:"[кс]"},
        {letter:"ο", upper:"Ο", name:"ὂμικρόν", ru:"омикрон", sound:"[о]"},
        {letter:"π", upper:"Π", name:"πεῖ", ru:"пи", sound:"[п]"},
        {letter:"ρ", upper:"Ρ", name:"ρῶ", ru:"ро", sound:"[р]"},
        {letter:"σ", upper:"Σ", name:"σίγμα", ru:"сигма", sound:"[с]"},
        {letter:"τ", upper:"Τ", name:"ταῦ", ru:"тау", sound:"[т]"},
        {letter:"υ", upper:"Υ", name:"ὖψιλόν", ru:"ипсилон", sound:"[ю] (как нем. ü)"},
        {letter:"φ", upper:"Φ", name:"φεῖ", ru:"фи", sound:"[ф]"},
        {letter:"χ", upper:"Χ", name:"χεῖ", ru:"хи", sound:"[х]"},
        {letter:"ψ", upper:"Ψ", name:"ψεῖ", ru:"пси", sound:"[пс]"},
        {letter:"ω", upper:"Ω", name:"ὦμέγα", ru:"омега", sound:"[о] (долгий)"}
    ],

    // Дифтонги — строка «Дифтонги:» из грамматики урока 1, целиком.
    diphthongs: [
        {diphthong:"αι", sound:"[ай]"},
        {diphthong:"ει", sound:"[эй]"},
        {diphthong:"οι", sound:"[ой]"},
        {diphthong:"υι", sound:"[юй]"},
        {diphthong:"αυ", sound:"[ав]"},
        {diphthong:"ευ", sound:"[эв]"},
        {diphthong:"ου", sound:"[у]"},
        {diphthong:"ηυ", sound:"[эв]"}
    ],
    // Придыхание: пособие показывает только сами знаки (᾿ и ῾) без примеров,
    // поэтому примеры даны на трёх гласных, у которых пара «густое/тонкое»
    // различима на слух. Три гласные взяты из четырёх, которые уже размечены
    // придыханием в данных курса (ἀ, ἁ, ἡ, ὡ); недостающие ἠ и ὠ выведены из
    // них как соседние кодовые точки и сверены по имени символа Unicode
    // («GREEK SMALL LETTER ETA WITH PSILI»), а не расставлены на глаз.
    // Гласная без пары сделала бы вопрос «густое или тонкое?» бессмысленным.
    breathings: [
        {sign:"ἁ", correct:"Густое (с [х])"},
        {sign:"ἀ", correct:"Тонкое (не произносится)"},
        {sign:"ἡ", correct:"Густое (с [х])"},
        {sign:"ἠ", correct:"Тонкое (не произносится)"},
        {sign:"ὡ", correct:"Густое (с [х])"},
        {sign:"ὠ", correct:"Тонкое (не произносится)"}
    ],
    // Знаки ударения сняты с названий букв: у ἄλφα это ἄ, у βῆτα — ῆ.
    // Придыхание при этом убрано (ἄ -> ά), а одинаковые знаки не повторяются:
    // ударение спрашивают о знаке, а не о букве, и четырёх ά в колоде не нужно.
    accents: [
        {sign:"ά", correct:"Острое"},
        {sign:"ῆ", correct:"Облеченное"},
        {sign:"έ", correct:"Острое"},
        {sign:"ὲ", correct:"Тупое"},
        {sign:"ῶ", correct:"Облеченное"},
        {sign:"ῦ", correct:"Облеченное"},
        {sign:"ῖ", correct:"Облеченное"},
        {sign:"ὸ", correct:"Тупое"},
        {sign:"ί", correct:"Острое"}
    ]
};

const LESSONS_DATA = {
    1: {
        title: "Алфавит и произношение",
        grammar: `<b>Греческий алфавит (24 буквы):</b><br>
        <table class="md-table--alphabet">
        <tr><th>Буква</th><th>Название</th><th>Произношение</th></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Αα</span></td><td>άλφα</td><td>[а]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ββ</span></td><td>βῆτα</td><td>[в]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Γγ</span></td><td>γάμμα</td><td>[г] (перед γ, κ, ξ, χ – [н])</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Δδ</span></td><td>δέλτα</td><td>[д]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Εε</span></td><td>ἒψιλόν</td><td>[э]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ζζ</span></td><td>ζῆτα</td><td>[дз]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ηη</span></td><td>ῆτα</td><td>[э] (долгий)</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Θθ</span></td><td>θῆτα</td><td>[т] (придыхательный)</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ιι</span></td><td>ἰῶτα</td><td>[и]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Κκ</span></td><td>κάππα</td><td>[к]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Λλ</span></td><td>λάβδα</td><td>[л]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Μμ</span></td><td>μῦ</td><td>[м]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Νν</span></td><td>νῦ</td><td>[н]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ξξ</span></td><td>ξεῖ</td><td>[кс]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Οο</span></td><td>ὂμικρόν</td><td>[о]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ππ</span></td><td>πεῖ</td><td>[п]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ρρ</span></td><td>ρῶ</td><td>[р]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Σσ</span></td><td>σίγμα</td><td>[с] (в конце слова ς)</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ττ</span></td><td>ταῦ</td><td>[т]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Υυ</span></td><td>ὖψιλόν</td><td>[ю] (как нем. ü)</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Φφ</span></td><td>φεῖ</td><td>[ф]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Χχ</span></td><td>χεῖ</td><td>[х]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ψψ</span></td><td>ψεῖ</td><td>[пс]</td></tr>
        <tr><td lang="el"><span class="alphabet-glyph">Ωω</span></td><td>ὦμέγα</td><td>[о] (долгий)</td></tr>
        </table><br>
        <b>Дифтонги:</b> αι [ай], ει [эй], οι [ой], υι [юй], αυ [ав], ευ [эв], ου [у], ηυ [эв].<br>
        <b>Придыхание:</b> ῾ (густое – [х]), ᾿ (тонкое – не произносится).<br>
        <b>Ударения:</b> ´ (острое), \` (тупое), ῀ (облеченное).`,
        vocabulary: [
            {greek:"ἄλφα", translation:"альфа (Α α)", type:"other"},
            {greek:"βῆτα", translation:"бета (Β β)", type:"other"},
            {greek:"γάμμα", translation:"гамма (Γ γ)", type:"other"},
            {greek:"δέλτα", translation:"дельта (Δ δ)", type:"other"},
            {greek:"ἒψιλόν", translation:"эпсилон (Ε ε)", type:"other"},
            {greek:"ζῆτα", translation:"дзета (Ζ ζ)", type:"other"},
            {greek:"ῆτα", translation:"эта (Η η)", type:"other"},
            {greek:"θῆτα", translation:"тета (Θ θ)", type:"other"},
            {greek:"ἰῶτα", translation:"йота (Ι ι)", type:"other"},
            {greek:"κάππα", translation:"каппа (Κ κ)", type:"other"},
            {greek:"λάβδα", translation:"лямбда (Λ λ)", type:"other"},
            {greek:"μῦ", translation:"мю (Μ μ)", type:"other"},
            {greek:"νῦ", translation:"ню (Ν ν)", type:"other"},
            {greek:"ξεῖ", translation:"кси (Ξ ξ)", type:"other"},
            {greek:"ὂμικρόν", translation:"омикрон (Ο ο)", type:"other"},
            {greek:"πεῖ", translation:"пи (Π π)", type:"other"},
            {greek:"ρῶ", translation:"ро (Ρ ρ)", type:"other"},
            {greek:"σίγμα", translation:"сигма (Σ σ/ς)", type:"other"},
            {greek:"ταῦ", translation:"тау (Τ τ)", type:"other"},
            {greek:"ὖψιλόν", translation:"ипсилон (Υ υ)", type:"other"},
            {greek:"φεῖ", translation:"фи (Φ φ)", type:"other"},
            {greek:"χεῖ", translation:"хи (Χ χ)", type:"other"},
            {greek:"ψεῖ", translation:"пси (Ψ ψ)", type:"other"},
            {greek:"ὦμέγα", translation:"омега (Ω ω)", type:"other"}
        ],
        // Урок 1 — алфавит и придыхание. Вопросы не переписаны, а собраны из
        // GREEK_ALPHABET (см. начало файла): и вопросы, и неверные варианты
        // берутся из него. letter_order спрашивает о всех буквах, кроме
        // последней, — ответом служит следующая по алфавиту, а у омеги её нет.
        exercises: {
            letter_name: GREEK_ALPHABET.letters,
            letter_write: GREEK_ALPHABET.letters,
            letter_from_name: GREEK_ALPHABET.letters,
            letter_sound: GREEK_ALPHABET.letters,
            letter_order: GREEK_ALPHABET.letters.slice(0, -1),
            letter_case_lower: GREEK_ALPHABET.letters,
            letter_case_upper: GREEK_ALPHABET.letters,
            diphthong_sound: GREEK_ALPHABET.diphthongs,
            breathing_type: GREEK_ALPHABET.breathings
        },
        translation: {}
    },
    2: {
        title: "Ударение и правила чтения",
        grammar: `<b>Правила ударения:</b><br>
        • Ударение может стоять только на одном из трёх последних слогов.<br>
        • Острое ударение (´) – повышение тона.<br>
        • Тупое ударение (\`) – понижение тона (в потоке речи).<br>
        • Облеченное ударение (῀) – повышение + понижение (только на долгих гласных).<br><br>
        <b>Специальные правила:</b><br>
        • У глаголов ударение ставится как можно дальше от конца слова.<br>
        • У существительных и прилагательных ударение сохраняется на том же слоге, что и в именительном падеже единственного числа.<br><br>
        <b>Энклитики и проклитики:</b><br>
        • Энклитики – безударные слова, примыкающие к предыдущему слову (например, μου, σου).<br>
        • Проклитики – безударные слова, примыкающие к последующему (например, ὁ, ἡ, οἱ, αἱ, εἰς, ἐκ, ἐν, οὐ).`,
        vocabulary: [
            {greek:"ὁ", translation:"определённый артикль м.р.", type:"article"},
            {greek:"ἡ", translation:"определённый артикль ж.р.", type:"article"},
            {greek:"τό", translation:"определённый артикль ср.р.", type:"article"},
            {greek:"οἱ", translation:"определённый артикль м.р. мн.ч.", type:"article"},
            {greek:"αἱ", translation:"определённый артикль ж.р. мн.ч.", type:"article"},
            {greek:"τά", translation:"определённый артикль ср.р. мн.ч.", type:"article"},
            {greek:"εἰς", translation:"в, во (куда; с Acc.)", type:"preposition"},
            {greek:"ἐκ", translation:"из (с Gen.)", type:"preposition"},
            {greek:"ἐν", translation:"в, внутри (где; с Dat.)", type:"preposition"},
            {greek:"οὐ", translation:"не (перед согласными)", type:"particle"},
            {greek:"οὐκ", translation:"не (перед гласными)", type:"particle"},
            {greek:"οὐχ", translation:"не (перед густым придыханием)", type:"particle"}
        ],
        // Урок 2 — ударение. Вопрос один: какой знак стоит на гласной; вариантов
        // всегда три — острое, тупое и облеченное (см. EXERCISE_TYPES).
        exercises: {
            accent_type: GREEK_ALPHABET.accents
        },
        translation: {}
    },
    3: {
        title: "Глаголы на -ω: настоящее время",
grammar: `<b>1. Грамматические категории глагола</b><br>
Греческий глагол имеет следующие категории:<br>
• <b>Tempus (время)</b> — Praesens (настоящее), Aoristus (аорист), Futurum (будущее) и др.<br>
• <b>Genus (залог)</b> — Activum (активный), Medium (медиальный), Passivum (пассивный)<br>
• <b>Modus (наклонение)</b> — Indicativus (изъявительное), Coniunctivus (сослагательное), Optativus (желательное), Imperativus (повелительное)<br>
• <b>Persona (лицо)</b> — 1-е, 2-е, 3-е<br>
• <b>Numerus (число)</b> — Singularis (единственное), Pluralis (множественное)<br><br>
<b>2. Praesens Indicativi Activi (настоящее время изъявительного наклонения активного залога)</b><br>
Спряжение глагола <b>λύω</b> (развязываю):<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>1-е</td><td>λύω</td><td>λύομεν</td><td>я развязываю</td><td>мы развязываем</td></tr>
  <tr><td>2-е</td><td>λύεις</td><td>λύετε</td><td>ты развязываешь</td><td>вы развязываете</td></tr>
  <tr><td>3-е</td><td>λύει</td><td>λύουσι(ν)</td><td>он развязывает</td><td>они развязывают</td></tr>
</table><br>

<b>3. Личные окончания и соединительные гласные</b><br>
Основа глагола: <b>λυ-</b><br>
Окончания:<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>1-е</td><td>-ω</td><td>-ομεν</td></tr>
  <tr><td>2-е</td><td>-εις</td><td>-ετε</td></tr>
  <tr><td>3-е</td><td>-ει</td><td>-ουσι(ν)</td></tr>
</table><br>
<b>Соединительные гласные (Thematische Vokale):</b><br>
• перед <b>μ</b> и <b>ν</b> — <b>ο</b> (λύομεν, λύουσι)<br>
• перед остальными — <b>ε</b> (λύεις, λύετε, λύει)<br>
• в 1-м лице ед. ч. окончание <b>-ω</b> содержит соединительный гласный <b>ο</b> + <b>-μι</b> (исторически).<br><br>

<b>4. Особенности 3-го лица множественного числа</b><br>
Окончание <b>-ουσι(ν)</b> имеет подвижное <b>ν</b> (ν ἐφελκυστικόν):<br>
• <b>-ουσι</b> — перед согласной<br>
• <b>-ουσιν</b> — перед гласной или в конце предложения<br>
• Пример: λύουσι τοὺς δούλους (перед согласной)<br>
• Пример: λύουσιν οἱ ἄνθρωποι (перед гласной)<br><br>

<b>5. Образец спряжения глаголов (Praesens Indicativi Activi)</b><br>
<table>
  <tr><th>Глагол</th><th>Основа</th><th>1-е л. ед.</th><th>2-е л. ед.</th><th>3-е л. ед.</th><th>Перевод</th></tr>
  <tr><td>βλέπω</td><td>βλεπ-</td><td>βλέπω</td><td>βλέπεις</td><td>βλέπει</td><td>я вижу / ты видишь / он видит</td></tr>
  <tr><td>γράφω</td><td>γραφ-</td><td>γράφω</td><td>γράφεις</td><td>γράφει</td><td>я пишу / ты пишешь / он пишет</td></tr>
  <tr><td>λέγω</td><td>λεγ-</td><td>λέγω</td><td>λέγεις</td><td>λέγει</td><td>я говорю / ты говоришь / он говорит</td></tr>
  <tr><td>ἔχω</td><td>ἐχ-</td><td>ἔχω</td><td>ἔχεις</td><td>ἔχει</td><td>я имею / ты имеешь / он имеет</td></tr>
  <tr><td>διδάσκω</td><td>διδασκ-</td><td>διδάσκω</td><td>διδάσκεις</td><td>διδάσκει</td><td>я учу / ты учишь / он учит</td></tr>
  <tr><td>λαμβάνω</td><td>λαμβαν-</td><td>λαμβάνω</td><td>λαμβάνεις</td><td>λαμβάνει</td><td>я беру / ты берёшь / он берёт</td></tr>
  <tr><td>γινώσκω</td><td>γινωσκ-</td><td>γινώσκω</td><td>γινώσκεις</td><td>γινώσκει</td><td>я знаю / ты знаешь / он знает</td></tr>
</table><br>

<b>6. Ударение в глаголах на -ω</b><br>
В глаголах действует <b>рецессивное ударение</b> (Закон трёх слогов):<br>
• ударение падает на третий слог от конца, если это возможно<br>
• если третий слог от конца краток, ударение переходит на второй слог<br>
• Пример: λύω, λύεις, λύει — ударение на корне<br>
• Пример: λαμβάνω, λαμβάνεις — ударение на корне<br><br>
<i>Исключения:</i> некоторые глаголы имеют постоянное ударение на окончании (например, εἰμί — быть).`,
        vocabulary: [
            {greek:"βλέπω", translation:"вижу", type:"verb", declension_forms:{singular:{"1":"βλέπω","2":"βλέπεις","3":"βλέπει"},plural:{"1":"βλέπομεν","2":"βλέπετε","3":"βλέπουσι(ν)"}}},
            {greek:"λαμβάνω", translation:"беру, получаю", type:"verb", declension_forms:{singular:{"1":"λαμβάνω","2":"λαμβάνεις","3":"λαμβάνει"},plural:{"1":"λαμβάνομεν","2":"λαμβάνετε","3":"λαμβάνουσι(ν)"}}},
            {greek:"γινώσκω", translation:"знаю", type:"verb", declension_forms:{singular:{"1":"γινώσκω","2":"γινώσκεις","3":"γινώσκει"},plural:{"1":"γινώσκομεν","2":"γινώσκετε","3":"γινώσκουσι(ν)"}}},
            {greek:"λέγω", translation:"говорю", type:"verb", declension_forms:{singular:{"1":"λέγω","2":"λέγεις","3":"λέγει"},plural:{"1":"λέγομεν","2":"λέγετε","3":"λέγουσι(ν)"}}},
            {greek:"γράφω", translation:"пишу", type:"verb", declension_forms:{singular:{"1":"γράφω","2":"γράφεις","3":"γράφει"},plural:{"1":"γράφομεν","2":"γράφετε","3":"γράφουσι(ν)"}}},
            {greek:"λύω", translation:"развязываю, освобождаю", type:"verb", declension_forms:{singular:{"1":"λύω","2":"λύεις","3":"λύει"},plural:{"1":"λύομεν","2":"λύετε","3":"λύουσι(ν)"}}},
            {greek:"διδάσκω", translation:"учу", type:"verb", declension_forms:{singular:{"1":"διδάσκω","2":"διδάσκεις","3":"διδάσκει"},plural:{"1":"διδάσκομεν","2":"διδάσκετε","3":"διδάσκουσι(ν)"}}},
            {greek:"ἔχω", translation:"имею", type:"verb", declension_forms:{singular:{"1":"ἔχω","2":"ἔχεις","3":"ἔχει"},plural:{"1":"ἔχομεν","2":"ἔχετε","3":"ἔχουσι(ν)"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύω", translation:"развязываю", correct:"λύω", distractors:["λύεις","λύει","λύομεν"]},
                {case:"2sg", word:"λύω", translation:"развязываю", correct:"λύεις", distractors:["λύω","λύει","λύετε"]},
                {case:"3sg", word:"λύω", translation:"развязываю", correct:"λύει", distractors:["λύω","λύεις","λύουσι"]},
                {case:"1pl", word:"λύω", translation:"развязываю", correct:"λύομεν", distractors:["λύω","λύετε","λύουσι"]},
                {case:"2pl", word:"λύω", translation:"развязываю", correct:"λύετε", distractors:["λύομεν","λύει","λύουσι"]},
                {case:"3pl", word:"λύω", translation:"развязываю", correct:"λύουσι(ν)", distractors:["λύομεν","λύετε","λύει"]},
                {case:"1sg", word:"γράφω", translation:"пишу", correct:"γράφω", distractors:["γράφεις","γράφει","γράφομεν"]},
                {case:"2sg", word:"βλέπω", translation:"вижу", correct:"βλέπεις", distractors:["βλέπω","βλέπει","βλέπετε"]},
                {case:"3sg", word:"γινώσκω", translation:"знаю", correct:"γινώσκει", distractors:["γινώσκω","γινώσκεις","γινώσκουσι"]},
                {case:"1pl", word:"λέγω", translation:"говорю", correct:"λέγομεν", distractors:["λέγω","λέγετε","λέγουσι"]},
                {case:"2pl", word:"ἔχω", translation:"имею", correct:"ἔχετε", distractors:["ἔχομεν","ἔχεις","ἔχουσι"]},
                {case:"3pl", word:"λαμβάνω", translation:"беру", correct:"λαμβάνουσι(ν)", distractors:["λαμβάνομεν","λαμβάνετε","λαμβάνει"]},
                {case:"1sg", word:"διδάσκω", translation:"учу", correct:"διδάσκω", distractors:["διδάσκεις","διδάσκει","διδάσκομεν"]},
                {case:"3sg", word:"ἔχω", translation:"имею", correct:"ἔχει", distractors:["ἔχω","ἔχεις","ἔχουσι"]}
            ],
            translate_greek_to_russian: [
                {greek:"βλέπω", keywords:["вижу"]},
                {greek:"γινώσκεις", keywords:["знаешь"]},
                {greek:"γράφει", keywords:["пишет"]},
                {greek:"διδάσκομεν", keywords:["учим"]},
                {greek:"ἔχετε", keywords:["имеете"]},
                {greek:"λαμβάνουσι", keywords:["берут"]},
                {greek:"λέγομεν", keywords:["говорим"]},
                {greek:"λύει", keywords:["развязывает"]}
            ],
            translate_russian_to_greek: [
                {russian:"я вижу", correct_sequence:["βλέπω"], all_words:["βλέπω","γινώσκω","γράφω"]},
                {russian:"ты знаешь", correct_sequence:["γινώσκεις"], all_words:["γινώσκεις","γράφεις","βλέπεις"]},
                {russian:"он пишет", correct_sequence:["γράφει"], all_words:["γράφει","λέγει","λύει"]},
                {russian:"мы говорим", correct_sequence:["λέγομεν"], all_words:["λέγομεν","λέγετε","λέγουσι"]},
                {russian:"мы имеем", correct_sequence:["ἔχομεν"], all_words:["ἔχομεν","ἔχετε","ἔχουσι"]},
                {russian:"вы берёте", correct_sequence:["λαμβάνετε"], all_words:["λαμβάνετε","λαμβάνομεν","λαμβάνουσι"]},
                {russian:"они учат", correct_sequence:["διδάσκουσι"], all_words:["διδάσκουσι","διδάσκομεν","διδάσκετε"]},
                {russian:"я развязываю", correct_sequence:["λύω"], all_words:["λύω","λύει","λύομεν"]}
            ],
            case_number: [
                {form:"λύεις", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"λύομεν", correct:"1-е л. мн.ч.", distractors:["1-е л. ед.ч.","2-е л. мн.ч.","3-е л. мн.ч."]},
                {form:"γινώσκω", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἔχεις", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"βλέπει", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"λαμβάνομεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"γράφετε", correct:"2-е л. мн.ч.", distractors:["2-е л. ед.ч.","1-е л. мн.ч.","3-е л. мн.ч."]},
                {form:"διδάσκουσι(ν)", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]}
            ]
        },
        translation: {
            ru_to_el: [
                {source:"мы знаем", correct:["γινώσκομεν"]},
                {source:"мы видим", correct:["βλέπομεν"]},
                {source:"они развязывают", correct:["λύουσι(ν)"]},
                {source:"он развязывает", correct:["λύει"]},
                {source:"вы имеете", correct:["ἔχετε"]},
                {source:"ты знаешь", correct:["γινώσκεις"]},
                {source:"я беру", correct:["λαμβάνω"]},
                {source:"они говорят", correct:["λέγουσι(ν)"]},
                {source:"он имеет", correct:["ἔχει"]},
                {source:"мы пишем", correct:["γράφομεν"]},
                {source:"они видят", correct:["βλέπουσι(ν)"]}
            ],
            el_to_ru: [
                {source:"βλέπεις", correct:["видишь"]},
                {source:"γινώσκετε", correct:["знаете"]},
                {source:"λέγετε", correct:["говорите"]},
                {source:"γράφει", correct:["пишет"]},
                {source:"βλέπομεν", correct:["видим"]},
                {source:"λαμβάνουσι(ν)", correct:["берут"]},
                {source:"βλέπει", correct:["видит"]},
                {source:"ἔχει", correct:["имеет"]}
            ]
        }
    },
    4: {
        title: "Существительные второго склонения M. N.",
grammar: `<b>1. Общие сведения о склонении</b><br>
В греческом языке три склонения. Ко <b>2-му склонению</b> относятся существительные:<br>
• <b>мужского рода</b> с окончанием <b>-ος</b> в Nom. Sing.<br>
• <b>среднего рода</b> с окончанием <b>-ον</b> в Nom. Sing.<br>
• <b>женского рода</b> с окончанием <b>-ος</b> (встречаются реже, например, νῆσος — остров)<br><br>

<b>2. Определённый артикль для 2-го склонения</b><br>
<table>
  <tr><th>Падеж</th><th>Муж. ед.</th><th>Муж. мн.</th><th>Ср. ед.</th><th>Ср. мн.</th></tr>
  <tr><td>Nom.</td><td>ὁ</td><td>οἱ</td><td>τό</td><td>τά</td></tr>
  <tr><td>Gen.</td><td>τοῦ</td><td>τῶν</td><td>τοῦ</td><td>τῶν</td></tr>
  <tr><td>Dat.</td><td>τῷ</td><td>τοῖς</td><td>τῷ</td><td>τοῖς</td></tr>
  <tr><td>Acc.</td><td>τόν</td><td>τούς</td><td>τό</td><td>τά</td></tr>
</table><br>

<b>3. Склонение ἄνθρωπος (человек) — мужской род</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>Nom.</td><td>ἄνθρωπος</td><td>ἄνθρωποι</td><td>человек</td><td>люди</td></tr>
  <tr><td>Gen.</td><td>ἀνθρώπου</td><td>ἀνθρώπων</td><td>человека</td><td>людей</td></tr>
  <tr><td>Dat.</td><td>ἀνθρώπῳ</td><td>ἀνθρώποις</td><td>человеку</td><td>людям</td></tr>
  <tr><td>Acc.</td><td>ἄνθρωπον</td><td>ἀνθρώπους</td><td>человека</td><td>людей</td></tr>
  <tr><td>Voc.</td><td>ἄνθρωπε</td><td>ἄνθρωποι</td><td>о человек!</td><td>о люди!</td></tr>
</table>
<i>Важно:</i> ударение остаётся на том слоге, где оно стоит в Nom. Sing. (<b>ἄνθρωπος</b> — третий слог от конца), пока это позволяют общие правила. Если последний гласный долгий, на третьем слоге от конца ударение стоять не может: оно переходит на второй и может быть только острым — <b>ἀνθρώπου</b>, <b>ἀνθρώπῳ</b>, <b>ἀνθρώπων</b>, <b>ἀνθρώποις</b>, <b>ἀνθρώπους</b>. Если последний гласный краткий, ударение остаётся на месте: <b>ἄνθρωπον</b>, <b>ἄνθρωπε</b>, <b>ἄνθρωποι</b> (конечное -οι для ударения считается кратким).<br><br>

<b>4. Склонение λόγος (слово) — мужской род</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>λόγος</td><td>λόγοι</td></tr>
  <tr><td>Gen.</td><td>λόγου</td><td>λόγων</td></tr>
  <tr><td>Dat.</td><td>λόγῳ</td><td>λόγοις</td></tr>
  <tr><td>Acc.</td><td>λόγον</td><td>λόγους</td></tr>
  <tr><td>Voc.</td><td>λόγε</td><td>λόγοι</td></tr>
</table><br>

<b>5. Склонение δῶρον (дар) — средний род</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>Nom./Acc./Voc.</td><td>δῶρον</td><td>δῶρα</td><td>дар</td><td>дары</td></tr>
  <tr><td>Gen.</td><td>δώρου</td><td>δώρων</td><td>дара</td><td>даров</td></tr>
  <tr><td>Dat.</td><td>δώρῳ</td><td>δώροις</td><td>дару</td><td>дарам</td></tr>
</table>
<i>Особенность среднего рода:</i> Nom., Acc., Voc. совпадают в обоих числах.<br><br>

<b>6. Склонение ἱερόν (храм) — средний род</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom./Acc./Voc.</td><td>ἱερόν</td><td>ἱερά</td></tr>
  <tr><td>Gen.</td><td>ἱεροῦ</td><td>ἱερῶν</td></tr>
  <tr><td>Dat.</td><td>ἱερῷ</td><td>ἱεροῖς</td></tr>
</table><br>

<b>7. Падежные окончания 2-го склонения (сводная таблица)</b><br>
<table>
  <tr><th>Падеж</th><th>Муж. ед.</th><th>Муж. мн.</th><th>Ср. ед.</th><th>Ср. мн.</th></tr>
  <tr><td>Nom.</td><td>-ος</td><td>-οι</td><td>-ον</td><td>-α</td></tr>
  <tr><td>Gen.</td><td>-ου</td><td>-ων</td><td>-ου</td><td>-ων</td></tr>
  <tr><td>Dat.</td><td>-ῳ</td><td>-οις</td><td>-ῳ</td><td>-οις</td></tr>
  <tr><td>Acc.</td><td>-ον</td><td>-ους</td><td>-ον</td><td>-α</td></tr>
  <tr><td>Voc.</td><td>-ε</td><td>-οι</td><td>-ον</td><td>-α</td></tr>
</table>
<i>Запомните:</i> окончания среднего рода всегда совпадают в Nom., Acc., Voc.!

<b>8. Функции падежей</b><br>
• <b>Nominativus (Им.)</b> — подлежащее (кто? что?)<br>
• <b>Genitivus (Род.)</b> — принадлежность, определение (кого? чего?)<br>
• <b>Dativus (Дат.)</b> — косвенное дополнение, средство, место (кому? чему?)<br>
• <b>Accusativus (Вин.)</b> — прямое дополнение, направление (кого? что?)<br>
• <b>Vocativus (Зват.)</b> — обращение (о ком? о чём?)<br><br>

<b>9. Ударение в существительных 2-го склонения</b><br>
• В словах типа <b>ἄνθρωπος</b> ударение стоит на третьем слоге от конца, а при долгом последнем гласном переходит на второй: <b>ἀνθρώπου</b><br>
• В словах типа <b>λόγος</b> ударение остаётся на том же слоге: <b>λόγου</b><br>
• В Voc. Sing. у мужского рода ударение на том же слоге, что и в Nom.: <b>ἄνθρωπε</b>.`,
        vocabulary: [
            {greek:"ἄνθρωπος", article:"ὁ", translation:"человек", type:"noun", declension_forms:{singular:{nom:"ἄνθρωπος",gen:"ἀνθρώπου",dat:"ἀνθρώπῳ",acc:"ἄνθρωπον",voc:"ἄνθρωπε"},plural:{nom:"ἄνθρωποι",gen:"ἀνθρώπων",dat:"ἀνθρώποις",acc:"ἀνθρώπους",voc:"ἄνθρωποι"}}},
            {greek:"λόγος", article:"ὁ", translation:"слово", type:"noun", declension_forms:{singular:{nom:"λόγος",gen:"λόγου",dat:"λόγῳ",acc:"λόγον",voc:"λόγε"},plural:{nom:"λόγοι",gen:"λόγων",dat:"λόγοις",acc:"λόγους",voc:"λόγοι"}}},
            {greek:"δῶρον", article:"τό", translation:"дар", type:"noun", declension_forms:{singular:{nom:"δῶρον",gen:"δώρου",dat:"δώρῳ",acc:"δῶρον",voc:"δῶρον"},plural:{nom:"δῶρα",gen:"δώρων",dat:"δώροις",acc:"δῶρα",voc:"δῶρα"}}},
            {greek:"νόμος", article:"ὁ", translation:"закон", type:"noun", declension_forms:{singular:{nom:"νόμος",gen:"νόμου",dat:"νόμῳ",acc:"νόμον",voc:"νόμε"},plural:{nom:"νόμοι",gen:"νόμων",dat:"νόμοις",acc:"νόμους",voc:"νόμοι"}}},
            {greek:"οἶκος", article:"ὁ", translation:"дом", type:"noun", declension_forms:{singular:{nom:"οἶκος",gen:"οἴκου",dat:"οἴκῳ",acc:"οἶκον",voc:"οἶκε"},plural:{nom:"οἶκοι",gen:"οἴκων",dat:"οἴκοις",acc:"οἴκους",voc:"οἶκοι"}}},
            {greek:"δοῦλος", article:"ὁ", translation:"раб, слуга", type:"noun", declension_forms:{singular:{nom:"δοῦλος",gen:"δούλου",dat:"δούλῳ",acc:"δοῦλον",voc:"δοῦλε"},plural:{nom:"δοῦλοι",gen:"δούλων",dat:"δούλοις",acc:"δούλους",voc:"δοῦλοι"}}},
            {greek:"ἀδελφός", article:"ὁ", translation:"брат", type:"noun", declension_forms:{singular:{nom:"ἀδελφός",gen:"ἀδελφοῦ",dat:"ἀδελφῷ",acc:"ἀδελφόν",voc:"ἀδελφέ"},plural:{nom:"ἀδελφοί",gen:"ἀδελφῶν",dat:"ἀδελφοῖς",acc:"ἀδελφούς",voc:"ἀδελφοί"}}},
            {greek:"ἱερόν", article:"τό", translation:"храм", type:"noun", declension_forms:{singular:{nom:"ἱερόν",gen:"ἱεροῦ",dat:"ἱερῷ",acc:"ἱερόν",voc:"ἱερόν"},plural:{nom:"ἱερά",gen:"ἱερῶν",dat:"ἱεροῖς",acc:"ἱερά",voc:"ἱερά"}}},
            {greek:"θάνατος", article:"ὁ", translation:"смерть", type:"noun", declension_forms:{singular:{nom:"θάνατος",gen:"θανάτου",dat:"θανάτῳ",acc:"θάνατον",voc:"θάνατε"},plural:{nom:"θάνατοι",gen:"θανάτων",dat:"θανάτοις",acc:"θανάτους",voc:"θάνατοι"}}},
            {greek:"υἱός", article:"ὁ", translation:"сын", type:"noun", declension_forms:{singular:{nom:"υἱός",gen:"υἱοῦ",dat:"υἱῷ",acc:"υἱόν",voc:"υἱέ"},plural:{nom:"υἱοί",gen:"υἱῶν",dat:"υἱοῖς",acc:"υἱούς",voc:"υἱοί"}}},
            {greek:"ἀπόστολος", article:"ὁ", translation:"апостол", type:"noun", declension_forms:{singular:{nom:"ἀπόστολος",gen:"ἀποστόλου",dat:"ἀποστόλῳ",acc:"ἀπόστολον",voc:"ἀπόστολε"},plural:{nom:"ἀπόστολοι",gen:"ἀποστόλων",dat:"ἀποστόλοις",acc:"ἀποστόλους",voc:"ἀπόστολοι"}}},
            {greek:"Χριστός", article:"ὁ", translation:"Христос", type:"noun", declension_forms:{singular:{nom:"Χριστός",gen:"Χριστοῦ",dat:"Χριστῷ",acc:"Χριστόν",voc:"Χριστέ"},plural:{nom:"Χριστοί",gen:"Χριστῶν",dat:"Χριστοῖς",acc:"Χριστούς",voc:"Χριστοί"}}},
            {greek:"Ἰησοῦς", article:"ὁ", translation:"Иисус", type:"noun", declension_forms:{singular:{nom:"Ἰησοῦς",gen:"Ἰησοῦ",dat:"Ἰησοῦ",acc:"Ἰησοῦν",voc:"Ἰησοῦ"}}},
            {greek:"καί", translation:"и, а также", type:"conjunction"}
        ],
        exercises: {
            declension_fill: [
                {case:"gen_sg", word:"ἄνθρωπος", translation:"человек", correct:"ἀνθρώπου", distractors:["ἀνθρώπων","ἀνθρώπῳ","ἄνθρωπον"]},
                {case:"dat_sg", word:"ἄνθρωπος", translation:"человек", correct:"ἀνθρώπῳ", distractors:["ἀνθρώπου","ἀνθρώποις","ἄνθρωπον"]},
                {case:"acc_sg", word:"ἄνθρωπος", translation:"человек", correct:"ἄνθρωπον", distractors:["ἀνθρώπου","ἀνθρώπων","ἀνθρώποις"]},
                {case:"nom_pl", word:"ἄνθρωπος", translation:"человек", correct:"ἄνθρωποι", distractors:["ἀνθρώπους","ἀνθρώπων","ἀνθρώποις"]},
                {case:"gen_pl", word:"ἄνθρωπος", translation:"человек", correct:"ἀνθρώπων", distractors:["ἀνθρώπου","ἀνθρώποις","ἄνθρωποι"]},
                {case:"dat_pl", word:"ἄνθρωπος", translation:"человек", correct:"ἀνθρώποις", distractors:["ἀνθρώπων","ἀνθρώπῳ","ἀνθρώπους"]},
                {case:"acc_pl", word:"ἄνθρωπος", translation:"человек", correct:"ἀνθρώπους", distractors:["ἀνθρώποις","ἀνθρώπων","ἄνθρωποι"]},
                        // Склонения для других существительных
        {case:"dat_sg", word:"λόγος", translation:"слово", correct:"λόγῳ", distractors:["λόγον","λόγου","λόγοις"]},
        {case:"gen_sg", word:"νόμος", translation:"закон", correct:"νόμου", distractors:["νόμῳ","νόμον","νόμοι"]},
        {case:"acc_pl", word:"οἶκος", translation:"дом", correct:"οἴκους", distractors:["οἴκοις","οἴκων","οἶκοι"]},
        {case:"nom_pl", word:"δοῦλος", translation:"раб", correct:"δοῦλοι", distractors:["δούλων","δούλοις","δούλους"]},
        {case:"dat_pl", word:"ἀδελφός", translation:"брат", correct:"ἀδελφοῖς", distractors:["ἀδελφῶν","ἀδελφούς","ἀδελφοί"]},
        {case:"gen_pl", word:"ἱερόν", translation:"храм", correct:"ἱερῶν", distractors:["ἱεροῖς","ἱερά","ἱερόν"]},
        {case:"acc_sg", word:"θάνατος", translation:"смерть", correct:"θάνατον", distractors:["θανάτῳ","θανάτου","θάνατε"]},
        {case:"voc_sg", word:"υἱός", translation:"сын", correct:"υἱέ", distractors:["υἱός","υἱοῦ","υἱόν"]},
        {case:"dat_sg", word:"ἀπόστολος", translation:"апостол", correct:"ἀποστόλῳ", distractors:["ἀπόστολον","ἀποστόλου","ἀποστόλοις"]},
        {case:"gen_sg", word:"Χριστός", translation:"Христос", correct:"Χριστοῦ", distractors:["Χριστόν","Χριστῷ","Χριστέ"]}
                
            ],
            translate_greek_to_russian: [
                {greek:"ὁ λόγος", keywords:["слово"]},
                {greek:"τοῦ ἀνθρώπου", keywords:["человека"]},
                {greek:"τῷ υἱῷ", keywords:["сыну"]},
                {greek:"τὸν οἶκον", keywords:["дом"]},
                {greek:"οἱ ἀπόστολοι", keywords:["апостолы"]},
                {greek:"τῶν δούλων", keywords:["рабов"]},
                {greek:"τοῖς τέκνοις", keywords:["детям"]},
                {greek:"ὁ νόμος", keywords:["закон"]},
        {greek:"τοῦ δούλου", keywords:["раба"]},
        {greek:"τὸν ἀδελφόν", keywords:["брата"]},
        {greek:"τὸ ἱερόν", keywords:["храм"]},
        {greek:"τῷ θανάτῳ", keywords:["смерти"]},
        {greek:"οἱ υἱοί", keywords:["сыны"]},
        {greek:"τῶν ἀποστόλων", keywords:["апостолов"]},
        {greek:"τῷ Χριστῷ", keywords:["Христу"]},
        {greek:"ὁ Ἰησοῦς", keywords:["иисус"]},
        {greek:"τοῦ Ἰησοῦ", keywords:["иисуса"]},
        {greek:"τὸν Ἰησοῦν", keywords:["иисуса"]},
        {greek:"ὁ ἀδελφὸς καὶ ὁ υἱός", keywords:["брат","сын"]},
        {greek:"τὰ δῶρα καὶ τὰ ἱερά", keywords:["дары","храмы"]}
            ],
            translate_russian_to_greek: [
                {russian:"слово", correct_sequence:["λόγος"], all_words:["λόγος","οἶκος","υἱός"]},
                {russian:"человека (Gen.)", correct_sequence:["ἀνθρώπου"], all_words:["ἀνθρώπου","ἄνθρωπον","ἀνθρώπῳ"]},
                {russian:"сыну", correct_sequence:["υἱῷ"], all_words:["υἱῷ","υἱόν","υἱοῦ"]},
                {russian:"закон", correct_sequence:["νόμος"], all_words:["νόμος","λόγος","οἶκος","υἱός"]},
        {russian:"раба (Gen.)", correct_sequence:["δούλου"], all_words:["δούλου","δοῦλον","δούλῳ","δοῦλοι"]},
        {russian:"брата (Acc.)", correct_sequence:["ἀδελφόν"], all_words:["ἀδελφόν","ἀδελφός","ἀδελφοῦ","ἀδελφῷ"]},
        {russian:"храм (Nom.)", correct_sequence:["ἱερόν"], all_words:["ἱερόν","ἱεροῦ","ἱερῷ","ἱερά"]},
        {russian:"смерти (Dat.)", correct_sequence:["θανάτῳ"], all_words:["θανάτῳ","θάνατος","θανάτου","θάνατον"]},
        {russian:"сыны (Nom.)", correct_sequence:["υἱοί"], all_words:["υἱοί","υἱῶν","υἱοῖς","υἱούς"]},
        {russian:"апостолов (Gen.)", correct_sequence:["ἀποστόλων"], all_words:["ἀποστόλων","ἀπόστολοι","ἀποστόλοις","ἀποστόλους"]},
        {russian:"Христу (Dat.)", correct_sequence:["Χριστῷ"], all_words:["Χριστῷ","Χριστός","Χριστοῦ","Χριστόν"]},
        {russian:"Иисус (Nom.)", correct_sequence:["Ἰησοῦς"], all_words:["Ἰησοῦς","Ἰησοῦν","Ἰησοῦ","Χριστός"]},
        {russian:"Иисуса (Acc.)", correct_sequence:["Ἰησοῦν"], all_words:["Ἰησοῦν","Ἰησοῦς","Ἰησοῦ","Χριστόν"]},
        {russian:"апостол и раб", correct_sequence:["ὁ","ἀπόστολος","καὶ","ὁ","δοῦλος"], all_words:["ὁ","ἀπόστολος","καὶ","ὁ","δοῦλος","τόν","υἱός"]},
        {russian:"дар и закон", correct_sequence:["τὸ","δῶρον","καὶ","ὁ","νόμος"], all_words:["τὸ","δῶρον","καὶ","ὁ","νόμος","τόν","οἶκον"]}
            ],
            case_number: [
                {form:"ἀνθρώπων", correct:"Gen. Pl.", distractors:["Gen. Sg.","Dat. Pl.","Acc. Pl."]},
                {form:"δῶρα", correct:"Nom./Acc. Pl.", distractors:["Nom. Sg.","Gen. Pl.","Dat. Pl."]},
                {form:"λόγοις", correct:"Dat. Pl.", distractors:["Nom. Pl.","Gen. Pl.","Acc. Pl."]},
                {form:"ἱερά", correct:"Nom./Acc. Pl.", distractors:["Gen. Pl.","Dat. Pl.","Nom. Sg."]},
                {form:"υἱοῦ", correct:"Gen. Sg.", distractors:["Dat. Sg.","Acc. Sg.","Nom. Sg."]},
                {form:"δούλῳ", correct:"Dat. Sg.", distractors:["Gen. Sg.","Acc. Sg.","Dat. Pl."]},
                {form:"ἀποστόλους", correct:"Acc. Pl.", distractors:["Nom. Pl.","Gen. Pl.","Acc. Sg."]},
                {form:"Ἰησοῦν", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]},
                {form:"ἀδελφέ", correct:"Voc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Acc. Sg."]}
            ]
        },
translation: {
    ru_to_el: [
        { source: "Христос говорит слово закона людям.", correct: ["ὁ","Χριστὸς","λέγει","τὸν","λόγον","τοῦ","νόμου","τοῖς","ἀνθρώποις"] },
        { source: "Братья освобождают рабов.", correct: ["οἱ","ἀδελφοὶ","λύουσι","τοὺς","δούλους"] },
        { source: "Братья говорят слово рабу.", correct: ["οἱ","ἀδελφοὶ","λέγουσι","τὸν","λόγον","τῷ","δούλῳ"] },
        { source: "Мы видим дары рабов.", correct: ["βλέπομεν","τὰ","δῶρα","τῶν","δούλων"] },
        { source: "Мы пишем братьям слова закона.", correct: ["γράφομεν","τοῖς","ἀδελφοῖς","τοὺς","λόγους","τοῦ","νόμου"] },
        { source: "Сын видит храмы и дома.", correct: ["ὁ","υἱὸς","βλέπει","τὰ","ἱερὰ","καὶ","τοὺς","οἴκους"] },
        { source: "Я освобождаю слуг и говорю слова сынам и братьям.", correct: ["λύω","τοὺς","δούλους","καὶ","λέγω","λόγους","τοῖς","υἱοῖς","καὶ","τοῖς","ἀδελφοῖς"] },
        { source: "Человек видит смерть.", correct: ["ὁ","ἄνθρωπος","βλέπει","τὸν","θάνατον"] },
        { source: "Сыны берут дары.", correct: ["οἱ","υἱοὶ","λαμβάνουσι","τὰ","δῶρα"] },
        { source: "Вы знаете смерть.", correct: ["γινώσκετε","τὸν","θάνατον"] },
        { source: "Люди видят дома смерти.", correct: ["οἱ","ἄνθρωποι","βλέπουσι","τοὺς","οἴκους","τοῦ","θανάτου"] },
        { source: "Ты берёшь дар апостола.", correct: ["λαμβάνεις","τὸ","δῶρον","τοῦ","ἀποστόλου"] },
        { source: "Они знают законы и учат слуг.", correct: ["γινώσκουσι","τοὺς","νόμους","καὶ","διδάσκουσι","τοὺς","δούλους"] },
        { source: "О человек, ты знаешь закон.", correct: ["ὦ","ἄνθρωπε","γινώσκεις","τὸν","νόμον"] }
    ],
    el_to_ru: [
        { source: "ὁ Χριστὸς λέγει τὸν λόγον τοῦ νόμου τοῖς ἀνθρώποις.", correct: "Христос говорит слово закона людям." },
        { source: "οἱ ἀδελφοὶ λύουσι τοὺς δούλους.", correct: "Братья освобождают рабов." },
        { source: "οἱ ἀδελφοὶ λέγουσι τὸν λόγον τῷ δούλῳ.", correct: "Братья говорят слово рабу." },
        { source: "βλέπομεν τὰ δῶρα τῶν δούλων.", correct: "Мы видим дары рабов." },
        { source: "γράφομεν τοῖς ἀδελφοῖς τοὺς λόγους τοῦ νόμου.", correct: "Мы пишем братьям слова закона." },
        { source: "ὁ υἱὸς βλέπει τὰ ἱερὰ καὶ τοὺς οἴκους.", correct: "Сын видит храмы и дома." },
        { source: "λύω τοὺς δούλους καὶ λέγω λόγους τοῖς υἱοῖς καὶ τοῖς ἀδελφοῖς.", correct: "Я освобождаю слуг и говорю слова сынам и братьям." },
        { source: "ὁ ἄνθρωπος βλέπει τὸν θάνατον.", correct: "Человек видит смерть." },
        { source: "οἱ υἱοὶ λαμβάνουσι τὰ δῶρα.", correct: "Сыны берут дары." },
        { source: "γινώσκετε τὸν θάνατον.", correct: "Вы знаете смерть." },
        { source: "οἱ ἄνθρωποι βλέπουσι τοὺς οἴκους τοῦ θανάτου.", correct: "Люди видят дома смерти." },
        { source: "λαμβάνεις τὸ δῶρον τοῦ ἀποστόλου.", correct: "Ты берёшь дар апостола." },
        { source: "γινώσκουσι τοὺς νόμους καὶ διδάσκουσι τοὺς δούλους.", correct: "Они знают законы и учат слуг." },
        { source: "ὦ ἄνθρωπε, γινώσκεις τὸν νόμον.", correct: "О человек, ты знаешь закон." }
    ]
    }
},
    5: {
        title: "Существительные первого склонения F.",
grammar: `<b>1. Общие сведения о первом склонении</b><br>
К 1-му склонению относятся имена существительные преимущественно женского рода с основой на <b>α</b> (или <b>η</b>) и окончаниями в Nom. Sing.:
<ul>
  <li><b>-α</b> (после ε, ι, ρ — чистая альфа) — например, ἀλήθεια, βασιλεία</li>
  <li><b>-η</b> (после других согласных — нечистая альфа) — например, δόξα, γραφή</li>
  <li><b>-η</b> (с долгим окончанием) — например, ζωή, ψυχή</li>
</ul>
<i>Примечание:</i> в Gen. и Dat. Sing. у нечистой альфы (после согласных, кроме ε, ι, ρ) происходит переход <b>α → η</b>.<br><br>

<b>2. Склонение ὥρα (час) — пример с чистой альфой (после ρ)</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>Nom.</td><td>ὥρα</td><td>ὥραι</td><td>час</td><td>часы</td></tr>
  <tr><td>Gen.</td><td>ὥρας</td><td>ὡρῶν</td><td>часа</td><td>часов</td></tr>
  <tr><td>Dat.</td><td>ὥρᾳ</td><td>ὥραις</td><td>часу</td><td>часам</td></tr>
  <tr><td>Acc.</td><td>ὥραν</td><td>ὥρας</td><td>час</td><td>часы</td></tr>
  <tr><td>Voc.</td><td>ὥρα</td><td>ὥραι</td><td>о час!</td><td>о часы!</td></tr>
</table>
<i>Здесь α сохраняется, т.к. стоит после ρ (чистая альфа).</i><br><br>

<b>3. Склонение ἀλήθεια (истина) — чистая альфа (после ε, ι, ρ)</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>ἀλήθεια</td><td>ἀλήθειαι</td></tr>
  <tr><td>Gen.</td><td>ἀληθείας</td><td>ἀληθειῶν</td></tr>
  <tr><td>Dat.</td><td>ἀληθείᾳ</td><td>ἀληθείαις</td></tr>
  <tr><td>Acc.</td><td>ἀλήθειαν</td><td>ἀληθείας</td></tr>
  <tr><td>Voc.</td><td>ἀλήθεια</td><td>ἀλήθειαι</td></tr>
</table>
<i>Обратите внимание:</i> окончания с йотой подписной: -ᾳ, -ῃ.<br><br>

<b>4. Склонение δόξα (слава) — нечистая альфа (после согласной)</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>δόξα</td><td>δόξαι</td></tr>
  <tr><td>Gen.</td><td>δόξης</td><td>δοξῶν</td></tr>
  <tr><td>Dat.</td><td>δόξῃ</td><td>δόξαις</td></tr>
  <tr><td>Acc.</td><td>δόξαν</td><td>δόξας</td></tr>
  <tr><td>Voc.</td><td>δόξα</td><td>δόξαι</td></tr>
</table>
<i>В Gen. и Dat. Sing. α переходит в η (δόξης, δόξῃ).</i><br><br>

<b>5. Склонение γραφή (писание) — слова на -η</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>γραφή</td><td>γραφαί</td></tr>
  <tr><td>Gen.</td><td>γραφῆς</td><td>γραφῶν</td></tr>
  <tr><td>Dat.</td><td>γραφῇ</td><td>γραφαῖς</td></tr>
  <tr><td>Acc.</td><td>γραφήν</td><td>γραφάς</td></tr>
  <tr><td>Voc.</td><td>γραφή</td><td>γραφαί</td></tr>
</table><br>

<b>6. Склонение ζωή (жизнь) — слова на -η с долгим окончанием</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>ζωή</td><td>ζωαί</td></tr>
  <tr><td>Gen.</td><td>ζωῆς</td><td>ζωῶν</td></tr>
  <tr><td>Dat.</td><td>ζωῇ</td><td>ζωαῖς</td></tr>
  <tr><td>Acc.</td><td>ζωήν</td><td>ζωάς</td></tr>
  <tr><td>Voc.</td><td>ζωή</td><td>ζωαί</td></tr>
</table><br>

<b>7. Правило «чистой» и «нечистой» альфы (подробно)</b><br>
• Если в Nom. Sing. стоит окончание <b>-α</b>, то:
  - после <b>ε, ι, ρ</b> (чистая альфа) она сохраняется во всех падежах: <b>α</b>
  - после других согласных (нечистая альфа) она переходит в <b>η</b> в Gen. и Dat. Sing.<br>
• Если в Nom. Sing. стоит окончание <b>-η</b>, то оно сохраняется во всех падежах.<br>
• В Dat. Sing. всегда пишется <b>ι</b> подписная: <b>ᾳ</b> (для слов на -α) или <b>ῃ</b> (для слов на -η).<br><br>

<b>8. Таблица окончаний 1-го склонения (женский род)</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>Nom.</td><td>-α, -η</td><td>-αι</td></tr>
  <tr><td>Gen.</td><td>-ας, -ης</td><td>-ῶν</td></tr>
  <tr><td>Dat.</td><td>-ᾳ, -ῃ</td><td>-αις</td></tr>
  <tr><td>Acc.</td><td>-αν, -ην</td><td>-ας</td></tr>
  <tr><td>Voc.</td><td>-α, -η</td><td>-αι</td></tr>
</table>
<i>Важно:</i> в Gen. Pl. ударение всегда на последнем слоге и облеченное: <b>ὡρῶν</b>, <b>δοξῶν</b>, <b>γραφῶν</b>, <b>ζωῶν</b>.<br><br>

<b>9. Дополнительные примеры</b><br>
• <b>βασιλεία</b> (царство) — чистая альфа (после ε, ι, ρ)<br>
• <b>καρδία</b> (сердце) — чистая альфа (после ι)<br>
• <b>ψυχή</b> (душа) — на -η<br>
• <b>ἐκκλησία</b> (церковь) — чистая альфа<br>
• <b>εἰρήνη</b> (мир) — на -η<br>
• <b>ἐντολή</b> (заповедь) — на -η`,
        vocabulary: [
            {greek:"ἀλήθεια", article:"ἡ", translation:"истина", type:"noun", declension_forms:{singular:{nom:"ἀλήθεια",gen:"ἀληθείας",dat:"ἀληθείᾳ",acc:"ἀλήθειαν",voc:"ἀλήθεια"},plural:{nom:"ἀλήθειαι",gen:"ἀληθειῶν",dat:"ἀληθείαις",acc:"ἀληθείας",voc:"ἀλήθειαι"}}},
            {greek:"ζωή", article:"ἡ", translation:"жизнь", type:"noun", declension_forms:{singular:{nom:"ζωή",gen:"ζωῆς",dat:"ζωῇ",acc:"ζωήν",voc:"ζωή"},plural:{nom:"ζωαί",gen:"ζωῶν",dat:"ζωαῖς",acc:"ζωάς",voc:"ζωαί"}}},
            {greek:"βασιλεία", article:"ἡ", translation:"царство", type:"noun", declension_forms:{singular:{nom:"βασιλεία",gen:"βασιλείας",dat:"βασιλείᾳ",acc:"βασιλείαν",voc:"βασιλεία"},plural:{nom:"βασιλεῖαι",gen:"βασιλειῶν",dat:"βασιλείαις",acc:"βασιλείας",voc:"βασιλεῖαι"}}},
            {greek:"ἡμέρα", article:"ἡ", translation:"день", type:"noun", declension_forms:{singular:{nom:"ἡμέρα",gen:"ἡμέρας",dat:"ἡμέρᾳ",acc:"ἡμέραν",voc:"ἡμέρα"},plural:{nom:"ἡμέραι",gen:"ἡμερῶν",dat:"ἡμέραις",acc:"ἡμέρας",voc:"ἡμέραι"}}},
            {greek:"γραφή", article:"ἡ", translation:"писание", type:"noun", declension_forms:{singular:{nom:"γραφή",gen:"γραφῆς",dat:"γραφῇ",acc:"γραφήν",voc:"γραφή"},plural:{nom:"γραφαί",gen:"γραφῶν",dat:"γραφαῖς",acc:"γραφάς",voc:"γραφαί"}}},
            {greek:"καρδία", article:"ἡ", translation:"сердце", type:"noun", declension_forms:{singular:{nom:"καρδία",gen:"καρδίας",dat:"καρδίᾳ",acc:"καρδίαν",voc:"καρδία"},plural:{nom:"καρδίαι",gen:"καρδιῶν",dat:"καρδίαις",acc:"καρδίας",voc:"καρδίαι"}}},
            {greek:"δόξα", article:"ἡ", translation:"слава", type:"noun", declension_forms:{singular:{nom:"δόξα",gen:"δόξης",dat:"δόξῃ",acc:"δόξαν",voc:"δόξα"},plural:{nom:"δόξαι",gen:"δοξῶν",dat:"δόξαις",acc:"δόξας",voc:"δόξαι"}}},
            {greek:"παραβολή", article:"ἡ", translation:"притча", type:"noun", declension_forms:{singular:{nom:"παραβολή",gen:"παραβολῆς",dat:"παραβολῇ",acc:"παραβολήν",voc:"παραβολή"},plural:{nom:"παραβολαί",gen:"παραβολῶν",dat:"παραβολαῖς",acc:"παραβολάς",voc:"παραβολαί"}}},
            {greek:"εἰρήνη", article:"ἡ", translation:"мир", type:"noun", declension_forms:{singular:{nom:"εἰρήνη",gen:"εἰρήνης",dat:"εἰρήνῃ",acc:"εἰρήνην",voc:"εἰρήνη"},plural:{nom:"εἰρῆναι",gen:"εἰρηνῶν",dat:"εἰρήναις",acc:"εἰρήνας",voc:"εἰρῆναι"}}},
            {greek:"φωνή", article:"ἡ", translation:"голос, звук", type:"noun", declension_forms:{singular:{nom:"φωνή",gen:"φωνῆς",dat:"φωνῇ",acc:"φωνήν",voc:"φωνή"},plural:{nom:"φωναί",gen:"φωνῶν",dat:"φωναῖς",acc:"φωνάς",voc:"φωναί"}}},
            {greek:"ἐκκλησία", article:"ἡ", translation:"церковь", type:"noun", declension_forms:{singular:{nom:"ἐκκλησία",gen:"ἐκκλησίας",dat:"ἐκκλησίᾳ",acc:"ἐκκλησίαν",voc:"ἐκκλησία"},plural:{nom:"ἐκκλησίαι",gen:"ἐκκλησιῶν",dat:"ἐκκλησίαις",acc:"ἐκκλησίας",voc:"ἐκκλησίαι"}}},
            {greek:"ψυχή", article:"ἡ", translation:"душа", type:"noun", declension_forms:{singular:{nom:"ψυχή",gen:"ψυχῆς",dat:"ψυχῇ",acc:"ψυχήν",voc:"ψυχή"},plural:{nom:"ψυχαί",gen:"ψυχῶν",dat:"ψυχαῖς",acc:"ψυχάς",voc:"ψυχαί"}}},
            {greek:"ἐντολή", article:"ἡ", translation:"заповедь", type:"noun", declension_forms:{singular:{nom:"ἐντολή",gen:"ἐντολῆς",dat:"ἐντολῇ",acc:"ἐντολήν",voc:"ἐντολή"},plural:{nom:"ἐντολαί",gen:"ἐντολῶν",dat:"ἐντολαῖς",acc:"ἐντολάς",voc:"ἐντολαί"}}},
            {greek:"ὥρα", article:"ἡ", translation:"час", type:"noun", declension_forms:{singular:{nom:"ὥρα",gen:"ὥρας",dat:"ὥρᾳ",acc:"ὥραν",voc:"ὥρα"},plural:{nom:"ὥραι",gen:"ὡρῶν",dat:"ὥραις",acc:"ὥρας",voc:"ὥραι"}}}
        ],
        exercises: {
    declension_fill: [
        {case:"gen_sg", word:"ὥρα", translation:"час", correct:"ὥρας", distractors:["ὡρῶν","ὥρᾳ","ὥραν"]},
        {case:"dat_sg", word:"ὥρα", translation:"час", correct:"ὥρᾳ", distractors:["ὥρας","ὥραν","ὥραις"]},
        {case:"acc_sg", word:"ὥρα", translation:"час", correct:"ὥραν", distractors:["ὥρας","ὥρᾳ","ὡρῶν"]},
        {case:"nom_pl", word:"ὥρα", translation:"час", correct:"ὥραι", distractors:["ὥρας","ὥραις","ὡρῶν"]},
        {case:"gen_pl", word:"ὥρα", translation:"час", correct:"ὡρῶν", distractors:["ὥρας","ὥρᾳ","ὥραις"]},
        {case:"dat_pl", word:"ὥρα", translation:"час", correct:"ὥραις", distractors:["ὡρῶν","ὥραι","ὥραν"]},
        {case:"acc_pl", word:"ὥρα", translation:"час", correct:"ὥρας", distractors:["ὥραις","ὡρῶν","ὥραι"]},
        {case:"gen_sg", word:"ἀλήθεια", translation:"истина", correct:"ἀληθείας", distractors:["ἀληθείᾳ","ἀλήθειαν","ἀλήθειαι"]},
        {case:"dat_sg", word:"ζωή", translation:"жизнь", correct:"ζωῇ", distractors:["ζωῆς","ζωήν","ζωαί"]},
        {case:"acc_sg", word:"βασιλεία", translation:"царство", correct:"βασιλείαν", distractors:["βασιλείας","βασιλείᾳ","βασιλεῖαι"]},
        {case:"nom_pl", word:"ἡμέρα", translation:"день", correct:"ἡμέραι", distractors:["ἡμέρας","ἡμέραις","ἡμερῶν"]},
        {case:"gen_pl", word:"γραφή", translation:"писание", correct:"γραφῶν", distractors:["γραφῆς","γραφαῖς","γραφάς"]},
        {case:"dat_pl", word:"καρδία", translation:"сердце", correct:"καρδίαις", distractors:["καρδίας","καρδιῶν","καρδίαι"]},
        {case:"acc_pl", word:"δόξα", translation:"слава", correct:"δόξας", distractors:["δόξαις","δοξῶν","δόξαι"]},
        {case:"gen_sg", word:"παραβολή", translation:"притча", correct:"παραβολῆς", distractors:["παραβολῇ","παραβολήν","παραβολαί"]},
        {case:"dat_sg", word:"εἰρήνη", translation:"мир", correct:"εἰρήνῃ", distractors:["εἰρήνης","εἰρήνην","εἰρῆναι"]},
        {case:"acc_sg", word:"φωνή", translation:"голос", correct:"φωνήν", distractors:["φωνῆς","φωνῇ","φωναί"]},
        {case:"gen_sg", word:"ἐκκλησία", translation:"церковь", correct:"ἐκκλησίας", distractors:["ἐκκλησίᾳ","ἐκκλησίαν","ἐκκλησίαι"]},
        {case:"dat_sg", word:"ψυχή", translation:"душа", correct:"ψυχῇ", distractors:["ψυχῆς","ψυχήν","ψυχαί"]},
        {case:"acc_pl", word:"ἐντολή", translation:"заповедь", correct:"ἐντολάς", distractors:["ἐντολαῖς","ἐντολῶν","ἐντολαί"]}
    ],
    translate_greek_to_russian: [
        {greek:"ἡ ἀλήθεια", keywords:["истина"]},
        {greek:"τῆς δόξης", keywords:["славы"]},
        {greek:"τῇ ψυχῇ", keywords:["душе"]},
        {greek:"τὴν ζωήν", keywords:["жизнь"]},
        {greek:"αἱ βασιλεῖαι", keywords:["царства"]},
        {greek:"τῶν ἡμερῶν", keywords:["дней"]},
        {greek:"ταῖς παραβολαῖς", keywords:["притчам"]},
        {greek:"ἡ φωνή", keywords:["голос"]},
        {greek:"ἡ ἐκκλησία", keywords:["церковь"]},
        {greek:"ἡ ψυχή", keywords:["душа"]},
        {greek:"ἡ ἐντολή", keywords:["заповедь"]},
        {greek:"ἡ ὥρα", keywords:["час"]}
    ],
    translate_russian_to_greek: [
        {russian:"истина", correct_sequence:["ἀλήθεια"], all_words:["ἀλήθεια","δόξα","ὥρα","ζωή"]},
        {russian:"славы (Gen.)", correct_sequence:["δόξης"], all_words:["δόξης","δόξαν","δόξαις","δόξαι"]},
        {russian:"жизнь (Acc.)", correct_sequence:["ζωήν"], all_words:["ζωήν","ζωή","ζωῆς","ζωαί"]},
        {russian:"царство", correct_sequence:["βασιλεία"], all_words:["βασιλεία","ἀλήθεια","ζωή","ἡμέρα"]},
        {russian:"день", correct_sequence:["ἡμέρα"], all_words:["ἡμέρα","βασιλεία","γραφή","καρδία"]},
        {russian:"писание", correct_sequence:["γραφή"], all_words:["γραφή","δόξα","παραβολή","εἰρήνη"]},
        {russian:"сердце", correct_sequence:["καρδία"], all_words:["καρδία","φωνή","ἐκκλησία","ψυχή"]},
        {russian:"слава", correct_sequence:["δόξα"], all_words:["δόξα","ἀλήθεια","ζωή","ὥρα"]},
        {russian:"притча", correct_sequence:["παραβολή"], all_words:["παραβολή","γραφή","ἐντολή","εἰρήνη"]},
        {russian:"мир", correct_sequence:["εἰρήνη"], all_words:["εἰρήνη","φωνή","ἐκκλησία","ψυχή"]},
        {russian:"голос", correct_sequence:["φωνή"], all_words:["φωνή","ἐκκλησία","ψυχή","ἐντολή"]},
        {russian:"церковь", correct_sequence:["ἐκκλησία"], all_words:["ἐκκλησία","ψυχή","ἐντολή","ὥρα"]},
        {russian:"душа", correct_sequence:["ψυχή"], all_words:["ψυχή","ἐντολή","ὥρα","φωνή"]},
        {russian:"заповедь", correct_sequence:["ἐντολή"], all_words:["ἐντολή","ὥρα","φωνή","ἐκκλησία"]},
        {russian:"час", correct_sequence:["ὥρα"], all_words:["ὥρα","ἐντολή","φωνή","ἐκκλησία"]}
    ],
    case_number: [
        {form:"ὡρῶν", correct:"Gen. Pl.", distractors:["Gen. Sg.","Dat. Pl.","Acc. Pl."]},
        {form:"δόξαις", correct:"Dat. Pl.", distractors:["Dat. Sg.","Nom. Pl.","Acc. Pl."]},
        {form:"ἀλήθειαι", correct:"Nom. Pl.", distractors:["Gen. Pl.","Dat. Pl.","Acc. Pl."]},
        {form:"ζωῶν", correct:"Gen. Pl.", distractors:["Nom. Pl.","Dat. Pl.","Acc. Pl."]},
        {form:"βασιλείαις", correct:"Dat. Pl.", distractors:["Nom. Pl.","Gen. Pl.","Acc. Pl."]},
        {form:"ἡμέραν", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]}
    ]
},
translation: {
    ru_to_el: [
        { source: "Царство имеет славу.", correct: ["ἡ","βασιλεία","ἔχει","δόξαν"] },
        { source: "Церкви говорят сердцам людей притчи.", correct: ["αἱ","ἐκκλησίαι","λέγουσι","ταῖς","καρδίαις","τῶν","ἀνθρώπων","παραβολάς"] },
        { source: "Голос Сына Человеческого учит апостола, и голос апостола учит человека.", correct: ["ἡ","φωνὴ","τοῦ","υἱοῦ","τοῦ","ἀνθρώπου","διδάσκει","τὸν","ἀπόστολον","καὶ","ἡ","φωνὴ","τοῦ","ἀποστόλου","διδάσκει","τὸν","ἄνθρωπον"] },
        { source: "Мы имеем писания апостолов.", correct: ["ἔχομεν","τὰς","γραφὰς","τῶν","ἀποστόλων"] },
        { source: "Человек видит жизнь и смерть.", correct: ["ὁ","ἄνθρωπος","βλέπει","ζωὴν","καὶ","θάνατον"] },
        { source: "Апостолы освобождают души.", correct: ["οἱ","ἀπόστολοι","λύουσι","τὰς","ψυχάς"] },
        { source: "Мы видим дома и храмы.", correct: ["βλέπομεν","τοὺς","οἴκους","καὶ","τὰ","ἱερά"] },
        { source: "Иисус знает сердца людей.", correct: ["ὁ","Ἰησοῦς","γινώσκει","τὰς","καρδίας","τῶν","ἀνθρώπων"] },
        { source: "Мы знаем голоса церквей, слова истины и души людей.", correct: ["γινώσκομεν","τὰς","φωνὰς","τῶν","ἐκκλησιῶν","τοὺς","λόγους","τῆς","ἀληθείας","καὶ","τὰς","ψυχὰς","τῶν","ἀνθρώπων"] },
        { source: "Церкви имеют мир и славу.", correct: ["αἱ","ἐκκλησίαι","ἔχουσι","εἰρήνην","καὶ","δόξαν"] }
    ],
    el_to_ru: [
        { source: "ψυχὴ βλέπει ζωήν.", correct: "Душа видит жизнь." },
        { source: "βασιλεία γινώσκει ἀλήθειαν.", correct: "Царство знает истину." },
        { source: "ἄνθρωπος γράφει ἐντολὰς καὶ νόμους.", correct: "Человек пишет заповеди и законы." },
        { source: "ἀπόστολοι γινώσκουσι δούλους καὶ ἐκκλησίας.", correct: "Апостолы знают рабов и церкви." },
        { source: "ἀπόστολοι καὶ ἐκκλησίαι βλέπουσι ζωὴν καὶ θάνατον.", correct: "Апостолы и церкви видят жизнь и смерть." },
        { source: "υἱὸς δούλου λέγει παραβολὴν ἐκκλησίᾳ.", correct: "Сын раба говорит притчу церкви." },
        { source: "παραβολὴν λέγομεν καὶ ἐντολὴν καὶ νόμον.", correct: "Мы говорим и притчу, и заповедь, и закон." },
        { source: "βασιλείας γινώσκετε καὶ ἐκκλησίας.", correct: "Вы знаете царства и церкви." },
        { source: "ἐκκλησίαν διδάσκει ἀπόστολος καὶ ἄνθρωπον.", correct: "Апостол учит церковь и человека." },
        { source: "νόμον καὶ παραβολὴν γράφει ἀδελφὸς ἐκκλησίᾳ.", correct: "Брат пишет закон и притчу церкви." },
        { source: "καρδίαι ἀνθρώπων ἔχουσι ζωὴν καὶ εἰρήνην.", correct: "Сердца людей имеют жизнь и мир." },
        { source: "φωνὴ ἀποστόλων διδάσκει ψυχὰς δούλων.", correct: "Голос апостолов учит души рабов." },
        { source: "ἱερὸν ἔχει δόξαν.", correct: "Храм имеет славу." },
        { source: "φωναὶ ἐκκλησιῶν διδάσκουσι βασιλείας καὶ ἀνθρώπους.", correct: "Голоса церквей учат царства и людей." },
        { source: "βλέπεις δῶρα καὶ ἱερά.", correct: "Ты видишь дары и храмы." },
        { source: "γράφει ἐκκλησία λόγον ζωῆς.", correct: "Церковь пишет слово жизни." },
        { source: "λέγει καρδίαις ἀνθρώπων παραβολὴν καὶ νόμον.", correct: "Он говорит сердцам людей притчу и закон." },
        { source: "γράφει ἐκκλησίᾳ υἱὸς ἀποστόλου.", correct: "Сын апостола пишет церкви." },
        { source: "βλέπομεν τὰς ἡμέρας καὶ τὰς ὥρας τῆς ζωῆς.", correct: "Мы видим дни и часы жизни." },
        { source: "ἐν τῇ ὥρᾳ τῆς ἡμέρας γινώσκομεν τὴν ἀλήθειαν.", correct: "В час дня мы познаём истину." }
    ]
    }
},
    6: {
        title: "Прилагательные и артикли",
grammar: `<b>1. Прилагательные 1-2 склонения</b><br>
Прилагательные 1-2 склонения изменяются по трём родам:<br>
• <b>мужской род</b> — окончание <b>-ος</b> (как 2-е склонение)<br>
• <b>женский род</b> — окончание <b>-η</b> или <b>-α</b><br>
• <b>средний род</b> — окончание <b>-ον</b> (как 2-е склонение)<br><br>
<b>Особенности женского рода:</b><br>
• После букв <b>ε, ι, ρ</b> в женском роде используется окончание <b>-α</b> (а не -η)<br>
• Пример: δίκαιος → δικαία (справедливая)<br>
• В остальных случаях — окончание <b>-η</b><br>
• Пример: ἀγαθός → ἀγαθή (хорошая)<br><br>

<b>2. Склонение ἀγαθός, -ή, -όν (хороший)</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>ἀγαθός</td><td>ἀγαθή</td><td>ἀγαθόν</td></tr>
  <tr><td>Gen.</td><td>ἀγαθοῦ</td><td>ἀγαθῆς</td><td>ἀγαθοῦ</td></tr>
  <tr><td>Dat.</td><td>ἀγαθῷ</td><td>ἀγαθῇ</td><td>ἀγαθῷ</td></tr>
  <tr><td>Acc.</td><td>ἀγαθόν</td><td>ἀγαθήν</td><td>ἀγαθόν</td></tr>
  <tr><td>Voc.</td><td>ἀγαθέ</td><td>ἀγαθή</td><td>ἀγαθόν</td></tr>
</table><br>
<b>Множественное число:</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>ἀγαθοί</td><td>ἀγαθαί</td><td>ἀγαθά</td></tr>
  <tr><td>Gen.</td><td>ἀγαθῶν</td><td>ἀγαθῶν</td><td>ἀγαθῶν</td></tr>
  <tr><td>Dat.</td><td>ἀγαθοῖς</td><td>ἀγαθαῖς</td><td>ἀγαθοῖς</td></tr>
  <tr><td>Acc.</td><td>ἀγαθούς</td><td>ἀγαθάς</td><td>ἀγαθά</td></tr>
</table><br>
<i>Обратите внимание:</i> ударение в родительном падеже множественного числа женского рода стоит на окончании (как у существительных 1-го склонения).<br><br>

<b>3. Определённый артикль (ὁ, ἡ, τό)</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>ὁ</td><td>ἡ</td><td>τό</td></tr>
  <tr><td>Gen.</td><td>τοῦ</td><td>τῆς</td><td>τοῦ</td></tr>
  <tr><td>Dat.</td><td>τῷ</td><td>τῇ</td><td>τῷ</td></tr>
  <tr><td>Acc.</td><td>τόν</td><td>τήν</td><td>τό</td></tr>
</table><br>
<b>Множественное число:</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>οἱ</td><td>αἱ</td><td>τά</td></tr>
  <tr><td>Gen.</td><td>τῶν</td><td>τῶν</td><td>τῶν</td></tr>
  <tr><td>Dat.</td><td>τοῖς</td><td>ταῖς</td><td>τοῖς</td></tr>
  <tr><td>Acc.</td><td>τούς</td><td>τάς</td><td>τά</td></tr>
</table><br>

<b>4. Употребление прилагательных: атрибутивное и предикативное</b><br>
• <b>Атрибутивное</b> (прилагательное стоит перед существительным и согласуется с ним в роде, числе и падеже).<br>
  Пример: <i>ὁ ἀγαθὸς ἄνθρωπος</i> — «хороший человек» (прилагательное с артиклем).<br>
• <b>Предикативное</b> (прилагательное стоит после существительного и является частью сказуемого).<br>
  Пример: <i>ὁ ἄνθρωπος ἀγαθός</i> — «человек хорош» (прилагательное без артикля).<br><br>

<b>5. Субстантивация прилагательных</b><br>
Прилагательные могут употребляться как существительные (с артиклем).<br>
• <i>οἱ ἀγαθοί</i> — «хорошие (люди)»<br>
• <i>τὸ καλόν</i> — «красивое (дело / вещь)»<br>
• <i>τὰ κακά</i> — «плохие (дела / вещи)»<br>
• <i>οἱ δίκαιοι</i> — «справедливые (люди)»<br><br>

<b>6. Дополнительные примеры прилагательных 1-2 склонения</b><br>
• <b>καλός, -ή, -όν</b> — красивый, хороший<br>
• <b>κακός, -ή, -όν</b> — плохой, злой<br>
• <b>δίκαιος, -α, -ον</b> — справедливый<br>
• <b>μικρός, -ά, -όν</b> — маленький<br>
• <b>πιστός, -ή, -όν</b> — верный<br>
• <b>πρῶτος, -η, -ον</b> — первый<br>
• <b>ἔσχατος, -η, -ον</b> — последний<br>
• <b>νεκρός, -ά, -όν</b> — мёртвый<br>
• <b>ἄλλος, -η, -ο</b> — другой<br><br>

<i>Все эти прилагательные склоняются по образцу ἀγαθός (с учётом особенностей женского рода).`,
        vocabulary: [
            {greek:"ἀγαθός, ή, όν", translation:"хороший (-ая, -ее)", type:"adjective", declension_forms:{masculine:{singular:{nom:"ἀγαθός",gen:"ἀγαθοῦ",dat:"ἀγαθῷ",acc:"ἀγαθόν",voc:"ἀγαθέ"},plural:{nom:"ἀγαθοί",gen:"ἀγαθῶν",dat:"ἀγαθοῖς",acc:"ἀγαθούς",voc:"ἀγαθοί"}},feminine:{singular:{nom:"ἀγαθή",gen:"ἀγαθῆς",dat:"ἀγαθῇ",acc:"ἀγαθήν",voc:"ἀγαθή"},plural:{nom:"ἀγαθαί",gen:"ἀγαθῶν",dat:"ἀγαθαῖς",acc:"ἀγαθάς",voc:"ἀγαθαί"}},neuter:{singular:{nom:"ἀγαθόν",gen:"ἀγαθοῦ",dat:"ἀγαθῷ",acc:"ἀγαθόν",voc:"ἀγαθόν"},plural:{nom:"ἀγαθά",gen:"ἀγαθῶν",dat:"ἀγαθοῖς",acc:"ἀγαθά",voc:"ἀγαθά"}}}},
            {greek:"ἄλλος, η, ο", translation:"другой (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"ἄλλος",gen:"ἄλλου",dat:"ἄλλῳ",acc:"ἄλλον",voc:"ἄλλε"},plural:{nom:"ἄλλοι",gen:"ἄλλων",dat:"ἄλλοις",acc:"ἄλλους",voc:"ἄλλοι"}},feminine:{singular:{nom:"ἄλλη",gen:"ἄλλης",dat:"ἄλλῃ",acc:"ἄλλην",voc:"ἄλλη"},plural:{nom:"ἄλλαι",gen:"ἄλλων",dat:"ἄλλαις",acc:"ἄλλας",voc:"ἄλλαι"}},neuter:{singular:{nom:"ἄλλο",gen:"ἄλλου",dat:"ἄλλῳ",acc:"ἄλλο",voc:"ἄλλο"},plural:{nom:"ἄλλα",gen:"ἄλλων",dat:"ἄλλοις",acc:"ἄλλα",voc:"ἄλλα"}}}},
            {greek:"δίκαιος, α, ον", translation:"справедливый, праведный (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"δίκαιος",gen:"δικαίου",dat:"δικαίῳ",acc:"δίκαιον",voc:"δίκαιε"},plural:{nom:"δίκαιοι",gen:"δικαίων",dat:"δικαίοις",acc:"δικαίους",voc:"δίκαιοι"}},feminine:{singular:{nom:"δικαία",gen:"δικαίας",dat:"δικαίᾳ",acc:"δικαίαν",voc:"δικαία"},plural:{nom:"δικαῖαι",gen:"δικαίων",dat:"δικαίαις",acc:"δικαίας",voc:"δικαῖαι"}},neuter:{singular:{nom:"δίκαιον",gen:"δικαίου",dat:"δικαίῳ",acc:"δίκαιον",voc:"δίκαιον"},plural:{nom:"δίκαια",gen:"δικαίων",dat:"δικαίοις",acc:"δίκαια",voc:"δίκαια"}}}},
            {greek:"ἐγείρω", translation:"воскрешаю, поднимаю", type:"verb", declension_forms:{singular:{"1":"ἐγείρω","2":"ἐγείρεις","3":"ἐγείρει"},plural:{"1":"ἐγείρομεν","2":"ἐγείρετε","3":"ἐγείρουσι(ν)"}}},
            {greek:"ἔρημος", article:"ἡ", translation:"пустыня (ж.р. по 2-му склонению)", type:"noun", declension_forms:{singular:{nom:"ἔρημος",gen:"ἐρήμου",dat:"ἐρήμῳ",acc:"ἔρημον"},plural:{nom:"ἔρημοι",gen:"ἐρήμων",dat:"ἐρήμοις",acc:"ἐρήμους"}}},
            {greek:"ἔσχατος, η, ον", translation:"последний (-ая, -ее)", type:"adjective", declension_forms:{masculine:{singular:{nom:"ἔσχατος",gen:"ἐσχάτου",dat:"ἐσχάτῳ",acc:"ἔσχατον",voc:"ἔσχατε"},plural:{nom:"ἔσχατοι",gen:"ἐσχάτων",dat:"ἐσχάτοις",acc:"ἐσχάτους",voc:"ἔσχατοι"}},feminine:{singular:{nom:"ἐσχάτη",gen:"ἐσχάτης",dat:"ἐσχάτῃ",acc:"ἐσχάτην",voc:"ἐσχάτη"},plural:{nom:"ἔσχαται",gen:"ἐσχάτων",dat:"ἐσχάταις",acc:"ἐσχάτας",voc:"ἔσχαται"}},neuter:{singular:{nom:"ἔσχατον",gen:"ἐσχάτου",dat:"ἐσχάτῳ",acc:"ἔσχατον",voc:"ἔσχατον"},plural:{nom:"ἔσχατα",gen:"ἐσχάτων",dat:"ἐσχάτοις",acc:"ἔσχατα",voc:"ἔσχατα"}}}},
            {greek:"κακός, ή, όν", translation:"плохой, злой (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"κακός",gen:"κακοῦ",dat:"κακῷ",acc:"κακόν",voc:"κακέ"},plural:{nom:"κακοί",gen:"κακῶν",dat:"κακοῖς",acc:"κακούς",voc:"κακοί"}},feminine:{singular:{nom:"κακή",gen:"κακῆς",dat:"κακῇ",acc:"κακήν",voc:"κακή"},plural:{nom:"κακαί",gen:"κακῶν",dat:"κακαῖς",acc:"κακάς",voc:"κακαί"}},neuter:{singular:{nom:"κακόν",gen:"κακοῦ",dat:"κακῷ",acc:"κακόν",voc:"κακόν"},plural:{nom:"κακά",gen:"κακῶν",dat:"κακοῖς",acc:"κακά",voc:"κακά"}}}},
            {greek:"καλός, ή, όν", translation:"хороший, красивый (-ая, -ее/-ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"καλός",gen:"καλοῦ",dat:"καλῷ",acc:"καλόν",voc:"καλέ"},plural:{nom:"καλοί",gen:"καλῶν",dat:"καλοῖς",acc:"καλούς",voc:"καλοί"}},feminine:{singular:{nom:"καλή",gen:"καλῆς",dat:"καλῇ",acc:"καλήν",voc:"καλή"},plural:{nom:"καλαί",gen:"καλῶν",dat:"καλαῖς",acc:"καλάς",voc:"καλαί"}},neuter:{singular:{nom:"καλόν",gen:"καλοῦ",dat:"καλῷ",acc:"καλόν",voc:"καλόν"},plural:{nom:"καλά",gen:"καλῶν",dat:"καλοῖς",acc:"καλά",voc:"καλά"}}}},
            {greek:"κύριος", article:"ὁ", translation:"господин, Господь", type:"noun", declension_forms:{singular:{nom:"κύριος",gen:"κυρίου",dat:"κυρίῳ",acc:"κύριον",voc:"κύριε"},plural:{nom:"κύριοι",gen:"κυρίων",dat:"κυρίοις",acc:"κυρίους",voc:"κύριοι"}}},
            {greek:"μικρός, ά, όν", translation:"маленький (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"μικρός",gen:"μικροῦ",dat:"μικρῷ",acc:"μικρόν",voc:"μικρέ"},plural:{nom:"μικροί",gen:"μικρῶν",dat:"μικροῖς",acc:"μικρούς",voc:"μικροί"}},feminine:{singular:{nom:"μικρά",gen:"μικρᾶς",dat:"μικρᾷ",acc:"μικράν",voc:"μικρά"},plural:{nom:"μικραί",gen:"μικρῶν",dat:"μικραῖς",acc:"μικράς",voc:"μικραί"}},neuter:{singular:{nom:"μικρόν",gen:"μικροῦ",dat:"μικρῷ",acc:"μικρόν",voc:"μικρόν"},plural:{nom:"μικρά",gen:"μικρῶν",dat:"μικροῖς",acc:"μικρά",voc:"μικρά"}}}},
            {greek:"νεκρός, ά, όν", translation:"мёртвый (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"νεκρός",gen:"νεκροῦ",dat:"νεκρῷ",acc:"νεκρόν",voc:"νεκρέ"},plural:{nom:"νεκροί",gen:"νεκρῶν",dat:"νεκροῖς",acc:"νεκρούς",voc:"νεκροί"}},feminine:{singular:{nom:"νεκρά",gen:"νεκρᾶς",dat:"νεκρᾷ",acc:"νεκράν",voc:"νεκρά"},plural:{nom:"νεκραί",gen:"νεκρῶν",dat:"νεκραῖς",acc:"νεκράς",voc:"νεκραί"}},neuter:{singular:{nom:"νεκρόν",gen:"νεκροῦ",dat:"νεκρῷ",acc:"νεκρόν",voc:"νεκρόν"},plural:{nom:"νεκρά",gen:"νεκρῶν",dat:"νεκροῖς",acc:"νεκρά",voc:"νεκρά"}}}},
            {greek:"ὁδός", article:"ἡ", translation:"дорога, путь (ж.р. по 2-му склонению)", type:"noun", declension_forms:{singular:{nom:"ὁδός",gen:"ὁδοῦ",dat:"ὁδῷ",acc:"ὁδόν"},plural:{nom:"ὁδοί",gen:"ὁδῶν",dat:"ὁδοῖς",acc:"ὁδούς"}}},
            {greek:"παρθένος", article:"ἡ", translation:"дева, девушка (ж.р. по 2-му склонению)", type:"noun", declension_forms:{singular:{nom:"παρθένος",gen:"παρθένου",dat:"παρθένῳ",acc:"παρθένον"},plural:{nom:"παρθένοι",gen:"παρθένων",dat:"παρθένοις",acc:"παρθένους"}}},
            {greek:"πιστός, ή, όν", translation:"верный (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"πιστός",gen:"πιστοῦ",dat:"πιστῷ",acc:"πιστόν",voc:"πιστέ"},plural:{nom:"πιστοί",gen:"πιστῶν",dat:"πιστοῖς",acc:"πιστούς",voc:"πιστοί"}},feminine:{singular:{nom:"πιστή",gen:"πιστῆς",dat:"πιστῇ",acc:"πιστήν",voc:"πιστή"},plural:{nom:"πισταί",gen:"πιστῶν",dat:"πισταῖς",acc:"πιστάς",voc:"πισταί"}},neuter:{singular:{nom:"πιστόν",gen:"πιστοῦ",dat:"πιστῷ",acc:"πιστόν",voc:"πιστόν"},plural:{nom:"πιστά",gen:"πιστῶν",dat:"πιστοῖς",acc:"πιστά",voc:"πιστά"}}}},
            {greek:"πρῶτος, η, ον", translation:"первый (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"πρῶτος",gen:"πρώτου",dat:"πρώτῳ",acc:"πρῶτον",voc:"πρῶτε"},plural:{nom:"πρῶτοι",gen:"πρώτων",dat:"πρώτοις",acc:"πρώτους",voc:"πρῶτοι"}},feminine:{singular:{nom:"πρώτη",gen:"πρώτης",dat:"πρώτῃ",acc:"πρώτην",voc:"πρώτη"},plural:{nom:"πρῶται",gen:"πρώτων",dat:"πρώταις",acc:"πρώτας",voc:"πρῶται"}},neuter:{singular:{nom:"πρῶτον",gen:"πρώτου",dat:"πρώτῳ",acc:"πρῶτον",voc:"πρῶτον"},plural:{nom:"πρῶτα",gen:"πρώτων",dat:"πρώτοις",acc:"πρῶτα",voc:"πρῶτα"}}}}
        ],
        exercises: {
            agreement: [
                {noun:"λόγος", article:"ὁ", adjective:"ἀγαθός", correct:"ἀγαθός", distractors:["ἀγαθόν","ἀγαθοῦ","ἀγαθῷ"]},
                {noun:"ψυχή", article:"ἡ", adjective:"πιστός", correct:"πιστή", distractors:["πιστός","πιστόν","πιστῆς"]},
                {noun:"δῶρον", article:"τό", adjective:"καλός", correct:"καλόν", distractors:["καλός","καλή","καλοῦ"]},
                {noun:"ὁδός", article:"ἡ", adjective:"κακός", correct:"κακή", distractors:["κακός","κακόν","κακοῦ"]},
                {noun:"παρθένος", article:"ἡ", adjective:"πρῶτος", correct:"πρώτη", distractors:["πρῶτος","πρῶτον","πρώτης"]},
                {noun:"ἔρημος", article:"ἡ", adjective:"ἔσχατος", correct:"ἐσχάτη", distractors:["ἔσχατος","ἔσχατον","ἐσχάτης"]},
                {noun:"κύριος", article:"ὁ", adjective:"δίκαιος", correct:"δίκαιος", distractors:["δικαία","δίκαιον","δικαίου"]},
                {noun:"ἱερόν", article:"τό", adjective:"μικρός", correct:"μικρόν", distractors:["μικρός","μικρά","μικροῦ"]},
                {noun:"ἄνθρωπος", article:"ὁ", adjective:"ἄλλος", correct:"ἄλλος", distractors:["ἄλλη","ἄλλο","ἄλλου"]},
                {noun:"ἀδελφοί", article:"οἱ", adjective:"νεκρός", correct:"νεκροί", distractors:["νεκρός","νεκραί","νεκρά"]}
            ],
            attribute_vs_predicate: [
                {phrase:"ὁ ἀγαθὸς ἄνθρωπος", correct:"атрибутив", distractors:["предикатив"]},
                {phrase:"ὁ ἄνθρωπος ἀγαθός", correct:"предикатив", distractors:["атрибутив"]},
                {phrase:"ἡ ἐσχάτη ἔρημος", correct:"атрибутив", distractors:["предикатив"]},
                {phrase:"ἡ ὁδὸς κακή", correct:"предикатив", distractors:["атрибутив"]},
                {phrase:"ὁ κύριος ὁ ἀγαθός", correct:"атрибутив", distractors:["предикатив"]},
                {phrase:"αἱ πισταὶ παρθένοι", correct:"атрибутив", distractors:["предикатив"]},
                {phrase:"νεκροὶ οἱ ἄνθρωποι", correct:"предикатив", distractors:["атрибутив"]}
            ],
            substantivation: [
                {phrase:"οἱ ἀγαθοί", correct:"хорошие (люди)", distractors:["хорошие (вещи)","хорошие (женщины)","добро"]},
                {phrase:"τὸ καλόν", correct:"красивое (дело/вещь)", distractors:["красивый (человек)","красивая (женщина)","красота"]},
                {phrase:"οἱ νεκροί", correct:"мёртвые (люди)", distractors:["мёртвое (дело)","мёртвая (женщина)","смерть"]},
                {phrase:"οἱ κακοί", correct:"злые (люди)", distractors:["злое (дело)","злая (женщина)","зло"]},
                {phrase:"τὰ ἔσχατα", correct:"последнее (то, что в конце)", distractors:["последние (люди)","последняя (женщина)","конец"]},
                {phrase:"ὁ πρῶτος", correct:"первый (человек)", distractors:["первое (дело)","первая (женщина)","начало"]},
                {phrase:"αἱ πισταί", correct:"верные (женщины)", distractors:["верные (мужчины)","верное (дело)","вера"]},
                {phrase:"τὰ μικρά", correct:"малое (то, что мало)", distractors:["малые (люди)","малая (женщина)","малость"]}
            ],
            article_fill: [
                {noun:"ἀγαθῷ ἀνθρώπῳ", correct_article:"τῷ", distractors:["τόν","τοῦ","τήν"]},
                {noun:"καλῆς ψυχῆς", correct_article:"τῆς", distractors:["τήν","τῇ","τοῦ"]},
                {noun:"δίκαιον λόγον", correct_article:"τόν", distractors:["τοῦ","τῷ","τήν"]},
                {noun:"κακῇ ὁδῷ", correct_article:"τῇ", distractors:["τήν","τῆς","τῷ"]},
                {noun:"πισταὶ παρθένοι", correct_article:"αἱ", distractors:["οἱ","τά","τάς"]},
                {noun:"ἐσχάτης ἐρήμου", correct_article:"τῆς", distractors:["τῇ","τήν","τοῦ"]},
                {noun:"ἀγαθοὶ κύριοι", correct_article:"οἱ", distractors:["αἱ","τά","τούς"]},
                {noun:"νεκροὺς ἀνθρώπους", correct_article:"τούς", distractors:["τοῖς","τῶν","οἱ"]}
            ],
            // Перевод коротких словосочетаний: сюда попадают слова урока, которых
            // нет в упражнениях на согласование и артикль — ἐγείρω, ὁδός,
            // παρθένος, ἔρημος, κύριος.
            translate_greek_to_russian: [
                {greek:"ἐγείρω τοὺς νεκρούς", keywords:["воскрешаю"]},
                {greek:"ὁ κύριος ἐγείρει τὸν ἄνθρωπον", keywords:["воскрешает"]},
                {greek:"ἡ ἀγαθὴ ὁδός", keywords:["хорош"]},
                {greek:"ἐν τῇ ἐρήμῳ", keywords:["пустын"]},
                {greek:"ἡ πρώτη παρθένος", keywords:["перв","дев"]},
                {greek:"οἱ κακοὶ κύριοι", keywords:["господ"]},
                {greek:"τὸ μικρὸν ἱερόν", keywords:["мал","храм"]},
                {greek:"οἱ ἔσχατοι ἄνθρωποι", keywords:["последн","люди"]},
                {greek:"ἄλλη ὁδός", keywords:["друг"]}
            ],
            translate_russian_to_greek: [
                {russian:"хорошая дорога", correct_sequence:["ἡ","ἀγαθὴ","ὁδός"], all_words:["ἡ","ἀγαθὴ","ὁδός","ὁ","ἀγαθὸς","λόγος"]},
                {russian:"верная дева", correct_sequence:["ἡ","πιστὴ","παρθένος"], all_words:["ἡ","πιστὴ","παρθένος","ὁ","πιστὸς","κύριος"]},
                {russian:"добрый Господь", correct_sequence:["ὁ","ἀγαθὸς","κύριος"], all_words:["ὁ","ἀγαθὸς","κύριος","ἡ","ἀγαθὴ","ὁδός"]},
                {russian:"последняя пустыня", correct_sequence:["ἡ","ἐσχάτη","ἔρημος"], all_words:["ἡ","ἐσχάτη","ἔρημος","ὁ","ἔσχατος","οἶκος"]},
                {russian:"он воскрешает", correct_sequence:["ἐγείρει"], all_words:["ἐγείρει","ἐγείρω","ἐγείρομεν","ἐγείρουσι"]},
                {russian:"мы воскрешаем", correct_sequence:["ἐγείρομεν"], all_words:["ἐγείρομεν","ἐγείρετε","ἐγείρω","ἐγείρει"]},
                {russian:"мёртвые (люди)", correct_sequence:["οἱ","νεκροί"], all_words:["οἱ","νεκροί","τά","νεκρά","αἱ","νεκραί"]},
                {russian:"маленькие дома", correct_sequence:["οἱ","μικροὶ","οἶκοι"], all_words:["οἱ","μικροὶ","οἶκοι","αἱ","μικραὶ","ὁδοί"]}
            ]
        },
translation: {
    ru_to_el: [
        { source: "Первой Церкви Господь пишет первую притчу.", correct: ["τῇ","πρώτῃ","ἐκκλησίᾳ","ὁ","κύριος","γράφει","τὴν","πρώτην","παραβολήν"] },
        { source: "Хорошая (девушка) видит пути пустыни.", correct: ["ἡ","καλὴ","παρθένος","βλέπει","τὰς","ὁδοὺς","τῆς","ἐρήμου"] },
        { source: "Хорошие (дела) — первые, а плохие (дела) — последние.", correct: ["τὰ","καλὰ","πρῶτά","ἐστιν","τὰ","δὲ","κακὰ","ἔσχατα"] },
        { source: "Смерть плоха, а жизнь хороша.", correct: ["ὁ","θάνατος","κακός","ἐστιν","ἡ","δὲ","ζωὴ","καλή"] },
        { source: "Господь Царства воскрешает верных (мужчин) и верных (женщин).", correct: ["ὁ","κύριος","τῆς","βασιλείας","ἐγείρει","τοὺς","πιστοὺς","καὶ","τὰς","πιστάς"] },
        { source: "Хорошие (люди) знают плохих (людей), и плохие (люди) знают хороших (людей).", correct: ["οἱ","ἀγαθοὶ","γινώσκουσι","τοὺς","κακοὺς","καὶ","οἱ","κακοὶ","γινώσκουσι","τοὺς","ἀγαθούς"] },
        { source: "Хорошие слова мы говорим Церкви, а плохое (слово) пишут люди.", correct: ["τοὺς","ἀγαθούς","λόγους","λέγομεν","τῇ","ἐκκλησίᾳ","τὸ","δὲ","κακὸν","γράφουσι","οἱ","ἄνθρωποι"] },
        { source: "Красивые девушки видят плохой путь.", correct: ["αἱ","καλαὶ","παρθένοι","βλέπουσι","τὴν","κακὴν","ὁδόν"] }
    ],
    el_to_ru: [
    {source:"ἀγαθὴ ἡ ἐκκλησία καὶ ἡ βασιλεία κακή.", correct:"Церковь хороша, а царство плохо."},
    {source:"ἡ κακὴ καρδία τοῦ ἀνθρώπου γινώσκει θάνατον.", correct:"Злое сердце человека знает смерть."},
    {source:"οἱ ἀπόστολοι βλέπουσι τοὺς μικροὺς οἴκους καὶ τὰς κακὰς ὁδούς.", correct:"Апостолы видят маленькие дома и плохие дороги."},
    {source:"οἱ δοῦλοι οἱ κακοὶ λύουσι τὸν οἶκον τοῦ ἀποστόλου.", correct:"Плохие рабы разрушают дом апостола."},
    {source:"οἱ κακοὶ λύουσι τὸ ἱερόν.", correct:"Плохие разрушают храм."},
    {source:"ὁ κύριος τῆς ζωῆς ἐγείρει τοὺς νεκρούς.", correct:"Господь жизни воскрешает мёртвых."},
    {source:"οἱ λόγοι τῆς ἀληθείας διδάσκουσι καὶ τοὺς ἄλλους.", correct:"Слова истины учат и других."},
    {source:"αἱ δίκαιαι παρθένοι λαμβάνουσι τὰ δῶρα τοῦ κυρίου τὰ καλά.", correct:"Праведные девы получают хорошие дары Господа."},
    {source:"ὁ κακὸς βλέπει τὴν ἔρημον καὶ τοὺς ἐσχάτους οἴκους.", correct:"Злой видит пустыню и последние дома."},
    {source:"πρῶτοι οἱ δοῦλοι· ἔσχατοι οἱ κύριοι.", correct:"Первые — рабы; последние — господа."},
    {source:"τῇ ἐκκλησίᾳ τῇ μικρᾷ γράφει ὁ κύριος λόγον ἀγαθόν.", correct:"Малой церкви Господь пишет доброе слово."},
    {source:"τοὺς πιστοὺς βλέπει ὁ πιστός.", correct:"Верный видит верных."},
    {source:"ἔσχατοι οἱ δοῦλοι οἱ κακοί· πρῶτοι οἱ υἱοὶ οἱ ἀγαθοί.", correct:"Последние — злые рабы; первые — добрые сыновья."},
    {source:"ὁ υἱὸς τοῦ ἐσχάτου ἀδελφοῦ βλέπει τὰς καλὰς ἐκκλησίας τοῦ κυρίου.", correct:"Сын последнего брата видит хорошие церкви Господа."},
    {source:"ἄλλην παραβολὴν λέγομεν τῇ κακῇ παρθένῳ.", correct:"Мы говорим другую притчу злой деве."},
    {source:"πρώτη ἡ ἐκκλησία· ἐσχάτη ἡ βασιλεία.", correct:"Первая — церковь; последнее — царство."},
    {source:"ταῖς πισταῖς λέγει ὁ κύριος παραβολὴν καλὴν καὶ τοῖς πιστοῖς.", correct:"Верным (женщинам) Господь говорит хорошую притчу, и верным (мужчинам)."},
    {source:"ὁ ἀγαθὸς γράφει ἀγαθά· ὁ κακὸς κακά.", correct:"Хороший пишет хорошее; злой — злое."},
    {source:"ἀγαθὸς ὁ δοῦλος καὶ λέγει καλά.", correct:"Хорош раб, и говорит хорошее."},
    {source:"ἡ ἀλήθεια πιστὴ καὶ οἱ ἄνθρωποι κακοί.", correct:"Истина верна, а люди злы."}
    ]
    }
},
    7: {
        title: "Предлоги и существительные первого склонения M. ",
grammar: `<b>1. Существительные мужского рода 1-го склонения</b><br>
Некоторые существительные мужского рода имеют основу на -α и склоняются по 1-му склонению, но артикль у них — по 2-му склонению (ἄνθρωπος). В именительном падеже единственного числа они могут оканчиваться на <b>-ης</b> (например, προφήτης) или на <b>-ας</b> (например, νεανίας).<br><br>

<b>2. Склонение προφήτης (пророк) — тип -ης</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>Nom.</td><td>προφήτης</td><td>προφῆται</td><td>пророк</td><td>пророки</td></tr>
  <tr><td>Gen.</td><td>προφήτου</td><td>προφητῶν</td><td>пророка</td><td>пророков</td></tr>
  <tr><td>Dat.</td><td>προφήτῃ</td><td>προφήταις</td><td>пророку</td><td>пророкам</td></tr>
  <tr><td>Acc.</td><td>προφήτην</td><td>προφήτας</td><td>пророка</td><td>пророков</td></tr>
  <tr><td>Voc.</td><td>προφῆτα</td><td>προφῆται</td><td>о пророк!</td><td>о пророки!</td></tr>
</table><br>

<b>3. Склонение νεανίας (юноша) — тип -ας</b><br>
<table>
  <tr><th>Падеж</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод ед.</th><th>Перевод мн.</th></tr>
  <tr><td>Nom.</td><td>νεανίας</td><td>νεανίαι</td><td>юноша</td><td>юноши</td></tr>
  <tr><td>Gen.</td><td>νεανίου</td><td>νεανιῶν</td><td>юноши</td><td>юношей</td></tr>
  <tr><td>Dat.</td><td>νεανίᾳ</td><td>νεανίαις</td><td>юноше</td><td>юношам</td></tr>
  <tr><td>Acc.</td><td>νεανίαν</td><td>νεανίας</td><td>юношу</td><td>юношей</td></tr>
  <tr><td>Voc.</td><td>νεανία</td><td>νεανίαι</td><td>о юноша!</td><td>о юноши!</td></tr>
</table><br>
<i>Особенности:</i> в родительном падеже единственного числа окончание <b>-ου</b> (как у 2-го склонения), а в звательном — <b>-α</b>.<br><br>

<b>4. Предлоги и их употребление (основные для этого урока)</b><br>
<table>
  <tr><th>Предлог</th><th>Падеж</th><th>Значение</th><th>Пример</th></tr>
  <tr><td>ἀπό</td><td>+ Gen.</td><td>от</td><td>ἀπὸ τοῦ οἴκου — от дома</td></tr>
  <tr><td>διά</td><td>+ Gen.</td><td>через, сквозь</td><td>διὰ τῆς ἐρήμου — через пустыню</td></tr>
  <tr><td>διά</td><td>+ Acc.</td><td>из-за, вследствие</td><td>διὰ τὴν ἀλήθειαν — из-за истины</td></tr>
  <tr><td>εἰς</td><td>+ Acc.</td><td>в (куда)</td><td>εἰς τὸν οἶκον — в дом</td></tr>
  <tr><td>ἐκ</td><td>+ Gen.</td><td>из</td><td>ἐκ τοῦ οἴκου — из дома</td></tr>
  <tr><td>ἐν</td><td>+ Dat.</td><td>в (где)</td><td>ἐν τῷ οἴκῳ — в доме</td></tr>
  <tr><td>μετά</td><td>+ Gen.</td><td>с (кем)</td><td>μετὰ τῶν μαθητῶν — с учениками</td></tr>
  <tr><td>μετά</td><td>+ Acc.</td><td>после</td><td>μετὰ τὸν κύριον — после Господа</td></tr>
  <tr><td>πρός</td><td>+ Acc.</td><td>к</td><td>πρὸς τὸν θεόν — к Богу</td></tr>
</table><br>
<i>Важно:</i> перед гласными предлог <b>ἐκ</b> принимает форму <b>ἐξ</b> (например, ἐξ οἴκου — из дома).<br><br>

<b>5. Особенности ударения</b><br>
• У слов типа προφήτης и νεανίας в Gen. Pl. ударение переходит на окончание (περισπώμενον): προφητῶν, νεανιῶν.<br>
• В Dat. Pl. ударение падает на третий слог от конца: προφήταις, νεανίαις.`,
        vocabulary: [
            {greek:"ἄγγελος", article:"ὁ", translation:"ангел, вестник", type:"noun", declension_forms:{singular:{nom:"ἄγγελος",gen:"ἀγγέλου",dat:"ἀγγέλῳ",acc:"ἄγγελον",voc:"ἄγγελε"},plural:{nom:"ἄγγελοι",gen:"ἀγγέλων",dat:"ἀγγέλοις",acc:"ἀγγέλους",voc:"ἄγγελοι"}}},
            {greek:"ἄγω", translation:"веду", type:"verb", declension_forms:{singular:{"1":"ἄγω","2":"ἄγεις","3":"ἄγει"},plural:{"1":"ἄγομεν","2":"ἄγετε","3":"ἄγουσι(ν)"}}},
            {greek:"ἀπό", translation:"от (с Gen.)", type:"preposition"},
            {greek:"βάλλω", translation:"бросаю", type:"verb", declension_forms:{singular:{"1":"βάλλω","2":"βάλλεις","3":"βάλλει"},plural:{"1":"βάλλομεν","2":"βάλλετε","3":"βάλλουσι(ν)"}}},
            {greek:"βαπτιστής", article:"ὁ", translation:"креститель", type:"noun", declension_forms:{singular:{nom:"βαπτιστής",gen:"βαπτιστοῦ",dat:"βαπτιστῇ",acc:"βαπτιστήν",voc:"βαπτιστά"},plural:{nom:"βαπτισταί",gen:"βαπτιστῶν",dat:"βαπτισταῖς",acc:"βαπτιστάς",voc:"βαπτισταί"}}},
            {greek:"διά", translation:"через, сквозь (с Gen.); из-за, ради (с Acc.)", type:"preposition"},
            {greek:"θεός", article:"ὁ", translation:"Бог", type:"noun", declension_forms:{singular:{nom:"θεός",gen:"θεοῦ",dat:"θεῷ",acc:"θεόν",voc:"θεέ"},plural:{nom:"θεοί",gen:"θεῶν",dat:"θεοῖς",acc:"θεούς",voc:"θεοί"}}},
            {greek:"κόσμος", article:"ὁ", translation:"мир, вселенная", type:"noun", declension_forms:{singular:{nom:"κόσμος",gen:"κόσμου",dat:"κόσμῳ",acc:"κόσμον",voc:"κόσμε"},plural:{nom:"κόσμοι",gen:"κόσμων",dat:"κόσμοις",acc:"κόσμους",voc:"κόσμοι"}}},
            {greek:"λίθος", article:"ὁ", translation:"камень", type:"noun", declension_forms:{singular:{nom:"λίθος",gen:"λίθου",dat:"λίθῳ",acc:"λίθον",voc:"λίθε"},plural:{nom:"λίθοι",gen:"λίθων",dat:"λίθοις",acc:"λίθους",voc:"λίθοι"}}},
            {greek:"μαθητής", article:"ὁ", translation:"ученик", type:"noun", declension_forms:{singular:{nom:"μαθητής",gen:"μαθητοῦ",dat:"μαθητῇ",acc:"μαθητήν",voc:"μαθητά"},plural:{nom:"μαθηταί",gen:"μαθητῶν",dat:"μαθηταῖς",acc:"μαθητάς",voc:"μαθηταί"}}},
            {greek:"μένω", translation:"остаюсь, пребываю", type:"verb", declension_forms:{singular:{"1":"μένω","2":"μένεις","3":"μένει"},plural:{"1":"μένομεν","2":"μένετε","3":"μένουσι(ν)"}}},
            {greek:"μετά", translation:"с, вместе с (с Gen.); после (с Acc.)", type:"preposition"},
            {greek:"νεανίας", article:"ὁ", translation:"юноша", type:"noun", declension_forms:{singular:{nom:"νεανίας",gen:"νεανίου",dat:"νεανίᾳ",acc:"νεανίαν",voc:"νεανία"},plural:{nom:"νεανίαι",gen:"νεανιῶν",dat:"νεανίαις",acc:"νεανίας",voc:"νεανίαι"}}},
            {greek:"οὐρανός", article:"ὁ", translation:"небо", type:"noun", declension_forms:{singular:{nom:"οὐρανός",gen:"οὐρανοῦ",dat:"οὐρανῷ",acc:"οὐρανόν",voc:"οὐρανέ"},plural:{nom:"οὐρανοί",gen:"οὐρανῶν",dat:"οὐρανοῖς",acc:"οὐρανούς",voc:"οὐρανοί"}}},
            {greek:"πέμπω", translation:"посылаю", type:"verb", declension_forms:{singular:{"1":"πέμπω","2":"πέμπεις","3":"πέμπει"},plural:{"1":"πέμπομεν","2":"πέμπετε","3":"πέμπουσι(ν)"}}},
            {greek:"πρός", translation:"к (с Acc.)", type:"preposition"},
            {greek:"προφήτης", article:"ὁ", translation:"пророк", type:"noun", declension_forms:{singular:{nom:"προφήτης",gen:"προφήτου",dat:"προφήτῃ",acc:"προφήτην",voc:"προφῆτα"},plural:{nom:"προφῆται",gen:"προφητῶν",dat:"προφήταις",acc:"προφήτας",voc:"προφῆται"}}},
            {greek:"τέκνον", article:"τό", translation:"ребенок, дитя", type:"noun", declension_forms:{singular:{nom:"τέκνον",gen:"τέκνου",dat:"τέκνῳ",acc:"τέκνον",voc:"τέκνον"},plural:{nom:"τέκνα",gen:"τέκνων",dat:"τέκνοις",acc:"τέκνα",voc:"τέκνα"}}},
            {greek:"φέρω", translation:"несу, приношу", type:"verb", declension_forms:{singular:{"1":"φέρω","2":"φέρεις","3":"φέρει"},plural:{"1":"φέρομεν","2":"φέρετε","3":"φέρουσι(ν)"}}}
        ],
        exercises: {
    declension_fill: [
        {case:"gen_sg", word:"προφήτης", translation:"пророк", correct:"προφήτου", distractors:["προφητῶν","προφήτῃ","προφήτην"]},
        {case:"dat_sg", word:"προφήτης", translation:"пророк", correct:"προφήτῃ", distractors:["προφήτου","προφήταις","προφήτην"]},
        {case:"acc_sg", word:"προφήτης", translation:"пророк", correct:"προφήτην", distractors:["προφήτου","προφήτῃ","προφῆτα"]},
        {case:"nom_pl", word:"προφήτης", translation:"пророк", correct:"προφῆται", distractors:["προφήτας","προφητῶν","προφήταις"]},
        {case:"gen_pl", word:"προφήτης", translation:"пророк", correct:"προφητῶν", distractors:["προφήτου","προφήταις","προφῆται"]},
        {case:"dat_pl", word:"προφήτης", translation:"пророк", correct:"προφήταις", distractors:["προφητῶν","προφήτῃ","προφήτας"]},
        {case:"acc_pl", word:"προφήτης", translation:"пророк", correct:"προφήτας", distractors:["προφήταις","προφητῶν","προφῆται"]},
        {case:"gen_sg", word:"ἄγγελος", translation:"ангел", correct:"ἀγγέλου", distractors:["ἀγγέλῳ","ἄγγελον","ἄγγελοι"]},
        {case:"dat_sg", word:"βαπτιστής", translation:"креститель", correct:"βαπτιστῇ", distractors:["βαπτιστοῦ","βαπτιστήν","βαπτιστά"]},
        {case:"acc_sg", word:"θεός", translation:"Бог", correct:"θεόν", distractors:["θεοῦ","θεῷ","θεέ"]},
        {case:"nom_pl", word:"κόσμος", translation:"мир", correct:"κόσμοι", distractors:["κόσμους","κόσμων","κόσμοις"]},
        {case:"gen_pl", word:"λίθος", translation:"камень", correct:"λίθων", distractors:["λίθοις","λίθους","λίθοι"]},
        {case:"dat_pl", word:"μαθητής", translation:"ученик", correct:"μαθηταῖς", distractors:["μαθητῶν","μαθητάς","μαθηταί"]},
        {case:"acc_sg", word:"νεανίας", translation:"юноша", correct:"νεανίαν", distractors:["νεανίου","νεανίᾳ","νεανία"]},
        {case:"gen_sg", word:"οὐρανός", translation:"небо", correct:"οὐρανοῦ", distractors:["οὐρανῷ","οὐρανόν","οὐρανέ"]},
        {case:"dat_sg", word:"τέκνον", translation:"дитя", correct:"τέκνῳ", distractors:["τέκνου","τέκνον","τέκνα"]}
    ],
    translate_greek_to_russian: [
        {greek:"ὁ προφήτης", keywords:["пророк"]},
        {greek:"τοῦ ἀγγέλου", keywords:["ангела"]},
        {greek:"τῷ θεῷ", keywords:["Богу"]},
        {greek:"τὸν κόσμον", keywords:["мир"]},
        {greek:"οἱ μαθηταί", keywords:["ученики"]},
        {greek:"τῶν οὐρανῶν", keywords:["небес"]},
        {greek:"ὁ ἄγγελος", keywords:["ангел"]},
        {greek:"ὁ βαπτιστής", keywords:["креститель"]},
        {greek:"ὁ θεός", keywords:["Бог"]},
        {greek:"ὁ κόσμος", keywords:["мир"]},
        {greek:"ὁ λίθος", keywords:["камень"]},
        {greek:"ὁ μαθητής", keywords:["ученик"]},
        {greek:"ὁ νεανίας", keywords:["юноша"]},
        {greek:"ὁ οὐρανός", keywords:["небо"]},
        {greek:"τὸ τέκνον", keywords:["дитя"]},
        // Глаголы и предлоги урока
        {greek:"ἄγω τὸν μαθητήν", keywords:["веду","ученик"]},
        {greek:"βάλλω τὸν λίθον", keywords:["бросаю","камень"]},
        {greek:"μένω ἐν τῷ οἴκῳ", keywords:["остаюсь","дом"]},
        {greek:"πέμπω τὸν ἄγγελον", keywords:["посылаю","ангел"]},
        {greek:"φέρω τὰ τέκνα", keywords:["дет"]},
        {greek:"διὰ τοῦ κόσμου", keywords:["через","мир"]},
        {greek:"μετὰ τῶν μαθητῶν", keywords:["ученик"]}
    ],
    translate_russian_to_greek: [
        {russian:"пророк", correct_sequence:["προφήτης"], all_words:["προφήτης","μαθητής","ἄγγελος"]},
        {russian:"юноши (Gen.)", correct_sequence:["νεανίου"], all_words:["νεανίου","νεανίαν","νεανίαις"]},
        {russian:"к Богу", correct_sequence:["πρὸς","τὸν","θεόν"], all_words:["πρὸς","τὸν","θεόν","ἀπό","τοῦ"]},
        {russian:"ангел", correct_sequence:["ἄγγελος"], all_words:["ἄγγελος","βαπτιστής","θεός","κόσμος"]},
        {russian:"креститель", correct_sequence:["βαπτιστής"], all_words:["βαπτιστής","προφήτης","μαθητής","νεανίας"]},
        {russian:"Бог", correct_sequence:["θεός"], all_words:["θεός","κόσμος","οὐρανός","λίθος"]},
        {russian:"мир", correct_sequence:["κόσμος"], all_words:["κόσμος","οὐρανός","λίθος","ἄγγελος"]},
        {russian:"камень", correct_sequence:["λίθος"], all_words:["λίθος","θεός","κόσμος","οὐρανός"]},
        {russian:"ученик", correct_sequence:["μαθητής"], all_words:["μαθητής","προφήτης","βαπτιστής","νεανίας"]},
        {russian:"юноша", correct_sequence:["νεανίας"], all_words:["νεανίας","μαθητής","προφήτης","βαπτιστής"]},
        {russian:"небо", correct_sequence:["οὐρανός"], all_words:["οὐρανός","κόσμος","λίθος","θεός"]},
        {russian:"дитя", correct_sequence:["τέκνον"], all_words:["τέκνον","ἄγγελος","μαθητής","νεανίας"]},
        {russian:"я веду", correct_sequence:["ἄγω"], all_words:["ἄγω","βάλλω","μένω","πέμπω"]},
        {russian:"я бросаю", correct_sequence:["βάλλω"], all_words:["βάλλω","ἄγω","φέρω","μένω"]},
        {russian:"я остаюсь", correct_sequence:["μένω"], all_words:["μένω","ἄγω","πέμπω","βάλλω"]},
        {russian:"я посылаю", correct_sequence:["πέμπω"], all_words:["πέμπω","φέρω","ἄγω","μένω"]},
        {russian:"я несу (приношу)", correct_sequence:["φέρω"], all_words:["φέρω","πέμπω","βάλλω","ἄγω"]},
        {russian:"через мир", correct_sequence:["διὰ","τοῦ","κόσμου"], all_words:["διὰ","τοῦ","κόσμου","μετὰ","τῶν","μαθητῶν"]},
        {russian:"с учениками", correct_sequence:["μετὰ","τῶν","μαθητῶν"], all_words:["μετὰ","τῶν","μαθητῶν","διὰ","τοῦ","κόσμου"]}
    ],
    case_number: [
        {form:"προφήτῃ", correct:"Dat. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Acc. Sg."]},
        {form:"ἀγγέλων", correct:"Gen. Pl.", distractors:["Dat. Pl.","Acc. Pl.","Nom. Pl."]},
        {form:"προφῆται", correct:"Nom. Pl.", distractors:["Gen. Pl.","Dat. Pl.","Acc. Pl."]},
        {form:"μαθηταῖς", correct:"Dat. Pl.", distractors:["Nom. Pl.","Gen. Pl.","Acc. Pl."]},
        {form:"θεοῦ", correct:"Gen. Sg.", distractors:["Dat. Sg.","Acc. Sg.","Nom. Sg."]},
        {form:"τέκνα", correct:"Nom./Acc. Pl.", distractors:["Nom. Sg.","Gen. Pl.","Dat. Pl."]},
        {form:"νεανίαν", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]},
        {form:"λίθοις", correct:"Dat. Pl.", distractors:["Gen. Pl.","Acc. Pl.","Nom. Pl."]},
        {form:"βαπτιστά", correct:"Voc. Sg.", distractors:["Nom. Sg.","Acc. Sg.","Gen. Sg."]}
    ]
},
translation: {
    ru_to_el: [
        { source: "В мире мы имеем смерть, а в Церкви жизнь.", correct: ["ἐν","τῷ","κόσμῳ","ἔχομεν","θάνατον","ἐν","δὲ","τῇ","ἐκκλησίᾳ","ζωήν"] },
        { source: "Хорошая (женщина) посылает девушку и детей к великим пророкам.", correct: ["ἡ","ἀγαθὴ","γυνὴ","πέμπει","τὴν","παρθένον","καὶ","τὰ","τέκνα","πρὸς","τοὺς","μεγάλους","προφήτας"] },
        { source: "Малое дитя бросает камень в красивый дом.", correct: ["τὸ","μικρὸν","παιδίον","βάλλει","τὸν","λίθον","εἰς","τὸν","καλὸν","οἶκον"] },
        { source: "Креститель говорит хорошее слово юношам и ведёт учеников к Господу.", correct: ["ὁ","βαπτιστής","λέγει","τὸν","ἀγαθὸν","λόγον","τοῖς","νεανίαις","καὶ","ἄγει","τοὺς","μαθητὰς","πρὸς","τὸν","κύριον"] },
        { source: "Ученики пребывают в Церкви и говорят притчу другим.", correct: ["οἱ","μαθηταὶ","μένουσιν","ἐν","τῇ","ἐκκλησίᾳ","καὶ","λέγουσι","παραβολὴν","τοῖς","ἄλλοις"] },
        { source: "Через голос пророка Господь учит учеников.", correct: ["διὰ","τῆς","φωνῆς","τοῦ","προφήτου","ὁ","κύριος","διδάσκει","τοὺς","μαθητάς"] },
        { source: "Вследствие (из-за) заповедей Бога ученики пишут братьям хорошие слова.", correct: ["διὰ","τὰς","ἐντολὰς","τοῦ","θεοῦ","οἱ","μαθηταὶ","γράφουσι","τοῖς","ἀδελφοῖς","τοὺς","ἀγαθούς","λόγους"] },
        { source: "Ради (из-за) детей пророк посылает плохих юношей в пустыню.", correct: ["διὰ","τὰ","τέκνα","ὁ","προφήτης","πέμπει","τοὺς","κακοὺς","νεανίας","εἰς","τὴν","ἔρημον"] },
        { source: "После Господа апостол ведёт учеников.", correct: ["μετὰ","τὸν","κύριον","ὁ","ἀπόστολος","ἄγει","τοὺς","μαθητάς"] },
        { source: "Пророки учат юношей с детьми.", correct: ["οἱ","προφῆται","διδάσκουσι","τοὺς","νεανίας","σὺν","τοῖς","τέκνοις"] },
        { source: "Хорошие (женщины) несут детей к Господу, а плохие ведут в мир.", correct: ["αἱ","ἀγαθαὶ","φέρουσι","τὰ","τέκνα","πρὸς","τὸν","κύριον","αἱ","δὲ","κακαὶ","ἄγουσι","εἰς","τὸν","κόσμον"] },
        { source: "Господь с пророком пребывают в другом месте.", correct: ["ὁ","κύριος","μετὰ","τοῦ","προφήτου","μένουσιν","ἐν","ἄλλῳ","τόπῳ"] },
        { source: "Праведники ведут учеников через пустыню к Господу.", correct: ["οἱ","δίκαιοι","ἄγουσι","τοὺς","μαθητὰς","διὰ","τῆς","ἐρήμου","πρὸς","τὸν","κύριον"] },
        { source: "Мы видим жизнь Сына Божиего в этом мире.", correct: ["βλέπομεν","τὴν","ζωὴν","τοῦ","υἱοῦ","τοῦ","θεοῦ","ἐν","τούτῳ","τῷ","κόσμῳ"] },
        { source: "Ты плох, Церковь хороша.", correct: ["σὺ","κακὸς","εἶ","ἡ","δὲ","ἐκκλησία","καλή"] },
        { source: "Через слово Божие Господь воскрешает мёртвых.", correct: ["διὰ","τοῦ","λόγου","τοῦ","θεοῦ","ὁ","κύριος","ἐγείρει","τοὺς","νεκρούς"] }
    ],
    el_to_ru: [
    {source:"οἱ μαθηταὶ τῶν προφητῶν μένουσιν ἐν τῷ κόσμῳ.", correct:"Ученики пророков пребывают в мире."},
    {source:"οἱ κακοὶ βάλλουσι λίθους εἰς τὸν οἶκον τῶν μαθητῶν.", correct:"Злые бросают камни в дом учеников."},
    {source:"ὁ θεὸς πέμπει τοὺς ἀγγέλους εἰς τὸν κόσμον.", correct:"Бог посылает ангелов в мир."},
    {source:"ὁ προφήτης πέμπει τοὺς μαθητὰς τοῦ κυρίου ἐκ τῶν οἴκων εἰς τὴν ἐκκλησίαν.", correct:"Пророк посылает учеников Господа из домов в церковь."},
    {source:"ὁ θεὸς ἐγείρει τοὺς νεκροὺς ἐκ θανάτου.", correct:"Бог воскрешает мёртвых из смерти."},
    {source:"λαμβάνετε τὰ καλὰ δῶρα ἀπὸ τῶν παρθένων.", correct:"Вы берёте хорошие дары от дев."},
    {source:"ἄγομεν τὰ τέκνα ἐκ τῶν οἴκων.", correct:"Мы ведём детей из домов."},
    {source:"μετὰ τοὺς ἀγγέλους πέμπει ὁ θεὸς τὸν υἱόν.", correct:"После ангелов Бог посылает Сына."},
    {source:"μετὰ τῶν ἀγγέλων ἄγει ὁ κύριος τοὺς δικαίους εἰς τὸν οὐρανόν.", correct:"С ангелами Господь ведёт праведных на небо."},
    {source:"διὰ τῶν ὁδῶν τῆς ἐρήμου φέρουσιν οἱ δοῦλοι τὰ δῶρα εἰς ἄλλον τόπον.", correct:"Через дороги пустыни рабы несут дары в другое место."},
    {source:"διὰ τῶν γραφῶν τῶν προφητῶν γινώσκομεν τὸν κύριον.", correct:"Через писания пророков мы знаем Господа."},
    {source:"διὰ τὴν δόξαν τοῦ θεοῦ ἐγείρει ὁ κύριος τοὺς νεκρούς.", correct:"Ради славы Божией Господь воскрешает мёртвых."},
    {source:"φέρουσι τοὺς νεκροὺς εἰς τὴν ἔρημον.", correct:"Они несут мёртвых в пустыню."},
    {source:"οἱ μαθηταὶ διδάσκουσι τὰ ἀγαθὰ τέκνα ἐν τῇ ἐκκλησίᾳ.", correct:"Ученики учат добрых детей в церкви."},
    {source:"ὁ κύριος λέγει παραβολὴν τοῖς μαθηταῖς ἐν τῷ ἱερῷ.", correct:"Господь говорит притчу ученикам в храме."},
    {source:"διὰ τὴν ἀλήθειαν βλέπουσιν οἱ προφῆται τὸν θάνατον.", correct:"Ради истины пророки видят смерть."},
    {source:"ἀπὸ τῆς ἐρήμου ἄγουσιν οἱ βαπτισταὶ τοὺς ἀγαθοὺς νεανίας καὶ τοὺς υἱοὺς τῶν προφητῶν πρὸς τοὺς μικροὺς οἴκους τῶν μαθητῶν.", correct:"Из пустыни крестители ведут добрых юношей и сыновей пророков к малым домам учеников."},
    {source:"διὰ τὴν βασιλείαν τοῦ θεοῦ φέρομεν τὰ κακά.", correct:"Ради Царства Божия мы несём беды."},
    {source:"διὰ τὰς ψυχὰς τῶν ἀδελφῶν βλέπει κακά.", correct:"Из-за душ братьев он видит плохое."},
    {source:"καλὸς ὁ οὐρανός, κακὸς ὁ κόσμος.", correct:"Небо хорошо, мир плох."},
    {source:"οἱ νεανίαι βλέπουσι τὸν βαπτιστὴν ἐν τῇ ἐρήμῳ.", correct:"Юноши видят крестителя в пустыне."}
    ]
    }
},
    8: {
title: "Энклитики, проклитики, местоимения",
grammar: `<b>1. Энклитики и проклитики</b><br>
<b>Энклитики</b> — односложные или двусложные слова, которые теряют ударение и примыкают к предыдущему слову. В греческом языке к энклитикам относятся: μου, μοι, με; σου, σοι, σε; ἐστί(ν), εἰσί(ν); τις, τι; που, ποτε и др.<br><br>
<b>Проклитики</b> — безударные слова, которые образуют единство с последующим словом. К проклитикам относятся: ὁ, ἡ, οἱ, αἱ; εἰς, ἐκ, ἐν; οὐ (οὐκ, οὐχ); ὡς; εἰ.<br><br>
<b>Правила ударения для энклитик:</b><br>
1. Слово перед энклитикой НЕ меняет острое ударение на тупое: ἀδελφός μου (не ἀδελφὸς μου).<br>
2. Если слово имеет острое ударение на третьем от конца слоге или облеченное на предпоследнем, оно получает дополнительное острое ударение на последнем слоге: ἄνθρωπός τις, δῶρόν σου.<br>
3. Если перед энклитикой стоит проклитика или энклитика, она получает острое ударение: ἄνθρωπός μου ἐστίν.<br>
4. Двусложная энклитика сохраняет ударение после слова с острым ударением на втором слоге: λόγος ἐστίν.<br>
5. Энклитика сохраняет ударение, если на ней стоит логическое ударение или с неё начинается предложение.<br><br>

<b>2. Глагол εἰμί (быть) — спряжение в настоящем времени</b><br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>εἰμί</td><td>ἐσμέν</td><td>я есмь / мы есмы</td></tr>
  <tr><td>2-е</td><td>εἶ</td><td>ἐστέ</td><td>ты еси / вы есте</td></tr>
  <tr><td>3-е</td><td>ἐστί(ν)</td><td>εἰσί(ν)</td><td>он есть / они суть</td></tr>
</table><br>

<b>3. Личные местоимения</b><br>
<b>Единственное число:</b><br>
<table>
  <tr><th>Падеж</th><th>1-е л.</th><th>2-е л.</th><th>3-е л. м.</th><th>3-е л. ж.</th><th>3-е л. ср.</th><th>Перевод</th></tr>
  <tr><td>Nom.</td><td>ἐγώ</td><td>σύ</td><td>αὐτός</td><td>αὐτή</td><td>αὐτό</td><td>я / ты / сам(а)</td></tr>
  <tr><td>Gen.</td><td>μου</td><td>σου</td><td>αὐτοῦ</td><td>αὐτῆς</td><td>αὐτοῦ</td><td>меня / тебя / его</td></tr>
  <tr><td>Dat.</td><td>μοι</td><td>σοι</td><td>αὐτῷ</td><td>αὐτῇ</td><td>αὐτῷ</td><td>мне / тебе / ему</td></tr>
  <tr><td>Acc.</td><td>με</td><td>σε</td><td>αὐτόν</td><td>αὐτήν</td><td>αὐτό</td><td>меня / тебя / его</td></tr>
</table><br>
<b>Множественное число:</b><br>
<table>
  <tr><th>Падеж</th><th>1-е л.</th><th>2-е л.</th><th>3-е л. м.</th><th>3-е л. ж.</th><th>3-е л. ср.</th><th>Перевод</th></tr>
  <tr><td>Nom.</td><td>ἡμεῖς</td><td>ὑμεῖς</td><td>αὐτοί</td><td>αὐταί</td><td>αὐτά</td><td>мы / вы / они</td></tr>
  <tr><td>Gen.</td><td>ἡμῶν</td><td>ὑμῶν</td><td>αὐτῶν</td><td>αὐτῶν</td><td>αὐτῶν</td><td>нас / вас / их</td></tr>
  <tr><td>Dat.</td><td>ἡμῖν</td><td>ὑμῖν</td><td>αὐτοῖς</td><td>αὐταῖς</td><td>αὐτοῖς</td><td>нам / вам / им</td></tr>
  <tr><td>Acc.</td><td>ἡμᾶς</td><td>ὑμᾶς</td><td>αὐτούς</td><td>αὐτάς</td><td>αὐτά</td><td>нас / вас / их</td></tr>
</table><br>

<b>4. Определённый артикль (ὁ, ἡ, τό)</b><br>
<table>
  <tr><th>Падеж</th><th>Муж. р.</th><th>Жен. р.</th><th>Ср. р.</th><th>Перевод</th></tr>
  <tr><td>Nom.</td><td>ὁ</td><td>ἡ</td><td>τό</td><td>муж./жен./ср.</td></tr>
  <tr><td>Gen.</td><td>τοῦ</td><td>τῆς</td><td>τοῦ</td><td>кого? чего?</td></tr>
  <tr><td>Dat.</td><td>τῷ</td><td>τῇ</td><td>τῷ</td><td>кому? чему?</td></tr>
  <tr><td>Acc.</td><td>τόν</td><td>τήν</td><td>τό</td><td>кого? что?</td></tr>
</table><br>
<b>Множественное число:</b><br>
<table>
  <tr><th>Падеж</th><th>Муж. р.</th><th>Жен. р.</th><th>Ср. р.</th><th>Перевод</th></tr>
  <tr><td>Nom.</td><td>οἱ</td><td>αἱ</td><td>τά</td><td>муж./жен./ср.</td></tr>
  <tr><td>Gen.</td><td>τῶν</td><td>τῶν</td><td>τῶν</td><td>кого? чего?</td></tr>
  <tr><td>Dat.</td><td>τοῖς</td><td>ταῖς</td><td>τοῖς</td><td>кому? чему?</td></tr>
  <tr><td>Acc.</td><td>τούς</td><td>τάς</td><td>τά</td><td>кого? что?</td></tr>
</table><br>

<b>5. Три правила употребления местоимений с артиклем</b><br>
<br>
<b>Правило 1: Артикль перед местоимением (атрибутивная позиция)</b><br>
Когда артикль стоит ПЕРЕД местоимением, оно выступает в роли прилагательного (атрибута).<br>
Например: <i>ὁ ἐμός</i> — «мой» (в значении «мой [человек/предмет]»).<br>
Это означает, что местоимение согласуется с артиклем в роде, числе и падеже.<br><br>

<b>Правило 2: Артикль после местоимения (предикативная позиция)</b><br>
Когда артикль стоит ПОСЛЕ местоимения, оно выступает в роли сказуемого (предикатива).<br>
Например: <i>ἐμός ὁ</i> — «это мой» (в значении «мой — тот, который»).<br>
Это встречается реже, обычно с притяжательными местоимениями.<br><br>

<b>Правило 3: Артикль в начале и в конце (субстантивация местоимения)</b><br>
Когда местоимение стоит между двумя артиклями: <i>ὁ ἐμός ὁ</i> — «тот, который мой» или «мой же».<br>
Например: <i>ὁ ἐμός ὁ</i> — «тот, который мой» (с усилением).<br>
Такая конструкция используется для выделения или противопоставления.<br><br>

<b>Примечание:</b> В косвенных падежах местоимение <b>αὐτός</b> употребляется как личное местоимение (он, она, оно), а в именительном падеже — как «сам». С артиклем оно означает «тот же самый» (ὁ αὐτός — тот же самый).`,
  vocabulary: [
  {
    greek: "εἰμί",
    translation: "(я) есмь",
    type: "verb",
    declension_forms: {singular: {"1":"εἰμί","2":"εἶ","3":"ἐστί(ν)"}, plural: {"1":"ἐσμέν","2":"ἐστέ","3":"εἰσί(ν)"}},
    caseTranslations: {
      singular: {
        "1": "я есмь",
        "2": "ты еси",
        "3": "он / она / оно есть"
      },
      plural: {
        "1": "мы есмы",
        "2": "вы есте",
        "3": "они суть"
      }
    }
  },
  {
    greek: "ἐγώ",
    translation: "я",
    type: "pronoun",
    declension_forms: { singular: { nom: "ἐγώ", gen: "μου", dat: "μοι", acc: "με" } },
    caseTranslations: {
      singular: {
        nom: "я",
        gen: "меня",
        dat: "мне",
        acc: "меня"
      }
    }
  },
  {
    greek: "σύ",
    translation: "ты",
    type: "pronoun",
    declension_forms: { singular: { nom: "σύ", gen: "σου", dat: "σοι", acc: "σε" } },
    caseTranslations: {
      singular: {
        nom: "ты",
        gen: "тебя",
        dat: "тебе",
        acc: "тебя"
      }
    }
  },
  {
    greek: "αὐτός, ή, ό",
    translation: "сам (в косв. падежах — он, она, оно)",
    type: "pronoun",
    declension_forms: {
      masculine: {
        singular: { nom: "αὐτός", gen: "αὐτοῦ", dat: "αὐτῷ", acc: "αὐτόν" },
        plural: { nom: "αὐτοί", gen: "αὐτῶν", dat: "αὐτοῖς", acc: "αὐτούς" }
      },
      feminine: {
        singular: { nom: "αὐτή", gen: "αὐτῆς", dat: "αὐτῇ", acc: "αὐτήν" },
        plural: { nom: "αὐταί", gen: "αὐτῶν", dat: "αὐταῖς", acc: "αὐτάς" }
      },
      neuter: {
        singular: { nom: "αὐτό", gen: "αὐτοῦ", dat: "αὐτῷ", acc: "αὐτό" },
        plural: { nom: "αὐτά", gen: "αὐτῶν", dat: "αὐτοῖς", acc: "αὐτά" }
      }
    },
    caseTranslations: {
      singular: {
        nom: "сам / сама / само",
        gen: "его / её",
        dat: "ему / ей",
        acc: "его / её"
      },
      plural: {
        nom: "сами",
        gen: "их",
        dat: "им",
        acc: "их"
      }
    }
  },
  {
    greek: "ἡμεῖς",
    translation: "мы",
    type: "pronoun",
    declension_forms: { plural: { nom: "ἡμεῖς", gen: "ἡμῶν", dat: "ἡμῖν", acc: "ἡμᾶς" } },
    caseTranslations: {
      plural: {
        nom: "мы",
        gen: "нас",
        dat: "нам",
        acc: "нас"
      }
    }
  },
  {
    greek: "ὑμεῖς",
    translation: "вы",
    type: "pronoun",
    declension_forms: { plural: { nom: "ὑμεῖς", gen: "ὑμῶν", dat: "ὑμῖν", acc: "ὑμᾶς" } },
    caseTranslations: {
      plural: {
        nom: "вы",
        gen: "вас",
        dat: "вам",
        acc: "вас"
      }
    }
  },
  {
    greek: "δέ",
    translation: "же, а, но",
    type: "particle"
  },
  {
    greek: "δεσπότης",
    article: "ὁ",
    translation: "господин",
    type: "noun",
    declension_forms: {
      singular: { nom: "δεσπότης", gen: "δεσπότου", dat: "δεσπότῃ", acc: "δεσπότην", voc: "δεσπότα" },
      plural: { nom: "δεσπόται", gen: "δεσποτῶν", dat: "δεσπόταις", acc: "δεσπότας", voc: "δεσπόται" }
    }
  },
  {
    greek: "κριτής",
    article: "ὁ",
    translation: "судья",
    type: "noun",
    declension_forms: {
      singular: { nom: "κριτής", gen: "κριτοῦ", dat: "κριτῇ", acc: "κριτήν", voc: "κριτά" },
      plural: { nom: "κριταί", gen: "κριτῶν", dat: "κριταῖς", acc: "κριτάς", voc: "κριταί" }
    }
  },
  {
    greek: "τελώνης",
    article: "ὁ",
    translation: "мытарь, сборщик податей",
    type: "noun",
    declension_forms: {
      singular: { nom: "τελώνης", gen: "τελώνου", dat: "τελώνῃ", acc: "τελώνην", voc: "τελώνᾱ" },
      plural: { nom: "τελῶναι", gen: "τελωνῶν", dat: "τελώναις", acc: "τελώνας", voc: "τελῶναι" }
    }
  }
],
exercises: {
    // ===== СКЛОНЕНИЕ =====
    declension_fill: [
        // εἰμί (глагол — все лица)
        {case:"1sg", word:"εἰμί", translation:"быть", correct:"εἰμί", distractors:["εἶ","ἐστί","ἐσμέν"]},
        {case:"2sg", word:"εἰμί", translation:"быть", correct:"εἶ", distractors:["εἰμί","ἐστί","ἐστέ"]},
        {case:"3sg", word:"εἰμί", translation:"быть", correct:"ἐστί(ν)", distractors:["εἰμί","εἶ","εἰσί"]},
        {case:"1pl", word:"εἰμί", translation:"быть", correct:"ἐσμέν", distractors:["ἐστέ","εἰσί","εἰμί"]},
        {case:"2pl", word:"εἰμί", translation:"быть", correct:"ἐστέ", distractors:["ἐσμέν","εἰσί","εἶ"]},
        {case:"3pl", word:"εἰμί", translation:"быть", correct:"εἰσί(ν)", distractors:["ἐσμέν","ἐστέ","ἐστί"]},
        // δεσπότης (существительное)
        {case:"gen_sg", word:"δεσπότης", translation:"господин", correct:"δεσπότου", distractors:["δεσποτῶν","δεσπότῃ","δεσπότην"]},
        {case:"dat_sg", word:"δεσπότης", translation:"господин", correct:"δεσπότῃ", distractors:["δεσπότου","δεσπόταις","δεσπότην"]},
        {case:"nom_pl", word:"δεσπότης", translation:"господин", correct:"δεσπόται", distractors:["δεσπότας","δεσποτῶν","δεσπόταις"]},
        // κριτής (существительное)
        {case:"gen_sg", word:"κριτής", translation:"судья", correct:"κριτοῦ", distractors:["κριτῶν","κριτῇ","κριτήν"]},
        {case:"dat_sg", word:"κριτής", translation:"судья", correct:"κριτῇ", distractors:["κριτοῦ","κριταῖς","κριτήν"]},
        {case:"nom_pl", word:"κριτής", translation:"судья", correct:"κριταί", distractors:["κριτάς","κριτῶν","κριταῖς"]},
        // τελώνης (существительное)
        {case:"gen_sg", word:"τελώνης", translation:"мытарь", correct:"τελώνου", distractors:["τελωνῶν","τελώνῃ","τελώνην"]},
        {case:"dat_sg", word:"τελώνης", translation:"мытарь", correct:"τελώνῃ", distractors:["τελώνου","τελώναις","τελώνην"]},
        {case:"nom_pl", word:"τελώνης", translation:"мытарь", correct:"τελῶναι", distractors:["τελώνας","τελωνῶν","τελώναις"]}
    ],

    // ===== ПЕРЕВОД С ГРЕЧЕСКОГО НА РУССКИЙ =====
    translate_greek_to_russian: [
        // Личные формы εἰμί
        {greek:"ἐγώ εἰμι", keywords:["я","есмь"]},
        {greek:"σὺ εἶ", keywords:["ты","еси"]},
        {greek:"αὐτός ἐστι", keywords:["он","есть"]},
        {greek:"ἡμεῖς ἐσμέν", keywords:["мы","есмы"]},
        {greek:"ὑμεῖς ἐστέ", keywords:["вы","есте"]},
        // Личные местоимения в косвенных падежах
        {greek:"μου", keywords:["меня"]},
        {greek:"σοι", keywords:["тебе"]},
        {greek:"αὐτόν", keywords:["его"]},
        {greek:"αὐτῇ", keywords:["ей"]},
        {greek:"ἡμᾶς", keywords:["нас"]},
        {greek:"ὑμῖν", keywords:["вам"]},
        // Существительные
        {greek:"ὁ δεσπότης", keywords:["господин"]},
        {greek:"τοῦ κριτοῦ", keywords:["судьи"]},
        {greek:"τῷ τελώνῃ", keywords:["мытарю"]},
        {greek:"τοὺς δεσπότας", keywords:["господ"]},
        // δέ — постпозитивная частица «а, же»
        {greek:"ἐγώ εἰμι κριτής, σὺ δὲ εἶ τελώνης", keywords:["судья","мытарь"]},
        {greek:"αὐτὸς μαθητής ἐστιν, ἐγὼ δὲ δεσπότης", keywords:["ученик","господин"]}
    ],

    // ===== ПЕРЕВОД С РУССКОГО НА ГРЕЧЕСКИЙ =====
    translate_russian_to_greek: [
        // εἰμί
        {russian:"я есмь", correct_sequence:["ἐγώ","εἰμι"], all_words:["ἐγώ","εἰμι","σύ","εἶ"]},
        {russian:"ты еси", correct_sequence:["σύ","εἶ"], all_words:["σύ","εἶ","ἐγώ","εἰμι"]},
        // Местоимения + предлоги
        {russian:"меня", correct_sequence:["μου"], all_words:["μου","σου","με"]},
        {russian:"тебе", correct_sequence:["σοι"], all_words:["σοι","μοι","σε"]},
        {russian:"его (Acc.)", correct_sequence:["αὐτόν"], all_words:["αὐτόν","αὐτό","αὐτοῦ"]},
        {russian:"их (Gen.)", correct_sequence:["αὐτῶν"], all_words:["αὐτῶν","αὐτοῖς","αὐτούς"]},
        // Существительные с артиклем
        {russian:"господин", correct_sequence:["ὁ","δεσπότης"], all_words:["ὁ","δεσπότης","κριτής","τελώνης"]},
        {russian:"судья", correct_sequence:["ὁ","κριτής"], all_words:["ὁ","κριτής","δεσπότης","τελώνης"]},
        {russian:"мытарь", correct_sequence:["ὁ","τελώνης"], all_words:["ὁ","τελώνης","δεσπότης","κριτής"]},
        {russian:"господина (Gen.)", correct_sequence:["τοῦ","δεσπότου"], all_words:["τοῦ","δεσπότου","κριτοῦ","τελώνου"]},
        {russian:"судье (Dat.)", correct_sequence:["τῷ","κριτῇ"], all_words:["τῷ","κριτῇ","τῷ","δεσπότῃ","τῷ","τελώνῃ"]}
    ],

    // ===== ОПРЕДЕЛЕНИЕ ПАДЕЖА И ЧИСЛА =====
    case_number: [
        // εἰμί
        {form:"λύεις", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
        {form:"λύομεν", correct:"1-е л. мн.ч.", distractors:["1-е л. ед.ч.","2-е л. мн.ч.","3-е л. мн.ч."]},
        // δεσπότης
        {form:"δεσπότην", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]},
        {form:"δεσπόται", correct:"Nom. Pl.", distractors:["Acc. Pl.","Gen. Pl.","Dat. Pl."]},
        // κριτής
        {form:"κριτοῦ", correct:"Gen. Sg.", distractors:["Acc. Sg.","Dat. Sg.","Nom. Sg."]},
        {form:"κριταί", correct:"Nom. Pl.", distractors:["Acc. Pl.","Gen. Pl.","Dat. Pl."]},
        // τελώνης
        {form:"τελώνην", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]},
        {form:"τελῶναι", correct:"Nom. Pl.", distractors:["Acc. Pl.","Gen. Pl.","Dat. Pl."]}
    ]
},
translation: {
    ru_to_el: [
        { source: "Твои ученики — в доме Господа.", correct: ["οἱ","μαθηταί","σου","εἰσιν","ἐν","τῷ","οἴκῳ","τοῦ","κυρίου"] },
        { source: "Мои братья — в пустыне.", correct: ["οἱ","ἀδελφοί","μου","εἰσιν","ἐν","τῇ","ἐρήμῳ"] },
        { source: "Пророк знает мытарей и ведёт их к судье.", correct: ["ὁ","προφήτης","γινώσκει","τοὺς","τελώνας","καὶ","ἄγει","αὐτοὺς","πρὸς","τὸν","κριτήν"] },
        { source: "Через его слово вы имеете славу.", correct: ["διὰ","τοῦ","λόγου","αὐτοῦ","ἔχετε","δόξαν"] },
        { source: "Из-за ваших детей вы знаете плохие дни.", correct: ["διὰ","τὰ","τέκνα","ὑμῶν","γινώσκετε","τὰς","κακὰς","ἡμέρας"] },
        { source: "В наши дни мир зол.", correct: ["ἐν","ταῖς","ἡμέραις","ἡμῶν","ὁ","κόσμος","πονηρός","ἐστιν"] },
        { source: "Бог знает наши души и освобождает их от смерти.", correct: ["ὁ","θεὸς","γινώσκει","τὰς","ψυχὰς","ἡμῶν","καὶ","λύει","αὐτὰς","ἀπὸ","τοῦ","θανάτου"] },
        { source: "Ты — мой сын и мой ученик.", correct: ["σὺ","εἶ","ὁ","υἱός","μου","καὶ","ὁ","μαθητής","μου"] },
        { source: "Мы — в Царстве Божием с твоими верными учениками.", correct: ["ἡμεῖς","ἐσμεν","ἐν","τῇ","βασιλεία","τοῦ","θεοῦ","μετὰ","τῶν","πιστῶν","μαθητῶν","σου"] },
        { source: "Мы говорим тебе притчу, ты же говоришь нам другое слово.", correct: ["ἡμεῖς","λέγομέν","σοι","παραβολήν","σὺ","δὲ","λέγεις","ἡμῖν","ἄλλον","λόγον"] },
        { source: "Путь плох, мы же ведём детей к Господу.", correct: ["ἡ","ὁδὸς","κακή","ἐστιν","ἡμεῖς","δὲ","ἄγομεν","τὰ","τέκνα","πρὸς","τὸν","κύριον"] },
        { source: "Мой Господь несёт для вас дары, вы же пишете Ему плохое слово.", correct: ["ὁ","κύριός","μου","φέρει","ὑμῖν","δῶρα","ὑμεῖς","δὲ","γράφετε","αὐτῷ","κακὸν","λόγον"] },
        { source: "Мои дома плохи, и ваши ученики уводят детей из него.", correct: ["οἱ","οἶκοι","μου","κακοί","εἰσιν","καὶ","οἱ","μαθηταί","σου","ἄγουσι","τὰ","τέκνα","ἐξ","αὐτοῦ"] },
        { source: "Твои ученики ведут своих братьев ко мне.", correct: ["οἱ","μαθηταί","σου","ἄγουσι","τοὺς","ἀδελφοὺς","αὐτῶν","πρός","με"] },
        { source: "Я вижу и знаю моих сыновей и веду их к Господу.", correct: ["ἐγὼ","βλέπω","καὶ","γινώσκω","τοὺς","υἱούς","μου","καὶ","ἄγω","αὐτοὺς","πρὸς","τὸν","κύριον"] },
        { source: "Бог знает Свою Церковь и ведёт её из смерти в Своё Царство.", correct: ["ὁ","θεὸς","γινώσκει","τὴν","ἐκκλησίαν","αὐτοῦ","καὶ","ἄγει","αὐτὴν","ἐκ","τοῦ","θανάτου","εἰς","τὴν","βασιλείαν","αὐτοῦ"] },
        { source: "Твои заповеди хороши и праведны и ведут нас в жизнь.", correct: ["αἱ","ἐντολαί","σου","ἀγαθαί","εἰσιν","καὶ","δίκαιαι","καὶ","ἄγουσιν","ἡμᾶς","εἰς","ζωήν"] },
        { source: "Наш Господь посылает Своих апостолов к тебе.", correct: ["ὁ","κύριός","ἡμῶν","πέμπει","τοὺς","ἀποστόλους","αὐτοῦ","πρός","σε"] },
        { source: "Мы посылаем наших слуг в ваши дома, вы же берёте от нас наши дары.", correct: ["ἡμεῖς","πέμπομεν","τοὺς","δούλους","ἡμῶν","εἰς","τοὺς","οἴκους","ὑμῶν","ὑμεῖς","δὲ","λαμβάνετε","παρ'","ἡμῶν","τὰ","δῶρα","ἡμῶν"] },
        { source: "Вы — хорошие, а ваши ученики — плохие.", correct: ["ὑμεῖς","ἀγαθοί","ἐστε","οἱ","δὲ","μαθηταί","ὑμῶν","κακοί"] }
    ],
    el_to_ru: [
    {source:"οἱ μαθηταί σου γινώσκουσι τὴν βασιλείαν καὶ ἄγουσι τοὺς ἀδελφοὺς αὐτῶν εἰς αὐτήν.", correct:"Твои ученики знают царство и ведут своих братьев в него."},
    {source:"διδάσκω τοὺς κριτάς μου καὶ λέγω αὐτοῖς παραβολήν.", correct:"Я учу моих судей и говорю им притчу."},
    {source:"ἄγει με ὁ κύριος πρὸς τοὺς μαθητὰς αὐτοῦ.", correct:"Господь ведёт меня к своим ученикам."},
    {source:"δι' ἐμὲ βλέπεις σὺ τὸν θάνατον, σοὶ δὲ ἐγὼ λέγω λόγους κακούς.", correct:"Из-за меня ты видишь смерть, а тебе я говорю злые слова."},
    {source:"διὰ σοῦ ἄγει ὁ θεὸς τοὺς πιστοὺς εἰς τὴν βασιλείαν αὐτοῦ καὶ δι' αὐτῶν τοὺς ἄλλους.", correct:"Через тебя Бог ведёт верных в своё царство, а через них — других."},
    {source:"δι' ἡμᾶς μένει ὁ κύριος ἐν τῷ κόσμῳ.", correct:"Ради нас Господь пребывает в мире."},
    {source:"ἐγώ εἰμι δοῦλος, σὺ δὲ δεσπότης.", correct:"Я раб, а ты господин."},
    {source:"ἀγαθός ἐστιν ὁ κύριος καὶ ἀγαθοί ἐστε ὑμεῖς.", correct:"Господь добр, и вы добры."},
    {source:"μαθηταί ἐστε τοῦ κυρίου καὶ ἀδελφοὶ τῶν ἀποστόλων αὐτοῦ.", correct:"Вы ученики Господа и братья Его апостолов."},
    {source:"ὁ δεσπότης πιστός ἐστιν, οἱ δὲ δοῦλοι αὐτοῦ κακοί.", correct:"Господин верен, а его рабы злы."},
    {source:"ἡ ἐκκλησία πιστή ἐστιν, ἡμεῖς δὲ βλέπομεν αὐτήν.", correct:"Церковь верна, а мы видим её."},
    {source:"βλέπομέν σε καὶ λέγομέν σοι παραβολήν.", correct:"Мы видим тебя и говорим тебе притчу."},
    {source:"δοῦλοί ἐσμεν, δούλους δὲ διδάσκομεν.", correct:"Мы рабы, а рабов мы учим."},
    {source:"οἱ δοῦλοι ἡμῶν βλέπουσιν ἡμᾶς, ἡμεῖς δὲ διδάσκομεν αὐτούς.", correct:"Наши рабы видят нас, а мы учим их."},
    {source:"ἀφ' ὑμῶν λαμβάνει ὁ ἀδελφός μου δῶρα καλά, καὶ πέμπει αὐτὰ πρός με διὰ τῶν δούλων αὐτοῦ.", correct:"От вас мой брат получает хорошие дары и посылает их ко мне через своих рабов."},
    {source:"γινώσκομεν τὴν ὁδόν, καὶ δι' αὐτῆς ἄγομέν σε εἰς τὸν οἶκον ἡμῶν.", correct:"Мы знаем дорогу и через неё ведём тебя в наш дом."},
    {source:"μετὰ τῶν ἀδελφῶν ἡμῶν βλέπομεν τοὺς μαθητὰς τοῦ κυρίου ἡμῶν.", correct:"С нашими братьями мы видим учеников нашего Господа."},
    {source:"μετὰ τὰς ἡμέρας τὰς κακὰς βλέπομεν τὴν βασιλείαν τοῦ κυρίου ἡμῶν.", correct:"После злых дней мы видим царство нашего Господа."},
    {source:"μεθ' ὑμῶν λέγομεν τελώναις παραβολήν.", correct:"С вами мы говорим мытарям притчу."}
    ]
    }
},
    9: {
        title: "Указательные местоимения",
grammar: `<b>1. Указательные местоимения οὗτος, αὕτη, τοῦτο (этот, эта, это)</b><br>
Указывает на <b>близкий</b> предмет (в пространстве или в речи).<br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>οὗτος</td><td>αὕτη</td><td>τοῦτο</td></tr>
  <tr><td>Gen.</td><td>τούτου</td><td>ταύτης</td><td>τούτου</td></tr>
  <tr><td>Dat.</td><td>τούτῳ</td><td>ταύτῃ</td><td>τούτῳ</td></tr>
  <tr><td>Acc.</td><td>τοῦτον</td><td>ταύτην</td><td>τοῦτο</td></tr>
</table><br>
<b>Множественное число:</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>οὗτοι</td><td>αὗται</td><td>ταῦτα</td></tr>
  <tr><td>Gen.</td><td>τούτων</td><td>τούτων</td><td>τούτων</td></tr>
  <tr><td>Dat.</td><td>τούτοις</td><td>ταύταις</td><td>τούτοις</td></tr>
  <tr><td>Acc.</td><td>τούτους</td><td>ταύτας</td><td>ταῦτα</td></tr>
</table>
<i>Пример:</i> οὗτος ὁ ἄνθρωπος — «этот человек»<br><br>

<b>2. Указательные местоимения ἐκεῖνος, ἐκείνη, ἐκεῖνο (тот, та, то)</b><br>
Указывает на <b>далёкий</b> предмет (в пространстве или в речи).<br>
Склоняются как <b>αὐτός</b> (по 1-2 склонению).<br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>ἐκεῖνος</td><td>ἐκείνη</td><td>ἐκεῖνο</td></tr>
  <tr><td>Gen.</td><td>ἐκείνου</td><td>ἐκείνης</td><td>ἐκείνου</td></tr>
  <tr><td>Dat.</td><td>ἐκείνῳ</td><td>ἐκείνῃ</td><td>ἐκείνῳ</td></tr>
  <tr><td>Acc.</td><td>ἐκεῖνον</td><td>ἐκείνην</td><td>ἐκεῖνο</td></tr>
</table><br>
<b>Множественное число ἐκεῖνος:</b><br>
<table>
  <tr><th>Падеж</th><th>Муж.</th><th>Жен.</th><th>Ср.</th></tr>
  <tr><td>Nom.</td><td>ἐκεῖνοι</td><td>ἐκεῖναι</td><td>ἐκεῖνα</td></tr>
  <tr><td>Gen.</td><td>ἐκείνων</td><td>ἐκείνων</td><td>ἐκείνων</td></tr>
  <tr><td>Dat.</td><td>ἐκείνοις</td><td>ἐκείναις</td><td>ἐκείνοις</td></tr>
  <tr><td>Acc.</td><td>ἐκείνους</td><td>ἐκείνας</td><td>ἐκεῖνα</td></tr>
</table>
<i>Пример:</i> ἐκεῖνος ὁ ἄνθρωπος — «тот человек»<br><br>

<b>3. Употребление αὐτός</b><br>
В зависимости от положения и падежа меняет значение:<br>
<table>
  <tr><th>Форма</th><th>Значение</th><th>Пример</th></tr>
  <tr><td>αὐτός (Nom.)</td><td><b>сам</b></td><td>αὐτὸς ὁ ἀπόστολος — «сам апостол»</td></tr>
  <tr><td>ὁ αὐτός (с артиклем)</td><td><b>тот же самый</b></td><td>ὁ αὐτὸς ἀπόστολος — «тот же самый апостол»</td></tr>
  <tr><td>αὐτός (в косв. падежах)</td><td><b>он, она, оно</b> (личное мест.)</td><td>λέγω αὐτῷ — «я говорю ему»</td></tr>
</table><br>
<i>Важно:</i> в именительном падеже — «сам»; с артиклем — «тот же»; в косвенных — «он/она/оно».<br><br>

<b>4. Особенности употребления указательных местоимений</b><br>
• Могут стоять как <b>перед</b>, так и <b>после</b> существительного:<br>
  <i>οὗτος ὁ ἀπόστολος</i> = <i>ὁ ἀπόστολος οὗτος</i> — «этот апостол»<br>
• При субстантивации используются формы среднего рода:<br>
  <i>ταῦτα</i> — «это» (вещи/дела)<br>
  <i>ἐκεῖνα</i> — «то» (вещи/дела)<br>
• Указательные местоимения часто используются для связи предложений в тексте.`,
        vocabulary: [
            {greek:"ἀγάπη", article:"ἡ", translation:"любовь", type:"noun", declension_forms:{singular:{nom:"ἀγάπη",gen:"ἀγάπης",dat:"ἀγάπῃ",acc:"ἀγάπην",voc:"ἀγάπη"},plural:{nom:"ἀγάπαι",gen:"ἀγαπῶν",dat:"ἀγάπαις",acc:"ἀγάπας",voc:"ἀγάπαι"}}},
            {greek:"ἁμαρτία", article:"ἡ", translation:"грех", type:"noun", declension_forms:{singular:{nom:"ἁμαρτία",gen:"ἁμαρτίας",dat:"ἁμαρτίᾳ",acc:"ἁμαρτίαν",voc:"ἁμαρτία"},plural:{nom:"ἁμαρτίαι",gen:"ἁμαρτιῶν",dat:"ἁμαρτίαις",acc:"ἁμαρτίας",voc:"ἁμαρτίαι"}}},
            {greek:"βαπτίζω", translation:"крещу", type:"verb", declension_forms:{singular:{"1":"βαπτίζω","2":"βαπτίζεις","3":"βαπτίζει"},plural:{"1":"βαπτίζομεν","2":"βαπτίζετε","3":"βαπτίζουσι(ν)"}}},
            {greek:"διδάσκαλος", article:"ὁ", translation:"учитель", type:"noun", declension_forms:{singular:{nom:"διδάσκαλος",gen:"διδασκάλου",dat:"διδασκάλῳ",acc:"διδάσκαλον",voc:"διδάσκαλε"},plural:{nom:"διδάσκαλοι",gen:"διδασκάλων",dat:"διδασκάλοις",acc:"διδασκάλους",voc:"διδάσκαλοι"}}},
            {greek:"ἐκεῖνος, ἐκείνη, ἐκεῖνο", translation:"тот, та, то", type:"pronoun", declension_forms:{masculine:{singular:{nom:"ἐκεῖνος",gen:"ἐκείνου",dat:"ἐκείνῳ",acc:"ἐκεῖνον"},plural:{nom:"ἐκεῖνοι",gen:"ἐκείνων",dat:"ἐκείνοις",acc:"ἐκείνους"}},feminine:{singular:{nom:"ἐκείνη",gen:"ἐκείνης",dat:"ἐκείνῃ",acc:"ἐκείνην"},plural:{nom:"ἐκεῖναι",gen:"ἐκείνων",dat:"ἐκείναις",acc:"ἐκείνας"}},neuter:{singular:{nom:"ἐκεῖνο",gen:"ἐκείνου",dat:"ἐκείνῳ",acc:"ἐκεῖνο"},plural:{nom:"ἐκεῖνα",gen:"ἐκείνων",dat:"ἐκείνοις",acc:"ἐκεῖνα"}}}},
            {greek:"ἐπαγγελία", article:"ἡ", translation:"обещание, обетование", type:"noun", declension_forms:{singular:{nom:"ἐπαγγελία",gen:"ἐπαγγελίας",dat:"ἐπαγγελίᾳ",acc:"ἐπαγγελίαν",voc:"ἐπαγγελία"},plural:{nom:"ἐπαγγελίαι",gen:"ἐπαγγελιῶν",dat:"ἐπαγγελίαις",acc:"ἐπαγγελίας",voc:"ἐπαγγελίαι"}}},
            {greek:"εὐαγγέλιον", article:"τό", translation:"Евангелие, благая весть", type:"noun", declension_forms:{singular:{nom:"εὐαγγέλιον",gen:"εὐαγγελίου",dat:"εὐαγγελίῳ",acc:"εὐαγγέλιον",voc:"εὐαγγέλιον"},plural:{nom:"εὐαγγέλια",gen:"εὐαγγελίων",dat:"εὐαγγελίοις",acc:"εὐαγγέλια",voc:"εὐαγγέλια"}}},
            {greek:"κρίνω", translation:"сужу", type:"verb", declension_forms:{singular:{"1":"κρίνω","2":"κρίνεις","3":"κρίνει"},plural:{"1":"κρίνομεν","2":"κρίνετε","3":"κρίνουσι(ν)"}}},
            {greek:"νῦν", translation:"теперь, сейчас", type:"adverb"},
            {greek:"οὗτος, αὕτη, τοῦτο", translation:"этот, эта, это", type:"pronoun", declension_forms:{masculine:{singular:{nom:"οὗτος",gen:"τούτου",dat:"τούτῳ",acc:"τοῦτον"},plural:{nom:"οὗτοι",gen:"τούτων",dat:"τούτοις",acc:"τούτους"}},feminine:{singular:{nom:"αὕτη",gen:"ταύτης",dat:"ταύτῃ",acc:"ταύτην"},plural:{nom:"αὗται",gen:"ταύτων",dat:"ταύταις",acc:"ταύτας"}},neuter:{singular:{nom:"τοῦτο",gen:"τούτου",dat:"τούτῳ",acc:"τοῦτο"},plural:{nom:"ταῦτα",gen:"τούτων",dat:"τούτοις",acc:"ταῦτα"}}}},
            {greek:"οὕτως", translation:"так, таким образом", type:"adverb"},
            {greek:"πονηρός, ά, όν", translation:"дурной, плохой, порочный (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"πονηρός",gen:"πονηροῦ",dat:"πονηρῷ",acc:"πονηρόν",voc:"πονηρέ"},plural:{nom:"πονηροί",gen:"πονηρῶν",dat:"πονηροῖς",acc:"πονηρούς",voc:"πονηροί"}},feminine:{singular:{nom:"πονηρά",gen:"πονηρᾶς",dat:"πονηρᾷ",acc:"πονηράν",voc:"πονηρά"},plural:{nom:"πονηραί",gen:"πονηρῶν",dat:"πονηραῖς",acc:"πονηράς",voc:"πονηραί"}},neuter:{singular:{nom:"πονηρόν",gen:"πονηροῦ",dat:"πονηρῷ",acc:"πονηρόν",voc:"πονηρόν"},plural:{nom:"πονηρά",gen:"πονηρῶν",dat:"πονηροῖς",acc:"πονηρά",voc:"πονηρά"}}}},
            {greek:"πρόσωπον", article:"τό", translation:"лицо", type:"noun", declension_forms:{singular:{nom:"πρόσωπον",gen:"προσώπου",dat:"προσώπῳ",acc:"πρόσωπον",voc:"πρόσωπον"},plural:{nom:"πρόσωπα",gen:"προσώπων",dat:"προσώποις",acc:"πρόσωπα",voc:"πρόσωπα"}}},
            {greek:"χαρά", article:"ἡ", translation:"радость", type:"noun", declension_forms:{singular:{nom:"χαρά",gen:"χαρᾶς",dat:"χαρᾷ",acc:"χαράν",voc:"χαρά"},plural:{nom:"χαραί",gen:"χαρῶν",dat:"χαραῖς",acc:"χαράς",voc:"χαραί"}}}
        ],
        exercises: {
    declension_fill: [
        {case:"gen_sg_m", word:"οὗτος", translation:"этот", correct:"τούτου", distractors:["ταύτης","τούτῳ","τοῦτον"]},
        {case:"dat_sg_f", word:"αὕτη", translation:"эта", correct:"ταύτῃ", distractors:["ταύτης","τούτῳ","ταύτην"]},
        {case:"acc_sg_n", word:"τοῦτο", translation:"это", correct:"τοῦτο", distractors:["τούτου","τούτῳ","τοῦτον"]},
        {case:"gen_sg_m", word:"ἐκεῖνος", translation:"тот", correct:"ἐκείνου", distractors:["ἐκείνῳ","ἐκεῖνον","ἐκείνη"]},
        {case:"dat_sg_f", word:"ἐκείνη", translation:"та", correct:"ἐκείνῃ", distractors:["ἐκείνης","ἐκείνην","ἐκεῖνο"]},
        {case:"acc_sg_n", word:"ἐκεῖνο", translation:"то", correct:"ἐκεῖνο", distractors:["ἐκείνου","ἐκείνῳ","ἐκεῖνον"]},
        {case:"nom_pl_m", word:"οὗτος", translation:"этот", correct:"οὗτοι", distractors:["τούτους","τούτων","τούτοις"]},
        {case:"nom_pl_m", word:"ἐκεῖνος", translation:"тот", correct:"ἐκεῖνοι", distractors:["ἐκείνους","ἐκείνων","ἐκείνοις"]},
        // Существительные урока
        {case:"gen_sg", word:"ἀγάπη", translation:"любовь", correct:"ἀγάπης", distractors:["ἀγάπῃ","ἀγάπην","ἀγαπῶν"]},
        {case:"dat_sg", word:"ἁμαρτία", translation:"грех", correct:"ἁμαρτίᾳ", distractors:["ἁμαρτίας","ἁμαρτίαν","ἁμαρτίαις"]},
        {case:"gen_sg", word:"διδάσκαλος", translation:"учитель", correct:"διδασκάλου", distractors:["διδασκάλῳ","διδάσκαλον","διδάσκαλοι"]},
        {case:"acc_sg", word:"ἐπαγγελία", translation:"обещание", correct:"ἐπαγγελίαν", distractors:["ἐπαγγελίας","ἐπαγγελίᾳ","ἐπαγγελίαι"]},
        {case:"gen_sg", word:"εὐαγγέλιον", translation:"Евангелие", correct:"εὐαγγελίου", distractors:["εὐαγγελίῳ","εὐαγγέλιον","εὐαγγέλια"]},
        {case:"dat_sg", word:"πρόσωπον", translation:"лицо", correct:"προσώπῳ", distractors:["προσώπου","πρόσωπον","προσώποις"]},
        {case:"acc_pl", word:"χαρά", translation:"радость", correct:"χαράς", distractors:["χαραῖς","χαρῶν","χαραί"]}
    ],
    translate_greek_to_russian: [
        {greek:"οὗτος ὁ λόγος", keywords:["этот","слово"]},
        {greek:"αὕτη ἡ ἀλήθεια", keywords:["эта","истина"]},
        {greek:"ἐκεῖνο τὸ δῶρον", keywords:["тот","дар"]},
        {greek:"ἐκεῖνος", keywords:["тот"]},
        {greek:"ἐκείνη", keywords:["та"]},
        {greek:"ἐκεῖνο", keywords:["то"]},
        {greek:"οὗτοι", keywords:["эти"]},
        {greek:"ἐκεῖνοι", keywords:["те"]},
        // Остальные слова урока
        {greek:"βαπτίζω τοὺς μαθητάς", keywords:["крещу","ученик"]},
        {greek:"κρίνει τοὺς ἀνθρώπους", keywords:["судит","люд"]},
        {greek:"νῦν βλέπομεν τὸ πρόσωπον", keywords:["лицо"]},
        {greek:"οὕτως λέγει ὁ διδάσκαλος", keywords:["учитель"]},
        {greek:"ἡ ἀγάπη καὶ ἡ χαρά", keywords:["любовь","радость"]},
        {greek:"αἱ ἁμαρτίαι τῶν ἀνθρώπων", keywords:["грехи"]},
        {greek:"ἡ ἐπαγγελία τοῦ κυρίου", keywords:["обе"]},
        {greek:"τὸ εὐαγγέλιον τοῦ θεοῦ", keywords:["евангелие"]},
        {greek:"ὁ πονηρὸς ἄνθρωπος", keywords:["человек"]}
    ],
    translate_russian_to_greek: [
        {russian:"этот человек", correct_sequence:["οὗτος","ἄνθρωπος"], all_words:["οὗτος","ἄνθρωπος","αὕτη","γυνή"]},
        {russian:"эта", correct_sequence:["αὕτη"], all_words:["αὕτη","οὗτος","τοῦτο","ἐκείνη"]},
        {russian:"это", correct_sequence:["τοῦτο"], all_words:["τοῦτο","οὗτος","αὕτη","ἐκεῖνο"]},
        {russian:"тот", correct_sequence:["ἐκεῖνος"], all_words:["ἐκεῖνος","οὗτος","αὕτη","τοῦτο"]},
        {russian:"те", correct_sequence:["ἐκεῖνοι"], all_words:["ἐκεῖνοι","οὗτοι","αὗται","ταῦτα"]},
        {russian:"теперь (сейчас)", correct_sequence:["νῦν"], all_words:["νῦν","οὕτως","καί","δέ"]},
        {russian:"так, таким образом", correct_sequence:["οὕτως"], all_words:["οὕτως","νῦν","ὅτι","καί"]},
        {russian:"я крещу", correct_sequence:["βαπτίζω"], all_words:["βαπτίζω","κρίνω","γινώσκω","ἄγω"]},
        {russian:"он судит", correct_sequence:["κρίνει"], all_words:["κρίνει","κρίνω","κρίνομεν","κρίνουσι"]},
        {russian:"порочный учитель", correct_sequence:["ὁ","πονηρὸς","διδάσκαλος"], all_words:["ὁ","πονηρὸς","διδάσκαλος","ἡ","πονηρὰ","ἀγάπη"]},
        {russian:"любовь Господа", correct_sequence:["ἡ","ἀγάπη","τοῦ","κυρίου"], all_words:["ἡ","ἀγάπη","τοῦ","κυρίου","τήν","χαράν"]},
        {russian:"грех и радость", correct_sequence:["ἡ","ἁμαρτία","καὶ","ἡ","χαρά"], all_words:["ἡ","ἁμαρτία","καὶ","ἡ","χαρά","τό","πρόσωπον"]},
        {russian:"лицо учителя", correct_sequence:["τὸ","πρόσωπον","τοῦ","διδασκάλου"], all_words:["τὸ","πρόσωπον","τοῦ","διδασκάλου","τῶν","ἁμαρτιῶν"]},
        {russian:"Евангелие Господа", correct_sequence:["τὸ","εὐαγγέλιον","τοῦ","κυρίου"], all_words:["τὸ","εὐαγγέλιον","τοῦ","κυρίου","τήν","ἐπαγγελίαν"]},
        {russian:"обещание Господа", correct_sequence:["ἡ","ἐπαγγελία","τοῦ","κυρίου"], all_words:["ἡ","ἐπαγγελία","τοῦ","κυρίου","τό","εὐαγγέλιον"]}
    ],
    case_number: [
        {form:"ταύταις", correct:"Dat. Pl. F.", distractors:["Nom. Pl.","Gen. Pl.","Acc. Pl."]},
        {form:"ἐκείνων", correct:"Gen. Pl.", distractors:["Nom. Pl.","Dat. Pl.","Acc. Pl."]},
        {form:"ἀγάπην", correct:"Acc. Sg.", distractors:["Nom. Sg.","Gen. Sg.","Dat. Sg."]},
        {form:"ἁμαρτιῶν", correct:"Gen. Pl.", distractors:["Dat. Pl.","Acc. Pl.","Nom. Pl."]},
        {form:"διδασκάλῳ", correct:"Dat. Sg.", distractors:["Gen. Sg.","Acc. Sg.","Nom. Sg."]},
        {form:"πρόσωπα", correct:"Nom./Acc. Pl.", distractors:["Nom. Sg.","Gen. Pl.","Dat. Pl."]},
        {form:"χαρᾷ", correct:"Dat. Sg.", distractors:["Gen. Sg.","Acc. Sg.","Nom. Sg."]},
        {form:"εὐαγγελίου", correct:"Gen. Sg.", distractors:["Dat. Sg.","Nom. Sg.","Gen. Pl."]}
    ]
},
translation: {
    ru_to_el: [
        { source: "Эти пророки знают самого Господа.", correct: ["οὗτοι","οἱ","προφῆται","γινώσκουσι","αὐτὸν","τὸν","κύριον"] },
        { source: "Те же самые ученики знают Его и видят Его лицо.", correct: ["οἱ","αὐτοὶ","μαθηταὶ","γινώσκουσι","αὐτόν","καὶ","βλέπουσι","τὸ","πρόσωπον","αὐτοῦ"] },
        { source: "Те Церкви судят этих учителей и ведут их от греха в радость.", correct: ["ἐκεῖναι","αἱ","ἐκκλησίαι","κρίνουσι","τούτους","τοὺς","διδασκάλους","καὶ","ἄγουσιν","αὐτοὺς","ἀπὸ","τῆς","ἁμαρτίας","εἰς","τὴν","χαράν"] },
        { source: "Мы сами имеем этот грех в нашем сердце.", correct: ["ἡμεῖς","αὐτοὶ","ἔχομεν","ταύτην","τὴν","ἁμαρτίαν","ἐν","τῇ","καρδίᾳ","ἡμῶν"] },
        { source: "Благодаря (из-за) любви нашего Господа эти юноши и девы имеют радость в своих сердцах.", correct: ["διὰ","τὴν","ἀγάπην","τοῦ","κυρίου","ἡμῶν","οὗτοι","οἱ","νεανίαι","καὶ","αὗται","αἱ","παρθένοι","ἔχουσι","χαράν","ἐν","ταῖς","καρδίαις","αὐτῶν"] },
        { source: "Это — верные ученики пророка.", correct: ["οὗτοί","εἰσιν","οἱ","πιστοὶ","μαθηταὶ","τοῦ","προφήτου"] },
        { source: "Апостол сам крестит своих братьев и ведёт их к тебе.", correct: ["ὁ","ἀπόστολος","αὐτὸς","βαπτίζει","τοὺς","ἀδελφοὺς","αὐτοῦ","καὶ","ἄγει","αὐτοὺς","πρός","σε"] },
        { source: "Через это Евангелие мы имеем жизнь в небесах.", correct: ["διὰ","τοῦτο","τὸ","εὐαγγέλιον","ἔχομεν","ζωὴν","ἐν","τοῖς","οὐρανοῖς"] },
        { source: "Из-за этих учителей мы видим смерть в Церкви.", correct: ["διὰ","τούτους","τοὺς","διδασκάλους","βλέπομεν","θάνατον","ἐν","τῇ","ἐκκλησίᾳ"] },
        { source: "Он сам знает нас и от Него мы получаем это обещание и ту же самую радость.", correct: ["αὐτὸς","γινώσκει","ἡμᾶς","καὶ","παρ'","αὐτοῦ","λαμβάνομεν","ταύτην","τὴν","ἐπαγγελίαν","καὶ","τὴν","αὐτὴν","χαράν"] },
        { source: "Из-за этого же Евангелия мы сами посылаем этих мытарей к вам.", correct: ["διὰ","τοῦτο","τὸ","εὐαγγέλιον","ἡμεῖς","αὐτοὶ","πέμπομεν","τούτους","τοὺς","τελώνας","πρὸς","ὑμᾶς"] },
        { source: "Он посылает самого Господа в этот мир.", correct: ["αὐτὸς","πέμπει","αὐτὸν","τὸν","κύριον","εἰς","τοῦτον","τὸν","κόσμον"] },
        { source: "Я сам вижу этого справедливого судью, и братья его видят.", correct: ["ἐγὼ","αὐτὸς","βλέπω","τοῦτον","τὸν","δίκαιον","κριτήν","καὶ","οἱ","ἀδελφοί","αὐτοῦ","βλέπουσιν"] },
        { source: "Сейчас мы крестим тех учеников нашего Господа и посылаем их же в пустыню.", correct: ["νῦν","ἡμεῖς","βαπτίζομεν","ἐκείνους","τοὺς","μαθητὰς","τοῦ","κυρίου","ἡμῶν","καὶ","πέμπομεν","αὐτοὺς","εἰς","τὴν","ἔρημον"] },
        { source: "Мои ученики знают мой голос и приносят этих детей ко мне.", correct: ["οἱ","μαθηταί","μου","γινώσκουσι","τὴν","φωνήν","μου","καὶ","φέρουσι","ταῦτα","τὰ","παιδία","πρός","με"] },
        { source: "Мы — ученики Господа, а вы — ученики злого (господина).", correct: ["ἡμεῖς","ἐσμεν","μαθηταὶ","τοῦ","κυρίου","ὑμεῖς","δὲ","μαθηταί","ἐστε","τοῦ","πονηροῦ"] },
        { source: "Эта любовь ведёт наших детей в жизнь.", correct: ["αὕτη","ἡ","ἀγάπη","ἄγει","τὰ","τέκνα","ἡμῶν","εἰς","ζωήν"] },
        { source: "Любовь этих Церквей ведёт и других людей в радость.", correct: ["ἡ","ἀγάπη","τούτων","τῶν","ἐκκλησιῶν","ἄγει","καὶ","τοὺς","ἄλλους","ἀνθρώπους","εἰς","χαράν"] },
        { source: "Учителя этого мира имеют грех в своих сердцах и так учат людей.", correct: ["οἱ","διδάσκαλοι","τούτου","τοῦ","κόσμου","ἔχουσι","ἁμαρτίαν","ἐν","ταῖς","καρδίαις","αὐτῶν","καὶ","οὕτως","διδάσκουσι","τοὺς","ἀνθρώπους"] },
        { source: "Я знаю грех этих мытарей и посылаю их к самому Господу.", correct: ["ἐγώ","γινώσκω","τὴν","ἁμαρτίαν","τούτων","τῶν","τελωνῶν","καὶ","πέμπω","αὐτοὺς","πρὸς","αὐτὸν","τὸν","κύριον"] }
    ],
    el_to_ru: [
    {source:"οὗτοι οἱ διδάσκαλοι κρίνουσιν αὐτὸν τὸν κριτήν.", correct:"Эти учителя судят самого судью."},
    {source:"ὁ δὲ αὐτὸς νεανίας ἔχει τὴν αὐτὴν χαρὰν ἐν τῇ καρδίᾳ αὐτοῦ.", correct:"А тот же самый юноша имеет ту же радость в своём сердце."},
    {source:"νῦν λαμβάνω αὐτὸς τὸ αὐτὸ εὐαγγέλιον ἀπὸ τοῦ κυρίου μου.", correct:"Теперь я сам получаю то же Евангелие от моего Господа."},
    {source:"οὗτος βλέπει ἐκεῖνον καὶ κρίνει αὐτόν.", correct:"Этот видит того и судит его."},
    {source:"μετὰ ταῦτα ἔχετε αὐτοὶ τὴν ἀγάπην τοῦ κυρίου ἐν ταῖς καρδίαις ὑμῶν.", correct:"После этого вы сами имеете любовь Господа в своих сердцах."},
    {source:"οὗτοι ἔχουσι χαράν, ἐκεῖνοι δὲ ἔχουσιν ἁμαρτίαν.", correct:"Эти имеют радость, а те имеют грех."},
    {source:"αὕτη δέ ἐστιν ἡ φωνὴ τοῦ δεσπότου αὐτοῦ.", correct:"А это голос его господина."},
    {source:"οὕτως γινώσκομεν τοῦτον καὶ βλέπομεν τὸ πρόσωπον αὐτοῦ.", correct:"Так мы знаем этого и видим его лицо."},
    {source:"λαμβάνομεν ταῦτα τὰ δῶρα ἀπὸ τοῦ αὐτοῦ καὶ βλέπομεν αὐτόν.", correct:"Мы получаем эти дары от того же самого и видим его."},
    {source:"αὐτὸς βαπτίζεις ἐκεῖνον καὶ εἶ ἀδελφὸς αὐτοῦ.", correct:"Ты сам крестишь того и являешься его братом."},
    {source:"εἰς τὴν αὐτὴν ἐκκλησίαν ἄγομεν τούτους τοὺς διδασκάλους ἡμῶν τοὺς ἀγαθούς.", correct:"В ту же церковь мы ведём этих наших добрых учителей."},
    {source:"αὐτὸς ἐγὼ ἔχω ταύτην τὴν ἐπαγγελίαν τοῦ κυρίου μου.", correct:"Я сам имею это обещание моего Господа."},
    {source:"αὕτη ἡ παρθένος βλέπει τὸ πρόσωπον τοῦ κυρίου αὐτῆς.", correct:"Эта дева видит лицо своего Господа."},
    {source:"αὕτη γινώσκει αὐτὴν τὴν ἀλήθειαν.", correct:"Эта знает эту же истину."},
    {source:"ἀγαθή ἐστιν ἡ ἐπαγγελία σου, ἀγαθὴ εἶ αὕτη.", correct:"Хорошо твоё обещание, хороша эта."},
    {source:"ἐκεῖνοί εἰσιν μαθηταὶ τοῦ αὐτοῦ διδασκάλου.", correct:"Те — ученики того же учителя."},
    {source:"οὗτός ἐστιν διδάσκαλος ἐκείνου, ἐκεῖνος δὲ τούτου.", correct:"Этот — учитель того, а тот — этого."},
    {source:"οὗτος ὁ βαπτιστὴς διδάσκει τοὺς ἀγαθοὺς καὶ αὐτός ἐστιν ἀγαθός.", correct:"Этот креститель учит добрых, и сам он добр."},
    {source:"μετὰ τὰς ἡμέρας ἐκείνας διδάσκαλοί ἐσμεν τούτων τῶν δούλων.", correct:"После тех дней мы — учителя этих рабов."},
    {source:"μετὰ τῶν πιστῶν προφητῶν ἔχομεν ἐπαγγελίας ἀγαθάς, οἱ δὲ πονηροὶ τελῶναι βλέπουσιν ἡμέρας κακάς.", correct:"С верными пророками мы имеем добрые обещания, а злые мытари видят плохие дни."}
    ]
    }
},
    10: {
        title: "Медио-пассивный залог",
        grammar: `<b>Спряжение λύομαι (я развязываюсь / меня развязывают):</b><br>
        <table><tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
        <tr><td>1-е</td><td>λύομαι</td><td>λυόμεθα</td></tr>
        <tr><td>2-е</td><td>λύῃ</td><td>λύεσθε</td></tr>
        <tr><td>3-е</td><td>λύεται</td><td>λύονται</td></tr></table><br>
        <b>Отложительные глаголы:</b> имеют медио-пассивные формы с активным значением (ἔρχομαι — прихожу).`,
        vocabulary: [
            {greek:"ἀκούω + Gen.", translation:"слышу (кого, что)", type:"verb", declension_forms:{singular:{"1":"ἀκούω","2":"ἀκούεις","3":"ἀκούει"},plural:{"1":"ἀκούομεν","2":"ἀκούετε","3":"ἀκούουσι(ν)"}}},
            {greek:"ἁμαρτωλός", article:"ὁ", translation:"грешник", type:"noun", declension_forms:{singular:{nom:"ἁμαρτωλός",gen:"ἁμαρτωλοῦ",dat:"ἁμαρτωλῷ",acc:"ἁμαρτωλόν",voc:"ἁμαρτωλέ"},plural:{nom:"ἁμαρτωλοί",gen:"ἁμαρτωλῶν",dat:"ἁμαρτωλοῖς",acc:"ἁμαρτωλούς",voc:"ἁμαρτωλοί"}}},
            {greek:"ἀπέρχομαι (dep.)", translation:"отхожу, ухожу", type:"verb", declension_forms:{singular:{"1":"ἀπέρχομαι","2":"ἀπέρχῃ","3":"ἀπέρχεται"},plural:{"1":"ἀπερχόμεθα","2":"ἀπέρχεσθε","3":"ἀπέρχονται"}}},
            {greek:"ἀποκρίνομαι (dep.)", translation:"отвечаю", type:"verb", declension_forms:{singular:{"1":"ἀποκρίνομαι","2":"ἀποκρίνῃ","3":"ἀποκρίνεται"},plural:{"1":"ἀποκρινόμεθα","2":"ἀποκρίνεσθε","3":"ἀποκρίνονται"}}},
            {greek:"ἄρχομαι", translation:"начинаю", type:"verb", declension_forms:{singular:{"1":"ἄρχομαι","2":"ἄρχῃ","3":"ἄρχεται"},plural:{"1":"ἀρχόμεθα","2":"ἄρχεσθε","3":"ἄρχονται"}}},
            {greek:"ἄρχω + Gen.", translation:"управляю (чем)", type:"verb", declension_forms:{singular:{"1":"ἄρχω","2":"ἄρχεις","3":"ἄρχει"},plural:{"1":"ἄρχομεν","2":"ἄρχετε","3":"ἄρχουσι(ν)"}}},
            {greek:"γίνομαι (dep.) + Nom.", translation:"становлюсь, делаюсь", type:"verb", declension_forms:{singular:{"1":"γίνομαι","2":"γίνῃ","3":"γίνεται"},plural:{"1":"γινόμεθα","2":"γίνεσθε","3":"γίνονται"}}},
            {greek:"διέρχομαι (dep.)", translation:"прохожу (через)", type:"verb", declension_forms:{singular:{"1":"διέρχομαι","2":"διέρχῃ","3":"διέρχεται"},plural:{"1":"διερχόμεθα","2":"διέρχεσθε","3":"διέρχονται"}}},
            {greek:"διώκω", translation:"гоню, преследую", type:"verb", declension_forms:{singular:{"1":"διώκω","2":"διώκεις","3":"διώκει"},plural:{"1":"διώκομεν","2":"διώκετε","3":"διώκουσι(ν)"}}},
            {greek:"εἰσέρχομαι (dep.)", translation:"вхожу", type:"verb", declension_forms:{singular:{"1":"εἰσέρχομαι","2":"εἰσέρχῃ","3":"εἰσέρχεται"},plural:{"1":"εἰσερχόμεθα","2":"εἰσέρχεσθε","3":"εἰσέρχονται"}}},
            {greek:"ἐξέρχομαι (dep.)", translation:"выхожу", type:"verb", declension_forms:{singular:{"1":"ἐξέρχομαι","2":"ἐξέρχῃ","3":"ἐξέρχεται"},plural:{"1":"ἐξερχόμεθα","2":"ἐξέρχεσθε","3":"ἐξέρχονται"}}},
            {greek:"ἔρχομαι (dep.)", translation:"прихожу", type:"verb", declension_forms:{singular:{"1":"ἔρχομαι","2":"ἔρχῃ","3":"ἔρχεται"},plural:{"1":"ἐρχόμεθα","2":"ἔρχεσθε","3":"ἔρχονται"}}},
            {greek:"λῃστής", article:"ὁ", translation:"разбойник", type:"noun", declension_forms:{singular:{nom:"λῃστής",gen:"λῃστοῦ",dat:"λῃστῇ",acc:"λῃστήν",voc:"λῃστά"},plural:{nom:"λῃσταί",gen:"λῃστῶν",dat:"λῃσταῖς",acc:"λῃστάς",voc:"λῃσταί"}}},
            {greek:"ὅτι", translation:"что, потому что", type:"conjunction"},
            {greek:"πορεύομαι (dep.)", translation:"иду", type:"verb", declension_forms:{singular:{"1":"πορεύομαι","2":"πορεύῃ","3":"πορεύεται"},plural:{"1":"πορευόμεθα","2":"πορεύεσθε","3":"πορεύονται"}}},
            {greek:"σώζω", translation:"спасаю", type:"verb", declension_forms:{singular:{"1":"σώζω","2":"σώζεις","3":"σώζει"},plural:{"1":"σώζομεν","2":"σώζετε","3":"σώζουσι(ν)"}}},
            {greek:"ὑπό", translation:"кем, чем (с Gen., в страдательном обороте); под (с Acc.)", type:"preposition"}
        ],
        exercises: {
    declension_fill: [
        {case:"1sg", word:"λύομαι", translation:"развязываюсь", correct:"λύομαι", distractors:["λύῃ","λύεται","λυόμεθα"]},
        {case:"2sg", word:"λύομαι", translation:"развязываюсь", correct:"λύῃ", distractors:["λύομαι","λύεται","λύεσθε"]},
        {case:"3sg", word:"λύομαι", translation:"развязываюсь", correct:"λύεται", distractors:["λύομαι","λύῃ","λύονται"]},
        {case:"1pl", word:"λύομαι", translation:"развязываюсь", correct:"λυόμεθα", distractors:["λύεσθε","λύονται","λύομαι"]},
        {case:"2pl", word:"λύομαι", translation:"развязываюсь", correct:"λύεσθε", distractors:["λυόμεθα","λύονται","λύῃ"]},
        {case:"3pl", word:"λύομαι", translation:"развязываюсь", correct:"λύονται", distractors:["λυόμεθα","λύεσθε","λύεται"]},
        {case:"1sg", word:"γίνομαι", translation:"становлюсь", correct:"γίνομαι", distractors:["γίνῃ","γίνεται","γινόμεθα"]},
        {case:"2sg", word:"ἔρχομαι", translation:"прихожу", correct:"ἔρχῃ", distractors:["ἔρχομαι","ἔρχεται","ἐρχόμεθα"]},
        {case:"3sg", word:"πορεύομαι", translation:"иду", correct:"πορεύεται", distractors:["πορεύομαι","πορεύῃ","πορευόμεθα"]},
        {case:"1pl", word:"ἀποκρίνομαι", translation:"отвечаю", correct:"ἀποκρινόμεθα", distractors:["ἀποκρίνομαι","ἀποκρίνῃ","ἀποκρίνεται"]},
        {case:"2pl", word:"εἰσέρχομαι", translation:"вхожу", correct:"εἰσέρχεσθε", distractors:["εἰσέρχομαι","εἰσέρχῃ","εἰσέρχεται"]},
        {case:"3pl", word:"ἐξέρχομαι", translation:"выхожу", correct:"ἐξέρχονται", distractors:["ἐξέρχομαι","ἐξέρχῃ","ἐξέρχεται"]},
        {case:"1sg", word:"ἄρχομαι", translation:"начинаю", correct:"ἄρχομαι", distractors:["ἄρχῃ","ἄρχεται","ἀρχόμεθα"]},
        {case:"3sg", word:"διέρχομαι", translation:"прохожу", correct:"διέρχεται", distractors:["διέρχομαι","διέρχῃ","διέρχονται"]},
        {case:"2pl", word:"ἀπέρχομαι", translation:"ухожу", correct:"ἀπέρχεσθε", distractors:["ἀπερχόμεθα","ἀπέρχονται","ἀπέρχῃ"]}
    ],
    translate_greek_to_russian: [
        {greek:"γίνομαι", keywords:["становлюсь"]},
        {greek:"ἔρχεται", keywords:["приходит"]},
        {greek:"πορεύονται", keywords:["идут"]},
        {greek:"ἀποκρίνομαι", keywords:["отвечаю"]},
        {greek:"σώζεται", keywords:["спасается"]},
        {greek:"ἀπέρχομαι", keywords:["отхожу"]},
        {greek:"εἰσέρχομαι", keywords:["вхожу"]},
        {greek:"ἐξέρχομαι", keywords:["выхожу"]},
        {greek:"ἔρχομαι", keywords:["прихожу"]},
        {greek:"πορεύομαι", keywords:["иду"]},
        // Действительный залог, предлог ὑπό и союз ὅτι
        {greek:"ἀκούω τῆς φωνῆς", keywords:["слыш"]},
        {greek:"ἄρχομαι", keywords:["начина"]},
        {greek:"ἄρχει τοῦ κόσμου", keywords:["управля"]},
        {greek:"διέρχεται", keywords:["проходит"]},
        {greek:"διώκομαι ὑπὸ τῶν λῃστῶν", keywords:["разбойник"]},
        {greek:"ὁ ἁμαρτωλός", keywords:["грешник"]},
        {greek:"λέγει ὅτι σώζεται", keywords:["что","спаса"]},
        {greek:"σώζεται ὑπὸ τοῦ κυρίου", keywords:["спасается","господ"]}
    ],
    translate_russian_to_greek: [
        {russian:"я становлюсь", correct_sequence:["γίνομαι"], all_words:["γίνομαι","ἔρχομαι","λύομαι"]},
        {russian:"он спасается", correct_sequence:["σώζεται"], all_words:["σώζεται","σώζω","σώζονται"]},
        {russian:"я отвечаю", correct_sequence:["ἀποκρίνομαι"], all_words:["ἀποκρίνομαι","ἔρχομαι","πορεύομαι","γίνομαι"]},
        {russian:"я вхожу", correct_sequence:["εἰσέρχομαι"], all_words:["εἰσέρχομαι","ἐξέρχομαι","ἔρχομαι","ἀπέρχομαι"]},
        {russian:"я выхожу", correct_sequence:["ἐξέρχομαι"], all_words:["ἐξέρχομαι","εἰσέρχομαι","ἔρχομαι","πορεύομαι"]},
        {russian:"я прихожу", correct_sequence:["ἔρχομαι"], all_words:["ἔρχομαι","ἀπέρχομαι","πορεύομαι","γίνομαι"]},
        {russian:"я иду", correct_sequence:["πορεύομαι"], all_words:["πορεύομαι","ἔρχομαι","ἀποκρίνομαι","γίνομαι"]},
        {russian:"я отхожу", correct_sequence:["ἀπέρχομαι"], all_words:["ἀπέρχομαι","ἔρχομαι","πορεύομαι","εἰσέρχομαι"]},
        {russian:"я прохожу", correct_sequence:["διέρχομαι"], all_words:["διέρχομαι","ἐξέρχομαι","εἰσέρχομαι","ἀπέρχομαι"]},
        {russian:"я начинаю", correct_sequence:["ἄρχομαι"], all_words:["ἄρχομαι","ἄρχω","ἔρχομαι","γίνομαι"]},
        {russian:"я преследую", correct_sequence:["διώκω"], all_words:["διώκω","σώζω","ἄρχω","ἀκούω"]},
        {russian:"я слышу голос", correct_sequence:["ἀκούω","τῆς","φωνῆς"], all_words:["ἀκούω","τῆς","φωνῆς","τὴν","φωνήν"]},
        {russian:"я управляю миром", correct_sequence:["ἄρχω","τοῦ","κόσμου"], all_words:["ἄρχω","τοῦ","κόσμου","ἄρχομαι","τὸν","κόσμον"]},
        {russian:"грешник", correct_sequence:["ὁ","ἁμαρτωλός"], all_words:["ὁ","ἁμαρτωλός","λῃστής","μαθητής"]},
        {russian:"разбойник", correct_sequence:["ὁ","λῃστής"], all_words:["ὁ","λῃστής","ἁμαρτωλός","τελώνης"]},
        {russian:"он спасается Господом", correct_sequence:["σώζεται","ὑπὸ","τοῦ","κυρίου"], all_words:["σώζεται","ὑπὸ","τοῦ","κυρίου","ἀπὸ","τῆς","ἁμαρτίας"]},
        {russian:"потому что мы знаем", correct_sequence:["ὅτι","γινώσκομεν"], all_words:["ὅτι","γινώσκομεν","καὶ","βλέπομεν"]}
    ],
    case_number: [
        {form:"λύεται", correct:"3-е л. ед.ч.", distractors:["2-е л. ед.ч.","1-е л. мн.ч.","3-е л. мн.ч."]},
        {form:"πορεύονται", correct:"3-е л. мн.ч.", distractors:["3-е л. ед.ч.","2-е л. мн.ч.","1-е л. мн.ч."]},
        {form:"γίνεται", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
        {form:"πορευόμεθα", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
        {form:"ἔρχονται", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
        {form:"ἀκούετε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
        {form:"διώκονται", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
        {form:"ἀρχόμεθα", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
        {form:"σώζῃ", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]}
    ]
},
translation: {
    ru_to_el: [
        { source: "Эти церкви спасаемы Господом от смерти.", correct: ["αὗται","αἱ","ἐκκλησίαι","σώζονται","ὑπὸ","τοῦ","κυρίου","ἀπὸ","τοῦ","θανάτου"] },
        { source: "Я спасаюсь Им, и Он учит меня своим словом.", correct: ["ἐγώ","σώζομαι","ὑπ'","αὐτοῦ","καὶ","αὐτὸς","διδάσκει","με","τῷ","λόγῳ","αὐτοῦ"] },
        { source: "Мы становимся учениками апостола, а вы не слышите его голоса.", correct: ["ἡμεῖς","γινόμεθα","μαθηταὶ","τοῦ","ἀποστόλου","ὑμεῖς","δὲ","οὐκ","ἀκούετε","τῆς","φωνῆς","αὐτοῦ"] },
        { source: "Я — грешник, но наставляем апостолами Господа и имею Его обетования.", correct: ["ἐγώ","εἰμι","ἁμαρτωλός","ἀλλὰ","διδασκόμενος","ὑπὸ","τῶν","ἀποστόλων","τοῦ","κυρίου","καὶ","ἔχω","τὰς","ἐπαγγελίας","αὐτοῦ"] },
        { source: "Я — плохой слуга, но ты становишься моим учителем.", correct: ["ἐγώ","εἰμι","κακὸς","δοῦλος","σὺ","δὲ","γίνῃ","μου","διδάσκαλος"] },
        { source: "Злые люди говорят тем Церквам, что наши братья не видят лица Господа.", correct: ["οἱ","πονηροὶ","ἄνθρωποι","λέγουσι","ἐκείναις","ταῖς","ἐκκλησίαις","ὅτι","οἱ","ἀδελφοί","ἡμῶν","οὐ","βλέπουσι","τὸ","πρόσωπον","τοῦ","κυρίου"] },
        { source: "Мы знаем Господа, потому что получаем от Него хорошие дары и учимся у Него посредством притч.", correct: ["ἡμεῖς","γινώσκομεν","τὸν","κύριον","ὅτι","λαμβάνομεν","παρ'","αὐτοῦ","καλὰ","δῶρα","καὶ","διδασκόμεθα","ὑπ'","αὐτοῦ","διὰ","τῶν","παραβολῶν"] },
        { source: "Ты пишешь своим братьям, что ты преследуем злыми судьями.", correct: ["σὺ","γράφεις","τοῖς","ἀδελφοῖς","σου","ὅτι","σὺ","διώκῃ","ὑπὸ","πονηρῶν","κριτῶν"] },
        { source: "Он учит других и сам учится у этого апостола.", correct: ["αὐτὸς","διδάσκει","τοὺς","ἄλλους","καὶ","αὐτὸς","διδάσκεται","ὑπὸ","τούτου","τοῦ","ἀποστόλου"] },
        { source: "Этот ученик не отвечает тому пророку, потому что не знает его писаний.", correct: ["οὗτος","ὁ","μαθητὴς","οὐκ","ἀποκρίνεται","ἐκείνῳ","τῷ","προφήτῃ","ὅτι","οὐ","γινώσκει","τὰς","γραφὰς","αὐτοῦ"] },
        { source: "Ты говоришь той Церкви, что ты — плохой слуга.", correct: ["σὺ","λέγεις","ἐκείνῃ","τῇ","ἐκκλησίᾳ","ὅτι","σὺ","εἶ","κακὸς","δοῦλος"] },
        { source: "Вы пребываете в этом храме, но не являетесь учениками Господа.", correct: ["ὑμεῖς","μένετε","ἐν","τούτῳ","τῷ","ἱερῷ","ἀλλὰ","οὐκ","ἐστέ","μαθηταὶ","τοῦ","κυρίου"] },
        { source: "Мы не видим лиц этих мытарей и грешников.", correct: ["ἡμεῖς","οὐ","βλέπομεν","τὰ","πρόσωπα","τούτων","τῶν","τελωνῶν","καὶ","ἁμαρτωλῶν"] },
        { source: "В доме учеников нашего Господа мир и радость.", correct: ["ἐν","τῷ","οἴκῳ","τῶν","μαθητῶν","τοῦ","κυρίου","ἡμῶν","εἰρήνη","καὶ","χαρά","ἐστιν"] },
        { source: "Господь управляет этим миром при помощи своего слова.", correct: ["ὁ","κύριος","ἄρχει","τούτου","τοῦ","κόσμου","τῷ","λόγῳ","αὐτοῦ"] },
        { source: "Эти грешники не входят в Господень дом, а выходят в пустыню вместе с разбойниками.", correct: ["οὗτοι","οἱ","ἁμαρτωλοὶ","οὐκ","εἰσέρχονται","εἰς","τὸν","οἶκον","τοῦ","κυρίου","ἀλλὰ","ἐξέρχονται","εἰς","τὴν","ἔρημον","μετὰ","τῶν","ληστῶν"] },
        { source: "Эти писания пишутся Господом его верным Церквам через пророков.", correct: ["αὗται","αἱ","γραφαὶ","γράφονται","ὑπὸ","τοῦ","κυρίου","ταῖς","πισταῖς","ἐκκλησίαις","αὐτοῦ","διὰ","τῶν","προφητῶν"] }
    ],
    el_to_ru: [
        {source:"λύονται οὗτοι οἱ δοῦλοι ὑπὸ τοῦ κυρίου.", correct:"Эти рабы освобождаются Господом."},
    {source:"τῷ λόγῳ τοῦ κυρίου ἀγόμεθα εἰς τὴν ἐκκλησίαν τοῦ θεοῦ.", correct:"Словом Господа мы ведомы в церковь Божию."},
    {source:"οὐκ ἀκούετε τῆς φωνῆς τοῦ προφήτου, ἀλλ' ἐξέρχεσθε ἐκ τοῦ οἴκου αὐτοῦ.", correct:"Вы не слышите голоса пророка, но выходите из его дома."},
    {source:"τῷ λόγῳ αὐτοῦ τοῦ κυρίου γίνεσθε μαθηταὶ αὐτοῦ.", correct:"Словом самого Господа вы становитесь его учениками."},
    {source:"ἐκεῖνοι οἱ ἀγαθοὶ διδάσκαλοι οὐκ εἰσέρχονται εἰς τοὺς οἴκους τῶν ἁμαρτωλῶν.", correct:"Те добрые учителя не входят в дома грешников."},
    {source:"οὐ βαπτίζονται οἱ ἁμαρτωλοὶ ὑπὸ τῶν ἀποστόλων, ἀλλ' ἐξέρχονται ἐκ τούτων τῶν οἴκων πρὸς ἄλλους διδασκάλους.", correct:"Грешники не крестятся апостолами, но выходят из этих домов к другим учителям."},
    {source:"λέγετε ἐκείνοις τοῖς ἁμαρτωλοῖς ὅτι σῴζεσθε ὑπὸ τοῦ θεοῦ ἀπὸ τῶν ἁμαρτιῶν ὑμῶν.", correct:"Скажите тем грешникам, что вы спасаетесь Богом от ваших грехов."},
    {source:"ἄρχει αὐτὸς ὁ θεὸς τῆς βασιλείας αὐτοῦ.", correct:"Сам Бог управляет своим царством."},
    {source:"εἰρήνην καὶ χαρὰν ἔχει ἡ ἐκκλησία, ὅτι σῴζεται ὑπὸ τοῦ κυρίου αὐτῆς.", correct:"Церковь имеет мир и радость, потому что она спасается своим Господом."},
    {source:"οὐκ ἀποκρινόμεθα τῷ τελώνῃ ὅτι γινώσκομεν αὐτόν.", correct:"Мы не отвечаем мытарю, потому что знаем его."},
    {source:"οὐχ ὑπὸ τῶν μαθητῶν σῴζῃ ἀπὸ τῶν ἁμαρτιῶν σου, ἀλλ' ὑπ' αὐτοῦ τοῦ θεοῦ.", correct:"Ты спасаешься от своих грехов не учениками, а самим Богом."},
    {source:"οὐ πορεύῃ ἐν τῇ ὁδῷ τῇ κακῇ, ἀλλὰ σῴζῃ ἀπὸ τῶν ἁμαρτιῶν σου καὶ οἱ ἀδελφοί σου ἀκούουσι τῆς φωνῆς τοῦ κυρίου.", correct:"Ты не идёшь по плохому пути, но спасаешься от своих грехов, и твои братья слышат голос Господа."},
    {source:"ὁ κύριος ἔρχεται εἰς τὸν οἶκον τοῦ μαθητοῦ αὐτοῦ.", correct:"Господь приходит в дом своего ученика."},
    {source:"ἐρχόμεθα πρὸς τοὺς ἀποστόλους, ὅτι γινώσκομεν τὴν φωνὴν αὐτῶν.", correct:"Мы приходим к апостолам, потому что знаем их голос."},
    {source:"μετὰ τῶν ἀδελφῶν αὐτοῦ ἄγεται εἰς τὴν βασιλείαν τοῦ θεοῦ τῇ φωνῇ τῶν ἀποστόλων.", correct:"Со своими братьями он ведом голосом апостолов в царство Божие."},
    {source:"οὐ γίνῃ μαθητὴς τοῦ κυρίου, ὅτι οὐκ εἰσέρχῃ εἰς τὴν ἐκκλησίαν αὐτοῦ.", correct:"Ты не становишься учеником Господа, потому что не входишь в его церковь."},
    {source:"οἱ κριταὶ οὗτοι κρίνουσι τοὺς λῃστὰς ἐκείνους ἐν νόμῳ.", correct:"Эти судьи судят тех разбойников по закону."},
    {source:"αὗται αἱ καλαὶ παρθένοι διώκονται ὑπὸ τῶν λῃστῶν τούτων ἐν τῇ ὁδῷ, ἀλλ' ὁ κύριος σῴζει αὐτάς.", correct:"Эти хорошие девы преследуемы этими разбойниками на пути, но Господь спасает их."},
    {source:"ὁ βαπτιστὴς αὐτὸς ἐξέρχεται ἐκ τοῦ οἴκου καὶ ἀπέρχεται ἀπὸ τῶν πονηρῶν.", correct:"Сам креститель выходит из дома и уходит от злых."}
    ]
        }
    },
    11: {
        title: "Имперфект активного залога",
        grammar: `<b>1. Главные и исторические времена</b><br>
Времена греческого глагола делятся на главные и исторические. К главным относятся настоящее время, будущее и перфект; к историческим — три прошедших времени: <b>имперфект</b>, аорист и плюсквамперфект. Для исторических времён характерны особые (вторичные) личные окончания и приращение — аугмент.<br><br>
<b>2. Imperfectum Indicativi Activi</b><br>
Имперфект — прошедшее время несовершенного вида. Спряжение глагола <b>λύω</b> (развязываю):<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Перевод</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>ἔλυον</td><td>я развязывал</td><td>ἐλύομεν</td><td>мы развязывали</td></tr>
  <tr><td>2-е</td><td>ἔλυες</td><td>ты развязывал</td><td>ἐλύετε</td><td>вы развязывали</td></tr>
  <tr><td>3-е</td><td>ἔλυεν</td><td>он развязывал</td><td>ἔλυον</td><td>они развязывали</td></tr>
</table><br>
К основе <b>λυ-</b> в начале прибавляется приращение <b>ἐ-</b>, затем идёт соединительный гласный <b>ο</b> или <b>ε</b> и вторичные личные окончания:<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>1-е</td><td>-ν</td><td>-μεν</td></tr>
  <tr><td>2-е</td><td>-ς</td><td>-τε</td></tr>
  <tr><td>3-е</td><td>-(ν)</td><td>-ν</td></tr>
</table><br>
Приращение «притягивает» к себе ударение: оно сдвигается от конца настолько, насколько позволяют общие правила, но никогда не встаёт перед аугментом.<br><br>
<b>3. Аугмент: качественный и количественный</b><br>
• <b>Качественный</b> — у глаголов на согласный: ἐ- (λύω → ἔλυον).<br>
• <b>Количественный</b> — у глаголов на гласный: начальный гласный удлиняется, густое придыхание сохраняется.<br>
<table>
  <tr><th>Краткий</th><th>Долгий</th><th>Краткий</th><th>Долгий</th></tr>
  <tr><td>α</td><td>η</td><td>ι</td><td>ῑ</td></tr>
  <tr><td>ε</td><td>η</td><td>υ</td><td>ῡ</td></tr>
  <tr><td>ο</td><td>ω</td><td>αι</td><td>ῃ</td></tr>
  <tr><td>ει</td><td>ῃ</td><td>οι</td><td>ῳ</td></tr>
</table><br>
Если слово начинается с дифтонга, в котором есть йота, она становится подписной: αἴρω → ᾖρον.<br><br>
<b>4. Примеры приращения</b><br>
<table>
  <tr><th>Настоящее</th><th>Имперфект</th><th>Перевод</th></tr>
  <tr><td>ἐγείρω</td><td>ἤγειρον</td><td>воскрешаю — я воскрешал</td></tr>
  <tr><td>ἀκούω</td><td>ἤκουον</td><td>слышу — я слышал</td></tr>
  <tr><td>ἄγω</td><td>ἦγον</td><td>веду — я вёл</td></tr>
  <tr><td>αἴρω</td><td>ᾖρον</td><td>поднимаю — я поднимал</td></tr>
</table><br>
<b>5. Приращение у глаголов с приставкой</b><br>
Приращение стоит между приставкой и основой. Если приставка кончается на гласный, перед приращением и перед начальным гласным основы он выпадает — кроме приставок <b>προ-</b> и <b>περι-</b>:<br>
<table>
  <tr><th>Настоящее</th><th>Имперфект</th><th>Перевод</th></tr>
  <tr><td>ἐκβάλλω</td><td>ἐξέβαλλον</td><td>выбрасываю — я выбрасывал</td></tr>
  <tr><td>ἀποκτείνω</td><td>ἀπέκτεινον</td><td>убиваю — я убивал</td></tr>
  <tr><td>ἀπάγω</td><td>ἀπῆγον</td><td>отвожу — я отводил</td></tr>
  <tr><td>προάγω</td><td>προῆγον</td><td>веду вперёд — я вёл вперёд</td></tr>
  <tr><td>περιάγω</td><td>περιῆγον</td><td>вожу вокруг — я водил вокруг</td></tr>
</table><br>
<i>Ударение не может стоять перед приращением.</i><br><br>
<b>6. Имперфект глагола εἰμί</b><br>
Этот глагол спрягается в имперфекте особым образом:<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Перевод</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>ἤμην</td><td>я был</td><td>ἦμεν</td><td>мы были</td></tr>
  <tr><td>2-е</td><td>ἦς</td><td>ты был</td><td>ἦτε</td><td>вы были</td></tr>
  <tr><td>3-е</td><td>ἦν</td><td>он был</td><td>ἦσαν</td><td>они были</td></tr>
</table>`,
        vocabulary: [
            {greek:"ἀποκτείνω", translation:"убиваю", type:"verb", declension_forms:{singular:{"1":"ἀποκτείνω","2":"ἀποκτείνεις","3":"ἀποκτείνει"},plural:{"1":"ἀποκτείνομεν","2":"ἀποκτείνετε","3":"ἀποκτείνουσι(ν)"}}},
            {greek:"ἀποστέλλω", translation:"посылаю (кого-то) с поручением", type:"verb", declension_forms:{singular:{"1":"ἀποστέλλω","2":"ἀποστέλλεις","3":"ἀποστέλλει"},plural:{"1":"ἀποστέλλομεν","2":"ἀποστέλλετε","3":"ἀποστέλλουσι(ν)"}}},
            {greek:"ἄρτος", article:"ὁ", translation:"хлеб", type:"noun", declension_forms:{singular:{nom:"ἄρτος",gen:"ἄρτου",dat:"ἄρτῳ",acc:"ἄρτον",voc:"ἄρτε"},plural:{nom:"ἄρτοι",gen:"ἄρτων",dat:"ἄρτοις",acc:"ἄρτους",voc:"ἄρτοι"}}},
            {greek:"βαίνω", translation:"иду, шагаю", type:"verb", declension_forms:{singular:{"1":"βαίνω","2":"βαίνεις","3":"βαίνει"},plural:{"1":"βαίνομεν","2":"βαίνετε","3":"βαίνουσι(ν)"}}},
            {greek:"ἐσθίω", translation:"ем", type:"verb", declension_forms:{singular:{"1":"ἐσθίω","2":"ἐσθίεις","3":"ἐσθίει"},plural:{"1":"ἐσθίομεν","2":"ἐσθίετε","3":"ἐσθίουσι(ν)"}}},
            {greek:"κατά", translation:"против (с Gen.); по, согласно (с Acc.)", type:"preposition"},
            {greek:"καταβαίνω", translation:"спускаюсь, иду вниз, нисхожу", type:"verb", declension_forms:{singular:{"1":"καταβαίνω","2":"καταβαίνεις","3":"καταβαίνει"},plural:{"1":"καταβαίνομεν","2":"καταβαίνετε","3":"καταβαίνουσι(ν)"}}},
            {greek:"μέν", translation:"в паре μὲν... δέ — «с одной стороны... с другой стороны»; обычно переводится только δέ — «а, же»", type:"particle"},
            {greek:"οὐκέτι", translation:"уже не, более не", type:"adverb"},
            {greek:"παρά", translation:"от (с Gen., о людях); возле, у (с Dat.); перед, напротив, вопреки (с Acc.)", type:"preposition"},
            {greek:"παραλαμβάνω", translation:"получаю, беру с собой", type:"verb", declension_forms:{singular:{"1":"παραλαμβάνω","2":"παραλαμβάνεις","3":"παραλαμβάνει"},plural:{"1":"παραλαμβάνομεν","2":"παραλαμβάνετε","3":"παραλαμβάνουσι(ν)"}}},
            {greek:"σύν", translation:"с (с Dat.)", type:"preposition"},
            {greek:"συνάγω", translation:"собираю", type:"verb", declension_forms:{singular:{"1":"συνάγω","2":"συνάγεις","3":"συνάγει"},plural:{"1":"συνάγομεν","2":"συνάγετε","3":"συνάγουσι(ν)"}}},
            {greek:"τότε", translation:"тогда", type:"adverb"},
            {greek:"αἴρω", translation:"поднимаю, уничтожаю", type:"verb", declension_forms:{singular:{"1":"αἴρω","2":"αἴρεις","3":"αἴρει"},plural:{"1":"αἴρομεν","2":"αἴρετε","3":"αἴρουσι(ν)"}}},
            {greek:"ἀναβαίνω", translation:"поднимаюсь, восхожу", type:"verb", declension_forms:{singular:{"1":"ἀναβαίνω","2":"ἀναβαίνεις","3":"ἀναβαίνει"},plural:{"1":"ἀναβαίνομεν","2":"ἀναβαίνετε","3":"ἀναβαίνουσι(ν)"}}},
            {greek:"ἀποθνήσκω", translation:"умираю", type:"verb", declension_forms:{singular:{"1":"ἀποθνήσκω","2":"ἀποθνήσκεις","3":"ἀποθνήσκει"},plural:{"1":"ἀποθνήσκομεν","2":"ἀποθνήσκετε","3":"ἀποθνήσκουσι(ν)"}}},
            {greek:"ἐξ", translation:"из, от (вариант предлога ἐκ перед гласным)", type:"preposition"}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύω", translation:"развязываю", correct:"ἔλυον", distractors:["ἔλυες","ἔλυεν","ἐλύομεν"]},
                {case:"2sg", word:"λύω", translation:"развязываю", correct:"ἔλυες", distractors:["ἔλυον","ἔλυεν","ἐλύετε"]},
                {case:"3sg", word:"λύω", translation:"развязываю", correct:"ἔλυεν", distractors:["ἔλυον","ἔλυες","ἐλύετε"]},
                {case:"1pl", word:"λύω", translation:"развязываю", correct:"ἐλύομεν", distractors:["ἔλυον","ἐλύετε","ἔλυες"]},
                {case:"2pl", word:"λύω", translation:"развязываю", correct:"ἐλύετε", distractors:["ἐλύομεν","ἔλυον","ἔλυεν"]},
                {case:"3pl", word:"λύω", translation:"развязываю", correct:"ἔλυον", distractors:["ἐλύομεν","ἐλύετε","ἔλυες"]},
                {case:"1sg", word:"εἰμί", translation:"быть", correct:"ἤμην", distractors:["ἦς","ἦν","ἦμεν"]},
                {case:"2sg", word:"εἰμί", translation:"быть", correct:"ἦς", distractors:["ἤμην","ἦν","ἦτε"]},
                {case:"3sg", word:"εἰμί", translation:"быть", correct:"ἦν", distractors:["ἤμην","ἦς","ἦσαν"]},
                {case:"1pl", word:"εἰμί", translation:"быть", correct:"ἦμεν", distractors:["ἦτε","ἦσαν","ἤμην"]},
                {case:"2pl", word:"εἰμί", translation:"быть", correct:"ἦτε", distractors:["ἦμεν","ἦσαν","ἦς"]},
                {case:"3pl", word:"εἰμί", translation:"быть", correct:"ἦσαν", distractors:["ἦμεν","ἦτε","ἦν"]}
            ],
            translate_greek_to_russian: [
                // Слова урока
                {greek:"ἀποκτείνω", keywords:["убива"]},
                {greek:"ἀποστέλλω", keywords:["посыла"]},
                {greek:"ἄρτος", keywords:["хлеб"]},
                {greek:"βαίνω", keywords:["иду"]},
                {greek:"ἐσθίω", keywords:["ем"]},
                {greek:"καταβαίνω", keywords:["спуска"]},
                {greek:"παραλαμβάνω", keywords:["получа"]},
                {greek:"συνάγω", keywords:["собира"]},
                {greek:"αἴρω", keywords:["поднима"]},
                {greek:"ἀναβαίνω", keywords:["поднима"]},
                {greek:"ἀποθνήσκω", keywords:["умира"]},
                {greek:"οὐκέτι", keywords:["уже не"]},
                {greek:"τότε", keywords:["тогда"]},
                {greek:"σύν", keywords:["с"]},
                {greek:"ἐξ", keywords:["из"]},
                // Оборот с κατά — из учебника (по закону)
                {greek:"κατὰ τὸν νόμον", keywords:["закон"]},
                // Имперфект — формы из упражнений урока
                {greek:"ἐλύομεν", keywords:["развязыва"]},
                {greek:"ἤκουον", keywords:["слыша"]},
                {greek:"ἀπέκτεινον", keywords:["убива"]},
                {greek:"κατέβαινον", keywords:["спуска"]},
                {greek:"ἀπέθνῃσκον", keywords:["умира"]},
                {greek:"ἀνέβαινον", keywords:["поднима"]},
                {greek:"ἀπέστελλον", keywords:["посыла"]},
                {greek:"ἦμεν", keywords:["были"]},
                {greek:"ἤμην", keywords:["был"]}
            ],
            translate_russian_to_greek: [
                {russian:"я убиваю", correct_sequence:["ἀποκτείνω"], all_words:["ἀποκτείνω","ἀποστέλλω","ἀποθνήσκω","συνάγω"]},
                {russian:"я посылаю", correct_sequence:["ἀποστέλλω"], all_words:["ἀποστέλλω","ἀποκτείνω","παραλαμβάνω","συνάγω"]},
                {russian:"хлеб", correct_sequence:["ἄρτος"], all_words:["ἄρτος","οἶκος","λόγος","ἱερόν"]},
                {russian:"я иду", correct_sequence:["βαίνω"], all_words:["βαίνω","καταβαίνω","ἀναβαίνω","συνάγω"]},
                {russian:"я ем", correct_sequence:["ἐσθίω"], all_words:["ἐσθίω","λέγω","γράφω","ἀκούω"]},
                {russian:"я спускаюсь", correct_sequence:["καταβαίνω"], all_words:["καταβαίνω","ἀναβαίνω","βαίνω","ἀποθνήσκω"]},
                {russian:"я получаю хлеб", correct_sequence:["παραλαμβάνω","τὸν","ἄρτον"], all_words:["παραλαμβάνω","τὸν","ἄρτον","ἀποστέλλω","οἶκον"]},
                {russian:"я собираю", correct_sequence:["συνάγω"], all_words:["συνάγω","ἄγω","παραλαμβάνω","ἀκούω"]},
                {russian:"я поднимаю", correct_sequence:["αἴρω"], all_words:["αἴρω","αἴρεις","ἀναβαίνω","ἄγω"]},
                {russian:"я поднимаюсь", correct_sequence:["ἀναβαίνω"], all_words:["ἀναβαίνω","καταβαίνω","βαίνω","ἀποθνήσκω"]},
                {russian:"я умираю", correct_sequence:["ἀποθνήσκω"], all_words:["ἀποθνήσκω","ἀποκτείνω","ἀποστέλλω","σῴζω"]},
                {russian:"тогда", correct_sequence:["τότε"], all_words:["τότε","νῦν","οὐκέτι","καί"]},
                {russian:"уже не", correct_sequence:["οὐκέτι"], all_words:["οὐκέτι","τότε","νῦν","καί"]},
                {russian:"с (с Dat.)", correct_sequence:["σύν"], all_words:["σύν","ἐξ","κατά","παρά"]},
                {russian:"против (с Gen.)", correct_sequence:["κατά"], all_words:["κατά","παρά","σύν","ἐξ"]},
                {russian:"от (с Gen., о людях)", correct_sequence:["παρά"], all_words:["παρά","κατά","σύν","ἀπό"]}
            ],
            case_number: [
                {form:"ἔλυες", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἔλυεν", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐλύομεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἐλύετε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἤμην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἦς", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἦν", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἦμεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἦτε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἦσαν", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"παρελαμβάνετε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. ед.ч.","1-е л. ед.ч."]},
                {form:"συνῆγεν", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"ἠκούομεν τῆς φωνῆς αὐτοῦ ἐν ἐκείναις ταῖς ἡμέραις, νῦν δὲ οὐκέτι ἀκούομεν αὐτῆς.", correct:"Мы слышали его голос в те дни, а теперь уже не слышим его."},
                {source:"ὁ δὲ μαθητὴς τοῦ κυρίου ἔλεγε παραβολὴν τοῖς ἀδελφοῖς αὐτοῦ.", correct:"Ученик же Господа говорил притчу своим братьям."},
                {source:"ἀπέκτεινον οἱ λῃσταὶ τὰ τέκνα σὺν τοῖς διδασκάλοις αὐτῶν παρὰ τῇ ὁδῷ ταύτῃ.", correct:"Разбойники убивали детей вместе с их учителями у этой дороги."},
                {source:"τότε μὲν κατέβαινον εἰς τὸν οἶκον, νῦν δὲ οὐκέτι καταβαίνω.", correct:"Тогда они спускались в дом, а теперь я уже не спускаюсь."},
                {source:"παρελαμβάνετε τὸν ἄρτον παρὰ τῶν δούλων καὶ ἠσθίετε αὐτόν.", correct:"Вы получали хлеб от рабов и ели его."},
                {source:"διὰ τὴν ἀλήθειαν ἀπέθνῃσκον οἱ προφῆται ἐν ταῖς ἡμέραις ἐκείναις.", correct:"Из-за истины умирали пророки в те дни."},
                {source:"συνῆγεν οὗτος ὁ ἀπόστολος εἰς τὴν ἐκκλησίαν τοὺς μαθητὰς τοῦ κυρίου ὑμῶν.", correct:"Этот апостол собирал в церковь учеников вашего Господа."},
                {source:"νῦν μὲν διδασκόμεθα ὑπὸ τῶν ἀποστόλων, τότε δὲ ἐδιδάσκομεν ἡμεῖς τὴν ἐκκλησίαν.", correct:"Теперь мы учимся у апостолов, а тогда мы сами учили церковь."},
                {source:"ὁ κύριος ἡμῶν ἦρε τὰς ἁμαρτίας ἡμῶν.", correct:"Господь наш взял наши грехи."},
                {source:"τότε μὲν ἀνέβαινον εἰς τὸ ἱερόν, νῦν δὲ οὐκέτι ἀναβαίνουσιν.", correct:"Тогда они поднимались в храм, а теперь уже не поднимаются."},
                {source:"πονηροὶ ἦτε, ἀγαθοὶ δὲ ἐστέ.", correct:"Вы были злыми, а теперь вы добрые."},
                {source:"ὑμεῖς μὲν ἐστὲ ἀγαθοί, ἡμεῖς δέ ἐσμεν πονηροί.", correct:"Вы добрые, а мы злые."},
                {source:"τότε ἤμην ἐν τῷ ἱερῷ καὶ ἐδίδασκέ με ὁ κύριος.", correct:"Тогда я был в храме, и Господь учил меня."},
                {source:"λέγομεν ὑμῖν ὅτι ἐν τῷ οἴκῳ ὑμῶν ἦμεν.", correct:"Мы говорим вам, что были в вашем доме."},
                {source:"ἐξέβαλλες αὐτοὺς ἐκ τοῦ ἱεροῦ.", correct:"Ты выбрасывал их из храма."},
                {source:"ἀπέστελλον οἱ τελῶναι τοὺς δούλους αὐτῶν πρός με.", correct:"Мытари посылали своих рабов ко мне."},
                {source:"ὁ κύριος ἀπέστελλεν ἀγγέλους πρὸς ἡμᾶς.", correct:"Господь посылал к нам ангелов."},
                {source:"ἐν τῷ κόσμῳ ἦν καὶ ὁ κόσμος οὐκ ἔβλεπεν αὐτόν.", correct:"Он был в мире, и мир не видел его."},
                {source:"δοῦλος ἦς τοῦ πονηροῦ, ἀλλὰ νῦν οὐκέτι εἶ δοῦλος.", correct:"Ты был рабом злого, но теперь ты уже не раб."},
                {source:"τοῦτό ἐστι τὸ δῶρον τοῦ ἁμαρτωλοῦ, καλὸν δὲ οὐκ ἔστιν.", correct:"Это дар грешника, но он не хорош."}
            ],
            ru_to_el: [
                { source: "Мы слышали его голос в те дни, а теперь уже не слышим его.", correct: ["ἠκούομεν","τῆς","φωνῆς","αὐτοῦ","ἐν","ἐκείναις","ταῖς","ἡμέραις","νῦν","δὲ","οὐκέτι","ἀκούομεν","αὐτῆς"] },
                { source: "Ученик же Господа говорил притчу своим братьям.", correct: ["ὁ","δὲ","μαθητὴς","τοῦ","κυρίου","ἔλεγε","παραβολὴν","τοῖς","ἀδελφοῖς","αὐτοῦ"] },
                { source: "Разбойники убивали детей вместе с их учителями у этой дороги.", correct: ["ἀπέκτεινον","οἱ","λῃσταὶ","τὰ","τέκνα","σὺν","τοῖς","διδασκάλοις","αὐτῶν","παρὰ","τῇ","ὁδῷ","ταύτῃ"] },
                { source: "Тогда они спускались в дом, а теперь я уже не спускаюсь.", correct: ["τότε","μὲν","κατέβαινον","εἰς","τὸν","οἶκον","νῦν","δὲ","οὐκέτι","καταβαίνω"] },
                { source: "Вы получали хлеб от рабов и ели его.", correct: ["παρελαμβάνετε","τὸν","ἄρτον","παρὰ","τῶν","δούλων","καὶ","ἠσθίετε","αὐτόν"] },
                { source: "Из-за истины умирали пророки в те дни.", correct: ["διὰ","τὴν","ἀλήθειαν","ἀπέθνῃσκον","οἱ","προφῆται","ἐν","ταῖς","ἡμέραις","ἐκείναις"] },
                { source: "Этот апостол собирал в церковь учеников вашего Господа.", correct: ["συνῆγεν","οὗτος","ὁ","ἀπόστολος","εἰς","τὴν","ἐκκλησίαν","τοὺς","μαθητὰς","τοῦ","κυρίου","ὑμῶν"] },
                { source: "Теперь мы учимся у апостолов, а тогда мы сами учили церковь.", correct: ["νῦν","μὲν","διδασκόμεθα","ὑπὸ","τῶν","ἀποστόλων","τότε","δὲ","ἐδιδάσκομεν","ἡμεῖς","τὴν","ἐκκλησίαν"] },
                { source: "Господь наш взял наши грехи.", correct: ["ὁ","κύριος","ἡμῶν","ἦρε","τὰς","ἁμαρτίας","ἡμῶν"] },
                { source: "Тогда они поднимались в храм, а теперь уже не поднимаются.", correct: ["τότε","μὲν","ἀνέβαινον","εἰς","τὸ","ἱερόν","νῦν","δὲ","οὐκέτι","ἀναβαίνουσιν"] },
                { source: "Вы были злыми, а теперь вы добрые.", correct: ["πονηροὶ","ἦτε","ἀγαθοὶ","δὲ","ἐστέ"] },
                { source: "Вы добрые, а мы злые.", correct: ["ὑμεῖς","μὲν","ἐστὲ","ἀγαθοί","ἡμεῖς","δέ","ἐσμεν","πονηροί"] },
                { source: "Тогда я был в храме, и Господь учил меня.", correct: ["τότε","ἤμην","ἐν","τῷ","ἱερῷ","καὶ","ἐδίδασκέ","με","ὁ","κύριος"] },
                { source: "Мы говорим вам, что были в вашем доме.", correct: ["λέγομεν","ὑμῖν","ὅτι","ἐν","τῷ","οἴκῳ","ὑμῶν","ἦμεν"] },
                { source: "Ты выбрасывал их из храма.", correct: ["ἐξέβαλλες","αὐτοὺς","ἐκ","τοῦ","ἱεροῦ"] },
                { source: "Мытари посылали своих рабов ко мне.", correct: ["ἀπέστελλον","οἱ","τελῶναι","τοὺς","δούλους","αὐτῶν","πρός","με"] },
                { source: "Господь посылал к нам ангелов.", correct: ["ὁ","κύριος","ἀπέστελλεν","ἀγγέλους","πρὸς","ἡμᾶς"] },
                { source: "Он был в мире, и мир не видел его.", correct: ["ἐν","τῷ","κόσμῳ","ἦν","καὶ","ὁ","κόσμος","οὐκ","ἔβλεπεν","αὐτόν"] },
                { source: "Ты был рабом злого, но теперь ты уже не раб.", correct: ["δοῦλος","ἦς","τοῦ","πονηροῦ","ἀλλὰ","νῦν","οὐκέτι","εἶ","δοῦλος"] },
                { source: "Это дар грешника, но он не хорош.", correct: ["τοῦτό","ἐστι","τὸ","δῶρον","τοῦ","ἁμαρτωλοῦ","καλὸν","δὲ","οὐκ","ἔστιν"] }
            ]
        }
    },
    12: {
        title: "Имперфект медио-пассивного залога",
        grammar: `<b>1. Imperfectum Indicativi Medii-Passivi</b><br>
Как и в настоящем времени, в имперфекте медиальный и пассивный залог совпадают по форме. Образуется он так же, как активный: к основе присоединяются приращение, соединительный гласный и вторичные личные окончания медио-пассива.<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Мн.ч.</th></tr>
  <tr><td>1-е</td><td>-μην</td><td>-μεθα</td></tr>
  <tr><td>2-е</td><td>-σο (-ε-σο → -ου)</td><td>-σθε</td></tr>
  <tr><td>3-е</td><td>-το</td><td>-ντο</td></tr>
</table><br>
Спряжение глагола <b>λύω</b> (развязываю) в имперфекте медио-пассива:<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Перевод</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>ἐλυόμην</td><td>я развязывался</td><td>ἐλυόμεθα</td><td>мы развязывались</td></tr>
  <tr><td>2-е</td><td>ἐλύου</td><td>ты развязывался</td><td>ἐλύεσθε</td><td>вы развязывались</td></tr>
  <tr><td>3-е</td><td>ἐλύετο</td><td>он развязывался</td><td>ἐλύοντο</td><td>они развязывались</td></tr>
</table><br>
В пассивном значении те же формы переводятся иначе: ἐλυόμην — «я был развязываем», ἐλύου — «ты был развязываем» и так далее. Отложительные глаголы в имперфекте тоже имеют медио-пассивную форму: ἔρχομαι (прихожу) — ἠρχόμην (я приходил).<br><br>
<b>2. Подлежащее среднего рода множественного числа</b><br>
При подлежащем среднего рода во множественном числе сказуемое обычно ставится в единственном числе:<br>
• τὰ δαιμόνια ἐξέρχεται — бесы выходят<br>
• ταῦτά ἐστι τὰ καλὰ δῶρα — это хорошие дары<br>
Реже сказуемое стоит и во множественном числе: τὰ τέκνα σώζονται — дети спасаются.<br><br>
<b>3. Союзы καί и οὐδέ</b><br>
• <b>καί</b> — «и», а также «также, даже»; в значении «даже» стоит перед тем словом, к которому относится: γινώσκουσι καὶ τὰ τέκνα τὸν νόμον — даже дети знают закон.<br>
• <b>οὐδέ</b> — «и не, даже не, ни»: τὴν δόξαν τοῦ θεοῦ βλέπουσιν οὐδὲ οἱ μαθηταί — даже ученики не видят славы Божией.<br>
• <b>καὶ... καί</b> — «и... и, как... так и»; <b>οὐδὲ... οὐδέ</b> — «ни... ни».<br>
В греческом предложении может быть только одно отрицание — одна отрицательная частица или союз на всю фразу, в отличие от русского языка.`,
        vocabulary: [
            {greek:"οὐδέ", translation:"и не, даже не; в паре οὐδὲ... οὐδέ — ни... ни", type:"conjunction"},
            {greek:"οὔπω", translation:"ещё не", type:"adverb"},
            {greek:"περί", translation:"о, относительно (с Gen.); вокруг, кругом (с Acc.)", type:"preposition"},
            {greek:"πλοῖον", article:"τό", translation:"лодка, судно", type:"noun", declension_forms:{singular:{nom:"πλοῖον",gen:"πλοίου",dat:"πλοίῳ",acc:"πλοῖον",voc:"πλοῖον"},plural:{nom:"πλοῖα",gen:"πλοίων",dat:"πλοίοις",acc:"πλοῖα",voc:"πλοῖα"}}},
            {greek:"συνέρχομαι (dep.)", translation:"иду вместе (с кем-либо)", type:"verb", declension_forms:{singular:{"1":"συνέρχομαι","2":"συνέρχῃ","3":"συνέρχεται"},plural:{"1":"συνερχόμεθα","2":"συνέρχεσθε","3":"συνέρχονται"}}},
            {greek:"ὑπέρ", translation:"за, ради (с Gen.); над, выше (с Acc.)", type:"preposition"},
            {greek:"ἀπέρχομαι (dep.)", translation:"ухожу", type:"verb", declension_forms:{singular:{"1":"ἀπέρχομαι","2":"ἀπέρχῃ","3":"ἀπέρχεται"},plural:{"1":"ἀπερχόμεθα","2":"ἀπέρχεσθε","3":"ἀπέρχονται"}}},
            {greek:"βιβλίον", article:"τό", translation:"книга", type:"noun", declension_forms:{singular:{nom:"βιβλίον",gen:"βιβλίου",dat:"βιβλίῳ",acc:"βιβλίον",voc:"βιβλίον"},plural:{nom:"βιβλία",gen:"βιβλίων",dat:"βιβλίοις",acc:"βιβλία",voc:"βιβλία"}}},
            {greek:"δαιμόνιον", article:"τό", translation:"бес, демон, божество", type:"noun", declension_forms:{singular:{nom:"δαιμόνιον",gen:"δαιμονίου",dat:"δαιμονίῳ",acc:"δαιμόνιον",voc:"δαιμόνιον"},plural:{nom:"δαιμόνια",gen:"δαιμονίων",dat:"δαιμονίοις",acc:"δαιμόνια",voc:"δαιμόνια"}}},
            {greek:"δέχομαι (dep.)", translation:"принимаю", type:"verb", declension_forms:{singular:{"1":"δέχομαι","2":"δέχῃ","3":"δέχεται"},plural:{"1":"δεχόμεθα","2":"δέχεσθε","3":"δέχονται"}}},
            {greek:"ἐκπορεύομαι (dep.)", translation:"выхожу", type:"verb", declension_forms:{singular:{"1":"ἐκπορεύομαι","2":"ἐκπορεύῃ","3":"ἐκπορεύεται"},plural:{"1":"ἐκπορευόμεθα","2":"ἐκπορεύεσθε","3":"ἐκπορεύονται"}}},
            {greek:"ἔργον", article:"τό", translation:"работа, дело", type:"noun", declension_forms:{singular:{nom:"ἔργον",gen:"ἔργου",dat:"ἔργῳ",acc:"ἔργον",voc:"ἔργον"},plural:{nom:"ἔργα",gen:"ἔργων",dat:"ἔργοις",acc:"ἔργα",voc:"ἔργα"}}},
            {greek:"ἔτι", translation:"ещё", type:"adverb"},
            {greek:"θάλασσα", article:"ἡ", translation:"море", type:"noun", declension_forms:{singular:{nom:"θάλασσα",gen:"θαλάσσης",dat:"θαλάσσῃ",acc:"θάλασσαν",voc:"θάλασσα"},plural:{nom:"θάλασσαι",gen:"θαλασσῶν",dat:"θαλάσσαις",acc:"θαλάσσας",voc:"θάλασσαι"}}},
            {greek:"καί", translation:"и, также, даже; в паре καὶ... καί — и... и, как... так и", type:"conjunction"},
            {greek:"κατέρχομαι (dep.)", translation:"схожу, спускаюсь", type:"verb", declension_forms:{singular:{"1":"κατέρχομαι","2":"κατέρχῃ","3":"κατέρχεται"},plural:{"1":"κατερχόμεθα","2":"κατέρχεσθε","3":"κατέρχονται"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύομαι", translation:"развязываюсь", correct:"ἐλυόμην", distractors:["ἐλύου","ἐλύετο","ἐλυόμεθα"]},
                {case:"2sg", word:"λύομαι", translation:"развязываюсь", correct:"ἐλύου", distractors:["ἐλυόμην","ἐλύετο","ἐλύεσθε"]},
                {case:"3sg", word:"λύομαι", translation:"развязываюсь", correct:"ἐλύετο", distractors:["ἐλυόμην","ἐλύου","ἐλύοντο"]},
                {case:"1pl", word:"λύομαι", translation:"развязываюсь", correct:"ἐλυόμεθα", distractors:["ἐλύεσθε","ἐλύοντο","ἐλύου"]},
                {case:"2pl", word:"λύομαι", translation:"развязываюсь", correct:"ἐλύεσθε", distractors:["ἐλυόμεθα","ἐλύοντο","ἐλύετο"]},
                {case:"3pl", word:"λύομαι", translation:"развязываюсь", correct:"ἐλύοντο", distractors:["ἐλυόμεθα","ἐλύεσθε","ἐλύετο"]}
            ],
            translate_greek_to_russian: [
                // Слова урока
                {greek:"οὐδέ", keywords:["и не"]},
                {greek:"οὔπω", keywords:["ещё не"]},
                {greek:"περί", keywords:["о"]},
                {greek:"πλοῖον", keywords:["лодк"]},
                {greek:"συνέρχομαι", keywords:["иду вместе"]},
                {greek:"ὑπέρ", keywords:["за"]},
                {greek:"ἀπέρχομαι", keywords:["ухожу"]},
                {greek:"βιβλίον", keywords:["книг"]},
                {greek:"δαιμόνιον", keywords:["бес"]},
                {greek:"δέχομαι", keywords:["принима"]},
                {greek:"ἐκπορεύομαι", keywords:["выхожу"]},
                {greek:"ἔργον", keywords:["дел"]},
                {greek:"ἔτι", keywords:["ещё"]},
                {greek:"θάλασσα", keywords:["море"]},
                {greek:"καί", keywords:["и"]},
                {greek:"κατέρχομαι", keywords:["спуска"]},
                // Формы из упражнений урока
                {greek:"ἐλυόμην", keywords:["развязывался"]},
                {greek:"ἐλύεσθε", keywords:["развязывались"]},
                {greek:"ἠρχόμην", keywords:["приходил"]},
                {greek:"ἀπήρχοντο", keywords:["уходили"]},
                {greek:"ἐξεπορεύετο", keywords:["выходила"]},
                {greek:"ἐδέχου", keywords:["принимал"]},
                {greek:"συνήρχοντο", keywords:["сходились"]},
                {greek:"ἐγράφοντο", keywords:["написаны"]},
                // Обороты из самого учебника
                {greek:"οὔπω βλέπομεν τὸν κύριον", keywords:["ещё не","видим"]},
                {greek:"τὰ δαιμόνια ἐξέρχεται", keywords:["бесы","выходят"]},
                {greek:"γινώσκουσι καὶ τὰ τέκνα τὸν νόμον", keywords:["даже","дети","закон"]},
                {greek:"τὴν δόξαν τοῦ θεοῦ βλέπουσιν οὐδὲ οἱ μαθηταί", keywords:["даже","ученики"]},
                {greek:"δέχεται καὶ τὸν κύριον", keywords:["принима"]},
                {greek:"κατέρχεται εἰς τὸν οἶκον", keywords:["спуска"]},
                {greek:"συνέρχεται πρὸς τοὺς ἀδελφούς", keywords:["сходится","братьям"]},
                {greek:"ἐκπορεύεται ἐκ τοῦ οἴκου", keywords:["выходит","дома"]},
                // Оборот с ἔτι из учебника (урок 15): «а те — ещё злы»
                {greek:"ἐκεῖνοι δὲ ἔτι πονηροί", keywords:["ещё","зл"]}
            ],
            translate_russian_to_greek: [
                {russian:"я принимаю", correct_sequence:["δέχομαι"], all_words:["δέχομαι","ἐκπορεύομαι","συνέρχομαι","κατέρχομαι"]},
                {russian:"я выхожу", correct_sequence:["ἐκπορεύομαι"], all_words:["ἐκπορεύομαι","δέχομαι","ἀπέρχομαι","κατέρχομαι"]},
                {russian:"я иду вместе", correct_sequence:["συνέρχομαι"], all_words:["συνέρχομαι","ἔρχομαι","ἀπέρχομαι","δέχομαι"]},
                {russian:"я спускаюсь", correct_sequence:["κατέρχομαι"], all_words:["κατέρχομαι","ἐκπορεύομαι","συνέρχομαι","ἀπέρχομαι"]},
                {russian:"книга", correct_sequence:["βιβλίον"], all_words:["βιβλίον","πλοῖον","ἔργον","δαιμόνιον"]},
                {russian:"лодка", correct_sequence:["πλοῖον"], all_words:["πλοῖον","βιβλίον","ἔργον","θάλασσα"]},
                {russian:"дело", correct_sequence:["ἔργον"], all_words:["ἔργον","βιβλίον","πλοῖον","δαιμόνιον"]},
                {russian:"море", correct_sequence:["θάλασσα"], all_words:["θάλασσα","πλοῖον","ἔργον","βιβλίον"]},
                {russian:"бес", correct_sequence:["δαιμόνιον"], all_words:["δαιμόνιον","ἔργον","βιβλίον","πλοῖον"]},
                {russian:"ещё не", correct_sequence:["οὔπω"], all_words:["οὔπω","οὐκέτι","ἔτι","οὐδέ"]},
                {russian:"ещё", correct_sequence:["ἔτι"], all_words:["ἔτι","οὔπω","οὐκέτι","τότε"]},
                {russian:"и не, даже не", correct_sequence:["οὐδέ"], all_words:["οὐδέ","καί","οὔπω","ἔτι"]},
                {russian:"к морю", correct_sequence:["πρὸς","τὴν","θάλασσαν"], all_words:["πρὸς","τὴν","θάλασσαν","τὸν","οἶκον"]},
                {russian:"в книге Господа", correct_sequence:["ἐν","τῷ","βιβλίῳ","τοῦ","κυρίου"], all_words:["ἐν","τῷ","βιβλίῳ","τοῦ","κυρίου","τὸν","οἶκον"]}
            ],
            case_number: [
                {form:"ἐλυόμην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἐλύου", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐλύετο", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐλύεσθε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἐλύοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἠρχόμην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἀπήρχοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐξεπορεύετο", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐδέχου", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"συνήρχοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐφέρετο", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐβλέπετο", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἠκούοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐδιδασκόμην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἐγράφοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"ἐγράφοντο οὗτοι οἱ λόγοι ἐν τῷ βιβλίῳ τοῦ κυρίου.", correct:"Эти слова были написаны в книге Господа."},
                {source:"ἐδιδασκόμην ὑπ' αὐτοῦ ἐκ τῶν βιβλίων τῶν προφητῶν.", correct:"Я был учим им из книг пророков."},
                {source:"ἐν ἐκείναις ταῖς ἡμέραις καὶ ἐδιδασκόμεθα ὑπ' αὐτοῦ καὶ ἐδιδάσκομεν τοὺς ἄλλους, ἀλλὰ νῦν οὐδὲ διδασκόμεθα οὐδὲ διδάσκομεν.", correct:"В те дни мы и учились у него, и учили других, а теперь ни учимся, ни учим."},
                {source:"ἀπήρχοντο οἱ ἁμαρτωλοὶ πρὸς τὴν θάλασσαν.", correct:"Грешники уходили к морю."},
                {source:"ἐξεπορεύετο πρὸς αὐτὸν ἡ ἐκκλησία, ἀλλὰ νῦν οὐκέτι ἐκπορεύεται.", correct:"Церковь выходила к нему, но теперь уже не выходит."},
                {source:"οὔπω βλέπομεν τὸν κύριον ἐν τῇ δόξῃ αὐτοῦ, ἀλλὰ ἐδιδασκόμεθα ὑπ' αὐτοῦ καὶ ἐν ταῖς ἡμέραις ταῖς κακαῖς.", correct:"Мы ещё не видим Господа в его славе, но были учимы им и в злые дни."},
                {source:"ἐλέγετο ἐν τῷ ἱερῷ καλὸς λόγος περὶ τούτου τοῦ ἀποστόλου.", correct:"В храме говорилось доброе слово об этом апостоле."},
                {source:"περὶ αὐτὸν ἐβλέπετο ἡ δόξα αὐτοῦ.", correct:"Вокруг него виделась его слава."},
                {source:"ἐφέρετο τὰ δῶρα καὶ πρὸς τοὺς πονηροὺς δεσπότας.", correct:"Дары несли и к злым господам."},
                {source:"ἐδέχου τὰ βιβλία παρὰ τῶν προφητῶν.", correct:"Ты принимал книги от пророков."},
                {source:"συνήρχοντο οἱ μαθηταὶ πρὸς τοῦτον.", correct:"Ученики сходились к нему."},
                {source:"τὰ ἔργα τοῦ πονηροῦ πονηρά ἐστιν.", correct:"Дела злого — злы."},
                {source:"οὐδὲ αὐτὸς πονηρὸς οὐδὲ τὰ ἔργα αὐτοῦ πονηρά.", correct:"Ни сам он не злой, ни дела его не злы."},
                {source:"ὑπὲρ τῆς ἐκκλησίας αὐτοῦ ἀπέθνῃσκεν ὁ κύριος.", correct:"За свою церковь умирал Господь."},
                {source:"οὐκ ἔστιν μαθητὴς ὑπὲρ τὸν διδάσκαλον αὐτοῦ οὐδὲ δοῦλος ὑπὲρ τὸν κύριον αὐτοῦ.", correct:"Нет ученика выше своего учителя и раба выше своего господина."},
                {source:"ἐν τῷ πλοίῳ ἦγον πρὸς τὸν κύριον διὰ τῆς θαλάσσης.", correct:"В лодке они везли к Господу через море."},
                {source:"ἐξήρχεσθε ἐκ τῶν οἴκων ὑμῶν.", correct:"Вы выходили из ваших домов."},
                {source:"ταῦτα τὰ δαιμόνια ἐξήρχετο διὰ τοῦ λόγου αὐτοῦ.", correct:"Эти бесы выходили через его слово."},
                {source:"ἠκούοντο καὶ ἤκουον, ἀκούονται καὶ ἀκούουσιν.", correct:"Они были слышимы и слышали, они слышимы и слышат."},
                {source:"ἠρχόμην πρὸς τὸν κύριον, ἦγον δὲ καὶ τοὺς ἄλλους ἁμαρτωλούς.", correct:"Я приходил к Господу и приводил также других грешников."}
            ],
            ru_to_el: [
                { source: "Эти слова были написаны в книге Господа.", correct: ["ἐγράφοντο","οὗτοι","οἱ","λόγοι","ἐν","τῷ","βιβλίῳ","τοῦ","κυρίου"] },
                { source: "Грешники уходили к морю.", correct: ["ἀπήρχοντο","οἱ","ἁμαρτωλοὶ","πρὸς","τὴν","θάλασσαν"] },
                { source: "Мы ещё не видим Господа в его славе, но были учимы им и в злые дни.", correct: ["οὔπω","βλέπομεν","τὸν","κύριον","ἐν","τῇ","δόξῃ","αὐτοῦ","ἀλλὰ","ἐδιδασκόμεθα","ὑπ'","αὐτοῦ","καὶ","ἐν","ταῖς","ἡμέραις","ταῖς","κακαῖς"] },
                { source: "Ты принимал книги от пророков.", correct: ["ἐδέχου","τὰ","βιβλία","παρὰ","τῶν","προφητῶν"] },
                { source: "Ученики сходились к нему.", correct: ["συνήρχοντο","οἱ","μαθηταὶ","πρὸς","τοῦτον"] },
                { source: "Ни сам он не злой, ни дела его не злы.", correct: ["οὐδὲ","αὐτὸς","πονηρὸς","οὐδὲ","τὰ","ἔργα","αὐτοῦ","πονηρά"] },
                { source: "За свою церковь умирал Господь.", correct: ["ὑπὲρ","τῆς","ἐκκλησίας","αὐτοῦ","ἀπέθνῃσκεν","ὁ","κύριος"] },
                { source: "Нет ученика выше своего учителя и раба выше своего господина.", correct: ["οὐκ","ἔστιν","μαθητὴς","ὑπὲρ","τὸν","διδάσκαλον","αὐτοῦ","οὐδὲ","δοῦλος","ὑπὲρ","τὸν","κύριον","αὐτοῦ"] },
                { source: "Вы выходили из ваших домов.", correct: ["ἐξήρχεσθε","ἐκ","τῶν","οἴκων","ὑμῶν"] },
                { source: "Эти бесы выходили через его слово.", correct: ["ταῦτα","τὰ","δαιμόνια","ἐξήρχετο","διὰ","τοῦ","λόγου","αὐτοῦ"] },
                { source: "Я приходил к Господу и приводил также других грешников.", correct: ["ἠρχόμην","πρὸς","τὸν","κύριον","ἦγον","δὲ","καὶ","τοὺς","ἄλλους","ἁμαρτωλούς"] }
            ]
        }
    },
    13: {
        title: "Futurum активного и медиального залога",
        grammar: `<b>1. Futurum Indicativi Activi и Medii</b><br>
Будущее время соответствует русскому будущему и несовершенного, и совершенного вида. От настоящего оно отличается особой основой: у правильных глаголов основа будущего образуется присоединением к глагольной основе суффикса <b>-σ-</b>, затем идут соединительные гласные и первичные личные окончания.<br>
Спряжение глагола <b>λύω</b> (освобождаю):<br>
<table>
  <tr><th>Лицо</th><th>Futurum Activi</th><th>Перевод</th><th>Futurum Medii</th><th>Перевод</th></tr>
  <tr><td>1-е ед.</td><td>λύσω</td><td>я буду освобождать</td><td>λύσομαι</td><td>я буду освобождаться</td></tr>
  <tr><td>2-е ед.</td><td>λύσεις</td><td>ты будешь освобождать</td><td>λύσῃ</td><td>ты будешь освобождаться</td></tr>
  <tr><td>3-е ед.</td><td>λύσει</td><td>он будет освобождать</td><td>λύσεται</td><td>он будет освобождаться</td></tr>
  <tr><td>1-е мн.</td><td>λύσομεν</td><td>мы будем освобождать</td><td>λυσόμεθα</td><td>мы будем освобождаться</td></tr>
  <tr><td>2-е мн.</td><td>λύσετε</td><td>вы будете освобождать</td><td>λύσεσθε</td><td>вы будете освобождаться</td></tr>
  <tr><td>3-е мн.</td><td>λύσουσι(ν)</td><td>они будут освобождать</td><td>λύσονται</td><td>они будут освобождаться</td></tr>
</table><br>
<b>2. Основа на согласный перед суффиксом -σ-</b><br>
• основа на губные <b>β, π, φ</b> → будущее на <b>ψ</b>: πέμπω → πέμψω, γράφω → γράψω<br>
• основа на заднеязычные <b>γ, κ, χ</b> → будущее на <b>ξ</b>: ἄγω → ἄξω, ἄρχω → ἄρξω. Сюда же глаголы с -σσ- в настоящем времени: κηρύσσω (из κηρυκ-ιω) → κηρύξω<br>
• основа на переднеязычные <b>τ, δ, θ</b> и на <b>ζ</b> — эти звуки перед -σ- выпадают: πείθω → πείσω, βαπτίζω → βαπτίσω<br><br>
<b>3. Глаголы, отложительные в будущем времени</b><br>
Некоторые глаголы имеют отложительные формы только в будущем времени: βαίνω имеет только медиальное будущее с активным значением — βήσομαι. Ряд глаголов образует будущее неправильно, и его форму 1-го лица надо заучивать наизусть: ἔρχομαι — ἐλεύσομαι, ἔχω — ἕξω, λαμβάνω — λήμψομαι.`,
        vocabulary: [
            {greek:"διώξω (Fut. от διώκω)", translation:"буду преследовать, гнать", type:"verb", declension_forms:{singular:{"1":"διώξω","2":"διώξεις","3":"διώξει"},plural:{"1":"διώξομεν","2":"διώξετε","3":"διώξουσι(ν)"}}},
            {greek:"δοξάζω", translation:"прославляю (Fut. δοξάσω)", type:"verb", declension_forms:{singular:{"1":"δοξάσω","2":"δοξάσεις","3":"δοξάσει"},plural:{"1":"δοξάσομεν","2":"δοξάσετε","3":"δοξάσουσι(ν)"}}},
            {greek:"ἐλεύσομαι (dep. Fut. от ἔρχομαι)", translation:"буду идти, приходить, приду", type:"verb", declension_forms:{singular:{"1":"ἐλεύσομαι","2":"ἐλεύσῃ","3":"ἐλεύσεται"},plural:{"1":"ἐλευσόμεθα","2":"ἐλεύσεσθε","3":"ἐλεύσονται"}}},
            {greek:"ἕξω (Fut. от ἔχω)", translation:"буду иметь", type:"verb", declension_forms:{singular:{"1":"ἕξω","2":"ἕξεις","3":"ἕξει"},plural:{"1":"ἕξομεν","2":"ἕξετε","3":"ἕξουσι(ν)"}}},
            {greek:"κηρύσσω", translation:"провозглашаю, проповедую (Fut. κηρύξω)", type:"verb", declension_forms:{singular:{"1":"κηρύξω","2":"κηρύξεις","3":"κηρύξει"},plural:{"1":"κηρύξομεν","2":"κηρύξετε","3":"κηρύξουσι(ν)"}}},
            {greek:"λήμψομαι (dep. Fut. от λαμβάνω)", translation:"буду брать, возьму, приму", type:"verb", declension_forms:{singular:{"1":"λήμψομαι","2":"λήμψῃ","3":"λήμψεται"},plural:{"1":"λημψόμεθα","2":"λήμψεσθε","3":"λήμψονται"}}},
            {greek:"προσεύχομαι (dep. Fut. προσεύξομαι)", translation:"молюсь", type:"verb", declension_forms:{singular:{"1":"προσεύξομαι","2":"προσεύξῃ","3":"προσεύξεται"},plural:{"1":"προσευξόμεθα","2":"προσεύξεσθε","3":"προσεύξονται"}}},
            {greek:"τυφλός, ή, όν", translation:"слепой (-ая, -ое)", type:"adjective", declension_forms:{masculine:{singular:{nom:"τυφλός",gen:"τυφλοῦ",dat:"τυφλῷ",acc:"τυφλόν",voc:"τυφλέ"},plural:{nom:"τυφλοί",gen:"τυφλῶν",dat:"τυφλοῖς",acc:"τυφλούς",voc:"τυφλοί"}},feminine:{singular:{nom:"τυφλή",gen:"τυφλῆς",dat:"τυφλῇ",acc:"τυφλήν",voc:"τυφλή"},plural:{nom:"τυφλαί",gen:"τυφλῶν",dat:"τυφλαῖς",acc:"τυφλάς",voc:"τυφλαί"}},neuter:{singular:{nom:"τυφλόν",gen:"τυφλοῦ",dat:"τυφλῷ",acc:"τυφλόν",voc:"τυφλόν"},plural:{nom:"τυφλά",gen:"τυφλῶν",dat:"τυφλοῖς",acc:"τυφλά",voc:"τυφλά"}}}},
            {greek:"ἀναβλέπω", translation:"смотрю вверх, вглядываюсь, прозреваю (Fut. ἀναβλέψω)", type:"verb", declension_forms:{singular:{"1":"ἀναβλέψω","2":"ἀναβλέψεις","3":"ἀναβλέψει"},plural:{"1":"ἀναβλέψομεν","2":"ἀναβλέψετε","3":"ἀναβλέψουσι(ν)"}}},
            {greek:"βήσομαι (dep. Fut. от βαίνω)", translation:"буду ходить", type:"verb", declension_forms:{singular:{"1":"βήσομαι","2":"βήσῃ","3":"βήσεται"},plural:{"1":"βησόμεθα","2":"βήσεσθε","3":"βήσονται"}}},
            {greek:"γενήσομαι (dep. Fut. от γίνομαι)", translation:"стану, сделаюсь (кем, чем)", type:"verb", declension_forms:{singular:{"1":"γενήσομαι","2":"γενήσῃ","3":"γενήσεται"},plural:{"1":"γενησόμεθα","2":"γενήσεσθε","3":"γενήσονται"}}},
            {greek:"γνώσομαι (dep. Fut. от γινώσκω)", translation:"буду знать, познаю", type:"verb", declension_forms:{singular:{"1":"γνώσομαι","2":"γνώσῃ","3":"γνώσεται"},plural:{"1":"γνωσόμεθα","2":"γνώσεσθε","3":"γνώσονται"}}},
            {greek:"διδάξω (Fut. от διδάσκω)", translation:"буду учить, научу", type:"verb", declension_forms:{singular:{"1":"διδάξω","2":"διδάξεις","3":"διδάξει"},plural:{"1":"διδάξομεν","2":"διδάξετε","3":"διδάξουσι(ν)"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσω", distractors:["λύσεις","λύσει","λύσομεν"]},
                {case:"2sg", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσεις", distractors:["λύσω","λύσει","λύσετε"]},
                {case:"3sg", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσει", distractors:["λύσω","λύσεις","λύσουσι(ν)"]},
                {case:"1pl", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσομεν", distractors:["λύσω","λύσετε","λύσουσι(ν)"]},
                {case:"2pl", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσετε", distractors:["λύσομεν","λύσουσι(ν)","λύσει"]},
                {case:"3pl", word:"λύω", translation:"освобождаю (Fut.)", correct:"λύσουσι(ν)", distractors:["λύσομεν","λύσετε","λύσει"]},
                {case:"1sg", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λύσομαι", distractors:["λύσῃ","λύσεται","λυσόμεθα"]},
                {case:"2sg", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λύσῃ", distractors:["λύσομαι","λύσεται","λύσεσθε"]},
                {case:"3sg", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λύσεται", distractors:["λύσομαι","λύσῃ","λύσονται"]},
                {case:"1pl", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λυσόμεθα", distractors:["λύσεσθε","λύσονται","λύσομαι"]},
                {case:"2pl", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λύσεσθε", distractors:["λυσόμεθα","λύσονται","λύσεται"]},
                {case:"3pl", word:"λύομαι", translation:"освобождаюсь (Fut.)", correct:"λύσονται", distractors:["λυσόμεθα","λύσεσθε","λύσεται"]}
            ],
            translate_greek_to_russian: [
                // Слова урока: будущее время
                {greek:"διώξω", keywords:["преследова"]},
                {greek:"δοξάσω", keywords:["прослав"]},
                {greek:"ἐλεύσομαι", keywords:["пойду"]},
                {greek:"ἕξω", keywords:["буду иметь"]},
                {greek:"κηρύξω", keywords:["проповед"]},
                {greek:"λήμψομαι", keywords:["возьму"]},
                {greek:"προσεύξομαι", keywords:["моли"]},
                {greek:"τυφλός", keywords:["слеп"]},
                {greek:"ἀναβλέψω", keywords:["прозре"]},
                {greek:"βήσομαι", keywords:["буду ходить"]},
                {greek:"γενήσομαι", keywords:["стану"]},
                {greek:"γνώσομαι", keywords:["буду знать"]},
                {greek:"διδάξω", keywords:["буду учить"]},
                // Формы из упражнений урока
                {greek:"λύσετε", keywords:["освобождать"]},
                {greek:"ἐλεύσεται", keywords:["придёт"]},
                {greek:"γενήσεσθε", keywords:["станете"]},
                {greek:"διώξουσιν", keywords:["преследовать"]},
                {greek:"γνώσεσθε", keywords:["узнаете"]},
                {greek:"ἀναβλέψουσιν", keywords:["прозреют"]},
                {greek:"ἀπελεύσῃ", keywords:["пойдёшь"]},
                {greek:"κηρύξουσιν", keywords:["проповедовать"]},
                // Обороты из упражнений
                {greek:"ἐλεύσονται κακαὶ ἡμέραι", keywords:["придут","злые","дни"]},
                {greek:"τὰ πλοῖα ἐκ τῆς θαλάσσης", keywords:["лодки","моря"]}
            ],
            translate_russian_to_greek: [
                {russian:"я буду преследовать", correct_sequence:["διώξω"], all_words:["διώξω","διδάξω","δοξάσω","κηρύξω"]},
                {russian:"я буду иметь", correct_sequence:["ἕξω"], all_words:["ἕξω","ἔχω","λύσω","γνώσομαι"]},
                {russian:"я буду знать", correct_sequence:["γνώσομαι"], all_words:["γνώσομαι","οἶδα","λήμψομαι","ἕξω"]},
                {russian:"я буду учить", correct_sequence:["διδάξω"], all_words:["διδάξω","διώξω","κηρύξω","δοξάσω"]},
                {russian:"я буду брать", correct_sequence:["λήμψομαι"], all_words:["λήμψομαι","προσεύξομαι","γενήσομαι","λύσομαι"]},
                {russian:"я буду молиться", correct_sequence:["προσεύξομαι"], all_words:["προσεύξομαι","λήμψομαι","γενήσομαι","βήσομαι"]},
                {russian:"я приду", correct_sequence:["ἐλεύσομαι"], all_words:["ἐλεύσομαι","βήσομαι","γενήσομαι","λύσομαι"]},
                {russian:"я стану", correct_sequence:["γενήσομαι"], all_words:["γενήσομαι","βήσομαι","ἐλεύσομαι","γνώσομαι"]},
                {russian:"я буду ходить", correct_sequence:["βήσομαι"], all_words:["βήσομαι","γενήσομαι","ἐλεύσομαι","λύσομαι"]},
                {russian:"слепой", correct_sequence:["τυφλός"], all_words:["τυφλός","ἀγαθός","πονηρός","πιστός"]},
                {russian:"ты освободишь рабов", correct_sequence:["λύσεις","τοὺς","δούλους"], all_words:["λύσεις","τοὺς","δούλους","λύσει","τὸν","κύριον"]},
                {russian:"вы возьмёте лодки из моря", correct_sequence:["λήμψεσθε","τὰ","πλοῖα","ἐκ","τῆς","θαλάσσης"], all_words:["λήμψεσθε","τὰ","πλοῖα","ἐκ","τῆς","θαλάσσης","τὸν","οἶκον"]}
            ],
            case_number: [
                {form:"λύσεις", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"λύσει", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"λύσετε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"λύσονται", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"λήμψεσθε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"λήμψονται", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"γενήσεσθε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"γνώσομαι", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"γνώσεσθε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"προσεύξῃ", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐλεύσεται", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐλεύσονται", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"ἄξει ὁ κύριος τοὺς μαθητὰς αὐτοῦ εἰς τὴν βασιλείαν.", correct:"Приведёт Господь своих учеников в Царство."},
                {source:"γνώσομαι καὶ τοὺς ἀγαθοὺς καὶ τοὺς πονηρούς.", correct:"Я буду знать и хороших, и плохих."},
                {source:"λήμψεσθε τὰ πλοῖα ἐκ τῆς θαλάσσης.", correct:"Вы возьмёте лодки из моря."},
                {source:"λύσεις τοὺς δούλους.", correct:"Ты освободишь рабов."},
                {source:"ἕξουσιν οἱ πονηροὶ οὐδὲ χαρὰν οὐδὲ εἰρήνην.", correct:"У злых не будет ни радости, ни мира."},
                {source:"ἐν ἐκείνῃ τῇ ὥρᾳ ἐλεύσεται ὁ υἱὸς τοῦ ἀνθρώπου σὺν τοῖς ἀγγέλοις αὐτοῦ.", correct:"В тот час придёт Сын Человеческий со своими ангелами."},
                {source:"ἁμαρτωλοὶ ἐστέ, γενήσεσθε δὲ μαθηταὶ τοῦ κυρίου.", correct:"Вы грешники, но станете учениками Господа."},
                {source:"διώκουσιν οἱ πονηροὶ τοὺς προφήτας, ἀλλ' ἐν ταῖς ἡμέραις τοῦ υἱοῦ τοῦ ἀνθρώπου οὐκέτι διώξουσιν αὐτούς.", correct:"Злые преследуют пророков, но в дни Сына Человеческого уже не будут их преследовать."},
                {source:"προσεύξῃ τῷ θεῷ σου καὶ δοξάσεις αὐτόν.", correct:"Ты помолишься своему Богу и прославишь его."},
                {source:"τότε γνώσεσθε ὅτι αὐτός ἐστιν ὁ κύριος.", correct:"Тогда вы узнаете, что он и есть Господь."},
                {source:"ταῦτα γνώσομαι οὐδὲ ἐγώ.", correct:"Этого не буду знать и я."},
                {source:"τοὺς ἀνθρώπους τοῦ κόσμου τούτου διδάξουσιν οἱ δοῦλοι τῆς ἁμαρτίας, ἀλλ' ἐμὲ διδάξει ὁ διδάσκαλος ὁ πιστός.", correct:"Людей этого мира будут учить рабы греха, а меня будет учить верный учитель."},
                {source:"ἐκεῖνα λήμψονται οἱ ἀπόστολοι, ταῦτα δὲ καὶ οἱ ἄλλοι μαθηταί.", correct:"То возьмут апостолы, а это — и остальные ученики."},
                {source:"διὰ τοῦ λόγου τοῦ κυρίου ἀναβλέψουσιν οἱ τυφλοὶ οὗτοι.", correct:"Через слово Господа эти слепые прозреют."},
                {source:"ὁ προφήτης αὐτὸς γράψει ταῦτα ἐν ταῖς γραφαῖς.", correct:"Сам пророк напишет это в Писаниях."},
                {source:"ἐλεύσονται κακαὶ ἡμέραι.", correct:"Придут злые дни."},
                {source:"ἀπελεύσῃ καὶ σὺ εἰς τὰς ὁδοὺς τῶν πονηρῶν καὶ διδάξεις οὕτως τοὺς ἄλλους ἀνθρώπους.", correct:"И ты пойдёшь на пути злых и так научишь других людей."},
                {source:"κηρύξουσιν καὶ αὐτοὶ τὸ εὐαγγέλιον ἐν τούτῳ τῷ κόσμῳ τῷ κακῷ.", correct:"И они будут проповедовать Евангелие в этом злом мире."},
                {source:"ἐλεύσεται καὶ αὕτη πρὸς αὐτόν, καὶ αὐτὸς διδάξει αὐτήν.", correct:"И она придёт к нему, и он научит её."},
                {source:"ἐκηρύσσετο τὸ εὐαγγέλιον ἐν ταῖς κακαῖς ἡμέραις, κηρύσσεται δὲ καὶ νῦν, ἀλλ' ἐν ἐκείνῃ τῇ ἡμέρᾳ ἐλεύσεται ὁ κύριος αὐτός.", correct:"Евангелие проповедовалось в злые дни и проповедуется теперь, но в тот день придёт сам Господь."}
            ],
            ru_to_el: [
                { source: "Приведёт Господь своих учеников в Царство.", correct: ["ἄξει","ὁ","κύριος","τοὺς","μαθητὰς","αὐτοῦ","εἰς","τὴν","βασιλείαν"] },
                { source: "Вы возьмёте лодки из моря.", correct: ["λήμψεσθε","τὰ","πλοῖα","ἐκ","τῆς","θαλάσσης"] },
                { source: "Ты освободишь рабов.", correct: ["λύσεις","τοὺς","δούλους"] },
                { source: "У злых не будет ни радости, ни мира.", correct: ["ἕξουσιν","οἱ","πονηροὶ","οὐδὲ","χαρὰν","οὐδὲ","εἰρήνην"] },
                { source: "Вы грешники, но станете учениками Господа.", correct: ["ἁμαρτωλοί","ἐστέ","γενήσεσθε","δὲ","μαθηταὶ","τοῦ","κυρίου"] },
                { source: "Тогда вы узнаете, что он и есть Господь.", correct: ["τότε","γνώσεσθε","ὅτι","αὐτός","ἐστιν","ὁ","κύριος"] },
                { source: "Через слово Господа эти слепые прозреют.", correct: ["διὰ","τοῦ","λόγου","τοῦ","κυρίου","ἀναβλέψουσιν","οἱ","τυφλοὶ","οὗτοι"] },
                { source: "Придут злые дни.", correct: ["ἐλεύσονται","κακαὶ","ἡμέραι"] },
                { source: "И она придёт к нему, и он научит её.", correct: ["ἐλεύσεται","καὶ","αὕτη","πρὸς","αὐτόν","καὶ","αὐτὸς","διδάξει","αὐτήν"] },
                { source: "Евангелие проповедовалось в злые дни и проповедуется теперь, но в тот день придёт сам Господь.", correct: ["ἐκηρύσσετο","τὸ","εὐαγγέλιον","ἐν","ταῖς","κακαῖς","ἡμέραις","κηρύσσεται","δὲ","καὶ","νῦν","ἀλλ'","ἐν","ἐκείνῃ","τῇ","ἡμέρᾳ","ἐλεύσεται","ὁ","κύριος","αὐτός"] }
            ]
        }
    },
    14: {
        title: "Аорист I активного и медиального залога",
        grammar: `<b>1. Aoristus I Indicativi Activi и Medii</b><br>
Аорист — историческое время. Он выражает совершённое, законченное действие и переводится русским прошедшим временем совершенного вида: имперфект ἔλυον — «я развязывал», аорист ἔλυσα — «я развязал».<br>
Аорист I (слабый) образуется по схеме: <b>приращение + основа + σα + окончание исторического времени</b>. Характерный признак — суффикс <b>-σα-</b>, который только в 3-м лице единственного числа видоизменяется в <b>-σε-</b>.<br>
<table>
  <tr><th>Лицо</th><th>Aoristus Activi</th><th>Перевод</th><th>Aoristus Medii</th><th>Перевод</th></tr>
  <tr><td>1-е ед.</td><td>ἔλυσα</td><td>я развязал</td><td>ἐλυσάμην</td><td>я развязался</td></tr>
  <tr><td>2-е ед.</td><td>ἔλυσας</td><td>ты развязал</td><td>ἐλύσω</td><td>ты развязался</td></tr>
  <tr><td>3-е ед.</td><td>ἔλυσε(ν)</td><td>он развязал</td><td>ἐλύσατο</td><td>он развязался</td></tr>
  <tr><td>1-е мн.</td><td>ἐλύσαμεν</td><td>мы развязали</td><td>ἐλυσάμεθα</td><td>мы развязались</td></tr>
  <tr><td>2-е мн.</td><td>ἐλύσατε</td><td>вы развязали</td><td>ἐλύσασθε</td><td>вы развязались</td></tr>
  <tr><td>3-е мн.</td><td>ἔλυσαν</td><td>они развязали</td><td>ἐλύσαντο</td><td>они развязались</td></tr>
</table><br>
В 1-м лице единственного числа активного аориста в окончании нет ν, а во 2-м лице единственного числа медиального аориста первоначальное -α-σο стянулось в -ω.<br><br>
<b>2. Основа на согласный перед -σα-</b><br>
Изменения те же, что и в будущем времени:<br>
• <b>β, π, φ + σα = ψα</b>: πέμπω → ἔπεμψα<br>
• <b>γ, κ, χ, σσ + σα = ξα</b>: δέχομαι → ἐδεξάμην, κηρύσσω → ἐκήρυξα<br>
• <b>δ, τ, θ, ζ + σα = σα</b>: πείθω → ἔπεισα, σῴζω → ἔσωσα`,
        vocabulary: [
            {greek:"ἀναβλέπω", translation:"прозреваю (Fut. ἀναβλέψω, Aor. ἀνέβλεψα)", type:"verb", declension_forms:{singular:{"1":"ἀνέβλεψα","2":"ἀνέβλεψας","3":"ἀνέβλεψε(ν)"},plural:{"1":"ἀνεβλέψαμεν","2":"ἀνεβλέψατε","3":"ἀνέβλεψαν"}}},
            {greek:"ἀπολύω", translation:"освобождаю (Fut. ἀπολύσω, Aor. ἀπέλυσα)", type:"verb", declension_forms:{singular:{"1":"ἀπέλυσα","2":"ἀπέλυσας","3":"ἀπέλυσε(ν)"},plural:{"1":"ἀπελύσαμεν","2":"ἀπελύσατε","3":"ἀπέλυσαν"}}},
            {greek:"ἐπιστρέφω", translation:"поворачиваюсь, возвращаюсь, обращаюсь (Fut. ἐπιστρέψω, Aor. ἐπέστρεψα)", type:"verb", declension_forms:{singular:{"1":"ἐπέστρεψα","2":"ἐπέστρεψας","3":"ἐπέστρεψε(ν)"},plural:{"1":"ἐπεστρέψαμεν","2":"ἐπεστρέψατε","3":"ἐπέστρεψαν"}}},
            {greek:"ἑτοιμάζω", translation:"приготовляю, готовлю (Fut. ἑτοιμάσω, Aor. ἡτοίμασα)", type:"verb", declension_forms:{singular:{"1":"ἡτοίμασα","2":"ἡτοίμασας","3":"ἡτοίμασε(ν)"},plural:{"1":"ἡτοιμάσαμεν","2":"ἡτοιμάσατε","3":"ἡτοίμασαν"}}},
            {greek:"ἤδη", translation:"уже", type:"adverb"},
            {greek:"θαυμάζω", translation:"удивляюсь, восхищаюсь, дивлюсь (Fut. θαυμάσω, Aor. ἐθαύμασα)", type:"verb", declension_forms:{singular:{"1":"ἐθαύμασα","2":"ἐθαύμασας","3":"ἐθαύμασε(ν)"},plural:{"1":"ἐθαυμάσαμεν","2":"ἐθαυμάσατε","3":"ἐθαύμασαν"}}},
            {greek:"θεραπεύω", translation:"лечу, исцеляю (Fut. θεραπεύσω, Aor. ἐθεράπευσα)", type:"verb", declension_forms:{singular:{"1":"ἐθεράπευσα","2":"ἐθεράπευσας","3":"ἐθεράπευσε(ν)"},plural:{"1":"ἐθεραπεύσαμεν","2":"ἐθεραπεύσατε","3":"ἐθεράπευσαν"}}},
            {greek:"κηρύσσω", translation:"проповедую (Fut. κηρύξω, Aor. ἐκήρυξα)", type:"verb", declension_forms:{singular:{"1":"ἐκήρυξα","2":"ἐκήρυξας","3":"ἐκήρυξε(ν)"},plural:{"1":"ἐκηρύξαμεν","2":"ἐκηρύξατε","3":"ἐκήρυξαν"}}},
            {greek:"πείθω", translation:"убеждаю (Fut. πείσω, Aor. ἔπεισα)", type:"verb", declension_forms:{singular:{"1":"ἔπεισα","2":"ἔπεισας","3":"ἔπεισε(ν)"},plural:{"1":"ἐπείσαμεν","2":"ἐπείσατε","3":"ἔπεισαν"}}},
            {greek:"πιστεύω", translation:"верю (в кого — εἰς + Acc.) (Fut. πιστεύσω, Aor. ἐπίστευσα)", type:"verb", declension_forms:{singular:{"1":"ἐπίστευσα","2":"ἐπίστευσας","3":"ἐπίστευσε(ν)"},plural:{"1":"ἐπιστεύσαμεν","2":"ἐπιστεύσατε","3":"ἐπίστευσαν"}}},
            {greek:"ὑποστρέφω", translation:"возвращаюсь (Fut. ὑποστρέψω, Aor. ὑπέστρεψα)", type:"verb", declension_forms:{singular:{"1":"ὑπέστρεψα","2":"ὑπέστρεψας","3":"ὑπέστρεψε(ν)"},plural:{"1":"ὑπεστρέψαμεν","2":"ὑπεστρέψατε","3":"ὑπέστρεψαν"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύω", translation:"развязываю (Aor.)", correct:"ἔλυσα", distractors:["ἔλυσας","ἔλυσε(ν)","ἐλύσαμεν"]},
                {case:"2sg", word:"λύω", translation:"развязываю (Aor.)", correct:"ἔλυσας", distractors:["ἔλυσα","ἔλυσε(ν)","ἐλύσατε"]},
                {case:"3sg", word:"λύω", translation:"развязываю (Aor.)", correct:"ἔλυσε(ν)", distractors:["ἔλυσα","ἔλυσας","ἔλυσαν"]},
                {case:"1pl", word:"λύω", translation:"развязываю (Aor.)", correct:"ἐλύσαμεν", distractors:["ἔλυσα","ἐλύσατε","ἔλυσαν"]},
                {case:"2pl", word:"λύω", translation:"развязываю (Aor.)", correct:"ἐλύσατε", distractors:["ἐλύσαμεν","ἔλυσαν","ἔλυσε(ν)"]},
                {case:"3pl", word:"λύω", translation:"развязываю (Aor.)", correct:"ἔλυσαν", distractors:["ἐλύσαμεν","ἐλύσατε","ἔλυσε(ν)"]},
                {case:"1sg", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλυσάμην", distractors:["ἐλύσω","ἐλύσατο","ἐλυσάμεθα"]},
                {case:"2sg", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλύσω", distractors:["ἐλυσάμην","ἐλύσατο","ἐλύσασθε"]},
                {case:"3sg", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλύσατο", distractors:["ἐλυσάμην","ἐλύσω","ἐλύσαντο"]},
                {case:"1pl", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλυσάμεθα", distractors:["ἐλύσασθε","ἐλύσαντο","ἐλύσω"]},
                {case:"2pl", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλύσασθε", distractors:["ἐλυσάμεθα","ἐλύσαντο","ἐλύσατο"]},
                {case:"3pl", word:"λύομαι", translation:"развязываюсь (Aor.)", correct:"ἐλύσαντο", distractors:["ἐλυσάμεθα","ἐλύσασθε","ἐλύσατο"]}
            ],
            translate_greek_to_russian: [
                // Слова урока: аорист
                {greek:"ἀνέβλεψα", keywords:["прозре"]},
                {greek:"ἀπέλυσα", keywords:["освободи"]},
                {greek:"ἐπέστρεψα", keywords:["обрати"]},
                {greek:"ἡτοίμασα", keywords:["приготови"]},
                {greek:"ἐθαύμασα", keywords:["удиви"]},
                {greek:"ἐθεράπευσα", keywords:["исцели"]},
                {greek:"ἐκήρυξα", keywords:["проповедова"]},
                {greek:"ἔπεισα", keywords:["убеди"]},
                {greek:"ἐπίστευσα", keywords:["уверова"]},
                {greek:"ὑπέστρεψα", keywords:["возврати"]},
                {greek:"ἤδη", keywords:["уже"]},
                // Формы из упражнений урока
                {greek:"ἀπέλυσεν", keywords:["освободил"]},
                {greek:"ἐπιστεύσαμεν", keywords:["уверовали"]},
                {greek:"ἐθεράπευσεν", keywords:["исцелил"]},
                {greek:"ἀνέβλεψαν", keywords:["прозрели"]},
                {greek:"ἤκουσαν", keywords:["услышали"]},
                {greek:"ἐδέξαντο", keywords:["приняли"]},
                {greek:"ἐδεξάμην", keywords:["принял"]},
                {greek:"ἐδίδαξάς", keywords:["учил"]},
                // Обороты из упражнений
                {greek:"ἡτοίμασα ὑμῖν τόπον ἐν τῷ οὐρανῷ", keywords:["приготовил","место","небе"]},
                {greek:"ἤκουσαν αὐτοῦ καὶ ἐθαύμασαν", keywords:["услышали","удивил"]}
            ],
            translate_russian_to_greek: [
                {russian:"я освободил", correct_sequence:["ἀπέλυσα"], all_words:["ἀπέλυσα","ἀπέλυσεν","ἐπίστευσα","ἐκήρυξα"]},
                {russian:"я уверовал", correct_sequence:["ἐπίστευσα"], all_words:["ἐπίστευσα","ἐπιστεύσαμεν","ἔπεισα","ἐκήρυξα"]},
                {russian:"я проповедовал", correct_sequence:["ἐκήρυξα"], all_words:["ἐκήρυξα","ἐκήρυξεν","ἔπεισα","ἐπίστευσα"]},
                {russian:"я убедил", correct_sequence:["ἔπεισα"], all_words:["ἔπεισα","ἐπίστευσα","ἐκήρυξα","ἡτοίμασα"]},
                {russian:"я приготовил", correct_sequence:["ἡτοίμασα"], all_words:["ἡτοίμασα","ἔπεισα","ἀπέλυσα","ἐθεράπευσα"]},
                {russian:"я исцелил", correct_sequence:["ἐθεράπευσα"], all_words:["ἐθεράπευσα","ἡτοίμασα","ἐθαύμασα","ἀπέλυσα"]},
                {russian:"я удивился", correct_sequence:["ἐθαύμασα"], all_words:["ἐθαύμασα","ἐθεράπευσα","ἐπίστευσα","ἔπεισα"]},
                {russian:"я возвратился", correct_sequence:["ὑπέστρεψα"], all_words:["ὑπέστρεψα","ἐπέστρεψα","ἀνέβλεψα","ἀπέλυσα"]},
                {russian:"я прозрел", correct_sequence:["ἀνέβλεψα"], all_words:["ἀνέβλεψα","ἀπέλυσα","ὑπέστρεψα","ἐθαύμασα"]},
                {russian:"мы уверовали в Господа", correct_sequence:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον"], all_words:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","ἐπιστεύσατε","τῆς","θαλάσσης"]},
                {russian:"вы обратились к Господу", correct_sequence:["ἐπεστρέψατε","πρὸς","τὸν","κύριον"], all_words:["ἐπεστρέψατε","πρὸς","τὸν","κύριον","ἐπέστρεψα","τῆς","θαλάσσης"]},
                {russian:"слепые прозрели", correct_sequence:["ἀνέβλεψαν","οἱ","τυφλοί"], all_words:["ἀνέβλεψαν","οἱ","τυφλοί","ἀνέβλεψα","τοὺς","δούλους"]}
            ],
            case_number: [
                {form:"ἔλυσα", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἔλυσας", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐλύσαμεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἔλυσαν", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐλυσάμην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἐλύσω", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐλύσατο", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐλύσαντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἀπέλυσεν", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐπιστεύσαμεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἐθεράπευσεν", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἤκουσαν", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"ἀπέλυσεν ὁ κύριος τὸν δοῦλον αὐτοῦ, ὁ δὲ δοῦλος οὐκ ἀπέλυσεν ἄλλον.", correct:"Господь освободил своего раба, а раб не освободил другого."},
                {source:"ἤδη ἐπέστρεψαν οὗτοι πρὸς τὸν κύριον, ἐκεῖνοι δὲ ἐπιστρέψουσιν ἐν ταῖς ἡμέραις ταῖς κακαῖς.", correct:"Эти уже обратились к Господу, а те обратятся в злые дни."},
                {source:"ἐπιστεύσαμεν εἰς τὸν κύριον καὶ σώσει ἡμᾶς.", correct:"Мы уверовали в Господа, и он спасёт нас."},
                {source:"καὶ ἐπίστευσας εἰς αὐτὸν καὶ πιστεύσεις.", correct:"И ты уверовал в него, и будешь веровать."},
                {source:"ὑπέστρεψας πρὸς τὸν κύριον καὶ ἐδέξατό σε εἰς τὴν ἐκκλησίαν αὐτοῦ.", correct:"Ты возвратился к Господу, и он принял тебя в свою церковь."},
                {source:"ἐν ἐκείναις ταῖς ἡμέραις ἐπορεύεσθε ἐν ταῖς ὁδοῖς ταῖς κακαῖς.", correct:"В те дни вы ходили по злым путям."},
                {source:"ἐπεστρέψατε πρὸς τὸν κύριον καὶ ἐθεράπευσεν ὑμᾶς.", correct:"Вы обратились к Господу, и он исцелил вас."},
                {source:"ἐκεῖνοι πονηροί, ἀλλ' ἡμεῖς ἐπείσαμεν αὐτούς.", correct:"Те злы, но мы убедили их."},
                {source:"ἡτοίμασα ὑμῖν τόπον ἐν τῷ οὐρανῷ.", correct:"Я приготовил вам место на небе."},
                {source:"ἐδεξάμην σε εἰς τὸν οἶκόν μου, ἀλλ' οὗτοι οἱ πονηροὶ οὐκ ἐδέξαντο.", correct:"Я принял тебя в свой дом, а эти злые не приняли."},
                {source:"ἀνέβλεψαν οἱ τυφλοί.", correct:"Слепые прозрели."},
                {source:"πονηροὶ ἦσαν αὐτοί, πονηροὺς δὲ ἔπεμψαν εἰς τὴν ἐκκλησίαν.", correct:"Сами они были злыми, а в церковь послали злых."},
                {source:"ἐδίδαξάς με ἐν τῷ ἱερῷ.", correct:"Ты учил меня в храме."},
                {source:"τότε ἠκούσαμεν ταύτας τὰς ἐντολάς, ἄλλας δὲ ἀκούσομεν ἐν τῇ ἐκκλησίᾳ.", correct:"Тогда мы услышали эти заповеди, а другие услышим в церкви."},
                {source:"ἐν ἐκείνῃ τῇ ὥρᾳ ἐξελεύσονται ἐκ τοῦ κόσμου, τότε δὲ ἐδέξαντο ἡμᾶς.", correct:"В тот час они выйдут из мира, а тогда они приняли нас."},
                {source:"ἤκουσαν αὐτοῦ καὶ ἐθαύμασαν.", correct:"Они услышали его и удивились."},
                {source:"ἐδέξω σὺ τὸ εὐαγγέλιον, οὗτοι δὲ οὐ δέξονται αὐτό.", correct:"Ты принял Евангелие, а эти не примут его."},
                {source:"οὐδὲ ἠκούσατε τὸν κύριον οὐδὲ ἐπιστεύσατε εἰς αὐτόν.", correct:"Вы ни послушали Господа, ни уверовали в него."}
            ],
            ru_to_el: [
                { source: "Господь освободил своего раба, а раб не освободил другого.", correct: ["ἀπέλυσεν","ὁ","κύριος","τὸν","δοῦλον","αὐτοῦ","ὁ","δὲ","δοῦλος","οὐκ","ἀπέλυσεν","ἄλλον"] },
                { source: "Мы уверовали в Господа, и он спасёт нас.", correct: ["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","καὶ","σώσει","ἡμᾶς"] },
                { source: "Вы обратились к Господу, и он исцелил вас.", correct: ["ἐπεστρέψατε","πρὸς","τὸν","κύριον","καὶ","ἐθεράπευσεν","ὑμᾶς"] },
                { source: "Я приготовил вам место на небе.", correct: ["ἡτοίμασα","ὑμῖν","τόπον","ἐν","τῷ","οὐρανῷ"] },
                { source: "Слепые прозрели.", correct: ["ἀνέβλεψαν","οἱ","τυφλοί"] },
                { source: "Ты учил меня в храме.", correct: ["ἐδίδαξάς","με","ἐν","τῷ","ἱερῷ"] },
                { source: "Они услышали его и удивились.", correct: ["ἤκουσαν","αὐτοῦ","καὶ","ἐθαύμασαν"] },
                { source: "Вы ни послушали Господа, ни уверовали в него.", correct: ["οὐδὲ","ἠκούσατε","τὸν","κύριον","οὐδὲ","ἐπιστεύσατε","εἰς","αὐτόν"] }
            ]
        }
    },
    15: {
        title: "Аорист II активного и медиального залога",
        grammar: `<b>1. Aoristus II Indicativi Activi и Medii</b><br>
Второй (сильный) аорист образуют немногие, но часто встречающиеся глаголы. Схема: <b>приращение + чистая глагольная основа + вторичные личные окончания</b>.<br>
Например, у λαμβάνω презентная основа λαμβαν-, а чистая глагольная основа λαβ-, поэтому 1-е лицо аориста II — ἔλαβον. Чистую основу надо запоминать для каждого такого глагола.<br>
Спряжение глагола <b>λείπω</b> (оставляю, покидаю; основа λιπ-) в аористе II:<br>
<table>
  <tr><th>Лицо</th><th>Aoristus II Activi</th><th>Перевод</th><th>Aoristus II Medii</th><th>Перевод</th></tr>
  <tr><td>1-е ед.</td><td>ἔλιπον</td><td>я покинул</td><td>ἐλιπόμην</td><td>я покинул (сам)</td></tr>
  <tr><td>2-е ед.</td><td>ἔλιπες</td><td>ты покинул</td><td>ἐλίπου</td><td>ты покинул</td></tr>
  <tr><td>3-е ед.</td><td>ἔλιπε(ν)</td><td>он покинул</td><td>ἐλίπετο</td><td>он покинул</td></tr>
  <tr><td>1-е мн.</td><td>ἐλίπομεν</td><td>мы покинули</td><td>ἐλιπόμεθα</td><td>мы покинули</td></tr>
  <tr><td>2-е мн.</td><td>ἐλίπετε</td><td>вы покинули</td><td>ἐλίπεσθε</td><td>вы покинули</td></tr>
  <tr><td>3-е мн.</td><td>ἔλιπον</td><td>они покинули</td><td>ἐλίποντο</td><td>они покинули</td></tr>
</table><br>
<b>2. Супплетивный аорист</b><br>
У некоторых глаголов аорист образуется от основы другого глагола; обычно и будущее у них супплетивное. Самые употребительные:<br>
<table>
  <tr><th>Praesens</th><th>Futurum</th><th>Aoristus</th></tr>
  <tr><td>ὁράω (вижу)</td><td>ὄψομαι</td><td>εἶδον</td></tr>
  <tr><td>ἔρχομαι (прихожу)</td><td>ἐλεύσομαι</td><td>ἦλθον</td></tr>
  <tr><td>ἔχω (имею)</td><td>ἕξω</td><td>ἔσχον</td></tr>
  <tr><td>λέγω (говорю)</td><td>ἐρῶ</td><td>εἶπον</td></tr>
  <tr><td>φέρω (несу)</td><td>οἴσω</td><td>ἤνεγκον</td></tr>
</table><br>
Формы 1-го лица единственного числа аориста и будущего времени у таких глаголов заучивают наизусть. То же явление есть и в русском языке: иду — пошёл, говорю — сказал.`,
        vocabulary: [
            {greek:"γάρ", translation:"ведь, же, ибо", type:"conjunction"},
            {greek:"ἔβαλον (Aor. II от βάλλω)", translation:"я бросил", type:"verb", declension_forms:{singular:{"1":"ἔβαλον","2":"ἔβαλες","3":"ἔβαλε(ν)"},plural:{"1":"ἐβάλομεν","2":"ἐβάλετε","3":"ἔβαλον"}}},
            {greek:"ἐγενόμην (Aor. II от γίνομαι)", translation:"я стал", type:"verb", declension_forms:{singular:{"1":"ἐγενόμην","2":"ἐγένου","3":"ἐγένετο"},plural:{"1":"ἐγενόμεθα","2":"ἐγένεσθε","3":"ἐγένοντο"}}},
            {greek:"εἶδον (Aor. II от βλέπω, ὁράω)", translation:"я увидел", type:"verb", declension_forms:{singular:{"1":"εἶδον","2":"εἶδες","3":"εἶδε(ν)"},plural:{"1":"εἴδομεν","2":"εἴδετε","3":"εἶδον"}}},
            {greek:"εἶπον (Aor. II от λέγω)", translation:"я сказал", type:"verb", declension_forms:{singular:{"1":"εἶπον","2":"εἶπες","3":"εἶπε(ν)"},plural:{"1":"εἴπομεν","2":"εἴπετε","3":"εἶπον"}}},
            {greek:"ἔλαβον (Aor. II от λαμβάνω)", translation:"я взял, принял", type:"verb", declension_forms:{singular:{"1":"ἔλαβον","2":"ἔλαβες","3":"ἔλαβε(ν)"},plural:{"1":"ἐλάβομεν","2":"ἐλάβετε","3":"ἔλαβον"}}},
            {greek:"ἤγαγον (Aor. II от ἄγω)", translation:"я повёл", type:"verb", declension_forms:{singular:{"1":"ἤγαγον","2":"ἤγαγες","3":"ἤγαγε(ν)"},plural:{"1":"ἠγάγομεν","2":"ἠγάγετε","3":"ἤγαγον"}}},
            {greek:"ἦλθον (Aor. II от ἔρχομαι)", translation:"я пришёл", type:"verb", declension_forms:{singular:{"1":"ἦλθον","2":"ἦλθες","3":"ἦλθε(ν)"},plural:{"1":"ἤλθομεν","2":"ἤλθετε","3":"ἦλθον"}}},
            {greek:"ἤνεγκον (Aor. II от φέρω)", translation:"я принёс, понёс", type:"verb", declension_forms:{singular:{"1":"ἤνεγκον","2":"ἤνεγκες","3":"ἤνεγκε(ν)"},plural:{"1":"ἠνέγκομεν","2":"ἠνέγκετε","3":"ἤνεγκον"}}},
            {greek:"λείπω", translation:"оставляю, покидаю (Aor. II ἔλιπον)", type:"verb", declension_forms:{singular:{"1":"ἔλιπον","2":"ἔλιπες","3":"ἔλιπε(ν)"},plural:{"1":"ἐλίπομεν","2":"ἐλίπετε","3":"ἔλιπον"}}},
            {greek:"ὄψομαι (dep. Fut. от ὁράω)", translation:"увижу", type:"verb", declension_forms:{singular:{"1":"ὄψομαι","2":"ὄψῃ","3":"ὄψεται"},plural:{"1":"ὀψόμεθα","2":"ὄψεσθε","3":"ὄψονται"}}},
            {greek:"οὔπω", translation:"ещё не", type:"adverb"},
            {greek:"πίπτω", translation:"падаю (Aor. II ἔπεσον)", type:"verb", declension_forms:{singular:{"1":"ἔπεσον","2":"ἔπεσες","3":"ἔπεσε(ν)"},plural:{"1":"ἐπέσομεν","2":"ἐπέσετε","3":"ἔπεσον"}}},
            {greek:"προσφέρω", translation:"приношу", type:"verb", declension_forms:{singular:{"1":"προσφέρω","2":"προσφέρεις","3":"προσφέρει"},plural:{"1":"προσφέρομεν","2":"προσφέρετε","3":"προσφέρουσι(ν)"}}},
            {greek:"συνάγω", translation:"собираю", type:"verb", declension_forms:{singular:{"1":"συνάγω","2":"συνάγεις","3":"συνάγει"},plural:{"1":"συνάγομεν","2":"συνάγετε","3":"συνάγουσι(ν)"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λείπω", translation:"покидаю", correct:"ἔλιπον", distractors:["ἔλιπες","ἔλιπε(ν)","ἐλίπομεν"]},
                {case:"2sg", word:"λείπω", translation:"покидаю", correct:"ἔλιπες", distractors:["ἔλιπον","ἔλιπε(ν)","ἐλίπετε"]},
                {case:"3sg", word:"λείπω", translation:"покидаю", correct:"ἔλιπε(ν)", distractors:["ἔλιπον","ἔλιπες","ἔλιπον"]},
                {case:"1pl", word:"λείπω", translation:"покидаю", correct:"ἐλίπομεν", distractors:["ἐλίπετε","ἔλιπον","ἔλιπες"]},
                {case:"2pl", word:"λείπω", translation:"покидаю", correct:"ἐλίπετε", distractors:["ἐλίπομεν","ἔλιπον","ἔλιπε(ν)"]},
                {case:"3pl", word:"λείπω", translation:"покидаю", correct:"ἔλιπον", distractors:["ἐλίπομεν","ἐλίπετε","ἔλιπες"]},
                {case:"1sg", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλιπόμην", distractors:["ἐλίπου","ἐλίπετο","ἐλιπόμεθα"]},
                {case:"2sg", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλίπου", distractors:["ἐλιπόμην","ἐλίπετο","ἐλίπεσθε"]},
                {case:"3sg", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλίπετο", distractors:["ἐλιπόμην","ἐλίπου","ἐλίποντο"]},
                {case:"1pl", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλιπόμεθα", distractors:["ἐλίπεσθε","ἐλίποντο","ἐλίπου"]},
                {case:"2pl", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλίπεσθε", distractors:["ἐλιπόμεθα","ἐλίποντο","ἐλίπετο"]},
                {case:"3pl", word:"λείπομαι", translation:"покидаю (себя)", correct:"ἐλίποντο", distractors:["ἐλιπόμεθα","ἐλίπεσθε","ἐλίπετο"]}
            ],
            translate_greek_to_russian: [
                // Супплетивные и «сильные» аористы урока
                {greek:"ἔβαλον", keywords:["бросил"]},
                {greek:"ἐγενόμην", keywords:["стал"]},
                {greek:"εἶδον", keywords:["увидел"]},
                {greek:"εἶπον", keywords:["сказал"]},
                {greek:"ἔλαβον", keywords:["взял"]},
                {greek:"ἤγαγον", keywords:["привёл"]},
                {greek:"ἦλθον", keywords:["пришёл"]},
                {greek:"ἤνεγκον", keywords:["принёс"]},
                {greek:"ὄψομαι", keywords:["увижу"]},
                {greek:"οὔπω", keywords:["ещё не"]},
                {greek:"ἔπεσον", keywords:["упали"]},
                {greek:"προσφέρω", keywords:["приношу"]},
                {greek:"γάρ", keywords:["ибо"]},
                // Формы из упражнений урока
                {greek:"εἴδομεν", keywords:["увидели"]},
                {greek:"ἐγένοντο", keywords:["стали"]},
                {greek:"ἔλαβον", keywords:["принял"]},
                {greek:"ἤλθετε", keywords:["пришли"]},
                {greek:"ὀψόμεθα", keywords:["увидим"]},
                {greek:"ἐξεβάλετε", keywords:["изгнали"]},
                {greek:"συνηγάγετε", keywords:["собрали"]},
                {greek:"συνήγαγεν", keywords:["собрал"]},
                // Обороты из упражнений
                {greek:"ἐν ἐκείνῃ τῇ ὥρᾳ ἐγένοντο μαθηταὶ τοῦ κυρίου", keywords:["тот","час","стали","учениками"]},
                {greek:"οἱ δὲ μαθηταὶ αὐτοῦ ἔτι μένουσιν ἐν αὐτῷ", keywords:["ученики","ещё","остаются"]}
            ],
            translate_russian_to_greek: [
                {russian:"я увидел", correct_sequence:["εἶδον"], all_words:["εἶδον","εἶπον","ἔλαβον","ἤγαγον"]},
                {russian:"я сказал", correct_sequence:["εἶπον"], all_words:["εἶπον","εἶδον","ἔλαβον","ἦλθον"]},
                {russian:"я взял", correct_sequence:["ἔλαβον"], all_words:["ἔλαβον","ἔβαλον","ἔλιπον","εἶδον"]},
                {russian:"я привёл", correct_sequence:["ἤγαγον"], all_words:["ἤγαγον","ἦλθον","ἤνεγκον","ἔβαλον"]},
                {russian:"я пришёл", correct_sequence:["ἦλθον"], all_words:["ἦλθον","ἤγαγον","ἔλαβον","εἶπον"]},
                {russian:"я принёс", correct_sequence:["ἤνεγκον"], all_words:["ἤνεγκον","ἤγαγον","ἔβαλον","ἔλαβον"]},
                {russian:"я бросил", correct_sequence:["ἔβαλον"], all_words:["ἔβαλον","ἔλαβον","ἔλιπον","πίπτω"]},
                {russian:"я покинул", correct_sequence:["ἔλιπον"], all_words:["ἔλιπον","ἔβαλον","ἔλαβον","ἦλθον"]},
                {russian:"я упал", correct_sequence:["ἔπεσον"], all_words:["ἔπεσον","ἔβαλον","ἔλιπον","ἔλαβον"]},
                {russian:"мы уверовали в Господа", correct_sequence:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον"], all_words:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","ἤγαγον","τῆς","θαλάσσης"]}
            ],
            case_number: [
                {form:"ἔβαλον", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἔβαλες", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐβάλομεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἐγένοντο", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"εἶδες", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"εἴδομεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"εἶπε(ν)", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἔλαβες", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἤλθετε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἐλίπομεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"καὶ εἴδομεν τὸν κύριον καὶ ἠκούσαμεν τοὺς λόγους αὐτοῦ.", correct:"И мы увидели Господа и услышали его слова."},
                {source:"οὐδὲ εἰσῆλθες εἰς τοὺς οἴκους αὐτῶν οὐδὲ εἶπες αὐτοῖς παραβολήν.", correct:"Ты ни вошёл в их дома, ни сказал им притчу."},
                {source:"ἐν ἐκείνῃ τῇ ὥρᾳ ἐγένοντο μαθηταὶ τοῦ κυρίου.", correct:"В тот час они стали учениками Господа."},
                {source:"οὗτοι μὲν ἐγένοντο μαθηταὶ ἀγαθοί, ἐκεῖνοι δὲ ἔτι πονηροί.", correct:"Эти стали хорошими учениками, а те — ещё злыми."},
                {source:"προσέφερον αὐτῷ τοὺς τυφλούς.", correct:"Они приносили ему слепых."},
                {source:"ἔπεσον ἐκ τοῦ οὐρανοῦ οἱ ἄγγελοι οἱ πονηροί.", correct:"С неба упали злые ангелы."},
                {source:"τὰ μὲν δαιμόνια ἐξεβάλετε, τὰ δὲ τέκνα ἐθεραπεύσατε.", correct:"Бесов вы изгнали, а детей исцелили."},
                {source:"τοὺς μὲν πονηροὺς συνηγάγετε ὑμεῖς εἰς τοὺς οἴκους ὑμῶν, τοὺς δὲ ἀγαθοὺς ἡμεῖς.", correct:"Злых вы собрали в свои дома, а хороших — мы."},
                {source:"οὐκ ἐκήρυξας τὸ εὐαγγέλιον ἐν τῇ ἐκκλησίᾳ, οὐδὲ γὰρ ἐγένου μαθητής.", correct:"Ты не проповедовал Евангелие в церкви, ведь ты не стал учеником."},
                {source:"νῦν μὲν λέγετε λόγους ἀγαθούς, εἶπον δὲ οὗτοι τοὺς αὐτοὺς λόγους καὶ ἐν ταῖς ἡμέραις ἐκείναις.", correct:"Теперь вы говорите хорошие слова, а они говорили те же слова и в те дни."},
                {source:"ἐπιστεύσαμεν εἰς τὸν κύριον, οἱ γὰρ μαθηταὶ ἤγαγον ἡμᾶς πρὸς αὐτόν.", correct:"Мы уверовали в Господа, ведь ученики привели нас к нему."},
                {source:"ταῦτα μὲν εἶπον ὑμῖν ἐν τῷ ἱερῷ, ἐκεῖνα δὲ οὔπω λέγω.", correct:"Это я сказал вам в храме, а того ещё не говорю."},
                {source:"τότε μὲν εἰσήλθετε εἰς τὴν ἐκκλησίαν, ἐν ἐκείνῃ δὲ τῇ ἡμέρᾳ εἰσελεύσεσθε εἰς τὸν οὐρανόν.", correct:"Тогда вы вошли в церковь, а в тот день войдёте в небо."},
                {source:"τότε ὀψόμεθα τὸν κύριον ἐν τῇ δόξῃ αὐτοῦ· ἐπιστεύσαμεν γὰρ εἰς αὐτόν.", correct:"Тогда мы увидим Господа в его славе, ибо мы уверовали в него."},
                {source:"ὁ μὲν κύριος ἐξῆλθε τότε ἐκ τοῦ κόσμου, οἱ δὲ μαθηταὶ αὐτοῦ ἔτι μένουσιν ἐν αὐτῷ.", correct:"Господь тогда вышел из мира, а его ученики ещё остаются в нём."},
                {source:"ταύτας τὰς ἐντολὰς ἔλαβον παρὰ τοῦ κυρίου.", correct:"Эти заповеди я принял от Господа."},
                {source:"τότε μὲν παρελάβετε τὴν ἐπαγγελίαν παρὰ τοῦ κυρίου, νῦν δὲ καὶ κηρύσσετε αὐτὴν ἐν τῷ κόσμῳ.", correct:"Тогда вы приняли обетование от Господа, а теперь и проповедуете его в мире."},
                {source:"ἤλθετε πρὸς τὸν κύριον καὶ παρελάβετε παρ' αὐτοῦ ταῦτα.", correct:"Вы пришли к Господу и приняли от него это."},
                {source:"συνήγαγεν ἡμᾶς αὐτὸς εἰς τὴν ἐκκλησίαν αὐτοῦ.", correct:"Он сам собрал нас в свою церковь."},
                {source:"εἶδον οἱ ἄνθρωποι τὸν υἱὸν τοῦ θεοῦ· ἐγένετο γὰρ αὐτὸς ἄνθρωπος καὶ ἔμενεν ἐν τούτῳ τῷ κόσμῳ.", correct:"Люди увидели Сына Божия, ибо он стал человеком и пребывал в этом мире."}
            ],
            ru_to_el: [
                { source: "И мы увидели Господа и услышали его слова.", correct: ["καὶ","εἴδομεν","τὸν","κύριον","καὶ","ἠκούσαμεν","τοὺς","λόγους","αὐτοῦ"] },
                { source: "В тот час они стали учениками Господа.", correct: ["ἐν","ἐκείνῃ","τῇ","ὥρᾳ","ἐγένοντο","μαθηταὶ","τοῦ","κυρίου"] },
                { source: "Бесов вы изгнали, а детей исцелили.", correct: ["τὰ","μὲν","δαιμόνια","ἐξεβάλετε","τὰ","δὲ","τέκνα","ἐθεραπεύσατε"] },
                { source: "Мы уверовали в Господа, ведь ученики привели нас к нему.", correct: ["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","οἱ","γὰρ","μαθηταὶ","ἤγαγον","ἡμᾶς","πρὸς","αὐτόν"] },
                { source: "Тогда мы увидим Господа в его славе, ибо мы уверовали в него.", correct: ["τότε","ὀψόμεθα","τὸν","κύριον","ἐν","τῇ","δόξῃ","αὐτοῦ","ἐπιστεύσαμεν","γὰρ","εἰς","αὐτόν"] },
                { source: "Господь тогда вышел из мира, а его ученики ещё остаются в нём.", correct: ["ὁ","μὲν","κύριος","ἐξῆλθε","τότε","ἐκ","τοῦ","κόσμου","οἱ","δὲ","μαθηταὶ","αὐτοῦ","ἔτι","μένουσιν","ἐν","αὐτῷ"] },
                { source: "Эти заповеди я принял от Господа.", correct: ["ταύτας","τὰς","ἐντολὰς","ἔλαβον","παρὰ","τοῦ","κυρίου"] },
                { source: "Вы пришли к Господу и приняли от него это.", correct: ["ἤλθετε","πρὸς","τὸν","κύριον","καὶ","παρελάβετε","παρ'","αὐτοῦ","ταῦτα"] }
            ]
        }
    },
    16: {
        title: "Аорист и будущее время пассивного залога",
        grammar: `<b>1. Aoristus Indicativi Passivi</b><br>
Признак пассивного аориста — суффикс <b>-θη-</b>, присоединяемый к глагольной основе; как и другим историческим временам, ему свойственно приращение. Формы пассивные по значению, но окончания у них вторичные <b>активного</b> залога (только в 3-м лице множественного числа вместо -ν стоит -σαν), и присоединяются они прямо к -θη-, без соединительных гласных.<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Перевод</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>ἐλύθην</td><td>я был развязан</td><td>ἐλύθημεν</td><td>мы были развязаны</td></tr>
  <tr><td>2-е</td><td>ἐλύθης</td><td>ты был развязан</td><td>ἐλύθητε</td><td>вы были развязаны</td></tr>
  <tr><td>3-е</td><td>ἐλύθη</td><td>он был развязан</td><td>ἐλύθησαν</td><td>они были развязаны</td></tr>
</table><br>
<b>2. Futurum Passivi</b><br>
Будущее пассивного залога: к основе прибавляется -θη-, затем -σ- и первичные личные окончания медио-пассива с соединительными гласными:<br>
<table>
  <tr><th>Лицо</th><th>Ед.ч.</th><th>Перевод</th><th>Мн.ч.</th><th>Перевод</th></tr>
  <tr><td>1-е</td><td>λυθήσομαι</td><td>я буду развязан</td><td>λυθησόμεθα</td><td>мы будем развязаны</td></tr>
  <tr><td>2-е</td><td>λυθήσῃ</td><td>ты будешь развязан</td><td>λυθήσεσθε</td><td>вы будете развязаны</td></tr>
  <tr><td>3-е</td><td>λυθήσεται</td><td>он будет развязан</td><td>λυθήσονται</td><td>они будут развязаны</td></tr>
</table><br>
<b>3. Изменение основы перед -θη-</b><br>
• <b>π, β + θη = φθη</b>: πέμπω → ἐπέμφθην<br>
• <b>κ, γ + θη = χθη</b>: ἄγω → ἤχθην<br>
• <b>τ, δ, θ + θη = σθη</b>: πείθω → ἐπείσθην<br><br>
<b>4. Пассивный аорист II</b><br>
У некоторых глаголов пассивный аорист образуется без θ: γράφω → ἐγράφην, ἐγράφης, ἐγράφη, ἐγράφημεν, ἐγράφητε, ἐγράφησαν. В будущем θ тоже отсутствует: γραφήσομαι, γραφήσῃ, γραφήσεται.<br><br>
<b>5. Супплетивный пассивный аорист</b><br>
Есть глаголы, образующие пассивный аорист от другой основы: λέγω — ἐρρέθην, φέρω — ἠνέχθην, ὁράω — ὥφθην. Эти формы заучивают наизусть.<br><br>
<b>6. Аорист и будущее отложительных глаголов</b><br>
Некоторые отложительные глаголы образуют аорист и будущее пассивные по форме, но с активным значением: ἀποκρίνομαι (отвечаю) — ἀπεκρίθην (я ответил). У некоторых есть обе формы с одним значением: γίνομαι — ἐγενόμην и ἐγενήθην (я стал).`,
        vocabulary: [
            {greek:"ἀναλαμβάνω", translation:"поднимаю, возношу", type:"verb", declension_forms:{singular:{"1":"ἀναλαμβάνω","2":"ἀναλαμβάνεις","3":"ἀναλαμβάνει"},plural:{"1":"ἀναλαμβάνομεν","2":"ἀναλαμβάνετε","3":"ἀναλαμβάνουσι(ν)"}}},
            {greek:"ἐβλήθην (Aor. pass. от βάλλω)", translation:"я был брошен", type:"verb", declension_forms:{singular:{"1":"ἐβλήθην","2":"ἐβλήθης","3":"ἐβλήθη"},plural:{"1":"ἐβλήθημεν","2":"ἐβλήθητε","3":"ἐβλήθησαν"}}},
            {greek:"ἐγενήθην (Aor. pass. от γίνομαι)", translation:"я стал", type:"verb", declension_forms:{singular:{"1":"ἐγενήθην","2":"ἐγενήθης","3":"ἐγενήθη"},plural:{"1":"ἐγενήθημεν","2":"ἐγενήθητε","3":"ἐγενήθησαν"}}},
            {greek:"ἐγνώσθην (Aor. pass. от γινώσκω)", translation:"я был узнан, познан", type:"verb", declension_forms:{singular:{"1":"ἐγνώσθην","2":"ἐγνώσθης","3":"ἐγνώσθη"},plural:{"1":"ἐγνώσθημεν","2":"ἐγνώσθητε","3":"ἐγνώσθησαν"}}},
            {greek:"ἐδιδάχθην (Aor. pass. от διδάσκω)", translation:"я был научен", type:"verb", declension_forms:{singular:{"1":"ἐδιδάχθην","2":"ἐδιδάχθης","3":"ἐδιδάχθη"},plural:{"1":"ἐδιδάχθημεν","2":"ἐδιδάχθητε","3":"ἐδιδάχθησαν"}}},
            {greek:"ἐκηρύχθην (Aor. pass. от κηρύσσω)", translation:"я был возвещён, проповедан", type:"verb", declension_forms:{singular:{"1":"ἐκηρύχθην","2":"ἐκηρύχθης","3":"ἐκηρύχθη"},plural:{"1":"ἐκηρύχθημεν","2":"ἐκηρύχθητε","3":"ἐκηρύχθησαν"}}},
            {greek:"ἐλήμφθην (Aor. pass. от λαμβάνω)", translation:"я был взят, получен", type:"verb", declension_forms:{singular:{"1":"ἐλήμφθην","2":"ἐλήμφθης","3":"ἐλήμφθη"},plural:{"1":"ἐλήμφθημεν","2":"ἐλήμφθητε","3":"ἐλήμφθησαν"}}},
            {greek:"ἐπορεύθην (Aor. pass. от πορεύομαι)", translation:"я пошёл, отправился", type:"verb", declension_forms:{singular:{"1":"ἐπορεύθην","2":"ἐπορεύθης","3":"ἐπορεύθη"},plural:{"1":"ἐπορεύθημεν","2":"ἐπορεύθητε","3":"ἐπορεύθησαν"}}},
            {greek:"ἐρρέθην (Aor. pass. от λέγω)", translation:"я был сказан", type:"verb", declension_forms:{singular:{"1":"ἐρρέθην","2":"ἐρρέθης","3":"ἐρρέθη"},plural:{"1":"ἐρρέθημεν","2":"ἐρρέθητε","3":"ἐρρέθησαν"}}},
            {greek:"ἠγέρθην (Aor. pass. от ἐγείρω)", translation:"я был воскрешён, разбужен", type:"verb", declension_forms:{singular:{"1":"ἠγέρθην","2":"ἠγέρθης","3":"ἠγέρθη"},plural:{"1":"ἠγέρθημεν","2":"ἠγέρθητε","3":"ἠγέρθησαν"}}},
            {greek:"ἠκούσθην (Aor. pass. от ἀκούω)", translation:"я был услышан", type:"verb", declension_forms:{singular:{"1":"ἠκούσθην","2":"ἠκούσθης","3":"ἠκούσθη"},plural:{"1":"ἠκούσθημεν","2":"ἠκούσθητε","3":"ἠκούσθησαν"}}},
            {greek:"ἠνέχθην (Aor. pass. от φέρω)", translation:"я был принесён", type:"verb", declension_forms:{singular:{"1":"ἠνέχθην","2":"ἠνέχθης","3":"ἠνέχθη"},plural:{"1":"ἠνέχθημεν","2":"ἠνέχθητε","3":"ἠνέχθησαν"}}},
            {greek:"ἤχθην (Aor. pass. от ἄγω)", translation:"я был приведён", type:"verb", declension_forms:{singular:{"1":"ἤχθην","2":"ἤχθης","3":"ἤχθη"},plural:{"1":"ἤχθημεν","2":"ἤχθητε","3":"ἤχθησαν"}}},
            {greek:"ὥφθην (Aor. pass. от ὁράω, βλέπω)", translation:"я был увиден", type:"verb", declension_forms:{singular:{"1":"ὥφθην","2":"ὥφθης","3":"ὥφθη"},plural:{"1":"ὥφθημεν","2":"ὥφθητε","3":"ὥφθησαν"}}}
        ],
        exercises: {
            declension_fill: [
                {case:"1sg", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθην", distractors:["ἐλύθης","ἐλύθη","ἐλύθημεν"]},
                {case:"2sg", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθης", distractors:["ἐλύθην","ἐλύθη","ἐλύθητε"]},
                {case:"3sg", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθη", distractors:["ἐλύθην","ἐλύθης","ἐλύθησαν"]},
                {case:"1pl", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθημεν", distractors:["ἐλύθητε","ἐλύθησαν","ἐλύθης"]},
                {case:"2pl", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθητε", distractors:["ἐλύθημεν","ἐλύθησαν","ἐλύθη"]},
                {case:"3pl", word:"λύω", translation:"развязываю (Aor. pass.)", correct:"ἐλύθησαν", distractors:["ἐλύθημεν","ἐλύθητε","ἐλύθη"]},
                {case:"1sg", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθήσομαι", distractors:["λυθήσῃ","λυθήσεται","λυθησόμεθα"]},
                {case:"2sg", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθήσῃ", distractors:["λυθήσομαι","λυθήσεται","λυθήσεσθε"]},
                {case:"3sg", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθήσεται", distractors:["λυθήσομαι","λυθήσῃ","λυθήσονται"]},
                {case:"1pl", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθησόμεθα", distractors:["λυθήσεσθε","λυθήσονται","λυθήσομαι"]},
                {case:"2pl", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθήσεσθε", distractors:["λυθησόμεθα","λυθήσονται","λυθήσεται"]},
                {case:"3pl", word:"λύω", translation:"развязываю (Fut. pass.)", correct:"λυθήσονται", distractors:["λυθησόμεθα","λυθήσεσθε","λυθήσεται"]}
            ],
            translate_greek_to_russian: [
                // Слова урока: пассивный аорист
                {greek:"ἐβλήθην", keywords:["брошен"]},
                {greek:"ἐγενήθην", keywords:["стал"]},
                {greek:"ἐγνώσθην", keywords:["познан"]},
                {greek:"ἐδιδάχθην", keywords:["научен"]},
                {greek:"ἐκηρύχθην", keywords:["проповедан"]},
                {greek:"ἐλήμφθην", keywords:["взят"]},
                {greek:"ἐπορεύθην", keywords:["отправился"]},
                {greek:"ἐρρέθην", keywords:["сказан"]},
                {greek:"ἠγέρθην", keywords:["воскре"]},
                {greek:"ἠκούσθην", keywords:["услышан"]},
                {greek:"ἠνέχθην", keywords:["принес"]},
                {greek:"ἤχθην", keywords:["привед"]},
                {greek:"ὥφθην", keywords:["увиден"]},
                {greek:"ἀναλαμβάνω", keywords:["возношу"]},
                // Формы из упражнений урока
                {greek:"ἐγνώσθημεν", keywords:["познаны"]},
                {greek:"ἐδιδάχθητε", keywords:["научены"]},
                {greek:"ἐλήμφθησαν", keywords:["взяты"]},
                {greek:"ἐγενήθησαν", keywords:["стали"]},
                {greek:"ἐπορεύθημεν", keywords:["отправились"]},
                {greek:"ἐβαπτίσθης", keywords:["крещён"]},
                {greek:"ἐσώθην", keywords:["спасён"]},
                {greek:"ἐξεβλήθησαν", keywords:["изгнаны"]},
                {greek:"ἐκηρύχθη", keywords:["проповедано"]},
                // Обороты из упражнений
                {greek:"ἐγερθήσονται οἱ νεκροὶ τῷ λόγῳ τοῦ κυρίου", keywords:["воскрешены","мёртвые"]},
                {greek:"τὰ τέκνα προσηνέχθησαν τῷ κυρίῳ", keywords:["дети","принесены"]}
            ],
            translate_russian_to_greek: [
                {russian:"я был послан", correct_sequence:["ἀπεστάλην"], all_words:["ἀπεστάλην","ἐπέμφθην","ἤχθην","ἐλήμφθην"]},
                {russian:"я был брошен", correct_sequence:["ἐβλήθην"], all_words:["ἐβλήθην","ἐλήμφθην","ἤχθην","ἐρρέθην"]},
                {russian:"я был взят", correct_sequence:["ἐλήμφθην"], all_words:["ἐλήμφθην","ἐβλήθην","ἠνέχθην","ἐδιδάχθην"]},
                {russian:"я был научен", correct_sequence:["ἐδιδάχθην"], all_words:["ἐδιδάχθην","ἐκηρύχθην","ἐγνώσθην","ἐβλήθην"]},
                {russian:"я был услышан", correct_sequence:["ἠκούσθην"], all_words:["ἠκούσθην","ὥφθην","ἠγέρθην","ἐρρέθην"]},
                {russian:"я был увиден", correct_sequence:["ὥφθην"], all_words:["ὥφθην","ἠκούσθην","ἤχθην","ἐβλήθην"]},
                {russian:"я был приведён", correct_sequence:["ἤχθην"], all_words:["ἤχθην","ἠνέχθην","ὥφθην","ἐβλήθην"]},
                {russian:"я пошёл", correct_sequence:["ἐπορεύθην"], all_words:["ἐπορεύθην","ἐγενήθην","ἐλήμφθην","ἠγέρθην"]},
                {russian:"мы уверовали в Господа", correct_sequence:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον"], all_words:["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","ἐγνώσθημεν","τῆς","θαλάσσης"]},
                {russian:"дети были принесены Господу", correct_sequence:["τὰ","τέκνα","προσηνέχθησαν","τῷ","κυρίῳ"], all_words:["τὰ","τέκνα","προσηνέχθησαν","τῷ","κυρίῳ","τοὺς","δούλους"]}
            ],
            case_number: [
                {form:"ἐλύθην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ἐλύθης", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐλύθη", correct:"3-е л. ед.ч.", distractors:["1-е л. ед.ч.","2-е л. ед.ч.","3-е л. мн.ч."]},
                {form:"ἐλύθημεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἐλύθητε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἐλύθησαν", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐγνώσθημεν", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]},
                {form:"ἐδιδάχθητε", correct:"2-е л. мн.ч.", distractors:["1-е л. мн.ч.","3-е л. мн.ч.","2-е л. ед.ч."]},
                {form:"ἐλήμφθησαν", correct:"3-е л. мн.ч.", distractors:["1-е л. мн.ч.","2-е л. мн.ч.","3-е л. ед.ч."]},
                {form:"ἐβαπτίσθης", correct:"2-е л. ед.ч.", distractors:["1-е л. ед.ч.","3-е л. ед.ч.","2-е л. мн.ч."]},
                {form:"ἐσώθην", correct:"1-е л. ед.ч.", distractors:["2-е л. ед.ч.","3-е л. ед.ч.","1-е л. мн.ч."]},
                {form:"ὀφθησόμεθα", correct:"1-е л. мн.ч.", distractors:["2-е л. мн.ч.","3-е л. мн.ч.","1-е л. ед.ч."]}
            ]
        },
        translation: {
            el_to_ru: [
                {source:"ἐπιστεύσαμεν εἰς τὸν κύριον καὶ ἐγνώσθημεν ὑπ' αὐτοῦ.", correct:"Мы уверовали в Господа и были познаны им."},
                {source:"ταῦτα ἐγράφη ἐν τοῖς βιβλίοις.", correct:"Это было написано в книгах."},
                {source:"ἐδιδάξατε τὰ τέκνα, ἐδιδάχθητε δὲ καὶ αὐτοὶ ὑπὸ τοῦ κυρίου, ὁ λόγος τοῦ θεοῦ ἐρρέθη ὑπὸ τοῦ προφήτου.", correct:"Вы учили детей, но и сами были научены Господом; слово Божие было сказано пророком."},
                {source:"ἐλήμφθησαν οἱ πιστοὶ εἰς τὸν οὐρανόν, ἐξεβλήθησαν δὲ ἐξ αὐτοῦ οἱ ἄγγελοι οἱ πονηροί.", correct:"Верные были взяты в небо, а злые ангелы изгнаны из него."},
                {source:"ἐγερθήσονται οἱ νεκροὶ τῷ λόγῳ τοῦ κυρίου.", correct:"Мёртвые будут воскрешены словом Господа."},
                {source:"οὗτοι οἱ τυφλοὶ συνήχθησαν εἰς τὴν ἐκκλησίαν.", correct:"Эти слепые были собраны в церковь."},
                {source:"ἐξεβλήθη τὰ δαιμόνια· ὁ γὰρ κύριος ἐξέβαλεν αὐτά.", correct:"Бесы были изгнаны, ибо Господь изгнал их."},
                {source:"πέμπονται μὲν καὶ νῦν οἱ μαθηταί, ἐπέμφθησαν δέ τότε οἱ ἀπόστολοι καὶ πεμφθήσονται ἐν ἐκείνῃ τῇ ἡμέρᾳ καὶ οἱ ἄγγελοι.", correct:"Ученики посылаются и теперь, а тогда были посланы апостолы, и в тот день будут посланы и ангелы."},
                {source:"εἰσῆλθες εἰς τὴν ἐκκλησίαν καὶ ἐβαπτίσθης.", correct:"Ты вошёл в церковь и был крещён."},
                {source:"ἐπιστεύθη ἐν κόσμῳ, ἀνελήμφθη ἐν δόξῃ.", correct:"Он был принят верой в мире и вознесён в славе."},
                {source:"οἱ ἁμαρτωλοὶ ἐσώθησαν ἐν ἐκείνῃ τῇ ὥρᾳ καὶ ἐγενήθησαν μαθηταὶ τοῦ κυρίου.", correct:"Грешники были спасены в тот час и стали учениками Господа."},
                {source:"ἐπορεύθημεν εἰς τὸν ἄλλον τόπον, οὐ γὰρ δέξονται ἡμᾶς οὗτοι.", correct:"Мы отправились в другое место, потому что эти не примут нас."},
                {source:"ἐδοξάσθη ὁ θεὸς ὑπὸ τοῦ υἱοῦ, ἐδόξασε δὲ αὐτόν.", correct:"Бог был прославлен Сыном, и он прославил его."},
                {source:"τὸ εὐαγγέλιον ἐκηρύχθη ἐν ταῖς ἡμέραις ἐκείναις, κηρυχθήσεται δὲ καὶ νῦν.", correct:"Евангелие было проповедано в те дни и будет проповедано теперь."},
                {source:"ἑτοιμασθήσεται ὑμῖν τόπος ἐν οὐρανῷ κατὰ τὴν ἐπαγγελίαν τοῦ κυρίου.", correct:"Вам будет приготовлено место на небе по обетованию Господа."},
                {source:"τὰ τέκνα προσηνέχθησαν τῷ κυρίῳ.", correct:"Дети были принесены Господу."},
                {source:"εἶδον οὗτοι τὸ πρόσωπον τοῦ κυρίου καὶ ἤκουσαν τῆς φωνῆς αὐτοῦ.", correct:"Они увидели лицо Господа и услышали его голос."},
                {source:"ἐν τῷ μικρῷ οἴκῳ ἀκουσθήσεται ἡ φωνὴ τοῦ ἀποστόλου.", correct:"В маленьком доме будет услышан голос апостола."},
                {source:"πρῶτός εἰμι τῶν ἁμαρτωλῶν, ἐσώθην δὲ καὶ ἐγώ.", correct:"Я первый из грешников, но и я был спасён."},
                {source:"ὀψόμεθα μὲν τοὺς ἀγγέλους, ὀφθησόμεθα δὲ καὶ ὑπ' αὐτῶν.", correct:"Мы увидим ангелов, и сами будем увидены ими."}
            ],
            ru_to_el: [
                { source: "Мы уверовали в Господа и были познаны им.", correct: ["ἐπιστεύσαμεν","εἰς","τὸν","κύριον","καὶ","ἐγνώσθημεν","ὑπ'","αὐτοῦ"] },
                { source: "Верные были взяты в небо, а злые ангелы изгнаны из него.", correct: ["ἐλήμφθησαν","οἱ","πιστοὶ","εἰς","τὸν","οὐρανόν","ἐξεβλήθησαν","δὲ","ἐξ","αὐτοῦ","οἱ","ἄγγελοι","οἱ","πονηροί"] },
                { source: "Мёртвые будут воскрешены словом Господа.", correct: ["ἐγερθήσονται","οἱ","νεκροὶ","τῷ","λόγῳ","τοῦ","κυρίου"] },
                { source: "Ты вошёл в церковь и был крещён.", correct: ["εἰσῆλθες","εἰς","τὴν","ἐκκλησίαν","καὶ","ἐβαπτίσθης"] },
                { source: "Грешники были спасены в тот час и стали учениками Господа.", correct: ["οἱ","ἁμαρτωλοὶ","ἐσώθησαν","ἐν","ἐκείνῃ","τῇ","ὥρᾳ","καὶ","ἐγενήθησαν","μαθηταὶ","τοῦ","κυρίου"] },
                { source: "Дети были принесены Господу.", correct: ["τὰ","τέκνα","προσηνέχθησαν","τῷ","κυρίῳ"] },
                { source: "В маленьком доме будет услышан голос апостола.", correct: ["ἐν","τῷ","μικρῷ","οἴκῳ","ἀκουσθήσεται","ἡ","φωνὴ","τοῦ","ἀποστόλου"] },
                { source: "Мы увидим ангелов, и сами будем увидены ими.", correct: ["ὀψόμεθα","μὲν","τοὺς","ἀγγέλους","ὀφθησόμεθα","δὲ","καὶ","ὑπ'","αὐτῶν"] }
            ]
        }
    }
};