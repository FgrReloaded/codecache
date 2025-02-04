import * as vscode from 'vscode';

interface ButtonWorkers {
    [key: string]: Function;
}

export const warning = (message: string) => {
    vscode.window.showErrorMessage(message);
};

export const success = (message: string) => {
    vscode.window.showInformationMessage(message);
};


export const showIndicatorWithBtn = (message: string, btnWorkers: ButtonWorkers) => {
    vscode.window.showInformationMessage(message, ...Object.keys(btnWorkers)).then((selection) => {
        if (selection) {
            btnWorkers[selection]();
        }
    });
};


export async function showLoadingIndicator(message: string, workers: Function) {
    await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: message,
        cancellable: false
    }, async () => {
        await workers();
    });
}
