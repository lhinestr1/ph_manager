import { PHManagerState } from "..";
import { remainingExpTime } from "../../helpers/tokenHelpers";


export const tokenRemainingTimeSelector = (state: PHManagerState) =>
    remainingExpTime(state.session.attrs.exp);