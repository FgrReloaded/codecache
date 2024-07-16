import * as vscode from 'vscode';
import { shiftAndComment } from './commands/lineDownAndComment';
import { createSnippetCommand } from './commands/createNewSnippet';
import { explainCode } from './commands/explainCode';

export function activate(context: vscode.ExtensionContext) {

    const shiftAndCommentDisposable = vscode.commands.registerCommand('codecache.CommentAndShiftTextDown', (comment)=>{shiftAndComment(comment)});
    const createSnippetDisposable = vscode.commands.registerCommand('codecache.createSnippet', createSnippetCommand);
    const codeExplainerDisposable = vscode.commands.registerCommand('codecache.explainCode', explainCode);

    context.subscriptions.push(shiftAndCommentDisposable, createSnippetDisposable, codeExplainerDisposable);
}

export function deactivate() { }
