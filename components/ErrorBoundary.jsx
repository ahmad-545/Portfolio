'use client'
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
            <h2 className="font-display text-2xl font-bold text-accent mb-2">Something went wrong</h2>
            <p className="text-white/70 text-sm max-w-md mb-6">An unexpected error occurred while rendering this page.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
              className="bg-accent text-ink font-semibold px-6 py-2.5 rounded-full text-sm"
            >
              Reload Page
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
