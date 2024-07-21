import * as vscode from 'vscode';
import { Languages } from '../lib/types';
import { getSelectedCode } from '../utils/get-selected-code';
import { showIndicatorWithBtn, showLoadingIndicator, warning } from '../vscode-ui/info-message';
import { saveSharedSnippet } from '../server/snippets-url';
import { languageSpecificComments } from '../utils/language-specific-comments';


const generateUrl = (snippet_id: string, language: Languages) => {
    const SERVER_URL = 'http://13.234.115.43/api/';
    const VSCODE_URL = `vscode://fgrreloaded.codecache/importSnippets?language=${language}&snippetUrl=`;
    const snippetUrl = SERVER_URL + 'get_snippet?snippet_id=' + snippet_id;

    return VSCODE_URL + snippetUrl;
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

            const snippet_id = await saveSharedSnippet(selectedText, language);

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