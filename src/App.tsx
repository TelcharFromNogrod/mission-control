"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import Header from "./components/Header";
import AgentsSidebar from "./components/AgentsSidebar";
import MissionQueue from "./components/MissionQueue";
import LiveFeed from "./components/LiveFeed";
import SignInForm from "./components/SignIn";

export default function App() {
  return (
    <>
      <Authenticated>
        <main className="app-container">
          <Header />
          <AgentsSidebar />
          <MissionQueue />
          <LiveFeed />
        </main>
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </>
  );
}