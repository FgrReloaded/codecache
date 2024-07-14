import * as vscode from 'vscode';

export const handleInput = async (message: string): Promise<string | undefined> => {
    const inputText = await vscode.window.showInputBox({ prompt: message });

    return inputText;
}   