import { Snippets } from "../lib/types";
import { callCodeExplainer } from "../server/fetch_explainer";
import { getSelectedCode } from "./get-selected-code";
import { warning } from "./info-message";
import { readSnippetFile } from "./read-snippet-file";
import { writeSnippetFile } from "./write-snippet-file";


const checkIfSnippetExists = (snippets: Snippets, snippetPrefix: string): boolean => {
    for (const key in snippets) {
        const snippet = snippets[key];
        if (snippet.prefix === snippetPrefix) {
            return true;
        }
    }

    return false;
};

export const createNewSnippets = async (language: string, snippetPrefix: string) => {
    const snippets = readSnippetFile(language);

    if (checkIfSnippetExists(snippets, snippetPrefix.trim())) {
        warning("Snippet with this name already exists");
        return;
    }

    const selectedCode = getSelectedCode();

    if (selectedCode.length === 0) {
        warning("No code selected!");
        return;
    }

    const explaination = await callCodeExplainer(selectedCode);

    snippets["New Snippet"] = {
        prefix: snippetPrefix,
        body: selectedCode,
        description: explaination || "No description available",
    };

    writeSnippetFile(language, snippets);
};