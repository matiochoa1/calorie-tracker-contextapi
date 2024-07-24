import { Activity } from "../types"

// Type de acciones que describe lo que pasa en nuestro reducer
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' } 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities? JSON.parse(activities) : []
}

// Estado inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(), // inicia como un array vacio y conforme el usuario va llenando el formulario se va actualizando
    activeId: ''
}

// Reducer
export const activityReducer = (
    state: ActivityState = initialState, // de esta manera el reducer sabe que ese estado es el que tiene que estar registrado
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        // Este codigo maneja la lógica para actualizar el state
        let updatedActivities : Activity[] = []
        if (state.activeId) {
            updatedActivities = state.activities.map(activity => activity.id === state.activeId? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
           ...state, // de esa forma mantiene lo que ya tenemos en el state previamente
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (action.type ==='set-activeId') {
        // Este codigo maneja la lógica para actualizar el state
        return {
           ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {
        // Este codigo maneja la lógica para actualizar el state
        return {
           ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id),
            activeId: ''
        }
    }

    if (action.type ==='restart-app') {
        // Este codigo maneja la lógica para actualizar el state
        return {
            activities: [],
            activeId: ''
        }
    }

    return state

}