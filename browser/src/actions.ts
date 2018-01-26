import { AnyAction } from "redux";

export class AddAssemblyAction implements AnyAction {
    static TYPE = "ADD_ASSEMBLY";

    static is(action: AnyAction): action is AddAssemblyAction {
        return action.type == AddAssemblyAction.TYPE;
    }

    public type: string = AddAssemblyAction.TYPE;

    constructor(public path: string) {
    }
}