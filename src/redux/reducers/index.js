import {
  SAVE_INSTANCE,
  REMOVE_INSTANCE,
  UPDATE_INSTANCE,
  REMOVE_ALL,
  SAVE_ALL,
  CREATE_FORM,
  UPDATE_FORM,
  REMOVE_BY_KEY,
  CLEAR_FORM,
  CLEAR_MODEL,
} from "../actions/actionType";

export function modelReducer(state = {}, action) {
  const { resource, instance, key } = action;

  switch (action.type) {
    case SAVE_INSTANCE:
      let newState = {};
      if (state[resource.key]) {
        newState = state;
        newState = { ...state, [resource.key]: state[resource.key] };
        return {
          ...state,
          [resource.key]: [...state[resource.key], instance],
        };
      } else {
        newState = { [resource.key]: [instance] };
      }
      return { ...state, ...newState };

    case REMOVE_INSTANCE:
      const remainingDataList = state[resource.key].filter(
        (ins) => ins[resource.uniqueIdentifier] !== instance.id
      );
      return { ...state, [resource.key]: remainingDataList };

    case UPDATE_INSTANCE:
      let updatedState = [];

      if (state[resource.key] && state[resource.key].length) {
        state[resource.key].filter((ins) => {
          if (
            ins[resource.uniqueIdentifier] ===
            instance[resource.uniqueIdentifier]
          ) {
            updatedState.push(instance);
            return;
          }
          updatedState.push(ins);
        });
      } else {
        updatedState = [instance];
      }

      return { ...state, [resource.key]: updatedState };

    case REMOVE_ALL:
      state[resource.key] = [];
      return { ...state };

    case SAVE_ALL:
      state[resource.key] = instance;
      return { ...state };

    case REMOVE_BY_KEY:
      let stateData = state[resource.key];
      delete stateData[key];
      return { ...state, [resource.key]: { ...stateData } };

    case CLEAR_MODEL:
      return {};

    default:
      return state;
  }
}

export function formReducer(state = {}, action) {
  const { formName, object } = action;

  switch (action.type) {
    case CREATE_FORM:
      return { ...state, [formName]: { validation: {}, ...object } };

    case UPDATE_FORM:
      const updatedForm = { ...state[formName], ...object };
      return { ...state, [formName]: updatedForm };

    case CLEAR_FORM:
      return { ...state, [formName]: { validation: {} } };

    default:
      return state;
  }
}
