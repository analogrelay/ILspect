import { HubConnection, MessagePackHubProtocol, TransportType } from "@aspnet/signalr-client";
import { Store } from "redux";

import { addedAssembly } from "./actions";
import { IApplicationState, IAssemblyState } from "./state";

export class Disassembler {
    public static async connect(serviceUrl: string, store: Store<IApplicationState>): Promise<Disassembler> {
        const connection = new HubConnection(serviceUrl, {
            protocol: new MessagePackHubProtocol(),
            transport: TransportType.WebSockets,
        });
        await connection.start();
        return new Disassembler(connection, store);
    }

    private constructor(private connection: HubConnection, private store: Store<IApplicationState>) {
        connection.on("AddedAssembly", this.addedAssembly);
    }

    public addAssemblies(paths: string[]): Promise<void> {
        return this.connection.invoke("AddAssemblies", paths);
    }

    private addedAssembly(asm: IAssemblyState) {
        this.store.dispatch(addedAssembly(asm));
    }
}