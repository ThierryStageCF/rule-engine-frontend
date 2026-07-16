import { StreamLanguage, syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import type { Extension } from "@codemirror/state";

/**
 * Construit l'extension de coloration lexicale du DSL : mots-clés, chaînes et
 * nombres. Les champs métier restent en texte normal. La liste des mots-clés
 * vient du backend (source unique), jamais recopiée ici.
 */
export function dslHighlight(keywords: string[]): Extension {

    /* Ensemble des mots-clés, en majuscules, pour une reconnaissance rapide. */
    const keywordSet = new Set(keywords.map((k) => k.toUpperCase()));

    /* Langage lexical : on découpe le texte morceau par morceau. */
    const dslLanguage = StreamLanguage.define({
        token(stream) {
            /* Chaînes : "..." */
            if (stream.match(/"([^"\\]|\\.)*"/)) {
                return "string";
            }
            /* Nombres : entiers et décimaux */
            if (stream.match(/\d+(\.\d+)?/)) {
                return "number";
            }
            /* Mots (lettres, chiffres, underscore) : mot-clé ou champ ? */
            const word = stream.match(/[A-Za-z_][A-Za-z0-9_]*/);
            if (word) {
                /* word est le texte capturé ; on teste s'il est un mot-clé. */
                if (keywordSet.has(String(word).toUpperCase())) {
                    return "keyword";
                }
                return null;   /* un champ : pas de couleur */
            }
            /* Tout le reste (espaces, opérateurs symboliques...) : on avance. */
            stream.next();
            return null;
        },
    });

    /* Association catégorie -> couleur. */
    const highlightStyle = HighlightStyle.define([
        { tag: tags.keyword, color: "#7c3aed", fontWeight: "600" },  /* mots-clés : violet */
        { tag: tags.string, color: "#059669", fontWeight: "600" },   /* chaînes : vert */
        { tag: tags.number, color: "#2563eb", fontWeight: "600" },   /* nombres : bleu */
    ]);

    return [dslLanguage, syntaxHighlighting(highlightStyle)];
}