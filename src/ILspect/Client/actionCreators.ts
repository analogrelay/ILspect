import * as Actions from './actionTypes';
import * as State from './state';
import * as Server from './server';

export function addAssemblies(paths: string[]) {
    return async (dispatch: Redux.Dispatch) => {
        dispatch(Actions.AddingAssembly.create(paths));
        let resp = await fetch("~/api/assemblies", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paths)
        });

        function readMember(m: Server.MemberModel): State.Member {
            let ret: State.Member = {
                name: m.name,
                kind: m.kind
            };

            if (Server.memberIsType(m)) {
                let typ = ret as State.Type;
                typ.members = (m.members && m.members.map(readMember)) || [];
                return typ;
            } else {
                return ret;
            }
        }

        let result = await resp.json<Server.ApiResponse<Server.AssemblyModel>[]>();
        let asms = result.filter((r) => r.success && r.result.hasMetadata).map((r) => <State.Assembly>{
            path: r.result.path,
            name: r.result.name,
            status: State.AssemblyStatus.Loaded,
            namespaces: (r.result.namespaces && r.result.namespaces.map((n) => (<State.Namespace>{
                name: n.name,
                types: (n.types && n.types.map(readMember)) || []
            }))) || []
        });

        dispatch(Actions.ResolvedAssemblies.create(asms));
    };
}