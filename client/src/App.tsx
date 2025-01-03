import { config } from './config/env'

function App() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold">{config.app.name}</h1>
        <div className="mt-4 text-muted-foreground">
          <p>Version: {config.app.version}</p>
          <p>Environment: {config.app.environment}</p>
          <p>API URL: {config.apiUrl}</p>
        </div>
      </div>
    </main>
  )
}

export default App