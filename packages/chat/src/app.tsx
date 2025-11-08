import './app.css';
import { useWllama, WllamaProvider } from './utils/wllama.context';
import { Input } from './components/Input/Input';
import { usePWA } from './utils/usePWA';

export function App() {
  return (
    <WllamaProvider>
      <Main />
    </WllamaProvider>
  )
}

export function Main() {
  const { downloadProgress } = useWllama();
  const { needRefresh, offlineReady, updateServiceWorker } = usePWA();

  return (
    <>
      {downloadProgress.value < 100 && (
        <div style={{
          position: 'fixed',
          top: '12px',
          right: '12px',
          zIndex: 1000,
          background: '#40414f',
          padding: '12px 18px',
          borderRadius: '12px',
          color: '#ffffff',
          fontSize: '14x'
        }}>
          <progress id="file" value={downloadProgress} max="100" style={{ marginRight: '12px' }}>
            {downloadProgress}%
          </progress>
          <span>Downloading: {downloadProgress}%</span>
        </div>
      )}
      {needRefresh && (
        <div style={{
          position: 'fixed',
          bottom: '12px',
          right: '12px',
          zIndex: 1000,
          background: '#40414f',
          padding: '12px 18px',
          borderRadius: '12px',
          color: '#ffffff',
          fontSize: '14px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <span>New content available, click on reload button to update.</span>
          <button
            onClick={() => updateServiceWorker(true)}
            style={{
              background: '#10a37f',
              border: 'none',
              borderRadius: '6px',
              color: '#ffffff',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload
          </button>
        </div>
      )}
      {offlineReady && (
        <div style={{
          position: 'fixed',
          bottom: '12px',
          right: '12px',
          zIndex: 1000,
          background: '#10a37f',
          padding: '12px 18px',
          borderRadius: '12px',
          color: '#ffffff',
          fontSize: '14px'
        }}>
          App ready to work offline
        </div>
      )}
      <Input />
    </>
  )
}
