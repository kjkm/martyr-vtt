import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Environment } from "../../types/types";

interface EnvironmentState {
  environments: Environment[];
  environmentMap: { [id: string]: Environment };
}

const initialState: EnvironmentState = {
  environments: [],
  environmentMap: {},
};

const updateEnvironmentMap = (
  environmentMap: { [id: string]: Environment },
  environment: Environment
) => {
  environmentMap[environment.id] = environment;
  if (environment.children) {
    environment.children.forEach((child) =>
      updateEnvironmentMap(environmentMap, child)
    );
  }
};

const updateEnvironmentInTree = (
  environments: Environment[],
  updatedEnvironment: Environment
): Environment[] => {
  return environments.map((env) => {
    if (env.id === updatedEnvironment.id) {
      return updatedEnvironment;
    }
    if (env.children) {
      return {
        ...env,
        children: updateEnvironmentInTree(env.children, updatedEnvironment),
      };
    }
    return env;
  });
};

const environmentSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    addEnvironment: (state, action: PayloadAction<Environment>) => {
      state.environments.push(action.payload);
      updateEnvironmentMap(state.environmentMap, action.payload);
    },
    updateEnvironment: (state, action: PayloadAction<Environment>) => {
      const updatedEnvironment = action.payload;
      state.environmentMap[updatedEnvironment.id] = updatedEnvironment;
      state.environments = updateEnvironmentInTree(
        state.environments,
        updatedEnvironment
      );
    },
    deleteEnvironment: (state, action: PayloadAction<string>) => {
      const deleteEnvironmentRecursively = (
        environments: Environment[],
        id: string
      ): Environment[] => {
        return environments
          .filter((env) => env.id !== id)
          .map((env) => ({
            ...env,
            children: env.children
              ? deleteEnvironmentRecursively(env.children, id)
              : env.children,
          }));
      };
      state.environments = deleteEnvironmentRecursively(
        state.environments,
        action.payload
      );
      delete state.environmentMap[action.payload];
    },
    setEnvironments: (state, action: PayloadAction<Environment[]>) => {
      state.environments = action.payload;
      state.environmentMap = {};
      action.payload.forEach((env) =>
        updateEnvironmentMap(state.environmentMap, env)
      );
    },
  },
});

export const {
  addEnvironment,
  updateEnvironment,
  deleteEnvironment,
  setEnvironments,
} = environmentSlice.actions;
export default environmentSlice.reducer;