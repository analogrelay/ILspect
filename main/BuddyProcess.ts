// Manages the ASP.NET Core "buddy process"

import { spawn, ChildProcess } from "child_process";

import * as log from 'winston';

const levelMap = ['silly', 'verbose', 'info', 'warn', 'error', 'error', 'error'];

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
                log.log(code == 0 ? "debug" : "error", "Buddy process terminated", { code });
                this.process = null;
                reject(`Buddy process terminated with exit code: ${code}`);
            });
            this.process.on("error", error => {
                log.error("Error starting Buddy process", { error });
                reject(error);
            });

            let previousLine: string | null = null;
            this.process.stdout.on("data", (chunk: string | Buffer) => {
                if (!Buffer.isBuffer(chunk)) {
                    chunk = Buffer.from(chunk);
                }

                let lineEnd: number;
                while (((lineEnd = chunk.indexOf('\r')) >= 0) || ((lineEnd = chunk.indexOf('\n')) >= 0)) {
                    let line = chunk.slice(0, lineEnd).toString();

                    if (previousLine) {
                        line = previousLine + line;
                        previousLine = null;
                    }

                    // If the line ending was a '\r' and it's followed by a '\n'
                    if (chunk[lineEnd] == 0x0D && chunk.length > lineEnd + 1 && chunk[lineEnd] == 0x0A) {
                        // Slice the extra '\n' off
                        chunk = chunk.slice(lineEnd + 2);
                    }
                    else {
                        // Slice the newline off
                        chunk = chunk.slice(lineEnd + 1);
                    }

                    if (line.startsWith("Now listening on: ")) {
                        if (this.process) {
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
                    else if (line.startsWith('{')) {
                        try {
                            let record = JSON.parse(line);
                            if (record.log) {
                                let level = record.log.logLevel < levelMap.length ? levelMap[record.log.logLevel] : "silly";
                                let msg = record.category + ": " + record.log.formatted;
                                log.log(level, msg);
                            }
                        } catch (e) {
                            log.error(`Error (${e}) processing log from server: ${line}`);
                        }
                        // TODO: Begin/end scope
                    }
                }

                if (chunk.length > 0) {
                    previousLine = chunk.toString();
                }
            });
        });
    }

    public stop() {
        if (this.process) {
            // TODO: Graceful shutdown.
            this.process.kill();
        }
    }

    private processTerminated(code: number, signal: string) {
        // TODO: Signal this back to the app
        console.log(`buddy process terminated with exit code: ${code}`);
    }
}