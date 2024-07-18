import * as vscode from 'vscode';
import { handleComments } from '../utils/generate-comments';
import { getSelectedCode } from '../utils/get-selected-code';

export const shiftAndComment = (comment: string) => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const selection = editor.selection;
        const document = editor.document;

        if (selection.isEmpty) {
            const line = document.lineAt(selection.active.line);
            handleComments(comment, line.range.start, line.range.end);

        } else {
            const {start, end} = getSelectedCode();

            handleComments(comment, start, end);
        }
    }
};