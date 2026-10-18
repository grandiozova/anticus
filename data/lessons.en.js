// ============================================================
// ENGLISH LESSON TEXT
// ============================================================
// Grammar, titles and vocabulary meanings for lessons 1-3. Everything else
// (numbers, parts of speech, paradigms, drills) stays in the Russian source
// files and is not duplicated here.
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
    }
};
