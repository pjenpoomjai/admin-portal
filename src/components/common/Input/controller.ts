import { useCallback, useState } from 'react'

const useInput = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const onClickShowPassword = useCallback(() => {
		setShowPassword((prevState) => !prevState)
	}, [])

	const onMouseDownPassword = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
		},
		[],
	)

	return {
		showPassword,
		onClickShowPassword,
		onMouseDownPassword,
	}
}

export default useInput
