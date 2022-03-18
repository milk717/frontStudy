const tdArr = document.getElementsByTagName('td')//지뢰판 각 칸 불러옴

function setGame(size) {
    var sizeNum = parseInt(size)        //사용자에게 입력받은 지뢰판 크기
    let mineArr = new Array(sizeNum)    //지뢰정보 저장 배열

    setMine(sizeNum)
    setTable(sizeNum)

    function setMine(sizeNum) {
        let x, y
        let dx = [-1, 1, 0, 0, -1, -1, 1, 1]
        let dy = [0, 0, -1, 1, -1, 1, -1, 1] //상, 하, 좌, 우, 좌상, 우상, 좌하, 우하
        
        //2차원배열 생성
        for (var i = 0; i < sizeNum; i++) {
            mineArr[i] = new Array(sizeNum)
        }

        //2차원배열 모두 0으로 초기화
        for (var i = 0; i < sizeNum; i++) {
            for (var j = 0; j < sizeNum; j++) {
                mineArr[i][j] = 0
            }
        }

        //랜덤수 중복없이 선택하고 주변에 지뢰 갯수 표시해줌
        for (var i = 0; i < sizeNum*2; i++) {
            x = Math.floor(Math.random() * sizeNum)
            y = Math.floor(Math.random() * sizeNum)

            if (mineArr[x][y] != 'X') {
                mineArr[x][y] = 'X'
                for (var j = 0; j < 8; j++) {
                    xx = x + dx[j]
                    yy = y + dy[j]
                    if (xx >= 0 && xx < sizeNum && yy >= 0 && yy < sizeNum) {
                        if (mineArr[xx][yy] != 'X')
                            mineArr[xx][yy] += 1
                    }
                }
            } else {
                i = i - 1
            }
        }

        //잘되나 한번 출력해봄
        // for (var i = 0; i < sizeNum; i++) {
        //     for (var j = 0; j < sizeNum; j++) {
        //         document.write(mineArr[i][j])
        //     }
        //     document.write("<br>")
        // }
    }

    function setTable(sizeNum) {
        //사용자에게 입력받은 만큼 html 테이블 만들기
        let tableEle = "<table id = 'gameBoard' border = '1' >"

        for (let i = 0; i < sizeNum; i++) {
            tableEle += '<tr>'
            for (let j = 0; j < sizeNum; j++) {
                tableEle += '<td></td>'
            }
            tableEle += '</tr>'
        }
        tableEle += '</table>'
        document.getElementById("gameInfo").innerHTML = tableEle //테이블 그려줌
        //이벤트 리스너 등록
        for(let i = 0; i<tdArr.length; i++){
            addTileClickEvent(i);
        }
    }

    function addTileClickEvent(targetTile) {
        tdArr[targetTile].addEventListener('click',function(){
            //현재클릭한 좌표구함
            var x = parseInt(targetTile/sizeNum)
            var y = targetTile - x*sizeNum
            //지뢰일 때
            if(mineArr[x][y] === 'X'){
                tdArr[targetTile].innerHTML = "💣"
                alert("GAME OVER!!")
            }else if(mineArr[x][y] == 0){
                tdArr[targetTile].add()
            }
            else{
                tdArr[targetTile].innerHTML = mineArr[x][y]
            }
        })
    }
}