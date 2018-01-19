// Manages the ASP.NET Core "buddy process"

import { spawn, ChildProcess } from "child_process";

export class BuddyProcess {
    private process: ChildProcess | null;
    public url: string | null;

    constructor(private applicationPath: string) {
        this.process = null;
        this.url = null;
    }

    public start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.process = spawn("dotnet", [this.applicationPath]);
            this.process.on("close", (code, signal) => {
                console.log(`buddy process terminated with exit code: ${code}`);
                this.process = null;
                reject(`process terminated with exit code: ${code}`);
            });
            this.process.on("error", error => {
                console.log(`error starting buddy: ${error}`);
                reject(error);
            });
            this.process.stdout.on("data", (chunk: string | Buffer) => {
                if (Buffer.isBuffer(chunk)) {
                    chunk = chunk.toString();
                }

                for (let line of chunk.split(/(?:\r\n|\r|\n)/g)) {
                    console.log("Server: " + line);
                    if(line.startsWith("Now listening on: ")) {
                        if(this.process) {
                            // Remove the close handler that was going to fail this promise
                            this.process.removeAllListeners("close");

                            // Attach a new one that won't fail the start promise
                            this.process.on("close", this.processTerminated);
                        }

                        // Parse the URL out
                        let url = line.substring(18);
                        this.url = url;
                        resolve();
                    }
                }
            });
        });
    }

    public stop() {
        if(this.process) {
            // TODO: Graceful shutdown.
            this.process.kill();
        }
    }

    private processTerminated(code: number, signal: string) {
        // TODO: Signal this back to the app
        console.log(`buddy process terminated with exit code: ${code}`);
    }
}