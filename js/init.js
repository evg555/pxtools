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
        let urls = {urls:[]};

        e.preventDefault();

        if(!packet){
            alert("Нет данных для проверки! Сделайте новый запрос!");
            return false;
        } else {
            $("#before-load").show();

            for (let i = 0; i < packet.data.length;i++ ){
                urls.urls.push(packet.data[i]["url"]);
            }

            ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
                +key+"&report_id="
                +packet.data[0]["report_id"];
        }

        $("#before-load").hide();

        sendToServer(ajaxURL,null);
    });
});
