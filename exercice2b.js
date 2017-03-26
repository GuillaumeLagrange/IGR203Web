var urlMail = "http://perso.telecom-paristech.fr/~concolat/cours/TP/igr203/mails-inbox.json";

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

Sammy("#msg",function() {

    this.get("#Inbox", function() {
        this.$element().html("Currently in Inbox");
        load(urlMail);
    });

    this.get("#Sent", function() {
        this.$element().html("Currently in Sent");
        load(urlMail);
    });

    this.get("#Spam", function() {
        this.$element().html("Currently in Spam");
        load(urlMail);
    });

    this.get("#Archive", function() {
        this.$element().html("Currently in Archive");
        load(urlMail);
    });

}).run();
