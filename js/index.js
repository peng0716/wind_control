$(function(){
    var index_table = document.getElementById('index_table');
    var indexThead = document.getElementById('indexThead');
    var index_tbody = index_table.tBodies[0];

    /*风险容忍度页面表单*/
    var tolerance_table = document.getElementById('tolerance_table');
    var toleranceThead = document.getElementById('toleranceThead');
    var tolerance_tbody = tolerance_table.tBodies[0];

    /*风险限额表单*/
    var quota_table = document.getElementById('quota_table');
    var quotaThead = document.getElementById('quotaThead');
    var quota_tbody = quota_table.tBodies[0];

    /*指令性指标*/
    var instruction_table = document.getElementById('instruction_table');
    var instructionThead = document.getElementById('instructionThead');
    var instruction_tbody = instruction_table.tBodies[0];

    /*观察性指标*/
    var watch_table = document.getElementById('watch_table');
    var watchThead = document.getElementById('watchThead');
    var watch_tbody = watch_table.tBodies[0];

    //表头加载方法
    function headerData(headerData){
        var topFrg = document.createDocumentFragment();
        var topTr = document.createElement('tr');
        topTr.className = 'index_header';
        var topCurItem = headerData;
        for(var key in topCurItem){
            var topTh = document.createElement('th');
            /*if(key == 'name'){
                topTh.style.width = '39.5%'
            }else if(key == 'nameReport'){
                topTh.style.width = '19.8%'
            }else if(key == 'nameValue'){
                topTh.style.width = '19.5%'
            }*/
            topTh.innerHTML = topCurItem[key];
            topTr.appendChild(topTh);
        }
        topFrg.appendChild(topTr);
        if($('.favor_tolerance').css('display') == 'block'){   //风险容忍度
            toleranceThead.appendChild(topFrg);
        }else if($('.favor_quota').css('display') == 'block'){ //风险限额
            quotaThead.appendChild(topFrg);
        }else if($('.favor_instruction').css('display') == 'block'){ //指令性指标
            instructionThead.appendChild(topFrg);
        }else if($('.favor_watch').css('display') == 'block'){ //观察性指标
            watchThead.appendChild(topFrg);
        }else{
            indexThead.appendChild(topFrg);
        }
    }
    //表单加载方法
    function formData(fromData){
        var listFrg = document.createDocumentFragment();
        var listCurItem = fromData.sort(function(a,b){
            return a.colour - b.colour;
        });
        for(var i = 0;i < listCurItem.length;i++){
            var listTr = document.createElement('tr');
            listTr.className = 'index_form';
            var item = listCurItem[i];
            for(var keys in item){
                var listTd = document.createElement('td');
                if(keys == 'name'){
                    listTd.style.width = '40%'
                }else if(keys == 'tate'){
                    listTd.style.width = '20%'
                }else if(keys == 'indexValue'){
                    listTd.style.width = '20%'
                }
                listTd.innerHTML = item[keys];
                listTr.appendChild(listTd);
            }
            var a = listTr.firstChild;
            var b = a.nextSibling.nextSibling.nextSibling;
            b.innerHTML = b.innerHTML + '万元';
            if(a.innerHTML === "001"){
                b.className = 'myRed';
            }else if(a.innerHTML === "002"){
                b.className = 'myYellow';
            }else if(a.innerHTML === "003"){
                b.className = 'myGreen';
            }else if(a.innerHTML === "004"){
                b.className = 'myBlue';
            }else{
                b.className = 'myGray';
            }
            listTr.firstChild.style.display = 'none';
            listFrg.appendChild(listTr);
        }
        if($('.favor_tolerance').css('display') == 'block'){
            tolerance_tbody.appendChild(listFrg);
        }else if($('.favor_quota').css('display') == 'block'){
            quota_tbody.appendChild(listFrg);
        }else if($('.favor_instruction').css('display') == 'block'){
            instruction_tbody.appendChild(listFrg);
        }else if($('.favor_watch').css('display') == 'block'){
            watch_tbody.appendChild(listFrg);
        }
            index_tbody.appendChild(listFrg);
    }
    //表单宽度问题  当前表单id:current   目标表头id:aims
    function tableWidth(current,aims){
        /*var current = $('#current > tbody > tr');*/
        console.log(current);
    }
    //按钮点击方法   data:数据, cutIndex:当前按钮，formElement:当前表单
    function filter(data,cutIndex,formElement){
        if(data < 0){
            formElement.css('display','table-row');
            cutIndex.eq(0).addClass('buttonDefault').siblings().removeClass('buttonDefault');
            return;
        }
        var colour = ['myRed','myYellow','myGreen','myBlue','myGray'];
        var current = colour[data];
        data = 1 + data;
            var currentButon = cutIndex.eq(data);
            currentButon.addClass('buttonDefault').siblings().removeClass('buttonDefault');

        for(var i = 0; i <formElement.length;i++){
            var td = formElement[i].children;
            for(var j = 0;  j<td.length; j++){
                if(td[j].className == current){
                    td[j].parentNode.style.display = 'table-row';
                    break;
                }else{
                    td[j].parentNode.style.display = 'none';
                }
            }
        }
    }
    //饼图点击方法  index:饼图点击的索引
    function pieFilter(index){
        var colour = ['myRed','myYellow','myGreen','myBlue','myGray'];
        var current = colour[index];
        index = 1 + index;
        var currentButon = $('#index_button >input').eq(index);
        currentButon.addClass('buttonDefault').siblings().removeClass('buttonDefault');

        var tr = $('#index_table .index_form');
        for(var i = 0; i <tr.length;i++){
            var td = tr[i].children;
            for(var j = 0;  j<td.length; j++){
                if(td[j].className == current){
                    td[j].parentNode.style.display = 'table-row';
                    break;
                }else{
                    td[j].parentNode.style.display = 'none';
                }
            }
        }
    }

    //表单隔行变色
    /*var changeBg = function(){
        var oRows = index_tbody.rows;
        for(var i = 0; i < oRows.length; i++){
            oRows[i] = i % 2 === 1 ? oRows[i].className = 'tr_even' : null;
        }
    }*/

    $.getJSON('./json/indexPie.json',function(res){
        function dataName(data){
            var item = [];
            var a = data.mypie;
            for(var i = 0; i < a.length;i++){
                item.push(a[i].name);
            }
            return item;
        }

        /*关键风险指标总览*/
        /*指标饼图*/
        var index_pie = echarts.init(document.getElementById('index_pie'));
        var index_pieOption = {
            color:['#FF0000','#E5E500','#00DB00','#024DF7'],
            title : {
                text: '指标分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                bottom:'10',
                data: dataName(res)
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:res.mypie,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        index_pie.setOption(index_pieOption);

        /*表单动态加载*/
        var initData = function(){
            if(!res){return;}
            /*表头*/
            var header_pie = res.pieName[0];
            headerData(header_pie)

            /*表单*/
            var newAryPie = res.pieValue;
            formData(newAryPie);

            /*表单宽度问题*/
            var currentId = $('#tolerance_table > tbody').find('tr').first();
            var aimsId = $('#toleranceThead');
            tableWidth(currentId,aimsId);
        }
        initData();
        /*changeBg();*/

        /*饼图点击事件*/
        index_pie.on('click',function(parma){
            if($('#index_table').attr('mark') !== 0){  //判断表单显示的数据属于谁
                $('#index_table > thead >tr,#index_table > tbody > tr').remove();
                initData();
            }
            $('#index_button2').css('display','none');
            $('#index_button').css('display','block');
            $('#index_bar').css('background','#fff');
            $('#index_pie').css('background','#f8f8f8');
            var dataIndex = parma.dataIndex;
            pieFilter(dataIndex);
            /*changeBg();*/
        })

        /*按钮点击事件*/
        $('#index_button > input').on('click',function(){
            $('#index_pie').css('background','#f8f8f8');
            var ind = $(this).index() - 1;
            var cutIndex = $('#index_button > input');
            var cutForm = $('#index_table >tbody >tr');
            filter(ind,cutIndex,cutForm);
        })
    })
    $.getJSON('./json/indexBar.json',function(resBar){
        /*指标柱状图*/
        var index_bar = echarts.init(document.getElementById('index_bar'));
        var index_barOption = {
            color:['#FF0000','#E5E500','#00DB00','#024DF7'],
            title : {
                text: '七大风险分类',
                x:'center'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                left: 'center',
                bottom:'10',
                data:['红色预警','黄色预警','安全区域','观察性指标']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['市场风险','信用风险','操作风险','保险风险','声誉风险','战略风险','流动线风险']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'红色预警',
                    type:'bar',
                    stack: '叠加',
                    data:resBar.myBar[0]
                },
                {
                    name:'黄色预警',
                    type:'bar',
                    stack: '叠加',
                    data:resBar.myBar[1]
                },
                {
                    name:'安全区域',
                    type:'bar',
                    stack: '叠加',
                    data:resBar.myBar[2]
                },
                {
                    name:'观察性指标',
                    type:'bar',
                    stack: '叠加',
                    data:resBar.myBar[3]
                }
            ]
        };
        index_bar.setOption(index_barOption);

        /*柱状图点击事件*/
        index_bar.on('click',function(parma){
            if($('#index_table').attr('mark') == 0){  //判断表单显示的数据属于谁
                $('#index_table > thead >tr,#index_table > tbody > tr').remove();  //删除pie数据
            }
            $('#index_button').css('display','none');  //隐藏pie按钮
            $('#index_button2').css('display','block'); //显示bar按钮
            $('.index_button').find('input:first-child').addClass('buttonDefault').siblings().removeClass('buttonDefault');
            $('#index_pie').css('background','#fff');
            $('#index_bar').css('background','#f8f8f8');
            function initBar(){
                if(!resBar){return;}
                //加载表头数据
                var header_bar = resBar.barName[0];
                headerData(header_bar)

                var dataIndex = parma.dataIndex;
                var types = ['marketRisk','creditRisk','operateRisk','safeRisk','fameRisk','strategyRisk','FlowlineRisk'];
                var barClick = types[dataIndex];  //柱状图点击哪一列

                /*表单*/
                var parameter = resBar.barValue[0];
                for(var p in parameter){
                    if(p === barClick){
                        var newAryBar = parameter[p];
                        break;
                    }
                }
                formData(newAryBar);
            }
            initBar();
            /*changeBg();*/
        })
        /*柱状图按钮点击事件*/
        $('#index_button2 > input').on('click',function(){
            var ind = $(this).index() - 1;
            var cutIndex = $('#index_button2 > input');
            var cutForm = $('#index_table >tbody >tr');
            filter(ind,cutIndex,cutForm);
        })
    })

    /*选项卡*/
    var $tab_li = $('#tab >ul >li');
    $tab_li.on('click',function(){
        $(this).addClass('selected').siblings().removeClass('selected');
        var index = $tab_li.index(this);
        $('div.tab_box  > div').eq(index).show().siblings().hide();
        if(index !== 1){
            $('.favor_right >div').css('display','none');
        }else{
            $('.favor_right').find('div:first').css('display','block');
            /*风险偏好与传导*/
            var favor_funnel = echarts.init(document.getElementById('favor_funnel'));
            var favor_funnelOption = {
                series: [
                    {
                        name:'漏斗图',
                        type:'funnel',
                        left: '10%',
                        top: 20,
                        bottom: 20,
                        width: '80%',
                        sort: 'ascending',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20,
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        data: [
                            {value: 20, name: '风险偏好'},
                            {value: 40, name: '风险容忍度'},
                            {value: 60, name: '风险限额'},
                            {value: 80, name: '指令性指标'},
                            {value: 100, name: '观察性指标'}
                        ]
                    }
                ]
            };
            favor_funnel.setOption(favor_funnelOption);

            /*风险偏好数据*/
            $.getJSON('./json/favorText.json',function(favorText){
                var fover_text = document.getElementById('favor_text')
                function textData(){
                    if(!favorText){return};
                    if($('#favor_text').find('p').length !== 0){return};
                    var frg = document.createDocumentFragment();
                    for (var i = 0; i < favorText.text.length; i++) {
                        var curItem = favorText.text[i];
                        var oP = document.createElement("p");
                        var str = "";
                        str += "<p class='favor_textP'>" + curItem + "</p>";
                        oP.innerHTML = str;
                        frg.appendChild(oP);
                    }
                    fover_text.appendChild(frg);
                }
                textData();
            })

            //漏斗图点击事件
            favor_funnel.on('click',function(parma){
                var dataIndex = parma.dataIndex;
                var cut = $('.favor_right >div').eq(dataIndex).css('display');
                if(cut == 'block'){return};   //判断是否重复点击
                $('.favor_right >div').eq(dataIndex).css('display','block').siblings().css('display','none');
                if(dataIndex == 1){  //风险容忍度
                    $.getJSON('./json/favorTolerance.json',function(favorTolerance){
                        var toleranceData = function(){
                            if(!favorTolerance){return;}
                            if($('#tolerance_table >thead').find('tr').length !== 0){return};
                            var headerTolerance = favorTolerance.toleranceName[0];
                            headerData(headerTolerance)

                            /*表单*/
                            var newAryTolerance = favorTolerance.toleranceValue;
                            formData(newAryTolerance);
                        }
                        toleranceData();
                        //console.log($('#tolerance_table > thead').length);
                    })
                }else if(dataIndex == 2){
                    $.getJSON('./json/favorQuota.json',function(favorQuota){
                        //风险限额
                        var favor_quota = echarts.init(document.getElementById('favor_quota'));
                        var favor_quotaOption = {
                            color:['#FF0000','#E5E500','#00DB00','#024DF7'],
                            title : {
                                text: '七大风险分类',
                                x:'center'
                            },
                            tooltip : {
                                /*triggerOn:'click',*/
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },

                                /*position:[0,0],*/
                                /*formatter:function(parmas){
                                 return false;
                                 }*/
                            },
                            legend: {
                                left: 'center',
                                bottom:0,
                                data:['红色预警','黄色预警','安全区域','观察性指标']
                            },
                            grid: {
                                top:'18%',
                                left: '3%',
                                right: '2%',
                                bottom: '12%',
                                containLabel: true
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['市场风险','信用风险','操作风险','保险风险','声誉风险','战略风险','流动线风险']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'红色预警',
                                    type:'bar',
                                    stack: '广告',
                                    /*markArea:{
                                     itemStyle:{
                                     normal:{
                                     color:"#999"
                                     },
                                     },
                                     data:1
                                     },*/
                                    data:favorQuota.quotaBar[0]
                                },
                                {
                                    name:'黄色预警',
                                    type:'bar',
                                    stack: '广告',
                                    data:favorQuota.quotaBar[1]
                                },
                                {
                                    name:'安全区域',
                                    type:'bar',
                                    stack: '广告',
                                    data:favorQuota.quotaBar[2]
                                },
                                {
                                    name:'观察性指标',
                                    type:'bar',
                                    stack: '广告',
                                    data:favorQuota.quotaBar[3]
                                }
                            ]
                        };
                        favor_quota.setOption(favor_quotaOption);
                        function initQuota(){
                            if(!favorQuota){return;}
                            if($('#quota_table >thead').find('tr').length !== 0){
                                $('#quota_table >thead>tr').remove();
                                $('#quota_table >tbody>tr').remove();
                            };
                            $('#quota_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            //表头初始化
                            var header_quota = favorQuota.quotaName[0];
                            headerData(header_quota)

                            /*表单初始化*/
                            var initquota = favorQuota.quotaValue[0].marketRisk;
                            formData(initquota);
                        }
                        initQuota();

                        /*quota柱状图点击事件*/
                        favor_quota.on('click',function(parma) {
                            $('#quota_table > tbody > tr').remove();  //删除原有数据
                            $('#quota_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var dataIndex = parma.dataIndex;

                            var types = ['marketRisk','creditRisk','operateRisk','safeRisk','fameRisk','strategyRisk','FlowlineRisk'];
                            var barClick = types[dataIndex];
                            var parameter = favorQuota.quotaValue[0];
                            for(var p in parameter){
                                if(p === barClick){
                                    var newAryQuota = parameter[p];
                                    break;
                                }
                            }
                            formData(newAryQuota);
                         })
                        //quota按钮点击事件
                        $('#quota_button > input').on('click',function(){
                            $(this).addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var ind = $(this).index() - 1;
                            var cutIndex = $('#quota_button > input');
                            var cutForm = $('#quota_table >tbody >tr');
                            filter(ind,cutIndex,cutForm);
                        })
                    })
                }else if(dataIndex == 3){
                    $.getJSON('./json/favorInstruction.json',function(favorInstruction){
                        //指令性指标
                        var favor_instruction = echarts.init(document.getElementById('favor_instruction'));
                        var favor_instructionOption = {
                            color: ['#FF0000', '#E5E500', '#00DB00', '#024DF7'],
                            title: {
                                text: '七大风险分类',
                                x: 'center'
                            },
                            tooltip: {
                                /*triggerOn:'click',*/
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },

                                /*position:[0,0],*/
                                /*formatter:function(parmas){
                                 return false;
                                 }*/
                            },
                            legend: {
                                left: 'center',
                                bottom: 0,
                                data: ['红色预警', '黄色预警', '安全区域', '观察性指标']
                            },
                            grid: {
                                top: '18%',
                                left: '3%',
                                right: '2%',
                                bottom: '12%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['市场风险', '信用风险', '操作风险', '保险风险', '声誉风险', '战略风险', '流动线风险']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '红色预警',
                                    type: 'bar',
                                    stack: '广告',
                                    /*markArea:{
                                     itemStyle:{
                                     normal:{
                                     color:"#999"
                                     },
                                     },
                                     data:1
                                     },*/
                                    data: favorInstruction.instructionBar[0]
                                },
                                {
                                    name: '黄色预警',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorInstruction.instructionBar[1]
                                },
                                {
                                    name: '安全区域',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorInstruction.instructionBar[2]
                                },
                                {
                                    name: '观察性指标',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorInstruction.instructionBar[3]
                                }
                            ]
                        };
                        favor_instruction.setOption(favor_instructionOption);
                        function initInstruction(){
                            if(!favorInstruction){return;}
                            if($('#instruction_table >thead').find('tr').length !== 0){
                                $('#instruction_table >thead>tr').remove();
                                $('#instruction_table >tbody>tr').remove();
                            };
                            $('#instruction_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            //表头初始化
                            var header_instruction = favorInstruction.instructionName[0];
                            headerData(header_instruction)

                            /*表单初始化*/
                            var initinstruction = favorInstruction.instructionValue[0].marketRisk;
                            formData(initinstruction);
                        }
                        initInstruction();

                        /*instruction柱状图点击事件*/
                        favor_instruction.on('click',function(parma) {
                            $('#instruction_table > tbody > tr').remove();  //删除原有数据
                            $('#instruction_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var dataIndex = parma.dataIndex;

                            var types = ['marketRisk','creditRisk','operateRisk','safeRisk','fameRisk','strategyRisk','FlowlineRisk'];
                            var barClick = types[dataIndex];
                            var parameter = favorInstruction.instructionValue[0];
                            for(var p in parameter){
                                if(p === barClick){
                                    var newAryInstruction = parameter[p];
                                    break;
                                }
                            }
                            formData(newAryInstruction);
                        })
                        //instruction按钮点击事件
                        $('#instruction_button > input').on('click',function(){
                            $(this).addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var ind = $(this).index() - 1;
                            var cutIndex = $('#instruction_button > input');
                            var cutForm = $('#instruction_table >tbody >tr');
                            filter(ind,cutIndex,cutForm);
                        })
                    })
                }else if(dataIndex == 4){
                    $.getJSON('./json/favorWatch.json',function(favorWatch){
                        //观察性指标
                        var favor_watch = echarts.init(document.getElementById('favor_watch'));
                        var favor_watchOption = {
                            color: ['#FF0000', '#E5E500', '#00DB00', '#024DF7'],
                            title: {
                                text: '七大风险分类',
                                x: 'center'
                            },
                            tooltip: {
                                /*triggerOn:'click',*/
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },

                                /*position:[0,0],*/
                                /*formatter:function(parmas){
                                 return false;
                                 }*/
                            },
                            legend: {
                                left: 'center',
                                bottom: 0,
                                data: ['红色预警', '黄色预警', '安全区域', '观察性指标']
                            },
                            grid: {
                                top: '18%',
                                left: '3%',
                                right: '2%',
                                bottom: '12%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: ['市场风险', '信用风险', '操作风险', '保险风险', '声誉风险', '战略风险', '流动线风险']
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '红色预警',
                                    type: 'bar',
                                    stack: '广告',
                                    /*markArea:{
                                     itemStyle:{
                                     normal:{
                                     color:"#999"
                                     },
                                     },
                                     data:1
                                     },*/
                                    data: favorWatch.watchBar[0]
                                },
                                {
                                    name: '黄色预警',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorWatch.watchBar[1]
                                },
                                {
                                    name: '安全区域',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorWatch.watchBar[2]
                                },
                                {
                                    name: '观察性指标',
                                    type: 'bar',
                                    stack: '广告',
                                    data: favorWatch.watchBar[3]
                                }
                            ]
                        };
                        favor_watch.setOption(favor_watchOption);
                        function initWatch(){
                            if(!favorWatch){return;}
                            if($('#watch_table >thead').find('tr').length !== 0){
                                $('#watch_table >thead>tr').remove();
                                $('#watch_table >tbody>tr').remove();
                            };
                            $('#watch_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            //表头初始化
                            var header_watch = favorWatch.watchName[0];
                            headerData(header_watch)

                            /*表单初始化*/
                            var initwatch = favorWatch.watchValue[0].marketRisk;
                            formData(initwatch);
                        }
                        initWatch();

                        /*watch柱状图点击事件*/
                        favor_watch.on('click',function(parma) {
                            $('#watch_table > tbody > tr').remove();  //删除原有数据
                            $('#watch_button').find("input:first").addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var dataIndex = parma.dataIndex;

                            var types = ['marketRisk','creditRisk','operateRisk','safeRisk','fameRisk','strategyRisk','FlowlineRisk'];
                            var barClick = types[dataIndex];
                            var parameter = favorWatch.watchValue[0];
                            for(var p in parameter){
                                if(p === barClick){
                                    var newAryWatch = parameter[p];
                                    break;
                                }
                            }
                            formData(newAryWatch);
                        })
                        //watch按钮点击事件
                        $('#watch_button > input').on('click',function(){
                            $(this).addClass('buttonDefault').siblings().removeClass('buttonDefault');
                            var ind = $(this).index() - 1;
                            var cutIndex = $('#watch_button > input');
                            var cutForm = $('#watch_table >tbody >tr');
                            filter(ind,cutIndex,cutForm);
                        })
                    })
                }
            })
        }
    });

})