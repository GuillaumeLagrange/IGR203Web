var load = function(url) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status == 200) {
            answer = JSON.parse(xhr.responseText);

            $.get("exercice2b.template", function(template) {
                var tab = Mustache.render(template, answer);
                $('#tab').html(tab);
            });
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

var urlInbox = "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-inbox.json";
var urlArchive = "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-archives.json"
var urlSpam = "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-spam.json"
var urlSent = "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-sent.json"

Sammy("#msg",function() {

    this.get("#Inbox", function() {
        this.$element().html("Currently in Inbox");
        load(urlInbox);
    });

    this.get("#Sent", function() {
        this.$element().html("Currently in Sent");
        load(urlSent);
    });

    this.get("#Spam", function() {
        this.$element().html("Currently in Spam");
        load(urlSpam);
    });

    this.get("#Archive", function() {
        this.$element().html("Currently in Archive");
        load(urlArchive);
    });

}).run();
