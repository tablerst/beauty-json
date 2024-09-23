'use strict';

import * as vscode from 'vscode';
import { JsonTreeHelper } from './json/jsonTree';

export function activate(context: vscode.ExtensionContext) {
    const helper = new JsonTreeHelper(context);
    vscode.window.createTreeView('jsonTree', { treeDataProvider: helper, showCollapseAll: true });
    vscode.commands.registerCommand('jsonTree.refresh', () => helper.refresh());
    vscode.commands.registerCommand('jsonTree.refreshNode', offset => helper.refresh(offset));
    vscode.commands.registerCommand('jsonTree.renameNode', offset => helper.rename(offset));
    vscode.commands.registerCommand('extension.openJsonSelection', range => helper.select(range));
}