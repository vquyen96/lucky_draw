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
    if (max == null) {
        max = 320;
        localStorage.setItem("max", max);
        location.reload();
    }
    var maxSize = max.length;
    generateDisplayBox(maxSize);
    displayNumber(max);
    $("input[name='max']").val(max);


    //get list number
    var listNum = localStorage.getItem("listNum");
    listNum != null && listNum !== "" ? listNum = listNum.split(",") : listNum = [];
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
            while(pass.indexOf(ran) !== -1 || listNum.indexOf(numberToString(ran)) !== -1);
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
        addNumberToList(ran);

    });

    //save config
    $(document).on("click", ".btnSbm", function(){
        max = $("input[name='max']").val();
        localStorage.setItem("max", max);
        maxSize = max.toString().length;
        generateDisplayBox(maxSize);
        displayNumber(max);
        pass = generatePass($("input[name='pass']").val());
    });

    //Delete all list
    $(document).on("click", ".listNumMainDeleteAll", function(){
        if (confirm("Bạn muốn xóa tất cả ?")) {
            listNum = [];
            updateListNumHTML();
        }
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

    function generatePass(passStr) {
        localStorage.setItem("pass", passStr);
        var passArr = passStr.split(",");
        for (var i = 0; i < passArr.length; i++) passArr[i] = parseInt(passArr[i]);
        $("input[name='pass']").val(passArr.toString());
        return passArr;
    }

    function generateDisplayBox(size) {
        var str = "";
        for (let i = 0; i < size; i++) {
            str += "<div class=\"mainRandomBorderItem\">0</div>";
        }
        $(".mainRandomBorder").html(str);
    }

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
        console.log(number);
        listNum.push(numberToString (number));
        updateListNumHTML();
    }

    function updateListNumHTML(){
        localStorage.setItem("listNum", listNum);
        list_li = "";
        listNumLength = listNum.length;
        console.log(listNum);
        console.log(listNumLength);
        for (var i = listNumLength; i > 0 ; i--) {
            list_li += "<li><div>"+listNum[i-1]+"</div><div class='listNumMainDeleteItem'><i class='far fa-times-circle'></i></div></li>"
        }
        $(".listNumMain ul").html(list_li);
    }
});