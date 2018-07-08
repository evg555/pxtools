$(document).ready(function(){
    let error = [];
    let packet = JSON.parse($.cookie('packet'));
    let statusText = [
        "Ошибка обработки",
        "Обработанно",
        "В процессе"
    ];
    let statusClass = [
        "error",
        "done",
        "proccess"
    ];
    let newPacket = {
        id: Math.floor(Math.random() * 100000),
        data: []
    };
    let ajaxURL;
    let key = "21888f1a3a548e104c2599875feb93ec";

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
/*
    for (let i = 0; i < 3;i++) {
        newPacket.data.push({
            url: "http://site.com",
            report_id: 333333,
            status: 2
        });
    }

    $.cookie('packet', JSON.stringify(newPacket), {
        expires: 3
    });
*/
    //Обновляем результаты
    $(".refresh").on("click", function (e) {
        e.preventDefault();

        $("#before-load").show();

        let newPacket = {
            id: Math.floor(Math.random() * 100000),
            data: []
        };

        for (let i = 0; i < packet.data.length;i++){
            if(packet.data[i].status == 2){
                let reportID = packet.data[i].report_id;

                ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
                    +key+"&report_id="
                    +reportID;

                let status = sendToServer(ajaxURL);

                newPacket.data.push({
                    url: packet.data[i].url,
                    report_id: packet.data[i].report_id,
                    status: status
                });
            } else {
                newPacket.data.push({
                    url: packet.data[i].url,
                    report_id: packet.data[i].report_id,
                    status: packet.data[i].status,
                });
            }
        }

        $.cookie('packet', JSON.stringify(newPacket), {
            expires: 3
        });

        window.location = "/";
    });

    //Новый запрос
    $(".new_query").on("click", function (e) {
        e.preventDefault();

        $(".wrapper").load("../form.php");
    });

    //Проверить результат
    $(".check_result").on("click", function (e) {
        e.preventDefault();

        $("#before-load").show();

        if(!packet){
            alert("Нет данных для проверки! Сделайте новый запрос!");
        } else {
            ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
                +key+"&report_id="
                +packet.data[0]["report_id"];

            sendToServer(ajaxURL);
        }

        $("#before-load").hide();

        $(".container:nth-child(3)").load("../results.php");
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
    */
});
