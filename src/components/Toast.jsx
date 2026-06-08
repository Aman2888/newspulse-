import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const remove = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
        {toasts.map(toast => (
          <div key={toast.id} className="toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-body font-medium"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
            {toast.type === 'success'
              ? <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              : <AlertCircle size={16} className="text-red-500 flex-shrink-0" />}
            <span>{toast.message}</span>
            <button onClick={() => remove(toast.id)} className="ml-1 opacity-50 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
