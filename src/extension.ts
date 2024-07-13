import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const handleComments = (editor: vscode.TextEditor, start: vscode.Position, end: vscode.Position) => {
        const endLine = end.line + 1;

        editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(endLine, 0), '');
            editBuilder.insert(start, '// Comment\n');
        });
    }

    let shiftDown = vscode.commands.registerCommand('extension.shiftTextDownWithComment', () => {
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
    });


    context.subscriptions.push(shiftDown);
}

export function deactivate() { }
