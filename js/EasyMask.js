const mask = elemento => {
	let mascara = elemento.getAttribute('mask')
	let valor = elemento.value
	switch (mascara) {
		case 'cpf':
			valor = valor.replace(/\D/g, '')

			if (valor.length > 11) {
				valor = valor.substr(0, 11)
			}

			elemento.value = (valor.length > 9) ? valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4') :
				(valor.length > 6) ? valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3') :
				(valor.length > 3) ? valor.replace(/(\d{3})(\d{1,3})/, '$1.$2') :
				(valor.length > 0) ? valor : ''
			break
		case 'cnpj':
			valor = valor.replace(/\D/g, '')

			if (valor.length > 14) {
				valor = valor.substr(0, 14)
			}

			elemento.value = (valor.length > 12) ? valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5') :
				(valor.length > 8) ? valor.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4') :
				(valor.length > 5) ? valor.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3') :
				(valor.length > 2) ? valor.replace(/(\d{2})(\d{1,3})/, '$1.$2') :
				(valor.length > 0) ? valor : ''
			break
		case 'telefone':
			valor = valor.replace(/\D/g, '')

			if (valor.length > 11) {
				valor = valor.substr(0, 11)
			}

			elemento.value = (valor.length === 11) ? valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3') :
				(valor.length > 6) ? valor.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1)$2-$3') :
				(valor.length > 2) ? valor.replace(/(\d{2})(\d{1,4})/, '($1)$2') :
				(valor.length > 0) ? valor : ''
			break
		case 'data':
			valor = valor.replace(/\D/g, '')

			if (valor.length > 8) {
				valor = valor.substr(0, 8)
			}

			console.log(valor)
			valor = maskData(valor)
			console.log(valor)
			elemento.value = (valor.length > 4) ? valor.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3') :
				(valor.length > 2) ? valor.replace(/(\d{2})(\d{1,2})/, '$1/$2') :
				(valor.length > 0) ? valor : ''
			break
		default:
			console.log('Insira um atributo "mask" no input a ser mascarado.')
	}
}

const ultDiaMes = mes => {
	let ultimo

	if (mes === '02') {
		ultimo = '29'
	} else if (mes < '08') {
		ultimo = (mes % 2 === 0) ? '30' : '31'
	} else {
		ultimo = (mes % 2 === 0) ? '31' : '30'
	}

	return ultimo
}

const maskData = data => {
	let hoje = new Date()
	let min = (hoje.getFullYear() - 100).toString()
	let max = (hoje.getFullYear() + 100).toString()
	let novaData = ''
	let ultimo

	(data[0]) ? novaData += data[0] : novaData += '';

	if (data[1]) {
		if (data.slice(0, 2) > '31') {
			novaData = '31'
		} else if (data.slice(0, 2) < '01') {
			novaData = '01'
		} else {
			novaData += data[1]
		}
	}

	(data[2]) ? novaData += data[2] : novaData += '';

	if (data[3]) {
		if (data.slice(2, 4) > '12') {
			novaData = novaData.slice(0, 2) + '12'
		} else if (data.slice(2, 4) < '01') {
			novaData = novaData.slice(0, 2) + '01'
		} else {
			novaData += data[3]
		}

		if (novaData.slice(0, 2) > ultDiaMes(novaData.slice(2, 4))) {
			ultimo = ultDiaMes(novaData.slice(2, 4))
			novaData = ultimo + novaData.slice(2, 4)
		}
	}

	(data[4]) ? novaData += data[4] : novaData += '';
	(data[5]) ? novaData += data[5] : novaData += '';
	(data[6]) ? novaData += data[6] : novaData += '';

	if (data[7]) {
		novaData += data[7]

		if (novaData.slice(4, 8) < min) {
			novaData = novaData.slice(0, 4) + min
		} else if (novaData.slice(4, 8) > max) {
			novaData = novaData.slice(0, 4) + max
		}

		if (novaData.slice(0, 2) === '29' && novaData.slice(2, 4) === '02' && novaData.slice(4, 8) % 4 !== 0) {
			novaData = '28' + novaData.slice(2, 8)
		}
	}

	return novaData
}

const digRepetido = digitos => {
	for (let digito of digitos) {
		if (digitos[0] !== digito) {
			return false
		}
	}
	return true
}

const digSequencia = digitos => {
	return digitos.match(/(123456789|987654321)/g)
}

const cpfValido = digitos => {
	if (digitos.length === 11 && !digRepetido(digitos) && !digSequencia(digitos)) {
		let resto = 0

		for (let i = 0; i < 9; i++) {
			resto += digitos[i] * (10 - i)
		}
		resto = resto % 11
		let verificador1 = (r < 2) ? 0 : 11 - r

		resto = 0
		for (let i = 0; i < 10; i++) {
			resto += digitos[i] * (11 - i)
		}
		resto = resto % 11
		let verificador2 = (r < 2) ? 0 : 11 - r

		return verificador1 === parseInt(digitos[9]) && verificador2 === parseInt(digitos[10])
	}

	return false
}

const cnpjValido = digitos => {
	if (digitos.length === 14 && !digRepetido(digitos) && !digSequencia(digitos)) {
		let resto = 0
		let a = 5
		for (let i = 0; i < 12; i++) {
			resto += digitos[i] * a

			(a === 2) ? a = 9 : a--
		}
		resto = resto % 11
		let verificador1 = (resto < 2) ? 0 : 11 - resto

		a = 6
		resto = 0
		for (let i = 0; i < 13; i++) {
			resto += digitos[i] * a

			(a === 2) ? a = 9 : a--
		}
		resto = resto % 11
		let verificador2 = (resto < 2) ? 0 : 11 - resto

		return verificador1 === parseInt(digitos[12]) && verificador2 === parseInt(digitos[13])
	}

	return false
}

const validate = elemento => {
	let mascara = elemento.getAttribute('mask')
	let valor = elemento.value
	switch (mascara) {
		case 'cpf':
			valor = valor.replace(/\D/g, '')

			if (cpfValido(valor)) {
				elemento.classList.remove('erro')
				elemento.classList.add('ok')
			} else {
				elemento.classList.remove('ok')
				elemento.classList.add('erro')
			}
			break
		case 'cnpj':
			valor = valor.replace(/\D/g, '')

			if (cnpjValido(valor)) {
				elemento.classList.remove('erro')
				elemento.classList.add('ok')
			} else {
				elemento.classList.remove('ok')
				elemento.classList.add('erro')
			}
			break
		case 'telefone':
			valor = valor.replace(/\D/g, '')

			if (valor.length < 10 || valor.length > 11) {
				elemento.classList.remove('ok')
				elemento.classList.add('erro')
			} else {
				elemento.classList.remove('erro')
				elemento.classList.add('ok')
			}
			break
		case 'data':
			if (valor.length === 10) {
				elemento.classList.remove('erro')
				elemento.classList.add('ok')
			} else {
				elemento.classList.remove('ok')
				elemento.classList.add('erro')
			}
			break
		default:
			console.log('Insira um atributo "mask" no input a ser validado.')
	}
}