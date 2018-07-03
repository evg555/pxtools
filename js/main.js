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

    //Переключение табов
    $(".container").on("click", "nav ul li a", function(e){
        e.preventDefault();

        let url = $(this).val();

        renderData(url);
    });

    //Рендеринг таблицы
    function renderData(url){
        let result = {
            "request": {
                "query": "заданный_запрос",
                "lr": "213",
                "deep": "5",
                "url": "заданный_url",
                "user_urls": "пользовательские_url",
                "search_system": "id_поисковой_системы"
            },
            "response": {
                "user_data": {
                    "text_volume": {
                        "words": 879,
                        "symbols": 6870
                    },
                    "query_in_text_exact": 0,
                    "query_words_in_text_percent": [
                        {
                            "word": "слово",
                            "percent": 1
                        }
                    ],
                    "query_words_in_title": [
                        {
                            "words": "слово",
                            "count": 1
                        }
                    ],
                    "query_words_in_anchors": [
                        {
                            "word": "слово",
                            "count": 10
                        }
                    ],
                    "hlwords_in_text": [
                        {
                            "word": "слово",
                            "percent": 1
                        },
                        {
                            "word": "слово2",
                            "percent": 0.8
                        }
                    ],
                    "popular_words": [
                        "слово1",
                        "слово2",
                        "слово3",
                        "слово4",
                        "слово5",
                        "слово6",
                        "слово7"
                    ],
                    "rel_docs_by_title": 86,
                    "title_volume": {
                        "words": 442,
                        "symbols": 7785
                    },
                    "tcy": 0,
                    "https": true,
                    "8800": true
                },
                "top_data": {
                    "text_volume": {
                        "text_volume": {
                            "words": 879,
                            "symbols": 6870
                        },
                        "query_in_text_exact": 5,
                        "query_words_in_text_percent": [
                            {
                                "word": "слово",
                                "percent": 1
                            }
                        ],
                        "query_words_in_title": [
                            {
                                "words": "слово",
                                "count": 1
                            }
                        ],
                        "query_words_in_anchors": [
                            {
                                "word": "слово",
                                "count": 10
                            }
                        ],
                        "hlwords_in_text": [
                            {
                                "word": "слово",
                                "percent": 1
                            },
                            {
                                "word": "слово2",
                                "percent": 0.8
                            }
                        ],
                        "popular_words": [
                            "слово1",
                            "слово2",
                            "слово3",
                            "слово4",
                            "слово5",
                            "слово6",
                            "слово7"
                        ],
                        "rel_docs_by_title": "1338",
                        "title_volume": {
                            "words": 19,
                            "symbols": 140
                        },
                        "tcy": "375",
                        "8800": 75,
                        "https": true
                    },
                    "advanced_data": {
                        "query": "запрос",
                        "rel_url": "Релвантный url",
                        "rel_url_current_position": 21,
                        "rel_url_age": "Возраст релевантного url",
                        "reoptimization": "0%",
                        "analized_url": "Проанализированный url",
                        "analized_url_age": "Возраст проанализированного url"
                    },
                    "analized_urls": [
                        "url1",
                        "url2",
                        "url3",
                        "url4",
                        "url5"
                    ]
                }
            }
        }

        $.ajax({
            url: "../results.php",
            data: result,
            type: "POST",
            dataType: "html",
            success: function(data){
                $(".container:nth-child(2)").html(data);
            }
        });
    };


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