import * as vscode from 'vscode';
import { createNewSnippets } from '../utils/create-snippets';
import { warning } from '../vscode-ui/info-message';
import { handleInput } from '../vscode-ui/input-handler';
import { Languages, allowedLanguages } from '../lib/types';


export const createSnippetCommand = async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const language = editor.document.languageId as Languages;

        if(!allowedLanguages.includes(language as Languages)) {
            warning('This language is not supported.');
            return;
        }

        let snippetPrefix = await handleInput('You can call this snippet using this name.');

        if(snippetPrefix === undefined) {
            warning('Snippet creation cancelled.');
            return;
        }

        if (snippetPrefix === null || snippetPrefix.trim() === '') {
            warning('Snippet prefix is required.');
            return;
        }

        createNewSnippets(language, snippetPrefix);
    }
};