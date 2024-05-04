import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode 사용 시, 컴포넌트를 2번 렌더링함
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
