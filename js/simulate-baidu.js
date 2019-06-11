var input = document.getElementById('search-word');
var btn = document.getElementById('search-btn');
var input_word = document.getElementById('input-word');
var ul = document.getElementById('history');
var operation = document.getElementById('operation');
var delClo = document.getElementById("delete-close");
var close = document.getElementById("close");
var delall = document.getElementById("deleteall");
var words;  //全局数组

function getData(data) {
    console.log(data.g);
    operation.style.display = "block";
    ul.innerHTML = "";
    if (data.g === undefined) {
        return;
    }
    var fragment2 = document.createDocumentFragment();
    for (let i = 0; i < data.g.length; i++) {
        var li = document.createElement('li');
        li.className = "historylists";
        li.innerText = data.g[i].q;
        fragment2.appendChild(li);
    }
    ul.appendChild(fragment2);
    if (data.g.length > 10) {
        ul.style.overflow = "hidden";
    }

    var lis = document.querySelectorAll('.historylists');
    for (let j = 0; j < lis.length; j++) {
        lis[j].onclick = function () {
            location.href = 'https://www.baidu.com/s?wd=' + lis[j].innerText;
            save(lis[j].innerText)
        }
    }
}
input.oninput = function () {
    console.log(input.value);
    operation.style.display = "none";
    var values = input.value;
    if (values) {
        let script = document.createElement('script');
        script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1430,21111,29063,28518,29099,29139,28836,28585,26350&wd=${values}&req=2&bs=%E6%9D%8E%E7%8E%89%E5%88%9A&csor=3&cb=getData`
        document.body.append(script);

        script.onload = function () {
            document.body.removeChild(script);
        }
    }
}

function init() {
    var wordHistory = localStorage.getItem('baiduHistory');
    if (wordHistory === null) {
        words = [];
    } else {
        console.log(wordHistory)
        words = JSON.parse(wordHistory); //字符串转数组
        console.log(words);
    }
}
init();
btn.onclick = function () {
    var word = input.value;
    save(word);

}

function save(word) {
    if (word === '') {
        location.reload(true);
        return;
    } else {

        location.href = 'https://www.baidu.com/s?wd=' + word;
    }
    var index = words.indexOf(word);  //没有找到word,存入数组
    if (index === -1) {
        words.push(word);
        storage()
    }

}
input_word.onclick = function (e) {
    e.stopPropagation();  //阻止事件冒泡到document
    if (words.length > 3) {
        delClo.style.display = "block";
    }

    console.log('sss')
    ul.innerHTML = ''
    var fragment = document.createDocumentFragment();
    for (var i = words.length - 1; i >= 0; i--) {
        var li = document.createElement('li');
        var p = document.createElement('p');
        var span = document.createElement('span');
        li.className = "historylists";

        p.className = "deleteitem";
        p.innerText = '删除'
        span.innerText = words[i];
        li.appendChild(p);
        li.appendChild(span);
        fragment.appendChild(li);
    }
    ul.appendChild(fragment)
    operation.style.display = 'block';
    var del = document.getElementsByClassName('deleteitem');
    for (var j = 0; j < del.length; j++) {
        (function (j) {
            del[j].onclick = function () {
                console.log('aaaas');
                this.parentNode.outerHTML = '';
                words.splice(words.length - 1 - j, 1);
                storage()
                if (words.length === 0) {
                    operation.style.display = "none"
                }
                if (words.length <= 3) {
                    delClo.style.display = "none"
                }
            }
        })(j)
    }
    var lists = document.querySelectorAll('.historylists span');
    for (let i = 0; i < lists.length; i++) {
        lists[i].onclick = function () {
            location.href = 'https://www.baidu.com/s?wd=' + lists[i].innerText;
        }
    }

}
delall.onclick = function (e) {
    e.stopPropagation();
    localStorage.removeItem('baiduHistory');
    operation.style.display = "none";

}
close.onclick = function (e) {
    console.log('ccc')
    e.stopPropagation() //阻止事件冒泡
    operation.style.display = "none";

}
document.onclick = function () {  //点击其他区域隐藏历史
    operation.style.display = "none";
}
function storage() {
    localStorage.setItem('baiduHistory', JSON.stringify(words)) //将数组转为字符串

}



