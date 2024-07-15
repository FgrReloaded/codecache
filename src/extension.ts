import * as vscode from 'vscode';
import { shiftAndComment } from './commands/lineDownAndComment';
import { createSnippetCommand } from './commands/createNewSnippet';

export function activate(context: vscode.ExtensionContext) {

    const shiftAndCommentDisposable = vscode.commands.registerCommand('codecache.CommentAndShiftTextDown', shiftAndComment);
    const createSnippetDisposable = vscode.commands.registerCommand('codecache.createSnippet', createSnippetCommand);


    context.subscriptions.push(shiftAndCommentDisposable, createSnippetDisposable);
}

export function deactivate() { }
