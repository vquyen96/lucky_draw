$(document).ready(function(){

    //btn show setting
    $(document).on("click", ".settingIcon", function(){
        $(".settingMain").slideToggle();
    });
    $(document).on("click", ".listNumIcon", function(){
        $(".listNumMain").slideToggle();
    });


    //get max limit
    var max = localStorage.getItem("max");
    if (max == null) max = 99;
    var maxSize = max.length;
    displayNumber(max);
    $("input[name='max']").val(max);


    //get list number
    var listNum = localStorage.getItem("listNum");
    listNum != null ? listNum = listNum.split(",") : listNum = [];
    updateListNumHTML();

    var isDisplay = localStorage.getItem("displayModal");
    if (isDisplay == null || isDisplay == "true") {
        $(".listNumMainShowModal input[type='checkbox']").attr('checked', true);
    }

    //get pass is selected
    var pass = localStorage.getItem("pass");

    pass != null ? pass = pass.split(",") : pass = [];
    for (var i = 0; i < pass.length; i++) pass[i] = parseInt(pass[i]);
    $("input[name='pass']").val(pass.toString());

    var ran = 0;
    var refreshIntervalId;

    $(".mainRandomButtonRun").click(function(){
        refreshIntervalId = setInterval(function(){
            do{
                ran = Math.floor((Math.random() * max) + 1);
            }
            while(pass.indexOf(ran) !== -1);
            displayNumber(ran);

        }, 50);
        $(this).hide();
        $(this).next().show();
    });


    $(".mainRandomButtonStop").click(function(){
        // alert(ran);
        clearInterval(refreshIntervalId);
        $(this).hide();
        $(this).prev().show();
        showModal(ran);
        addNumberToList (ran);
    });

    //save config
    $(document).on("click", ".btnSbm", function(){
        max = $("input[name='max']").val();
        localStorage.setItem("max", max);

        displayNumber(max);
        pass = $("input[name='pass']").val();
        localStorage.setItem("pass", pass);
        pass != null ? pass = pass.split(",") : pass = [];
        for (var i = 0; i < pass.length; i++) pass[i] = parseInt(pass[i]);
        console.log($("input[name='color']").val());
    });

    //Delete all list
    $(document).on("click", ".listNumMainDeleteAll", function(){
        listNum = [];
        updateListNumHTML();
    });

    $(".listNumMainShowModal input[type='checkbox']").change(function() {
        if(this.checked) {
            localStorage.setItem("displayModal", true);
        } else {
            localStorage.setItem("displayModal", false);
        }
    });

    if ($(this).is(":checked")) {
        selected.push($(this).attr('name'));
    }


    //Delete item list
    $(document).on("click", ".listNumMainDeleteItem", function(){
        var itemIndex = $(this).parent().index();
        var itemLength = $(".listNumMainDeleteItem").length;
        listNum.splice(itemLength-itemIndex-1, 1);
        updateListNumHTML();
    });

    function displayNumber(number) {
        number = numberToString (number);
        for (let i = 0; i < maxSize; i++) {
            var str = number.substring(i, i+1);
            $(".mainRandomBorderItem").eq(i).text(str);
        }
    }

    function numberToString (number) {
        var numPlus = "";
        number = number.toString();

        for (let i = number.length; i < maxSize; i++) {
            numPlus += "0";
        }
        return numPlus + number;
    }

    function showModal(number) {
        var isDisplay = localStorage.getItem("displayModal");
        if (isDisplay == null || isDisplay == "true") {
            $(".modal-body h1").text(numberToString(number));
            $(".modal").modal();
        }
    }

    function addNumberToList (number) {
        listNum.push(numberToString (number));
        updateListNumHTML();
    }

    function updateListNumHTML(){
        localStorage.setItem("listNum", listNum);
        list_li = "";
        listNumLength = listNum.length;
        for (var i = (listNumLength-1); i >= 0 ; i--) {
            list_li += "<li><div>"+listNum[i]+"</div><div class='listNumMainDeleteItem'><i class='far fa-times-circle'></i></div></li>"
        }
        $(".listNumMain ul").html(list_li);
    }
});