let key = "21888f1a3a548e104c2599875feb93ec";

function sendToServer(url){
    let status = 0;

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
                renderResults(data["response"]);
            }
        }
    });

    function saveReportID(reportID){
        newPacket.data.push({
            url: url,
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

    function renderResults(data){
        console.log(data);

        status = 1;
    }

    return status;
}

