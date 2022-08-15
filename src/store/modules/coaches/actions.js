export default {
    async registerCoach(context, data){
        const userID = context.rootGetters.userID;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters.token;

        const response = await fetch(`https://vue-find-a-coach-3018d-default-rtdb.firebaseio.com/coaches/${userID}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        if(!response.ok){
            // error
        }

        //const responseData = await response.json();

        context.commit('registerCoach', {
            ...coachData,
            id: userID
        });
    },
    async loadCoaches(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return;
        }

        const response = await fetch('https://vue-find-a-coach-3018d-default-rtdb.firebaseio.com/coaches.json');

        const responseData = await response.json();
        
        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimeStamp');
    }
};