import * as vscode from 'vscode';
import "./go"

import "../../static/wasm_exec_node";

class JsonTreeNode {
    constructor(public readonly key: string, public readonly value: any) {
    }
}

export class JsonTreeHelper implements vscode.TreeDataProvider<JsonTreeNode> {
    onDidChangeTreeData?: vscode.Event<void | JsonTreeNode | JsonTreeNode[]>;

    getTreeItem(element: JsonTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

    getChildren(element?: JsonTreeNode): vscode.ProviderResult<JsonTreeNode[]> {
        throw new Error('Method not implemented.');
    }

    getParent?(element: JsonTreeNode): vscode.ProviderResult<JsonTreeNode> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: vscode.TreeItem, element: JsonTreeNode, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }


    getActiveEditorContent(): string | undefined {
        const editor = vscode.window.activeTextEditor;
        if (editor && (editor.document.languageId === 'json' || editor.document.languageId === 'jsonc')) {
            return editor.document.getText();
        }
        return undefined;
    }

    parseJsonContent(content: string): any {
        try {
            return JSON.parse(content);
        } catch (e) {
            vscode.window.showErrorMessage('Failed to parse JSON content');
            return undefined;
        }
    }
}

async function loadWasi() {
    const go = new Go();
    const wasmModule = await WebAssembly.instantiateStreaming(fetch('static/main.wasm'), go.importObject);
    go.run(wasmModule.instance);
}