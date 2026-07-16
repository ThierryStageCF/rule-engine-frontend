import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { type JSX, useMemo } from "react";
import {dslHighlight} from "../lib/editor/dslHighLight.ts";
import {useDslCompletion} from "../lib/hooks/useDslCompletion.ts";


export type CodeEditorFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    placeholder?: string;
    readonly?: boolean;
    keywords?: string[];
};

/**
 * Éditeur de texte pour le semi-formel, dépouillé (pas de numéros de ligne,
 * pas de chrome d'IDE). Expose une interface value/onChange, quelle que soit
 * la mécanique interne — pour rester branchable à react-hook-form via Controller
 * et pouvoir basculer sur un montage manuel plus tard sans changer l'interface.
 */
export default function CodeEditorField(
    {
        id,
        label,
        value,
        onChange,
        onBlur,
        error,
        placeholder,
        readonly = false,
        keywords = [],
    }: CodeEditorFieldProps): JSX.Element {

    /* Configuration minimale : on éteint tout ce qui fait "éditeur de code". */
    const basicSetup = useMemo(
        () => ({
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false,
            highlightActiveLineGutter: false,
            bracketMatching: false,
            closeBrackets: false,
            autocompletion: false,
            searchKeymap: false,
        }),
        [],
    );

    /* Apparence : on veut que ça ressemble à un champ de formulaire, pas à un IDE. */
    const theme = useMemo(
        () =>
            EditorView.theme({
                "&": {
                    fontSize: "0.95rem",
                    borderRadius: "0.5rem",
                },
                "&.cm-focused": {
                    outline: "none",
                },
                ".cm-content": {
                    fontFamily: "inherit",
                    padding: "0.625rem 0.75rem",
                    minHeight: "9rem",
                },
                ".cm-line": {
                    padding: "0",
                },
            }),
        [],
    );

    const completion = useDslCompletion();

    const extensions = useMemo(
        () => [
            EditorView.lineWrapping,
            dslHighlight(keywords),
            completion,
            theme,
        ],
        [theme, keywords, completion],
    );

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
                {label}
            </label>

            <div
                className={`rounded-lg border bg-white transition-colors ${
                    error ? "border-red-400" : "border-gray-300 focus-within:border-primary"
                }`}
            >
                <CodeMirror
                    id={id}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    editable={!readonly}
                    placeholder={placeholder}
                    basicSetup={basicSetup}
                    extensions={extensions}
                />
            </div>

            {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
    );
}