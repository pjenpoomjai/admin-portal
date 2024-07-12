const convertFunctionToAsyncTask = (callback: () => void) => {
	setTimeout(() => {
		callback()
	}, 1)
}

export default convertFunctionToAsyncTask
