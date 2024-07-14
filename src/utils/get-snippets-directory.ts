import * as vscode from 'vscode';
import * as path from 'path';

export const getWindowsUserSnippetsDir = (): string => {
    const userDataDir = process.env.VSCODE_PORTABLE
        ? path.join(process.env.VSCODE_PORTABLE, 'user-data')
        : (vscode.env.appRoot && path.join(vscode.env.appRoot, '..', '..', '..', '..', '..', 'Roaming', 'Code', 'User')) || '';
    
    return path.join(userDataDir, 'snippets');
};


