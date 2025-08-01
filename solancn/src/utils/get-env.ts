import Configstore from "configstore";

const config = new Configstore("solancn");

export const getEnv = () => config.get("env") as string | undefined;
export const setEnv = (env: string) => config.set("env", env);
export const clearAll = () => config.clear();

export const login = async (env: string) => {
  try {
    setEnv(env);
    return "Logged in ✅";
  } catch (error) {
    return;
  }
};
