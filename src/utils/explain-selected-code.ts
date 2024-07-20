import { Languages } from "../lib/types";
import { showLoadingIndicator, warning } from "../vscode-ui/info-message";
import { getExplanation } from "../server/fetch_model_api";
import { languageSpecificComments } from "./language-specific-comments";
import * as vscode from 'vscode';


export const explainSelectedCode = async (language: Languages, selectedCode: string, start: vscode.Position) => {

    await showLoadingIndicator("Generating explanation...", async () => {

        const explanation = await getExplanation(selectedCode);

        if(!explanation){
            warning("Failed to generate explanation, please try again.");
            return;
        }

        const generatedComment = languageSpecificComments(explanation, language);

        vscode.commands.executeCommand('codecache.CommentAndShiftTextDown', generatedComment, start);

    });

};
