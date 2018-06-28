$(document).ready(function() {
    let error;
    let packet = JSON.parse($.cookie('packet'));
    let statusText = [
        "Ошибка обработки",
        "Обработанна",
        "В процессе"
    ];
    let statusClass = [
        "error",
        "done",
        "proccess"
    ];

    //Заполняем данные из куков
    if (packet){
        let html = "<div class='results'>";

        for (let i = 0; i < packet.data.length; i++){
            let url = packet.data[i].url;
            let repotID = packet.data[i].report_id;
            let status = packet.data[i].status;

            html += "<div class='results-item'>" +
                            "<div class='url'>"+url+"</div>" +
                            "<div class='report_id'>"+repotID+"</div>" +
                            "<div class='status "+statusClass[status]+"'>"+statusText[status]+"</div>" +
                        "</div>";
        }

        html += "</div>" +
                "<a class='btn refresh' href='/'>Обновить</a>";

        $(".wrapper").append(html);
    }

    //Выводим поле для урлов
    $("input[name='manual_urls']").on("click",function() {
        if ($(this).is(':checked')) {
            $(".urls").slideDown();
        } else {
            $(".urls").slideUp();
        }
    });

    //Новый запрос
    $(".new_query").on("click", function (e) {
        e.preventDefault();

        $(".wrapper").load("../form.php");
    });

    //Проверить результат
    $(".check_result").on("click", function (e) {
        e.preventDefault();

        let key = "9846dbccbcc14eced3c68abf94f1c6a8";

        if(!reportID){
            alert("Нет номера задания!");
            return false;
        }

        $.ajax({
            url:  "https://tools.pixelplus.ru/api/analiztopv2?key="
                    +key+"&report_id="
                    +reportID,
            type: "GET",
            success: function(data){
                if(data['error']){
                    $(".wrapper").load("../error.php");
                }
            }
        });
    });
/*
    let newPacket = {
        id: Math.random(),
        data:[
            {
                url: "http://site.com",
                report_id: 111111,
                status: 1
            },
            {
                url: "http://site.com",
                report_id: 222222,
                status: 2
            }
        ]
    }

    $.cookie('packet', JSON.stringify(newPacket), {
        expires: 3
    });

*/

/*
    let urls = {
        "custom_urls": [
            "http://vernal-travel.ru",
            "http://vernal-travel.ru/lechenie/programi-lecheniya/"
        ]
    };

    let url = document.createElement('a');
    url.href = urls.custom_urls[0];

    $.cookie('domen', url.hostname, {
        expires: 3
    });


    let key = "9846dbccbcc14eced3c68abf94f1c6a8";
    let query = "рак желудка";
    let searchSystem = 1;
    let lr = 213;
    let deep = 5;

    let reportID = 394765;

    $.ajax({
        url:  "https://tools.pixelplus.ru/api/analiztopv2?key="
            +key+"&report_id="
            +reportID,
            /*
            "&query="
            +query+"&search_system="
            +searchSystem+"&lr="
            +lr+"&deep="
            +deep,

        type: "GET",
        success: function(data){
            if(data['report_id']){
                $.cookie('report_id', data['report_id'], {
                    expires: 3
                });
            }
        }
    });

});
*/
});