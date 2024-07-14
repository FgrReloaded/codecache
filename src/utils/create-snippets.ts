import { Snippets } from "../lib/types";
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

export const createNewSnippets = (language: string, snippetPrefix: string) => {
    const snippets = readSnippetFile(language);

    if (checkIfSnippetExists(snippets, snippetPrefix.trim())) {
        return;
    }

    snippets["New Snippet"] = {
        prefix: snippetPrefix,
        body: ["This is body"],
        description: `Custom snippet for ${language}`
    };

    writeSnippetFile(language, snippets);
};