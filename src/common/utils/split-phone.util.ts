export function splitPhone(phone: number | string): [number, number] {
	let stringifiedPhone = phone

	if (typeof stringifiedPhone === 'number') {
		stringifiedPhone = String(phone)
	}

	const dddPhone = +stringifiedPhone.substring(0, 2)
	const fullPhone = +stringifiedPhone.substring(2, stringifiedPhone.length)

	return [dddPhone, fullPhone]
}
