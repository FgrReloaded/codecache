import * as vscode from 'vscode';
import { showIndicatorWithBtn, warning } from '../vscode-ui/info-message';
import { getSelectedCode } from './get-selected-code';


const replaceCodeSnippet = async (editor: vscode.TextEditor, start: vscode.Position, end: vscode.Position, codeSnippet: string) => {
    await editor.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(start, end), codeSnippet);
    });
};

export const showRefactoredCode = async (codeSnippet: string, selectedCode: string, start: vscode.Position, end: vscode.Position) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        warning('No active text editor found!');
        return;
    }

    await replaceCodeSnippet(editor, start, end, codeSnippet);

    const newEnd = new vscode.Position(start.line + codeSnippet.split('\n').length - 1, codeSnippet.split('\n')?.pop()?.length || 0);
    editor.selection = new vscode.Selection(start, newEnd);

    showIndicatorWithBtn('Apply changes?', {
        Apply: () => { },
        Cancel: async () => {
            await replaceCodeSnippet(editor, start, end, selectedCode);
        }
    });


    editor.selection = new vscode.Selection(start, end);

};