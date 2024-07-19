import * as vscode from 'vscode';
import { showLoadingIndicator, warning } from '../vscode-ui/info-message';
import { getSelectedCode } from '../utils/get-selected-code';
import { variableSuggester } from '../server/fetch_model_api';
import { showRefactoredCode } from '../utils/show-refactored-code';


export const suggestVariable = async () => {
    await showLoadingIndicator('Generating variable names...', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found!');
            return;
        }

        const { selectedText } = getSelectedCode();
        if (!selectedText) {
            warning('No code selected!');
            return;
        }

        const refactoredCode = await variableSuggester(selectedText);

        if (!refactoredCode) {
            warning('Failed to suggest variable names!');
            return;
        }

        showRefactoredCode(refactoredCode);

    });

};
