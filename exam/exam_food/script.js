let host = 'http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1?api_key=3c7c9da1-b52b-412e-a655-45b26f5ae252';
//задаём переменную которая указывает на JSON файл
let select_res = { //парсинг файла из JSON, т.е. преобразование JSON в строку
	init:function(){
		this.fill_select();
	},
	fill_select:function(){
		let xhr = new XMLHttpRequest(); //метод парсинга
		xhr.open('GET',host,true);//GET - http метод для запросаиз JSON, HOST - самая первая строка в документе где указана ссылка на файл JSON, т.е. откуда будем брать
		xhr.onload = function(){
			let admArea = JSON.parse(xhr.responseText).map(Area => {return Area.admArea;});//записи по локациям из JSON под названием Area переводятся в строки под названием admArea
			(twin(admArea)).forEach(element => {					
				let admAreaarr = document.createElement('option');
				admAreaarr.innerHTML = `${String(element)}`; //преобразование в строку
				document.getElementById('ind_adm').append(admAreaarr);
			});
			let district = JSON.parse(xhr.responseText).map(District => {return District.district;}); //записи по районам из JSON под названием Distcrict переводятся в строки под названием disctrict
			(twin(district)).forEach(element => {					
				let districtarr = document.createElement('option');
				districtarr.innerHTML = `${String(element)}`; //преобразование в строку
				document.getElementById('ind_district').append(districtarr);
			});
			let type = JSON.parse(xhr.responseText).map(Type => {return Type.typeObject;});//записи по типам заведения из JSON под названием Type переводятся в строки под названием typeObject
			(twin(type)).forEach(element => {					
				let typearr = document.createElement('option');
				typearr.innerHTML = `${String(element)}`; //преобразование в строку
				document.getElementById('ind_type').append(typearr);
			});
			
		}
		xhr.send();	
	}
}

select_res.init();

function twin(array){ //функция для удаления, а точнее скрытия одинаковых и пустых записей из JSON (адресса или типо того)
	let result = [];
  
	for (let str of array){
	  if (!result.includes(str)){
		result.push(str);
	  }
	  delete('null');
	}
	return result;
}

function renderRecords(records) { //функция для генерирования записей в формате таблицы, создание столбцов строк и туда данные
    let t = document.getElementById('records').querySelector('tbody');
    let row;
    let td;
    for (record of records) {
        row = document.createElement('tr');
        td = document.createElement('td');
        td.innerHTML = record.name;
        row.append(td); //столбец с названиями
        td = document.createElement('td');
        td.innerHTML = record.typeObject;
        row.append(td); //столбец с типами
        td = document.createElement('td');
        td.innerHTML = record.address;
        row.append(td);  //столбец с адресами 
        t.append(row);
    }
}

function sendRec(method, url, onloadHandler) { //функция чтобы начать парсинг, привязана к кнопке, функция кнопки ниже
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = onloadHandler;
    xhr.send();
}


window.onload = function () {  //кнопка, обрабатывает нажатие
	document.getElementById('find_button').onclick = function(){
		let url = new URL(host);
		sendRec('GET',url, function () {
			renderRecords(this.response);
		})
	}

}
