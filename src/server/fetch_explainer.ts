import axios from 'axios';

interface CodeExplainerResponse {
    title: string;
    explanation: string;
    execution_time: string;
}

export async function callCodeExplainer(codeSnippet: string[]): Promise<CodeExplainerResponse | null> {
    const SERVER_URL = 'http://localhost:8000/api/explain_code';  
    
    const code_snippet = codeSnippet.join('\n');
    
    try {
        const response = await axios.post(SERVER_URL, { code_snippet });

        const result = {
            title: response.data.title,
            explanation: response.data.explanation,
            execution_time: response.data.execution_time
        }

        return result;

    } catch (error) {
        console.error('Error calling server endpoint:', error);
        return null;
    }
}
