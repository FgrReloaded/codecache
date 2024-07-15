import axios from 'axios';

export async function callCodeExplainer(codeSnippet: string[]): Promise<string | null> {
    const SERVER_URL = 'http://localhost:8000/api/explain_code';  
    
    const code_snippet = codeSnippet.join('\n');
    
    try {
        const response = await axios.post(SERVER_URL, { code_snippet });

        return response.data.explanation;

    } catch (error) {
        console.error('Error calling server endpoint:', error);
        return null;
    }
}
