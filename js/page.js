$(function(){
    /*接收问号方法 urlStr全局变量保存数据*/
    function getQryStr(){
        var queryArr = window.location.search.slice(1).split('&');
        var tempArr,item,queryObject;
        for(var i = 0;i < queryArr.length;i++){
            if(queryArr == ""){alert("无数据传入!!!");return};
            item = queryArr[i];
            if(item.indexOf('=')!== -1){
                tempArr = item.split('=');
                //queryObject = tempArr[1];
                queryObject = decodeURI(tempArr[1]);
            }
        }
        return queryObject;
    }
    var urlStr = getQryStr();

    /*趋势图表单*/
    var trend_table = document.getElementById('trend_table');
    var trend_thead = trend_table.tHead;
    var trend_tbody = trend_table.tBodies[0];

    /*机构表单*/
    var agencyTable = document.getElementById('agencyTable');
    var agencyThead = agencyTable.tHead;
    var agency_table = document.getElementById('agency_table');
    var agency_thead = agency_table.tHead;
    var agency_tbody = agency_table.tBodies[0];

    /*渠道表单*/
    var channelTable = document.getElementById('channelTable');
    var channelThead = channelTable.tHead;
    var channel_table = document.getElementById('channel_table');
    var channel_thead = channel_table.tHead;
    var channel_tbody = channel_table.tBodies[0];

    /*产品表单*/
    var productTable = document.getElementById('productTable');
    var productThead = productTable.tHead;
    var product_table = document.getElementById('product_table');
    var product_thead = product_table.tHead;
    var product_tbody = product_table.tBodies[0];

    /*账户表单*/
    var accountTable = document.getElementById('accountTable');
    var accountThead = accountTable.tHead;
    var account_table = document.getElementById('account_table');
    var account_thead = account_table.tHead;
    var account_tbody = account_table.tBodies[0];

    /*账户表单*/
    var assetsTable = document.getElementById('assetsTable');
    var assetsThead = assetsTable.tHead;
    var assets_table = document.getElementById('assets_table');
    var assets_thead = assets_table.tHead;
    var assets_tbody = assets_table.tBodies[0];

    /*table表头方法
    * 数据:headerData
    * 表头id：headerId
    * 伪表头id：false_headerId
    */
    function headerMethod(headerData,headerId,false_headerId){
        var topFrg = document.createDocumentFragment();
        var topTr = document.createElement('tr');
        for(var i = 0; i <headerData.length;i++){
            var topTh = document.createElement('th');
            topTh.innerHTML = headerData[i];
            topTr.appendChild(topTh);
        }
        topFrg.appendChild(topTr);
        headerId.appendChild(topFrg);
        if(false_headerId !== undefined){
            false_headerId.appendChild(topFrg);
        }
    }

    /*table表单方法
    *数据：tbodyData
    *表单id：tbodyId
    */
    function tbodyMethod(tbodyData,tbodyId){
        var listFrg = document.createDocumentFragment();
        for(var i = 0; i <tbodyData.length;i++){
            var listTr = document.createElement('tr');
            var item = tbodyData[i];
            for(var j = 0; j < item.length;j++){
                var listTd = document.createElement('td');
                listTd.innerHTML = item[j];
                listTr.appendChild(listTd);
            }
            listFrg.appendChild(listTr);
        }
        tbodyId.appendChild(listFrg);
    }

    /*选项卡*/
    var $page_li = $('#page_tab >ul >li');
    $page_li.on('click',function(){
        $(this).addClass('page_selected').siblings().removeClass('page_selected');
        var index = $page_li.index(this);
        $('div.page_box  > div').eq(index).show().siblings().hide();
    });

    $.getJSON('./json/indexPie.json',function(res){
        /*折线图*/
        var pageLine = echarts.init(document.getElementById('pageLine'));
        var pageLine_option ={
            title: {
                text: urlStr,
                left:'center',
                top:20,
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br />{a}: {c}'+'（%）'
            },
            grid: {
                left: '3%',
                right: '12%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                data: ['2014-01-01','2014-02-01','2014-03-01','2014-04-01']
            },
            yAxis: {
                type : 'value',
                name:'%'

            },
            series: {
                name: '保费续费率',
                type: 'line',
                data: ['-10','50','90','60'],
                markArea: {
                    silent: true,
                    symbolSize:14,
                    label:{
                        normal:{
                            position:'right',
                            formatter:function(prams){
                                var name = prams.name;
                                var data = prams.data.coord;
                                var value1 = data[0][1];
                                var value2 = data[1][1];
                                return name +':'+ value1 +'%到'+ value2 + '%'
                            },
                            textStyle:{
                                fontSize:14,
                                fontWeight:'bold'
                            }
                        }
                    },
                    data: [
                        [{
                            name:'红色警戒',
                            yAxis: -10,
                            itemStyle:{
                                normal:{
                                    color:'#FF0000'
                                }
                            },
                        },{
                            yAxis: 30,
                        }],
                        [{
                            name:'黄色警戒',
                            yAxis: 30,
                            itemStyle:{
                                normal:{
                                    color:'#FFFF00',
                                }
                            },
                        },{
                            yAxis: 70,
                        }],
                        [{
                            name:'绿色警戒',
                            yAxis: 70,
                            itemStyle:{
                                normal:{
                                    color:'#29EF00',
                                }
                            },
                        },{
                            yAxis: 100,
                        }],
                    ]
                }
            }
        }
        pageLine.setOption(pageLine_option);

    })



})




















