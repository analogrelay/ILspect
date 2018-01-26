import { app, BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from "electron";

export default function createMenu(): Menu {
    const template: MenuItemConstructorOptions[] = [
        {
            label: "File",
            submenu: [
                {
                    accelerator: "CommandOrControl+O",
                    label: "Add Assembly...",
                    click(item, focusedWindow) {
                        dialog.showOpenDialog(focusedWindow, {
                            filters: [
                                { name: ".NET Assemblies", extensions: ["dll", "exe", "winmd"] },
                            ],
                            title: "Add Assembly...",
                        }, (paths) => focusedWindow.webContents.send("assembly.add", paths));
                    },
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
    ];

    if (process.platform === "darwin") {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services", submenu: [] },
                { type: "separator" },
                { role: "hide" },
                { role: "hideothers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" },
            ],
        });
    }

    return Menu.buildFromTemplate(template);
}
