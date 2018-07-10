$(document).ready(function(){
    let query;
    let customUrls;
    let searchSystem;
    let lr;
    let deep;
    let relURL;
    let ajaxURL;
    let key = "21888f1a3a548e104c2599875feb93ec";
    let packet = JSON.parse($.cookie('packet'));
    let statusText = [
        "Ошибка обработки",
        "Обработано",
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

    //Выводим поле для урлов
    $(".wrapper").on("click","input[name='manual_urls']",function() {
            if ($(this).is(':checked')) {
                $(".urls").slideDown();
            } else {
                $(".urls").slideUp();
            }
        });

    //Получить номера заданий
    $(".wrapper").on("submit","form",function (e) {
        e.preventDefault();

        $("#before-load").show();

        let form = $(this);
        let result = 0;

        newPacket = {
            id: Math.floor(Math.random() * 100000),
            data: []
        };

        customUrls = form.find("textarea[name='user_urls']").val();
        searchSystem = form.find("select[name='search_system']").val();
        lr = form.find("select[name='lr']").val();
        deep = form.find("select[name='deep']").val();
        relURL = Number(form.find("input[name='rel_url']").is(":checked"));

        let file = document.getElementById("url");

        uploadFile(file);
    });

    $(".container").on("click", "nav ul li a", handler);

    //Отправка на сервер
    function sendToServer(url, domen){
        let status = 0;

        if (!domen) domen = "Продвигаемый сайт не задан";

        $.ajax({
            url: url,
            type: "GET",
            async: false,
            success: function(data){
                if(data['report_id']){
                    saveReportID(data['report_id']);
                } else if (data['error']) {
                    returnStatus(data['code']);
                } else if (data["response"]){
                    renderResults(data);
                }
            }
        });

        function saveReportID(reportID){
            newPacket.data.push({
                url: domen,
                report_id: reportID,
                status: 2
            });
        }

        function returnStatus(code){
            if (code == 50){
                status = 2;
            }

            return status;
        }

        function renderResults(result){
            $.ajax({
                url: "../results.php",
                data: result,
                type: "POST",
                dataType: "html",
                success: function(data){
                    $(".container:nth-child(2)").html(data);
                }
            });

            status = 1;
        }

        return status;
    }

    //Переключение табов
    function handler(e){
        e.preventDefault();

        let reportID = $(this).data("id");
        let ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
            +key+"&report_id="
            +reportID;

        sendToServer(ajaxURL,null);
    }

    //Загрузка файла
    function uploadFile(file){
        let pattern = "^(http|https):\/\/.*";
        let reader = new FileReader();

        if(file.files.length) {
            reader.onload = function(e)
            {
                let result = e.target.result.split("\r\n");

                if (result){
                    for (let i = 0;i < result.length;i++){
                        let query = result[i].split(";");

                        ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
                            +key+"&url="
                            +query[0]+"&query="
                            +encodeURI(query[1].trim())+"&search_system="
                            +searchSystem+"&lr="
                            +lr+"&deep="
                            +deep+"&rel_url="
                            +relURL;

                        sendToServer(ajaxURL, query[0]);
                    }

                    $.cookie('packet', JSON.stringify(newPacket), {
                        expires: 3
                    });

                    window.location = "/";
                }

            };

            reader.readAsText(file.files[0],"utf-8");
        }
    }
});
