import * as vscode from 'vscode';

export const warning = (message: string) => {
    vscode.window.showErrorMessage(message);
}

export const success = (message: string) => {
    vscode.window.showInformationMessage(message);
}



let progress: any;

export async function showLoadingIndicator(message: string, workers: Function) {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: message,
        cancellable: false
    }, async () => {
        await workers();
    });
}
