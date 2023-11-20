import { DomState } from "../../Interfaces/DOMInterfaces";
import { ResultData } from "../../Interfaces/DataResponse";

type DomAction =
    | { type: 'endRequest', payload: { data: ResultData, shootAlert: boolean } }
    | { type: 'cleanResult' }
    | { type: 'requesting', payload: string }
    | { type: 'hideAlert' }
    | { type: 'addEventOnHideAlert', payload: () => void }
    | { type: 'addEventOnConfirmAlert', payload: () => void }


export const DomReducer = (state: DomState, action: DomAction): DomState => {
    switch (action.type) {
        case 'endRequest':
            return {
                ...state,
                messageRequest: undefined,
                statusDom: 'endRequest',
                resultDom: action.payload
            }
        case 'requesting':
            return {
                ...state,
                statusDom: 'requesting',
                messageRequest: action.payload,
                resultDom: undefined
            }
        case 'cleanResult':
            return {
                ...state,
                messageRequest: undefined,
                statusDom: 'initState',
                resultDom: undefined
            }
        case "hideAlert":
            return {
                ...state,
                statusDom: 'hideAlert'
            }
        case "addEventOnHideAlert":
            return {
                ...state,
                callback: action.payload
            }
        case "addEventOnConfirmAlert":
            return {
                ...state,
                callback: action.payload
            }
        default:
            return state;
    }


}


