export class Arguments {
    public webRoot?: string;
    public serverBin?: string;
}

// TODO: Replace 'Console' with logger.
export function parseArguments(argv: string[], out: { warn(s: string): void }): Arguments {
    const args = new Arguments();
    for (let i = 2; i < argv.length; i += 1) {
        switch (argv[i]) {
            case "--webroot":
                i += 1;
                if (i >= argv.length) {
                    throw new Error("Missing value for '--webroot' argument");
                }
                args.webRoot = argv[i];
                break;
            case "--server-bin":
                i += 1;
                if (i >= argv.length) {
                    throw new Error("Missing value for '--server-bin' argument");
                }
                args.serverBin = argv[i];
                break;
            default:
                out.warn(`Ignoring unknown argument '${argv[i]}'.`);
                break;
        }
    }
    return args;
}