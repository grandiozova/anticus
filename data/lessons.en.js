// ============================================================
// ENGLISH LESSON TEXT
// ============================================================
// Grammar, titles and vocabulary meanings for every Greek lesson in the app.
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
const LESSONS_EN_GREEK = {
    "1": {
        "title": "The Alphabet and Pronunciation",
        "grammar": "<b>The Greek alphabet (24 letters)</b><br><table class=\"md-table--alphabet\">\n<tr><th>Letter</th><th>Name</th><th>Pronunciation</th></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Αα</span></td><td>άλφα</td><td>[a]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ββ</span></td><td>βῆτα</td><td>[v]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Γγ</span></td><td>γάμμα</td><td>[g] (before γ, κ, ξ, χ – [n])</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Δδ</span></td><td>δέλτα</td><td>[d]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Εε</span></td><td>ἒψιλόν</td><td>[e]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ζζ</span></td><td>ζῆτα</td><td>[dz]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ηη</span></td><td>ῆτα</td><td>[e] (long)</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Θθ</span></td><td>θῆτα</td><td>[t] (aspirated)</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ιι</span></td><td>ἰῶτα</td><td>[i]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Κκ</span></td><td>κάππα</td><td>[k]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Λλ</span></td><td>λάβδα</td><td>[l]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Μμ</span></td><td>μῦ</td><td>[m]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Νν</span></td><td>νῦ</td><td>[n]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ξξ</span></td><td>ξεῖ</td><td>[ks]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Οο</span></td><td>ὂμικρόν</td><td>[o]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ππ</span></td><td>πεῖ</td><td>[p]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ρρ</span></td><td>ρῶ</td><td>[r]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Σσ</span></td><td>σίγμα</td><td>[s] (word-final ς)</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ττ</span></td><td>ταῦ</td><td>[t]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Υυ</span></td><td>ὖψιλόν</td><td>[ü] (as German ü)</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Φφ</span></td><td>φεῖ</td><td>[f]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Χχ</span></td><td>χεῖ</td><td>[kh]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ψψ</span></td><td>ψεῖ</td><td>[ps]</td></tr>\n<tr><td lang=\"el\"><span class=\"alphabet-glyph\">Ωω</span></td><td>ὦμέγα</td><td>[o] (long)</td></tr>\n</table><br><b>Diphthongs:</b> αι [ai], ει [ei], οι [oi], υι [üi], αυ [au], ευ [eu], ου [u], ηυ [eu].<br><b>Breathings:</b> ῾ (rough – [h]), ᾿ (smooth – not pronounced).<br><b>Accents:</b> ´ (acute), ` (grave), ῀ (circumflex).",
        "vocabulary": {
            "ἄλφα": "alpha (Α α)",
            "βῆτα": "beta (Β β)",
            "γάμμα": "gamma (Γ γ)",
            "δέλτα": "delta (Δ δ)",
            "ἒψιλόν": "epsilon (Ε ε)",
            "ζῆτα": "zeta (Ζ ζ)",
            "ῆτα": "eta (Η η)",
            "θῆτα": "theta (Θ θ)",
            "ἰῶτα": "iota (Ι ι)",
            "κάππα": "kappa (Κ κ)",
            "λάβδα": "lambda (Λ λ)",
            "μῦ": "mu (Μ μ)",
            "νῦ": "nu (Ν ν)",
            "ξεῖ": "xi (Ξ ξ)",
            "ὂμικρόν": "omicron (Ο ο)",
            "πεῖ": "pi (Π π)",
            "ρῶ": "rho (Ρ ρ)",
            "σίγμα": "sigma (Σ σ/ς)",
            "ταῦ": "tau (Τ τ)",
            "ὖψιλόν": "upsilon (Υ υ)",
            "φεῖ": "phi (Φ φ)",
            "χεῖ": "chi (Χ χ)",
            "ψεῖ": "psi (Ψ ψ)",
            "ὦμέγα": "omega (Ω ω)"
        }
    },
    "2": {
        "title": "Accent and Reading Rules",
        "grammar": "<b>Rules of accent</b><br>• An accent may stand on only one of the last three syllables.<br>• The acute accent (´) – a rise in pitch.<br>• The grave accent (`) – a fall in pitch (in connected speech).<br>• The circumflex accent (῀) – a rise followed by a fall (only on long vowels).<br><br><b>Special rules</b><br>• In verbs the accent is placed as far from the end of the word as possible.<br>• In nouns and adjectives the accent stays on the same syllable as in the nominative singular.<br><br><b>Enclitics and proclitics</b><br>• Enclitics are unstressed words that lean on the preceding word (for example, μου, σου).<br>• Proclitics are unstressed words that lean on the following word (for example, ὁ, ἡ, οἱ, αἱ, εἰς, ἐκ, ἐν, οὐ).",
        "vocabulary": {
            "ὁ": "the (definite article, masc.)",
            "ἡ": "the (definite article, fem.)",
            "τό": "the (definite article, neut.)",
            "οἱ": "the (definite article, masc. pl.)",
            "αἱ": "the (definite article, fem. pl.)",
            "τά": "the (definite article, neut. pl.)",
            "εἰς": "into, to (with Acc.)",
            "ἐκ": "out of (with Gen.)",
            "ἐν": "in, within (with Dat.)",
            "οὐ": "not (before consonants)",
            "οὐκ": "not (before vowels)",
            "οὐχ": "not (before rough breathing)"
        }
    },
    "3": {
        "title": "Verbs in -ω: the Present Tense",
        "grammar": "<b>1. Grammatical categories of the verb</b><br>The Greek verb has the following categories:<br>• Tempus (tense) — praesens (present), aoristus (aorist), futurum (future), etc.<br>• Genus (voice) — activum (active), medium (middle), passivum (passive)<br>• Modus (mood) — indicativus (indicative), coniunctivus (subjunctive), optativus (optative), imperativus (imperative)<br>• Persona (person) — 1st, 2nd, 3rd<br>• Numerus (number) — singularis (singular), pluralis (plural)<br><br><b>2. Praesens indicativi activi (present indicative active)</b><br>Conjugation of the verb λύω (I untie):<br><table>\n<tr><th>Person</th><th>Singular</th><th>Plural</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n<tr><td>1st</td><td>λύω</td><td>λύομεν</td><td>I untie</td><td>we untie</td></tr>\n<tr><td>2nd</td><td>λύεις</td><td>λύετε</td><td>you untie</td><td>you untie</td></tr>\n<tr><td>3rd</td><td>λύει</td><td>λύουσι(ν)</td><td>he unties</td><td>they untie</td></tr>\n</table><br><b>3. Personal endings and connecting vowels</b><br>Verb stem: λυ-<br>Endings:<br><table>\n<tr><th>Person</th><th>Singular</th><th>Plural</th></tr>\n<tr><td>1st</td><td>-ω</td><td>-ομεν</td></tr>\n<tr><td>2nd</td><td>-εις</td><td>-ετε</td></tr>\n<tr><td>3rd</td><td>-ει</td><td>-ουσι(ν)</td></tr>\n</table><br><b>Connecting vowels (thematische Vokale)</b><br>• before μ and ν — ο (λύομεν, λύουσι)<br>• before the others — ε (λύεις, λύετε, λύει)<br>• in the 1st person singular the ending -ω contains the connecting vowel ο + -μι (historically).<br><br><b>4. Peculiarities of the 3rd person plural</b><br>The ending -ουσι(ν) has a movable ν (ν ἐφελκυστικόν):<br>• -ουσι — before a consonant<br>• -ουσιν — before a vowel or at the end of a sentence<br>• Example: λύουσι τοὺς δούλους (before a consonant)<br>• Example: λύουσιν οἱ ἄνθρωποι (before a vowel)<br><br><b>5. Model conjugation (praesens indicativi activi)</b><br><table>\n<tr><th>Verb</th><th>Stem</th><th>1st sg.</th><th>2nd sg.</th><th>3rd sg.</th><th>Meaning</th></tr>\n<tr><td>βλέπω</td><td>βλεπ-</td><td>βλέπω</td><td>βλέπεις</td><td>βλέπει</td><td>I see / you see / he sees</td></tr>\n<tr><td>γράφω</td><td>γραφ-</td><td>γράφω</td><td>γράφεις</td><td>γράφει</td><td>I write / you write / he writes</td></tr>\n<tr><td>λέγω</td><td>λεγ-</td><td>λέγω</td><td>λέγεις</td><td>λέγει</td><td>I speak / you speak / he speaks</td></tr>\n<tr><td>ἔχω</td><td>ἐχ-</td><td>ἔχω</td><td>ἔχεις</td><td>ἔχει</td><td>I have / you have / he has</td></tr>\n<tr><td>διδάσκω</td><td>διδασκ-</td><td>διδάσκω</td><td>διδάσκεις</td><td>διδάσκει</td><td>I teach / you teach / he teaches</td></tr>\n<tr><td>λαμβάνω</td><td>λαμβαν-</td><td>λαμβάνω</td><td>λαμβάνεις</td><td>λαμβάνει</td><td>I take / you take / he takes</td></tr>\n<tr><td>γινώσκω</td><td>γινωσκ-</td><td>γινώσκω</td><td>γινώσκεις</td><td>γινώσκει</td><td>I know / you know / he knows</td></tr>\n</table><br><b>6. Accent in verbs in -ω</b><br>Verbs take a recessive accent (the law of the three syllables):<br>• the accent falls on the third syllable from the end, if possible<br>• if the third syllable from the end is short, the accent moves to the second syllable<br>• Example: λύω, λύεις, λύει — the accent is on the stem<br>• Example: λαμβάνω, λαμβάνεις — the accent is on the stem<br><br>Exceptions: some verbs keep a fixed accent on the ending (for example, εἰμί — to be).",
        "vocabulary": {
            "βλέπω": "I see",
            "λαμβάνω": "I take, receive",
            "γινώσκω": "I know",
            "λέγω": "I say",
            "γράφω": "I write",
            "λύω": "I untie, set free",
            "διδάσκω": "I teach",
            "ἔχω": "I have"
        }
    },
    "4": {
        "title": "Nouns of the Second Declension (M., N.)",
        "grammar": "<b>1. General points on declension</b><br>\nGreek has three declensions. The <b>second declension</b> includes nouns:<br>\n• <b>masculine</b> with the ending <b>-ος</b> in the Nom. Sing.<br>\n• <b>neuter</b> with the ending <b>-ον</b> in the Nom. Sing.<br>\n• <b>feminine</b> with the ending <b>-ος</b> (less common, for example νῆσος — island)<br><br>\n\n<b>2. The definite article of the second declension</b><br>\n<table>\n  <tr><th>Case</th><th>M. sg.</th><th>M. pl.</th><th>N. sg.</th><th>N. pl.</th></tr>\n  <tr><td>Nom.</td><td>ὁ</td><td>οἱ</td><td>τό</td><td>τά</td></tr>\n  <tr><td>Gen.</td><td>τοῦ</td><td>τῶν</td><td>τοῦ</td><td>τῶν</td></tr>\n  <tr><td>Dat.</td><td>τῷ</td><td>τοῖς</td><td>τῷ</td><td>τοῖς</td></tr>\n  <tr><td>Acc.</td><td>τόν</td><td>τούς</td><td>τό</td><td>τά</td></tr>\n</table><br>\n\n<b>3. Declension of ἄνθρωπος (man) — masculine</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n  <tr><td>Nom.</td><td>ἄνθρωπος</td><td>ἄνθρωποι</td><td>man</td><td>men</td></tr>\n  <tr><td>Gen.</td><td>ἀνθρώπου</td><td>ἀνθρώπων</td><td>of a man</td><td>of men</td></tr>\n  <tr><td>Dat.</td><td>ἀνθρώπῳ</td><td>ἀνθρώποις</td><td>to a man</td><td>to men</td></tr>\n  <tr><td>Acc.</td><td>ἄνθρωπον</td><td>ἀνθρώπους</td><td>of a man</td><td>of men</td></tr>\n  <tr><td>Voc.</td><td>ἄνθρωπε</td><td>ἄνθρωποι</td><td>O man!</td><td>O men!</td></tr>\n</table>\n<i>Important:</i> the accent stays on the syllable where it stands in the Nom. Sing. (<b>ἄνθρωπος</b> — the third syllable from the end), as long as the general rules allow. If the last vowel is long, the accent cannot stand on the third syllable from the end: it moves to the second and can only be acute — <b>ἀνθρώπου</b>, <b>ἀνθρώπῳ</b>, <b>ἀνθρώπων</b>, <b>ἀνθρώποις</b>, <b>ἀνθρώπους</b>. If the last vowel is short, the accent stays where it is: <b>ἄνθρωπον</b>, <b>ἄνθρωπε</b>, <b>ἄνθρωποι</b> (final -οι counts as short for accent).<br><br>\n\n<b>4. Declension of λόγος (word) — masculine</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>λόγος</td><td>λόγοι</td></tr>\n  <tr><td>Gen.</td><td>λόγου</td><td>λόγων</td></tr>\n  <tr><td>Dat.</td><td>λόγῳ</td><td>λόγοις</td></tr>\n  <tr><td>Acc.</td><td>λόγον</td><td>λόγους</td></tr>\n  <tr><td>Voc.</td><td>λόγε</td><td>λόγοι</td></tr>\n</table><br>\n\n<b>5. Declension of δῶρον (gift) — neuter</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n  <tr><td>Nom./Acc./Voc.</td><td>δῶρον</td><td>δῶρα</td><td>gift</td><td>gifts</td></tr>\n  <tr><td>Gen.</td><td>δώρου</td><td>δώρων</td><td>of a gift</td><td>of gifts</td></tr>\n  <tr><td>Dat.</td><td>δώρῳ</td><td>δώροις</td><td>to a gift</td><td>to gifts</td></tr>\n</table>\n<i>A feature of the neuter:</i> the Nom., Acc. and Voc. are the same in both numbers.<br><br>\n\n<b>6. Declension of ἱερόν (temple) — neuter</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom./Acc./Voc.</td><td>ἱερόν</td><td>ἱερά</td></tr>\n  <tr><td>Gen.</td><td>ἱεροῦ</td><td>ἱερῶν</td></tr>\n  <tr><td>Dat.</td><td>ἱερῷ</td><td>ἱεροῖς</td></tr>\n</table><br>\n\n<b>7. Case endings of the second declension (summary table)</b><br>\n<table>\n  <tr><th>Case</th><th>M. sg.</th><th>M. pl.</th><th>N. sg.</th><th>N. pl.</th></tr>\n  <tr><td>Nom.</td><td>-ος</td><td>-οι</td><td>-ον</td><td>-α</td></tr>\n  <tr><td>Gen.</td><td>-ου</td><td>-ων</td><td>-ου</td><td>-ων</td></tr>\n  <tr><td>Dat.</td><td>-ῳ</td><td>-οις</td><td>-ῳ</td><td>-οις</td></tr>\n  <tr><td>Acc.</td><td>-ον</td><td>-ους</td><td>-ον</td><td>-α</td></tr>\n  <tr><td>Voc.</td><td>-ε</td><td>-οι</td><td>-ον</td><td>-α</td></tr>\n</table>\n<i>Remember:</i> the neuter endings are always the same in the Nom., Acc. and Voc.!\n\n<b>8. The functions of the cases</b><br>\n• <b>Nominativus (Nom.)</b> — the subject (who? what?)<br>\n• <b>Genitivus (Gen.)</b> — possession, attribution (of whom? of what?)<br>\n• <b>Dativus (Dat.)</b> — the indirect object, means, place (to whom? to what?)<br>\n• <b>Accusativus (Acc.)</b> — the direct object, direction (whom? what?)<br>\n• <b>Vocativus (Voc.)</b> — address (O who? O what?)<br><br>\n\n<b>9. Accent in nouns of the second declension</b><br>\n• In words like <b>ἄνθρωπος</b> the accent stands on the third syllable from the end, and with a long final vowel it moves to the second: <b>ἀνθρώπου</b><br>\n• In words like <b>λόγος</b> the accent stays on the same syllable: <b>λόγου</b><br>\n• In the Voc. Sing. of the masculine the accent is on the same syllable as in the Nom.: <b>ἄνθρωπε</b>.",
        "vocabulary": {
            "ἄνθρωπος": "man, human being",
            "λόγος": "word",
            "δῶρον": "gift",
            "νόμος": "law",
            "οἶκος": "house",
            "δοῦλος": "slave, servant",
            "ἀδελφός": "brother",
            "ἱερόν": "temple",
            "θάνατος": "death",
            "υἱός": "son",
            "ἀπόστολος": "apostle",
            "Χριστός": "Christ",
            "Ἰησοῦς": "Jesus",
            "καί": "and, also"
        }
    },
    "5": {
        "title": "Nouns of the First Declension (F.)",
        "grammar": "<b>1. General points on the first declension</b><br>\nThe first declension contains nouns, mostly feminine, with a stem in <b>α</b> (or <b>η</b>) and the following endings in the Nom. Sing.:\n<ul>\n  <li><b>-α</b> (after ε, ι, ρ — pure alpha) — for example ἀλήθεια, βασιλεία</li>\n  <li><b>-η</b> (after other consonants — impure alpha) — for example δόξα, γραφή</li>\n  <li><b>-η</b> (with a long ending) — for example ζωή, ψυχή</li>\n</ul>\n<i>Note:</i> in the Gen. and Dat. Sing. impure alpha (after consonants other than ε, ι, ρ) changes <b>α → η</b>.<br><br>\n\n<b>2. Declension of ὥρα (hour) — an example with pure alpha (after ρ)</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n  <tr><td>Nom.</td><td>ὥρα</td><td>ὥραι</td><td>hour</td><td>hours</td></tr>\n  <tr><td>Gen.</td><td>ὥρας</td><td>ὡρῶν</td><td>of an hour</td><td>of hours</td></tr>\n  <tr><td>Dat.</td><td>ὥρᾳ</td><td>ὥραις</td><td>to an hour</td><td>to hours</td></tr>\n  <tr><td>Acc.</td><td>ὥραν</td><td>ὥρας</td><td>hour</td><td>hours</td></tr>\n  <tr><td>Voc.</td><td>ὥρα</td><td>ὥραι</td><td>O hour!</td><td>O hours!</td></tr>\n</table>\n<i>Here α is kept, because it stands after ρ (pure alpha).</i><br><br>\n\n<b>3. Declension of ἀλήθεια (truth) — pure alpha (after ε, ι, ρ)</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>ἀλήθεια</td><td>ἀλήθειαι</td></tr>\n  <tr><td>Gen.</td><td>ἀληθείας</td><td>ἀληθειῶν</td></tr>\n  <tr><td>Dat.</td><td>ἀληθείᾳ</td><td>ἀληθείαις</td></tr>\n  <tr><td>Acc.</td><td>ἀλήθειαν</td><td>ἀληθείας</td></tr>\n  <tr><td>Voc.</td><td>ἀλήθεια</td><td>ἀλήθειαι</td></tr>\n</table>\n<i>Note:</i> the endings with iota subscript: -ᾳ, -ῃ.<br><br>\n\n<b>4. Declension of δόξα (glory) — impure alpha (after a consonant)</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>δόξα</td><td>δόξαι</td></tr>\n  <tr><td>Gen.</td><td>δόξης</td><td>δοξῶν</td></tr>\n  <tr><td>Dat.</td><td>δόξῃ</td><td>δόξαις</td></tr>\n  <tr><td>Acc.</td><td>δόξαν</td><td>δόξας</td></tr>\n  <tr><td>Voc.</td><td>δόξα</td><td>δόξαι</td></tr>\n</table>\n<i>In the Gen. and Dat. Sing. α changes to η (δόξης, δόξῃ).</i><br><br>\n\n<b>5. Declension of γραφή (writing) — words in -η</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>γραφή</td><td>γραφαί</td></tr>\n  <tr><td>Gen.</td><td>γραφῆς</td><td>γραφῶν</td></tr>\n  <tr><td>Dat.</td><td>γραφῇ</td><td>γραφαῖς</td></tr>\n  <tr><td>Acc.</td><td>γραφήν</td><td>γραφάς</td></tr>\n  <tr><td>Voc.</td><td>γραφή</td><td>γραφαί</td></tr>\n</table><br>\n\n<b>6. Declension of ζωή (life) — words in -η with a long ending</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>ζωή</td><td>ζωαί</td></tr>\n  <tr><td>Gen.</td><td>ζωῆς</td><td>ζωῶν</td></tr>\n  <tr><td>Dat.</td><td>ζωῇ</td><td>ζωαῖς</td></tr>\n  <tr><td>Acc.</td><td>ζωήν</td><td>ζωάς</td></tr>\n  <tr><td>Voc.</td><td>ζωή</td><td>ζωαί</td></tr>\n</table><br>\n\n<b>7. The rule of “pure” and “impure” alpha (in detail)</b><br>\n• If the Nom. Sing. ending is <b>-α</b>, then:\n  - after <b>ε, ι, ρ</b> (pure alpha) it is kept in every case: <b>α</b>\n  - after other consonants (impure alpha) it changes to <b>η</b> in the Gen. and Dat. Sing.<br>\n• If the Nom. Sing. ending is <b>-η</b>, it is kept in every case.<br>\n• In the Dat. Sing. the <b>ι</b> is always written as iota subscript: <b>ᾳ</b> (for words in -α) or <b>ῃ</b> (for words in -η).<br><br>\n\n<b>8. Table of the first-declension endings (feminine)</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>Nom.</td><td>-α, -η</td><td>-αι</td></tr>\n  <tr><td>Gen.</td><td>-ας, -ης</td><td>-ῶν</td></tr>\n  <tr><td>Dat.</td><td>-ᾳ, -ῃ</td><td>-αις</td></tr>\n  <tr><td>Acc.</td><td>-αν, -ην</td><td>-ας</td></tr>\n  <tr><td>Voc.</td><td>-α, -η</td><td>-αι</td></tr>\n</table>\n<i>Important:</i> in the Gen. Pl. the accent is always on the last syllable and is a circumflex: <b>ὡρῶν</b>, <b>δοξῶν</b>, <b>γραφῶν</b>, <b>ζωῶν</b>.<br><br>\n\n<b>9. Further examples</b><br>\n• <b>βασιλεία</b> (kingdom) — pure alpha (after ε, ι, ρ)<br>\n• <b>καρδία</b> (heart) — pure alpha (after ι)<br>\n• <b>ψυχή</b> (soul) — in -η<br>\n• <b>ἐκκλησία</b> (church) — pure alpha<br>\n• <b>εἰρήνη</b> (peace) — in -η<br>\n• <b>ἐντολή</b> (commandment) — in -η",
        "vocabulary": {
            "ἀλήθεια": "truth",
            "ζωή": "life",
            "βασιλεία": "kingdom",
            "ἡμέρα": "day",
            "γραφή": "writing, Scripture",
            "καρδία": "heart",
            "δόξα": "glory",
            "παραβολή": "parable",
            "εἰρήνη": "peace",
            "φωνή": "voice, sound",
            "ἐκκλησία": "church",
            "ψυχή": "soul",
            "ἐντολή": "commandment",
            "ὥρα": "hour"
        }
    },
    "6": {
        "title": "Adjectives and Articles",
        "grammar": "<b>1. Adjectives of the first and second declension</b><br>\nAdjectives of the first and second declension inflect for three genders:<br>\n• <b>masculine</b> — the ending <b>-ος</b> (as in the second declension)<br>\n• <b>feminine</b> — the ending <b>-η</b> or <b>-α</b><br>\n• <b>neuter</b> — the ending <b>-ον</b> (as in the second declension)<br><br>\n<b>Points about the feminine:</b><br>\n• After the letters <b>ε, ι, ρ</b> the feminine uses the ending <b>-α</b> (not -η)<br>\n• Example: δίκαιος → δικαία (righteous, f.)<br>\n• Otherwise — the ending <b>-η</b><br>\n• Example: ἀγαθός → ἀγαθή (good, f.)<br><br>\n\n<b>2. Declension of ἀγαθός, -ή, -όν (good)</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>ἀγαθός</td><td>ἀγαθή</td><td>ἀγαθόν</td></tr>\n  <tr><td>Gen.</td><td>ἀγαθοῦ</td><td>ἀγαθῆς</td><td>ἀγαθοῦ</td></tr>\n  <tr><td>Dat.</td><td>ἀγαθῷ</td><td>ἀγαθῇ</td><td>ἀγαθῷ</td></tr>\n  <tr><td>Acc.</td><td>ἀγαθόν</td><td>ἀγαθήν</td><td>ἀγαθόν</td></tr>\n  <tr><td>Voc.</td><td>ἀγαθέ</td><td>ἀγαθή</td><td>ἀγαθόν</td></tr>\n</table><br>\n<b>Plural:</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>ἀγαθοί</td><td>ἀγαθαί</td><td>ἀγαθά</td></tr>\n  <tr><td>Gen.</td><td>ἀγαθῶν</td><td>ἀγαθῶν</td><td>ἀγαθῶν</td></tr>\n  <tr><td>Dat.</td><td>ἀγαθοῖς</td><td>ἀγαθαῖς</td><td>ἀγαθοῖς</td></tr>\n  <tr><td>Acc.</td><td>ἀγαθούς</td><td>ἀγαθάς</td><td>ἀγαθά</td></tr>\n</table><br>\n<i>Note:</i> in the genitive plural feminine the accent stands on the ending (as with first-declension nouns).<br><br>\n\n<b>3. The definite article (ὁ, ἡ, τό)</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>ὁ</td><td>ἡ</td><td>τό</td></tr>\n  <tr><td>Gen.</td><td>τοῦ</td><td>τῆς</td><td>τοῦ</td></tr>\n  <tr><td>Dat.</td><td>τῷ</td><td>τῇ</td><td>τῷ</td></tr>\n  <tr><td>Acc.</td><td>τόν</td><td>τήν</td><td>τό</td></tr>\n</table><br>\n<b>Plural:</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>οἱ</td><td>αἱ</td><td>τά</td></tr>\n  <tr><td>Gen.</td><td>τῶν</td><td>τῶν</td><td>τῶν</td></tr>\n  <tr><td>Dat.</td><td>τοῖς</td><td>ταῖς</td><td>τοῖς</td></tr>\n  <tr><td>Acc.</td><td>τούς</td><td>τάς</td><td>τά</td></tr>\n</table><br>\n\n<b>4. Use of adjectives: attributive and predicative</b><br>\n• <b>Attributive</b> (the adjective stands before the noun and agrees with it in gender, number and case).<br>\n  Example: <i>ὁ ἀγαθὸς ἄνθρωπος</i> — “a good man” (the adjective with the article).<br>\n• <b>Predicative</b> (the adjective stands after the noun and is part of the predicate).<br>\n  Example: <i>ὁ ἄνθρωπος ἀγαθός</i> — “the man is good” (the adjective without the article).<br><br>\n\n<b>5. Adjectives used as nouns</b><br>\nAdjectives can be used as nouns (with the article).<br>\n• <i>οἱ ἀγαθοί</i> — “the good (people)”<br>\n• <i>τὸ καλόν</i> — “the beautiful (thing)”<br>\n• <i>τὰ κακά</i> — “the bad (things)”<br>\n• <i>οἱ δίκαιοι</i> — “the righteous (people)”<br><br>\n\n<b>6. Further examples of first- and second-declension adjectives</b><br>\n• <b>καλός, -ή, -όν</b> — beautiful, good<br>\n• <b>κακός, -ή, -όν</b> — bad, evil<br>\n• <b>δίκαιος, -α, -ον</b> — righteous, just<br>\n• <b>μικρός, -ά, -όν</b> — small<br>\n• <b>πιστός, -ή, -όν</b> — faithful<br>\n• <b>πρῶτος, -η, -ον</b> — first<br>\n• <b>ἔσχατος, -η, -ον</b> — last<br>\n• <b>νεκρός, -ά, -όν</b> — dead<br>\n• <b>ἄλλος, -η, -ο</b> — other, another<br><br>\n\n<i>All these adjectives inflect after the pattern of ἀγαθός (allowing for the points about the feminine).",
        "vocabulary": {
            "ἀγαθός, ή, όν": "good",
            "ἄλλος, η, ο": "other, another",
            "δίκαιος, α, ον": "righteous, just",
            "ἐγείρω": "I raise, I awaken",
            "ἔρημος": "desert (feminine, second declension)",
            "ἔσχατος, η, ον": "last",
            "κακός, ή, όν": "bad, evil",
            "καλός, ή, όν": "good, beautiful",
            "κύριος": "lord, master; the Lord",
            "μικρός, ά, όν": "small, little",
            "νεκρός, ά, όν": "dead",
            "ὁδός": "road, way (feminine, second declension)",
            "παρθένος": "virgin, young woman (feminine, second declension)",
            "πιστός, ή, όν": "faithful",
            "πρῶτος, η, ον": "first"
        }
    },
    "7": {
        "title": "Prepositions and Nouns of the First Declension (M.)",
        "grammar": "<b>1. Masculine nouns of the first declension</b><br>\nSome masculine nouns have a stem in -α and inflect in the first declension, but their article follows the second declension (ἄνθρωπος). In the nominative singular they may end in <b>-ης</b> (for example προφήτης) or in <b>-ας</b> (for example νεανίας).<br><br>\n\n<b>2. Declension of προφήτης (prophet) — the -ης type</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n  <tr><td>Nom.</td><td>προφήτης</td><td>προφῆται</td><td>prophet</td><td>prophets</td></tr>\n  <tr><td>Gen.</td><td>προφήτου</td><td>προφητῶν</td><td>of a prophet</td><td>of prophets</td></tr>\n  <tr><td>Dat.</td><td>προφήτῃ</td><td>προφήταις</td><td>to a prophet</td><td>to prophets</td></tr>\n  <tr><td>Acc.</td><td>προφήτην</td><td>προφήτας</td><td>of a prophet</td><td>of prophets</td></tr>\n  <tr><td>Voc.</td><td>προφῆτα</td><td>προφῆται</td><td>O prophet!</td><td>O prophets!</td></tr>\n</table><br>\n\n<b>3. Declension of νεανίας (young man) — the -ας type</b><br>\n<table>\n  <tr><th>Case</th><th>Sg.</th><th>Pl.</th><th>Meaning, sg.</th><th>Meaning, pl.</th></tr>\n  <tr><td>Nom.</td><td>νεανίας</td><td>νεανίαι</td><td>young man</td><td>young men</td></tr>\n  <tr><td>Gen.</td><td>νεανίου</td><td>νεανιῶν</td><td>young men</td><td>of young men</td></tr>\n  <tr><td>Dat.</td><td>νεανίᾳ</td><td>νεανίαις</td><td>to a young man</td><td>to young men</td></tr>\n  <tr><td>Acc.</td><td>νεανίαν</td><td>νεανίας</td><td>a young man (Acc.)</td><td>of young men</td></tr>\n  <tr><td>Voc.</td><td>νεανία</td><td>νεανίαι</td><td>O young man!</td><td>O young men!</td></tr>\n</table><br>\n<i>Points to note:</i> in the genitive singular the ending is <b>-ου</b> (as in the second declension), and in the vocative — <b>-α</b>.<br><br>\n\n<b>4. Prepositions and their use (the main ones of this lesson)</b><br>\n<table>\n  <tr><th>Preposition</th><th>Case</th><th>Meaning</th><th>Example</th></tr>\n  <tr><td>ἀπό</td><td>+ Gen.</td><td>from</td><td>ἀπὸ τοῦ οἴκου — from the house</td></tr>\n  <tr><td>διά</td><td>+ Gen.</td><td>through</td><td>διὰ τῆς ἐρήμου — through the desert</td></tr>\n  <tr><td>διά</td><td>+ Acc.</td><td>on account of</td><td>διὰ τὴν ἀλήθειαν — on account of the truth</td></tr>\n  <tr><td>εἰς</td><td>+ Acc.</td><td>into</td><td>εἰς τὸν οἶκον — into the house</td></tr>\n  <tr><td>ἐκ</td><td>+ Gen.</td><td>out of</td><td>ἐκ τοῦ οἴκου — out of the house</td></tr>\n  <tr><td>ἐν</td><td>+ Dat.</td><td>in</td><td>ἐν τῷ οἴκῳ — in the house</td></tr>\n  <tr><td>μετά</td><td>+ Gen.</td><td>with</td><td>μετὰ τῶν μαθητῶν — with the disciples</td></tr>\n  <tr><td>μετά</td><td>+ Acc.</td><td>after</td><td>μετὰ τὸν κύριον — after the Lord</td></tr>\n  <tr><td>πρός</td><td>+ Acc.</td><td>to</td><td>πρὸς τὸν θεόν — to God</td></tr>\n</table><br>\n<i>Important:</i> before vowels the preposition <b>ἐκ</b> takes the form <b>ἐξ</b> (for example ἐξ οἴκου — out of the house).<br><br>\n\n<b>5. Points about accent</b><br>\n• In words like προφήτης and νεανίας the accent moves to the ending in the Gen. Pl. (περισπώμενον): προφητῶν, νεανιῶν.<br>\n• In the Dat. Pl. the accent falls on the third syllable from the end: προφήταις, νεανίαις.",
        "vocabulary": {
            "ἄγγελος": "angel, messenger",
            "ἄγω": "I lead",
            "ἀπό": "from (with Gen.)",
            "βάλλω": "I throw",
            "βαπτιστής": "baptist",
            "διά": "through (with Gen.); on account of, for the sake of (with Acc.)",
            "θεός": "God",
            "κόσμος": "world, universe",
            "λίθος": "stone",
            "μαθητής": "disciple",
            "μένω": "I remain, abide",
            "μετά": "with (with Gen.); after (with Acc.)",
            "νεανίας": "young man",
            "οὐρανός": "heaven, sky",
            "πέμπω": "I send",
            "πρός": "to, toward (with Acc.)",
            "προφήτης": "prophet",
            "τέκνον": "child",
            "φέρω": "I carry, bring"
        }
    },
    "8": {
        "title": "Enclitics, Proclitics, Pronouns",
        "grammar": "<b>1. Enclitics and proclitics</b><br>\n<b>Enclitics</b> — words of one or two syllables that lose their accent and lean on the preceding word. In Greek the enclitics include: μου, μοι, με; σου, σοι, σε; ἐστί(ν), εἰσί(ν); τις, τι; που, ποτε and others.<br><br>\n<b>Proclitics</b> — unaccented words that form a unit with the following word. The proclitics include: ὁ, ἡ, οἱ, αἱ; εἰς, ἐκ, ἐν; οὐ (οὐκ, οὐχ); ὡς; εἰ.<br><br>\n<b>Accent rules for enclitics:</b><br>\n1. The word before an enclitic does NOT change an acute accent into a grave: ἀδελφός μου (not ἀδελφὸς μου).<br>\n2. If a word has the acute on the third syllable from the end, or a circumflex on the penult, it receives an additional acute on the last syllable: ἄνθρωπός τις, δῶρόν σου.<br>\n3. If a proclitic or an enclitic stands before the enclitic, it receives the acute accent: ἄνθρωπός μου ἐστίν.<br>\n4. A two-syllable enclitic keeps its accent after a word with the acute on the second syllable: λόγος ἐστίν.<br>\n5. An enclitic keeps its accent if it bears the logical stress or begins the sentence.<br><br>\n\n<b>2. The verb εἰμί (to be) — the present tense</b><br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>εἰμί</td><td>ἐσμέν</td><td>I am / we are</td></tr>\n  <tr><td>2nd</td><td>εἶ</td><td>ἐστέ</td><td>you are / you are</td></tr>\n  <tr><td>3rd</td><td>ἐστί(ν)</td><td>εἰσί(ν)</td><td>he is / they are</td></tr>\n</table><br>\n\n<b>3. Personal pronouns</b><br>\n<b>Singular:</b><br>\n<table>\n  <tr><th>Case</th><th>1st</th><th>2nd</th><th>3rd m.</th><th>3rd f.</th><th>3rd n.</th><th>Meaning</th></tr>\n  <tr><td>Nom.</td><td>ἐγώ</td><td>σύ</td><td>αὐτός</td><td>αὐτή</td><td>αὐτό</td><td>I / you / he himself</td></tr>\n  <tr><td>Gen.</td><td>μου</td><td>σου</td><td>αὐτοῦ</td><td>αὐτῆς</td><td>αὐτοῦ</td><td>me / you / him</td></tr>\n  <tr><td>Dat.</td><td>μοι</td><td>σοι</td><td>αὐτῷ</td><td>αὐτῇ</td><td>αὐτῷ</td><td>to me / to you / to him</td></tr>\n  <tr><td>Acc.</td><td>με</td><td>σε</td><td>αὐτόν</td><td>αὐτήν</td><td>αὐτό</td><td>me / you / him</td></tr>\n</table><br>\n<b>Plural:</b><br>\n<table>\n  <tr><th>Case</th><th>1st</th><th>2nd</th><th>3rd m.</th><th>3rd f.</th><th>3rd n.</th><th>Meaning</th></tr>\n  <tr><td>Nom.</td><td>ἡμεῖς</td><td>ὑμεῖς</td><td>αὐτοί</td><td>αὐταί</td><td>αὐτά</td><td>we / you / they</td></tr>\n  <tr><td>Gen.</td><td>ἡμῶν</td><td>ὑμῶν</td><td>αὐτῶν</td><td>αὐτῶν</td><td>αὐτῶν</td><td>us / you / them</td></tr>\n  <tr><td>Dat.</td><td>ἡμῖν</td><td>ὑμῖν</td><td>αὐτοῖς</td><td>αὐταῖς</td><td>αὐτοῖς</td><td>to us / to you / to them</td></tr>\n  <tr><td>Acc.</td><td>ἡμᾶς</td><td>ὑμᾶς</td><td>αὐτούς</td><td>αὐτάς</td><td>αὐτά</td><td>us / you / them</td></tr>\n</table><br>\n\n<b>4. The definite article (ὁ, ἡ, τό)</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th><th>Meaning</th></tr>\n  <tr><td>Nom.</td><td>ὁ</td><td>ἡ</td><td>τό</td><td>m./f./n.</td></tr>\n  <tr><td>Gen.</td><td>τοῦ</td><td>τῆς</td><td>τοῦ</td><td>of whom? of what?</td></tr>\n  <tr><td>Dat.</td><td>τῷ</td><td>τῇ</td><td>τῷ</td><td>to whom? to what?</td></tr>\n  <tr><td>Acc.</td><td>τόν</td><td>τήν</td><td>τό</td><td>whom? what?</td></tr>\n</table><br>\n<b>Plural:</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th><th>Meaning</th></tr>\n  <tr><td>Nom.</td><td>οἱ</td><td>αἱ</td><td>τά</td><td>m./f./n.</td></tr>\n  <tr><td>Gen.</td><td>τῶν</td><td>τῶν</td><td>τῶν</td><td>of whom? of what?</td></tr>\n  <tr><td>Dat.</td><td>τοῖς</td><td>ταῖς</td><td>τοῖς</td><td>to whom? to what?</td></tr>\n  <tr><td>Acc.</td><td>τούς</td><td>τάς</td><td>τά</td><td>whom? what?</td></tr>\n</table><br>\n\n<b>5. Three rules for pronouns with the article</b><br>\n<br>\n<b>Rule 1: the article before the pronoun (attributive position)</b><br>\nWhen the article stands BEFORE the pronoun, the pronoun acts as an adjective (an attribute).<br>\nFor example: <i>ὁ ἐμός</i> — “my” (in the sense “my [man/thing]”).<br>\nThis means the pronoun agrees with the article in gender, number and case.<br><br>\n\n<b>Rule 2: the article after the pronoun (predicative position)</b><br>\nWhen the article stands AFTER the pronoun, the pronoun acts as the predicate.<br>\nFor example: <i>ἐμός ὁ</i> — “this is mine” (in the sense “mine — the one that”).<br>\nThis is less common and usually occurs with possessive pronouns.<br><br>\n\n<b>Rule 3: the article at the beginning and at the end (the pronoun used as a noun)</b><br>\nWhen the pronoun stands between two articles: <i>ὁ ἐμός ὁ</i> — “the one that is mine”, or “my own”.<br>\nFor example: <i>ὁ ἐμός ὁ</i> — “the one that is mine” (emphatic).<br>\nThis construction is used for emphasis or contrast.<br><br>\n\n<b>Note:</b> In the oblique cases the pronoun <b>αὐτός</b> is used as a personal pronoun (he, she, it), and in the nominative as “himself”. With the article it means “the same” (ὁ αὐτός — the same one).",
        "vocabulary": {
            "εἰμί": "I am",
            "ἐγώ": "I",
            "σύ": "you (sg.)",
            "αὐτός, ή, ό": "himself; in the oblique cases he, she, it",
            "ἡμεῖς": "we",
            "ὑμεῖς": "you (pl.)",
            "δέ": "but, and, on the other hand",
            "δεσπότης": "master, lord",
            "κριτής": "judge",
            "τελώνης": "tax collector"
        }
    },
    "9": {
        "title": "Demonstrative Pronouns",
        "grammar": "<b>1. The demonstrative pronouns οὗτος, αὕτη, τοῦτο (this)</b><br>\nIt points to a <b>nearby</b> object (in space or in speech).<br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>οὗτος</td><td>αὕτη</td><td>τοῦτο</td></tr>\n  <tr><td>Gen.</td><td>τούτου</td><td>ταύτης</td><td>τούτου</td></tr>\n  <tr><td>Dat.</td><td>τούτῳ</td><td>ταύτῃ</td><td>τούτῳ</td></tr>\n  <tr><td>Acc.</td><td>τοῦτον</td><td>ταύτην</td><td>τοῦτο</td></tr>\n</table><br>\n<b>Plural:</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>οὗτοι</td><td>αὗται</td><td>ταῦτα</td></tr>\n  <tr><td>Gen.</td><td>τούτων</td><td>τούτων</td><td>τούτων</td></tr>\n  <tr><td>Dat.</td><td>τούτοις</td><td>ταύταις</td><td>τούτοις</td></tr>\n  <tr><td>Acc.</td><td>τούτους</td><td>ταύτας</td><td>ταῦτα</td></tr>\n</table>\n<i>Example:</i> οὗτος ὁ ἄνθρωπος — “this man”<br><br>\n\n<b>2. The demonstrative pronouns ἐκεῖνος, ἐκείνη, ἐκεῖνο (that)</b><br>\nIt points to a <b>distant</b> object (in space or in speech).<br>\nThey inflect like <b>αὐτός</b> (in the first and second declension).<br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>ἐκεῖνος</td><td>ἐκείνη</td><td>ἐκεῖνο</td></tr>\n  <tr><td>Gen.</td><td>ἐκείνου</td><td>ἐκείνης</td><td>ἐκείνου</td></tr>\n  <tr><td>Dat.</td><td>ἐκείνῳ</td><td>ἐκείνῃ</td><td>ἐκείνῳ</td></tr>\n  <tr><td>Acc.</td><td>ἐκεῖνον</td><td>ἐκείνην</td><td>ἐκεῖνο</td></tr>\n</table><br>\n<b>Plural of ἐκεῖνος:</b><br>\n<table>\n  <tr><th>Case</th><th>M.</th><th>F.</th><th>N.</th></tr>\n  <tr><td>Nom.</td><td>ἐκεῖνοι</td><td>ἐκεῖναι</td><td>ἐκεῖνα</td></tr>\n  <tr><td>Gen.</td><td>ἐκείνων</td><td>ἐκείνων</td><td>ἐκείνων</td></tr>\n  <tr><td>Dat.</td><td>ἐκείνοις</td><td>ἐκείναις</td><td>ἐκείνοις</td></tr>\n  <tr><td>Acc.</td><td>ἐκείνους</td><td>ἐκείνας</td><td>ἐκεῖνα</td></tr>\n</table>\n<i>Example:</i> ἐκεῖνος ὁ ἄνθρωπος — “that man”<br><br>\n\n<b>3. The uses of αὐτός</b><br>\nIts meaning depends on its position and case:<br>\n<table>\n  <tr><th>Form</th><th>Meaning</th><th>Example</th></tr>\n  <tr><td>αὐτός (Nom.)</td><td><b>himself</b></td><td>αὐτὸς ὁ ἀπόστολος — “the apostle himself”</td></tr>\n  <tr><td>ὁ αὐτός (with the article)</td><td><b>the same</b></td><td>ὁ αὐτὸς ἀπόστολος — “the same apostle”</td></tr>\n  <tr><td>αὐτός (in the oblique cases)</td><td><b>he, she, it</b> (personal pronoun)</td><td>λέγω αὐτῷ — “I say to him”</td></tr>\n</table><br>\n<i>Important:</i> in the nominative — “himself”; with the article — “the same”; in the oblique cases — “he/she/it”.<br><br>\n\n<b>4. Points about the use of demonstratives</b><br>\n• They may stand both <b>before</b> and <b>after</b> the noun:<br>\n  <i>οὗτος ὁ ἀπόστολος</i> = <i>ὁ ἀπόστολος οὗτος</i> — “this apostle”<br>\n• When they are used as nouns they take the neuter forms:<br>\n  <i>ταῦτα</i> — “this” (things/deeds)<br>\n  <i>ἐκεῖνα</i> — “that” (things/deeds)<br>\n• Demonstratives are often used to link sentences in a text.",
        "vocabulary": {
            "ἀγάπη": "love",
            "ἁμαρτία": "sin",
            "βαπτίζω": "I baptize",
            "διδάσκαλος": "teacher",
            "ἐκεῖνος, ἐκείνη, ἐκεῖνο": "that (m., f., n.)",
            "ἐπαγγελία": "promise",
            "εὐαγγέλιον": "gospel, good news",
            "κρίνω": "I judge",
            "νῦν": "now",
            "οὗτος, αὕτη, τοῦτο": "this (m., f., n.)",
            "οὕτως": "thus, in this way",
            "πονηρός, ά, όν": "evil, bad, wicked",
            "πρόσωπον": "face",
            "χαρά": "joy"
        }
    },
    "10": {
        "title": "The Middle and Passive Voice",
        "grammar": "<b>Conjugation of λύομαι (I untie myself / I am untied):</b><br>\n        <table><tr><th>Person</th><th>Sg.</th><th>Pl.</th></tr>\n        <tr><td>1st</td><td>λύομαι</td><td>λυόμεθα</td></tr>\n        <tr><td>2nd</td><td>λύῃ</td><td>λύεσθε</td></tr>\n        <tr><td>3rd</td><td>λύεται</td><td>λύονται</td></tr></table><br>\n        <b>Deponent verbs:</b> have middle-passive forms with an active meaning (ἔρχομαι — I come).",
        "vocabulary": {
            "ἀκούω + Gen.": "I hear (someone, something)",
            "ἁμαρτωλός": "sinner",
            "ἀπέρχομαι (dep.)": "I go away, depart",
            "ἀποκρίνομαι (dep.)": "I answer",
            "ἄρχομαι": "I begin",
            "ἄρχω + Gen.": "I rule (over)",
            "γίνομαι (dep.) + Nom.": "I become, come to be",
            "διέρχομαι (dep.)": "I pass through",
            "διώκω": "I pursue, persecute",
            "εἰσέρχομαι (dep.)": "I enter",
            "ἐξέρχομαι (dep.)": "I go out",
            "ἔρχομαι (dep.)": "I come",
            "λῃστής": "robber",
            "ὅτι": "that, because",
            "πορεύομαι (dep.)": "I go, travel",
            "σώζω": "I save",
            "ὑπό": "by (with Gen., in the passive); under (with Acc.)"
        }
    },
    "11": {
        "title": "The Imperfect of the Active Voice",
        "grammar": "<b>1. Primary and historical tenses</b><br>\nThe tenses of the Greek verb are divided into primary and historical. The primary tenses are the present, the future and the perfect; the historical ones are the three past tenses: the <b>imperfect</b>, the aorist and the pluperfect. The historical tenses are marked by special (secondary) personal endings and by an augment.<br><br>\n<b>2. Imperfectum Indicativi Activi</b><br>\nThe imperfect is the past tense of imperfective aspect. The conjugation of the verb <b>λύω</b> (I untie):<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Meaning</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>ἔλυον</td><td>I was untying</td><td>ἐλύομεν</td><td>we were untying</td></tr>\n  <tr><td>2nd</td><td>ἔλυες</td><td>you were untying</td><td>ἐλύετε</td><td>you were untying</td></tr>\n  <tr><td>3rd</td><td>ἔλυεν</td><td>he was untying</td><td>ἔλυον</td><td>they were untying</td></tr>\n</table><br>\nTo the stem <b>λυ-</b> the augment is added at the beginning, <b>ἐ-</b>, then comes the connecting vowel <b>ο</b> or <b>ε</b> and the secondary personal endings:<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>1st</td><td>-ν</td><td>-μεν</td></tr>\n  <tr><td>2nd</td><td>-ς</td><td>-τε</td></tr>\n  <tr><td>3rd</td><td>-(ν)</td><td>-ν</td></tr>\n</table><br>\nThe augment draws the accent to itself: the accent moves back from the end as far as the general rules allow, but never stands before the augment.<br><br>\n<b>3. The augment: syllabic and temporal</b><br>\n• <b>Syllabic</b> — in verbs beginning with a consonant: ἐ- (λύω → ἔλυον).<br>\n• <b>Temporal</b> — in verbs beginning with a vowel: the initial vowel is lengthened and a rough breathing is kept.<br>\n<table>\n  <tr><th>Short</th><th>Long</th><th>Short</th><th>Long</th></tr>\n  <tr><td>α</td><td>η</td><td>ι</td><td>ῑ</td></tr>\n  <tr><td>ε</td><td>η</td><td>υ</td><td>ῡ</td></tr>\n  <tr><td>ο</td><td>ω</td><td>αι</td><td>ῃ</td></tr>\n  <tr><td>ει</td><td>ῃ</td><td>οι</td><td>ῳ</td></tr>\n</table><br>\nIf a word begins with a diphthong that contains iota, the iota becomes a subscript: αἴρω → ᾖρον.<br><br>\n<b>4. Examples of the augment</b><br>\n<table>\n  <tr><th>Present</th><th>Imperfect</th><th>Meaning</th></tr>\n  <tr><td>ἐγείρω</td><td>ἤγειρον</td><td>I raise — I was raising</td></tr>\n  <tr><td>ἀκούω</td><td>ἤκουον</td><td>I hear — I was hearing</td></tr>\n  <tr><td>ἄγω</td><td>ἦγον</td><td>I lead — I was leading</td></tr>\n  <tr><td>αἴρω</td><td>ᾖρον</td><td>I lift up — I was lifting up</td></tr>\n</table><br>\n<b>5. The augment in verbs with a prefix</b><br>\nThe augment stands between the prefix and the stem. If the prefix ends in a vowel, that vowel is dropped before the augment and before an initial vowel of the stem — except with the prefixes <b>προ-</b> and <b>περι-</b>:<br>\n<table>\n  <tr><th>Present</th><th>Imperfect</th><th>Meaning</th></tr>\n  <tr><td>ἐκβάλλω</td><td>ἐξέβαλλον</td><td>I throw out — I was throwing out</td></tr>\n  <tr><td>ἀποκτείνω</td><td>ἀπέκτεινον</td><td>I kill — I was killing</td></tr>\n  <tr><td>ἀπάγω</td><td>ἀπῆγον</td><td>I lead away — I was leading away</td></tr>\n  <tr><td>προάγω</td><td>προῆγον</td><td>I lead forward — I was leading forward</td></tr>\n  <tr><td>περιάγω</td><td>περιῆγον</td><td>I lead around — I was leading around</td></tr>\n</table><br>\n<i>The accent cannot stand before the augment.</i><br><br>\n<b>6. The imperfect of the verb εἰμί</b><br>\nThis verb forms its imperfect in a special way:<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Meaning</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>ἤμην</td><td>I was</td><td>ἦμεν</td><td>we were</td></tr>\n  <tr><td>2nd</td><td>ἦς</td><td>you were</td><td>ἦτε</td><td>you were</td></tr>\n  <tr><td>3rd</td><td>ἦν</td><td>he was</td><td>ἦσαν</td><td>they were</td></tr>\n</table>",
        "vocabulary": {
            "ἀποκτείνω": "I kill",
            "ἀποστέλλω": "I send (someone) on a commission",
            "ἄρτος": "bread",
            "βαίνω": "I go, step",
            "ἐσθίω": "I eat",
            "κατά": "against (with Gen.); according to (with Acc.)",
            "καταβαίνω": "I go down, descend",
            "μέν": "in the pair men… de — “on the one hand… on the other”; usually only the second is translated — “but, and”",
            "οὐκέτι": "no longer",
            "παρά": "from (with Gen., of persons); beside, at (with Dat.); before, contrary to (with Acc.)",
            "παραλαμβάνω": "I receive, take along",
            "σύν": "with (with Dat.)",
            "συνάγω": "I gather",
            "τότε": "then",
            "αἴρω": "I lift up, take away",
            "ἀναβαίνω": "I go up, ascend",
            "ἀποθνήσκω": "I die",
            "ἐξ": "out of, from (the form of ek before a vowel)"
        }
    },
    "12": {
        "title": "The Imperfect of the Middle and Passive Voice",
        "grammar": "<b>1. Imperfectum Indicativi Medii-Passivi</b><br>\nAs in the present, the middle and passive voices have the same form in the imperfect. It is formed like the active one: the augment, the connecting vowel and the secondary middle-passive personal endings are attached to the stem.<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Pl.</th></tr>\n  <tr><td>1st</td><td>-μην</td><td>-μεθα</td></tr>\n  <tr><td>2nd</td><td>-σο (-ε-σο → -ου)</td><td>-σθε</td></tr>\n  <tr><td>3rd</td><td>-το</td><td>-ντο</td></tr>\n</table><br>\nThe conjugation of the verb <b>λύω</b> (I untie) in the middle-passive imperfect:<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Meaning</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>ἐλυόμην</td><td>I was untying myself</td><td>ἐλυόμεθα</td><td>we were untying ourselves</td></tr>\n  <tr><td>2nd</td><td>ἐλύου</td><td>you were untying yourself</td><td>ἐλύεσθε</td><td>you were untying yourselves</td></tr>\n  <tr><td>3rd</td><td>ἐλύετο</td><td>he was untying himself</td><td>ἐλύοντο</td><td>they were untying themselves</td></tr>\n</table><br>\nIn the passive sense the same forms are translated differently: ἐλυόμην — “I was being untied”, ἐλύου — “you were being untied”, and so on. Deponent verbs also have a middle-passive form in the imperfect: ἔρχομαι (I come) — ἠρχόμην (I was coming).<br><br>\n<b>2. A neuter plural subject</b><br>\nWith a neuter plural subject the predicate usually stands in the singular:<br>\n• τὰ δαιμόνια ἐξέρχεται — the demons come out<br>\n• ταῦτά ἐστι τὰ καλὰ δῶρα — these are good gifts<br>\nLess often the predicate stands in the plural too: τὰ τέκνα σώζονται — the children are saved.<br><br>\n<b>3. The conjunctions καί and οὐδέ</b><br>\n• <b>καί</b> — “and”, also “also, even”; in the sense “even” it stands before the word it refers to: γινώσκουσι καὶ τὰ τέκνα τὸν νόμον — even the children know the law.<br>\n• <b>οὐδέ</b> — “and not, not even, nor”: τὴν δόξαν τοῦ θεοῦ βλέπουσιν οὐδὲ οἱ μαθηταί — not even the disciples see the glory of God.<br>\n• <b>καὶ... καί</b> — “both… and, as… so”; <b>οὐδὲ... οὐδέ</b> — “neither… nor”.<br>\nA Greek sentence can contain only one negation — a single negative particle or conjunction for the whole clause, unlike Russian.",
        "vocabulary": {
            "οὐδέ": "and not, not even; in the pair oude… oude — neither… nor",
            "οὔπω": "not yet",
            "περί": "about, concerning (with Gen.); around (with Acc.)",
            "πλοῖον": "boat, ship",
            "συνέρχομαι (dep.)": "I come together (with someone)",
            "ὑπέρ": "for, on behalf of (with Gen.); above, over (with Acc.)",
            "ἀπέρχομαι (dep.)": "I go away",
            "βιβλίον": "book",
            "δαιμόνιον": "demon, evil spirit, deity",
            "δέχομαι (dep.)": "I receive",
            "ἐκπορεύομαι (dep.)": "I go out",
            "ἔργον": "work, deed",
            "ἔτι": "still, yet",
            "θάλασσα": "sea",
            "καί": "and, also, even; in the pair kai… kai — both… and, as… so",
            "κατέρχομαι (dep.)": "I go down, descend"
        }
    },
    "13": {
        "title": "The Future of the Active and Middle Voice",
        "grammar": "<b>1. Futurum indicativi activi et medii</b><br>\nThe future answers both to the Russian imperfective and to the perfective future. It differs from the present in having its own stem: in regular verbs the future stem is formed by adding the suffix <b>-σ-</b> to the verb stem; then come the connecting vowels and the primary personal endings.<br>\nThe conjugation of the verb <b>λύω</b> (I set free):<br>\n<table>\n  <tr><th>Person</th><th>Futurum Activi</th><th>Meaning</th><th>Futurum Medii</th><th>Meaning</th></tr>\n  <tr><td>1st sg.</td><td>λύσω</td><td>I shall set free (act.)</td><td>λύσομαι</td><td>I shall set myself free (mid.)</td></tr>\n  <tr><td>2nd sg.</td><td>λύσεις</td><td>you will set free (act.)</td><td>λύσῃ</td><td>you will set yourself free (mid.)</td></tr>\n  <tr><td>3rd sg.</td><td>λύσει</td><td>he will set free (act.)</td><td>λύσεται</td><td>he will set himself free (mid.)</td></tr>\n  <tr><td>1st pl.</td><td>λύσομεν</td><td>we shall set free (act.)</td><td>λυσόμεθα</td><td>we shall set ourselves free (mid.)</td></tr>\n  <tr><td>2nd pl.</td><td>λύσετε</td><td>you will set free (act.)</td><td>λύσεσθε</td><td>you will set yourselves free (mid.)</td></tr>\n  <tr><td>3rd pl.</td><td>λύσουσι(ν)</td><td>they will set free (act.)</td><td>λύσονται</td><td>they will set themselves free (mid.)</td></tr>\n</table><br>\n<b>2. A consonantal stem before the suffix -σ-</b><br>\n• a stem in a labial <b>β, π, φ</b> → a future in <b>ψ</b>: πέμπω → πέμψω, γράφω → γράψω<br>\n• a stem in a velar <b>γ, κ, χ</b> → a future in <b>ξ</b>: ἄγω → ἄξω, ἄρχω → ἄρξω. The same holds for verbs with -σσ- in the present: κηρύσσω (from κηρυκ-ιω) → κηρύξω<br>\n• a stem in a dental <b>τ, δ, θ</b> or in <b>ζ</b> — these sounds are dropped before -σ-: πείθω → πείσω, βαπτίζω → βαπτίσω<br><br>\n<b>3. Verbs deponent in the future</b><br>\nSome verbs have deponent forms only in the future: βαίνω has only a middle future with an active meaning — βήσομαι. A number of verbs form the future irregularly, and its first person must be learnt by heart: ἔρχομαι — ἐλεύσομαι, ἔχω — ἕξω, λαμβάνω — λήμψομαι.",
        "vocabulary": {
            "διώξω (Fut. от διώκω)": "I shall pursue, persecute",
            "δοξάζω": "I glorify (Fut. δοξάσω)",
            "ἐλεύσομαι (dep. Fut. от ἔρχομαι)": "I shall come, go",
            "ἕξω (Fut. от ἔχω)": "I shall have",
            "κηρύσσω": "I proclaim, preach (Fut. κηρύξω)",
            "λήμψομαι (dep. Fut. от λαμβάνω)": "I shall take, receive",
            "προσεύχομαι (dep. Fut. προσεύξομαι)": "I pray",
            "τυφλός, ή, όν": "blind",
            "ἀναβλέπω": "I look up, regain sight (Fut. ἀναβλέψω)",
            "βήσομαι (dep. Fut. от βαίνω)": "I shall go, walk",
            "γενήσομαι (dep. Fut. от γίνομαι)": "I shall become (something)",
            "γνώσομαι (dep. Fut. от γινώσκω)": "I shall know",
            "διδάξω (Fut. от διδάσκω)": "I shall teach"
        },
        "headwords": {
            "διώξω (Fut. от διώκω)": "διώξω (fut. of διώκω)",
            "ἐλεύσομαι (dep. Fut. от ἔρχομαι)": "ἐλεύσομαι (dep. fut. of ἔρχομαι)",
            "ἕξω (Fut. от ἔχω)": "ἕξω (fut. of ἔχω)",
            "λήμψομαι (dep. Fut. от λαμβάνω)": "λήμψομαι (dep. fut. of λαμβάνω)",
            "βήσομαι (dep. Fut. от βαίνω)": "βήσομαι (dep. fut. of βαίνω)",
            "γενήσομαι (dep. Fut. от γίνομαι)": "γενήσομαι (dep. fut. of γίνομαι)",
            "γνώσομαι (dep. Fut. от γινώσκω)": "γνώσομαι (dep. fut. of γινώσκω)",
            "διδάξω (Fut. от διδάσκω)": "διδάξω (fut. of διδάσκω)"
        }
    },
    "14": {
        "title": "The First Aorist of the Active and Middle Voice",
        "grammar": "<b>1. Aoristus I indicativi activi et medii</b><br>\nThe aorist is a historical tense. It expresses a completed, finished action and is translated by the Russian perfective past: the imperfect ἔλυον — “I was untying”, the aorist ἔλυσα — “I untied”.<br>\nThe first (weak) aorist is formed on this pattern: <b>augment + stem + σα + historical ending</b>. Its distinctive mark is the suffix <b>-σα-</b>, which changes to <b>-σε-</b>.<br>\n<table>\n  <tr><th>Person</th><th>Aoristus Activi</th><th>Meaning</th><th>Aoristus Medii</th><th>Meaning</th></tr>\n  <tr><td>1st sg.</td><td>ἔλυσα</td><td>I untied</td><td>ἐλυσάμην</td><td>I untied myself</td></tr>\n  <tr><td>2nd sg.</td><td>ἔλυσας</td><td>you untied</td><td>ἐλύσω</td><td>you untied yourself</td></tr>\n  <tr><td>3rd sg.</td><td>ἔλυσε(ν)</td><td>he untied</td><td>ἐλύσατο</td><td>he untied himself</td></tr>\n  <tr><td>1st pl.</td><td>ἐλύσαμεν</td><td>we untied</td><td>ἐλυσάμεθα</td><td>we untied ourselves</td></tr>\n  <tr><td>2nd pl.</td><td>ἐλύσατε</td><td>you untied</td><td>ἐλύσασθε</td><td>you untied yourselves</td></tr>\n  <tr><td>3rd pl.</td><td>ἔλυσαν</td><td>they untied</td><td>ἐλύσαντο</td><td>they untied themselves</td></tr>\n</table><br>\nIn the first person singular of the active aorist the ending has no ν, and in the second person singular of the middle aorist the original -α-σο has contracted to -ω.<br><br>\n<b>2. A consonantal stem before -σα-</b><br>\nThe changes are the same as in the future:<br>\n• <b>β, π, φ + σα = ψα</b>: πέμπω → ἔπεμψα<br>\n• <b>γ, κ, χ, σσ + σα = ξα</b>: δέχομαι → ἐδεξάμην, κηρύσσω → ἐκήρυξα<br>\n• <b>δ, τ, θ, ζ + σα = σα</b>: πείθω → ἔπεισα, σῴζω → ἔσωσα",
        "vocabulary": {
            "ἀναβλέπω": "I regain sight (Fut. ἀναβλέψω, Aor. ἀνέβλεψα)",
            "ἀπολύω": "I set free, release (Fut. ἀπολύσω, Aor. ἀπέλυσα)",
            "ἐπιστρέφω": "I turn, return, turn back (Fut. ἐπιστρέψω, Aor. ἐπέστρεψα)",
            "ἑτοιμάζω": "I prepare, make ready (Fut. ἑτοιμάσω, Aor. ἡτοίμασα)",
            "ἤδη": "already",
            "θαυμάζω": "I marvel, wonder, am amazed (Fut. θαυμάσω, Aor. ἐθαύμασα)",
            "θεραπεύω": "I heal, cure (Fut. θεραπεύσω, Aor. ἐθεράπευσα)",
            "κηρύσσω": "I preach (Fut. κηρύξω, Aor. ἐκήρυξα)",
            "πείθω": "I persuade (Fut. πείσω, Aor. ἔπεισα)",
            "πιστεύω": "I believe (in someone — εἰς + Acc.) (Fut. πιστεύσω, Aor. ἐπίστευσα)",
            "ὑποστρέφω": "I return, go back (Fut. ὑποστρέψω, Aor. ὑπέστρεψα)"
        }
    },
    "15": {
        "title": "The Second Aorist of the Active and Middle Voice",
        "grammar": "<b>1. Aoristus II indicativi activi et medii</b><br>\nThe second (strong) aorist is formed by few verbs, but by ones that occur often. The pattern: <b>augment + pure verb stem + secondary personal endings</b>.<br>\nFor example, λαμβάνω has the present stem λαμβαν-, but the pure verb stem λαβ-, so the first person of the second aorist is ἔλαβον. The pure stem has to be memorised for each such verb.<br>\nThe conjugation of the verb <b>λείπω</b> (I leave, abandon; stem λιπ-) in the second aorist:<br>\n<table>\n  <tr><th>Person</th><th>Aoristus II Activi</th><th>Meaning</th><th>Aoristus II Medii</th><th>Meaning</th></tr>\n  <tr><td>1st sg.</td><td>ἔλιπον</td><td>I left</td><td>ἐλιπόμην</td><td>I left (for myself)</td></tr>\n  <tr><td>2nd sg.</td><td>ἔλιπες</td><td>you left</td><td>ἐλίπου</td><td>you left</td></tr>\n  <tr><td>3rd sg.</td><td>ἔλιπε(ν)</td><td>he left</td><td>ἐλίπετο</td><td>he left</td></tr>\n  <tr><td>1st pl.</td><td>ἐλίπομεν</td><td>we left</td><td>ἐλιπόμεθα</td><td>we left</td></tr>\n  <tr><td>2nd pl.</td><td>ἐλίπετε</td><td>you left</td><td>ἐλίπεσθε</td><td>you left</td></tr>\n  <tr><td>3rd pl.</td><td>ἔλιπον</td><td>they left</td><td>ἐλίποντο</td><td>they left</td></tr>\n</table><br>\n<b>2. The suppletive aorist</b><br>\nSome verbs form the aorist from the stem of another verb; their future is usually suppletive as well. The most common:<br>\n<table>\n  <tr><th>Praesens</th><th>Futurum</th><th>Aoristus</th></tr>\n  <tr><td>ὁράω (I see)</td><td>ὄψομαι</td><td>εἶδον</td></tr>\n  <tr><td>ἔρχομαι (I come)</td><td>ἐλεύσομαι</td><td>ἦλθον</td></tr>\n  <tr><td>ἔχω (I have)</td><td>ἕξω</td><td>ἔσχον</td></tr>\n  <tr><td>λέγω (I say)</td><td>ἐρῶ</td><td>εἶπον</td></tr>\n  <tr><td>φέρω (I carry)</td><td>οἴσω</td><td>ἤνεγκον</td></tr>\n</table><br>\nThe first person singular of the aorist and of the future is learnt by heart for such verbs. English has the same phenomenon: go — went, speak — spoke.",
        "vocabulary": {
            "γάρ": "for, indeed, because",
            "ἔβαλον (Aor. II от βάλλω)": "I threw",
            "ἐγενόμην (Aor. II от γίνομαι)": "I became",
            "εἶδον (Aor. II от βλέπω, ὁράω)": "I saw",
            "εἶπον (Aor. II от λέγω)": "I said",
            "ἔλαβον (Aor. II от λαμβάνω)": "I took, received",
            "ἤγαγον (Aor. II от ἄγω)": "I led",
            "ἦλθον (Aor. II от ἔρχομαι)": "I came",
            "ἤνεγκον (Aor. II от φέρω)": "I brought, carried",
            "λείπω": "I leave, abandon (Aor. II ἔλιπον)",
            "ὄψομαι (dep. Fut. от ὁράω)": "I shall see",
            "οὔπω": "not yet",
            "πίπτω": "I fall (Aor. II ἔπεσον)",
            "προσφέρω": "I bring, offer",
            "συνάγω": "I gather"
        },
        "headwords": {
            "ἔβαλον (Aor. II от βάλλω)": "ἔβαλον (Aor. II of βάλλω)",
            "ἐγενόμην (Aor. II от γίνομαι)": "ἐγενόμην (Aor. II of γίνομαι)",
            "εἶδον (Aor. II от βλέπω, ὁράω)": "εἶδον (Aor. II of βλέπω, ὁράω)",
            "εἶπον (Aor. II от λέγω)": "εἶπον (Aor. II of λέγω)",
            "ἔλαβον (Aor. II от λαμβάνω)": "ἔλαβον (Aor. II of λαμβάνω)",
            "ἤγαγον (Aor. II от ἄγω)": "ἤγαγον (Aor. II of ἄγω)",
            "ἦλθον (Aor. II от ἔρχομαι)": "ἦλθον (Aor. II of ἔρχομαι)",
            "ἤνεγκον (Aor. II от φέρω)": "ἤνεγκον (Aor. II of φέρω)",
            "ὄψομαι (dep. Fut. от ὁράω)": "ὄψομαι (dep. fut. of ὁράω)"
        }
    },
    "16": {
        "title": "The Aorist and Future of the Passive Voice",
        "grammar": "<b>1. Aoristus Indicativi Passivi</b><br>\nThe mark of the passive aorist is the suffix <b>-θη-</b>, attached to the verb stem; like the other historical tenses it takes an augment. The forms are passive in meaning, but their endings are the secondary <b>active</b> endings (except that in the third person plural -ν is replaced by -σαν), and they are attached directly to -θη-, without connecting vowels.<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Meaning</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>ἐλύθην</td><td>I was untied</td><td>ἐλύθημεν</td><td>we were untied</td></tr>\n  <tr><td>2nd</td><td>ἐλύθης</td><td>you were untied</td><td>ἐλύθητε</td><td>you were untied</td></tr>\n  <tr><td>3rd</td><td>ἐλύθη</td><td>he was untied</td><td>ἐλύθησαν</td><td>they were untied</td></tr>\n</table><br>\n<b>2. Futurum Passivi</b><br>\nThe future passive: -θη- is added to the stem, then -σ- and the primary middle-passive personal endings with connecting vowels:<br>\n<table>\n  <tr><th>Person</th><th>Sg.</th><th>Meaning</th><th>Pl.</th><th>Meaning</th></tr>\n  <tr><td>1st</td><td>λυθήσομαι</td><td>I shall be untied</td><td>λυθησόμεθα</td><td>we shall be untied</td></tr>\n  <tr><td>2nd</td><td>λυθήσῃ</td><td>you will be untied</td><td>λυθήσεσθε</td><td>you will be untied</td></tr>\n  <tr><td>3rd</td><td>λυθήσεται</td><td>he will be untied</td><td>λυθήσονται</td><td>they will be untied</td></tr>\n</table><br>\n<b>3. Changes of the stem before -θη-</b><br>\n• <b>π, β + θη = φθη</b>: πέμπω → ἐπέμφθην<br>\n• <b>κ, γ + θη = χθη</b>: ἄγω → ἤχθην<br>\n• <b>τ, δ, θ + θη = σθη</b>: πείθω → ἐπείσθην<br><br>\n<b>4. The second passive aorist</b><br>\nSome verbs form the passive aorist without θ: γράφω → ἐγράφην, ἐγράφης, ἐγράφη, ἐγράφημεν, ἐγράφητε, ἐγράφησαν. The future lacks θ as well: γραφήσομαι, γραφήσῃ, γραφήσεται.<br><br>\n<b>5. The suppletive passive aorist</b><br>\nSome verbs form the passive aorist from another stem: λέγω — ἐρρέθην, φέρω — ἠνέχθην, ὁράω — ὥφθην. These forms are learnt by heart.<br><br>\n<b>6. The aorist and future of deponent verbs</b><br>\nSome deponent verbs form an aorist and a future that are passive in form but active in meaning: ἀποκρίνομαι (I answer) — ἀπεκρίθην (I answered). Some have both forms with a single meaning: γίνομαι — ἐγενόμην and ἐγενήθην (I became).",
        "vocabulary": {
            "ἀναλαμβάνω": "I lift up, take up",
            "ἐβλήθην (Aor. pass. от βάλλω)": "I was thrown",
            "ἐγενήθην (Aor. pass. от γίνομαι)": "I became",
            "ἐγνώσθην (Aor. pass. от γινώσκω)": "I was known",
            "ἐδιδάχθην (Aor. pass. от διδάσκω)": "I was taught",
            "ἐκηρύχθην (Aor. pass. от κηρύσσω)": "I was proclaimed, preached",
            "ἐλήμφθην (Aor. pass. от λαμβάνω)": "I was taken, received",
            "ἐπορεύθην (Aor. pass. от πορεύομαι)": "I went, set out",
            "ἐρρέθην (Aor. pass. от λέγω)": "I was said",
            "ἠγέρθην (Aor. pass. от ἐγείρω)": "I was raised, woken",
            "ἠκούσθην (Aor. pass. от ἀκούω)": "I was heard",
            "ἠνέχθην (Aor. pass. от φέρω)": "I was brought",
            "ἤχθην (Aor. pass. от ἄγω)": "I was led",
            "ὥφθην (Aor. pass. от ὁράω, βλέπω)": "I was seen"
        },
        "headwords": {
            "ἐβλήθην (Aor. pass. от βάλλω)": "ἐβλήθην (Aor. pass. of βάλλω)",
            "ἐγενήθην (Aor. pass. от γίνομαι)": "ἐγενήθην (Aor. pass. of γίνομαι)",
            "ἐγνώσθην (Aor. pass. от γινώσκω)": "ἐγνώσθην (Aor. pass. of γινώσκω)",
            "ἐδιδάχθην (Aor. pass. от διδάσκω)": "ἐδιδάχθην (Aor. pass. of διδάσκω)",
            "ἐκηρύχθην (Aor. pass. от κηρύσσω)": "ἐκηρύχθην (Aor. pass. of κηρύσσω)",
            "ἐλήμφθην (Aor. pass. от λαμβάνω)": "ἐλήμφθην (Aor. pass. of λαμβάνω)",
            "ἐπορεύθην (Aor. pass. от πορεύομαι)": "ἐπορεύθην (Aor. pass. of πορεύομαι)",
            "ἐρρέθην (Aor. pass. от λέγω)": "ἐρρέθην (Aor. pass. of λέγω)",
            "ἠγέρθην (Aor. pass. от ἐγείρω)": "ἠγέρθην (Aor. pass. of ἐγείρω)",
            "ἠκούσθην (Aor. pass. от ἀκούω)": "ἠκούσθην (Aor. pass. of ἀκούω)",
            "ἠνέχθην (Aor. pass. от φέρω)": "ἠνέχθην (Aor. pass. of φέρω)",
            "ἤχθην (Aor. pass. от ἄγω)": "ἤχθην (Aor. pass. of ἄγω)",
            "ὥφθην (Aor. pass. от ὁράω, βλέπω)": "ὥφθην (Aor. pass. of ὁράω, βλέπω)"
        }
    }
};
