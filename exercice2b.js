/*globals $:false, Mustache:false, Sammy:false, XMLHttpRequest:false */

var folders = {
    Inbox : {mails : []},
    Sent : {mails : []},
    Spam : {mails : []},
    Archive : {mails : []},
};

var urls = [
    "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-inbox.json",
    "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-archives.json",
    "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-spam.json",
    "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-sent.json"
];

//This function requests the JSON object and puts the data in folders
var load = function (url) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status == 200) {
            var answer = JSON.parse(xhr.responseText);
            var id = answer.id;
            folders[id].mails = answer.mails;
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
};

for (var i=0; i<urls.length; i++) {
    load(urls[i]);
}

var display = function(folder) {
    $.get("exercice2b.template", function(template) {
                        var tab = Mustache.render(template, folders[folder]);
                        $('#tab').html(tab);
    });
};

var checkMails = function() {
    var today = new Date();
    var dd = today.getDay();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var month;
    switch(mm) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }
    var mail = {
        from : "anonymous@telecom-paristech.fr",
        to : "steve@example.com",
        date : month + "" + dd + ", " + yyyy,
        subject : "I see you"
    };
    folders.Inbox.mails.push(mail);
    display(this.get);
};

$('#button').onclick = checkMails();


Sammy("#msg",function() {

    this.get("#Inbox", function() {
        this.$element().html("Currently in Inbox");
        display("Inbox");
    });

    this.get("#Sent", function() {
        this.$element().html("Currently in Sent");
        display("Sent");
    });

    this.get("#Spam", function() {
        this.$element().html("Currently in Spam");
        display("Spam");
    });

    this.get("#Archive", function() {
        this.$element().html("Currently in Archive");
        display("Archive");
    });

}).run();