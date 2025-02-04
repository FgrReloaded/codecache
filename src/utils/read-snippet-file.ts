import * as path from 'path';
import { getWindowsUserSnippetsDir } from './get-snippets-directory';
import * as fs from 'fs';
import { Snippets } from '../lib/types';


const removeJsonComments = (jsonString: string): string => {
        return jsonString.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//gm, '');
};


export const readSnippetFile = (language: string): Snippets => {
    const snippetsDir = getWindowsUserSnippetsDir();
    const snippetFilePath = path.join(snippetsDir, `${language}.json`);
    
    if (fs.existsSync(snippetFilePath)) {
        const fileContent = fs.readFileSync(snippetFilePath, 'utf8');
        const commentLessContent = removeJsonComments(fileContent);
        return JSON.parse(commentLessContent);
    }
    return {};
};
