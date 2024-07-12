type SelectorType = () => unknown

export const getMockContextConsumer = (
	name: string,
	executors: Record<string, SelectorType>,
) => {
	const executorResult = executors[name]?.()
	return executorResult ?? {}
}
