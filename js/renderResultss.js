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