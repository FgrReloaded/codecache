import * as vscode from 'vscode';
import { handleComments } from '../utils/commit';

export const shiftAndComment = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        const document = editor.document;

        if (selection.isEmpty) {
            const line = document.lineAt(selection.active.line);
            handleComments(editor, line.range.start, line.range.end);
        } else {
            const startLine = document.lineAt(selection.start.line);
            const endLine = document.lineAt(selection.end.line);

            const start = new vscode.Position(startLine.lineNumber, 0);
            const end = new vscode.Position(endLine.lineNumber, endLine.range.end.character);

            handleComments(editor, start, end);
        }
    }
}