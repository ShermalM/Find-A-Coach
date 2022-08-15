import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state(){
        return {
            lastFetch: null,
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Shermal',
                    lastName: 'Marasinghe',
                    areas: ['frontend', 'backend', 'career'],
                    description:
                        "I'm Shermal and I'm a Full Stack Developer.",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ]
        };
    },
    mutations,
    actions,
    getters
};