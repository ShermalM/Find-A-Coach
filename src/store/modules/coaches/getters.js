export default {
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters){
        const coaches = getters.coaches;
        const userID = rootGetters.userID;
        return coaches.some(coach => coach.id === userID);
    },
    shouldUpdate(state){
        const lastFetch = state.lastFetch;
        if(!lastFetch){
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;      // Checking if the last fetch time is more than a minute ago 
    }
};