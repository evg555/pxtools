$(document).ready(function() {
    let key = "9846dbccbcc14eced3c68abf94f1c6a8";
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
    $(".wrapper").on("click","input[name='manual_urls']",function() {
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

    //Получить номера заданий
    $(".wrapper").on("submit","form",function (e) {
        e.preventDefault();

        let form = $(this);

        let query = form.find("input[name='query']").val();
        let customUrls = form.find("textarea[name='user_urls']").val();
        let searchSystem = form.find("select[name='search_system']").val();
        let lr = form.find("select[name='lr']").val();
        let deep = form.find("select[name='deep']").val();
        let relURL = Number(form.find("input[name='rel_url']").is(":checked"));

        let file = document.getElementById("url");

        if(file.files.length)
        {
            let reader = new FileReader();

            reader.onload = function(e)
            {
                let result = e.target.result.split("\n");
                let pattern = "^(http|https):\/\/.*";
                let newPacket = {
                    id: Math.floor(Math.random() * 100000),
                    data: []
                };

                for (let i = 0;i < result.length;i++){
                    if(result[i].match(pattern)){
                        let url = result[i];


                        newPacket.data.push({
                            url: url,
                            report_id: 111111,
                            status: 2
                        });

                        /*TODO: Проблема с задержкой ответов от API
                        $.ajax({
                            url:  "https://tools.pixelplus.ru/api/analiztopv2?key="
                            +key+"&url="
                            +url+"&query="
                            +query+"&search_system="
                            +searchSystem+"&lr="
                            +lr+"&deep="
                            +deep+"&rel_url="
                            +relURL,
                            type: "GET",
                            success: function(data){
                                if(data['report_id']){
                                    newPacket.data.push({
                                        url: url,
                                        report_id: data['report_id'],
                                        status: 2
                                    });
                                }
                            }
                        });
                        */
                    }
                }

                $.cookie('packet', JSON.stringify(newPacket), {
                    expires: 3
                });
            };

            reader.readAsBinaryString(file.files[0]);
        }

        window.location = "/";
    });

    //Обновляем результаты
    $(".refresh").on("click", function (e) {
        e.preventDefault();

        let newPacket = {
            id: Math.floor(Math.random() * 100000),
            data: []
        };

        for (let i = 0; i < packet.data.length;i++){
            if(packet.data[i].status == 2){
                let reportID = packet.data[i].report_id;

                newPacket.data.push({
                    url: packet.data[i].url,
                    report_id: 333333,
                    status: 2
                });


                /*TODO: Проблема с задержкой ответов от API
                $.ajax({
                    url:  "https://tools.pixelplus.ru/api/analiztopv2?key="
                    +key+"&report_id="
                    +reportID,
                    type: "GET",
                    success: function(data){
                        if(data['report_id']){
                            newPacket.data.push({
                                url: packet.data[i].url,
                                report_id: data['report_id'],
                                status: 2
                            });
                        }
                    }
                });
                */
            }
        }

        $.cookie('packet', JSON.stringify(newPacket), {
            expires: 3
        });

        window.location = "/";

        //console.log(newPacket);
    });

    //Проверить результат
    $(".check_result").on("click", function (e) {
        e.preventDefault();

        $(".container:nth-child(2)").load("../results.php");
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