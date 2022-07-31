import type { Component } from 'solid-js';
import { useRoutes } from 'solid-app-router';
import { routes } from './routes'

const App: Component = () => {
  const Route = useRoutes(routes);

  return (
    <div class="flex flex-col items-center">
      <main class="w-full max-w-tablet">
        <Route />
      </main>
    </div>
  );
};

export default App;
