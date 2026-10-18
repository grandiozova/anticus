// ============================================================
// ENGLISH LESSON TEXT
// ============================================================
// Grammar, titles and vocabulary meanings for every Hebrew chapter in the app.
// Everything else (numbers, parts of speech, paradigms, drills) stays in the
// Russian source files and is not duplicated here.
//
// The file was generated, not typed: Greek and Hebrew forms are copied out of
// the Russian data character by character, so no breathing or vowel point can
// have moved. Regenerate with the script named in translations/en/README.md.
//
// Shape:
//   { <lesson number>: { title, grammar, vocabulary: { <headword>: <meaning> } } }
// The headword is the vocabulary entry's `greek` field, which the dictionary
// already requires to be unique.
const LESSONS_EN_HEBREW = {
    "1": {
        "title": "The Alphabet",
        "grammar": "<b>1. The Alphabet</b><br>The Hebrew alphabet consists of 22 letters. The direction of writing is <b>right to left</b>. You need to know the shape, name, pronunciation, and transliteration of every letter.<br><button type=\"button\" class=\"menu-btn text alphabet-toggle\" aria-expanded=\"false\" onclick=\"toggleAlphabetExtras()\"><span class=\"msym\" aria-hidden=\"true\">visibility</span><span class=\"alphabet-toggle__label\">Show all</span></button><br><table class=\"md-table--alphabet\">\n<tr><th>Letter</th><th>Final</th><th>Cursive</th><th>Name</th><th>Pronunciation</th><th>Transliteration</th></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">א</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">א</span></td><td>aleph</td><td>—</td><td class=\"alphabet-col--translit\">ʾ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">בּ / ב</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ב</span></td><td>bet</td><td>b / v</td><td class=\"alphabet-col--translit\">b / ḇ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">גּ / ג</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ג</span></td><td>gimel</td><td>g</td><td class=\"alphabet-col--translit\">g / ḡ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">דּ / ד</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ד</span></td><td>dalet</td><td>d</td><td class=\"alphabet-col--translit\">d / ḏ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ה</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ה</span></td><td>he</td><td>kh</td><td class=\"alphabet-col--translit\">h</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ו</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ו</span></td><td>waw</td><td>v</td><td class=\"alphabet-col--translit\">w</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ז</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ז</span></td><td>zayin</td><td>z</td><td class=\"alphabet-col--translit\">z</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ח</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ח</span></td><td>khet</td><td>kh</td><td class=\"alphabet-col--translit\">ḥ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ט</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ט</span></td><td>tet</td><td>t</td><td class=\"alphabet-col--translit\">ṭ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">י</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">י</span></td><td>yod</td><td>y</td><td class=\"alphabet-col--translit\">y</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">כּ / כ</span></td><td lang=\"he\" class=\"alphabet-col--final\"><span class=\"alphabet-glyph\">ך</span></td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">כ</span></td><td>kaf</td><td>k / kh</td><td class=\"alphabet-col--translit\">k / ḵ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ל</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ל</span></td><td>lamed</td><td>l</td><td class=\"alphabet-col--translit\">l</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">מ</span></td><td lang=\"he\" class=\"alphabet-col--final\"><span class=\"alphabet-glyph\">ם</span></td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">מ</span></td><td>mem</td><td>m</td><td class=\"alphabet-col--translit\">m</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">נ</span></td><td lang=\"he\" class=\"alphabet-col--final\"><span class=\"alphabet-glyph\">ן</span></td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">נ</span></td><td>nun</td><td>n</td><td class=\"alphabet-col--translit\">n</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ס</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ס</span></td><td>samekh</td><td>s</td><td class=\"alphabet-col--translit\">s</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ע</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ע</span></td><td>ayin</td><td>—</td><td class=\"alphabet-col--translit\">ʿ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">פּ / פ</span></td><td lang=\"he\" class=\"alphabet-col--final\"><span class=\"alphabet-glyph\">ף</span></td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">פ</span></td><td>pe</td><td>p / f</td><td class=\"alphabet-col--translit\">p / p̄</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">צ</span></td><td lang=\"he\" class=\"alphabet-col--final\"><span class=\"alphabet-glyph\">ץ</span></td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">צ</span></td><td>tsade</td><td>ts</td><td class=\"alphabet-col--translit\">ṣ</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ק</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ק</span></td><td>qof</td><td>k</td><td class=\"alphabet-col--translit\">q</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">ר</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ר</span></td><td>resh</td><td>r</td><td class=\"alphabet-col--translit\">r</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">שׂ / שׁ</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ש</span></td><td>sin / shin</td><td>s / sh</td><td class=\"alphabet-col--translit\">ś / š</td></tr>\n<tr><td lang=\"he\"><span class=\"alphabet-glyph\">תּ / ת</span></td><td class=\"alphabet-col--final\">—</td><td lang=\"he\" class=\"alphabet-col--cursive\"><span class=\"alphabet-glyph alphabet-glyph--cursive\">ת</span></td><td>taw</td><td>t</td><td class=\"alphabet-col--translit\">t / ṯ</td></tr>\n</table><br><br><b>2. Final forms</b><br>Five letters are written differently at the end of a word. The shape changes; the pronunciation and transliteration do not.<br>• כ → ך, as in דרך “road”<br>• מ → ם, as in עם “people”<br>• נ → ן, as in זקן “elder”<br>• פ → ף, as in כסף “silver”<br>• צ → ץ<br><br><b>3. The begadkefat letters</b><br>Six consonants have two pronunciations each — a stop and a fricative. What distinguishes them is a point inside the letter, the dagesh lene: with the dagesh the sound is a stop, without it a fricative. The dagesh lene occurs only in these six letters.<br><table class=\"md-table--begadkefat\">\n<tr><th>Stops</th><td lang=\"he\">בּ</td><td lang=\"he\">גּ</td><td lang=\"he\">דּ</td><td lang=\"he\">כּ</td><td lang=\"he\">פּ</td><td lang=\"he\">תּ</td></tr>\n<tr><th>Fricatives</th><td lang=\"he\">ב</td><td lang=\"he\">ג</td><td lang=\"he\">ד</td><td lang=\"he\">כ</td><td lang=\"he\">פ</td><td lang=\"he\">ת</td></tr>\n</table><br><br><b>4. Gutturals</b><br>There are four guttural consonants: א, ע, ה and ח. The consonant ר also often behaves like a guttural. Gutturals are never doubled — this will matter in chapter 5.",
        "vocabulary": {}
    },
    "2": {
        "title": "The Vowel System",
        "grammar": "<b>1. The vowel points</b><br>Originally the Hebrew script consisted of consonants alone. In the second half of the first millennium AD the Masoretes devised signs for the vowels — the vowel points — placed below, inside, or above a consonant without changing the consonants themselves. The vowel is pronounced after the consonant it belongs to: בַּ is read “ba”, not “ab”.<br><br><b>2. Summary table of the vowels</b><br>The signs are shown with the consonant בּ, so that their position relative to the letter is visible.<br><table class=\"md-table--pool\">\n<tr><th></th><th>a</th><th>e</th><th>i</th><th>o</th><th>u</th></tr>\n<tr><th>Short</th><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בַּ</span> <span class=\"md-table-pool__label\">patach</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֶּ</span> <span class=\"md-table-pool__label\">segol</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בִּ</span> <span class=\"md-table-pool__label\">hireq</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בָּ</span> <span class=\"md-table-pool__label\">qamets hatuf</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֻּ</span> <span class=\"md-table-pool__label\">qibbuts</span></span></td></tr>\n<tr><th>Long</th><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בָּ</span> <span class=\"md-table-pool__label\">qamets</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֵּ</span> <span class=\"md-table-pool__label\">tsere</span></span></td><td></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֹּ</span> <span class=\"md-table-pool__label\">holem</span></span></td><td></td></tr>\n<tr><th>Long with matres lectionis</th><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בָּה</span> <span class=\"md-table-pool__label\">qamets he</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֵּי</span> <span class=\"md-table-pool__label\">tsere yod</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בִּי</span> <span class=\"md-table-pool__label\">hireq yod</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בּוֹ</span> <span class=\"md-table-pool__label\">holem waw</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בּוּ</span> <span class=\"md-table-pool__label\">shureq</span></span></td></tr>\n<tr><th>Reduced</th><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֲּ</span> <span class=\"md-table-pool__label\">hateph patach</span></span></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֱּ</span> <span class=\"md-table-pool__label\">hateph segol</span></span></td><td></td><td lang=\"he\"><span class=\"md-table-pool__cell\"><span class=\"md-table-pool__glyph script hebrew\">בֳּ</span> <span class=\"md-table-pool__label\">hateph qamets</span></span></td><td></td></tr>\n</table><br><br><b>3. Matres lectionis</b><br>Even before the vowel points were invented, scribes marked long vowels with consonant letters:<br>• ה — long a at the end of a word<br>• י — long i and e<br>• ו — long u and o<br><br><b>4. The shewa</b><br>The sign בְּ is called shewa. It has two kinds. A silent shewa marks the absence of a vowel between consonants: it is not pronounced, not transliterated, and serves to divide syllables. A vocal shewa carries a very short, fleeting sound — half a short e; in transliteration it is ǝ. The rules for telling them apart are in chapter 3.<br><br><b>5. The dagesh forte</b><br>The point inside a consonant is not always a dagesh lene. A dagesh forte looks exactly the same, but marks the doubling of the consonant it stands in. For example, in the word הַשָּׁמַיִם “heavens” the dagesh forte stands inside שׁ. It can stand in any consonant except gutturals and ר.",
        "vocabulary": {}
    },
    "3": {
        "title": "Syllables and Reading Rules",
        "grammar": "<b>1. Two rules of syllabification</b><br>• Every syllable begins with a consonant and has exactly one vowel. A syllable cannot begin with a vowel. The word דָּבָר “word” is divided thus: דָּ|בָר.<br>• There are only two types of syllable: open and closed. An open syllable ends in a vowel, a closed one in a consonant. In דָּ|בָר the first syllable is open and the second closed.<br><br><b>2. Stress</b><br>Stress falls, as a rule, on the last syllable, and is then left unmarked. If it falls elsewhere, a sign is placed over the stressed syllable: סֵ֫פֶר “book” (סֵ֫|פֶר).<br><br><b>3. Dagesh and syllabification</b><br>A dagesh lene does not affect syllabification, a dagesh forte does: the doubled consonant serves both as the end of the first syllable and as the beginning of the second. In the word אַתָּה “you” this gives ʾat-tāh. How to tell which dagesh stands in a begadkefat letter:<br>• forte — after a vowel (אַתָּה: before תּ stands patach)<br>• lene — after a consonant (מַלְכָּה: before כּ there is ל with a silent shewa)<br>• lene — at the beginning of a word (דָּבָר)<br><br><b>4. The shewa and syllabification</b><br>It all comes down to one thing: a shewa is not read if a short vowel precedes it; in all other cases it is read. In detail — the shewa is not read:<br>• after a short vowel: פַּרְעֹה<br>• the first of two adjacent shewas: מִשְׁפְּטֵי (מִשְׁ|פְּ|טֵי)<br>• at the end of a word: כָּתַבְתְּ<br>• under a guttural: שָׁמַעְתָּ<br>The shewa is read:<br>• under the first letter of a word: בְּרָכָה<br>• the second of two adjacent shewas: מִשְׁפְּטֵי<br>• under a letter with a dagesh forte: הַמְּלָכִים<br>• after a long vowel: כֹּתְבִים<br><br><b>5. Qamets and qamets hatuf</b><br>The signs look identical, but qamets is long ā and qamets hatuf is short o. Qamets is far more common, and in doubt it is the one to choose. The rules:<br>• qamets hatuf — only in a closed unstressed syllable: חָכְמָה “wisdom”, most often the word כָּל “all”<br>• qamets — in an open pretonic or a closed stressed syllable: both vowels in דָּבָר<br>• the meteg sign (a short stroke under the letter) occurs with qamets, not with qamets hatuf: בָּֽתִּים “houses”",
        "vocabulary": {
            "יְהוָה": "Yahweh, the Lord",
            "בֵּן": "son, young man, descendant",
            "אֱלֹהִים": "God, gods",
            "מֶ֫לֶךְ": "king, royal",
            "יִשְׂרָאֵל": "Israel",
            "אֶ֫רֶץ": "land, country",
            "יוֹם": "day, today, time",
            "בַּ֫יִת": "house",
            "דָּבָר": "word, thing, matter",
            "אָב": "father, forefather",
            "שָׁנָה": "year, annual",
            "שֵׁם": "name (fame, renown), Shem",
            "עֶ֫בֶד": "servant, slave",
            "מֹשֶׁה": "Moses",
            "מִצְרַ֫יִם": "Egypt",
            "יְרוּשָׁלִַם": "Jerusalem",
            "אָדָם": "man, Adam, humanity",
            "אֵל": "God, a god, El",
            "פַּרְעֹה": "Pharaoh",
            "סוּס": "horse, steed, rider"
        }
    },
    "4": {
        "title": "Nouns",
        "grammar": "<b>1. Gender and number</b><br>A noun has gender and number. Gender is always one of two — masculine or feminine; there is no neuter. There are three numbers: singular, plural and <b>dual</b>.<br><br><b>2. Endings</b><br>• The masculine singular has no ending: <span class=\"script\">סוּס</span> “horse”<br>• Masculine plural — <span class=\"script\">יִם</span>: <span class=\"script\">סוּסִים</span><br>• Feminine singular most often <span class=\"script\">הָ</span>: <span class=\"script\">תּוֹרָה</span> “law”; other endings also occur<br>• Feminine plural — <span class=\"script\">וֹת</span>: <span class=\"script\">תּוֹרוֹת</span><br>• Dual — <span class=\"script\">יִַם</span>: <span class=\"script\">מַ֫יִם</span> “water”, <span class=\"script\">שָׁמַיִם</span> “heaven”<br><br><b>3. Dictionary form</b><br>In the dictionary a noun stands in the singular. The plural form has to be memorised: the stem often changes with it.<br><br><b>4. Exceptions</b><br>The rules do not cover everything. There are feminine nouns without a feminine ending (<span class=\"script\">אֶ֫רֶץ</span> “earth”, <span class=\"script\">נֶ֫פֶשׁ</span> “soul”), words that take the ending of the other gender, special dual forms and irregular stem changes.",
        "vocabulary": {
            "אִישׁ": "man, human being, husband",
            "עִיר": "city",
            "עַ֫יִן": "eye, sight",
            "לֵב": "heart",
            "אִשָּׁה": "woman, wife",
            "אֲדֹנָי": "Lord",
            "נֶ֫פֶשׁ": "life, soul",
            "כֹּהֵן": "priest",
            "דֶּ֫רֶךְ": "way, road, journey",
            "אָח": "brother",
            "בַּת": "daughter",
            "רֹאשׁ": "head, chief (leader)",
            "מַ֫יִם": "water",
            "גּוֹי": "nation",
            "הַר": "mountain, hill, hill country",
            "קוֹל": "voice, sound, noise, thunder",
            "צָבָא": "army, host, warfare",
            "נָבִיא": "prophet",
            "תּוֹרָה": "law, teaching, Torah",
            "סֵ֫פֶר": "book, scroll"
        }
    },
    "5": {
        "title": "The Article and the Conjunction Waw",
        "grammar": "<b>1. The form of the article</b><br>There is a definite article and no indefinite one. The article has the form <span class=\"script\">הַ</span> and is written together with the word, and <b>the first consonant of the word is doubled by it</b> — in writing this is dagesh forte: <span class=\"script\">מֶ֫לֶךְ</span> “king” → <span class=\"script\">הַמֶּ֫לֶךְ</span> “the king”.<br><br><b>2. The article and begadkefat</b><br>If a word begins with a begadkefat letter, dagesh lene is replaced by dagesh forte: <span class=\"script\">בַּ֫יִת</span> → <span class=\"script\">הַבַּ֫יִת</span>, <span class=\"script\">דֶּ֫רֶךְ</span> → <span class=\"script\">הַדֶּ֫רֶךְ</span>.<br><br><b>3. The article and the gutturals</b><br>The gutturals (<span class=\"script\">א</span>, <span class=\"script\">ע</span>, <span class=\"script\">ה</span>, <span class=\"script\">ח</span>) and <span class=\"script\">ר</span> are not doubled. Instead of doubling, one of three things happens:<br>• <b>Compensatory lengthening</b> — before <span class=\"script\">א</span>, <span class=\"script\">ע</span>, <span class=\"script\">ר</span> the patach of the article lengthens to qamets: <span class=\"script\">אִישׁ</span> → <span class=\"script\">הָאִישׁ</span>, <span class=\"script\">עִיר</span> → <span class=\"script\">הָעִיר</span><br>• <b>Virtual doubling</b> — before <span class=\"script\">ה</span> and <span class=\"script\">ח</span> the vowel does not lengthen: <span class=\"script\">הֵיכָל</span> → <span class=\"script\">הַהֵיכָל</span>, <span class=\"script\">חוֹמָה</span> → <span class=\"script\">הַחוֹמָה</span><br>• <b>Irregular segol</b> — before unaccented <span class=\"script\">עָ</span>, <span class=\"script\">הָ</span>, <span class=\"script\">חָ</span> the vowel of the article becomes segol: <span class=\"script\">חָכָם</span> → <span class=\"script\">הֶחָכָם</span><br><br><b>4. What does not change</b><br>However the pointing changes, the consonant <span class=\"script\">ה</span> of the article is always there. In a small group of words the article also changes the vowel of the stem: <span class=\"script\">אֶ֫רֶץ</span> → <span class=\"script\">הָאָ֫רֶץ</span>, <span class=\"script\">עַם</span> → <span class=\"script\">הָעָם</span>.<br><br><b>5. The conjunction waw</b><br>The conjunction “and” — <span class=\"script\">וְ</span> — is also written together with the word and has four main written forms: <span class=\"script\">וְעֶ֫בֶד</span> “and a servant”, <span class=\"script\">וְהָאִשָּׁה</span> “and the woman”.",
        "vocabulary": {
            "וְ": "and, but, also, even",
            "כֹּה": "thus, so",
            "עוֹלָם": "eternity, everlasting, endless",
            "מִשְׁפָּט": "justice, judgment, verdict, fairness",
            "שַׂר": "official, noble, prince",
            "שָׁמַיִם": "heaven, heavens, sky",
            "חֶרֶב": "sword",
            "כֶּ֫סֶף": "silver, money",
            "מִזְבֵּחַ": "altar",
            "מָקוֹם": "place",
            "יָם": "sea, west, seashore",
            "זָהָב": "gold, golden",
            "רוּחַ": "wind, spirit, breath",
            "אֵשׁ": "fire, flame",
            "נְאֻם": "utterance, oracle",
            "שַׁ֫עַר": "gate",
            "חַי": "living, alive",
            "יֶ֫לֶד": "boy, child",
            "עָנָן": "cloud, clouds",
            "הֵיכָל": "palace, temple"
        }
    },
    "6": {
        "title": "Prepositions",
        "grammar": "<b>1. Three groups of prepositions</b><br>Some prepositions are independent (written as a separate word), some are joined by maqqef (the short dash <span class=\"script\">־</span>), and some are inseparable and written together with the word.<br><br><b>2. Inseparable prepositions</b><br>There are only three of them, yet together they occur almost 39,000 times in the Hebrew Bible:<br>• <span class=\"script\">בְּ</span> — “in”, also expresses the instrumental<br>• <span class=\"script\">לְ</span> — “to”, expresses the dative<br>• <span class=\"script\">כְּ</span> — “like”<br>Before most consonants they are written with vocal shewa: <span class=\"script\">בְּשָׂדֶה</span> “in a field”, <span class=\"script\">לְנַ֫עַר</span> “to a young man”, <span class=\"script\">כְּמֶ֫לֶךְ</span> “like a king”. If the word begins with a guttural carrying a very short vowel, the preposition takes a short vowel of the same quality: <span class=\"script\">כַּאֲנָשִׁים</span> “like people”, <span class=\"script\">בֶּאֱמֶת</span> “in truth”.<br><br><b>3. The preposition min</b><br>The preposition <span class=\"script\">מִן</span> “from, out of” is joined by maqqef or written together; when written together, <span class=\"script\">נ</span> assimilates into the first consonant of the word. It also expresses the comparative and superlative degree and a part of a whole.<br><br><b>4. The marker of the definite direct object</b><br>A definite direct object is usually marked by the particle <span class=\"script\">אֶת־</span> / <span class=\"script\">אֵת</span>. <b>It is not translated</b> — it is a grammatical marker, not a preposition: <span class=\"script\">בָּרָא אֱלֹהִים אֵת הַשָּׁמַ֫יִם</span> “God created the heavens”.",
        "vocabulary": {
            "לְ": "to, for",
            "בְּ": "in, expresses the instrumental",
            "אֵת": "marker of the definite direct object, not translated",
            "מִן": "from, out of",
            "עַל": "on, upon, over, beside",
            "אֶל": "to, toward",
            "כֹּל": "all, whole",
            "כְּ": "like, as, according to",
            "עַד": "of space: as far as, up to",
            "לִפְנֵי": "before, in the presence of",
            "עִם": "with, together with",
            "אַחַר": "after, behind",
            "תַּ֫חַת": "under, below, instead of",
            "פֶּה": "mouth, edge, opening",
            "בְּתוֹךְ": "in the midst of, inside",
            "בֵּין": "between, among",
            "שָׂדֶה": "field, land",
            "לְמַ֫עַן": "for the sake of, so that",
            "מִצְוָה": "command, commandment",
            "חָכְמָה": "wisdom",
            "מַ֫עַל": "above, upwards",
            "עַל־דְּבַר": "on account of, because of"
        }
    },
    "7": {
        "title": "Adjectives",
        "grammar": "<b>1. Inflection</b><br>An adjective has four forms. The endings are the same as those of the noun.<br><table dir=\"rtl\">\n<tr><th></th><th>Masculine</th><th>Feminine</th></tr>\n<tr><th>Singular</th><td lang=\"he\">טוֹב</td><td lang=\"he\">טוֹבָה</td></tr>\n<tr><th>Plural</th><td lang=\"he\">טוֹבִים</td><td lang=\"he\">טוֹבוֹת</td></tr>\n</table><br><br><b>2. Three uses</b><br>• <b>Attributive</b> (attributive) stands <i>after</i> the noun and agrees with it in gender, number <i>and definiteness</i>: <span class=\"script\">הָאִישׁ הַטּוֹב</span> “the good man” — the article stands both on the noun and on the adjective.<br>• <b>Predicate</b> (predicative) agrees in gender and number, but <i>not</i> in definiteness: there is no article before it: <span class=\"script\">טוֹב הָאִישׁ</span> or <span class=\"script\">הָאִישׁ טוֹב</span> “The man is good”.<br>• <b>Substantival</b> — an adjective used as a noun.<br><br><b>3. The directive ending</b><br>The ending <span class=\"script\">הָ</span> means direction “to, into” and is always unaccented: <span class=\"script\">אֶל־הָאָ֫רֶץ</span> and <span class=\"script\">אַ֫רְצָה</span> — both “to the ground”.",
        "vocabulary": {
            "אֶחָד": "one, other, each",
            "כֵּן": "so, thus",
            "טוֹב": "good, kind",
            "גָּדוֹל": "great, big",
            "קֶ֫דֶשׁ": "holiness, holy thing",
            "רַב": "many, numerous, abundant",
            "עַתָּה": "now, at this time",
            "רַע": "bad, evil, wicked",
            "מְאֹד": "very, exceedingly",
            "רָשָׁע": "wicked, evil, guilty",
            "צַדִּיק": "righteous, just",
            "זָקֵן": "old",
            "חָכָם": "wise, a wise man",
            "יָשָׁר": "straight, upright, just",
            "קָדוֹשׁ": "holy",
            "מְעַט": "little, few",
            "קָטֹן": "small, youngest, insignificant",
            "רָחוֹק": "far, distant",
            "שִׁיר": "song",
            "קָרוֹב": "near, approaching",
            "דַּל": "poor, weak",
            "יָפֶה": "beautiful, fair",
            "קָשֶׁה": "hard, difficult, severe"
        }
    },
    "8": {
        "title": "Pronouns",
        "grammar": "<b>1. Independent personal pronouns</b><br>The first person is common gender; the second and third persons distinguish gender.<br><table dir=\"rtl\">\n<tr><th>Person</th><th>Singular</th><th>Plural</th></tr>\n<tr><th>1 c.</th><td lang=\"he\">אָנֹכִי / אֲנִי</td><td lang=\"he\">אֲנַ֫חְנוּ</td></tr>\n<tr><th>2 m.</th><td lang=\"he\">אַתָּה</td><td lang=\"he\">אַתֶּם</td></tr>\n<tr><th>2 f.</th><td lang=\"he\">אַתְּ</td><td lang=\"he\">אַתֵּ֫נָה</td></tr>\n<tr><th>3 m.</th><td lang=\"he\">הוּא</td><td lang=\"he\">הֵ֫מָּה / הֵם</td></tr>\n<tr><th>3 f.</th><td lang=\"he\">הִיא</td><td lang=\"he\">הֵ֫נָּה / הֵן</td></tr>\n</table><br>Examples: <span class=\"script\">אֲנִי יְהוָה</span> “I am the Lord”, <span class=\"script\">אֲנַ֫חְנוּ אַחִים</span> “We are brothers”.<br><br><b>2. Demonstrative pronouns</b><br><table dir=\"rtl\">\n<tr><th></th><th>Singular</th><th>Plural</th></tr>\n<tr><th>This (m.) / this (f.)</th><td lang=\"he\">זֶה / זֹאת</td><td lang=\"he\">אֵ֫לֶּה</td></tr>\n<tr><th>That (m.) / that (f.)</th><td lang=\"he\">הוּא / הִיא</td><td lang=\"he\">הֵ֫מָּה / הֵ֫נָּה</td></tr>\n</table><br>As an attribute the demonstrative stands <i>after</i> the word and agrees in definiteness: <span class=\"script\">הָאִישׁ הַזֶּה</span> “this man”. As a reference — <i>before</i> the word and does not agree in definiteness: <span class=\"script\">זֶה הָאִישׁ</span> “This is the man”.<br><br><b>3. The relative pronoun</b><br><span class=\"script\">אֲשֶׁר</span> “who, which” — its form never changes: <span class=\"script\">הָעֵץ אֲשֶׁר בְּתוֹךְ־הַגָּן</span> “the tree that is in the middle of the garden”.<br><br><b>4. Interrogative pronouns and the particle</b><br><span class=\"script\">מִי</span> “who?” and <span class=\"script\">מָה</span> “what?”: <span class=\"script\">מִי־אַתָּה</span> “Who are you?”. The interrogative particle <span class=\"script\">הֲ</span> (also <span class=\"script\">הַ</span> and <span class=\"script\">הֶ</span>) stands at the beginning of the sentence and turns it into a question: <span class=\"script\">הֲשָׁלַח הַמֶּ֫לֶךְ אֶת־הַנָּבִיא</span> “Did the king send a prophet?”. Do not confuse it with the article.",
        "vocabulary": {
            "אֲשֶׁר": "who, which, that",
            "כִּי": "because, that, when, if",
            "גַּם": "also, too, even, and",
            "מָה": "what? why? how?",
            "הֲ": "interrogative particle (marks a question)",
            "כַּאֲשֶׁר": "as, when",
            "אֶ֫לֶף": "thousand",
            "מִי": "who? whoever (no gender distinction)",
            "דָּם": "blood, bloodshed",
            "אֹ֫הֶל": "tent",
            "שֶׁ֫מֶן": "oil",
            "בְּהֵמָה": "(domestic) animal, beast",
            "לָ֫מָּה": "why?",
            "אַחֵר": "another, other",
            "טָהוֹר": "clean, pure",
            "עָנִי": "poor, afflicted",
            "כְּסִיל": "foolish, stupid",
            "מַדּוּעַ": "why? for what reason?",
            "שֹׁפֵט": "judge",
            "אֵיךְ": "how? in what way?"
        }
    },
    "9": {
        "title": "Pronominal Suffixes",
        "grammar": "<b>1. Two sets</b><br>Possession is expressed not by a separate word but by a suffix. There are two sets: <b>type 1</b> is attached to singular nouns, <b>type 2</b> — to plural ones.<br><table dir=\"rtl\">\n<tr><th>Person</th><th>Type 1 (sg.)</th><th>Type 2 (pl.)</th><th>Meaning</th></tr>\n<tr><th>1 c. sg.</th><td lang=\"he\">יִ</td><td lang=\"he\">יַ</td><td>my</td></tr>\n<tr><th>2 m. sg.</th><td lang=\"he\">ךָ</td><td lang=\"he\">יֶ֫ךָ</td><td>your (m. sg.)</td></tr>\n<tr><th>2 f. sg.</th><td lang=\"he\">ךְ</td><td lang=\"he\">יִַ֫ךְ</td><td>your (f. sg.)</td></tr>\n<tr><th>3 m. sg.</th><td lang=\"he\">וֹ</td><td lang=\"he\">יָו</td><td>his</td></tr>\n<tr><th>3 f. sg.</th><td lang=\"he\">הָּ</td><td lang=\"he\">יֶ֫הָ</td><td>her</td></tr>\n<tr><th>1 c. pl.</th><td lang=\"he\">נוּ</td><td lang=\"he\">יֵ֫נוּ</td><td>our</td></tr>\n<tr><th>2 m. pl.</th><td lang=\"he\">כֶם</td><td lang=\"he\">יֵכֶם</td><td>your (m. pl.)</td></tr>\n<tr><th>2 f. pl.</th><td lang=\"he\">כֶן</td><td lang=\"he\">יֵכֶן</td><td>your (m. pl.)</td></tr>\n<tr><th>3 m. pl.</th><td lang=\"he\">הֶם</td><td lang=\"he\">יֵהֶם</td><td>their</td></tr>\n<tr><th>3 f. pl.</th><td lang=\"he\">הֶן</td><td lang=\"he\">יֵהֶן</td><td>their</td></tr>\n</table><br><br><b>2. How to tell them apart</b><br><b>All type 2 suffixes have <span class=\"script\">י</span></b> — that is the mark by which the type is recognised. It also says that the noun it is attached to is plural: <span class=\"script\">סוּסוֹ</span> “his horse”, but <span class=\"script\">סוּסָ֫יו</span> “his horses”.<br><br><b>3. Notes</b><br>• All suffixes have person, gender and number; gender is distinguished in the second and third persons.<br>• The dot in <span class=\"script\">הּ</span> is not dagesh but <b>mappiq</b>; it often occurs in the suffix of the third person feminine singular.<br>• The type 1 suffixes have alternative forms: <span class=\"script\">נִי</span>, <span class=\"script\">הוּ</span>, <span class=\"script\">הָ</span>.<br><br><b>4. Nouns with suffixes</b><br><table dir=\"rtl\">\n<tr><th>Person</th><th>Noun, sg.</th><th>Noun, pl.</th></tr>\n<tr><th>1 c. sg.</th><td lang=\"he\">סוּסִי</td><td lang=\"he\">סוּסַי</td></tr>\n<tr><th>2 m. sg.</th><td lang=\"he\">סוּסְךָ</td><td lang=\"he\">סוּסֶ֫יךָ</td></tr>\n<tr><th>3 m. sg.</th><td lang=\"he\">סוּסוֹ</td><td lang=\"he\">סוּסָ֫יו</td></tr>\n<tr><th>3 f. sg.</th><td lang=\"he\">סוּסָהּ</td><td lang=\"he\">סוּסֶ֫יהָ</td></tr>\n<tr><th>1 c. pl.</th><td lang=\"he\">סוּסֵ֫נוּ</td><td lang=\"he\">סוּסֵ֫ינוּ</td></tr>\n</table>",
        "vocabulary": {}
    },
    "10": {
        "title": "The Construct Chain",
        "grammar": "<b>1. What it is</b><br>The meaning of the genitive (“the book <i>of the king</i>”) is expressed by a construct chain of two nouns. The first stands in the <b>construct state</b>, the second in the <b>absolute state</b>, that is, the dictionary form. The absolute word always closes the chain, and the chain cannot be broken: no other words are placed between its members.<br><br><b>2. Definiteness</b><br>In a chain either both members are definite or both are indefinite, but <b>the article is never placed before the construct form</b>. The definiteness of the whole chain is set by the absolute form:<br>• <span class=\"script\">קוֹל אִישׁ</span> “a man’s voice” — indefinite<br>• <span class=\"script\">קוֹל הָאִישׁ</span> “the voice of the man” — definite<br>Four kinds of words count as definite: with the article, with a pronominal suffix (<span class=\"script\">בֵּית מַלְכִּי</span> “the house of my king”), proper names (<span class=\"script\">עֶ֫בֶד שְׁמוּאֵל</span> “the servant of Samuel”) and objects unique in their kind.<br><br><b>3. A chain of several words</b><br>There may be several construct forms, but only one absolute: <span class=\"script\">עֶ֫בֶד אֲחִי הַמֶּ֫לֶךְ</span> “the servant of the brother of the king”, <span class=\"script\">דִּבְרֵי מֶ֫לֶךְ הָאָ֫רֶץ</span> “the words of the king of the land”.<br><br><b>4. Maqqef and the adjective</b><br>Sometimes the members are joined by maqqef: <span class=\"script\">בֶּן־דָּוִד</span> “the son of David”, <span class=\"script\">כָּל־הָעָם</span> “all the people”. An attributive adjective is placed <i>after the whole chain</i>, and its gender shows what it refers to: <span class=\"script\">דְּבַר הַמַּלְכָּה הַטּוֹב</span> “the good word of the queen”, but <span class=\"script\">דְּבַר הַמַּלְכָּה הַטּוֹבָה</span> “the word of the good queen”.<br><br><b>5. Spelling</b><br>The construct form of most nouns differs from the dictionary form and has to be recognised: <span class=\"script\">בַּ֫יִת</span> → <span class=\"script\">בֵּית</span>, <span class=\"script\">דְּבָרִים</span> → <span class=\"script\">דִּבְרֵי</span>.",
        "vocabulary": {
            "פָּנִים": "face, presence, before",
            "יָד": "hand, strength",
            "עוֹד": "still, again",
            "עֵת": "time, season",
            "בְּרִית": "covenant, agreement, alliance",
            "עֹלָה": "burnt offering",
            "אֹיֵב": "enemy",
            "חֹ֫דֶשׁ": "new moon, month",
            "אֶ֫בֶן": "stone, weight",
            "צֹאן": "small cattle, sheep and goats",
            "בָּשָׂר": "flesh, body, meat",
            "מִדְבָּר": "wilderness, desert",
            "מַטֶּה": "staff, tribe",
            "רֶ֫גֶל": "foot, leg",
            "חֶ֫סֶד": "lovingkindness, kindness, faithfulness",
            "חַ֫יִל": "army, wealth, valour",
            "גְּבוּל": "border, territory",
            "אֲדָמָה": "ground (soil), land",
            "מָ֫וֶת": "death"
        }
    },
    "11": {
        "title": "Numerals",
        "grammar": "<b>1. Cardinal numbers: 1 to 10</b><br>Every numeral has two forms — masculine and feminine — and each of them may be absolute or construct. Learn the absolute masculine forms.<br><table dir=\"rtl\">\n<tr><th></th><th>M. abs.</th><th>M. cst.</th><th>F. abs.</th><th>F. cst.</th></tr>\n<tr><th>One</th><td lang=\"he\">אֶחָד</td><td lang=\"he\">אַחַד</td><td lang=\"he\">אַחַת</td><td lang=\"he\">אַחַת</td></tr>\n<tr><th>Two</th><td lang=\"he\">שְׁנַ֫יִם</td><td lang=\"he\">שְׁנֵי</td><td lang=\"he\">שְׁתַּ֫יִם</td><td lang=\"he\">שְׁתֵּי</td></tr>\n<tr><th>Three</th><td lang=\"he\">שָׁלֹשׁ</td><td lang=\"he\">שְׁלֹשׁ</td><td lang=\"he\">שְׁלֹשָׁה</td><td lang=\"he\">שְׁלֹ֫שֶׁת</td></tr>\n<tr><th>Four</th><td lang=\"he\">אַרְבַּע</td><td lang=\"he\">אַרְבַּע</td><td lang=\"he\">אַרְבָּעָה</td><td lang=\"he\">אַרְבַּ֫עַת</td></tr>\n<tr><th>Five</th><td lang=\"he\">חָמֵשׁ</td><td lang=\"he\">חֲמֵשׁ</td><td lang=\"he\">חֲמִשָּׁה</td><td lang=\"he\">חֲמֵ֫שֶׁת</td></tr>\n<tr><th>Six</th><td lang=\"he\">שֵׁשׁ</td><td lang=\"he\">שֵׁשׁ</td><td lang=\"he\">שִׁשָּׁה</td><td lang=\"he\">שֵׁ֫שֶׁת</td></tr>\n<tr><th>Seven</th><td lang=\"he\">שֶׁ֫בַע</td><td lang=\"he\">שְׁבַע</td><td lang=\"he\">שִׁבְעָה</td><td lang=\"he\">שִׁבְעַת</td></tr>\n<tr><th>Eight</th><td lang=\"he\">שְׁמֹנֶה</td><td lang=\"he\">שְׁמֹנֶה</td><td lang=\"he\">שְׁמֹנָה</td><td lang=\"he\">שְׁמֹנַת</td></tr>\n<tr><th>Nine</th><td lang=\"he\">תֵּ֫שַׁע</td><td lang=\"he\">תְּשַׁע</td><td lang=\"he\">תִּשְׁעָה</td><td lang=\"he\">תִּשְׁעַת</td></tr>\n<tr><th>Ten</th><td lang=\"he\">עֶ֫שֶׂר</td><td lang=\"he\">עֶ֫שֶׂר</td><td lang=\"he\">עֲשָׂרָה</td><td lang=\"he\">עֲשֶׂ֫רֶת</td></tr>\n</table><br>The numeral “one” behaves like an adjective: it stands <i>after</i> the noun and agrees with it: <span class=\"script\">בֵּן אֶחָד</span> “one son”, <span class=\"script\">בַּת אַחַת</span> “one daughter”. The numerals 3–10 <b>do not agree in gender</b> with the noun.<br><br><b>2. Compound numerals</b><br>The numbers of the second decade are formed by adding the word “ten”: <span class=\"script\">שְׁנֵי עָשָׂר אִישׁ</span> “twelve men”, <span class=\"script\">אַרְבָּעָה עָשָׂר יוֹם</span> “fourteen days”. In compound numbers the conjunction is placed between the tens and the units: <span class=\"script\">וְ</span>: <span class=\"script\">עֶשְׂרִים וְאַחַת</span> “twenty-one”, <span class=\"script\">שִׁבְעִים וְשִׁבְעָה</span> “seventy-seven”.<br><br><b>3. Ordinal numbers</b><br>They have the form of adjectives: the masculine ends in <span class=\"script\">יִ</span>, the feminine in <span class=\"script\">יִת</span>.<br><table dir=\"rtl\">\n<tr><th></th><th>Masculine</th><th>Feminine</th></tr>\n<tr><th>First</th><td lang=\"he\">רִאשׁוֹן</td><td lang=\"he\">רִאשׁוֹנָה</td></tr>\n<tr><th>Second</th><td lang=\"he\">שֵׁנִי</td><td lang=\"he\">שֵׁנִית</td></tr>\n<tr><th>Third</th><td lang=\"he\">שְׁלִישִׁי</td><td lang=\"he\">שְׁלִישִׁית</td></tr>\n<tr><th>Fourth</th><td lang=\"he\">רְבִיעִי</td><td lang=\"he\">רְבִיעִית</td></tr>\n<tr><th>Fifth</th><td lang=\"he\">חֲמִישִׁי</td><td lang=\"he\">חֲמִישִׁית</td></tr>\n<tr><th>Sixth</th><td lang=\"he\">שִׁשִּׁי</td><td lang=\"he\">שִׁשִּׁית</td></tr>\n<tr><th>Seventh</th><td lang=\"he\">שְׁבִיעִי</td><td lang=\"he\">שְׁבִיעִית</td></tr>\n</table><br>Examples: <span class=\"script\">בַּיּוֹם הָרִאשׁוֹן</span> “on the first day”, <span class=\"script\">בַּיּוֹם הַשְּׁבִיעִי</span> “on the seventh day”.",
        "vocabulary": {
            "שָׁם": "there, where",
            "אַמָּה": "cubit (a measure of length)",
            "שָׁלוֹם": "peace, well-being",
            "נַ֫עַר": "youth, young man",
            "מַעֲשֶׂה": "deed, act, work",
            "לַ֫יְלָה": "night, evening, midnight",
            "עָוֹן": "guilt, wrongdoing, sin",
            "זֶ֫רַע": "offspring, seed, descendant",
            "קֶ֫רֶב": "inner part, midst",
            "מוֹעֵד": "appointed time, meeting, season",
            "נַחֲלָה": "inheritance, portion, possession",
            "אֵם": "mother",
            "בֶּ֫גֶד": "garment, clothing",
            "מַחֲנֶה": "camp, army",
            "מַלְאָךְ": "angel, messenger",
            "לָכֵן": "therefore",
            "חָצֵר": "courtyard, settlement",
            "רַק": "only, however",
            "תָּמִיד": "continually, regularly"
        }
    },
    "12": {
        "title": "The Verb",
        "grammar": "<b>1. The verb and its categories</b><br>A verb expresses an action (“he studied”) or a state (“she was wise”) of a subject as a process. The Hebrew verb, like the Russian one, has <b>person</b>, <b>gender</b> and <b>number</b>: they are shown by the ending.<br><table>\n<tr><th>Person</th><th>Singular</th><th>Plural</th></tr>\n<tr><td>1st</td><td>I</td><td>we</td></tr>\n<tr><td>2nd</td><td>you (sg.)</td><td>you (pl.)</td></tr>\n<tr><td>3rd</td><td>he, she, it</td><td>they</td></tr>\n</table><br><b>Gender:</b> masculine — a person or thing of masculine gender, feminine — of feminine gender, common — of either. <b>Number:</b> singular — one thing, plural — two or more. A personal pronoun with the verb is optional: person, gender and number are already visible in the form.<br><br><b>2. Root and stem</b><br>The root is the simplest form from which a family of words in the language derives; in most verbs it consists of three consonants, sometimes of two. The stem is a form built from the root. Both nouns and verbs derive from one root: the root “sh–b–t” yields the verb <span class=\"script\">שָׁבַת</span> “to cease” and the noun <span class=\"script\">שַׁבָּת</span> “sabbath”, and the root <span class=\"script\">ע</span>–<span class=\"script\">ש</span>–<span class=\"script\">ה</span> yields the verb <span class=\"script\">עָשָׂה</span> “to do” and the noun <span class=\"script\">מַעֲשֶׂה</span> “deed”. Words of one root share both the sequence of consonants and the meaning.<br><br><b>3. Dictionary form</b><br>For a triconsonantal verb the dictionary form is Qal, perfect, third person masculine singular. That is what dictionaries, and our dictionary, print: <span class=\"script\">אָכַל</span> “to eat”, <span class=\"script\">שָׁמַע</span> “to hear”. Verbs with two consonants have a different dictionary form.<br><br><b>4. The seven stems</b><br>Biblical Hebrew has seven main stems. The basic one is <b>Qal</b>; the other six are called derived: their stem is formed from the Qal stem by adding prefixes and/or doubling the second root consonant. The name of each derived stem is a conventional perfect form, third person masculine singular, of the root meaning “to do”.<br><table>\n<tr><th>Stem</th><th>Distinctive mark</th><th>Meaning</th></tr>\n<tr><td>Qal</td><td>neither prefixes nor doubling</td><td>simple action</td></tr>\n<tr><td>Nifal</td><td>a prefix with a nasal consonant</td><td>simple passive or reflexive</td></tr>\n<tr><td>Piel</td><td>doubling of the second root consonant</td><td>intensive, active</td></tr>\n<tr><td>Pual</td><td>doubling of the second root consonant</td><td>intensive, passive</td></tr>\n<tr><td>Hifil</td><td>a prefix with an aspirated consonant</td><td>causative</td></tr>\n<tr><td>Hofal</td><td>a prefix with an aspirated consonant</td><td>causative, passive</td></tr>\n<tr><td>Hitpael</td><td>a prefix and doubling</td><td>reflexive</td></tr>\n</table><br>The stem expresses the kind of action (simple, intensive, causative) and the voice (active, passive, reflexive): “to break” — “to smash” — “to cause to break”. A Qal example: <span class=\"script\">שָׁמַע</span> “he heard”. The stems are examined in detail in the following chapters.<br><br><b>5. Conjugations</b><br>Verb forms are built in several conjugations: perfect, imperfect, imperative, cohortative, jussive, construct infinitive, absolute infinitive and participle. Each conjugation gives its own set of forms; you will learn them further on.<br><br><b>6. Strong and weak verbs</b><br>All verbs are divided into strong and weak. A verb is called weak if it has at least one weak consonant — a guttural or <span class=\"script\">ר</span>. Strong verbs have no such consonants, and their forms follow the general rule.<br><br><b>7. Word order</b><br>In narrative prose the usual order is the predicate, then the subject, then the other parts of the sentence. There are exceptions and variations to this rule.<br><br><b>8. Morphological analysis</b><br>To analyse a verb means to determine its stem, conjugation, person, gender, number and dictionary form.<br><br><i>Statistics:</i> the Hebrew Bible has a little over 23,000 verses and almost 72,000 verbs — on average three verbs to a verse.",
        "vocabulary": {
            "אָכַל": "to eat, devour",
            "אָמַר": "to say, speak, answer",
            "הָיָה": "to be, happen, come about",
            "הָלַךְ": "to go, walk, depart",
            "יָצָא": "to go out, come out",
            "יָשַׁב": "to sit, dwell, live",
            "נָתַן": "to give, set, place",
            "עָשָׂה": "to do, make, keep",
            "רָאָה": "to see, look at",
            "שָׁבַת": "to cease, stop working, rest",
            "שָׁמַע": "to hear, listen, obey",
            "אֲרוֹן": "ark, chest",
            "מִנְחָה": "offering, gift, tribute",
            "שַׁבָּת": "sabbath",
            "אַךְ": "only, surely, nevertheless",
            "אַל": "no, do not"
        }
    }
};
