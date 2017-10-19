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

function cpfRepetido (v) {
	return v[0] == v[1] && v[1] == v[2] && v[2] == v[3] && v[3] == v[4] && v[4] == v[5] &&
		v[5] == v[6] && v[6] == v[7] && v[7] == v[8] && v[8] == v[9] && v[9] == v[10];
}

function cpfValido (v) {
	if (v.length === 11 && !cpfRepetido(v)) {
		let r = 0;

		for (let i = 0; i < 9; i++) {
			r += v[i] * (10 - i);
		}
		r = r % 11;
		let x = (r === 0 || r === 1) ? 0 : 11 - r;

		r = 0;
		for (let i = 0; i < 10; i++) {
			r += v[i] * (11 - i);
		}
		r = r % 11;
		let y = (r === 0 || r === 1) ? 0 : 11 - r;

		return (x == v[9] && y == v[10]);
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
			if (d != 'Invalid Date' && d.getDate() == v[0] && d.getMonth() == v[1] - 1 && d.getFullYear() == v[2]) {
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