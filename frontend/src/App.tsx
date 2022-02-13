import { signIn, signOut, sayHello } from "./near/index";
import { useState } from "react";

type RequestState = "initialized" | "loading" | "loaded" | "error";

export const App = ({ currentUser }: any) => {
  const [name, setName] = useState("");

  const [helloState, setHelloState] = useState<{
    state: RequestState;
    message: string;
  }>({ state: "initialized", message: "" });

  if (!currentUser) {
    return <button onClick={signIn}>Log in to say hello</button>;
  }

  if (helloState.state === "loading") {
    return <div>loading your hello</div>;
  }

  if (helloState.state === "loaded") {
    return (
      <div>
        here is what we had to say: <h2>{helloState.message}</h2>
      </div>
    );
  }

  if (helloState.state === "error") {
    return <div>oh no. something went wrong. yolo</div>;
  }

  return (
    <div>
      <label>
        what is your name
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button
        onClick={() => {
          setHelloState({ state: "loading", message: "" });

          (async () => {
            try {
              const message = await sayHello(name);
              setHelloState({ state: "loaded", message });
            } catch (e) {
            console.log(e)
              setHelloState({
                state: "error",
                message: "something went wrong!"
              });
            }
          })();
        }}
      >
        say hello to me
      </button>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};
