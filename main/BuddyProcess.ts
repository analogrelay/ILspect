// Manages the ASP.NET Core "buddy process"

import { spawn, ChildProcess } from "child_process";

import * as log from 'winston';

const levelMap = [ 'silly', 'verbose', 'info', 'warn', 'error', 'error', 'error' ];

export class BuddyProcess {
    private process: ChildProcess | null;
    public url: string | null;

    constructor(private applicationPath: string) {
        this.process = null;
        this.url = null;
    }

    public start(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            log.debug("Spawning buddy process", { applicationPath: this.applicationPath });
            this.process = spawn("dotnet", [this.applicationPath]);
            this.process.on("close", (code, signal) => {
                log.log(code == 0 ? "debug" : "error", "Buddy process terminated", {code});
                this.process = null;
                reject(`Buddy process terminated with exit code: ${code}`);
            });
            this.process.on("error", error => {
                log.error("Error starting Buddy process", {error});
                reject(error);
            });
            this.process.stdout.on("data", (chunk: string | Buffer) => {
                if (Buffer.isBuffer(chunk)) {
                    chunk = chunk.toString();
                }

                for (let line of chunk.split(/(?:\r\n|\r|\n)/g)) {
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
                    else if(line.startsWith('{')) {
                        let record = JSON.parse(line);
                        if(record.log) {
                            let level = record.log.logLevel < levelMap.length ? levelMap[record.log.logLevel] : "silly";
                            let msg = record.category + ": " + record.log.formatted;
                            log.log(level, msg);
                        }
                        // TODO: Begin/end scope
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