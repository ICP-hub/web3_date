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

const useAuthClient = (options = defaultOptions) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendCanisterId = process.env.CANISTER_ID_DDATE_BACKEND;
  const frontendCanisterId = process.env.CANISTER_ID_DDATE_FRONTEND;

  useEffect(() => {
    const initializeAuthClient = async () => {
      try {
        const client = await AuthClient.create(options.createOptions);
        setAuthClient(client);
        await reloadLogin(client);
      } catch (error) {
        console.error("Failed to create AuthClient:", error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuthClient();
  }, []);

  const login = async (provider) => {
    try {
      if (
        authClient.isAuthenticated() &&
        !(await authClient.getIdentity().getPrincipal().isAnonymous())
      ) {
        await clientInfo(authClient);
      } else {
        const opt = provider === "ii" ? "loginOptionsii" : "loginOptionsnfid";
        await authClient.login({
          ...options[opt],
          onError: (error) => {
            throw new Error(error);
          },
          onSuccess: () => {
            clientInfo(authClient);
          },
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const reloadLogin = async (client = authClient) => {
    try {
      if (
        (await client.isAuthenticated()) &&
        !client.getIdentity().getPrincipal().isAnonymous()
      ) {
        await clientInfo(client);
      }
    } catch (error) {
      console.error("Failed to reload login:", error);
    }
  };

  const clientInfo = async (client) => {
    const isAuthenticated = await client.isAuthenticated();
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    const publicKey = identity._delegation?.publicKey;

    console.log("use client publickey : ",publicKey)

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
    try {
      await authClient?.logout();
      setIsAuthenticated(false);
      setIdentity(null);
      setPrincipal(null);
      setBackendActor(null);
      setPublicKey(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
    loading,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  if (auth.loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication status
  }

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
