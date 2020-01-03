//показать/убрать фильтр
function showFilter() {
	if (!$('#filter').hasClass('showFilter')) {
		$('#filter').addClass('showFilter');
	}
	else {
		$('#filter').removeClass('showFilter');
	}
}

//машина едет
function move() {
    $('#backWheel').removeClass('wheelAnimationFaster');
    $('#frontWheel').removeClass('wheelAnimationFaster');
    $('#sea').removeClass('seaAnimationFaster');
    $('#ground').removeClass('groundAnimationFaster');
    $('#road').removeClass('roadAnimationFaster');

    $('#backWheel').addClass('wheelAnimation');
	$('#frontWheel').addClass('wheelAnimation');
	$('#sea').addClass('seaAnimation');
	$('#ground').addClass('groundAnimation');
	$('#road').addClass('roadAnimation');
}

//машина стоит
function stop() {
    $('#backWheel').removeClass('wheelAnimationFaster');
    $('#frontWheel').removeClass('wheelAnimationFaster');
    $('#sea').removeClass('seaAnimationFaster');
    $('#ground').removeClass('groundAnimationFaster');
    $('#road').removeClass('roadAnimationFaster');

    $('#backWheel').removeClass('wheelAnimation');
    $('#frontWheel').removeClass('wheelAnimation');
    $('#sea').removeClass('seaAnimation');
    $('#ground').removeClass('groundAnimation');
    $('#road').removeClass('roadAnimation');
}

//машина едет быстрее
function faster() {
    $('#backWheel').addClass('wheelAnimationFaster');
    $('#frontWheel').addClass('wheelAnimationFaster');
    $('#sea').addClass('seaAnimationFaster');
    $('#ground').addClass('groundAnimationFaster');
    $('#road').addClass('roadAnimationFaster');
}

//запись данных из json в переменную
let json = (function () {
    let json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'script/test.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json.disk;
})();

//вывести все данные из json при загрузке страницы
$.getJSON('script/test.json', function(data) {
	let defaultHtmlRender='';
    $(data.disk).each(function(index, item) {
        defaultHtmlRender += '<div class="wheelItem">';
        defaultHtmlRender += '<img src="' + item.image + '" class="wheelPicture">';
        defaultHtmlRender += '<div class="wheelDescription">';
        defaultHtmlRender += '<p class="wheelPrice wheelName">' + item.name + '</p>';
        defaultHtmlRender += '<div class="typeSize">';
        defaultHtmlRender += '<p class="typeSizeName">' + item.type + '</p>';
        defaultHtmlRender += '<p id="diskSize" class="typeSizeName">' + item.size + "'</p>";
        defaultHtmlRender += '</div>';
        defaultHtmlRender += '<p class="wheelPrice">' + item.price + ' &#36;</p>';
        defaultHtmlRender += '</div>';
        defaultHtmlRender += '<div class="wheelMask">';
        defaultHtmlRender += '</div>';
        defaultHtmlRender += '</div>';
    });
    $('#wheelsContainer').append(defaultHtmlRender);

    //рендер селекта имени из json
    //запись в пустой массив значений из subname из json
    let arrayForSelectName = [];
    $(data.disk).each(function(index, item) {
        arrayForSelectName.push(item.subname);
    });
    //убрать повторяющиеся значения из массива и упорядочить по алфавиту
    let cleanArrayForSelectName = [...new Set(arrayForSelectName)].sort();
    //формирование селекта имени
    let selectNameOption = '';
    $(cleanArrayForSelectName).each(function(index, item) {
        selectNameOption += '<option value="' + item + '">' + item + '</option>';
    });
    $('#nameSelect').append(selectNameOption);

    // //рендер селекта цены из json
    // //запись в пустой массив значений из price из json
    // let arrayForSelectPrice = [];
    // $(data.disk).each(function(index, item) {
    //     arrayForSelectPrice.push(item.price);
    // });
    // //убрать повторяющиеся значения из массива и упорядочить по возрастанию
    // let cleanArrayForSelectPrice = [...new Set(arrayForSelectPrice)].sort((a, b) => a - b);
    //
    // console.log(cleanArrayForSelectPrice);

    //рендер чекбоксов размера из json
    //запись в пустой массив значений size из json
    let arrayForCheckboxSize = [];
    $(data.disk).each(function(index, item) {
        arrayForCheckboxSize.push(item.size);
    });
    //убрать повторяющиеся значения из массива и упорядочить по возрастанию
    let cleanArrayForCheckboxSize = [...new Set(arrayForCheckboxSize)].sort((a, b) => a - b);
    //формирование списка размеров
    let firstListSizeCheckbox = '';
    let secondListSizeCheckbox = '';
    $(cleanArrayForCheckboxSize).each(function(index, item) {
        //для первых двух элементов
        if (index < 2) {
            firstListSizeCheckbox += '<li><label><input type="checkbox" value="' + item +
                '"><p> ' + item + "'</p></label></li>";
        }
        //для остальных элементов
        if (index > 1) {
            secondListSizeCheckbox += '<li><label><input type="checkbox" value="' + item +
                '"><p> ' + item + "'</p></label></li>";
        }
    });
    $('#firstListPart').append(firstListSizeCheckbox);
    $('#secondListPart').append(secondListSizeCheckbox);

    //рендер чекбоксов типа из json
    //запись в пустой массив значений type из json
    let arrayForCheckboxType = [];
    $(data.disk).each(function(index, item) {
        arrayForCheckboxType.push(item.type);
    });
    //убрать повторяющиеся значения из массива и упорядочить по возрастанию
    let cleanArrayForCheckboxType = [...new Set(arrayForCheckboxType)].sort();
    //формирование списка типов
    let listTypeCheckbox = '';
    $(cleanArrayForCheckboxType).each(function(index, item) {
        listTypeCheckbox += '<li><label><input type="checkbox" value="' + item + '"><p> ' +
             item + '</p></label></li>';
    });
    $('#typeWheel').append(listTypeCheckbox);

    //функция получает ссылку и размер кликнутой картинки
    $('.wheelItem ').click(
        function () {
            let pictureLink = $(this).find('img').attr('src');
            let pictureSize = parseInt($(this).find('#diskSize').html());
            if (pictureSize === 15) {
                $('.stopBackDisk').css('transform', 'scale(1)');
                $('.stopForwardDisk').css('transform', 'scale(1)');
                $('.checkedWheel').css('transform', 'scale(1)');
            }
            if (pictureSize === 16) {
                $('.stopBackDisk').css('transform', 'scale(1.15)');
                $('.stopForwardDisk').css('transform', 'scale(1.15)');
                $('.checkedWheel').css('transform', 'scale(1.15)');
            }
            if (pictureSize === 17) {
                $('.stopBackDisk').css('transform', 'scale(1.25)');
                $('.stopForwardDisk').css('transform', 'scale(1.25)');
                $('.checkedWheel').css('transform', 'scale(1.25)');
            }
            if (pictureSize === 18) {
                $('.stopBackDisk').css('transform', 'scale(1.35)');
                $('.stopForwardDisk').css('transform', 'scale(1.35)');
                $('.checkedWheel').css('transform', 'scale(1.35)');
            }
            $('#checkedBackWheel').attr('src', pictureLink);
            $('#checkedFrontWheel').attr('src', pictureLink);
        })
})

//функция фильтрации селекта имени
var selectedName = function () {
    var nameArray = [];
    if ($('#nameSelect').val() == '') {
        var nameArray = json;
    }
    else {
        json.forEach(function(i){
            if (i.name.split(' ')[0] == $('#nameSelect').val()) {
                nameArray.push(i);
            }
        })
    }
    return nameArray
}

//функция фильтрации селекта цены
var selectedPrice = function () {
    var priceArray = [];
    var minPrice = +$('#namePrice option:selected').attr('data-min');
    var maxPrice = +$('#namePrice option:selected').attr('data-max');
    if ($('#namePrice').val() == '') {
        var priceArray = selectedName();
    }
    else {
        selectedName().forEach(function(i){
            if (i.price >= minPrice && i.price <= maxPrice) {
                priceArray.push(i);
            }
        })
    }
    return priceArray
}

//функция фильтрации по размеру
var selectedSize = function () {
    var sizeArray = [];
    var sizeValue = [];
    $('#sizeWheel input[type=checkbox]').each(
        function () {
            if (this.checked) {
                sizeValue.push(+$(this).val());
            }
    })
    if (sizeValue.length > 0) {
        selectedPrice().forEach(function (i) {
            if (sizeValue.includes(i.size)) {
                sizeArray.push(i);
            }
        })
    }
    else {sizeArray = selectedPrice()}
    return sizeArray;
}

//функция фильтрации по типу
var selectedType = function () {
    var typeArray = [];
    var typeValue = [];
    $('#typeWheel input[type=checkbox]').each(
        function () {
            if (this.checked) {
                typeValue.push($(this).val());
            }
        })
    if (typeValue.length > 0) {
        selectedSize().forEach(function (i) {
            if (typeValue.includes(i.type)) {
                typeArray.push(i);
            }
        })
    }
    else {typeArray = selectedSize()}
    return typeArray;
}

//убрать фильтр после фильтрации
function hideFilter() {
    $('#filter').removeClass('showFilter');
}

//функция фильтрации по всем параметрам из результатов всех функций фильтра
$('#applyButton').on('click', function (e) {
    e.preventDefault();
    selectedName();
    selectedPrice();
    selectedSize();
    selectedType();

    //создание массива из объектов для отмеченных элементов фильтра
    json.map(function (item) {
        let filteredHtmlRender = '';
        let noResult = '<div id="noMatches" class="noMatches">No matches</div>';
        $(selectedType()).each(function (index, item) {
            filteredHtmlRender += '<div class="wheelItem">';
            filteredHtmlRender += '<img src="' + item.image + '" class="wheelPicture">';
            filteredHtmlRender += '<div class="wheelDescription">';
            filteredHtmlRender += '<p class="wheelPrice wheelName">' + item.name + '</p>';
            filteredHtmlRender += '<div class="typeSize">';
            filteredHtmlRender += '<p class="typeSizeName">' + item.type + '</p>';
            filteredHtmlRender += '<p id="diskSize" class="typeSizeName">' + item.size + "'</p>";
            filteredHtmlRender += '</div>';
            filteredHtmlRender += '<p class="wheelPrice">' + item.price + ' &#36;</p>';
            filteredHtmlRender += '</div>';
            filteredHtmlRender += '<div class="wheelMask">';
            filteredHtmlRender += '</div>';
            filteredHtmlRender += '</div>';
        });
        $('#wheelsContainer').html(filteredHtmlRender);

        if (selectedType().length == 0) {
            $('#wheelsContainer').html(noResult);
        }
        setTimeout(hideFilter, 500)
        
        $('.wheelItem ').click(
            function () {
                let pictureLink = $(this).find('img').attr('src');
                let pictureSize = parseInt($(this).find('#diskSize').html());
                if (pictureSize === 15) {
                    $('.stopBackDisk').css('transform', 'scale(1)');
                    $('.stopForwardDisk').css('transform', 'scale(1)');
                    $('.checkedWheel').css('transform', 'scale(1)');
                }
                if (pictureSize === 16) {
                    $('.stopBackDisk').css('transform', 'scale(1.15)');
                    $('.stopForwardDisk').css('transform', 'scale(1.15)');
                    $('.checkedWheel').css('transform', 'scale(1.15)');
                }
                if (pictureSize === 17) {
                    $('.stopBackDisk').css('transform', 'scale(1.25)');
                    $('.stopForwardDisk').css('transform', 'scale(1.25)');
                    $('.checkedWheel').css('transform', 'scale(1.25)');
                }
                if (pictureSize === 18) {
                    $('.stopBackDisk').css('transform', 'scale(1.35)');
                    $('.stopForwardDisk').css('transform', 'scale(1.35)');
                    $('.checkedWheel').css('transform', 'scale(1.35)');
                }
                $('#checkedBackWheel').attr('src', pictureLink);
                $('#checkedFrontWheel').attr('src', pictureLink);
            })
    })
})