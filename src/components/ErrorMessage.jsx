import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
    return (
        <div className="bg-red-600/20 backdrop-blur-xl p-8 border border-red-400/20 rounded-3xl shadow-lg animate-fadeIn">
            <div className="flex items-center space-x-4 mb-4">
                <div className="bg-red-500/20 p-3 rounded-full">
                    <AlertCircle className="w-6 h-6 text-red-300" />
                </div>
                <h3 className="font-semibold text-white text-xl">Oops! Something went wrong</h3>
            </div>
            <p className="mb-6 text-white/80 leading-relaxed">{message}</p>
            {onRetry && (
                <button
                    className="flex items-center space-x-3 bg-gradient-to-r from-red-500/30 to-red-600/30 hover:from-red-500/50 hover:to-red-600/50 px-6 py-3 rounded-2xl text-white font-medium shadow-md transition-all duration-300 hover:scale-105"
                    onClick={onRetry}
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Try Again</span>
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;

