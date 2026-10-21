// ============================================================
// ПРИМЕРЫ УПОТРЕБЛЕНИЯ ИЗ ЕВРЕЙСКОЙ БИБЛИИ
// ============================================================
// Слова, которые пособие ни разу не употребляет в обороте, получают
// пример из OSHB: стих Westminster Leningrad Codex с Синодальным
// переводом и с переводом короля Иакова для английского режима. Ключ —
// словарная форма ровно в том виде, в каком она стоит в
// data/hebrew-lessons.js; поэтому морфологического поиска здесь нет —
// пример привязан к статье заранее.
//
// Поля примера:
//   text    — стих из OSHB, скопированный машинно (с огласовкой и
//             акцентами); в нём не должно быть ни одного знака,
//             набранного рукой;
//   russian — Синодальный перевод этого стиха (общественное достояние);
//   english — King James Version того же стиха (общественное достояние
//             за пределами Великобритании) — так же машинно, как и
//             русский; им словарь пользуется в английском режиме;
//   form    — слово стиха, которое несёт лемму статьи: по нему
//             подсвечивается употребление (js/vocab.js);
//   ref     — ссылка для человека, «Быт. 1:1»;
//   refEn   — та же ссылка по нумерации KJV: у книги Иова глава 41
//             разделена иначе, и стих «Иов. 41:13» там зовётся Job 41:21,
//             поэтому английская ссылка не выводится из русской.
//
// Файл создан из reference/oshb/verses.json. Не правьте его вручную
// и не перепечатывайте еврейский текст: порядок знаков огласовки
// невидим на экране и проверяется тестом.
//
// Рядом лежит reference/oshb/README.md — откуда взят текст и почему
// не все слова получили пример.

const HEBREW_EXAMPLES = {
    "שֵׁם": [
        {text:"יְהוָ֖ה אִ֣ישׁ מִלְחָמָ֑ה יְהוָ֖ה שְׁמֽוֹ", russian:"Господь муж брани, Иегова имя Ему.", form:"שְׁמֽוֹ", ref:"Исх. 15:3", english:"The LORD is a man of war: the LORD is his name.", refEn:"Exod. 15:3"}
    ],
    "מֹשֶׁה": [
        {text:"וַיִּשְׁמַ֣ע מֹשֶׁ֔ה וַיִּיטַ֖ב בְּעֵינָֽיו", russian:"И услышал Моисей и одобрил.", form:"מֹשֶׁ֔ה", ref:"Лев. 10:20", english:"And when Moses heard that, he was content.", refEn:"Lev. 10:20"}
    ],
    "מִצְרַ֫יִם": [
        {text:"כִּימֵ֥י צֵאתְךָ֖ מֵאֶ֣רֶץ מִצְרָ֑יִם אַרְאֶ֖נּוּ נִפְלָאֽוֹת", russian:"Как во дни исхода твоего из земли Египетской, явлю ему дивные дела.", form:"מִצְרָ֑יִם", ref:"Мих. 7:15", english:"According to the days of thy coming out of the land of Egypt will I shew unto him marvellous things.", refEn:"Mic. 7:15"}
    ],
    "יְרוּשָׁלִַם": [
        {text:"וַנָּב֖וֹא יְרוּשָׁלִָ֑ם וַנֵּ֥שֶׁב שָׁ֖ם יָמִ֥ים שְׁלֹשָֽׁה", russian:"И пришли мы в Иерусалим, и пробыли там три дня.", form:"יְרוּשָׁלִָ֑ם", ref:"Езд. 8:32", english:"And we came to Jerusalem, and abode there three days.", refEn:"Ezra 8:32"}
    ],
    "אָדָם": [
        {text:"וּמַכֵּ֥ה בְהֵמָ֖ה יְשַׁלְּמֶ֑נָּה וּמַכֵּ֥ה אָדָ֖ם יוּמָֽת", russian:"Кто убьет скотину, должен заплатить за нее; а кто убьет человека, того должно предать смерти.", form:"אָדָ֖ם", ref:"Лев. 24:21", english:"And he that killeth a beast, he shall restore it: and he that killeth a man, he shall be put to death.", refEn:"Lev. 24:21"}
    ],
    "פַּרְעֹה": [
        {text:"וַיִּיטַ֥ב הַדָּבָ֖ר בְּעֵינֵ֣י פַרְעֹ֑ה וּבְעֵינֵ֖י כָּל־עֲבָדָֽיו", russian:"Сие понравилось фараону и всем слугам его.", form:"פַרְעֹ֑ה", ref:"Быт. 41:37", english:"And the thing was good in the eyes of Pharaoh, and in the eyes of all his servants.", refEn:"Gen. 41:37"}
    ],
    "עַ֫יִן": [
        {text:"מַ֭דּוּעַ נֶחְשַׁ֣בְנוּ כַבְּהֵמָ֑ה נִ֝טְמִ֗ינוּ בְּעֵינֵיכֶֽם", russian:"Зачем считаться нам за животных и быть униженными в собственных глазах ваших?", form:"בְּעֵינֵיכֶֽם", ref:"Иов. 18:3", english:"Wherefore are we counted as beasts, and reputed vile in your sight?", refEn:"Job 18:3"}
    ],
    "אֲדֹנָי": [
        {text:"רַ֧בְתָּ אֲדֹנָ֛י רִיבֵ֥י נַפְשִׁ֖י גָּאַ֥לְתָּ חַיָּֽי", russian:"Ты защищал, Господи, дело души моей; искуплял жизнь мою.", form:"אֲדֹנָ֛י", ref:"Плач. 3:58", english:"O Lord, thou hast pleaded the causes of my soul; thou hast redeemed my life.", refEn:"Lam. 3:58"}
    ],
    "נֶ֫פֶשׁ": [
        {text:"וַתִּקְרַ֣ב לַשַּׁ֣חַת נַפְשׁ֑וֹ וְ֝חַיָּת֗וֹ לַֽמְמִתִֽים", russian:"И душа его приближается к могиле и жизнь его - к смерти.", form:"נַפְשׁ֑וֹ", ref:"Иов. 33:22", english:"Yea, his soul draweth near unto the grave, and his life to the destroyers.", refEn:"Job 33:22"}
    ],
    "כֹּהֵן": [
        {text:"וּמִן־בְּנֵי֙ הַכֹּ֣הֲנִ֔ים רֹקְחֵ֥י הַמִּרְקַ֖חַת לַבְּשָׂמִֽים", russian:"А из сыновей священнических некоторые составляли миро из веществ благовонных.", form:"הַכֹּ֣הֲנִ֔ים", ref:"1 Пар. 9:30", english:"And some of the sons of the priests made the ointment of the spices.", refEn:"1 Chr. 9:30"}
    ],
    "דֶּ֫רֶךְ": [
        {text:"וְשַׂמְתִּ֥י כָל־הָרַ֖י לַדָּ֑רֶךְ וּמְסִלֹּתַ֖י יְרֻמֽוּן", russian:"И все горы Мои сделаю путем, и дороги Мои будут подняты.", form:"לַדָּ֑רֶךְ", ref:"Ис. 49:11", english:"And I will make all my mountains a way, and my highways shall be exalted.", refEn:"Isa. 49:11"}
    ],
    "רֹאשׁ": [
        {text:"שְׂמֹאלוֹ֙ תַּ֣חַת לְרֹאשִׁ֔י וִימִינ֖וֹ תְּחַבְּקֵֽנִי", russian:"Левая рука его у меня под головою, а правая обнимает меня.", form:"לְרֹאשִׁ֔י", ref:"Песн. 2:6", english:"His left hand is under my head, and his right hand doth embrace me.", refEn:"Song 2:6"}
    ],
    "גּוֹי": [
        {text:"צְדָקָ֥ה תְרֽוֹמֵֽם־גּ֑וֹי וְחֶ֖סֶד לְאֻמִּ֣ים חַטָּֽאת", russian:"Праведность возвышает народ, а беззаконие - бесчестие народов.", form:"גּ֑וֹי", ref:"Притч. 14:34", english:"Righteousness exalteth a nation: but sin is a reproach to any people.", refEn:"Prov. 14:34"}
    ],
    "צָבָא": [
        {text:"וַיִּשְׁמַ֖ע דָּוִ֑ד וַיִּשְׁלַח֙ אֶת־יוֹאָ֔ב וְאֵ֥ת כָּל־הַצָּבָ֖א הַגִּבֹּרִֽים", russian:"Когда услышал об этом Давид, то послал Иоава со всем войском храбрых.", form:"הַצָּבָ֖א", ref:"2 Цар. 10:7", english:"And when David heard of it, he sent Joab, and all the host of the mighty men.", refEn:"2 Sam. 10:7"}
    ],
    "תּוֹרָה": [
        {text:"תּוֹרָ֥ה צִוָּה־לָ֖נוּ מֹשֶׁ֑ה מוֹרָשָׁ֖ה קְהִלַּ֥ת יַעֲקֹֽב", russian:"Закон дал нам Моисей, наследие обществу Иакова.", form:"תּוֹרָ֥ה", ref:"Втор. 33:4", english:"Moses commanded us a law, even the inheritance of the congregation of Jacob.", refEn:"Deut. 33:4"}
    ],
    "כֹּה": [
        {text:"כֹּ֥ה הִרְאַ֖נִי אֲדֹנָ֣י יְהוִ֑ה וְהִנֵּ֖ה כְּל֥וּב קָֽיִץ", russian:"Такое видение открыл мне Господь Бог: вот корзина со спелыми плодами.", form:"כֹּ֥ה", ref:"Ам. 8:1", english:"Thus hath the Lord GOD shewed unto me: and behold a basket of summer fruit.", refEn:"Amos 8:1"}
    ],
    "עוֹלָם": [
        {text:"כַּעֲב֣וֹר ס֭וּפָה וְאֵ֣ין רָשָׁ֑ע וְ֝צַדִּ֗יק יְס֣וֹד עוֹלָֽם", russian:"Как проносится вихрь, так нет более нечестивого; а праведник - на вечном основании.", form:"עוֹלָֽם", ref:"Притч. 10:25", english:"As the whirlwind passeth, so is the wicked no more: but the righteous is an everlasting foundation.", refEn:"Prov. 10:25"}
    ],
    "מִשְׁפָּט": [
        {text:"עֲ֭שֹׂה צְדָקָ֣ה וּמִשְׁפָּ֑ט נִבְחָ֖ר לַיהוָ֣ה מִזָּֽבַח", russian:"Соблюдение правды и правосудия более угодно Господу, нежели жертва.", form:"וּמִשְׁפָּ֑ט", ref:"Притч. 21:3", english:"To do justice and judgment is more acceptable to the LORD than sacrifice.", refEn:"Prov. 21:3"}
    ],
    "שַׂר": [
        {text:"בִּ֭י שָׂרִ֣ים יָשֹׂ֑רוּ וּ֝נְדִיבִ֗ים כָּל־שֹׁ֥פְטֵי צֶֽדֶק", russian:"мною начальствуют начальники и вельможи и все судьи земли.", form:"שָׂרִ֣ים", ref:"Притч. 8:16", english:"By me princes rule, and nobles, even all the judges of the earth.", refEn:"Prov. 8:16"}
    ],
    "חֶרֶב": [
        {text:"וַיֹּ֣שַׁע מֵ֭חֶרֶב מִפִּיהֶ֑ם וּמִיַּ֖ד חָזָ֣ק אֶבְיֽוֹן", russian:"Он спасает бедного от меча, от уст их и от руки сильного.", form:"מֵ֭חֶרֶב", ref:"Иов. 5:15", english:"But he saveth the poor from the sword, from their mouth, and from the hand of the mighty.", refEn:"Job 5:15"}
    ],
    "כֶּ֫סֶף": [
        {text:"וְאַבְרָ֖ם כָּבֵ֣ד מְאֹ֑ד בַּמִּקְנֶ֕ה בַּכֶּ֖סֶף וּבַזָּהָֽב", russian:"И был Аврам очень богат скотом, и серебром, и золотом.", form:"בַּכֶּ֖סֶף", ref:"Быт. 13:2", english:"And Abram was very rich in cattle, in silver, and in gold.", refEn:"Gen. 13:2"}
    ],
    "מִזְבֵּחַ": [
        {text:"וַיַּצֶּב־שָׁ֖ם מִזְבֵּ֑חַ וַיִּ֨קְרָא־ל֔וֹ אֵ֖ל אֱלֹהֵ֥י יִשְׂרָאֵֽל", russian:"И поставил там жертвенник, и призвал имя Господа Бога Израилева.", form:"מִזְבֵּ֑חַ", ref:"Быт. 33:20", english:"And he erected there an altar, and called it El-elohe-Israel.", refEn:"Gen. 33:20"}
    ],
    "מָקוֹם": [
        {text:"יִשְׂפֹּ֣ק עָלֵ֣ימוֹ כַפֵּ֑ימוֹ וְיִשְׁרֹ֥ק עָ֝לָ֗יו מִמְּקֹמֽוֹ", russian:"Всплеснут о нем руками и посвищут над ним с места его!", form:"מִמְּקֹמֽוֹ", ref:"Иов. 27:23", english:"Men shall clap their hands at him, and shall hiss him out of his place.", refEn:"Job 27:23"}
    ],
    "יָם": [
        {text:"וַיִּסְע֖וּ מֵאֵילִ֑ם וַֽיַּחֲנ֖וּ עַל־יַם־סֽוּף", russian:"И отправились из Елима и расположились станом у Чермного моря.", form:"יַם", ref:"Чис. 33:10", english:"And they removed from Elim, and encamped by the Red sea.", refEn:"Num. 33:10"}
    ],
    "רוּחַ": [
        {text:"הַלְהוֹכַ֣ח מִלִּ֣ים תַּחְשֹׁ֑בוּ וּ֝לְר֗וּחַ אִמְרֵ֥י נֹאָֽשׁ", russian:"Вы придумываете речи для обличения? На ветер пускаете слова ваши.", form:"וּ֝לְר֗וּחַ", ref:"Иов. 6:26", english:"Do ye imagine to reprove words, and the speeches of one that is desperate, which are as wind?", refEn:"Job 6:26"}
    ],
    "אֵשׁ": [
        {text:"וְשִׁלַּ֥חְתִּי אֵ֖שׁ בְּח֣וֹמַת צֹ֑ר וְאָכְלָ֖ה אַרְמְנֹתֶֽיהָ", russian:"Пошлю огонь в стены Тира, и пожрет чертоги его.", form:"אֵ֖שׁ", ref:"Ам. 1:10", english:"But I will send a fire on the wall of Tyrus, which shall devour the palaces thereof.", refEn:"Amos 1:10"}
    ],
    "נְאֻם": [
        {text:"דִּבְרֵ֤י אָג֥וּר בִּן־יָקֶ֗ה הַמַּ֫שָּׂ֥א נְאֻ֣ם הַ֭גֶּבֶר לְאִֽיתִיאֵ֑ל לְאִ֖יתִיאֵ֣ל וְאֻכָֽל", russian:"Слова Агура, сына Иакеева. Вдохновенные изречения, которые сказал этот человек Ифиилу, Ифиилу и Укалу:", form:"נְאֻ֣ם", ref:"Притч. 30:1", english:"The words of Agur the son of Jakeh, even the prophecy: the man spake unto Ithiel, even unto Ithiel and Ucal,", refEn:"Prov. 30:1"}
    ],
    "שַׁ֫עַר": [
        {text:"זְקֵנִים֙ מִשַּׁ֣עַר שָׁבָ֔תוּ בַּחוּרִ֖ים מִנְּגִינָתָֽם", russian:"Старцы уже не сидят у ворот; юноши не поют.", form:"מִשַּׁ֣עַר", ref:"Плач. 5:14", english:"The elders have ceased from the gate, the young men from their musick.", refEn:"Lam. 5:14"}
    ],
    "חַי": [
        {text:"וּבְי֨וֹם הֵרָא֥וֹת בּ֛וֹ בָּשָׂ֥ר חַ֖י יִטְמָֽא", russian:"Когда же окажется на нем живое мясо, то он нечист;", form:"חַ֖י", ref:"Лев. 13:14", english:"But when raw flesh appeareth in him, he shall be unclean.", refEn:"Lev. 13:14"}
    ],
    "יֶ֫לֶד": [
        {text:"וַיִּגְדַּ֖ל הַיָּ֑לֶד וַיְהִ֣י הַיּ֔וֹם וַיֵּצֵ֥א אֶל־אָבִ֖יו אֶל־הַקֹּצְרִֽים", russian:"И подрос ребенок и в один день пошел к отцу своему, к жнецам.", form:"הַיָּ֑לֶד", ref:"4 Цар. 4:18", english:"And when the child was grown, it fell on a day, that he went out to his father to the reapers.", refEn:"2 Kgs. 4:18"}
    ],
    "עָנָן": [
        {text:"מְאַחֵ֥ז פְּנֵי־כִסֵּ֑ה פַּרְשֵׁ֖ז עָלָ֣יו עֲנָנֽוֹ", russian:"Он поставил престол Свой, распростер над ним облако Свое.", form:"עֲנָנֽוֹ", ref:"Иов. 26:9", english:"He holdeth back the face of his throne, and spreadeth his cloud upon it.", refEn:"Job 26:9"}
    ],
    "עִם": [
        {text:"הֲֽ֭מִיִּרְאָ֣תְךָ יֹכִיחֶ֑ךָ יָב֥וֹא עִ֝מְּךָ֗ בַּמִּשְׁפָּֽט", russian:"Неужели Он, боясь тебя, вступит с тобою в состязание, пойдет судиться с тобою?", form:"עִ֝מְּךָ֗", ref:"Иов. 22:4", english:"Will he reprove thee for fear of thee? will he enter with thee into judgment?", refEn:"Job 22:4"}
    ],
    "פֶּה": [
        {text:"יַרְשִֽׁיעֲךָ֣ פִ֣יךָ וְלֹא־אָ֑נִי וּ֝שְׂפָתֶ֗יךָ יַעֲנוּ־בָֽךְ", russian:"Тебя обвиняют уста твои, а не я, и твой язык говорит против тебя.", form:"פִ֣יךָ", ref:"Иов. 15:6", english:"Thine own mouth condemneth thee, and not I: yea, thine own lips testify against thee.", refEn:"Job 15:6"}
    ],
    "לְמַ֫עַן": [
        {text:"שְׁמַ֣ע עֵ֭צָה וְקַבֵּ֣ל מוּסָ֑ר לְ֝מַ֗עַן תֶּחְכַּ֥ם בְּאַחֲרִיתֶֽךָ", russian:"Слушайся совета и принимай обличение, чтобы сделаться тебе впоследствии мудрым.", form:"לְ֝מַ֗עַן", ref:"Притч. 19:20", english:"Hear counsel, and receive instruction, that thou mayest be wise in thy latter end.", refEn:"Prov. 19:20"}
    ],
    "מִצְוָה": [
        {text:"וַיַּֽאַסְפ֤וּ אֶת־אֲחֵיהֶם֙ וַיִּֽתְקַדְּשׁ֔וּ וַיָּבֹ֥אוּ כְמִצְוַת־הַמֶּ֖לֶךְ בְּדִבְרֵ֣י יְהוָ֑ה לְטַהֵ֖ר בֵּ֥ית יְהוָֽה", russian:"Они собрали братьев своих и освятились, и пошли по приказанию царя очищать дом Господень по словам Господа.", form:"כְמִצְוַת", ref:"2 Пар. 29:15", english:"And they gathered their brethren, and sanctified themselves, and came, according to the commandment of the king, by the words of the LORD, to cleanse the house of the LORD.", refEn:"2 Chr. 29:15"}
    ],
    "מַ֫עַל": [
        {text:"וַיִּשְׂא֤וּ הַכְּרוּבִים֙ אֶת־כַּנְפֵיהֶ֔ם וְהָאֽוֹפַנִּ֖ים לְעֻמָּתָ֑ם וּכְב֧וֹד אֱלֹהֵֽי־יִשְׂרָאֵ֛ל עֲלֵיהֶ֖ם מִלְמָֽעְלָה", russian:"Тогда Херувимы подняли крылья свои, и колеса подле них; и слава Бога Израилева вверху над ними.", form:"מִלְמָֽעְלָה", ref:"Иез. 11:22", english:"Then did the cherubims lift up their wings, and the wheels beside them; and the glory of the God of Israel was over them above.", refEn:"Ezek. 11:22"}
    ],
    "כֵּן": [
        {text:"כַּ֭מַּיִם הַפָּנִ֣ים לַפָּנִ֑ים כֵּ֤ן לֵֽב־הָ֝אָדָ֗ם לָאָדָֽם", russian:"Как в воде лицо - к лицу, так сердце человека - к человеку.", form:"כֵּ֤ן", ref:"Притч. 27:19", english:"As in water face answereth to face, so the heart of man to man.", refEn:"Prov. 27:19"}
    ],
    "רַב": [
        {text:"כִּ֭י יַשְׁלִ֣ים חֻקִּ֑י וְכָהֵ֖נָּה רַבּ֣וֹת עִמּֽוֹ", russian:"Так, Он выполнит положенное мне, и подобного этому много у Него.", form:"רַבּ֣וֹת", ref:"Иов. 23:14", english:"For he performeth the thing that is appointed for me: and many such things are with him.", refEn:"Job 23:14"}
    ],
    "עַתָּה": [
        {text:"וְעַתָּ֖ה שְׁתוּלָ֣ה בַמִּדְבָּ֑ר בְּאֶ֖רֶץ צִיָּ֥ה וְצָמָֽא", russian:"А теперь она пересажена в пустыню, в землю сухую и жаждущую.", form:"וְעַתָּ֖ה", ref:"Иез. 19:13", english:"And now she is planted in the wilderness, in a dry and thirsty ground.", refEn:"Ezek. 19:13"}
    ],
    "רַע": [
        {text:"בְּֽ֭רָעָתוֹ יִדָּחֶ֣ה רָשָׁ֑ע וְחֹסֶ֖ה בְמוֹת֣וֹ צַדִּֽיק", russian:"За зло свое нечестивый будет отвергнут, а праведный и при смерти своей имеет надежду.", form:"בְּֽ֭רָעָתוֹ", ref:"Притч. 14:32", english:"The wicked is driven away in his wickedness: but the righteous hath hope in his death.", refEn:"Prov. 14:32"}
    ],
    "מְאֹד": [
        {text:"וַיַּ֣רְא שָׁא֔וּל אֲשֶׁר־ה֖וּא מַשְׂכִּ֣יל מְאֹ֑ד וַיָּ֖גָר מִפָּנָֽיו", russian:"И Саул видел, что он очень благоразумен, и боялся его.", form:"מְאֹ֑ד", ref:"1 Цар. 18:15", english:"Wherefore when Saul saw that he behaved himself very wisely, he was afraid of him.", refEn:"1 Sam. 18:15"}
    ],
    "רָשָׁע": [
        {text:"יְהִ֣י כְ֭רָשָׁע אֹ֣יְבִ֑י וּמִתְקוֹמְמִ֥י כְעַוָּֽל", russian:"Враг мой будет, как нечестивец, и восстающий на меня, как беззаконник.", form:"כְ֭רָשָׁע", ref:"Иов. 27:7", english:"Let mine enemy be as the wicked, and he that riseth up against me as the unrighteous.", refEn:"Job 27:7"}
    ],
    "זָקֵן": [
        {text:"וְאַבְרָהָ֣ם זָקֵ֔ן בָּ֖א בַּיָּמִ֑ים וַֽיהוָ֛ה בֵּרַ֥ךְ אֶת־אַבְרָהָ֖ם בַּכֹּֽל", russian:"Авраам был уже стар и в летах преклонных. Господь благословил Авраама всем.", form:"זָקֵ֔ן", ref:"Быт. 24:1", english:"And Abraham was old, and well stricken in age: and the LORD had blessed Abraham in all things.", refEn:"Gen. 24:1"}
    ],
    "חָכָם": [
        {text:"עֲטֶ֣רֶת חֲכָמִ֣ים עָשְׁרָ֑ם אִוֶּ֖לֶת כְּסִילִ֣ים אִוֶּֽלֶת", russian:"Венец мудрых - богатство их, а глупость невежд глупость и есть.", form:"חֲכָמִ֣ים", ref:"Притч. 14:24", english:"The crown of the wise is their riches: but the foolishness of fools is folly.", refEn:"Prov. 14:24"}
    ],
    "מְעַט": [
        {text:"זֶ֥רַע רַ֖ב תּוֹצִ֣יא הַשָּׂדֶ֑ה וּמְעַ֣ט תֶּאֱסֹ֔ף כִּ֥י יַחְסְלֶ֖נּוּ הָאַרְבֶּֽה", russian:"Семян много вынесешь в поле, а соберешь мало, потому что поест их саранча.", form:"וּמְעַ֣ט", ref:"Втор. 28:38", english:"Thou shalt carry much seed out into the field, and shalt gather but little in; for the locust shall consume it.", refEn:"Deut. 28:38"}
    ],
    "קָטֹן": [
        {text:"וּלְלָבָ֖ן שְׁתֵּ֣י בָנ֑וֹת שֵׁ֤ם הַגְּדֹלָה֙ לֵאָ֔ה וְשֵׁ֥ם הַקְּטַנָּ֖ה רָחֵֽל", russian:"У Лавана же было две дочери; имя старшей: Лия; имя младшей: Рахиль.", form:"הַקְּטַנָּ֖ה", ref:"Быт. 29:16", english:"And Laban had two daughters: the name of the elder was Leah, and the name of the younger was Rachel.", refEn:"Gen. 29:16"}
    ],
    "רָחוֹק": [
        {text:"רָח֣וֹק יְ֭הוָה מֵרְשָׁעִ֑ים וּתְפִלַּ֖ת צַדִּיקִ֣ים יִשְׁמָֽע", russian:"Далек Господь от нечестивых, а молитву праведников слышит.", form:"רָח֣וֹק", ref:"Притч. 15:29", english:"The LORD is far from the wicked: but he heareth the prayer of the righteous.", refEn:"Prov. 15:29"}
    ],
    "קָרוֹב": [
        {text:"חָדְל֥וּ קְרוֹבָ֑י וּֽמְיֻדָּעַ֥י שְׁכֵחֽוּנִי", russian:"Покинули меня близкие мои, и знакомые мои забыли меня.", form:"קְרוֹבָ֑י", ref:"Иов. 19:14", english:"My kinsfolk have failed, and my familiar friends have forgotten me.", refEn:"Job 19:14"}
    ],
    "דַּל": [
        {text:"תִּרְמְסֶ֖נָּה רָ֑גֶל רַגְלֵ֥י עָנִ֖י פַּעֲמֵ֥י דַלִּֽים", russian:"Нога попирает его, ноги бедного, стопы нищих.", form:"דַלִּֽים", ref:"Ис. 26:6", english:"The foot shall tread it down, even the feet of the poor, and the steps of the needy.", refEn:"Isa. 26:6"}
    ],
    "גַּם": [
        {text:"גַּם־עֲ֭וִילִים מָ֣אֲסוּ בִ֑י אָ֝ק֗וּמָה וַיְדַבְּרוּ־בִֽי", russian:"Даже малые дети презирают меня: поднимаюсь, и они издеваются надо мною.", form:"גַּם", ref:"Иов. 19:18", english:"Yea, young children despised me; I arose, and they spake against me.", refEn:"Job 19:18"}
    ],
    "כַּאֲשֶׁר": [
        {text:"וָאֵלֵ֕ךְ וָאֶטְמְנֵ֖הוּ בִּפְרָ֑ת כַּאֲשֶׁ֛ר צִוָּ֥ה יְהוָ֖ה אוֹתִֽי", russian:"Я пошел и спрятал его у Евфрата, как повелел мне Господь.", form:"כַּאֲשֶׁ֛ר", ref:"Иер. 13:5", english:"So I went, and hid it by Euphrates, as the LORD commanded me.", refEn:"Jer. 13:5"}
    ],
    "דָּם": [
        {text:"גִּלְעָ֕ד קִרְיַ֖ת פֹּ֣עֲלֵי אָ֑וֶן עֲקֻבָּ֖ה מִדָּֽם", russian:"Галаад - город нечестивцев, запятнанный кровью.", form:"מִדָּֽם", ref:"Ос. 6:8", english:"Gilead is a city of them that work iniquity, and is polluted with blood.", refEn:"Hos. 6:8"}
    ],
    "אֹ֫הֶל": [
        {text:"תַּ֣חַת אָ֔וֶן רָאִ֖יתִי אָהֳלֵ֣י כוּשָׁ֑ן יִרְגְּז֕וּן יְרִיע֖וֹת אֶ֥רֶץ מִדְיָֽן", russian:"Грустными видел я шатры Ефиопские; сотряслись палатки земли Мадиамской.", form:"אָהֳלֵ֣י", ref:"Авв. 3:7", english:"I saw the tents of Cushan in affliction: and the curtains of the land of Midian did tremble.", refEn:"Hab. 3:7"}
    ],
    "שֶׁ֫מֶן": [
        {text:"וְלָֽקַחְתָּ֙ אֶת־שֶׁ֣מֶן הַמִּשְׁחָ֔ה וְיָצַקְתָּ֖ עַל־רֹאשׁ֑וֹ וּמָשַׁחְתָּ֖ אֹתֽוֹ", russian:"и возьми елей помазания, и возлей ему на голову, и помажь его.", form:"שֶׁ֣מֶן", ref:"Исх. 29:7", english:"Then shalt thou take the anointing oil, and pour it upon his head, and anoint him.", refEn:"Exod. 29:7"}
    ],
    "בְּהֵמָה": [
        {text:"כָּרַ֥ע בֵּל֙ קֹרֵ֣ס נְב֔וֹ הָיוּ֙ עֲצַבֵּיהֶ֔ם לַחַיָּ֖ה וְלַבְּהֵמָ֑ה נְשֻׂאֹתֵיכֶ֣ם עֲמוּס֔וֹת מַשָּׂ֖א לַעֲיֵפָֽה", russian:"Пал Вил, низвергся Нево; истуканы их - на скоте и вьючных животных; ваша ноша сделалась бременем для усталых животных.", form:"וְלַבְּהֵמָ֑ה", ref:"Ис. 46:1", english:"Bel boweth down, Nebo stoopeth, their idols were upon the beasts, and upon the cattle: your carriages were heavy loaden; they are a burden to the weary beast.", refEn:"Isa. 46:1"}
    ],
    "לָ֫מָּה": [
        {text:"וְעַתָּ֗ה לָ֚מָּה לֹ֣א גָעַ֔רְתָּ בְּיִרְמְיָ֖הוּ הָֽעֲנְּתֹתִ֑י הַמִּתְנַבֵּ֖א לָכֶֽם", russian:"почему же ты не запретишь Иеремии Анафофскому пророчествовать у вас?", form:"לָ֚מָּה", ref:"Иер. 29:27", english:"Now therefore why hast thou not reproved Jeremiah of Anathoth, which maketh himself a prophet to you?", refEn:"Jer. 29:27"}
    ],
    "אַחֵר": [
        {text:"הֶן־ה֭וּא מְשׂ֣וֹשׂ דַּרְכּ֑וֹ וּ֝מֵעָפָ֗ר אַחֵ֥ר יִצְמָֽחוּ", russian:"Вот радость пути его! а из земли вырастают другие.", form:"אַחֵ֥ר", ref:"Иов. 8:19", english:"Behold, this is the joy of his way, and out of the earth shall others grow.", refEn:"Job 8:19"}
    ],
    "טָהוֹר": [
        {text:"כָּל־ע֥וֹף טָה֖וֹר תֹּאכֵֽלוּ", russian:"Всякую птицу чистую ешьте.", form:"טָה֖וֹר", ref:"Втор. 14:20", english:"But of all clean fowls ye may eat.", refEn:"Deut. 14:20"}
    ],
    "עָנִי": [
        {text:"זְכָר־עָנְיִ֥י וּמְרוּדִ֖י לַעֲנָ֥ה וָרֹֽאשׁ", russian:"Помысли о моем страдании и бедствии моем, о полыни и желчи.", form:"עָנְיִ֥י", ref:"Плач. 3:19", english:"Remembering mine affliction and my misery, the wormwood and the gall.", refEn:"Lam. 3:19"}
    ],
    "כְּסִיל": [
        {text:"כָּ֭בוֹד חֲכָמִ֣ים יִנְחָ֑לוּ וּ֝כְסִילִ֗ים מֵרִ֥ים קָלֽוֹן", russian:"Мудрые наследуют славу, а глупые - бесславие.", form:"וּ֝כְסִילִ֗ים", ref:"Притч. 3:35", english:"The wise shall inherit glory: but shame shall be the promotion of fools.", refEn:"Prov. 3:35"}
    ],
    "מַדּוּעַ": [
        {text:"מַדּ֣וּעַ רְשָׁעִ֣ים יִחְי֑וּ עָ֝תְק֗וּ גַּם־גָּ֥בְרוּ חָֽיִל", russian:"Почему беззаконные живут, достигают старости, да и силами крепки?", form:"מַדּ֣וּעַ", ref:"Иов. 21:7", english:"Wherefore do the wicked live, become old, yea, are mighty in power?", refEn:"Job 21:7"}
    ],
    "שֹׁפֵט": [
        {text:"וַיִּשְׁפֹּ֤ט אַֽחֲרָיו֙ אֶת־יִשְׂרָאֵ֔ל אִבְצָ֖ן מִבֵּ֥ית לָֽחֶם", russian:"После него был судьею Израиля Есевон из Вифлеема.", form:"וַיִּשְׁפֹּ֤ט", ref:"Суд. 12:8", english:"And after him Ibzan of Beth-lehem judged Israel.", refEn:"Judg. 12:8"}
    ],
    "אֵיךְ": [
        {text:"אֵ֚יךְ נֶחְפְּשׂ֣וּ עֵשָׂ֔ו נִבְע֖וּ מַצְפֻּנָֽיו", russian:"Как обобрано все у Исава и обысканы тайники его!", form:"אֵ֚יךְ", ref:"Авд. 1:6", english:"How are the things of Esau searched out! how are his hidden things sought up!", refEn:"Obad. 1:6"}
    ],
    "פָּנִים": [
        {text:"הֲפָנָ֥יו תִּשָּׂא֑וּן אִם־לָאֵ֥ל תְּרִיבֽוּן", russian:"Надлежало ли вам быть лицеприятными к Нему и за Бога так препираться?", form:"הֲפָנָ֥יו", ref:"Иов. 13:8", english:"Will ye accept his person? will ye contend for God?", refEn:"Job 13:8"}
    ],
    "יָד": [
        {text:"וַיֹּ֖אמֶר הָ֣רֶם לָ֑ךְ וַיִּשְׁלַ֥ח יָד֖וֹ וַיִּקָּחֵֽהוּ", russian:"И сказал он: возьми себе. Он протянул руку свою и взял его.", form:"יָד֖וֹ", ref:"4 Цар. 6:7", english:"Therefore said he, Take it up to thee. And he put out his hand, and took it.", refEn:"2 Kgs. 6:7"}
    ],
    "עוֹד": [
        {text:"וַתַּ֤הַר עוֹד֙ לֵאָ֔ה וַתֵּ֥לֶד בֵּן־שִׁשִּׁ֖י לְּיַעֲקֹֽב", russian:"И еще зачала Лия и родила Иакову шестого сына.", form:"עוֹד֙", ref:"Быт. 30:19", english:"And Leah conceived again, and bare Jacob the sixth son.", refEn:"Gen. 30:19"}
    ],
    "עֵת": [
        {text:"וַיְהִ֖י בְּעֵ֣ת לִדְתָּ֑הּ וְהִנֵּ֥ה תְאוֹמִ֖ים בְּבִטְנָֽהּ", russian:"Во время родов ее оказалось, что близнецы в утробе ее.", form:"בְּעֵ֣ת", ref:"Быт. 38:27", english:"And it came to pass in the time of her travail, that, behold, twins were in her womb.", refEn:"Gen. 38:27"}
    ],
    "בְּרִית": [
        {text:"בְּ֭רִית כָּרַ֣תִּי לְעֵינָ֑י וּמָ֥ה אֶ֝תְבּוֹנֵ֗ן עַל־בְּתוּלָֽה", russian:"Завет положил я с глазами моими, чтобы не помышлять мне о девице.", form:"בְּ֭רִית", ref:"Иов. 31:1", english:"I made a covenant with mine eyes; why then should I think upon a maid?", refEn:"Job 31:1"}
    ],
    "עֹלָה": [
        {text:"וַיֹּ֣אמֶר שָׁא֔וּל הַגִּ֣שׁוּ אֵלַ֔י הָעֹלָ֖ה וְהַשְּׁלָמִ֑ים וַיַּ֖עַל הָעֹלָֽה", russian:"И сказал Саул: приведите ко мне, что назначено для жертвы всесожжения и для жертв мирных. И вознес всесожжение.", form:"הָעֹלָ֖ה", ref:"1 Цар. 13:9", english:"And Saul said, Bring hither a burnt offering to me, and peace offerings. And he offered the burnt offering.", refEn:"1 Sam. 13:9"}
    ],
    "אֹיֵב": [
        {text:"מְהֻלָּ֖ל אֶקְרָ֣א יְהוָ֑ה וּמֵאֹיְבַ֖י אִוָּשֵֽׁעַ", russian:"Призову Господа достопоклоняемого и от врагов моих спасусь.", form:"וּמֵאֹיְבַ֖י", ref:"2 Цар. 22:4", english:"I will call on the LORD, who is worthy to be praised: so shall I be saved from mine enemies.", refEn:"2 Sam. 22:4"}
    ],
    "חֹ֫דֶשׁ": [
        {text:"חָדְשֵׁיכֶ֤ם וּמוֹעֲדֵיכֶם֙ שָׂנְאָ֣ה נַפְשִׁ֔י הָי֥וּ עָלַ֖י לָטֹ֑רַח נִלְאֵ֖יתִי נְשֹֽׂא", russian:"Новомесячия ваши и праздники ваши ненавидит душа Моя: они бремя для Меня; Мне тяжело нести их.", form:"חָדְשֵׁיכֶ֤ם", ref:"Ис. 1:14", english:"Your new moons and your appointed feasts my soul hateth: they are a trouble unto me; I am weary to bear them.", refEn:"Isa. 1:14"}
    ],
    "אֶ֫בֶן": [
        {text:"תְּהֹמֹ֖ת יְכַסְיֻ֑מוּ יָרְד֥וּ בִמְצוֹלֹ֖ת כְּמוֹ־אָֽבֶן", russian:"Пучины покрыли их: они пошли в глубину, как камень.", form:"אָֽבֶן", ref:"Исх. 15:5", english:"The depths have covered them: they sank into the bottom as a stone.", refEn:"Exod. 15:5"}
    ],
    "צֹאן": [
        {text:"וַיַּצֵּ֣ב אַבְרָהָ֗ם אֶת־שֶׁ֛בַע כִּבְשֹׂ֥ת הַצֹּ֖אן לְבַדְּהֶֽן", russian:"И поставил Авраам семь агниц из стада мелкого скота особо.", form:"הַצֹּ֖אן", ref:"Быт. 21:28", english:"And Abraham set seven ewe lambs of the flock by themselves.", refEn:"Gen. 21:28"}
    ],
    "בָּשָׂר": [
        {text:"הַעֵינֵ֣י בָשָׂ֣ר לָ֑ךְ אִם־כִּרְא֖וֹת אֱנ֣וֹשׁ תִּרְאֶֽה", russian:"Разве у Тебя плотские очи, и Ты смотришь, как смотрит человек?", form:"בָשָׂ֣ר", ref:"Иов. 10:4", english:"Hast thou eyes of flesh? or seest thou as man seeth?", refEn:"Job 10:4"}
    ],
    "מִדְבָּר": [
        {text:"וַיִּסְע֖וּ מִמִּדְבַּר־סִ֑ין וַֽיַּחֲנ֖וּ בְּדָפְקָֽה", russian:"И отправились из пустыни Син и расположились станом в Дофке.", form:"מִמִּדְבַּר", ref:"Чис. 33:12", english:"And they took their journey out of the wilderness of Sin, and encamped in Dophkah.", refEn:"Num. 33:12"}
    ],
    "מַטֶּה": [
        {text:"זֹ֗את נַחֲלַ֛ת מַטֵּ֥ה בְנֵֽי־יִשָּׂשכָ֖ר לְמִשְׁפְּחֹתָ֑ם הֶעָרִ֖ים וְחַצְרֵיהֶֽן", russian:"Вот удел колена сынов Иссахаровых по племенам их; вот города и села их.", form:"מַטֵּ֥ה", ref:"Нав. 19:23", english:"This is the inheritance of the tribe of the children of Issachar according to their families, the cities and their villages.", refEn:"Josh. 19:23"}
    ],
    "רֶ֫גֶל": [
        {text:"בְּרַגְלַ֖יִם תֵּֽרָמַ֑סְנָה עֲטֶ֥רֶת גֵּא֖וּת שִׁכּוֹרֵ֥י אֶפְרָֽיִם", russian:"Ногами попирается венок гордости пьяных Ефремлян.", form:"בְּרַגְלַ֖יִם", ref:"Ис. 28:3", english:"The crown of pride, the drunkards of Ephraim, shall be trodden under feet:", refEn:"Isa. 28:3"}
    ],
    "חֶ֫סֶד": [
        {text:"אִם־לְשֵׁ֥בֶט אִם־לְאַרְצ֑וֹ אִם־לְ֝חֶ֗סֶד יַמְצִאֵֽהוּ", russian:"Он повелевает им идти или для наказания, или в благоволение, или для помилования.", form:"לְ֝חֶ֗סֶד", ref:"Иов. 37:13", english:"He causeth it to come, whether for correction, or for his land, or for mercy.", refEn:"Job 37:13"}
    ],
    "חַ֫יִל": [
        {text:"וְאֹכְלֵ֧י פַת־בָּג֛וֹ יִשְׁבְּר֖וּהוּ וְחֵיל֣וֹ יִשְׁט֑וֹף וְנָפְל֖וּ חֲלָלִ֥ים רַבִּֽים", russian:"Даже участники трапезы его погубят его, и войско его разольется, и падет много убитых.", form:"וְחֵיל֣וֹ", ref:"Дан. 11:26", english:"Yea, they that feed of the portion of his meat shall destroy him, and his army shall overflow: and many shall fall down slain.", refEn:"Dan. 11:26"}
    ],
    "גְּבוּל": [
        {text:"כִּ֣י תִ֭קָּחֶנּוּ אֶל־גְּבוּל֑וֹ וְכִֽי־תָ֝בִ֗ין נְתִיב֥וֹת בֵּיתֽוֹ", russian:"Ты, конечно, доходил до границ ее и знаешь стези к дому ее.", form:"גְּבוּל֑וֹ", ref:"Иов. 38:20", english:"That thou shouldest take it to the bound thereof, and that thou shouldest know the paths to the house thereof?", refEn:"Job 38:20"}
    ],
    "אֲדָמָה": [
        {text:"וּבָ֗א בְּמַלְכוּת֙ מֶ֣לֶךְ הַנֶּ֔גֶב וְשָׁ֖ב אֶל־אַדְמָתֽוֹ", russian:"Хотя этот и сделает нашествие на царство южного царя, но возвратится в свою землю.", form:"אַדְמָתֽוֹ", ref:"Дан. 11:9", english:"So the king of the south shall come into his kingdom, and shall return into his own land.", refEn:"Dan. 11:9"}
    ],
    "מָ֫וֶת": [
        {text:"וַיִּפְשַׁ֤ע מוֹאָב֙ בְּיִשְׂרָאֵ֔ל אַחֲרֵ֖י מ֥וֹת אַחְאָֽב", russian:"И отложился Моав от Израиля по смерти Ахава.", form:"מ֥וֹת", ref:"4 Цар. 1:1", english:"Then Moab rebelled against Israel after the death of Ahab.", refEn:"2 Kgs. 1:1"}
    ],
    "שָׁם": [
        {text:"וַנָּב֖וֹא יְרוּשָׁלִָ֑ם וַנֵּ֥שֶׁב שָׁ֖ם יָמִ֥ים שְׁלֹשָֽׁה", russian:"И пришли мы в Иерусалим, и пробыли там три дня.", form:"שָׁ֖ם", ref:"Езд. 8:32", english:"And we came to Jerusalem, and abode there three days.", refEn:"Ezra 8:32"}
    ],
    "אַמָּה": [
        {text:"וְעָשִׂ֥יתָ שֻׁלְחָ֖ן עֲצֵ֣י שִׁטִּ֑ים אַמָּתַ֤יִם אָרְכּוֹ֙ וְאַמָּ֣ה רָחְבּ֔וֹ וְאַמָּ֥ה וָחֵ֖צִי קֹמָתֽוֹ", russian:"И сделай стол из дерева ситтим, длиною в два локтя, шириною в локоть, и вышиною в полтора локтя,", form:"אַמָּתַ֤יִם", ref:"Исх. 25:23", english:"Thou shalt also make a table of shittim wood: two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof.", refEn:"Exod. 25:23"}
    ],
    "שָׁלוֹם": [
        {text:"אֵ֣ין שָׁל֔וֹם אָמַ֥ר יְהוָ֖ה לָרְשָׁעִֽים", russian:"Нечестивым же нет мира, говорит Господь.", form:"שָׁל֔וֹם", ref:"Ис. 48:22", english:"There is no peace, saith the LORD, unto the wicked.", refEn:"Isa. 48:22"}
    ],
    "נַ֫עַר": [
        {text:"בַּחוּרִים֙ טְח֣וֹן נָשָׂ֔אוּ וּנְעָרִ֖ים בָּעֵ֥ץ כָּשָֽׁלוּ", russian:"Юношей берут к жерновам, и отроки падают под ношами дров.", form:"וּנְעָרִ֖ים", ref:"Плач. 5:13", english:"They took the young men to grind, and the children fell under the wood.", refEn:"Lam. 5:13"}
    ],
    "מַעֲשֶׂה": [
        {text:"גֹּ֣ל אֶל־יְהוָ֣ה מַעֲשֶׂ֑יךָ וְ֝יִכֹּ֗נוּ מַחְשְׁבֹתֶֽיךָ", russian:"Предай Господу дела твои, и предприятия твои совершатся.", form:"מַעֲשֶׂ֑יךָ", ref:"Притч. 16:3", english:"Commit thy works unto the LORD, and thy thoughts shall be established.", refEn:"Prov. 16:3"}
    ],
    "לַ֫יְלָה": [
        {text:"ק֚וּמוּ וְנַעֲלֶ֣ה בַלָּ֔יְלָה וְנַשְׁחִ֖יתָה אַרְמְנוֹתֶֽיהָ", russian:"Вставайте, пойдем и ночью, и разорим чертоги ее!", form:"בַלָּ֔יְלָה", ref:"Иер. 6:5", english:"Arise, and let us go by night, and let us destroy her palaces.", refEn:"Jer. 6:5"}
    ],
    "עָוֹן": [
        {text:"חָתֻ֣ם בִּצְר֣וֹר פִּשְׁעִ֑י וַ֝תִּטְפֹּ֗ל עַל־עֲוֺנִֽי", russian:"в свитке было бы запечатано беззаконие мое, и Ты закрыл бы вину мою.", form:"עֲוֺנִֽי", ref:"Иов. 14:17", english:"My transgression is sealed up in a bag, and thou sewest up mine iniquity.", refEn:"Job 14:17"}
    ],
    "זֶ֫רַע": [
        {text:"וְצָרַ֤עַת נַֽעֲמָן֙ תִּֽדְבַּק־בְּךָ֔ וּֽבְזַרְעֲךָ לְעוֹלָ֑ם וַיֵּצֵ֥א מִלְּפָנָ֖יו מְצֹרָ֥ע כַּשָּֽׁלֶג", russian:"Пусть же проказа Нееманова пристанет к тебе и к потомству твоему навек. И вышел он от него белый от проказы, как снег.", form:"וּֽבְזַרְעֲךָ", ref:"4 Цар. 5:27", english:"The leprosy therefore of Naaman shall cleave unto thee, and unto thy seed for ever. And he went out from his presence a leper as white as snow.", refEn:"2 Kgs. 5:27"}
    ],
    "קֶ֫רֶב": [
        {text:"עַל־כֵּן֙ מֵעַ֣י לְמוֹאָ֔ב כַּכִּנּ֖וֹר יֶֽהֱמ֑וּ וְקִרְבִּ֖י לְקִ֥יר חָֽרֶשׂ", russian:"Оттого внутренность моя стонет о Моаве, как гусли, и сердце мое - о Кирхарешете.", form:"וְקִרְבִּ֖י", ref:"Ис. 16:11", english:"Wherefore my bowels shall sound like an harp for Moab, and mine inward parts for Kir-haresh.", refEn:"Isa. 16:11"}
    ],
    "מוֹעֵד": [
        {text:"וְשָׁמַרְתָּ֛ אֶת־הַחֻקָּ֥ה הַזֹּ֖את לְמוֹעֲדָ֑הּ מִיָּמִ֖ים יָמִֽימָה", russian:"Исполняй же устав сей в назначенное время, из года в год.", form:"לְמוֹעֲדָ֑הּ", ref:"Исх. 13:10", english:"Thou shalt therefore keep this ordinance in his season from year to year.", refEn:"Exod. 13:10"}
    ],
    "נַחֲלָה": [
        {text:"נַ֭חֲלָה מבחלת בָּרִאשֹׁנָ֑ה וְ֝אַחֲרִיתָ֗הּ לֹ֣א תְבֹרָֽךְ", russian:"Наследство, поспешно захваченное вначале, не благословится впоследствии.", form:"נַ֭חֲלָה", ref:"Притч. 20:21", english:"An inheritance may be gotten hastily at the beginning; but the end thereof shall not be blessed.", refEn:"Prov. 20:21"}
    ],
    "אֵם": [
        {text:"וַתָּ֨רָץ֙ הַֽנַּעֲרָ֔ וַתַּגֵּ֖ד לְבֵ֣ית אִמָּ֑הּ כַּדְּבָרִ֖ים הָאֵֽלֶּה", russian:"Девица побежала и рассказала об этом в доме матери своей.", form:"אִמָּ֑הּ", ref:"Быт. 24:28", english:"And the damsel ran, and told them of her mother’s house these things.", refEn:"Gen. 24:28"}
    ],
    "בֶּ֫גֶד": [
        {text:"וְ֭הוּא כְּרָקָ֣ב יִבְלֶ֑ה כְּ֝בֶ֗גֶד אֲכָ֣לוֹ עָֽשׁ", russian:"А он, как гниль, распадается, как одежда, изъеденная молью.", form:"כְּ֝בֶ֗גֶד", ref:"Иов. 13:28", english:"And he, as a rotten thing, consumeth, as a garment that is moth eaten.", refEn:"Job 13:28"}
    ],
    "מַחֲנֶה": [
        {text:"וַעֲנַ֧ן יְהוָ֛ה עֲלֵיהֶ֖ם יוֹמָ֑ם בְּנָסְעָ֖ם מִן־הַֽמַּחֲנֶֽה", russian:"И облако Господне осеняло их днем, когда они отправлялись из стана.", form:"הַֽמַּחֲנֶֽה", ref:"Чис. 10:34", english:"And the cloud of the LORD was upon them by day, when they went out of the camp.", refEn:"Num. 10:34"}
    ],
    "מַלְאָךְ": [
        {text:"וַיֹּ֤אמֶר יְהוָה֙ לַמַּלְאָ֔ךְ וַיָּ֥שֶׁב חַרְבּ֖וֹ אֶל־נְדָנָֽהּ", russian:"И сказал Господь Ангелу: возврати меч твой в ножны его.", form:"לַמַּלְאָ֔ךְ", ref:"1 Пар. 21:27", english:"And the LORD commanded the angel; and he put up his sword again into the sheath thereof.", refEn:"1 Chr. 21:27"}
    ],
    "לָכֵן": [
        {text:"לָכֵ֣ן אָ֭מַרְתִּי שִׁמְעָה־לִּ֑י אֲחַוֶּ֖ה דֵּעִ֣י אַף־אָֽנִי", russian:"Поэтому я говорю: выслушайте меня, объявлю вам мое мнение и я.", form:"לָכֵ֣ן", ref:"Иов. 32:10", english:"Therefore I said, Hearken to me; I also will shew mine opinion.", refEn:"Job 32:10"}
    ],
    "חָצֵר": [
        {text:"וְֽכָל־הַיְתֵדֹ֞ת לַמִּשְׁכָּ֧ן וְלֶחָצֵ֛ר סָבִ֖יב נְחֹֽשֶׁת", russian:"Все колья вокруг скинии и двора медные.", form:"וְלֶחָצֵ֛ר", ref:"Исх. 38:20", english:"And all the pins of the tabernacle, and of the court round about, were of brass.", refEn:"Exod. 38:20"}
    ],
    "רַק": [
        {text:"רַ֥ק הַבָּמ֖וֹת לֹא־סָ֑רוּ ע֥וֹד הָעָ֛ם מְזַבְּחִ֥ים וּֽמְקַטְּרִ֖ים בַּבָּמֽוֹת", russian:"Только высоты не были отменены: народ совершал еще жертвы и курения на высотах.", form:"רַ֥ק", ref:"4 Цар. 14:4", english:"Howbeit the high places were not taken away: as yet the people did sacrifice and burnt incense on the high places.", refEn:"2 Kgs. 14:4"}
    ],
    "תָּמִיד": [
        {text:"הַ֥עַל כֵּ֖ן יָרִ֣יק חֶרְמ֑וֹ וְתָמִ֛יד לַהֲרֹ֥ג גּוֹיִ֖ם לֹ֥א יַחְמֽוֹל", russian:"Неужели для этого он должен опорожнять свою сеть и непрестанно избивать народы без пощады?", form:"וְתָמִ֛יד", ref:"Авв. 1:17", english:"Shall they therefore empty their net, and not spare continually to slay the nations?", refEn:"Hab. 1:17"}
    ],
    "אָכַל": [
        {text:"וַיַּ֤עַשׂ לָהֶם֙ מִשְׁתֶּ֔ה וַיֹּאכְל֖וּ וַיִּשְׁתּֽוּ", russian:"Он сделал им пиршество, и они ели и пили.", form:"וַיֹּאכְל֖וּ", ref:"Быт. 26:30", english:"And he made them a feast, and they did eat and drink.", refEn:"Gen. 26:30"}
    ],
    "אָמַר": [
        {text:"וַיֹּ֨אמֶר֙ אַבְרָהָ֔ם אָנֹכִ֖י אִשָּׁבֵֽעַ", russian:"И сказал Авраам: я клянусь.", form:"וַיֹּ֨אמֶר֙", ref:"Быт. 21:24", english:"And Abraham said, I will swear.", refEn:"Gen. 21:24"}
    ],
    "הָיָה": [
        {text:"כָּל־חֵ֥רֶם בְּיִשְׂרָאֵ֖ל לְךָ֥ יִהְיֶֽה", russian:"Все заклятое в земле Израилевой да будет твоим.", form:"יִהְיֶֽה", ref:"Чис. 18:14", english:"Every thing devoted in Israel shall be thine.", refEn:"Num. 18:14"}
    ],
    "הָלַךְ": [
        {text:"וַיִּסַּ֣ע אַבְרָ֔ם הָל֥וֹךְ וְנָס֖וֹעַ הַנֶּֽגְבָּה", russian:"И поднялся Аврам и продолжал идти к югу.", form:"הָל֥וֹךְ", ref:"Быт. 12:9", english:"And Abram journeyed, going on still toward the south.", refEn:"Gen. 12:9"}
    ],
    "יָצָא": [
        {text:"נַ֭פְשׁוֹ גֶּחָלִ֣ים תְּלַהֵ֑ט וְ֝לַ֗הַב מִפִּ֥יו יֵצֵֽא", russian:"Дыхание его раскаляет угли, и из пасти его выходит пламя.", form:"יֵצֵֽא", ref:"Иов. 41:13", english:"His breath kindleth coals, and a flame goeth out of his mouth.", refEn:"Job 41:21"}
    ],
    "יָשַׁב": [
        {text:"נָדְדָ֖ה מַדְמֵנָ֑ה יֹשְׁבֵ֥י הַגֵּבִ֖ים הֵעִֽיזוּ", russian:"Мадмена разбежалась, жители Гевима спешат уходить.", form:"יֹשְׁבֵ֥י", ref:"Ис. 10:31", english:"Madmenah is removed; the inhabitants of Gebim gather themselves to flee.", refEn:"Isa. 10:31"}
    ],
    "עָשָׂה": [
        {text:"וּשְׁמַרְתֶּם֙ מִצְוֺתַ֔י וַעֲשִׂיתֶ֖ם אֹתָ֑ם אֲנִ֖י יְהוָֽה", russian:"И соблюдайте заповеди Мои и исполняйте их. Я Господь.", form:"וַעֲשִׂיתֶ֖ם", ref:"Лев. 22:31", english:"Therefore shall ye keep my commandments, and do them: I am the LORD.", refEn:"Lev. 22:31"}
    ],
    "רָאָה": [
        {text:"הַחֵרְשִׁ֖ים שְׁמָ֑עוּ וְהַעִוְרִ֖ים הַבִּ֥יטוּ לִרְאֽוֹת", russian:"Слушайте, глухие, и смотрите, слепые, чтобы видеть.", form:"לִרְאֽוֹת", ref:"Ис. 42:18", english:"Hear, ye deaf; and look, ye blind, that ye may see.", refEn:"Isa. 42:18"}
    ],
    "שָׁבַת": [
        {text:"שָׁבַת֙ מְשׂ֣וֹשׂ לִבֵּ֔נוּ נֶהְפַּ֥ךְ לְאֵ֖בֶל מְחֹלֵֽנוּ", russian:"Прекратилась радость сердца нашего; хороводы наши обратились в сетование.", form:"שָׁבַת֙", ref:"Плач. 5:15", english:"The joy of our heart is ceased; our dance is turned into mourning.", refEn:"Lam. 5:15"}
    ],
    "שָׁמַע": [
        {text:"הַבְס֣וֹד אֱל֣וֹהַ תִּשְׁמָ֑ע וְתִגְרַ֖ע אֵלֶ֣יךָ חָכְמָֽה", russian:"Разве совет Божий ты слышал и привлек к себе премудрость?", form:"תִּשְׁמָ֑ע", ref:"Иов. 15:8", english:"Hast thou heard the secret of God? and dost thou restrain wisdom to thyself?", refEn:"Job 15:8"}
    ],
    "אֲרוֹן": [
        {text:"וּבֶֽרֶכְיָה֙ וְאֶלְקָנָ֔ה שֹׁעֲרִ֖ים לָאָרֽוֹן", russian:"Верехия и Елкана были придверниками у ковчега.", form:"לָאָרֽוֹן", ref:"1 Пар. 15:23", english:"And Berechiah and Elkanah were doorkeepers for the ark.", refEn:"1 Chr. 15:23"}
    ],
    "מִנְחָה": [
        {text:"הַזְּבָחִ֨ים וּמִנְחָ֜ה הִֽגַּשְׁתֶּם־לִ֧י בַמִּדְבָּ֛ר אַרְבָּעִ֥ים שָׁנָ֖ה בֵּ֥ית יִשְׂרָאֵֽל", russian:"Приносили ли вы Мне жертвы и хлебные дары в пустыне в течение сорока лет, дом Израилев?", form:"וּמִנְחָ֜ה", ref:"Ам. 5:25", english:"Have ye offered unto me sacrifices and offerings in the wilderness forty years, O house of Israel?", refEn:"Amos 5:25"}
    ],
    "שַׁבָּת": [
        {text:"קָדָשַׁ֖י בָּזִ֑ית וְאֶת־שַׁבְּתֹתַ֖י חִלָּֽלְתְּ", russian:"Святынь Моих ты не уважаешь и субботы Мои нарушаешь.", form:"שַׁבְּתֹתַ֖י", ref:"Иез. 22:8", english:"Thou hast despised mine holy things, and hast profaned my sabbaths.", refEn:"Ezek. 22:8"}
    ],
    "אַךְ": [
        {text:"בְּכָל־עֶ֭צֶב יִהְיֶ֣ה מוֹתָ֑ר וּדְבַר־שְׂ֝פָתַ֗יִם אַךְ־לְמַחְסֽוֹר", russian:"От всякого труда есть прибыль, а от пустословия только ущерб.", form:"אַךְ", ref:"Притч. 14:23", english:"In all labour there is profit: but the talk of the lips tendeth only to penury.", refEn:"Prov. 14:23"}
    ],
    "אַל": [
        {text:"וַיֹּ֥אמֶר ל֖וֹט אֲלֵהֶ֑ם אַל־נָ֖א אֲדֹנָֽי", russian:"Но Лот сказал им: нет, Владыка!", form:"אַל", ref:"Быт. 19:18", english:"And Lot said unto them, Oh, not so, my Lord:", refEn:"Gen. 19:18"}
    ],
};
