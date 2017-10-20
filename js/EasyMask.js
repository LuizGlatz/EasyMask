function mask (e) {
	let m = e.getAttribute('mask');
	let v = e.value;
	switch (m) {
		case 'cpf':
			v = v.replace(/\D/g, '');

			if (v.length > 11) {
				v = v.substr(0, 11);
			}

			e.value = (v.length > 9) ? v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4') :
				(v.length > 6) ? v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3') :
				(v.length > 3) ? v.replace(/(\d{3})(\d{1,3})/, '$1.$2') :
				(v.length > 0) ? v : '';
			break;
		case 'cnpj':
			v = v.replace(/\D/g, '');

			if (v.length > 14) {
				v = v.substr(0, 14);
			}

			e.value = (v.length > 12) ? v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5') :
				(v.length > 8) ? v.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4') :
				(v.length > 5) ? v.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3') :
				(v.length > 2) ? v.replace(/(\d{2})(\d{1,3})/, '$1.$2') :
				(v.length > 0) ? v : '';
			break;
		case 'telefone':
			v = v.replace(/\D/g, '');

			if (v.length > 11) {
				v = v.substr(0, 11);
			}

			e.value = (v.length === 11) ? v.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3') :
				(v.length > 6) ? v.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1)$2-$3') :
				(v.length > 2) ? v.replace(/(\d{2})(\d{1,4})/, '($1)$2') :
				(v.length > 0) ? v : '';
			break;
		case 'data':
			v = v.replace(/\D/g, '');

			if (v.length > 8) {
				v = v.substr(0, 8);
			}

			v = maskData(v);

			e.value = (v.length > 4) ? v.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3') :
				(v.length > 2) ? v.replace(/(\d{2})(\d{1,2})/, '$1/$2') :
				(v.length > 0) ? v : '';
			break;
		default:
			console.log('Insira um atributo "mask" no input a ser mascarado.');
	}
}

function ultDiaMes (m) {
	let u;

	if (m == 2) {
		u = 29;
	} else if (m < 8) {
		u = (m % 2 == 0) ? 30 : 31;
	} else {
		u = (m % 2 == 0) ? 31 : 30;
	}

	return u;
}

function maskData (v) {
	let a = new Date();
	let min = a.getFullYear() - 100;
	let max = a.getFullYear() + 100;
	let u;
	let n = '';

	(v[0]) ? n = v[0] : null;

	if (v[1]) {
		if (v.slice(0, 2) > 31) {
			n = '31';
		} else if (v.slice(0, 2) == 0) {
			n = '01';
		} else {
			n += v[1];
		}
	}

	(v[2]) ? n += v[2] : null;

	if (v[3]) {
		if (v.slice(2, 4) > 12) {
			n = n.slice(0, 2) + '12';
		} else if (v.slice(2, 4) == 0) {
			n = n.slice(0, 2) + '01';
		} else {
			n += v[3];
		}

		if (n.slice(0, 2) > ultDiaMes(n.slice(2, 4))) {
			u = ultDiaMes(n.slice(2, 4));
			n = u + n.slice(2, 4);
		}
	}

	(v[4]) ? n += v[4] : null;
	(v[5]) ? n += v[5] : null;
	(v[6]) ? n += v[6] : null;

	if (v[7]) {
		n += v[7];

		if (n.slice(4, 8) < min) {
			n = n.slice(0, 4) + min;
		} else if (n.slice(4, 8) > max) {
			n = n.slice(0, 4) + max;
		}

		if (n.slice(0, 2) == 29 && n.slice(2, 4) == 2 && n.slice(4, 8) % 4 != 0) {
			n = '28' + n.slice(2, 8);
		}
	}

	return n;
}

function digRepetido (digitos) {
	for (let digito of digitos) {
		if (digitos[0] != digito) {
			return false;
		}
	}
	return true;
}

function digCrescente (digitos) {
	return digitos.match(/(123456789)/);
}

function digDecrescente (digitos) {
	return digitos.match(/(987654321)/);
}

function cpfValido (v) {
	if (v.length === 11 && !digRepetido(v) && !digCrescente(v) && !digDecrescente(v)) {
		let r = 0;

		for (let i = 0; i < 9; i++) {
			r += v[i] * (10 - i);
		}
		r = r % 11;
		let x = (r < 2) ? 0 : 11 - r;

		r = 0;
		for (let i = 0; i < 10; i++) {
			r += v[i] * (11 - i);
		}
		r = r % 11;
		let y = (r < 2) ? 0 : 11 - r;

		return (x == v[9] && y == v[10]);
	}

	return false;
}

function cnpjValido (valor) {
	if (valor.length === 14 && !digRepetido(valor) && !digCrescente(valor) && !digDecrescente(valor)) {
		let resto = 0;
		let a = 5;
		for (let i = 0; i < 12; i++) {
			resto += valor[i] * a;

			(a == 2) ? a = 9 : a--;
		}
		resto = resto % 11;
		let x = (resto < 2) ? 0 : 11 - resto;

		a = 6;
		resto = 0;
		for (let i = 0; i < 13; i++) {
			resto += valor[i] * a;

			(a == 2) ? a = 9 : a--;
		}
		resto = resto % 11;
		let y = (resto < 2) ? 0 : 11 - resto;

		return (x == valor[12] && y == valor[13]);
	}

	return false;
}

function validate (e) {
	let m = e.getAttribute('mask');
	let v = e.value;
	switch (m) {
		case 'cpf':
			v = v.replace(/\D/g, '');

			if (cpfValido(v)) {
				e.classList.remove('erro');
				e.classList.add('ok');
			} else {
				e.classList.remove('ok');
				e.classList.add('erro');
			}
			break;
		case 'cnpj':
			v = v.replace(/\D/g, '');

			if (cnpjValido(v)) {
				e.classList.remove('erro');
				e.classList.add('ok');
			} else {
				e.classList.remove('ok');
				e.classList.add('erro');
			}
			break;
		case 'telefone':
			v = v.replace(/\D/g, '');

			if (v.length < 10 || v.length > 11) {
				e.classList.remove('ok');
				e.classList.add('erro');
			} else {
				e.classList.remove('erro');
				e.classList.add('ok');
			}
			break;
		case 'data':
			v = v.split('/');
			d = new Date(v[2], v[1] - 1, v[0]);
			if (v[2].length == 4 && d != 'Invalid Date' && d.getDate() == v[0] && d.getMonth() == v[1] - 1 && d.getFullYear() == v[2]) {
				e.classList.remove('erro');
				e.classList.add('ok');
			} else {
				e.classList.remove('ok');
				e.classList.add('erro');
			}
			break
		default:
			console.log('Insira um atributo "mask" no input a ser validado.');
	}
}