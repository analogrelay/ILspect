import { app, Menu, MenuItemConstructorOptions, dialog, BrowserWindow } from "electron";

export default function createMenu(): Menu {
    let template: MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    label: "Add Assembly...",
                    accelerator: "CommandOrControl+O",
                    click(item, focusedWindow) {
                        dialog.showOpenDialog(focusedWindow, {
                            title: "Add Assembly...",
                            filters: [
                                { name: ".NET Assemblies", extensions: ["dll", "exe", "winmd"] },
                            ],
                        }, paths => focusedWindow.webContents.send('assembly.add', paths));
                    }
                },
            ],
        },
        {
            role: "window",
            submenu: [
                { role: "minimize" },
                { role: "close" },
            ],
        },
        {
            role: "help",
        },
        {
            label: "Development",
            submenu: [
                { role: "toggledevtools" },
                { role: "reload" },
                { role: "forcereload" },
            ],
        },
    ]

    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ],
        });
    }

    return Menu.buildFromTemplate(template);
}