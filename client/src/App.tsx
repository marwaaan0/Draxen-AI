import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

function App() {
  const { user, login, logout, isLoading } = useAuth()
  const { toast } = useToast()
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Check authentication status on mount
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Verify token validity here
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ prompt })
      })

      if (!response.ok) throw new Error('Failed to generate response')
      
      const data = await response.json()
      setResponse(data.response)
      toast({
        title: 'Success',
        description: 'Response generated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate response',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Card className="p-6 w-[400px]">
          <h1 className="text-2xl font-bold mb-4">Welcome to Draxen AI</h1>
          <p className="text-muted-foreground mb-4">Please login to continue</p>
          <Button 
            className="w-full" 
            onClick={() => login()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Login with Google
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Draxen AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-10">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="space-y-4">
            <Input
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Generate Response
            </Button>
          </div>
        </form>

        {response && (
          <Card className="mt-8 p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold mb-2">Response:</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{response}</p>
          </Card>
        )}
      </div>
    </main>
  )
}

export default App
