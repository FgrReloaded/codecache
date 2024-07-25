import axios from 'axios';
import { readSnippetFile } from '../utils/read-snippet-file';
import { writeSnippetFile } from '../utils/write-snippet-file';
import { success, warning } from '../vscode-ui/info-message';
import { Snippet, Snippets } from '../lib/types';
import { findSnippet } from './actions';
import { ObjectId } from 'mongodb';
import { handleInput } from '../vscode-ui/input-handler';


const refractoredSnippet = async (importedSnippets: any) => {
    const title = importedSnippets.title;

    let prefix = await handleInput('Enter a prefix for the snippet');

    while (prefix === null || prefix?.trim() === '') {
        warning('Snippet prefix is required. Press esc to cancel.');
        prefix = await handleInput('Enter a prefix for the snippet');
    }

    if (prefix === undefined) {
        warning('Snippet import cancelled.');
        return;
    }

    const newSnippet: Snippet = {
        prefix: prefix!,
        body: importedSnippets.codeSnippet.split('\n'),
        description: importedSnippets.explanation
    };

    const snippetToImport: Snippets = {
        [title]: newSnippet
    };

    return snippetToImport;
};

export async function fetchSnippetsFromUrl(language: string, id: ObjectId) {
    try {
        const existingSnippets = readSnippetFile(language);

        const importedSnippets = await findSnippet("codecache", id);

        const snippetToImport = await refractoredSnippet(importedSnippets);

        if (!snippetToImport) {
            return;
        }

        const mergedSnippets = { ...existingSnippets, ...snippetToImport };

        writeSnippetFile(language, mergedSnippets);
        success(`Snippets imported successfully!`);

    } catch (error) {
        warning(`Error importing snippets`);

    }
}
