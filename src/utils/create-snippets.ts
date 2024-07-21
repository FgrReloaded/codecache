import { Languages, Snippets } from "../lib/types";
import { getTitleDescription } from "../server/fetch-model-api";
import { getSelectedCode } from "./get-selected-code";
import { showLoadingIndicator, success, warning } from "../vscode-ui/info-message";
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


export const createNewSnippets = async (language: Languages, snippetPrefix: string) => {

    await showLoadingIndicator("Generating title and description for the snippet...", async () => {

        const snippets = readSnippetFile(language);

        if (checkIfSnippetExists(snippets, snippetPrefix.trim())) {
            warning("Snippet with this name already exists");
            return;
        }

        const { selectedCode } = getSelectedCode();

        if (selectedCode.length === 0) {
            warning("No code selected!");
            return;
        }

        const { title, explanation, execution_time } = await getTitleDescription(selectedCode) || {};

        if (!title || !explanation) {
            warning("Failed to create snippets, please try again.");
            return;
        }

        snippets[title] = {
            prefix: snippetPrefix,
            body: selectedCode,
            description: explanation || "No description available",
        };

        writeSnippetFile(language, snippets);
        success(`Snippet created successfully!`);
    });
};