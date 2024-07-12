import { useEffect, useRef, useState } from 'react'

const useAutocompleteSelectAsync = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [position, setPosition] = useState<number>(0)
	const ref = useRef<any>(null)

	useEffect(() => {
		if (open) {
			ref.current?.scrollTo({ top: position + 40 })
		}
	}, [open, position])

	return {
		ref,
		open,
		position,
		setOpen,
		setPosition,
	}
}

export default useAutocompleteSelectAsync
