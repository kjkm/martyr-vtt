import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Environment } from '../../types/types';

interface EnvironmentState {
  environments: Environment[];
}

const initialState: EnvironmentState = {
  environments: [],
};

const findAndUpdateEnvironment = (environments: Environment[], updatedEnvironment: Environment): Environment[] => {
  return environments.map(env => {
    if (env.id === updatedEnvironment.id) {
      return updatedEnvironment;
    }
    if (env.children) {
      return {
        ...env,
        children: findAndUpdateEnvironment(env.children, updatedEnvironment),
      };
    }
    return env;
  });
};

const environmentSlice = createSlice({
  name: 'environments',
  initialState,
  reducers: {
    addEnvironment: (state, action: PayloadAction<Environment>) => {
      state.environments.push(action.payload);
    },
    updateEnvironment: (state, action: PayloadAction<Environment>) => {
      state.environments = findAndUpdateEnvironment(state.environments, action.payload);
    },
    deleteEnvironment: (state, action: PayloadAction<string>) => {
      const deleteEnvironmentRecursively = (environments: Environment[], id: string): Environment[] => {
        return environments.filter(env => env.id !== id).map(env => ({
          ...env,
          children: env.children ? deleteEnvironmentRecursively(env.children, id) : env.children,
        }));
      };
      state.environments = deleteEnvironmentRecursively(state.environments, action.payload);
    },
    setEnvironments: (state, action: PayloadAction<Environment[]>) => {
      state.environments = action.payload;
    },
    setScreenPosition: (state, action: PayloadAction<{ id: string, screenPosition: { x: number, y: number } }>) => {
      const { id, screenPosition } = action.payload;
      const updateScreenPositionRecursively = (environments: Environment[]): Environment[] => {
        return environments.map(env => {
          if (env.id === id) {
            return { ...env, screenPosition };
          }
          if (env.children) {
            return {
              ...env,
              children: updateScreenPositionRecursively(env.children),
            };
          }
          return env;
        });
      };
      state.environments = updateScreenPositionRecursively(state.environments);
    },
  },
});

export const { addEnvironment, updateEnvironment, deleteEnvironment, setEnvironments, setScreenPosition } = environmentSlice.actions;

export default environmentSlice.reducer;