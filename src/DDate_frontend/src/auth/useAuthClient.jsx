import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../declarations/DDate_backend/index";
import WalletModal from "../Components/WalletModal";
import HomePage from "../Pages/HomePage";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      idleTimeout: 1000 * 60 * 30,
      disableDefaultIdleCallback: true,
    },
  },
  loginOptionsii: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
  },
  loginOptionsnfid: {
    identityProvider: `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [publicKey, setPublicKey] = useState(null);

  const backendCanisterId = process.env.CANISTER_ID_DDATE_BACKEND;
  const frontendCanisterId = process.env.CANISTER_ID_DDATE_FRONTEND;

  useEffect(() => {
    AuthClient.create(options.createOptions).then((client) => {
      setAuthClient(client);
      reloadLogin(client); // Call reloadLogin here
    });
  }, []);

  const login = async (val) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          !(await authClient.getIdentity().getPrincipal().isAnonymous())
        ) {
          clientInfo(authClient);
          resolve(authClient);
        } else {
          const opt = val === "ii" ? "loginOptionsii" : "loginOptionsnfid";
          authClient.login({
            ...options[opt],
            onError: reject,
            onSuccess: () => {
              clientInfo(authClient);
              resolve(authClient);
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const reloadLogin = (client = authClient) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          client.isAuthenticated() &&
          !(await client.getIdentity().getPrincipal().isAnonymous())
        ) {
          clientInfo(client);
          resolve(client);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const clientInfo = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    const publicKey = identity._delegation.publicKey;

    setAuthClient(client);
    setIsAuthenticated(isAuthenticated);
    setIdentity(identity);
    setPrincipal(principal);
    setPublicKey(publicKey);

    if (isAuthenticated && identity && principal && !principal.isAnonymous()) {
      const backendActor = createActor(backendCanisterId, {
        agentOptions: { identity, verifyQuerySignatures: false },
      });
      setBackendActor(backendActor);
    }

    return true;
  };

  const logout = async () => {
    await authClient?.logout();
  };

  return {
    login,
    logout,
    authClient,
    isAuthenticated,
    identity,
    principal,
    frontendCanisterId,
    backendCanisterId,
    backendActor,
    reloadLogin,
    publicKey,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  if (!auth.isAuthenticated || !auth.backendActor) {
    return (
      <AuthContext.Provider value={auth}>
        <WalletModal />
        <HomePage />
      </AuthContext.Provider>
    );
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
