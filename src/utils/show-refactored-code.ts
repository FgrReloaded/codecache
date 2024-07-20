import * as vscode from 'vscode';
import { showIndicatorWithBtn, warning } from '../vscode-ui/info-message';
import { getSelectedCode } from './get-selected-code';


const replaceCodeSnippet = async (editor: vscode.TextEditor, selection: vscode.Selection, codeSnippet: string) => {
    await editor.edit(editBuilder => {
        editBuilder.replace(selection, codeSnippet);
    });
};

export const showRefactoredCode = async (codeSnippet: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        warning('No active text editor found!');
        return;
    }
    const selection = editor.selection;

    const { selectedText } = getSelectedCode();

    await replaceCodeSnippet(editor, selection, codeSnippet);

    showIndicatorWithBtn('Apply changes?', {
        Apply: () => { },
        Cancel: async () => {
            await replaceCodeSnippet(editor, selection, selectedText);
        }
    });


    editor.selection = new vscode.Selection(selection.start, selection.start);

};