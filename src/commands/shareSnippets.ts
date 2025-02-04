import * as vscode from 'vscode';
import { Languages } from '../lib/types';
import { getSelectedCode } from '../utils/get-selected-code';
import { showIndicatorWithBtn, showLoadingIndicator, warning } from '../vscode-ui/info-message';
import { languageSpecificComments } from '../utils/language-specific-comments';
import { insertSnippets } from '../server/actions';
import { ObjectId } from 'mongodb';


const generateUrl = (snippet_id: ObjectId, language: Languages) => {
    const VSCODE_URL = `vscode://fgrreloaded.codecache/importSnippets?language=${language}&snippetId=`;

    return VSCODE_URL + snippet_id;
};

export const shareSnippets = async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        await showLoadingIndicator("Saving the snippet & generating the link", async () => {

            const language = editor.document.languageId as Languages;

            const { selectedText, start } = getSelectedCode();

            if (selectedText.length === 0) {
                warning("No code selected!");
                return;
            }

            const snippet_id = await insertSnippets("codecache", selectedText);

            const snippetUrl = generateUrl(snippet_id, language);

            showIndicatorWithBtn("Snippet saved successfully! Click on Copy to copy the link", {
                Copy: () => {
                    vscode.env.clipboard.writeText(snippetUrl);
                },
            });

            const comment = languageSpecificComments(snippetUrl, language);
            vscode.commands.executeCommand('codecache.CommentAndShiftTextDown', comment, start);
        });

    }
};