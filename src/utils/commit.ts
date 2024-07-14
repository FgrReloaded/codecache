import * as vscode from 'vscode';

export const handleComments = (editor: vscode.TextEditor, start: vscode.Position, end: vscode.Position) => {
    const endLine = end.line + 1;

    editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(endLine, 0), '');
        editBuilder.insert(start, '/* Comment */\n');
    });
}