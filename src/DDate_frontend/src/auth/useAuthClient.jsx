import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from '../../.././declarations/DDate_backend/index';
// import Login from '../Auth/Login';
// import Navbar from '../layouts/Navbar';
import WalletModal from '../Components/WalletModal';
import App from '../App';
import HomePage from '../Pages/HomePage';

const AuthContext = createContext();

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    // idleOptions: {
    //   // Set to true if you do not want idle functionality
    //   disableIdle: true,
    // },
    idleOptions: {
      idleTimeout: 1000 * 60 * 30, // set to 30 minutes
      disableDefaultIdleCallback: true, // disable the default reload behavior
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptionsii: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
        // : `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`,
        // :`https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
  },
  loginOptionsnfid: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        // ? "https://identity.ic0.app/#authorize"
        // : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
        ? `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
        : `https://nfid.one/authenticate/?applicationName=my-ic-app#authorize`
  },
};
export const useAuthClient = (options = defaultOptions) => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [backendActor, setBackendActor] = useState(null);

    const backendCanisterId =
        process.env.CANISTER_ID_DDATE_BACKEND ||
        process.env.CANISTER_ID_DDATE_BACKEND;

    const frontendCanisterId =
        process.env.CANISTER_ID_DDATE_FRONTEND ||
        process.env.CANISTER_ID_DDATE_FRONTEND;
        
        useEffect(() => {
          AuthClient.create(options.createOptions).then((client) => {
            setAuthClient(client);
          });
        }, []);
      
      // console.log('authClient',authClient)
        const login = async (val) => {
          // console.log('val',val)
            return new Promise(async (resolve, reject) => {
                try {

                  // console.log("authClient.getIdentity().getPrincipal().isAnonymous() =>>>>>>>>>>",authClient.getIdentity().getPrincipal().isAnonymous());
                  if (
                    authClient.isAuthenticated() &&
                    (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
                      false
                  ) {

                    clientInfo(authClient);
                    resolve(AuthClient);
                  } else {

                // console.log("val=>>>.", val);
                    let opt = val === "ii" ? "loginOptionsii" : "loginOptionsnfid"
          authClient.login({
            ...options[opt],
            onError: (error) => reject(error),
            onSuccess: (val) => {
              clientInfo(authClient);
              resolve(authClient);
            },
          });
                  }
                } catch (error) {
                  console.log('error',error)
                    reject(error);
                }
            });
        };

    const reloadLogin = () => {
      return new Promise(async (resolve, reject) => {
        try {
          if (
            authClient.isAuthenticated() &&
            (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
              false
          ) {
            updateClient(authClient);
            resolve(AuthClient);
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


      // console.log("isAuthenticated",isAuthenticated,"principal",principal, "identity",identity );
      setAuthClient(client);
      setIsAuthenticated(isAuthenticated);
      setIdentity(identity);
      setPrincipal(principal);
        let principalText = principal.toText();

        // console.log("principalText???? ",principalText);
        localStorage.setItem("id",JSON.stringify(principalText))

      if (isAuthenticated && identity && principal && principal.isAnonymous() === false) {
          let backendActor = createActor(backendCanisterId, { agentOptions: { identity: identity, verifyQuerySignatures: false } });
          
          // console.log("backendActor",backendActor);
          setBackendActor(backendActor);
      }

      return true;
  }
    const logout = async () => {
        await authClient?.logout();
    }

    return {
        login, logout, authClient, isAuthenticated, identity, principal, frontendCanisterId, backendCanisterId, backendActor,reloadLogin
    };
}

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();
    if (!auth.isAuthenticated || !auth.backendActor) {
        return (
            <AuthContext.Provider value={auth}>
                <WalletModal/>
                <HomePage/>
            </AuthContext.Provider>
        )
    }
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);