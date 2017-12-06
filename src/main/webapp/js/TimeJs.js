
    'use strict';

    var synergyURL = "http://192.168.3.16:8080/Synergy/";
    AS.OPTIONS.locale = "ru";
    AS.OPTIONS.coreUrl = synergyURL;

    var modal = document.getElementById('myModal');
    var btn = document.getElementById('button');
    var saveFormBtn = document.getElementById('saveFormbtn');
    $(saveFormBtn).hide();

    window.onload = function(){
        modal.style.display = 'block';
    }


    var portal = {
        player : null,
        clearPlayer : function() {
            if(portal.player) {
                portal.player.destroy();
            }
        },
        main: function (view, model) {

            var d = new Date();
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1;
            var curr_year = d.getFullYear();
            var toDay =  curr_year + "-" + curr_month + "-" + curr_date;
            model.playerModel.getModelWithId('ts_period_date_from').setValue(portal.firstDayCalculate(toDay));
            model.playerModel.getModelWithId('ts_period_date_to').setValue(portal.lastDayCalculate(toDay));
        },

         firstDayCalculate: function (date) {
             date = AS.FORMS.DateUtils.parseDate(date);
             var dateMonth = date.getDate();
             var toDay = date.getDay();
             return AS.FORMS.DateUtils.formatDate(new Date(date.setDate(dateMonth - (toDay-1))), '${yyyy}-${mm}-${dd}');
         },

         lastDayCalculate: function (date) {
             date = AS.FORMS.DateUtils.parseDate(date);
             var dateMonth = date.getDate();
             var toDay = date.getDay();
             return AS.FORMS.DateUtils.formatDate(new Date(date.setDate(dateMonth + (7-toDay))), '${yyyy}-${mm}-${dd}');
         },
          createPlayer : function(formcode){

          portal.clearPlayer();

          portal.player = AS.FORMS.createPlayer();

            AS.FORMS.bus.on(AS.FORMS.EVENT_TYPE.formShow, function (event, model, view) {

                    model.on(AS.FORMS.EVENT_TYPE.dataLoad, function () {
                        portal.main(portal.player.view.getViewWithId("main_script"), portal.player.model.getModelWithId("main_script"));
                    });
            });

         AS.FORMS.ApiUtils.simpleAsyncGet("rest/api/registry/create_doc", function(result){
         portal.player.view.setEditable(true);
         portal.player.showFormData(formcode, 0, result.dataUUID);

         portal.player.view.appendTo($('#block-player'));
         $(saveFormBtn).show();
    },
    'json',  {

      'registryCode': 'registry_timesheets_o_bekturganov'
    })
    }
    };
    var auth =  AS.SERVICES.unAuthorized = function () {
    if(jQuery("#login").val().isEmpty()){

    document.getElementById("id-correct").innerHTML = "Введите логин";
    }

    else if(jQuery("#password").val().isEmpty()){
    document.getElementById("id-correct").innerHTML = "Введите пароль";
    }
    else{
     document.getElementById("id-correct").innerHTML = "Неверный логин или пароль";
    }
    };

    var connection =  $(document).ready(function(){
    btn.onclick = function(){
    AS.OPTIONS.login = jQuery("#login").val();
    AS.OPTIONS.password = jQuery("#password").val();
    $.ajax({
    method: "get",
    url: 'http://intern-dev.arta.kz/Synergy/rest/api/auth',

    headers: {'Authorization': 'Basic ' + btoa(unescape(encodeURIComponent(AS.OPTIONS.login)) + ':' + unescape(encodeURIComponent(AS.OPTIONS.password)))
    },
    success: function(){

      portal.createPlayer("timesheet_o_bekturganov");
      modal.style.display = 'none';
    },
          error: function () {
           auth();
                }
    });
    }

    });
    $(document).ready(function(){
      saveFormBtn.onclick = function(){
                AS.SERVICES.showWaitWindow();
                portal.player.saveFormData(function () {
                    alert("Данные сохранены");
                    AS.SERVICES.hideWaitWindow();
                });
    }
    });









