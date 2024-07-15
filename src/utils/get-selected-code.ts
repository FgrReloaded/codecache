import * as vscode from 'vscode';


export const getSelectedCode = (): string[] => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        throw new Error('No active text editor found!');
    }
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    const selectedCode = selectedText.split('\n');

    return selectedCode;
}