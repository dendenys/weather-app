function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center p-12">
            <div className="relative">
                <div className="border-4 border-white/20 border-t-white/80 rounded-full w-20 h-20 animate-spin shadow-lg"></div>
                <div className="absolute inset-2 border-3 border-t-blue-200/80 border-blue-200/30 rounded-full w-12 h-12 animate-spin"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="bg-white/60 rounded-full w-3 h-3 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner;


