let query;
let customUrls;
let searchSystem;
let lr;
let deep;
let relURL;
let wrapper = $(".wrapper");
let ajaxURL;

//Выводим поле для урлов
wrapper.on("click","input[name='manual_urls']",function() {
    if ($(this).is(':checked')) {
        $(".urls").slideDown();
    } else {
        $(".urls").slideUp();
    }
});

//Получить номера заданий
wrapper.on("submit","form",function (e) {
    e.preventDefault();

    let form = $(this);
    let result = 0;
    let pattern = "^(http|https):\/\/.*";

    query = form.find("input[name='query']").val();
    customUrls = form.find("textarea[name='user_urls']").val();
    searchSystem = form.find("select[name='search_system']").val();
    lr = form.find("select[name='lr']").val();
    deep = form.find("select[name='deep']").val();
    relURL = Number(form.find("input[name='rel_url']").is(":checked"));

    let file = document.getElementById("url");

    //Загрузка файла
    if(file.files.length) {
        let reader = new FileReader();

        reader.onload = function(e)
        {
            result = e.target.result.split("\n");
        };

        reader.readAsBinaryString(file.files[0]);
    }

    if (!result){
        ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
            +key+"&url=&query="
            +query+"&search_system="
            +searchSystem+"&lr="
            +lr+"&deep="
            +deep+"&rel_url="
            +relURL;

        sendToServer(ajaxURL);
    } else {
        for (let i = 0;i < result.length;i++){
            if(result[i].match(pattern)){
                ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
                    +key+"&url="
                    +result[i]+"&query="
                    +query+"&search_system="
                    +searchSystem+"&lr="
                    +lr+"&deep="
                    +deep+"&rel_url="
                    +relURL;

                /*
                newPacket.data.push({
                    url: url,
                    report_id: 111111,
                    status: 2
                });
                */

                sendToServer(ajaxURL);
            }
        }
    }
});