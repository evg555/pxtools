let key = "21888f1a3a548e104c2599875feb93ec";
let newPacket;

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

        $.cookie('packet', JSON.stringify(newPacket), {
            expires: 3
        });

        window.location = "/";
    }

    function returnStatus(code){
        if (code == 50){
            status = 2;
        }
    }

    function renderResults(result){
        $.ajax({
            url: "../results.php",
            data: result,
            type: "POST",
            dataType: "html",
            success: function(data){
                $(".container").off("click", "nav ul li a", handler);
                $(".container:nth-child(3)").html(data);
            }
        });

        status = 1;
    }

    return status;
}

//Переключение табов
function handler(e){
    e.preventDefault();

    console.log(this);

    let reportID = $(this).data("id");
    let ajaxURL = "https://tools.pixelplus.ru/api/analiztopv2?key="
        +key+"&report_id="
        +reportID;

    sendToServer(ajaxURL,null);
}