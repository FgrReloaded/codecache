import * as vscode from 'vscode';

interface Selection {
    selectedCode: string[];
    selectedText: string;
    start: vscode.Position;
    end: vscode.Position;
}


export const getSelectedCode = (): Selection => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        throw new Error('No active text editor found!');
    }

    const selection = editor.selection;
    const document = editor.document;

    const startLine = document.lineAt(selection.start.line);
    const endLine = document.lineAt(selection.end.line);

    const startIdx = new vscode.Position(startLine.lineNumber, 0);
    const endIdx = new vscode.Position(endLine.lineNumber, endLine.range.end.character);

    const selectedText = document.getText(new vscode.Range(startIdx, endIdx));

    const selectedCode = selectedText.split('\n');

    return { selectedText, selectedCode, start:startIdx, end:endIdx };
};