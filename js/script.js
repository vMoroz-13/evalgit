const filterByType = (type, ...values) => values.filter(value => typeof value === type),//функция filterByType
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));//получает навый массив со спанами
		responseBlocksArray.forEach(block => block.style.display = 'none');// переберает и скрывает все блоки ответов в спанах
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
		console.log(msgText);
	},
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {//функция принимает аргументы с 45строки
		try {//перехват ошибок
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);//перехват ошибок
		}
	};

const filterButton = document.querySelector('#filter-btn');//получаем по id кнопку

filterButton.addEventListener('click', e => { // слушаем событие на кнопке 'click' получаем event
	const typeInput = document.querySelector('#type'); //получаем по id select
	const dataInput = document.querySelector('#data');//получаем по id input

	if (dataInput.value === '') { //если значение инпута пустое true
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //то появляется сообщение о возникновении пользовательской ошибки
		showNoResults();//запускается функция
	} else { //иначе
		dataInput.setCustomValidity('');//элемент не имеет пользовательской ошибки 
		e.preventDefault();//отменяется события браузера 'перезагруска страницы при нажатии кнопки'
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());//запускается работа основной функции аргументами которой передаются значения выбранного селектора и значение инпута удаляя пробельные символы в начале и конце строки
	}
});

