import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Trash2, Lock } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Passwort: "dafz_r7" (kannst du ändern)
    if (password === 'dafz_r7') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort!');
      setPassword('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-lg shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-red-600" />
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isAuthenticated ? (
            // Login Form
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleLogin}
              className="mx-auto max-w-md space-y-6"
            >
              <div className="text-center">
                <Lock className="mx-auto h-16 w-16 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Zugriff beschränkt
                </h3>
                <p className="text-gray-400">
                  Bitte gib dein Passwort ein
                </p>
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full rounded-lg bg-zinc-800 px-4 py-3 text-white placeholder-gray-500 outline-none ring-2 ring-transparent transition-all focus:ring-red-600"
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
              >
                Anmelden
              </button>

              <p className="text-center text-sm text-gray-500">
                Drücke ESC zum Schließen
              </p>
            </motion.form>
          ) : (
            // Admin Dashboard
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Upload Section */}
              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">
                  Fotos hochladen
                </h3>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800/50 p-8 transition-all hover:border-red-600 hover:bg-zinc-800">
                  <Upload className="mb-4 h-12 w-12 text-gray-400" />
                  <span className="mb-2 text-lg font-medium text-white">
                    Klicke zum Hochladen
                  </span>
                  <span className="text-sm text-gray-400">
                    PNG, JPG, WEBP bis zu 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    Hochgeladene Fotos ({uploadedImages.length})
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {uploadedImages.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative aspect-video overflow-hidden rounded-lg"
                      >
                        <img
                          src={img}
                          alt={`Upload ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white transition-transform hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 p-4">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Hinweis:</strong> Die hochgeladenen
                  Fotos werden nur in deiner aktuellen Session gespeichert. Um sie
                  dauerhaft zu speichern, musst du sie manuell in den{' '}
                  <code className="rounded bg-zinc-900 px-1 py-0.5 text-red-400">
                    /public/photos
                  </code>{' '}
                  Ordner kopieren.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
