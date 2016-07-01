import {IActionGeneric} from 'redux';

export const CHANGE_MESSAGE = "CHANGE_MESSAGE"

export function changeMessage(newMessage: string): IActionGeneric<string> {
    return { type: CHANGE_MESSAGE, payload: newMessage };
}