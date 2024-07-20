import * as vscode from 'vscode';
import { shiftAndComment } from './commands/lineDownAndComment';
import { createSnippetCommand } from './commands/createNewSnippet';
import { explainCode } from './commands/explainCode';
import { importSnippetsFromUrl } from './commands/importSnippetsFromUrl';
import { shareSnippets } from './commands/shareSnippets';
import { suggestVariable } from './commands/suggestVariable';

export function activate(context: vscode.ExtensionContext) {

    const shiftAndCommentDisposable = vscode.commands.registerCommand('codecache.CommentAndShiftTextDown', (comment) => { shiftAndComment(comment); });
    const createSnippetDisposable = vscode.commands.registerCommand('codecache.createSnippet', createSnippetCommand);
    const codeExplainerDisposable = vscode.commands.registerCommand('codecache.explainCode', explainCode);
    const importSnippetDisposable = vscode.commands.registerCommand('codecache.importSnippet', async (urlString: string) => { importSnippetsFromUrl(urlString); });
    const shareSnippetDisposable = vscode.commands.registerCommand('codecache.shareSnippet', shareSnippets);
    const suggestVariableDisposable = vscode.commands.registerCommand('codecache.suggestVariable', suggestVariable);
    // const refactorCodeDisposable = vscode.commands.registerCommand('codecache.refactorCode', );



    context.subscriptions.push(shiftAndCommentDisposable, createSnippetDisposable, codeExplainerDisposable, importSnippetDisposable, shareSnippetDisposable, suggestVariableDisposable);


    context.subscriptions.push(vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri) {
            if (uri.path === '/importSnippets') {
                vscode.commands.executeCommand('codecache.importSnippet', uri.toString());
            }
        }
    }));

}

export function deactivate() { }
