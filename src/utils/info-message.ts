import * as vscode from 'vscode';

export const warning = (message: string) => {
    vscode.window.showErrorMessage(message);
}

export const success = (message: string) => {
    vscode.window.showInformationMessage(message);
}