// import * as assert from 'assert';
// import * as vscode from 'vscode';
// import { explainCode } from '../../src/commands/explainCode';


// suite('Explain Code Command Test Suite', () => {
//     vscode.window.showInformationMessage('Start all tests.');

//     test('Explain Code Command - Supported Language', async () => {
//         const editor = await vscode.workspace.openTextDocument({
//             content: 'console.log("Hello, world!");',
//             language: 'javascript'
//         });
//         await vscode.window.showTextDocument(editor);

//         // Mock the getExplanation function to return a predefined explanation
//         const mockExplanation = 'This code logs "Hello, world!" to the console.';
//         const mockGetExplanation = async () => mockExplanation;

//         // Replace the actual getExplanation function with the mock
//         const originalGetExplanation = (explainCode as any).__get__('getExplanation');
//         (explainCode as any).__set__('getExplanation', mockGetExplanation);

//         // Execute the command
//         await vscode.commands.executeCommand('codecache.explainCode');

//         // Check if the explanation comment was added
//         const expectedComment = `/* ${mockExplanation} */`;
//         const documentText = editor.getText();
//         assert.ok(documentText.includes(expectedComment), 'Explanation comment was not added.');

//         // Restore the original getExplanation function
//         (explainCode as any).__set__('getExplanation', originalGetExplanation);
//     });

//     test('Explain Code Command - Unsupported Language', async () => {
//         const editor = await vscode.workspace.openTextDocument({
//             content: 'print("Hello, world!")',
//             language: 'ruby'
//         });
//         await vscode.window.showTextDocument(editor);

//         // Execute the command
//         await vscode.commands.executeCommand('codecache.explainCode');

//         // Check if the warning message was shown
//         const warningMessage = 'This language is not supported.';
//         const lastMessage = vscode.window.showErrorMessage as any;
//         assert.strictEqual(lastMessage, warningMessage, 'Warning message was not shown for unsupported language.');
//     });

//     test('Explain Code Command - No Code Selected', async () => {
//         const editor = await vscode.workspace.openTextDocument({
//             content: '',
//             language: 'javascript'
//         });
//         await vscode.window.showTextDocument(editor);

//         // Execute the command
//         await vscode.commands.executeCommand('codecache.explainCode');

//         // Check if the warning message was shown
//         const warningMessage = 'No code selected!';
//         const lastMessage = vscode.window.showErrorMessage as any;
//         assert.strictEqual(lastMessage, warningMessage, 'Warning message was not shown for no code selected.');
//     });
// });
