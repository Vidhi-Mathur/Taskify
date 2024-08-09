export const ErrorDialog = ({error, onClose}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div className="bg-red-500 px-4 py-2">
                    <h2 className="text-white text-xl font-bold">Error</h2>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 text-base mb-4">{error}</p>
                    <div className="flex justify-end">
                        <button className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:border-white hover:text-white font-semibold px-4 py-2" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}