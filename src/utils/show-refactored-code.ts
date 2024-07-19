import * as vscode from 'vscode';
import { warning } from '../vscode-ui/info-message';

export const showRefactoredCode = async (codeSnippet: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        warning('No active text editor found!');
        return;
    }
    const selection = editor.selection;

    await editor.edit(editBuilder => {
        editBuilder.replace(selection, codeSnippet);
    });

    editor.selection = new vscode.Selection(selection.start, selection.start);

};