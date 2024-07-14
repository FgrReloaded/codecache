import * as vscode from 'vscode';
import { createNewSnippets } from '../utils/create-snippets';
import { warning, success } from '../utils/info-message';
import { handleInput } from '../utils/input-handler';


export const createSnippetCommand = async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const language = editor.document.languageId;
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
}