export default {
    requests(state, _, _2, rootGetters){
        const coachID = rootGetters.userID;
        return state.requests.filter(request => request.coachID === coachID);
    },
    hasRequests(_, getters){
        return getters.requests && getters.requests.length > 0;
    }
};