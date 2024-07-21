import axios from 'axios';
import { readSnippetFile } from '../utils/read-snippet-file';
import { writeSnippetFile } from '../utils/write-snippet-file';
import { success, warning } from '../vscode-ui/info-message';
import { Snippet, Snippets } from '../lib/types';
import { generateToken } from './api-token-generator';


const SERVER_URL = 'http://13.234.115.43/api/';

const refractoredSnippet = (importedSnippets: any) => {
    const title = importedSnippets.title;
    const body = importedSnippets.body;
    importedSnippets.body = body.split('\n');
    
    delete importedSnippets.title;

    const snippetToImport: Snippets = {
        [title]: importedSnippets as Snippet
    };

    return snippetToImport;
};

export async function fetchSnippetsFromUrl(language: string, url: string) {
    try {
        const token = await generateToken();
        const existingSnippets = readSnippetFile(language);
        const response = await axios.get(url, {
            headers:{
                "Authorization": token
            }
        });
        console.log(response.data);
        const importedSnippets = response.data.code_snippet;

        const snippetToImport = refractoredSnippet(importedSnippets);

        const mergedSnippets = { ...existingSnippets, ...snippetToImport };

        writeSnippetFile(language, mergedSnippets);
        success(`Snippets imported successfully!`);

    } catch (error) {
        warning(`Error importing snippets.${error}`);
        
    }
}

export async function saveSharedSnippet(codeSnippet: string, language: string, prefix: string=''){
    try {
        const token = await generateToken();
        const response = await axios.post(SERVER_URL + 'save_snippet', { code_snippet: codeSnippet, prefix }, {
            headers: {
                'Authorization': token
            }
        });

        const { message, snippet_id } = response.data;

        if (!snippet_id) {
            warning(`Failed to share snippet. Please try again.`);
            return;
        }

        return snippet_id;

    } catch (error) {
        warning(`Error saving snippet.`);
    }
}