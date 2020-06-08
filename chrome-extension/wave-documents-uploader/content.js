(function ($) {

    var transactionHelperIdentifier = 'gg_wave_documents_uploader--transactionHelper';
    var tid;
    var btnText;

    var server;
    var magic;

    chrome.storage.sync.get(['server', 'magic'], function (result) {
        server = result.server;
        magic = result.magic;
    });

    function loadTransactionHelper() {
        // watch for the DOM to be ready to receive the helper
        var i = setInterval(function () {
            var watchFor = '.transactions-list__details__form__user-modified-date';
            var $m = $(watchFor);
            // if the DOM is ready
            if ($m.length > 0) {
                // append the helper under the Notes section
                $('.' + transactionHelperIdentifier).remove();
                var $transactionHelper = $('<div class="' + transactionHelperIdentifier + '" rel="' + tid + '"></div>').appendTo($m.parent());
                $('<div class="wv-divider"></div>').appendTo($transactionHelper);
                $('<div>Uploaded Documents:</div>').appendTo($transactionHelper);
                $('<div class="gg_wave_documents_list" style="margin-bottom:10px">...</div>').appendTo($transactionHelper);
                $('<svg class="wv-svg-icon"><use xlink:href="#add--simple"></use></svg><button style="vertical-align: top;" class="wv-button--link gg_wave_documents_uploader--btn_upload">Upload Document</button>').appendTo($transactionHelper);

                // stop watching
                clearInterval(i);

                $.post(server + '/list.php',
                    {
                        tid: tid,
                        magic: magic
                    },
                    function (data) {
                        console.log(data);
                        $('.gg_wave_documents_list').empty();
                        var json = $.parseJSON(data);
                        $.each(json['files'], function (i) {
                            $('<a href="' + json['files'][i]['url'] + '" target="_blank" class="wv-button--small wv-button--link">' + json['files'][i]['name'] + '</a><br>').appendTo('.gg_wave_documents_list');
                        });

                    });
            }
        });
    }


    $(window).on('load', function () {

        var interval = setInterval(function () {
            // refresh tid
            var t = document.location.href;
            t = t.split('/');
            t = t[t.length - 1];

            // event if tid changed
            if (tid != t) {
                // update tid
                tid = t;
                loadTransactionHelper();
            } else {

            }

        }, 250);

    });

    $('body').on('submit', '#gg_wave_documents_uploader_form', function (e) {
        e.preventDefault();

        btnText = $('.gg_wave_documents_uploader--btn_upload').text();
        $('.gg_wave_documents_uploader--btn_upload').text('Uploading...').addClass('disabled');

        var file_data = $('#gg_wave_documents_uploader_file').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('tid', $(this).find('input[name="tid"]').val());
        form_data.append('magic', magic);

        $.ajax({
            url: server + '/uploader.php',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'POST',
            success: function (data) {
                console.log(data);
                var json = $.parseJSON(data);
                $('<a href="' + json['url'] + '" target="_blank" class="wv-button--small wv-button--link">' + json['name'] + '</a>').appendTo('.gg_wave_documents_list');
                $('.gg_wave_documents_uploader--btn_upload').text(btnText).removeClass('disabled');
            }
        });
    });

    $('body').on('change', '#gg_wave_documents_uploader_file', function () {
        $('#gg_wave_documents_uploader_form').submit();
    });

    $('body').on('click', '.gg_wave_documents_uploader--btn_upload', function () {
        if (!$(this).hasClass('disabled')) {
            var rel = $(this).parent().attr('rel');

            $('#gg_wave_documents_uploader_form').remove();
            $('<form enctype="multipart/form-data" id="gg_wave_documents_uploader_form"></form>').appendTo('body');
            $('<input type="hidden" name="tid" value="' + rel + '">').appendTo('#gg_wave_documents_uploader_form');
            $('<input type="file" name="wave_documents" id="gg_wave_documents_uploader_file" rel="' + rel + '" multiple>').appendTo('#gg_wave_documents_uploader_form');
            $('#gg_wave_documents_uploader_file').trigger('click');
        }
    });


})(jQuery);