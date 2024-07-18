import * as vscode from 'vscode';
import { warning } from '../vscode-ui/info-message';
import { Languages, allowedLanguages } from '../lib/types';
import { getSelectedCode } from '../utils/get-selected-code';
import { explainSelectedCode } from '../utils/explain-selected-code';


export const explainCode = async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const language = editor.document.languageId as Languages;

        if (!allowedLanguages.includes(language as Languages)) {
            warning('This language is not supported.');
            return;
        }

        const { selectedText } = getSelectedCode();

        if (!selectedText) {
            warning('No code selected!');
            return;
        }

        explainSelectedCode(language, selectedText);

    }
};