export default {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-find-a-coach-3018d-default-rtdb.firebaseio.com/requests/${payload.coachID}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachID = payload.coachID;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context){
        const coachID = context.rootGetters.userID;
        const token = context.rootGetters.token;
        const response = await fetch(`https://vue-find-a-coach-3018d-default-rtdb.firebaseio.com/requests/${coachID}.json?auth=${token}`);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch requests.');
            throw error;
        }

        const requests = [];
        for(const key in responseData){
            const request = {
                id: key,
                coachID,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.unshift(request);
        }

        context.commit('setRequests', requests);
    }
};