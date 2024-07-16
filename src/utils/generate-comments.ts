import * as vscode from 'vscode';



const customizeComment = (comment: string) => {
    const words: string[] = comment.split(' ');
    const lines: string[] = [];
    let currentLine: string[] = [];
    let currentLength: number = 0;

    for (const word of words) {
        if (currentLength + word.length + currentLine.length <= 80) {
            currentLine.push(word);
            currentLength += word.length;
        } else {
            lines.push(currentLine.join(' '));
            currentLine = [word];
            currentLength = word.length;
        }
    }

    if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
    }

    return lines.join('\n');

}

export const handleComments = (comment: string, start: vscode.Position, end: vscode.Position) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const endLine = end.line + 1;

    // const customizedComment = customizeComment(comment);

    editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(endLine, 0), '');
        editBuilder.insert(start, `${comment}\n`);
    });
}




