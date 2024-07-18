import * as fs from 'fs';
import * as path from 'path';
import { getWindowsUserSnippetsDir } from './get-snippets-directory';
import { warning } from '../vscode-ui/info-message';

export const writeSnippetFile = (language: string, snippets: any) => {
    const snippetsDir = getWindowsUserSnippetsDir();
    const snippetFilePath = path.join(snippetsDir, `${language}.json`);

    try {
        fs.writeFileSync(snippetFilePath, JSON.stringify(snippets, null, 2));
    } catch (error: any) {
        warning(`Error writing to ${snippetFilePath}: ${error.message}`);
        console.error(`Error writing to ${snippetFilePath}:`, error);
    }
};
