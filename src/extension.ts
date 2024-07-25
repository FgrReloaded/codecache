import * as vscode from 'vscode';
import { shiftAndComment } from './commands/lineDownAndComment';
import { createSnippetCommand } from './commands/createNewSnippet';
import { explainCode } from './commands/explainCode';
import { importSnippetsFromUrl } from './commands/importSnippetsFromUrl';
import { shareSnippets } from './commands/shareSnippets';
import { suggestVariable } from './commands/suggestVariable';
import { allowedLanguages } from './lib/types';
import { connectToClient } from './utils/ai-client';
import { connect } from './server/actions';


export function activate(context: vscode.ExtensionContext) {

    (async () => {
        await connectToClient();
        await connect();
    })();

    const shiftAndCommentDisposable = vscode.commands.registerCommand('codecache.CommentAndShiftTextDown', (comment, startLine) => { shiftAndComment(comment, startLine); });
    const createSnippetDisposable = vscode.commands.registerCommand('codecache.createSnippet', createSnippetCommand);
    const codeExplainerDisposable = vscode.commands.registerCommand('codecache.explainCode', explainCode);
    const importSnippetDisposable = vscode.commands.registerCommand('codecache.importSnippet', async (urlString: string) => { importSnippetsFromUrl(urlString); });
    const shareSnippetDisposable = vscode.commands.registerCommand('codecache.shareSnippet', shareSnippets);
    const suggestVariableDisposable = vscode.commands.registerCommand('codecache.suggestVariable', suggestVariable);



    context.subscriptions.push(shiftAndCommentDisposable, createSnippetDisposable, codeExplainerDisposable, importSnippetDisposable, shareSnippetDisposable, suggestVariableDisposable);


    context.subscriptions.push(vscode.window.registerUriHandler({
        handleUri(uri: vscode.Uri) {
            if (uri.path === '/importSnippets') {
                vscode.commands.executeCommand('codecache.importSnippet', uri.toString());
            }
        }
    }));


    // Code Action Provider
    const codeActionProvider: vscode.CodeActionProvider = {
        provideCodeActions(document, range, context, token) {
            const codeActions: vscode.CodeAction[] = [];

            if (!range.isEmpty) {
                const action = new vscode.CodeAction('Refactor Variable\'s name', vscode.CodeActionKind.RefactorRewrite);
                action.command = { command: 'codecache.suggestVariable',title: 'Suggest Variable', tooltip: 'Suggest good variables name' };
                codeActions.push(action);
            }

            return codeActions;
        }
    };

    const languages = allowedLanguages;
    languages.forEach(language => {
        const provider = vscode.languages.registerCodeActionsProvider(language, codeActionProvider);
        context.subscriptions.push(provider);
    });

}

export function deactivate() { }
